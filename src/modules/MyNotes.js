import $ from "jquery";

class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    $(".delete-note").on("click", this.deleteNote);
    $(".edit-note").on("click", this.editNote);
  }

  // Custom methods
  deleteNote(e) {
    let thisNote = $(e.target).parents("li");

    $.ajax({
      url:
        universityData.root_url + "/wp-json/wp/v2/note/" + thisNote.data("id"),
      type: "DELETE",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      success: (res) => {
        thisNote.slideUp();
        console.log("Note removed");
        console.log(res);
      },
      error: (res) => {
        console.log("Couldn't remove");
        console.log(res);
      },
    });
  }

  editNote(e) {
    let thisNote = $(e.target).parents("li");

    thisNote
      .find(".note-title-field, .note-body-field")
      .removeAttr("readonly")
      .addClass("note-active-field");
    thisNote.find(".update-note").addClass("update-note--visible");
  }
}

export default MyNotes;
