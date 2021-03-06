// CREADO POR JORGE ESPINOZA
// NOVIEMBRE DE 2021
// ERA PANDEMIC

// initialization of go to
// $.HSCore.components.HSGoTo.init(".js-go-to");
// Example menu definititon:
const menu = [
  {
    title: "Gestor de recursos",
    enlace: "#",
    icon: "layers",
    submenus: [
      {
        title: "Recursos",
        enlace: "index.html",
        icon: "circle",
      },
      {
        title: "Palabras claves",
        enlace: "gc_palabrasclaves_lista.html",
        icon: "circle",
      },
    ],
  },
  {
    title: "Gestor de programas",
    enlace: "#",
    icon: "clipboard",
    submenus: [
      {
        title: "Objetivos y Ejes",
        enlace: "gc_programas_lista.html",
        icon: "circle",
      },
      {
        title: "Conf. de programas",
        enlace: "gc_programa_configurador_lista.html",
        icon: "circle",
      },
    ],
  },
  {
    title: "Gestor de guias",
    enlace: "gc_guias_lista.html",
    icon: "book-open",
  },
  {
    title: "Gestor de usuarios",
    enlace: "#",
    icon: "users",
    submenus: [
      {
        title: "Usuarios",
        enlace: "gc_usuarios_lista.html",
        icon: "circle",
      },
      {
        title: "Roles",
        enlace: "gc_usuarios_roles_lista.html",
        icon: "circle",
      },
    ],
  },
  {
    title: "Gestor de colegios",
    enlace: "#",
    icon: "home",
    submenus: [
      {
        title: "Colegios",
        enlace: "gc_colegios_lista.html",
        icon: "circle",
      },
      {
        title: "Grupos de colegios",
        enlace: "gc_grupos_colegio_lista.html",
        icon: "circle",
      },
      {
        title: "Administradores colegios",
        enlace: "gc_usuarios_roles_lista.html",
        icon: "circle",
      },
    ],
  },
  {
    title: "Unidades MINEDUC",
    enlace: "gc_unidades_lista.html",
    icon: "grid",
  },
  {
    title: "Secuencias SM",
    enlace: "gc_secuencias_lista.html",
    icon: "package",
  },
  {
    title: "Gestor de licencias",
    enlace: "#",
    icon: "key",
    submenus: [
      {
        title: "Licencias",
        enlace: "gc_licencias_lista.html",
        icon: "circle",
      },
      {
        title: "Solicitar licencias",
        enlace: "gc_licencias_agregar.html",
        icon: "circle",
      },
    ],
  },
  {
    title: "Configuraciones",
    enlace: "#",
    icon: "settings",
    submenus: [
      {
        title: "Niveles",
        enlace: "gc_niveles_lista.html",
        icon: "circle",
      },
      {
        title: "Asignaturas",
        enlace: "gc_asignaturas_lista.html",
        icon: "circle",
      },
    ],
  },
  {
    title: "Tour SM",
    enlace: "gc_tour.html",
    icon: "fast-forward",
  },
  {
    title: "Contacto",
    enlace: "gc_contacto.html",
    icon: "mail",
  },
];

function populateMenu(menu) {
  $("#main-menu-navigation").html("");

  console.log(window.location.pathname);

  let active = "";

  let path = window.location.pathname.replace("/html/", "");
  console.log(path);

  for (let i = 0; i < menu.length; i++) {
    let botonSolo = "";
    if (menu[i].submenus) {
      //console.log(menu[i].submenus);
      botonSolo = '<li class="nav-item has-sub" id="menuParent' + i + '">';
      botonSolo += '<a class="d-flex align-items-center" href="' + menu[i].enlace + '">';
      botonSolo += '<i data-feather="' + menu[i].icon + '"></i>';
      botonSolo += '<span class="menu-title text-truncate">' + menu[i].title + "</span>";
      botonSolo += "</a>";

      botonSolo += '<ul class="menu-content">';

      for (let a = 0; a < menu[i].submenus.length; a++) {
        // console.log(menu[i].submenus[a].title);
        if (menu[i].submenus[a].enlace == path) {
          console.log(menu[i].submenus[a].enlace + " == " + path);
          active = "active";
        } else {
          active = "";
        }

        botonSolo += '<li class="' + active + '" id="element' + a + '">';
        botonSolo += '<a class="d-flex align-items-center" href="' + menu[i].submenus[a].enlace + '">';
        botonSolo += '<i data-feather="' + menu[i].submenus[a].icon + '"></i>';
        botonSolo += '<span class="menu-item text-truncate">' + menu[i].submenus[a].title + "</span>";
        botonSolo += "</a>";
        botonSolo += "</li>";
      }
      botonSolo += "  </ul>";
      botonSolo += "</li>";

      $("#main-menu-navigation").append(botonSolo);
    } else {
      if (menu[i].enlace == path) {
        console.log(menu[i].enlace + " == " + path);
        active = "active";
      } else {
        active = "";
      }
      botonSolo = '<li class="nav-item ' + active + '">' + '<a class="d-flex align-items-center" href="' + menu[i].enlace + '">' + '<i data-feather="' + menu[i].icon + '"></i>' + '<span class="menu-title text-truncate">' + menu[i].title + "</span>";
      $("#main-menu-navigation").append(botonSolo);
    }
  }
}
// Provide the DOM element where the menu should be inserted:
