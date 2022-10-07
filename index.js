const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.7

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc:'./img/background.png',
   

})   

const shop = new Sprite({
    position: {
        x:600,
        y:135
    },
    imageSrc:'./img/shop.png',
    scale: 2.7,
    framesMax: 6,
    
})

const player = new Fighter({
    position: {
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc:'./img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset:{
        x: 215,
        y:150

    }
})



const enemy = new Fighter({
    position: {
        x:400,
        y:100
    },
    velocity:{
        x:0,
        y:0
    },
    color:'blue',
    offset: {
        x:-50,
        y:0,
    }
})


enemy.draw();

console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed:false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}
let lastKey

function rectangularCollision({rectangle1 , rectangle2})  {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
    
}

// animation uses recursion to loop.
function animation() {
    window.requestAnimationFrame(animation)
    c.fillStyle = "black"
    c.fillRect(0,0, canvas.width,canvas.height)

    background.update()
    shop.update()

    player.update()
   // enemy.update()


    //this is solving the endless movement issue
    player.velocity.x = 0
    enemy.velocity.x = 0

// This is just telling the player where to move by adding 1 and -1 on the x axis

//player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if(keys.d.pressed && player.lastKey ==='d'){
        player.velocity.x = 5
    }

//Enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
    }else if (keys.ArrowRight.pressed && enemy.lastKey ==="ArrowRight") {
        enemy.velocity.x = 5
    }

// detect for collision 
    if 
    (rectangularCollision({
        rectangle1: player, 
        rectangle2: enemy
    })
    && player.isAttacking)
    {
        player.isAttacking = false
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health +"%"
    }

    if 
    (rectangularCollision({
        rectangle1: enemy, 
        rectangle2: player
    })
    && enemy.isAttacking)
    {
        enemy.isAttacking = false
        player.health -=20 
        document.querySelector('#playerHealth').style.width = player.health +"%"
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0 ){
        determineWinner({player,enemy})

    }
}
function determineWinner({player,enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if(player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie'   
    }else if (player.health > enemy.health) {
            document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
           
    }else if(enemy.health > player.health) {
        document.querySelector('#displayText').innerHTML = "Player 2 Wins"
    }
}


//.timer function (recursion redbox)
let timer = 60
let timerId
function decreaseTimer() {
   
    if(timer >0) {
        timerId =  setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }
    
    if(timer === 0){
        document.querySelector('#displayText').style.display = 'flex'
        determineWinner({player,enemy,timerId})
    }
    

}

decreaseTimer()

animation();

//Event listener are basically taking the input of the keyboard letters and moving our caracter. 
//this keydown events are telling the player when to stop.

window.addEventListener('keydown', (event) =>{
    // input for keys on switch.
    
    switch (event.key){
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y= -10
            break
        case ' ':
            player.attack
            player.attack()
            break
        

        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUP':
            enemy.velocity.y = -10
            break
        case 'ArrowDown':
            enemy.isAttacking = true
            break

    }
    
})

//this keydown events are telling the player when to move.
window.addEventListener('keyup', (event) =>{
    switch (event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case'w':
            player.velocity.y =-10
            break
    }

    switch (event.key){
        case'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            enemy.velocity.y =-10
            break
    }
    console.log(event.key);
})