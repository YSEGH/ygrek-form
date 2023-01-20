jQuery(function ($) {
  $(".ygrek_form--field").focus(function () {
    $(this).parents(".ygrek_form--element").addClass("is_active");
  });
  $(".ygrek_form--field").focusout(function () {
    $(this).parents(".ygrek_form--element").removeClass("is_active");
  });
});
