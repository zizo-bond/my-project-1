           
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
 * Define Global Variables
 * 
 */
const sections = document.getElementsByTagName('section');
const list = document.getElementById('navbar__list');
const list_array = document.getElementById('navbar__list').childNodes; // consider list items as an array
const header = document.querySelector('.page__header');


//  Define sections' pageYOffset values 
const sectionsOffsetVAL = [];
let activeSection;
let activeSection_ids;
/**
 * End Global Variables
 
 * Begin Main Functions
 * 
 */

// making the nav
const myNav = function()  {
    for (let section of sections) {
        let li = section.attributes['data-nav'].nodeValue;
        list.innerHTML += `<li><a href="" class="menu__link">${li}</a></li>`;
        // get the sections' pageYOffset values 
        sectionsOffsetVAL.push(section.offsetTop);
    }
    // making the first 'li' item as active
    list.childNodes[0].classList.add('active-nav');
}
// calling the function
myNav();

/**
 * End Main Functions
 * Begin Events
 * 
 */

// Detecting the active section through tracking the window YOffset 

window.addEventListener('scroll', (e) => {

    // check if the first section has been reached
    if (sectionsOffsetVAL && window.pageYOffset >= sectionsOffsetVAL[0]) {
        //  detect the active section  by making a loop 
        sectionsOffsetVAL.map((value, index) => {
            // setting offset value to 200 to avoid changing active class in case of  hitting the last few px of the section
            if (value <= window.pageYOffset + 200) {
                // define the active section to add the active class to it
                activeSection = sections[index];
                activeSection_ids = index;
            }
        })

        // check if the active class is already in the active section's classList
        if (activeSection.classList.contains("your-active-class")) {
            return
        } else {
            // remove the  active class from all sections 
            for (let section of sections) {
                section.classList.remove("your-active-class")
            }
            // remove the active class from all nav li 
            for (let li of list_array) {
                li.classList.remove("active-nav")
            }
            // add the active class only to the active section
            activeSection.classList.add("your-active-class") 
            // add the active class  only to the active nav li
            list_array[activeSection_ids].classList.add("active-nav")
        }
    }
})




// Scroll to section on click
list.addEventListener('click', (e) => {
    // prevent a(href) default behaviour
    e.preventDefault();
    console.dir(e.target.nodeName)
    if (e.target.nodeName == 'A') {
        for (let section of sections) {
            if (e.target.outerText == section.attributes['data-nav'].nodeValue) {
                window.scrollTo({
                    top: section.offsetTop,
                    left: section.offsetLeft,
                    behavior: 'smooth'
                })
            }
        }
    }
})
