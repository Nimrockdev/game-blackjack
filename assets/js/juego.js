/*  función anónima 
    (() => {

    })();
*/

const modulo = (() => {
    'use strict'

    // C = Clubs
    // D = Diamonds
    // H = Hearts
    // S = Spades

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0,
    //     puntosMaquina = 0;

    let puntosJugadores = [];

    // Referencias html
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');



    const divCartasJugadores = document.querySelectorAll('.divCartas');


    const puntosHTML = document.querySelectorAll('small');



    const inicializarJuego = (numJugadores = 2) => {

        deck = crearDeck();

        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }


        //Reiniciamos el valor
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        // console.clear();


        btnPedir.disabled = false;
        btnDetener.disabled = false;


    }

    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        //shuffle, para desordenar el array
        return _.shuffle(deck);;

    }


    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        // console.log(deck);
        // console.log(carta);
        return deck.pop();;
    }

    // pedirCarta();

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        // console.loconsole.log(valor);
        let puntos = 0;

        // Para saber si es un numero
        if (isNaN(valor)) {
            // De las letras A=11, el resto 10
            puntos = (valor === 'A') ? 11 : 10;
        } else {

            puntos = valor * 1;
        }
        // console.log(puntos);

        return puntos;
    }



    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);


        crearCarta(carta, 0);

        if (puntosJugador > 21) {

            console.warn('Has perdido!');

            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoMaquina(puntosJugador);

        } else if (puntosJugador === 21) {

            console.warn('21, bien!');

            btnPedir.disabled = true;
            btnDetener.disabled = true;

            turnoMaquina(puntosJugador);

        }


    });


    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoMaquina(puntosJugadores[0]);
    });


    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });


    //El último turno es la máquina
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);

        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];

    }


    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasJugadores[turno].append(imgCarta);

    }

    const quienGana = () => {

        //De momento solo hay dos jugadores
        //desestructuración
        const [puntosMinimos, puntosMaquina] = puntosJugadores;

        setTimeout(() => {

            if (puntosMaquina === puntosMinimos) {
                alert('Empate...');
            } else if (puntosMinimos > 21) {
                alert('Máquina gana!!');
            } else if (puntosMaquina > 21) {
                alert('Jugador gana!!');
            } else {
                alert('Máquina gana!!');
            }

        }, 100);

    }


    // Máquina
    // Se ejecutará cuando el jugador pierde o pulsa detener
    const turnoMaquina = (puntosMinimos) => {

        let puntosMaquina = 0;

        do {
            const carta = pedirCarta();

            puntosMaquina = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosMaquina < puntosMinimos) && (puntosMinimos <= 21));

        quienGana();

    }

    return {
        nuevoJuego: inicializarJuego
    }

})();