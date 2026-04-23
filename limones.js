let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ANCHO_LIMON=20;
const ALTURA_LIMON=20;

let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE)
let limonX=canvas.width/2;
let limonY=5;


function iniciar(){
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function dibujarSuelo(){
    ctx.fillStyle="red";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}
function dibujarPersonaje(){
    ctx.fillStyle="blue";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
    detectarColision();
}
function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
    detectarColision();
}
function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);
}

function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
}

function detectarColision(){
    if(limonX+ANCHO_LIMON>personajeX &&  
        limonX<personajeX+ANCHO_PERSONAJE && 
        limonY+ALTURA_LIMON>personajeY &&  
        limonY<personajeY+ALTURA_PERSONAJE){
        alert("ATRAPADO!!");
    }
}