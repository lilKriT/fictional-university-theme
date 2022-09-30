import $ from "jquery";
class Search {
  constructor() {
    // alert("Hi");
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.events();
  }

  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keyup", this.keyPressDispatcher.bind(this));
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
  }

  keyPressDispatcher(e) {
    // console.log(e.keyCode);

    if (e.keyCode == 83) {
      this.openOverlay();
    }

    if (e.keyCode == 27) {
      this.closeOverlay();
    }
  }
}

export default Search;
