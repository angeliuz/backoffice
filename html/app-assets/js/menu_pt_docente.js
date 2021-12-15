// CREADO POR JORGE ESPINOZA
// NOVIEMBRE DE 2021
// ERA PANDEMIC

// initialization of go to
// $.HSCore.components.HSGoTo.init(".js-go-to");
// Example menu definititon:
const menu = [
  {
    title: "Mis Cursos",
    enlace: "#",
    icon: "layers",
  },
  {
    title: "Evaluaciones",
    enlace: "#",
    icon: "clipboard",
  },
  {
    title: "Compartidos",
    enlace: "gc_guias_lista.html",
    icon: "book-open",
    submenus: [
      {
        title: "Planificaciones",
        enlace: "gc_colegios_lista.html",
        icon: "circle",
      },
      {
        title: "Recursos",
        enlace: "gc_usuarios_roles_lista.html",
        icon: "circle",
      },
    ],
  },
  {
    title: "Mensajes",
    enlace: "#",
    icon: "users",
  },
  {
    title: "Ayuda",
    enlace: "#",
    icon: "home",
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