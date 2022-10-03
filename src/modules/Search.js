import $ from "jquery";
class Search {
  constructor() {
    // alert("Hi");
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
    $.getJSON(
      "http://fictional-university.local/wp-json/wp/v2/posts?search=" +
        this.searchField.val(),
      (posts) => {
        this.resultsDiv.html(`
        <h2 class="search-overlay__section-title">General information</h2>
        <ul class="link-list min-list">
        ${posts
          .map((el) => {
            return `<li><a href="${el.link}">${el.title.rendered}</a></li>`;
          })
          .join("")}
        </ul>
        `);
      }
    );
  }
}

export default Search;
