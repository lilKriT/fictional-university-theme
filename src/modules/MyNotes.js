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
    // alert("Deleting note");
    $.ajax({
      url: universityData.root_url + "/wp-json/wp/v2/note/88",
      type: "DELETE",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      success: (res) => {
        console.log("Note removed");
        console.log(res);
      },
      error: (res) => {
        console.log("Couldn't remove");
        console.log(res);
      },
    });
  }
}

export default MyNotes;
