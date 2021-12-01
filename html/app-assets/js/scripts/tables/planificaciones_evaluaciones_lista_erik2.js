/**
 * DataTables Basic
 */

$(function () {
  "use strict";

  var html = "";
  var checked = "";
  var obj_oa = "";

  var dt_basic_table = $(".dt-column-search");

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
          limit: 2,
        },
      },
      columns: [
        { data: "id", visible: false },
        { data: "descripcion" }, //// nombre
        { data: "nombre" }, ////eje
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
            html = '<div class="w-100 text-start"></div>';

            return html;
          },
        },
        {
          targets: 2,
          data: "download_link",
          autowidth: false,
          render: function (data, type, row, meta) {
            html = "";
            for (var i in row.objetivos) {
              if (row.objetivos[i].priorizaciones[0].id == 1) {
                html += '<div class="d-flex justify-content-center align-items-start  text-center flex-column">' + '<div class="text-primary fw-500 mep-5" id="' + row.objetivos[i].id + '" >' + row.objetivos[i].nombre + '<ion-icon name="star" class="text-warning  msp-5"></ion-icon>' + "</div></div>";
              } else if (row.objetivos[i].priorizaciones[0].id == 2) {
                html += '<div class="d-flex justify-content-center align-items-start flex-column">' + '<div class="text-primary fw-500 mep-5 " id="' + row.objetivos[i].id + '" >' + row.objetivos[i].nombre + '<ion-icon name="star-outline" class="text-warning  msp-5"></ion-icon>' + "</div>";
              } else {
                html += '<div class="d-flex justify-content-center align-items-start flex-column">' + '<div class="text-primary fw-500 mep-5 text-center" id="' + row.objetivos[i].id + '" >' + row.objetivos[i].nombre + "</div>";
                console.log("no hay priorizacion");
              }
            }
            return html;
          },
        },
        ],
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
      },
    });
    //dt_basic_table.columns.adjust().draw();
    dt_basic_table.DataTable().columns.adjust();
    dt_basic_table.DataTable().responsive.recalc();

    $("#modal_indicadores").on("shown.bs.modal", function () {
      dt_basic_table.DataTable().columns.adjust();
      dt_basic_table.DataTable().responsive.recalc();
    });

    // dt_basic_table.on("click", ".sweetAlert", function (e, dt, type, indexes) {
    //   console.log("id: " + this.id);
    //   Swal.fire({
    //     title: "Are you sure?",
    //     text: "You won't be able to revert this!",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Yes, delete it!",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
    //     }
    //   });
    // });
    $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }
});
