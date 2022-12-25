jQuery(($) => {
  /* Ajout d'une ligne */
  $(".ygrek_form_admin--add-row-button").click((e) => {
    let row_container = $(".ygrek_form_admin--row-container");
    let row_clone = $(`.ygrek_form_admin--row.row-to-clone`).clone();
    let row_index =
      $(".ygrek_form_admin--row-container").find(".ygrek_form_admin--row")
        .length + 1;
    row_clone.attr("data-row", row_index);
    row_clone
      .find(".ygrek_form_admin--col-container")
      .attr("data-row", row_index);
    row_clone
      .find(".ygrek_form_admin--add-col-button")
      .attr("data-row", row_index);
    row_clone.removeClass("row-to-clone");
    row_clone.appendTo(row_container);
  });
  /* Ajout d'une colonne */
  $(document).on("click", ".ygrek_form_admin--add-col-button", (e) => {
    let row_index = e.target.dataset.row;
    let col_container = $(
      `.ygrek_form_admin--col-container[data-row="${row_index}"]`
    );
    /* Vérifie si le maximum de colonne est atteint */
    let cols_number = $.fn.checkMaxCol(row_index);
    if (cols_number < 3) {
      let col_clone = $(`.ygrek_form_admin--col.col-to-clone`).clone();
      col_clone.attr("data-col", cols_number + 1);
      col_clone.removeClass("col-to-clone");
      col_clone
        .find("button.ygrek_form_admin--remove-col-button")
        .attr("data-col", cols_number + 1);
      col_clone.appendTo(col_container);
    }
    if (cols_number + 1 >= 3) {
      e.target.classList.add("hidden");
    }
  });

  /* Retourne le nombre de colonne dans une ligne */
  $.fn.checkMaxCol = function (row_index) {
    let cols = $(
      `.ygrek_form_admin--col-container[data-row="${row_index}"] .ygrek_form_admin--col`
    ).length;
    return cols;
  };

  /* Suppression d'une colonne */
  $(document).on("click", ".ygrek_form_admin--remove-col-button", (e) => {
    let col = e.target.parentElement;
    let col_container = col.parentElement;
    let row_index = col_container.dataset.row;
    console.log("row_index", row_index);
    col.remove();
    let children = col_container.children.length;
    if (
      children < 3 &&
      $(`.ygrek_form_admin--add-col-button[data-row=${row_index}]`).hasClass(
        "hidden"
      )
    ) {
      $(`.ygrek_form_admin--add-col-button[data-row=${row_index}]`).removeClass(
        "hidden"
      );
    }
    if (children > 0) {
      for (let i = 0; i < col_container.children.length; i++) {
        $(col_container.children[i]).attr("data-col", i + 1);
      }
    } else {
      let row = col_container.parentElement;
      row.remove();
    }
  });

  $("#ygrek_form_admin--ajouter").submit(function (e) {
    e.preventDefault();
    $form_id = console.log($(this).serializeArray());
    /* $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: { action: "add_ygrek_form", form_id: product_id },
    })
      .done(function (data) {})
      .fail(function (xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
      }); */
  });
});
