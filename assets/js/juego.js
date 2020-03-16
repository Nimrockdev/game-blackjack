// C = Clubs
// D = Diamonds
// H = Hearts
// S = Spades

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosMaquina = 0;

// Referencias html
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasMaquina = document.querySelector('#maquina-cartas');

const puntosHTML = document.querySelectorAll('small');



const crearDeck = () => {

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

    // para desordenar el array
    deck = _.shuffle(deck);

    // console.log(deck);

    return deck;

}

crearDeck();

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    // console.log(deck);
    // console.log(carta);
    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    console.log(valor);
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
    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

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
    turnoMaquina(puntosJugador);
});

btnNuevo.addEventListener('click', () => {

    console.clear();

    deck = [];
    deck = crearDeck();


    puntosJugador = 0;
    puntosMaquina = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasMaquina.innerHTML = '';


    btnPedir.disabled = false;
    btnDetener.disabled = false;

});

// Máquina
// Se ejecutará cuando el jugador pierde o pulsa detener
const turnoMaquina = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntosMaquina = puntosMaquina + valorCarta(carta);

        puntosHTML[1].innerText = puntosMaquina;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasMaquina.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosMaquina < puntosMinimos) && (puntosMinimos <= 21));

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

    }, 10);

}