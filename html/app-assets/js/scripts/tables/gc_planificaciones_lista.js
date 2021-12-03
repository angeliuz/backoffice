/**
 * DataTables Advanced
 */

"use strict";

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
    $(".dt-advanced-search").DataTable().column(i).search(val, false, true).draw();
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
        startDate = selectedDates[0].getMonth() + 1 + "/" + selectedDates[0].getDate() + "/" + selectedDates[0].getFullYear();
        $(".start_date").val(startDate);
      }
      if (selectedDates[1] != undefined) {
        endDate = selectedDates[1].getMonth() + 1 + "/" + selectedDates[1].getDate() + "/" + selectedDates[1].getFullYear();
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
  var normalized = date.getFullYear() + "" + ("0" + (date.getMonth() + 1)).slice(-2) + "" + ("0" + date.getDate()).slice(-2);
  return normalized;
};
// Advanced Search Functions Ends

$(function () {
  var isRtl = $("html").attr("data-textdirection") === "rtl";

  var dt_filter_table = $(".dt-column-search");
  var assetPath = "app-assets/";

  // Column Search
  // --------------------------------------------------------------------

  if (dt_filter_table.length) {
    // Setup - add a text input to each footer cell
    $(".dt-column-search thead tr").clone(true).appendTo(".dt-column-search thead");
    $(".dt-column-search thead tr:eq(1) th").each(function (i) {
      var title = $(this).text();
      $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Buscar ' + title + '" />');

      $("input", this).on("keyup change", function () {
        if (dt_filter.column(i).search() !== this.value) {
          dt_filter.column(i).search(this.value).draw();
        }
      });
    });

    var dt_filter = dt_filter_table.DataTable({
      ajax: assetPath + "data/gc_planificaciones_lista.json",
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      processing: true,
      api: true,
      destroy: true,
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
          limit: 5,
        },
      },
      orderCellsTop: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
      },
      columns: [
        { data: "id", width: "100px" },
        { data: "area", autoWidth: true },
        { data: "nivel", autoWidth: true },
        { data: "secuencias", autoWidth: true },
        { data: "creada", autoWidth: true },
        { data: "", width: "50px" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
        },
        {
          // Centrar Unidades
          targets: 3,
          orderable: true,
          className: "text-center",
        },
        {
          // Actions
          targets: 5,
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
              '<a href="gc_planificaciones_detalle_secuencia.html" target="_self" class="item-edit">' +
              feather.icons["edit"].toSvg({ class: "font-small-4" }) +
              "</a>"
            );
          },
        },
      ],
    });
  }
  dt_filter_table.on("click", ".sweetAlert", function (e, dt, type, indexes) {
    console.log("id: " + this.id);
    Swal.fire({
      title: "¡Atención!",
      text: "Estas seguro que deseas eliminar la secuencia. Esta acción no se puede deshacer.",
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
          title: "¡Eliminada!",
          confirmButtonText: "Cerrar",
          text: "La secuencia, ha sido eliminada.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  });
  // on key up from input field
  $("input.dt-input").on("keyup", function () {
    filterColumn($(this).attr("data-column"), $(this).val());
  });

  // Filter form control to default size for all tables
  $(".dataTables_filter .form-control").removeClass("form-control-sm");
  $(".dataTables_length .form-select").removeClass("form-select-sm").removeClass("form-control-sm");
});
