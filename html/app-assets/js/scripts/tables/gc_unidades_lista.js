/**
 * DataTables Advanced
 */

'use strict';

$(function () {
  var isRtl = $("html").attr("data-textdirection") === "rtl";

  var dt_filter_table = $(".dt-column-search"),
    assetPath = "app-assets/";

  if ($("body").attr("data-framework") === "laravel") {
    assetPath = $("body").attr("data-asset-path");
  }

  // Column Search
  // --------------------------------------------------------------------

  if (dt_filter_table.length) {
    // Setup - add a text input to each footer cell
    $('.dt-column-search thead tr').clone(true).appendTo('.dt-column-search thead');
    $('.dt-column-search thead tr:eq(1) th').each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Search ' + title + '" />');

      $('input', this).on('keyup change', function () {
        if (dt_filter.column(i).search() !== this.value) {
          dt_filter.column(i).search(this.value).draw();
        }
      });
    });

    var dt_filter = dt_filter_table.DataTable({
      ajax: assetPath + 'data/gc_unidades_lista.json',

      function (){
        console.log("hola david");
      },

      columns: [
        { data: 'id' },
        { data: 'area' },
        { data: 'nivel' },
        { data: 'unidades' },
        { data: 'creada' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
        },
        {
         // Actions
         targets: -1,
         title: "Acción",
         orderable: false,
         render: function (data, type, full, meta) {
           return (
             '<div class="d-inline-flex">' +
             '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
             feather.icons["more-vertical"].toSvg({ class: "font-small-4" }) +
             "</a>" +
             '<div class="dropdown-menu dropdown-menu-end">' +
             '<a href="javascript:;" type="button" class="dropdown-item delete-record" id="confirm-text" onclick="david();">' +
             feather.icons["trash-2"].toSvg({ class: "me-50 font-small-4" }) +
             "Eliminar</button>" +
             "</div>" +
             "</div>" +
             '<a href="gc_unidades_editar.html" target="_self" class="item-edit">' +
             feather.icons["edit"].toSvg({ class: "font-small-4" }) +
             "</a>"
           );
         },
        },
        {
         // Centrar Unidades
         targets: -3,
         title: "Unidades",
         orderable: true,
         className: 'd-flex justify-content-center'
        },
      ],

      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      orderCellsTop: true,
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
        },
      },
    });
  }

  // Filter form control to default size for all tables
  $(".dataTables_filter .form-control").removeClass("form-control-sm");
  $(".dataTables_length .form-select")
    .removeClass("form-select-sm")
    .removeClass("form-control-sm");
});