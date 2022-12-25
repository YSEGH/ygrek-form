jQuery(function ($) {
  $(document).ready(() => {});
  $(".ygrek_form").on("submit", function (e) {
    e.preventDefault();
    console.log($(this).serialize());
    /* $.ajax({
      type: "post",
      url: "post.php",
      data: $("form").serialize(),
      success: function () {
        alert("form was submitted");
      },
    }); */
  });
});
