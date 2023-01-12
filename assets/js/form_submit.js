jQuery(function ($) {
  $('form[data-form="ygrek-form"]').submit((e) => {
    e.preventDefault();
    let data = [];
    $(`form#${e.target.id} :input`).each(function () {
      if (this.type !== "submit") {
        let input = {};
        input.title = $(this).data("title");
        input.value = $(this).val();
        data.push(input);
      }
    });
    console.log(data);
  });
});
