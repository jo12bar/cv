import ResizeObserver from "resize-observer-polyfill";

import { MDCRipple } from "@material/ripple";
import { MDCList } from "@material/list/index";
import { MDCDrawer } from "@material/drawer/index";
import { MDCTopAppBar } from "@material/top-app-bar/index";

// Init icon button ripples
const iconButtonRipples = [];
for (const button of document.querySelectorAll(".mdc-icon-button")) {
  const ripple = new MDCRipple(button);
  ripple.unbounded = true;
  iconButtonRipples.push(ripple);
}

// Init nav.

const navDrawer = {
  topAppBarElement: document.querySelector(".mdc-top-app-bar"),
  listEl: document.querySelector(".mdc-drawer .mdc-deprecated-list"),
  listElClickDeregister: () => {
    /* no-op */
  },
  drawerElement: document.querySelector(".mdc-drawer"),
  mainContentElement: document.querySelector(".main-content"),
};

// Initialize either modal or permanent drawer

const initModalDrawer = () => {
  navDrawer.drawerElement.classList.add("mdc-drawer--modal");
  const drawer = MDCDrawer.attachTo(navDrawer.drawerElement);
  drawer.open = false;

  const topAppBar = MDCTopAppBar.attachTo(navDrawer.topAppBarElement);
  topAppBar.setScrollTarget(navDrawer.mainContentElement);
  topAppBar.listen("MDCTopAppBar:nav", () => {
    drawer.open = !drawer.open;
  });

  const handleDrawerElementClick = (event) => {
    drawer.open = false;
  };
  navDrawer.listEl.addEventListener("click", handleDrawerElementClick);
  navDrawer.listElClickDeregister = () =>
    navDrawer.listEl.removeEventListener("click", handleDrawerElementClick);

  return drawer;
};

const initPermanentDrawer = () => {
  navDrawer.drawerElement.classList.remove("mdc-drawer--modal");

  navDrawer.listElClickDeregister();
  navDrawer.listElClickDeregister = () => {
    /* no-op */
  };

  const list = MDCList.attachTo(navDrawer.listEl);
  list.wrapFocus = true;

  // init ripples on the list items
  for (const listItemEl of list.listElements) {
    MDCRipple.attachTo(listItemEl);
  }

  return list;
};

let drawer = window.matchMedia("(max-width: 900px)").matches
  ? initModalDrawer()
  : initPermanentDrawer();

// Toggle between permanent and modal drawer at 900px

const resizeHandler = () => {
  if (
    window.matchMedia("(max-width: 900px)").matches &&
    drawer instanceof MDCList
  ) {
    drawer.destroy();
    drawer = initModalDrawer();
  } else if (
    window.matchMedia("(min-width: 900px)").matches &&
    drawer instanceof MDCDrawer
  ) {
    drawer.destroy();
    drawer = initPermanentDrawer();
  }
};

const ro = new ResizeObserver(resizeHandler);
ro.observe(document.body);
