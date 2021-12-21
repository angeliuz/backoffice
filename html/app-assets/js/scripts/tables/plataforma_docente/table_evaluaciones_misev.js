/**
 * DataTables Basic
 */

 $(function () {
    'use strict';
  
    var dt_basic_table = $('.dt-cursos')
    var assetPath = '../app-assets/';

  
    // DataTable with buttons
    // --------------------------------------------------------------------
  
    if (dt_basic_table.length) {
      var dt_basic = dt_basic_table.DataTable({
        ajax: assetPath+'data/plataforma_docente/datatable_misevaluaciones.json',
        processing: true,
        api: true,
        dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
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
            { data: '' },
            { data: 'nivel' },
            { data: 'area' },
            { data: '' },
            { data: '' }
          ],
          columnDefs: [
            { 
                targets:0 ,
                render: function (data, type, full, meta) {
                    
                    var $name = full['nombre'];
                    
                    var icono = full['icon'];

                    var $row_output =
                      '<div class="d-flex justify-content-left align-items-center">' +
                      '<div class="me-1">' +
                      '<img src="../app-assets/images/icons/'+ 
                      icono +
                      '" class="hp-40">' +
                      '</div>' +
                      '<div class="d-flex flex-column">' +
                      '<small class="emp_post text-truncate text-muted">Mis evaluaciones</small>' +
                      '<span class="emp_name text-truncate fw-bold">' +
                      $name +
                      '</span>' +
                     
                      '</div>' +
                      '</div>';
                    return $row_output;
                },
            },
            {
              targets:1,
              orderable:true,
            },
            {
              targets:2,
              orderable:true,
            },
            {
              targets: 3,
              orderable:false,
              data: "download_link",
              render: function (data, type, row, meta) {
                var html = '<div class="w-100 text-center" id="btn_indicadores" data-bs-toggle="modal" data-bs-target="#modal_indicadores" ><ion-icon name="navigate-outline" class="text-primary h2"></div>';
    
                return html;
              },
            },
            {
              targets:4,
              orderable:true,
              render: function (data, type, full, meta) {
                var html = '';
                for (var i in full.objetivos) {
                html += '<div class="d-flex justify-content-center align-items-center flex-row">' +
                        '<div class="text-primary" data-bs-toggle="tooltip" title="' + full.objetivos[i].descripcion +'" >' +
                        full.objetivos[i].nombre +
                        '</div>';
                
                html += '<div class="text-warning msp-5">';
                        if(full.objetivos[i].priorizacion_id == "1"){
                            html += '<ion-icon name="star"></ion-icon>'
                        }
                        if(full.objetivos[i].priorizacion_id == "2"){
                            html += '<ion-icon name="star-outline"></ion-icon>'
                        }
                        if(full.objetivos[i].priorizacion_id == "3"){
                            html += ''
                        }
                        html += '</div>';
                        html += '</div>';

                }
                return html;
              }
            },
           {
              // Actions
              targets: 5,
              orderable: false,
              className: 'text-center',
              width: '80px',
              render: function (data, type, full, meta) {
                return (
                  '<div class="d-inline-flex">' +
                  '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
                  feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
                  '</a>' +
                  '<div class="dropdown-menu dropdown-menu-end">' +
                  '<a href="javascript:;" class="dropdown-item">' +
                  feather.icons['file-text'].toSvg({ class: 'me-50 font-small-4' }) +
                  'Details</a>' +
                  '<a href="javascript:;" class="dropdown-item">' +
                  feather.icons['archive'].toSvg({ class: 'me-50 font-small-4' }) +
                  'Archive</a>' +
                  '<a href="javascript:;" class="dropdown-item delete-record">' +
                  feather.icons['trash-2'].toSvg({ class: 'me-50 font-small-4' }) +
                  'Delete</a>' +
                  '</div>' +
                  '</div>' +
                  '<a href="javascript:;" class="item-edit">' +
                  feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
                  '</a>'
                );
              }
            }
          ],
          language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
          },
    
      });
  
    $("div.head-label").html('<h6 class="mb-0">DataTable with Buttons</h6>');
}
});