/**
 * DataTables Basic
 */

$(function () {
  "use strict";

  var html = "";
  var checked = "";
  var obj_oa = "";

  var dt_basic_table = $(".dt-column-search");
  var dt_act_banco_recursos = $(".dt-banco-recursos");
    
  var assetPath = "app-assets/";

  // DataTable with buttons
  // --------------------------------------------------------------------

  

  if (dt_act_banco_recursos.length) {
    dt_act_banco_recursos.DataTable({
      processing: true,
      api: true,
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      //ajax: assetPath + "data/datatable_planificaciones_indicadores_lista.json",
      ajax: assetPath + "data/datatable_planificaciones_detalle_secuencia_act_indicadores_lista.json",
      destroy: true,
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
          limit: 5,
        },
      },
      columns: [
        { data: "id", width: "30px" },
        { data: "tipo_recurso", width: "350px" },
        { data: "nombre_archivo", autoWidth: true },

      ],
      columnDefs: [
        {
          // Actions
          targets: 0,
        },
        {
          targets: 2,
          data: "download_link",
          render: function (data, type, row, meta) {
            let html =
              '<div class="d-flex justify-content-start flex-column>"' +
              '<div class="text-start" ><div class="text-primary text-start fw-500" data-bs-html="true" data-bs-toggle="tooltip" title="<div class=\'text-start\'>' +
              row.nombre_seleccion +
              '</div>" id="' +
              row.id +
              '"  >' +
              row.tipo_recurso +
              "</div>" +
              '<div data-bs-toggle="tooltip" title="' +
              row.nombre_priorizacion +
              '">' +
              (row.id_priorizacion == 1 ? '<ion-icon name="star" class="text-warning msp-5"></ion-icon></div>' : "") +
              "</div>" +
              "</div>";
            return html;
          },
        },
        {
          targets: 3,
          data: "download_link",
          render: function (data, type, row, meta) {
            let html =
              '<div class="d-flex justify-content-start flex-column>"' +
              '<div class="text-start" ><div class="text-primary text-start fw-500" data-bs-html="true" data-bs-toggle="tooltip" title="<div class=\'text-start\'>' +
              row.descripcion +
              '</div>" id="' +
              row.id +
              '"  >' +
              row.nombre_objetivo +
              "</div>" +
              '<div data-bs-toggle="tooltip" title="' +
              row.nombre_priorizacion +
              '">' +
              (row.id_priorizacion == 1 ? '<ion-icon name="star" class="text-warning msp-5"></ion-icon></div>' : "") +
              (row.id_priorizacion == 2 ? '<ion-icon name="star-outline" class="text-warning msp-5"></ion-icon></div>' : "") +
              (row.id_priorizacion == 3 ? "" : "") +
              "</div>" +
              "</div>";
            return html;
          },
        },
        {
          // Actions
          targets: 4,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="form-check form-check-inline mt-0 wp-10">' +
              "<input " +
              'class="form-check-input" ' +
              'type="checkbox" ' +
              "</div>" 
            );
          },
        },
      ],
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
      },
      drawCallback: function () {
        $(document).find('[data-bs-toggle="tooltip"]').tooltip();
      },
    });
    //dt_basic_table.columns.adjust().draw();
    dt_indicadores.DataTable().columns.adjust();
    //dt_indicadores.DataTable().responsive.recalc();

    $("#modal_indicadores").on("shown.bs.modal", function () {
      dt_indicadores.DataTable().columns.adjust();
      // dt_indicadores.DataTable().responsive.recalc();
    });

    $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }
});



