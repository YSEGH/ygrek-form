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
        input.title = $(this).data("title");
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
    }).done(function (data) {
      console.log(data);
    });
  });
});
