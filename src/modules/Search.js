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

    if (e.keyCode == 83 && !this.isOverlayOpen) {
      this.openOverlay();
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  typingLogic(e) {
    clearTimeout(this.typingTimer);
    if (!this.isSpinnerVisible) {
      this.resultsDiv.html("<div class='spinner-loader'></div>");
      this.isSpinnerVisible = true;
    }
    this.typingTimer = setTimeout(this.getResults.bind(this), 500);
  }

  getResults() {
    this.resultsDiv.html("Results will go here");
    this.isSpinnerVisible = false;
  }
}

export default Search;
