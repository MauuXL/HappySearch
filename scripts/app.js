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
    const code = ['0', '5', '1', '0', '2', '2'];
    header.innerHTML = "<h1>Ingrese código!</h1>";
    header.classList.add('animate__animated', 'animate__fadeIn');

    section.innerHTML = `
        <div id="input">
            <input id="n1" type="text" autocomplete="off" inputmode="numeric" maxlength="1" placeholder="-" />
            <input id="n2" type="text" autocomplete="off" inputmode="numeric" maxlength="1" placeholder="-" />
            <input id="n3" type="text" autocomplete="off" inputmode="numeric" maxlength="1" placeholder="-" />
            <input id="n4" type="text" autocomplete="off" inputmode="numeric" maxlength="1" placeholder="-" />
            <input id="n5" type="text" autocomplete="off" inputmode="numeric" maxlength="1" placeholder="-" />
            <input id="n6" type="text" autocomplete="off" inputmode="numeric" maxlength="1" placeholder="-" />
        </div>
    `;
    section.classList.add('animate__animated', 'animate__backInUp');

    footer.innerHTML = `<div><button id="send">Enviar</button></div>`;

    const button = document.querySelector('#send');
    const inputs = document.querySelectorAll('input');

    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
            if (input.value && inputs[index + 1]) {
                inputs[index + 1].focus();
                inputs[index + 1].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
        input.addEventListener('click', () => {
            input.value = '';

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
        const n5 = document.querySelector('#n5').value;
        const n6 = document.querySelector('#n6').value;

        if (n1 === code[0] && n2 === code[1] && n3 === code[2] && n4 === code[3] && n5 === code[4] && n6 === code[5]) {
            inputs.forEach(input => {
                input.classList.remove('input-error');
            });
            start.classList.remove('hidden');
            starting();
            const dialog = document.createElement('dialog');
            dialog.innerHTML = `
                <h2>Un poquito de historia</h2>
                <p>Nuestra historia❤️</p>
                <div class="video-wrapper">
                    <iframe
                        src="https://player.vimeo.com/video/1161235993"
                        width="100%"
                        height="360"
                        frameborder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen>
                    </iframe>

                </div>


                <form method="dialog">
                    <button >Cerrar</button>
                </form>
            `;
            document.body.appendChild(dialog);
            dialog.addEventListener('close', () => {
                dialog.querySelector('video')?.pause();
                dialog.remove();
            });

            setTimeout(() => {
                dialog.showModal();
            }, 300);

        } else {
            inputs.forEach(input => {
                setTimeout(() => {
                    input.classList.add('input-error', 'animate__animated', 'animate__shakeX');
                }, 300);
                input.classList.remove('animate__animated', 'animate__shakeX');
                setTimeout(() => {
                    inputs.forEach(input => {
                        input.value = '';
                    });
                }, 1000);
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