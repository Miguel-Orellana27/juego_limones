let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE = 60;
const ANCHO_PERSONAJE = 40;
const ANCHO_LIMON = 20;
const ALTURA_LIMON = 20;

let personajeX = canvas.width / 2;
let personajeY = canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE);
let limonX = canvas.width / 2;
let limonY = 5;
let puntaje = 0;
let vidas = 3;
let velocidadCaidaIntervalo = 200;
let juegoIntervalo;

function iniciar(){
    if (juegoIntervalo) {
        clearInterval(juegoIntervalo);
    }
    
    puntaje = 0;
    vidas = 3;
    velocidadCaidaIntervalo = 200;
    limonY = 5;
    limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON); 
    personajeX = canvas.width / 2 - ANCHO_PERSONAJE / 2;

    mostarEnSpan("txtPuntaje", puntaje);
    mostarEnSpan("txtVidas", vidas);

    juegoIntervalo = setInterval(bajarLimon, velocidadCaidaIntervalo);
    actualizarPantalla();
}

function dibujarSuelo(){
    ctx.fillStyle = "red";
    ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle = "blue";
    ctx.fillRect(personajeX, personajeY, ANCHO_PERSONAJE, ALTURA_PERSONAJE);
}

function moverIzquierda(){
    if (personajeX > 0) {
        personajeX = personajeX - 10;
        actualizarPantalla();
    }
}

function moverDerecha(){
    if (personajeX < canvas.width - ANCHO_PERSONAJE) {
        personajeX = personajeX + 10;
        actualizarPantalla();
    }
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle = "green";
    ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTURA_LIMON);
}

function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX + ANCHO_LIMON > personajeX &&  
       limonX < personajeX + ANCHO_PERSONAJE && 
       limonY + ALTURA_LIMON > personajeY &&  
       limonY < personajeY + ALTURA_PERSONAJE){
        
        aparecerLimon();
        puntaje = puntaje + 1;
        mostarEnSpan("txtPuntaje", puntaje);

        if (puntaje === 3) {
            velocidadCaidaIntervalo = 150;
            reiniciarIntervaloJuego();
        } else if (puntaje === 6) {
            velocidadCaidaIntervalo = 100;
            reiniciarIntervaloJuego();
        } else if (puntaje === 10) {
            clearInterval(juegoIntervalo);
            alert("¡TIENES LOS LIMONES, AHORA TE FALTA SAL Y TEQUILA! ¡FELICIDADES, GANASTE!");
        }
    }
}

function detectarPiso(){
    if(limonY + ALTURA_LIMON >= canvas.height - ALTURA_SUELO){ 
        aparecerLimon();
        vidas = vidas - 1;
        mostarEnSpan("txtVidas", vidas);
        
        if (vidas <= 0){
            clearInterval(juegoIntervalo);
            alert("GAME OVER");
        }
    }
}

function aparecerLimon(){
    limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
    limonY = 0;
}

function generarAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mostarEnSpan(idSpan, valor) {
    const elemento = document.getElementById(idSpan);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function reiniciarIntervaloJuego() {
    clearInterval(juegoIntervalo);
    juegoIntervalo = setInterval(bajarLimon, velocidadCaidaIntervalo);
}

function reiniciar(){
    iniciar();
}

document.addEventListener('keydown'), (event) => {
    if (vidas > 0 && puntaje < 10) { 
        if (event.key === 'ArrowLeft' || event.key === 'a') {
            moverIzquierda();
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
            moverDerecha();
        }
    }
}