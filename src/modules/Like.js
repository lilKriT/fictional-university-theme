import $ from "jquery";

class Like {
  constructor() {
    this.events();
  }

  events() {
    $(".like-box").on("click", this.ourClickDispatcher.bind(this));
  }

  // methods
  ourClickDispatcher(e) {
    let currentLikeBox = $(e.target).closest(".like-box");

    if (currentLikeBox.attr("data-exists") == "yes") {
      this.deleteLike(currentLikeBox);
    } else {
      this.createLike(currentLikeBox);
    }
  }

  createLike(likeBox) {
    $.ajax({
      url: universityData.root_url + "/wp-json/university/v1/manageLike",
      type: "POST",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      data: { professorID: likeBox.data("professor") },
      success: (res) => {
        likeBox.attr("data-exists", "yes");
        likeBox.attr("data-like", res);
        let likeCount = parseInt(likeBox.find(".like-count").html(), 10);
        likeCount++;
        likeBox.find(".like-count").html(likeCount);
        console.log(res);
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

  deleteLike(likeBox) {
    $.ajax({
      url: universityData.root_url + "/wp-json/university/v1/manageLike",
      type: "DELETE",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
      },
      data: { like: likeBox.attr("data-like") },
      success: (res) => {
        likeBox.attr("data-exists", "no");
        likeBox.attr("data-like", "");
        let likeCount = parseInt(likeBox.find(".like-count").html(), 10);
        likeCount--;
        likeBox.find(".like-count").html(likeCount);
        console.log(res);
      },
      error: (res) => {
        console.log(res);
      },
    });
  }
}

export default Like;
