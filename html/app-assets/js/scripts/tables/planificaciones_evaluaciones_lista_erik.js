/**
 * DataTables Basic
 */

$(function () {
  "use strict";

  var html = "";
  var checked = "";
  var obj_oa = "";

  var dt_basic_table = $(".dt-column-search");
  var dt_indicadores = $(".dt-indicadores");

  var assetPath = "app-assets/";

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    dt_basic_table.DataTable({
      processing: true,
      api: true,
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      ajax: assetPath + "data/datatable_planificaciones_evaluaciones_lista_erik.json",
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
        { data: "id", visible: false },
        { data: "nombre_evaluacion" }, //// nombre
        { data: "" }, ///tipo_recurso
        { data: "" }, ////oa
        { data: "oa" }, ////eje
        { data: "" }, ///
      ],
      columnDefs: [
        {
          targets: 0,
        },
        {
          targets: 1,
          data: "download_link",
          autowidth: false,
          render: function (data, type, row, meta) {
            console.log(row.enlace);
            html = '<div class="d-flex justify-content-left wp-30 align-items-center"><div class="me-1"><img class="wp-40" src="app-assets/images/icons/' + row.icono + '"></div><div class="d-flex flex-column"><span class="emp_name text-truncate fw-bold">' + row.nombre_evaluacion + "</span>";

            return html;
          },
        },
        {
          targets: 2,
          data: "download_link",
          autowidth: false,
          render: function (data, type, row, meta) {
            html = '<div class="w-100 text-center"><ion-icon name="eye-outline" class="text-primary  h2"></ion-icon></div>';

            return html;
          },
        },
        {
          targets: 3,
          data: "download_link",
          autowidth: false,
          render: function (data, type, row, meta) {
            html = '<div class="w-100 text-center " data-bs-toggle="modal" data-bs-target="#modal_indicadores" ><ion-icon name="navigate-outline" class="text-primary h2"></div>';

            return html;
          },
        },
        {
          targets: 4,
          data: "download_link",
          autowidth: false,
          render: function (data, type, row, meta) {
            html = "";
            for (var i in row.objetivos) {
              html+='<div class="d-flex justify-content-start flex-column>"' +
              '<div class="text-start" ><div class="text-primary text-start fw-500" data-bs-html="true" data-bs-toggle="tooltip" title="<div class=\'text-start\'>' +
              row.objetivos[i].descripcion +
              '</div>" id="' +
              row.objetivos[i].id +
              '"  >' +
              row.objetivos[i].nombre +
              "</div>" +
              '<div data-bs-toggle="tooltip" title="' +
              row.objetivos[i].priorizaciones[0].nombre +
              '">' +
              (row.objetivos[i].priorizaciones[0].id == 1 ? '<ion-icon name="star" class="text-warning msp-5"></ion-icon></div>' : "") +
              (row.objetivos[i].priorizaciones[0].id == 2 ? '<ion-icon name="star-outline" class="text-warning msp-5"></ion-icon></div>' : "") +
              (row.objetivos[i].priorizaciones[0].id == 3 ? "" : "") +
              "</div>" +
              "</div>";

              // if (row.objetivos[i].priorizaciones[0].id == 1) {
              //   html += '<div class="d-flex justify-content-start flex-column">' + '<div class="text-primary fw-500 mep-5" id="' + row.objetivos[i].id + '" data-bs-html="true" data-bs-toggle="tooltip" title="ERIK" >' + row.objetivos[i].nombre + '</div><div data-bs-html="true" data-bs-toggle="tooltip" title="PEREDA"><ion-icon name="star" class="text-warning  msp-5   ></ion-icon></div> </div>';
              // } else if (row.objetivos[i].priorizaciones[0].id == 2) {
              //   html += '<div class="d-flex justify-content-end align-items-start flex-column  data-bs-html="true" data-bs-toggle="tooltip" title="ANAKIN"">' + '<div class="text-primary fw-500 mep-5 " id="' + row.objetivos[i].id + '" >' + row.objetivos[i].nombre + '<ion-icon name="star-outline" class="text-warning  msp-5 data-bs-html="true" data-bs-toggle="tooltip" title="SKYWALKER""></ion-icon>' + "</div>";
              // } else {
              //   html += '<div class="d-flex justify-content-center align-items-start text-center d-block flex-column data-bs-html="true" data-bs-toggle="tooltip" title="OBI WAN"">' + '<div class="text-primary fw-500 mep-5 text-center"  data-bs-html="true" data-bs-toggle="tooltip" title="KENOBI" id="' + row.objetivos[i].id + '" >' + row.objetivos[i].nombre + "</div>";
              //   console.log("no hay priorizacion");
              // }
            }
            return html;
          },
        },
        {
          targets: 5,
          data: "download_link",
          render: function (data, type, row, meta) {
            checked = "";
            html = '<div class="w-100 text-center" ><div class="form-check form-check-inline mt-0 mb-1"><input class="form-check-input check-oa" type="checkbox" id="inlineCheckboxOa" value="" data-id="" data-nombre="" data-priorizacion="" data-descripcion=""></div></div>';
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
    dt_basic_table.DataTable().columns.adjust();
    dt_basic_table.DataTable().responsive.recalc();

    $("#modaloa").on("shown.bs.modal", function () {
      dt_basic_table.DataTable().columns.adjust();
      dt_basic_table.DataTable().responsive.recalc();
    });

    $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }

  if (dt_indicadores.length) {
    dt_indicadores.DataTable({
      processing: true,
      api: true,
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      ajax: assetPath + "data/datatable_planificaciones_indicadores_lista.json",
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
        { data: "id", width: "80px" },
        { data: "indicador", autoWidth: true },
        { data: "nombre_objetivo", width: "190px" },
      ],
      columnDefs: [
        {
          targets: 0,
        },
        {
          targets: 2,
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
