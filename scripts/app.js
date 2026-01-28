//variables
const aniTime = 000;
let start = document.querySelector('#start');
const header = document.querySelector('#headerText');
const section = document.querySelector('#sectionText');
const footer = document.querySelector('#footerText');



function starting() {
    setTimeout(() => {
        start.classList.add('hidden');
        start.style.display = 'none';
    },  aniTime);
}

function app() {
    header.innerHTML = "Estas lista?";
    header.classList.add('animate__animated', 'animate__fadeIn');
    section.innerHTML = '<div><button>hola</button><button>hola</button></div>';
    section.classList.add('animate__animated', 'animate__backInUp')
}









//app
starting();
setTimeout(() => {
    app()
},  aniTime);