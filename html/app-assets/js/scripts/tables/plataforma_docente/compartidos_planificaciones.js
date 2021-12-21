/**
 * DataTables Basic
 */

$(function () {
  "use strict";

  var dt_basic_table = $(".dt-compartidos-plan-comcon");
  var dt_date_table_dos = $(".dt-compartidos-plan-com");

  var assetPath = "/html/app-assets/";

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
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
        },
      },
      language: {
        url : '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
    },
    });
   // $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
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
      language: {
	      url : '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json'
	    },
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      drawCallback: function () {
        $(document).find('[data-bs-toggle="tooltip"]').tooltip();
        },
    });
    $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
  }


});
