// stap 1: selecteer buttons
const openMenuBtn = document.querySelector('.fdnd-button')
const closeMenuBtn = document.querySelector('.closemenu-btn')
const mobileMenu = document.querySelector('#nav')

//stap 2: Wacht tot er op geklikt wordt
//stap 3: voeg of verwijder class
openMenuBtn.addEventListener('click', function (event) {
    event.preventDefault()
    mobileMenu.classList.add('menu-open')
})
closeMenuBtn.addEventListener('click', function (event) {
    event.preventDefault()
    mobileMenu.classList.remove('menu-open')
})
