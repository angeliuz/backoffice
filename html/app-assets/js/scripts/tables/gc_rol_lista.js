/**
 * DataTables Basic
 */

$(function () {
  "use strict";

  var dt_basic_table = $(".datatables-basic"),
    dt_date_table = $(".dt-date"),
    dt_complex_header_table = $(".dt-complex-header"),
    dt_row_grouping_table = $(".dt-row-grouping"),
    dt_multilingual_table = $(".dt-multilingual"),
    assetPath = "app-assets/";

  if ($("body").attr("data-framework") === "laravel") {
    assetPath = $("body").attr("data-asset-path");
  }

  // Multilingual DataTable
  // --------------------------------------------------------------------

  var lang = "Spanish";
  if (dt_multilingual_table.length) {
    var table_language = dt_multilingual_table.DataTable({
      ajax: assetPath + "data/gc_rol_lista.json",
      columns: [
        { data: "id" },
        { data: "id" },
        { data: "rol" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full["status"];
            var $status = {
              1: { title: "Current", class: "badge-light-primary" },
              2: { title: "Professional", class: " badge-light-success" },
              3: { title: "Rejected", class: " badge-light-danger" },
              4: { title: "Resigned", class: " badge-light-warning" },
              5: { title: "Applied", class: " badge-light-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Acción",
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a href="gc_colegio_editar.html" target="_self" class="item-edit">' +
              feather.icons["edit"].toSvg({ class: "font-small-4" }) +
              "</a>"
            );
          },
        },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/" + lang + ".json",
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
        },
      },
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 8,
      lengthMenu: [8, 10, 25, 50, 75, 100],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["full_name"];
            },
          }),
          type: "column",
          renderer: $.fn.dataTable.Responsive.renderer.tableAll({
            tableClass: "table",
          }),
        },
      },
    });
  }
});
