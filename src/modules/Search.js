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
  }

  openOverlay() {
    // alert("working");
    this.searchOverlay.addClass("search-overlay--active");
  }

  closeOverlay() {
    // alert("closing");
    this.searchOverlay.removeClass("search-overlay--active");
  }
}

export default Search;
