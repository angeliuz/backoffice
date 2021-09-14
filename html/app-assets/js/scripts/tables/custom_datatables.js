/**
 * DataTables Advanced
 */

"use strict";

function abreIndicadoresOA(id_oa) {
  $(".modal-body").html(id_oa);
}

// Advanced Search Functions Starts
// --------------------------------------------------------------------

// Filter column wise function
function filterColumn(i, val) {
  if (i == 5) {
    var startDate = $(".start_date").val(),
      endDate = $(".end_date").val();
    if (startDate !== "" && endDate !== "") {
      filterByDate(i, startDate, endDate); // We call our filter function
    }

    $(".dt-advanced-search").dataTable().fnDraw();
  } else {
    $(".dt-advanced-search")
      .DataTable()
      .column(i)
      .search(val, false, true)
      .draw();
  }
}

// Datepicker for advanced filter
var separator = " - ",
  rangePickr = $(".flatpickr-range"),
  dateFormat = "MM/DD/YYYY";
var options = {
  autoUpdateInput: false,
  autoApply: true,
  locale: {
    format: dateFormat,
    separator: separator,
  },
  opens: $("html").attr("data-textdirection") === "rtl" ? "left" : "right",
};

//
if (rangePickr.length) {
  rangePickr.flatpickr({
    mode: "range",
    dateFormat: "m/d/Y",
    onClose: function (selectedDates, dateStr, instance) {
      var startDate = "",
        endDate = new Date();
      if (selectedDates[0] != undefined) {
        startDate =
          selectedDates[0].getMonth() +
          1 +
          "/" +
          selectedDates[0].getDate() +
          "/" +
          selectedDates[0].getFullYear();
        $(".start_date").val(startDate);
      }
      if (selectedDates[1] != undefined) {
        endDate =
          selectedDates[1].getMonth() +
          1 +
          "/" +
          selectedDates[1].getDate() +
          "/" +
          selectedDates[1].getFullYear();
        $(".end_date").val(endDate);
      }
      $(rangePickr).trigger("change").trigger("keyup");
    },
  });
}

// Advance filter function
// We pass the column location, the start date, and the end date
var filterByDate = function (column, startDate, endDate) {
  // Custom filter syntax requires pushing the new filter to the global filter array
  $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData, iDataIndex) {
    var rowDate = normalizeDate(aData[column]),
      start = normalizeDate(startDate),
      end = normalizeDate(endDate);

    // If our date from the row is between the start and end
    if (start <= rowDate && rowDate <= end) {
      return true;
    } else if (rowDate >= start && end === "" && start !== "") {
      return true;
    } else if (rowDate <= end && start === "" && end !== "") {
      return true;
    } else {
      return false;
    }
  });
};

// converts date strings to a Date object, then normalized into a YYYYMMMDD format (ex: 20131220). Makes comparing dates easier. ex: 20131220 > 20121220
var normalizeDate = function (dateString) {
  var date = new Date(dateString);
  var normalized =
    date.getFullYear() +
    "" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "" +
    ("0" + date.getDate()).slice(-2);
  return normalized;
};
// Advanced Search Functions Ends

