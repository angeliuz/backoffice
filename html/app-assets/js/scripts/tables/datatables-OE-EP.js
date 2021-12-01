/**
 * DataTables Basic
 */

$(function () {
  "use strict";

  var html = "";
  var checked = "";
  var obj_oa = "";

  var dt_basic_table = $(".datatables-OE");

  var assetPath = "app-assets/";

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    dt_basic_table.DataTable({
      processing: true,
      api: true,
      //dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i>>',
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
        { data: "descripcion", width: 600 },
        { data: "nombre", width: 20 },
        { data: "id", width: 0 },
      ],
      columnDefs: [
        {
          targets: 1,
          data: "download_link",
          autowidth: false,
          render: function (data, type, row, meta) {
            for (var i in row.priorizaciones) {
              if (row.priorizaciones[i]["id"] == "1") {
                html = '<ion-icon name="star" class="text-warning"></ion-icon>';
              } else if (row.priorizaciones[i]["id"] == "2") {
                html = '<ion-icon name="star-outline" class="text-warning"></ion-icon>';
              } else {
                html = "";
              }
            }
            html = '<div class="d-flex align-items-center">' + '<div class="text-primary fw-500 mep-5 sweetAlert" id="' + data + '" >' + data + "</div>" + html + "</div>";
            return html;
          },
        },
        {
  ///     targets: 1,
          targets: 2,
          data: "download_link",
          render: function (data, type, row, meta) {
            checked = "";
/*
            for (aoa in obj_oa) {
              if (aoa == data) {
                checked = "checked";
              }
            }
*/
            html =
              ///'<div class="form-check form-check-inline mt-0 mb-1">' +
              '<div class="mt-0 mb-1">' +
            //  "<input " +
              //checked +
        //      " " +
             /// 'class="form-check-input check-oa" ' + 'type="checkbox" ' + 'id="inlineCheckboxOa" ' + 'value="' + data + '" ' +
             /// 'data-id="' +
              ///row.id +
              ///'" ' +
          ///    'data-descripcion="' +
          //    row.descripcion +
          //    '" ' +
              'data-nombre="' +
              row.nombre +
              '" ' +
              'data-priorizacion="' +
        //    row.priorizaciones[0].id +
              row.priorizaciones[0]+

       //       '"' +
        //      ">" +
              "</div>";
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

    $("#modaloe").on("shown.bs.modal", function () {
      dt_basic_table.DataTable().columns.adjust();
      dt_basic_table.DataTable().responsive.recalc();
    });

    dt_basic_table.on("click", ".sweetAlert", function (e, dt, type, indexes) {
      console.log("id: " + this.id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    });
    $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }
});
