/**
 * DataTables Advanced
 */

 'use strict';

 // Advanced Search Functions Starts
 // --------------------------------------------------------------------
 
 // Filter column wise function
 function filterColumn(i, val) {
   if (i == 5) {
     var startDate = $('.start_date').val(),
       endDate = $('.end_date').val();
     if (startDate !== '' && endDate !== '') {
       filterByDate(i, startDate, endDate); // We call our filter function
     }
 
     $('.dt-advanced-search').dataTable().fnDraw();
   } else {
     $('.dt-advanced-search').DataTable().column(i).search(val, false, true).draw();
   }
 }
 
 // Datepicker for advanced filter
 var separator = ' - ',
   rangePickr = $('.flatpickr-range'),
   dateFormat = 'MM/DD/YYYY';
 var options = {
   autoUpdateInput: false,
   autoApply: true,
   locale: {
     format: dateFormat,
     separator: separator
   },
   opens: $('html').attr('data-textdirection') === 'rtl' ? 'left' : 'right'
 };
 
 //
 if (rangePickr.length) {
   rangePickr.flatpickr({
     mode: 'range',
     dateFormat: 'm/d/Y',
     onClose: function (selectedDates, dateStr, instance) {
       var startDate = '',
         endDate = new Date();
       if (selectedDates[0] != undefined) {
         startDate =
           selectedDates[0].getMonth() + 1 + '/' + selectedDates[0].getDate() + '/' + selectedDates[0].getFullYear();
         $('.start_date').val(startDate);
       }
       if (selectedDates[1] != undefined) {
         endDate =
           selectedDates[1].getMonth() + 1 + '/' + selectedDates[1].getDate() + '/' + selectedDates[1].getFullYear();
         $('.end_date').val(endDate);
       }
       $(rangePickr).trigger('change').trigger('keyup');
     }
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
     } else if (rowDate >= start && end === '' && start !== '') {
       return true;
     } else if (rowDate <= end && start === '' && end !== '') {
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
     date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' + ('0' + date.getDate()).slice(-2);
   return normalized;
 };
 // Advanced Search Functions Ends
 
 $(function () {
   var isRtl = $('html').attr('data-textdirection') === 'rtl';
 
   var dt_ajax_table = $('.datatables-ajax'),
     dt_filter_table = $('.dt-column-search'),
     dt_adv_filter_table = $('.dt-advanced-search'),
     dt_responsive_table = $('.dt-responsive'),
     assetPath = '../../../app-assets/';
 
   if ($('body').attr('data-framework') === 'laravel') {
     assetPath = $('body').attr('data-asset-path');
   }
 
   // Ajax Sourced Server-side
   // --------------------------------------------------------------------
 
   if (dt_ajax_table.length) {
     var dt_ajax = dt_ajax_table.dataTable({
       processing: true,
       dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
       ajax: assetPath + 'data/ajax.php',
       language: {
         paginate: {
           // remove previous & next text from pagination
           previous: '&nbsp;',
           next: '&nbsp;'
         }
       }
     });
   }
 
   // Column Search
   // --------------------------------------------------------------------
 
   if (dt_filter_table.length) {
     // Setup - add a text input to each footer cell
     $('.dt-column-search thead tr').clone(true).appendTo('.dt-column-search thead');
     $('.dt-column-search thead tr:eq(1) th').each(function (i) {
       var title = $(this).text();
       $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Search ' + title + '" />');
 
       $('input', this).on('keyup change', function () {
         if (dt_filter.column(i).search() !== this.value) {
           dt_filter.column(i).search(this.value).draw();
         }
       });
     });
 
     var dt_filter = dt_filter_table.DataTable({
       ajax: assetPath + 'data/gc_unidades_lista.json',
       columns: [
                { data: 'responsive_id' },
                { data: 'id' },
                { data: 'area' },
                { data: 'nivel' },
                { data: 'unidades' },
                { data: 'creada' },
                { data: 'id' }
              ],
       dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
       orderCellsTop: true,
       language: {
         paginate: {
           // remove previous & next text from pagination
           previous: '&nbsp;',
           next: '&nbsp;'
         }
       }
     });
   }
 
   // Advanced Search
   // --------------------------------------------------------------------
 
   // Advanced Filter table
   if (dt_adv_filter_table.length) {
     var dt_adv_filter = dt_adv_filter_table.DataTable({
       ajax: assetPath + 'data/table-datatable.json',
       columns: [
         { data: 'responsive_id' },
         { data: 'full_name' },
         { data: 'email' },
         { data: 'post' },
         { data: 'city' },
         { data: 'start_date' },
         { data: 'salary' }
       ],
 
       columnDefs: [
         {
           className: 'control',
           orderable: false,
           targets: 0
         }
       ],
       dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
       orderCellsTop: true,
       responsive: {
         details: {
           display: $.fn.dataTable.Responsive.display.modal({
             header: function (row) {
               var data = row.data();
               return 'Details of ' + data['full_name'];
             }
           }),
           type: 'column',
           renderer: $.fn.dataTable.Responsive.renderer.tableAll({
             tableClass: 'table'
           })
         }
       },
       language: {
         paginate: {
           // remove previous & next text from pagination
           previous: '&nbsp;',
           next: '&nbsp;'
         }
       }
     });
   }
 
   // on key up from input field
   $('input.dt-input').on('keyup', function () {
     filterColumn($(this).attr('data-column'), $(this).val());
   });
 
   // Responsive Table
   // --------------------------------------------------------------------
 
   if (dt_responsive_table.length) {
     var dt_responsive = dt_responsive_table.DataTable({
       ajax: assetPath + 'data/table-datatable.json',
       columns: [
         { data: 'responsive_id' },
         { data: 'full_name' },
         { data: 'email' },
         { data: 'post' },
         { data: 'city' },
         { data: 'start_date' },
         { data: 'salary' },
         { data: 'age' },
         { data: 'experience' },
         { data: 'status' }
       ],
       columnDefs: [
         {
           className: 'control',
           orderable: false,
           targets: 0
         },
         {
           // Label
           targets: -1,
           render: function (data, type, full, meta) {
             var $status_number = full['status'];
             var $status = {
               1: { title: 'Current', class: 'badge-light-primary' },
               2: { title: 'Professional', class: ' badge-light-success' },
               3: { title: 'Rejected', class: ' badge-light-danger' },
               4: { title: 'Resigned', class: ' badge-light-warning' },
               5: { title: 'Applied', class: ' badge-light-info' }
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
         }
       ],
       dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
       responsive: {
         details: {
           display: $.fn.dataTable.Responsive.display.modal({
             header: function (row) {
               var data = row.data();
               return 'Details of ' + data['full_name'];
             }
           }),
           type: 'column',
           renderer: $.fn.dataTable.Responsive.renderer.tableAll({
             tableClass: 'table'
           })
         }
       },
       language: {
         paginate: {
           // remove previous & next text from pagination
           previous: '&nbsp;',
           next: '&nbsp;'
         }
       }
     });
   }
 
   // Filter form control to default size for all tables
   $('.dataTables_filter .form-control').removeClass('form-control-sm');
   $('.dataTables_length .form-select').removeClass('form-select-sm').removeClass('form-control-sm');
 });
 

// /**
//  * DataTables Advanced
//  */

// 'use strict';

// $(function () {
//   var isRtl = $("html").attr("data-textdirection") === "rtl";

//   var dt_filter_table = $(".dt-column-search"),
//     assetPath = "app-assets/";

//   // if ($("body").attr("data-framework") === "laravel") {
//   //   assetPath = $("body").attr("data-asset-path");
//   // }

//   // Column Search
//   // --------------------------------------------------------------------

//   if (dt_filter_table.length) {
//     // Setup - add a text input to each footer cell
//     $('.dt-column-search thead tr').clone(true).appendTo('.dt-column-search thead');
//     $('.dt-column-search thead tr:eq(1) th').each(function (i) {
//       var title = $(this).text();
//       $(this).html('<input type="text" class="form-control form-control-sm" placeholder="Search ' + title + '" />');

//       $('input', this).on('keyup change', function () {
//         if (dt_filter.column(i).search() !== this.value) {
//           dt_filter.column(i).search(this.value).draw();
//         }
//       });
//     });

//     var dt_filter = dt_filter_table.DataTable({
//       ajax: assetPath + 'data/gc_unidades_lista.json',
//       processing: true,
//       // dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
//       api: true,
//       destroy: true,
// language: {
// paginate: {
// // remove previous & next text from pagination
// previous: "&nbsp;",
// next: "&nbsp;",
// limit: 5,
// },
// },

//       columns: [
//         { data: 'id' },
//         { data: 'area' },
//         { data: 'nivel' },
//         { data: 'unidades' },
//         { data: 'creada' },
//         { data: 'id' }
//       ],
//       columnDefs: [
//         {
//           // For Responsive
//           className: "control",
//           orderable: false,
//           targets: 0,
//         },
//         {
//          // Actions
//          targets: -1,
//          title: "Acción",
//          orderable: false,
//          render: function (data, type, full, meta) {
//            return (
//              '<div class="d-inline-flex">' +
//              '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
//              feather.icons["more-vertical"].toSvg({ class: "font-small-4" }) +
//              "</a>" +
//              '<div class="dropdown-menu dropdown-menu-end">' +
//              '<a href="javascript:;" type="button" class="dropdown-item delete-record sweetAlert" id="'+ data +'">' +
//              feather.icons["trash-2"].toSvg({ class: "me-50 font-small-4" }) +
//              "Eliminar</button>" +
//              "</div>" +
//              "</div>" +
//              '<a href="gc_unidades_editar.html" target="_self" class="item-edit">' +
//              feather.icons["edit"].toSvg({ class: "font-small-4" }) +
//              "</a>"
//            );
//          },
//         },
//         {
//          // Centrar Unidades
//          targets: -3,
//          title: "Unidades",
//          orderable: true,
//          className: 'd-flex justify-content-center'
//         },
//       ],

//       language: {
//         url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
//         },
//         });
//   }

//   dt_filter_table.on("click", ".sweetAlert", function (e, dt, type, indexes) {
//     console.log("id: " + this.id);
//     Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//     if (result.isConfirmed) {
//     Swal.fire("Deleted!", "Your file has been deleted.", "success");
//     }
//     });
//     });

//   // Filter form control to default size for all tables
//   $(".dataTables_filter .form-control").removeClass("form-control-sm");
//   $(".dataTables_length .form-select")
//     .removeClass("form-select-sm")
//     .removeClass("form-control-sm");
// });