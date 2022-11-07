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
          ${
            results.programs.length
              ? "<ul class='link-list min-list'>"
              : `<p>No programs match your search. <a href="${universityData.root_url}/programs">View all programs</a></p>`
          }
          
          ${results.programs
            .map((el) => {
              return `<li><a href="${el.permalink}">${el.title}</a></li>`;
            })
            .join("")}
            ${results.programs.length ? "</ul>" : ""}
            
          <h2 class="search-overlay__section-title">Professors</h2>
          ${
            results.professors.length
              ? "<ul class='professor-cards'>"
              : `<p>No professors match your search.</p>`
          }
          
          ${results.professors
            .map((el) => {
              return `<li class="professor-card__list-item">
                    <a href="${el.permalink}" class="professor-card">
                        <img class="professor-card__image" src="${el.image}">
                        <span class="professor-card__name">${el.title}</span>
                    </a>
                </li>
              `;
            })
            .join("")}
            ${results.professors.length ? "</ul>" : ""}
        </div>
        <div class="one-third">
          <h2 class="search-overlay__section-title">Campuses</h2>
          ${
            results.campuses.length
              ? "<ul class='link-list min-list'>"
              : `<p>No campuses match your search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`
          }
          
          ${results.campuses
            .map((el) => {
              return `<li><a href="${el.permalink}">${el.title}</a></li>`;
            })
            .join("")}
            ${results.campuses.length ? "</ul>" : ""}
          <h2 class="search-overlay__section-title">Events</h2>
          ${
            results.events.length
              ? ""
              : `<p>No events match your search. <a href="${universityData.root_url}/events">View all events</a></p>`
          }
          
          ${results.events
            .map((el) => {
              return `
              <div class="event-summary">
                <a class="event-summary__date t-center" href="${el.permalink}">
                    <span class="event-summary__month">${el.month}</span>
                    <span class="event-summary__day">${el.day}</span>
                </a>
                <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny"><a href="${el.permalink}">${el.title}</a></h5>
                    <p>${el.description}<a href="${el.permalink}" class="nu gray">Learn more</a></p>
                </div>
            </div>
              `;
            })
            .join("")}
        </div>
      </div>
      `);

        this.isSpinnerVisible = false;
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
