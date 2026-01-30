//variables
const aniTime = 500;
const start = document.querySelector('#start');
const header = document.querySelector('#headerText');
const section = document.querySelector('#sectionText');
const footer = document.querySelector('#footerText');

function starting() {
    setTimeout(() => {
        start.classList.add('hidden',);
    }, aniTime);
}
starting();

function app() {
    const code = ['2', '2', '3', '4'];
    header.innerHTML = "<h1>Ingrese código!</h1>";
    header.classList.add('animate__animated', 'animate__fadeIn');

    section.innerHTML = `
        <div id="input">
            <input id="n1" type="text" autocomplete="off" inputmode="numeric" maxlength="1" placeholder="-" />
            <input id="n2" type="text" autocomplete="off" inputmode="numeric" maxlength="1" placeholder="-" />
            <input id="n3" type="text" autocomplete="off" inputmode="numeric" maxlength="1" placeholder="-" />
            <input id="n4" type="text" autocomplete="off" inputmode="numeric" maxlength="1" placeholder="-" />
        </div>
    `;
    section.classList.add('animate__animated', 'animate__backInUp');

    footer.innerHTML = `<div><button id="send">Enviar</button></div>`;

    const button = document.querySelector('#send');
    const inputs = document.querySelectorAll('input');

    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value && inputs[index + 1]) {
                inputs[index + 1].focus();
                inputs[index + 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
        input.addEventListener('click', () => {
            input.focus();
            setTimeout(() => {
                input.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        });
    });


    button.addEventListener('click', () => {
        const n1 = document.querySelector('#n1').value;
        const n2 = document.querySelector('#n2').value;
        const n3 = document.querySelector('#n3').value;
        const n4 = document.querySelector('#n4').value;

        if (n1 === code[0] && n2 === code[1] && n3 === code[2] && n4 === code[3]) {
            inputs.forEach(input => {
                input.classList.remove('input-error');
            });
            start.classList.remove('hidden');
            starting();
        } else {
            inputs.forEach(input => {
                setTimeout(() => {
                    input.classList.add('input-error', 'animate__animated', 'animate__shakeX');
                }, 300);
                input.classList.remove('animate__animated', 'animate__shakeX');
            });
            navigator.vibrate(200);
        }
    });

}


//app
starting();
setTimeout(() => {
    app()
},  aniTime);