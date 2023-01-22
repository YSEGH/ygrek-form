jQuery(function ($) {
  $(".ygrek_form--field").on("input", function () {
    if ($(this).parents(".ygrek_form--element").hasClass("is_error")) {
      $(this).parents(".ygrek_form--element").removeClass("is_error");
      $(this)
        .parents(".ygrek_form--element")
        .find(".ygrek_form--error-message p")
        .remove();
    }
  });
  $(".ygrek_form--field").focus(function () {
    $(this).parents(".ygrek_form--element").addClass("is_active");
  });
  $(".ygrek_form--field").focusout(function () {
    if ($(this).val() === "") {
      $(this).parents(".ygrek_form--element").removeClass("is_active");
      $(this).parents(".ygrek_form--element").removeClass("has_value");
      return;
    }
    $(this).parents(".ygrek_form--element").addClass("has_value");
  });
});
