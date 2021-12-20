/**
 * DataTables Basic
 */

$(function () {
  "use strict";

  var dt_basic_table = $(".dt-compartidos-plan-comcon"),
   dt_date_table_dos = $(".dt-compartidos-plan-com"),
   dt_date_table = $(".dt-date"),
   dt_complex_header_table = $(".dt-complex-header"),
   dt_row_grouping_table = $(".dt-row-grouping"),
   dt_multilingual_table = $(".dt-multilingual"),
   assetPath = "/html/app-assets/";

  if ($("body").attr("data-framework") === "laravel") {
    assetPath = $("body").attr("data-asset-path");
  }

  // DataTable with buttons
  // --------------------------------------------------------------------
  console.log(assetPath + "data/plataforma_docente/table-compartidos_conmigo_planificaciones.json")
  
  if (dt_basic_table.length) {
    var dt_basic = dt_basic_table.DataTable({
      ajax: assetPath + "data/plataforma_docente/table-compartidos_conmigo_planificaciones.json",
      columns: [
        { data: "nombre" },
        { data: "nombre_usuario" }, // used for sorting so will hide this column
        { data: "id" },
      ],
    columnDefs: [
        {
          // For Checkboxes
          targets: 0,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            console.log("data "+data,"type "+ type, "full " +full,"meta " +meta)
            return (
              '<div class="d-flex">'+
              '<img class="hp-45 me-1" src="/html/assets/images/iconos_recursos/pdf.svg" alt="">'+
              '<div class="d-flex flex-column me-5">'+
              '<small class="emp_post text-truncate"> '+full.nombre_carpeta+' </small>'+
              '<span class="emp_name text-truncate fw-bold"> '+full.titulo_planificacion+' </span>'+
              '</div>'+
              '</div>'
            );
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            console.log("data "+data,"type "+ type, "full " +full,"meta " +meta)
            return (
              '<div class="d-flex justify-content-left align-items-center">'+
              '<div class="avatar  bg-light-warning  me-1"><span class="avatar-content"> '+full.nombre_usuario_iniciales+' </span></div>'+
              '<div class="d-flex flex-column"><span class="emp_name text-truncate fw-bold"> '+full.nombre_usuario+' </span></div>'+
              '</div>'
            );
          
          },
          // checkboxes: {
          //   selectAllRender:
          //     '<div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>',
          // },
        },
        {
          // For Checkboxes
          targets: 2,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            console.log("data "+data,"type "+ type, "full " +full,"meta " +meta)
            return (
              '<button type="button" class="btn btn-primary waves-effect waves-float waves-light rounded-pill float-end">Clonar</button>'
            );
          
          },
        },
      ],
      order: [[2, "desc"]],
      dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      buttons: [
        {
          extend: "collection",
          className: "btn btn-outline-secondary dropdown-toggle me-2",
          text:
            feather.icons["share"].toSvg({ class: "font-small-4 me-50" }) +
            "Export",
          buttons: [
            {
              extend: "print",
              text:
                feather.icons["printer"].toSvg({
                  class: "font-small-4 me-50",
                }) + "Print",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "csv",
              text:
                feather.icons["file-text"].toSvg({
                  class: "font-small-4 me-50",
                }) + "Csv",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "excel",
              text:
                feather.icons["file"].toSvg({ class: "font-small-4 me-50" }) +
                "Excel",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "pdf",
              text:
                feather.icons["clipboard"].toSvg({
                  class: "font-small-4 me-50",
                }) + "Pdf",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "copy",
              text:
                feather.icons["copy"].toSvg({ class: "font-small-4 me-50" }) +
                "Copy",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
          ],
          init: function (api, node, config) {
            $(node).removeClass("btn-secondary");
            $(node).parent().removeClass("btn-group");
            setTimeout(function () {
              $(node)
                .closest(".dt-buttons")
                .removeClass("btn-group")
                .addClass("d-inline-flex");
            }, 50);
          },
        },
        {
          text:
            feather.icons["plus"].toSvg({ class: "me-50 font-small-4" }) +
            "Add New Record",
          className: "create-new btn btn-primary",
          attr: {
            "data-bs-toggle": "modal",
            "data-bs-target": "#modals-slide-in",
          },
          init: function (api, node, config) {
            $(node).removeClass("btn-secondary");
          },
        },
      ],

      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
        },
      },
    });
    $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }























  // DataTable with buttons
  // --------------------------------------------------------------------
  console.log(assetPath + "data/plataforma_docente/table-compartidos_planificaciones.json")
  
  if (dt_date_table_dos.length) {
    var dt_basic = dt_date_table_dos.DataTable({
      ajax: assetPath + "data/plataforma_docente/table-compartidos_planificaciones.json",
      columns: [
        { data: "nombre" },
        { data: "nombre_usuario" }, // used for sorting so will hide this column
        { data: "id" },
      ],
    columnDefs: [
        {
          // For Checkboxes
          targets: 0,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            console.log("data "+data,"type "+ type, "full " +full,"meta " +meta)
            return (
              '<div class="d-flex">'+
              '<img class="hp-45 me-1" src="/html/assets/images/iconos_recursos/pdf.svg" alt="">'+
              '<div class="d-flex flex-column me-5">'+
              '<small class="emp_post text-truncate"> '+full.nombre_carpeta+' </small>'+
              '<span class="emp_name text-truncate fw-bold"> '+full.titulo_planificacion+' </span>'+
              '</div>'+
              '</div>'
            );
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            console.log("data "+data,"type "+ type, "full " +full,"meta " +meta)
            return (
              '<div class="text-center">'+
              '<div class="avatar-group">'+
              '<div data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar pull-up my-0" title="" data-bs-original-title="Lilian Nenez">'+
              '<img src="/html/app-assets/images/portrait/small/avatar-s-5.jpg" alt="Avatar" height="26" width="26">'+
              '</div>'+
              '<div data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar pull-up my-0" title="" data-bs-original-title="Alberto Glotzbach">'+
              '<img src="/html/app-assets/images/portrait/small/avatar-s-6.jpg" alt="Avatar" height="26" width="26">'+
              '</div>'+
              '<div data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar pull-up my-0" title="" data-bs-original-title="Alberto Glotzbach">'+
              '<img src="/html/app-assets/images/portrait/small/avatar-s-7.jpg" alt="Avatar" height="26" width="26">'+
              '</div>'+
              '</div>'+
              '</div>'
            );
          
          },
          // checkboxes: {
          //   selectAllRender:
          //     '<div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>',
          // },
        },
        {
          // For Checkboxes
          targets: 2,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            console.log("data "+data,"type "+ type, "full " +full,"meta " +meta)
            return (
              '<button type="button" class="btn btn-primary waves-effect waves-float waves-light rounded-pill float-end">Dejar de compartir</button>'
            );
          
          },
        },
      ],
      order: [[2, "desc"]],
      dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      buttons: [
        {
          extend: "collection",
          className: "btn btn-outline-secondary dropdown-toggle me-2",
          text:
            feather.icons["share"].toSvg({ class: "font-small-4 me-50" }) +
            "Export",
          buttons: [
            {
              extend: "print",
              text:
                feather.icons["printer"].toSvg({
                  class: "font-small-4 me-50",
                }) + "Print",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "csv",
              text:
                feather.icons["file-text"].toSvg({
                  class: "font-small-4 me-50",
                }) + "Csv",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "excel",
              text:
                feather.icons["file"].toSvg({ class: "font-small-4 me-50" }) +
                "Excel",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "pdf",
              text:
                feather.icons["clipboard"].toSvg({
                  class: "font-small-4 me-50",
                }) + "Pdf",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
            {
              extend: "copy",
              text:
                feather.icons["copy"].toSvg({ class: "font-small-4 me-50" }) +
                "Copy",
              className: "dropdown-item",
              exportOptions: { columns: [3, 4, 5, 6, 7] },
            },
          ],
          init: function (api, node, config) {
            $(node).removeClass("btn-secondary");
            $(node).parent().removeClass("btn-group");
            setTimeout(function () {
              $(node)
                .closest(".dt-buttons")
                .removeClass("btn-group")
                .addClass("d-inline-flex");
            }, 50);
          },
        },
        {
          text:
            feather.icons["plus"].toSvg({ class: "me-50 font-small-4" }) +
            "Add New Record",
          className: "create-new btn btn-primary",
          attr: {
            "data-bs-toggle": "modal",
            "data-bs-target": "#modals-slide-in",
          },
          init: function (api, node, config) {
            $(node).removeClass("btn-secondary");
          },
        },
      ],

      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
        },
      },
    });
    $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }









  












  
  // if (dt_basic_table.length) {
  //   var dt_basic = dt_basic_table.DataTable({
  //     ajax: assetPath + "data/datatable_oas.json",
  //     columns: [
  //       // used for sort
  //       { data: "codigo" },
  //       { data: "descripcion" },
  //       { data: "" },
  //     ],
  //     columnDefs: [
  //       {
  //         // For Responsive
  //         width: "5%",
  //         className: "control",
  //         orderable: false,
  //         responsivePriority: 0,
  //         targets: 0,
  //       },
  //       {
  //         // For Checkboxes
  //         targets: 2,
  //         orderable: false,
  //         responsivePriority: 0,
  //         render: function (data, type, full, meta) {
  //           return (
  //             '<div class="form-check wp-50"> <input class="form-check-input dt-checkboxes" type="checkbox" value="" id="checkbox' +
  //             data +
  //             '" /><label class="form-check-label" for="checkbox' +
  //             data +
  //             '"></label></div>'
  //           );
  //         },
  //         checkboxes: {
  //           selectAllRender:
  //             '<div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>',
  //         },
  //       },
  //     ],
  //   });
  //   $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
  // }

  // Flat Date picker
  if (dt_date_table.length) {
    dt_date_table.flatpickr({
      monthSelectorType: "static",
      dateFormat: "m/d/Y",
    });
  }

  // Add New record
  // ? Remove/Update this code as per your requirements ?
  var count = 101;
  $(".data-submit").on("click", function () {
    var $new_name = $(".add-new-record .dt-full-name").val(),
      $new_post = $(".add-new-record .dt-post").val(),
      $new_email = $(".add-new-record .dt-email").val(),
      $new_date = $(".add-new-record .dt-date").val(),
      $new_salary = $(".add-new-record .dt-salary").val();

    if ($new_name != "") {
      dt_basic.row
        .add({
          responsive_id: null,
          id: count,
          full_name: $new_name,
          post: $new_post,
          email: $new_email,
          start_date: $new_date,
          salary: "$" + $new_salary,
          status: 5,
        })
        .draw();
      count++;
      $(".modal").modal("hide");
    }
  });

  // Delete Record
  $(".datatables-basic tbody").on("click", ".delete-record", function () {
    dt_basic.row($(this).parents("tr")).remove().draw();
  });

  // Complex Header DataTable
  // --------------------------------------------------------------------

  if (dt_complex_header_table.length) {
    var dt_complex = dt_complex_header_table.DataTable({
      ajax: assetPath + "data/table-datatable.json",
      columns: [
        { data: "full_name" },
        { data: "email" },
        { data: "city" },
        { data: "post" },
        { data: "salary" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full["status"];
            var $status = {
              1: { title: "Current", class: "badge-light-primary" },
              2: { title: "Professional", class: " badge-light-success" },
              3: { title: "Rejected", class: " badge-light-danger" },
              4: { title: "Resigned", class: " badge-light-warning" },
              5: { title: "Applied", class: " badge-light-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
              feather.icons["more-vertical"].toSvg({ class: "font-small-4" }) +
              "</a>" +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item">' +
              feather.icons["file-text"].toSvg({
                class: "me-50 font-small-4",
              }) +
              "Details</a>" +
              '<a href="javascript:;" class="dropdown-item">' +
              feather.icons["archive"].toSvg({ class: "me-50 font-small-4" }) +
              "Archive</a>" +
              '<a href="javascript:;" class="dropdown-item delete-record">' +
              feather.icons["trash-2"].toSvg({ class: "me-50 font-small-4" }) +
              "Delete</a>" +
              "</div>" +
              "</div>" +
              '<a href="javascript:;" class="item-edit">' +
              feather.icons["edit"].toSvg({ class: "font-small-4" }) +
              "</a>"
            );
          },
        },
      ],
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
        },
      },
    });
  }

  // Row Grouping
  // --------------------------------------------------------------------

  var groupColumn = 2;
  if (dt_row_grouping_table.length) {
    var groupingTable = dt_row_grouping_table.DataTable({
      ajax: assetPath + "data/table-datatable.json",
      columns: [
        { data: "responsive_id" },
        { data: "full_name" },
        { data: "post" },
        { data: "email" },
        { data: "city" },
        { data: "start_date" },
        { data: "salary" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
        },
        { visible: false, targets: groupColumn },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full["status"];
            var $status = {
              1: { title: "Current", class: "badge-light-primary" },
              2: { title: "Professional", class: " badge-light-success" },
              3: { title: "Rejected", class: " badge-light-danger" },
              4: { title: "Resigned", class: " badge-light-warning" },
              5: { title: "Applied", class: " badge-light-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
              feather.icons["more-vertical"].toSvg({ class: "font-small-4" }) +
              "</a>" +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item">' +
              feather.icons["file-text"].toSvg({
                class: "me-50 font-small-4",
              }) +
              "Details</a>" +
              '<a href="javascript:;" class="dropdown-item">' +
              feather.icons["archive"].toSvg({ class: "me-50 font-small-4" }) +
              "Archive</a>" +
              '<a href="javascript:;" class="dropdown-item delete-record">' +
              feather.icons["trash-2"].toSvg({ class: "me-50 font-small-4" }) +
              "Delete</a>" +
              "</div>" +
              "</div>" +
              '<a href="javascript:;" class="item-edit">' +
              feather.icons["edit"].toSvg({ class: "font-small-4" }) +
              "</a>"
            );
          },
        },
      ],
      order: [[groupColumn, "asc"]],
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 7,
      lengthMenu: [7, 10, 25, 50, 75, 100],
      drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: "current" }).nodes();
        var last = null;

        api
          .column(groupColumn, { page: "current" })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              $(rows)
                .eq(i)
                .before(
                  '<tr class="group"><td colspan="8">' + group + "</td></tr>"
                );

              last = group;
            }
          });
      },
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
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
        },
      },
    });

    // Order by the grouping
    $(".dt-row-grouping tbody").on("click", "tr.group", function () {
      var currentOrder = table.order()[0];
      if (currentOrder[0] === groupColumn && currentOrder[1] === "asc") {
        groupingTable.order([groupColumn, "desc"]).draw();
      } else {
        groupingTable.order([groupColumn, "asc"]).draw();
      }
    });
  }

  // Multilingual DataTable
  // --------------------------------------------------------------------

  var lang = "German";
  if (dt_multilingual_table.length) {
    var table_language = dt_multilingual_table.DataTable({
      ajax: assetPath + "data/table-datatable.json",
      columns: [
        { data: "responsive_id" },
        { data: "full_name" },
        { data: "post" },
        { data: "email" },
        { data: "start_date" },
        { data: "salary" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          orderable: false,
          targets: 0,
        },
        {
          // Label
          targets: -2,
          render: function (data, type, full, meta) {
            var $status_number = full["status"];
            var $status = {
              1: { title: "Current", class: "badge-light-primary" },
              2: { title: "Professional", class: " badge-light-success" },
              3: { title: "Rejected", class: " badge-light-danger" },
              4: { title: "Resigned", class: " badge-light-warning" },
              5: { title: "Applied", class: " badge-light-info" },
            };
            if (typeof $status[$status_number] === "undefined") {
              return data;
            }
            return (
              '<span class="badge rounded-pill ' +
              $status[$status_number].class +
              '">' +
              $status[$status_number].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-flex">' +
              '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
              feather.icons["more-vertical"].toSvg({ class: "font-small-4" }) +
              "</a>" +
              '<div class="dropdown-menu dropdown-menu-end">' +
              '<a href="javascript:;" class="dropdown-item">' +
              feather.icons["file-text"].toSvg({
                class: "me-50 font-small-4",
              }) +
              "Details</a>" +
              '<a href="javascript:;" class="dropdown-item">' +
              feather.icons["archive"].toSvg({ class: "me-50 font-small-4" }) +
              "Archive</a>" +
              '<a href="javascript:;" class="dropdown-item delete-record">' +
              feather.icons["trash-2"].toSvg({ class: "me-50 font-small-4" }) +
              "Delete</a>" +
              "</div>" +
              "</div>" +
              '<a href="javascript:;" class="item-edit">' +
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
});
