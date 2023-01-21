jQuery(function ($) {
  const baseURL =
    window.location.origin + "/monouebsite/wp-json/yf-form/submission";

  $('form[data-form="ygrek-form"]').submit((e) => {
    e.preventDefault();
    let form = {};
    let data = [];
    form.form_id = $(e.target).data("id");
    form.timestamp = Date.now();
    $(`form#${e.target.id} :input`).each(function () {
      if (this.type !== "submit") {
        let input = {};
        input.col_id = $(this).parents(".ygrek_form--element").data("col");
        input.title = $(this).data("title");
        input.required = $(this).prop("required");
        input.value = $(this).val();
        data.push(input);
      }
    });
    form.data = JSON.stringify(data);
    console.log(form);
    $.ajax({
      type: "POST",
      url: baseURL + "/add",
      data: form,
      dataType: "json",
    })
      .done(function (data) {
        console.log(data);
      })
      .fail(function (data) {
        col_errors = data.responseJSON;
        for (const key in col_errors) {
          $(
            `.ygrek_form--element[data-col="${col_errors[key].col_id}"]`
          ).addClass("is_error");
          $(
            `.ygrek_form--element[data-col="${col_errors[key].col_id}"] .ygrek_form--error-message`
          ).prepend(`<p>${col_errors[key].message}</p>`);
        }
      });
  });
});
