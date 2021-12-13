/**
 * DataTables Basic
 */

$(function () {
  console.log("aquí parte");
  "use strict";

  var html = "";
  var checked = "";
  var obj_oa = "";

  var dt_basic_table = $(".dt-column-search");
  var dt_act_indicadores = $(".dt-indicadores-actividad");
  
 
  var assetPath = "app-assets/";

  // DataTable with buttons
  // --------------------------------------------------------------------

  

  if (dt_act_indicadores.length) {
    dt_act_indicadores.DataTable({
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
        { data: "id" },
        { data: "indicador" },
        { data: "nombre_objetivo" },
      ],
      columnDefs: [
        {
          // Actions
          targets: 0,
          width:20,
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
        { 
          targets: 1,
          autoWidth:true,
        },
        {
          targets: 2,
          width:50,
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
              $('[data-bs-toggle="tooltip"]').tooltip()
            return html;
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
    console.log("carga dt indicadores");
    dt_act_indicadores.DataTable().columns.adjust().draw();
    dt_act_indicadores.DataTable().responsive.recalc().draw();

    $("#modalactividades").on("shown.bs.modal", function () {
      console.log("apertura modal indicadores");
      dt_act_indicadores.DataTable().columns.adjust().draw();
      dt_act_indicadores.DataTable().responsive.recalc().draw();
    });

    $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }
});
//AJUSTE 
$("#btn_indicadores").click(function () {
  $(".dt-indicadores-actividad").DataTable().columns.adjust();
 });

