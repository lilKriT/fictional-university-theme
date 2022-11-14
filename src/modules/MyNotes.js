import $ from "jquery";

class MyNotes {
  constructor() {
    this.events();
  }

  events() {
    $(".delete-note").on("click", this.deleteNote);
    $(".edit-note").on("click", this.editNote.bind(this));
    $(".update-note").on("click", this.updateNote.bind(this));
    $(".submit-note").on("click", this.createNote.bind(this));
  }

  // Custom methods
  createNote(e) {
    let newPost = {
      title: $(".new-note-title").val(),
      content: $(".new-note-body").val(),
      status: "publish",
    };

    $.ajax({
      url: universityData.root_url + "/wp-json/wp/v2/note/",
      type: "POST",
      data: newPost,
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      success: (res) => {
        $(".new-note-title, .new-note-body").val("");
        $("<li>data goes here</li>").prependTo("#my-notes").hide().slideDown();

        console.log("Note created");
        console.log(res);
      },
      error: (res) => {
        console.log("Couldn't create");
        console.log(res);
      },
    });
  }

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

  // Updating note
  updateNote(e) {
    let thisNote = $(e.target).parents("li");

    let updatedPost = {
      title: thisNote.find(".note-title-field").val(),
      content: thisNote.find(".note-body-field").val(),
    };

    $.ajax({
      url:
        universityData.root_url + "/wp-json/wp/v2/note/" + thisNote.data("id"),
      type: "POST",
      data: updatedPost,
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      success: (res) => {
        this.makeNoteReadOnly(thisNote);
        console.log("Note updated");
        console.log(res);
      },
      error: (res) => {
        console.log("Couldn't update");
        console.log(res);
      },
    });
  }

  editNote(e) {
    let thisNote = $(e.target).parents("li");

    if (thisNote.data("state") == "editable") {
      // Make read only
      this.makeNoteReadOnly(thisNote);
    } else {
      // Make editable
      this.makeNoteEditable(thisNote);
    }
  }

  // Editing
  makeNoteEditable(thisNote) {
    thisNote
      .find(".edit-note")
      .html('<i class="fa fa-times" aria-hidden="true"></i>Cancel');

    thisNote
      .find(".note-title-field, .note-body-field")
      .removeAttr("readonly")
      .addClass("note-active-field");

    thisNote.find(".update-note").addClass("update-note--visible");
    thisNote.data("state", "editable");
  }

  // Cancelling edit
  makeNoteReadOnly(thisNote) {
    thisNote
      .find(".edit-note")
      .html('<i class="fa fa-pencil" aria-hidden="true"></i>Edit');

    thisNote
      .find(".note-title-field, .note-body-field")
      .attr("readonly", "readonly")
      .removeClass("note-active-field");

    thisNote.find(".update-note").removeClass("update-note--visible");
    thisNote.data("state", "cancel");
  }
}

export default MyNotes;
