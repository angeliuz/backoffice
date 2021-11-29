/**
 * DataTables Basic
 */

$(function () {
  "use strict";

  var dt_multilingual_table = $(".dt-multilingual");
  var assetPath = "app-assets/";

  if ($("body").attr("data-framework") === "laravel") {
    assetPath = $("body").attr("data-asset-path");
  }

  // Multilingual DataTable
  // --------------------------------------------------------------------

  var lang = "Spanish";
  if (dt_multilingual_table.length) {
    var table_language = dt_multilingual_table.DataTable({
      ajax: assetPath + "data/gc_palabrasclaves_lista.json",
      columns: [{ data: "id" }, { data: "id" }, { data: "palabra" }, { data: "" }],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
        },
        {
          // Label
          targets: -3,
          render: function (data, type, full, meta) {
            var $status_number = full["estado"];
            var $status = {
              0: { title: "Oculto", class: " badge-light-danger" },
              1: { title: "Visible", class: " badge-light-success" },
              2: { title: "Rejected", class: " badge-light-primary" },
              3: { title: "Resigned", class: " badge-light-warning" },
              4: { title: "Applied", class: " badge-light-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return '<span class="badge rounded-pill ' + $status[$status_number].class + '">' + $status[$status_number].title + "</span>";
          },
        },
        {
          // Actions
          targets: 3,
          orderable: false,
          className: "text-center",
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
              feather.icons["more-vertical"].toSvg({ class: "font-small-4" }) +
              "</a>" +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item delete-record sweetAlert"' +
              data +
              '">' +
              feather.icons["trash-2"].toSvg({ class: "me-50 font-small-4" }) +
              "Eliminar</button>" +
              "</div>" +
              "</div>" +
              '<a href="gc_palabrasclaves_editar.html" target="_self" class="item-edit">' +
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
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
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
  dt_multilingual_table.on("click", ".sweetAlert", function (e, dt, type, indexes) {
    console.log("id: " + this.id);
    Swal.fire({
      title: "¡Atención!",
      text: "Estas seguro que deseas eliminar esta palabra clave. Esta acción afectara los recursos clasificados y no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, estoy seguro",
      cancelButtonText: "No eliminar",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "¡Borrado!",
          confirmButtonText: "Cerrar",
          text: "La palabra clave ha sido borrada.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  });
});
