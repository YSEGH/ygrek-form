jQuery(function ($) {
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
