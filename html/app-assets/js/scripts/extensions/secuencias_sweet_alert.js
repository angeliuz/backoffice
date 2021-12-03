/*=========================================================================================
	File Name: ext-component-sweet-alerts.js
	Description: A beautiful replacement for javascript alerts
	----------------------------------------------------------------------------------------
	Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/
$(function () {
  "use strict";
  //--------------- Confirm Options ---------------

  var confirmText = $(".eliminar");
  // Confirm Text
  if (confirmText.length) {
    confirmText.on("click", function () {
      console.log("hola");
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Eliminar una unidad no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ms-1",
        },
        buttonsStyling: false,
      }).then(function (result) {
        if (result.value) {
          Swal.fire({
            icon: "success",
            title: "Secuencia eliminada",
            text: "La secuencia se eliminó correctamente",
            customClass: {
              confirmButton: "btn btn-success",
            },
          });
        }
      });
    });
  }
});
