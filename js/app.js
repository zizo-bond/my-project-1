           
           /**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
 const navBarList = document.getElementById("navbar__list"); // empty list
const navBarMenuSections = [...document.querySelectorAll("section")]; // makes an array and add items to it for each section in the document
let navBarMenuItems = navBarMenuSections.length;
const listSections = document.querySelectorAll("section"); // section elements
const listlinks = document.querySelectorAll(".navbar__menu a"); // link in the navbar
/**
 * End Global Variables
 * Begin Main Functions
 *
 */

// build the nav

const myNavBar = function AddItems() {
    // function to add items to the nav-bar list
    for (navBarMenuSection of navBarMenuSections) {
        navBarMenuSectionName = navBarMenuSection.getAttribute("data-nav");
        navBarMenuSectionLink = navBarMenuSection.getAttribute("id");
        navBarMenuListItem = document.createElement("li");
        navBarMenuListItem.innerHTML = `<a class='menu__link' href='#${navBarMenuSectionLink}'>${navBarMenuSectionName}</a>`;
        navBarList.appendChild(navBarMenuListItem);
    }
};

// Add class 'active' to section when near top of viewport

const sectionInViewport = function sectionPos(view) {
    // determine if section is near top of viewport
    let sectionz = view.getBoundingClientRect();
    return sectionz.top <= 200 && sectionz.bottom >= 200;
};

const addActiveClass = function acitveClass() {
    // function to add active class to viewed section
    for (navBarMenuSection of navBarMenuSections) {
        if (sectionInViewport(navBarMenuSection)) {
            if (!navBarMenuSection.classList.contains("active-class")) {
                navBarMenuSection.classList.add("active-class");
            }
        } else {
            navBarMenuSection.classList.remove("active-class");
        }
    }
};

// Scroll smoothly to section on anchor click

const smoothScroll = function scrollSmooth() {
    document.querySelectorAll(".menu__link").forEach((anchor) => {
        // selects all anchors with class='menu__link'
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(anchor.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

myNavBar();

// Scroll to section on link click

smoothScroll();

