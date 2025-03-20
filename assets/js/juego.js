/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diaminds (Tréboles)
 * 2H = Two of Hearts (Tréboles)
 * 2S = Two of Spades (Tréboles)
 */

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputador = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computador-cartas');

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const type of types) {
            deck.push(i + type)
        }
    };

    for (const special of specials) {
        for (const type of types) {
            deck.push(special + type);
        }
    }
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
};

crearDeck();



// Función para pedir una carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'El deck no cuenta con más cartas';
    }

    const carta = deck.pop();
    return carta;
}

// pedirCarta();

// Función valor de la carta: Se refiere a cuanto vale cada carta
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return puntos = (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}

// Función turno computadora 
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputador += valorCarta(carta);
        puntosHTML[1].innerText = puntosComputador;

        // <img class="carta" src="assets/cartas/2C.png" alt="">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputador === puntosMinimos) {
            alert('Empate');
        } else if (puntosMinimos > 21) {
            alert('Computadora Gana')
        } else if (puntosComputador > 21) {
            alert('Jugador Gana')
        } else {
            alert('Computadora Gana')
        }
    }, 100);

}

// Eventos:
//Botón Pedir:
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/2C.png" alt="">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    // Lógica puntaje 21
    if (puntosJugador > 21) {
        console.warn('Te excediste de 21. Lo siento, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)
        mensajeResultado()
    } else if (puntosJugador === 21) {
        console.warn('Alcanzaste 21, ¡felicidades!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador)
        mensajeResultado()
    }
});


// Botón detener
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

// Botón Nuevo Juego
btnNuevo.addEventListener('click', () => {
    
    deck = [];      // Limpiamos el deck
    crearDeck();    // Creamos un nuevo deck

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

    puntosComputador    = 0;
    puntosJugador       = 0;

    puntosHTML[0].innerText = "0";
    puntosHTML[1].innerText = "0";

    divCartasJugador.innerHTML     = "";
    divCartasComputadora.innerHTML = "";
});

