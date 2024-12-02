//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


//* VARIABLES GLOBALES DEL JUEGO
let pollitoObj = null // por ahora está vacio, pero adelante tendrá su valor

// let tuberiaObj = null // TEST
let tuberiasArr = []

let gameIntervalId = null;
let addTuberiaIntervalId = null;

//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {

  // 1. ocultar la pantalla inicial
  splashScreenNode.style.display = "none"

  // 2. mostrar la pantalla de juego
  gameScreenNode.style.display = "flex"

  // 3. añadir todos los elementos iniciales del juego
  pollitoObj = new Pollito()
  console.log(pollitoObj)

  // tuberiaObj = new Tuberia() // TEST

  // 4. iniciar el intervalo del juego
  gameIntervalId = setInterval(() => {
    gameLoop()
  }, Math.round(1000/60)) // 60 fps

  // 5. iniciar los otros intervalos del juego
  addTuberiaIntervalId = setInterval(() => {
    addTuberia()
  }, 2000)

}


function gameLoop() {
  // console.log("ejecutando loop inicial del juego")

  //! aqui agregamos unicamente lo que se deba ejecutar 60 veces por segundo. 
  pollitoObj.gravityEffect()
  // tuberiaObj.automaticMovement()

  tuberiasArr.forEach((cadaTuberiaObj) => {
    cadaTuberiaObj.automaticMovement()
  })

  checkRemoverTuberiasQueSalen()
  checkCollisionPollitoTuberias()
  checkCollisionPollitoFloor()

}

function addTuberia() {

  let posiciónAleatoriaTuberiaArriba = Math.floor(Math.random() * -200) // entre -200 y 0

  let tuberiaObjArriba = new Tuberia("arriba", posiciónAleatoriaTuberiaArriba)
  tuberiasArr.push(tuberiaObjArriba)

  let tuberiaObjAbajo = new Tuberia("abajo", posiciónAleatoriaTuberiaArriba + 360)
  // 360 es la distancia entre las dos tuberias + la altura de la tuberia
  tuberiasArr.push(tuberiaObjAbajo)


  console.log(tuberiasArr.length)

}

function checkRemoverTuberiasQueSalen() {

  if (tuberiasArr.length !== 0 && tuberiasArr[0].x + tuberiasArr[0].w <= 0) {
    tuberiasArr[0].node.remove()
    tuberiasArr.shift() // elimina el primer elemento del array
  }

}

function checkCollisionPollitoTuberias() {

  tuberiasArr.forEach((cadaTuberiaObj) => {
    
    // cadaTuberiaObj
    // pollitoObj

    if (
      pollitoObj.x < cadaTuberiaObj.x + cadaTuberiaObj.w &&
      pollitoObj.x + pollitoObj.w > cadaTuberiaObj.x &&
      pollitoObj.y < cadaTuberiaObj.y + cadaTuberiaObj.h &&
      pollitoObj.y + pollitoObj.h > cadaTuberiaObj.y
    ) {
      // Collision detected!
      console.log("el pollito se ha estampado contra una tuberia")


      //
      pollitoObj.node.src = "./images/explosion.png"
      pollitoObj.w = 60
      pollitoObj.h = 60
      pollitoObj.node.style.width = `${pollitoObj.w}px`
      pollitoObj.node.style.height = `${pollitoObj.h}px`

      clearInterval(gameIntervalId)
      clearInterval(addTuberiaIntervalId)

      setTimeout(() => {
        gameOver()
      }, 1000)
      
    }

  })

}

function gameOver() {

  // 1. IMPORTANTE: detener todos los intervalos del juego
  // clearInterval(gameIntervalId)
  // clearInterval(addTuberiaIntervalId)

  // 2. ocultar la pantalla de juego
  gameScreenNode.style.display = "none"

  // 3. mostrar la pantalla de game over
  gameOverScreenNode.style.display = "flex"

}

function checkCollisionPollitoFloor() {

  if ((pollitoObj.y + pollitoObj.h) > gameBoxNode.offsetHeight) {
    gameOver()
  }

}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", () => {
  startGame()
})

gameBoxNode.addEventListener("click", () => {
  pollitoObj.jump()
})




// brainstorming planificación

// agregar fondo del juego ✅
// pollo exista (img, x, y, w, h, jumpSpeed, gravitySpeed) ✅
// efecto de gravedad ✅
// salto del pollito (con click) ✅
// tubos existen (img, x, y, w, h, speed) ✅
// movimiento automatico de los tubos ✅
// tuberia spawn (van apareciendo con el tiempo) ✅
// IMPORTANTE: debemos eliminar del juego las tuberias que salgan de la pantalla ✅
// aparecen 2 tubos con imagenes diferentes ✅
// los tubos aparezcan el alturas aleatorias ✅
// colision entre los tubos y el pollito
// gameOver

// bonus
// contador de puntos
// niveles
// dificultad aumento
// aleteo
// suelo moviendose
