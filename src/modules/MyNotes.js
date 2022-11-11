import $ from "jquery";

class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    $(".delete-note").on("click", this.deleteNote);
  }

  // Custom methods
  deleteNote() {
    alert("Deleting note");
  }
}

export default MyNotes;
