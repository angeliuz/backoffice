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
      ajax: assetPath + "data/table-datatable-EP2.json",
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
        { data: "descripcion" }, //// nombre
        { data: "oa" }, ////eje
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
    });
    //dt_basic_table.columns.adjust().draw();
    dt_basic_table.DataTable().columns.adjust();
    dt_basic_table.DataTable().responsive.recalc();

    $("#modaloa").on("shown.bs.modal", function () {
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
