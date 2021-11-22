/**
 * DataTables Basic
 */

$(function () {
  "use strict";

  var html = "";
  var checked = "";
  var obj_oa = "";

  var dt_basic_table = $(".datatables-basic"),
    assetPath = "app-assets/";

  if ($("body").attr("data-framework") === "laravel") {
    assetPath = $("body").attr("data-asset-path");
  }

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    dt_basic_table.DataTable({
      processing: true,
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      ajax: assetPath + "data/table-datatable-CB.json",
      destroy: true,
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
          limit: 5,
        },
      },
      columns: [{ data: "nombre" }, { data: "descripcion" }, { data: "id" }],
      columnDefs: [
        {
          targets: 0,
          data: "download_link",
          render: function (data, type, row, meta) {
            if (row.priorizaciones == "1") {
              html = '<ion-icon name="star" class="text-warning"></ion-icon>';
            } else if (row.priorizaciones == "2") {
              html = '<ion-icon name="star-outline" class="text-warning"></ion-icon>';
            } else {
              html = "";
            }

            html = '<div class="d-flex align-items-center">' + '<div class="text-primary fw-500 mep-5">' + data + "</div></div>";
            return html;
          },
        },
        {
          targets: 2,
          data: "download_link",
          render: function (data, type, row, meta) {
            checked = "";

            html = '<div class="form-check form-check-inline mt-0 mb-1">' + '<input class="form-check-input check-oa" type="checkbox" id="inlineCheckboxOa" value="" ' + 'data-id="" data-nombre="" data-priorizacion="" data-descripcion="">' + "</div>";
            return html;
          },
        },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
      },
    });
    $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }
});
