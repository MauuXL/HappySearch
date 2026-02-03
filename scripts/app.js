// ======================
// Variables globales
// ======================
const aniTime = 500;

const container = document.querySelector('#container-main');
const start = document.querySelector('#start');
const header = document.querySelector('#headerText');
const section = document.querySelector('#sectionText');
const footer = document.querySelector('#footerText');

const CODE = ['0', '5', '1', '0', '2', '2'];

// ======================
// Inicio
// ======================
function starting() {
    setTimeout(() => {
        start.classList.add('hidden');
    }, aniTime);
    const darkButton = document.querySelector('#darkButton i');

    // cargar tema guardado
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        darkButton.classList.remove('fa-moon');
        darkButton.classList.add('fa-sun');
    }

    // toggle
    darkButton.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');

        darkButton.classList.toggle('fa-sun', isDark);
        darkButton.classList.toggle('fa-moon', !isDark);

        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

starting();

// ======================
// Crear dialog
// ======================
function createDialog() {
    const dialog = document.createElement('dialog');
    dialog.classList.add('dark');

    dialog.innerHTML = `
        <h2>Un poquito de historia...</h2>
        <p>Nuestra historia ❤️</p>

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
            <button>Cerrar</button>
        </form>
    `;

    document.body.appendChild(dialog);

    dialog.addEventListener('close', () => {
        dialog.remove();
    });

    setTimeout(() => {
        dialog.showModal();
    }, 300);
}

// ======================
// App principal
// ======================
function app() {
    header.innerHTML = '<h1>Ingrese código!</h1>';
    header.classList.add('animate__animated', 'animate__fadeIn');

    section.innerHTML = `
        <div id="input">
            ${Array.from({ length: 6 }, (_, i) =>
                `<input id="n${i + 1}" type="text" inputmode="numeric" maxlength="1" placeholder="-" autocomplete="off" />`
            ).join('')}
        </div>
    `;
    section.classList.add('animate__animated', 'animate__backInUp');

    footer.innerHTML = `<button id="send">Enviar</button>`;

    const inputs = document.querySelectorAll('#input input');
    const button = document.querySelector('#send');

    // Inputs
    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            input.classList.remove('input-error');

            if (input.value && inputs[index + 1]) {
                inputs[index + 1].focus();
                inputs[index + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        input.addEventListener('click', () => {
            input.value = '';
            input.focus();
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });

    // Botón enviar
    button.addEventListener('click', () => {
        const values = Array.from(inputs).map(input => input.value);

        const isValid = values.every((val, i) => val === CODE[i]);

        if (isValid) {
            inputs.forEach(i => i.classList.remove('input-error'));
            start.classList.remove('hidden');
            starting();
            createDialog();
        } else {
            inputs.forEach(input => {
                input.classList.remove('animate__animated', 'animate__shakeX');
                setTimeout(() => {
                    input.classList.add('input-error', 'animate__animated', 'animate__shakeX');
                }, 50);
            });

            setTimeout(() => {
                inputs.forEach(i => (i.value = ''));
            }, 1000);

            navigator.vibrate?.(200);
        }
    });
}

// ======================
// Ejecutar app
// ======================
setTimeout(app, aniTime);
