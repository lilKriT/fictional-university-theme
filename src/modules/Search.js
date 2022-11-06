import $ from "jquery";
class Search {
  constructor() {
    this.addSearchHTML();

    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.isOverlayOpen = false;
    this.searchField = $("#search-term");
    this.resultsDiv = $("#search-overlay__results");
    this.typingTimer;
    this.isSpinnerVisible = false;
    this.previousValue;
    this.events();
  }

  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keyup", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchField.val("");
    setTimeout(() => this.searchField.focus(), 301);
    this.isOverlayOpen = true;
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }

  keyPressDispatcher(e) {
    // console.log(e.keyCode);

    if (
      e.keyCode == 83 &&
      !this.isOverlayOpen &&
      !$("input, textarea)").is(":focus")
    ) {
      this.openOverlay();
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  typingLogic(e) {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html("<div class='spinner-loader'></div>");
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 500);
      } else {
        this.resultsDiv.html("");
      }
    }

    this.previousValue = this.searchField.val();
  }

  getResults() {
    // Three column
    $.getJSON(
      universityData.root_url +
        "/wp-json/university/v1/search?term=" +
        this.searchField.val(),
      (results) => {
        this.resultsDiv.html(`
      <div class="row">
        <div class="one-third">
          <h2 class="search-overlay__section-title">General information</h2>
          ${
            results.generalInfo.length
              ? "<ul class='link-list min-list'>"
              : "<p>No results match your search.</p>"
          }
          
          ${results.generalInfo
            .map((el) => {
              return `<li><a href="${el.permalink}">${el.title}</a>${
                el.postType == "post" ? ` by ${el.authorName}` : ``
              }</li>`;
            })
            .join("")}
            ${results.generalInfo.length ? "</ul>" : ""}
        </div>
        <div class="one-third">
          <h2 class="search-overlay__section-title">Programs</h2>
          <h2 class="search-overlay__section-title">Professors</h2>
        </div>
        <div class="one-third">
          <h2 class="search-overlay__section-title">Campuses</h2>
          <h2 class="search-overlay__section-title">Events</h2>
        </div>
      </div>
      `);
      }
    );
  }

  addSearchHTML() {
    $("body").append(`
    <div class="search-overlay">
      <div class="search-overlay__top">
          <div class="container">
              <i class="fa fa-search" aria-hidden="true"></i>
              <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term" autocomplete="off">
              <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
          </div>
      </div>
      <div class="container">
          <div id="search-overlay__results">
              Search results will appear shortly.
          </div>
      </div>
  </div>`);
  }
}

export default Search;
