jQuery(function ($) {
  const baseURL =
    window.location.origin + "/monouebsite/wp-json/yf-form/submission";

  $('form[data-form="ygrek-form"]').submit((e) => {
    e.preventDefault();
    let form = {};
    let data = [];
    form.form_id = $(e.target).data("id");
    form.form_title = $(
      `.form__container--title[data-form="${form.form_id}"]`
    ).text();
    console.log(form.form_title);
    form.timestamp = Date.now();
    $(`form#${e.target.id} :input`).each(function () {
      if (this.type !== "submit") {
        let input = {};
        switch (this.type.split("-")[0]) {
          case "text":
          case "file":
          case "tel":
          case "select":
          case "email":
          case "date":
          case "color":
            input.col_id = $(this).parents(".ygrek_form--element").data("col");
            input.type = $(this).data("type");
            input.title = $(`h4[for="${$(this).attr("id")}"]`).text();
            input.required = $(this).prop("required");
            input.value = $(this).val();
            data.push(input);
            input = {};
            break;
          case "textarea":
            input.col_id = $(this).parents(".ygrek_form--element").data("col");
            input.type = $(this).data("type");
            input.title = $(`h4[for="${$(this).attr("id")}"]`).text();
            input.required = $(this).prop("required");
            input.value = $(this).val();
            data.push(input);
            input = {};
            break;
          case "radio":
          case "checkbox":
            input.col_id = $(this).parents(".ygrek_form--element").data("col");
            input.type = $(this).data("type");
            input.title = $(`h4[for="${$(this).attr("name")}"]`).text();
            input.required = $(this).prop("required");
            input.value = $(`label[for="${$(this).attr("id")}"]`).text();
            input.checked = $(this).is(":checked");
            let exist = data.some((el) => el.title === input.title);
            console.log(exist, input.title);
            if (exist) {
              data.map((el) => {
                if (el.title === input.title) {
                  el.values.push(input.value);
                  if (input.checked) {
                    el.selected.push(input.value);
                  }
                }
                return el;
              });
            } else {
              let form_input = {
                col_id: input.col_id,
                title: input.title,
                type: input.type,
                required: input.required,
                values: [input.value],
                selected: [],
              };
              if (input.checked) {
                form_input.selected.push(input.value);
              }
              data.push(form_input);
            }
            input = {};
            break;
          default:
            break;
        }
      }
    });

    console.log(data);
    console.log(form);
    form.data = JSON.stringify(data);
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
        console.log(data);
        col_errors = data.responseJSON.data;
        for (const key in col_errors) {
          $(
            `.ygrek_form--element[data-col="${col_errors[key].col_id}"] .ygrek_form--error-message p`
          ).remove();
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
