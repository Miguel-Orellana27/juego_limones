function generarAleatorio(min,max){
   let random= Math.random(); // 0-1 
   let numero=random*(max-min);//0-max
   let numeroEntero = Math.ceil(numero);
   numeroEntero=numeroEntero+min;
   return numeroEntero
}


function mostarEnSpan(idSpan,valor){
let componente=document.getElementById(idSpan);
        componente.textContent=valor;
}