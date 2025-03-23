/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diaminds (Tréboles)
 * 2H = Two of Hearts (Tréboles)
 * 2S = Two of Spades (Tréboles)
 */

const miModulo = (() => {
    'use strict'

    let deck       = [];
    const types    = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];
    
    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo'),
          puntosHTML = document.querySelectorAll('small');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas');
    
    // Está función inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++ ){
            puntosJugadores.push(0);
        }
        
        puntosHTML.forEach(elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = "");

        btnPedir.disabled   = false;
        btnDetener.disabled = false;
    }

    // Está función crea y desordena el deck
    const crearDeck = () => {
        deck = [];
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
        return _.shuffle(deck);
    };
    
    
    
    
    // Función para pedir una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'El deck no cuenta con más cartas';
        }
        return deck.pop();
    }
    
    // Función valor de la carta: Se refiere a cuanto vale cada carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor))  ?
               (valor === 'A') ? 11 : 10
               : valor * 1;
    }

    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno]
    }

    // Función para renderizar las cartas en el HTML
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    // Función para determinar ganador
    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputador ] = puntosJugadores;

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

    
    // Función turno computadora 
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputador = 0;

        do {
            const carta = pedirCarta();
            puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));
    
        determinarGanador();
    
    }
    
    // Eventos:
    //Botón Pedir:
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0)

        crearCarta(carta, 0);
    
        // Lógica puntaje 21
        if (puntosJugador > 21) {
            console.warn('Te excediste de 21. Lo siento, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
        } else if (puntosJugador === 21) {
            console.warn('Alcanzaste 21, ¡felicidades!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)
        }
    });
    
    
    // Botón detener
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });
    
    // Botón Nuevo Juego
    // btnNuevo.addEventListener('click', () => {
    //     inicializarJuego();

    // });

    return {
        nuevoJuego: inicializarJuego
    }

})();
