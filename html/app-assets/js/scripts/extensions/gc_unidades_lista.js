/*=========================================================================================
	File Name: ext-component-sweet-alerts.js
	Description: A beautiful replacement for javascript alerts
	----------------------------------------------------------------------------------------
	Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(function () {
  'use strict';

  var warning = $('#type-warning');
  var confirmText = $('#confirm-text');

  var assetPath = 'app-assets/';
  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
  }

  //--------------- Types ---------------

  // Warning
  if (warning.length) {
    warning.on('click', function () {
      Swal.fire({
        title: '¡Atención!',
        text: 'Estas seguro que deseas eliminar el grupo de unidades. Esta acción no se puede deshacer.',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    });
  }

  //--------------- Confirm Options ---------------

  // Confirm Text
  if (confirmText.length) {
    confirmText.on('click', function () {
      Swal.fire({
        title: '¡Atención!',
        text: "Estas seguro que deseas eliminar el grupo de unidades. Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, estoy seguro',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ms-1'
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          Swal.fire({
            icon: 'success',
            title: '¡Borrado!',
            text: 'El grupo de unidades, ha sido borrado.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        }
      });
    });
  }
});
