/**
 * DataTables Basic
 */

 $(function () {
    'use strict';
  
    var dt_basic_table = $('.dt-cursos')
    var assetPath = '../app-assets/';

    console.log(assetPath+"data/plataforma_docente/datatable_cursos.json")
  
    // DataTable with buttons
    // --------------------------------------------------------------------
  
    if (dt_basic_table.length) {
      var dt_basic = dt_basic_table.DataTable({
        ajax: assetPath+'data/plataforma_docente/datatable_cursos.json',
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
            { data: 'comentarios' },
            { data: 'estado' },
            { data: '' }
          ],
          columnDefs: [
            { 
                targets:0 ,
                render: function (data, type, full, meta) {
                    
                    var $name = full['area'];
                    var $post = full['nivel'];
                    
                    // For Avatar badge
                    let $stateNum = full['id_area'];
                    //let states = ['', 'bg-light-warning', 'bg-light-danger', 'bg-light-success', 'bg-light-primary', 'bg-light-info', 'bg-light-secondary', 'bg-light-dark'];
                    var $states = {
                        1: { area: 'Matemática', class: ' bg-light-warning' },
                        2: { area: 'Lenguaje', class: 'bg-light-danger' },
                        3: { area: 'Ciencias Naturales', class: ' bg-light-success' },
                        4: { area: 'Ciencias Sociales', class: ' bg-light-primary' },
                    };
                    var $state = $states[$stateNum].class;
                    
                    $name = full['area'];
                    var $initials = $name.match(/\b\w/g) || [];
                    $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
                    var $output = '<span class="avatar-content">' + $initials + '</span>';
                

                    var colorClass = $state;
                    // Creates full output for row
                    var $row_output =
                      '<div class="d-flex justify-content-left align-items-center">' +
                      '<div class="avatar ' +
                      colorClass +
                      ' me-1">' +
                      $output +
                      '</div>' +
                      '<div class="d-flex flex-column">' +
                      '<span class="emp_name text-truncate fw-bold">' +
                      $name +
                      '</span>' +
                      '<small class="emp_post text-truncate text-muted">' +
                      $post +
                      '</small>' +
                      '</div>' +
                      '</div>';
                    return $row_output;
                },
            },
            {
                targets: 1,
                orderable: true,
                className: 'text-center',
                width: '150px',
                render: function (data, type, full, meta) {
                    var resp = '';
                    if(full['comentarios']>0){
                    var resp = '<div class="position-relative d-inline-block">'+
                    feather.icons['mail'].toSvg({ class: 'font-medium-4' }) +
                    '<span class="badge rounded-pill bg-danger badge-up">'+
                    full['comentarios']+
                    '</span>'+
                    '</div>'
                    }
                    return resp;
                }
            },
            {
              // Label
              targets: 2,
              className: 'text-start',
              width: '150px',
              render: function (data, type, full, meta) {
                var $status_number = full['estado'];
                var $status = {
                    1: { title: 'Validado', class: ' badge-light-success' },
                    2: { title: 'Esperando validación', class: 'badge-light-warning' },
                    3: { title: 'Corregir', class: ' badge-light-danger' },
                };
                if (typeof $status[$status_number] === 'undefined') {
                  return data;
                }
                return (
                  '<span class="badge rounded-pill ' +
                  $status[$status_number].class +
                  '">' +
                  $status[$status_number].title +
                  '</span>'
                );
              }
            },
            {
              // Actions
              targets: 3,
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
                  '<a href="javascript:;" class="dropdown-item delete-record">' +
                  feather.icons['trash-2'].toSvg({ class: 'me-50 font-small-4' }) +
                  'Eliminar</a>' +
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