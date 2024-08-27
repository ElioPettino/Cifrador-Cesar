/*Elio Daniel Pettino - Aplicación Cifrador César - Script*/

const alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

/*OBTENGO EL INPUT ORIGINAL Y LO TRANSFORMO EN UN ARRAY DE MAYUSCULAS
PARA COMPARAR EN NUESTRO ALFABETO.*/
const shifMessage = () =>
{
	const wordArray = [...inputOriginal.value.toUpperCase()];
	printChar(0, wordArray);
}

const printChar = (currentLetterIndex, wordArray) => 
{
	if(wordArray.length === currentLetterIndex) return;
	inputOriginal.value = inputOriginal.value.substring(1);
	const spanChar = document.createElement("span");
	resultado.appendChild(spanChar);
	animateChar(spanChar)
	    .then( () => {
	    	const charSinCodificar = wordArray[currentLetterIndex];
			spanChar.innerHTML = alfabeto.includes(charSinCodificar) ?
				alfabeto[(alfabeto.indexOf(charSinCodificar) + parseInt(rango.value)) % alfabeto.length]:
				charSinCodificar
	printChar(currentLetterIndex + 1, wordArray);

	    })
	
}

/*FUNCION PARA ANIMAR LOS CARACTERES*/
const animateChar = spanChar =>
{
	let cambiosDeLetra = 0;
	return new Promise(resolve => 
	{
		const intervalo = setInterval(() => 
		{
			spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
			cambiosDeLetra++;
			if (cambiosDeLetra === 3) 
			{
				clearInterval(intervalo);
				resolve();
			}
		}, 50);
	});
}

/*CUANDO EL USUARIO APRETE ENTER, LA FUNCION RECIBE EL EVENTO. SE EVITA
EL COMPORTAMIENTO BASE DE SUBMIT DE ENVIAR UN FORMULARIO, ENTONCES 
SE USA EVENTPREVENTDEFAULT. SE BORRA LA ENCRIPTACION ANTERIOR*/
const submit = e =>
{
	e.preventDefault();
	resultado.innerHTML = '';
	shifMessage();
}



cifrador.onsubmit = submit;