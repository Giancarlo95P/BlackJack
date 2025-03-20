/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diaminds (Tréboles)
 * 2H = Two of Hearts (Tréboles)
 * 2S = Two of Spades (Tréboles)
 */

let deck       = [];
const types    = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputador = 0;

// Referencias del HTML
const btnPedir   = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small'); 

const crearDeck = () => {
    for ( let i = 2; i <= 10; i++){
        for (const type of types) {
            deck.push( i + type)
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
    if (deck.length === 0 ) {
        throw 'El deck no cuenta con más cartas';
    }

    const carta = deck.pop();
    return carta;
}

// pedirCarta();

// Función valor de la carta: Se refiere a cuanto vale cada carta
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return puntos = ( isNaN(valor) ) ? 
                    ( valor === 'A') ? 11 : 10 
                    : valor * 1;
}

// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;

});



