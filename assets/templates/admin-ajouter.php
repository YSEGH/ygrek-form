<?php
do_action('ygrek_form_tab_links');
?>
<main>
    <h1>Ajouter un formulaire</h1>
    <form class="ygrek_form_admin--form-container" id="ygrek_form_admin--ajouter" method="post">
        <div class="ygrek_form_admin--form-group">
            <label for="form_id">Form ID</label>
            <input type="text" name="form_id">
        </div>
        <div class="ygrek_form_admin--row-container">
        </div>
        <button type="button" class="ygrek_form_admin--add-row-button">+ row</button>
        <button form="ygrek_form_admin--ajouter" type="submit">Envoyer</button>
    </form>

    <div class="ygrek_form_admin--element-to-clone hidden">
        <div class="ygrek_form_admin--col col-to-clone" data-type="input">
            <h4>Input</h4>
            <button type="button" class="ygrek_form_admin--remove-col-button">Delete</button>
        </div>
        <div class="ygrek_form_admin--row row-to-clone">
            <div class="ygrek_form_admin--col-container"></div>
            <button type="button" class="ygrek_form_admin--add-col-button">+</button>
        </div>
    </div>
</main>