$(function () {
  var isRtl = $("html").attr("data-textdirection") === "rtl";

  var dt_filter_table = $(".dt-column-search"),
    dt_filter_table_oas = $(".dt-column-search2"),
    assetPath = "app-assets/";

  if ($("body").attr("data-framework") === "laravel") {
    assetPath = $("body").attr("data-asset-path");
  }

  // Advanced Search Functions Starts
  // --------------------------------------------------------------------

  // Column Search
  // --------------------------------------------------------------------

  if (dt_filter_table.length) {
    // Setup - add a text input to each footer cell
    $(".dt-column-search thead tr")
      .clone(true)
      .appendTo(".dt-column-search thead");
    $(".dt-column-search thead tr:eq(1) th").each(function (i) {
      var title = $(this).text();
      $(this).html(
        '<input type="text" class="form-control form-control-sm" placeholder="Buscar ' +
          title +
          '" />'
      );

      $("input", this).on("keyup change", function () {
        if (dt_filter.column(i).search() !== this.value) {
          dt_filter.column(i).search(this.value).draw();
        }
      });
    });

    var dt_filter = dt_filter_table.DataTable({
      ajax: assetPath + "data/datatable_recursos_clasificados.json",
      columns: [
        { data: "nombre" },
        { data: "tipo_recurso" },
        { data: "oa" },
        { data: "eje" },
        { data: "claves" },
        { data: "descargable" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
        },
        {
          // For Checkboxes
          targets: 2,
          orderable: true,
          responsivePriority: 0,
          render: function (data, type, full, meta) {
            const objetivos = function () {
              let conca = full["oa"];
              let oas = "";
              let priorizacion;

              for (var i = 0; i < conca.length; i++) {
                if (conca[i]["priorizacion"] == "1") {
                  console.log(conca[i]["priorizacion"]);
                  priorizacion =
                    '<ion-icon name="star" class="text-warning"></ion-icon>';
                } else {
                  if (conca[i]["priorizacion"] == "2") {
                    priorizacion =
                      '<ion-icon name="star-outline" class="text-warning"></ion-icon>';
                  } else {
                    priorizacion = "";
                  }
                }
                oas +=
                  '<div class="d-flex align-items-center"><div class="text-primary fw-500 mep-5">' +
                  conca[i]["oa_code"] +
                  "</div>" +
                  priorizacion +
                  "</div>";
                if (conca.length - 1 === i) {
                  return oas;
                }
              }
            };
            return objetivos;
          },
          checkboxes: {
            selectAllRender:
              '<div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>',
          },
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

  if (dt_filter_table_oas.length) {
    // TABLA GESTOR DE PROGRAMAS
    $(".dt-column-search2 thead tr")
      .clone(true)
      .appendTo(".dt-column-search2 thead");
    $(".dt-column-search2 thead tr:eq(1) th").each(function (i) {
      var title = $(this).text();
      $(this).html(
        '<input type="text" class="form-control form-control-sm" placeholder="Buscar ' +
          title +
          '" />'
      );

      $("input", this).on("keyup change", function () {
        if (dt_filterl_oa.column(i).search() !== this.value) {
          dt_filterl_oa.column(i).search(this.value).draw();
        }
      });
    });

    var dt_filterl_oa = dt_filter_table_oas.DataTable({
      ajax: assetPath + "data/datatable_oas.json",
      columns: [
        { data: "id" },
        { data: "codigo" },
        { data: "priorizacion" },
        { data: "descripcion" },
        { data: "eje" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
        },
        {
          targets: 1,
          orderable: true,
          responsivePriority: 0,
          render: function (data, type, full, meta) {
            const objetivos = function () {
              let oas = "";
              oas +=
                '<div class="d-flex align-items-center"><div class="text-primary fw-500 mep-5">' +
                full["codigo"] +
                "</div>";

              return oas;
            };
            return objetivos;
          },
        },
        {
          targets: 2,
          visible: true,
          orderable: true,
          responsivePriority: 0,
          render: function (data, type, full, meta) {
            const objetivos = function () {
              let priorizacion;
              let oas = "";
              console.log("hola");
              if (full["priorizacion"] == "1") {
                priorizacion =
                  '<ion-icon name="star" class="text-warning"></ion-icon>';
              } else {
                if (full["priorizacion"] == "2") {
                  priorizacion =
                    '<ion-icon name="star-outline" class="text-warning"></ion-icon>';
                } else {
                  priorizacion = "";
                }
              }
              oas +=
                '<div class="w-100 d-flex justify-content-center fsp-20 mb-1">' +
                priorizacion +
                "</div>";

              return oas;
            };
            return objetivos;
          },
        },
        {
          // For Checkboxes
          targets: 5,
          orderable: true,
          responsivePriority: 0,
          render: function (data, type, full, meta) {
            const objetivos = function () {
              var id_oa = full["id"];
              return (
                '<div class="w-100 d-flex justify-content-center" onclick="' +
                abreIndicadoresOA(id_oa) +
                '" data-bs-toggle="modal" data-bs-target="#modalIndicadores">Ver</div>'
              );
            };
            return objetivos;
          },
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
