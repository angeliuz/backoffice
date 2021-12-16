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
            { data: 'nivel' },
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
                        1: { tipo: 'PDF', img: 'pdf.png' },
                    };
                    var $state = $states[$stateNum].img;
                    var icono = full['icon'];
                    $name = full['area'];
                    //var $initials = $name.match(/\b\w/g) || [];
                    //$initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
                    //var $output = '<span class="avatar-content">' + $initials + '</span>';
                

                    var colorClass = $state;
                    // Creates full output for row
                    var $row_output =
                      '<div class="d-flex justify-content-left align-items-center">' +
                      '<div class="avatar me-1">' +
                      '<img src="../app-assets/images/icons/pdf.png">' +
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