    // Main Class
    class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax=1, offset ={x:0,y:0}}) {
        //properties of Sprite
         this.position = position
         this.width= 50
         this.height = 150
         this.image = new Image()
         this.image.src = imageSrc
         this.scale = scale
         this.framesMax = framesMax
         this.frameCurrent = 0
         this.framesElapsed= 0
         this.framesHold = 15
         this.offset = offset
          }
        
        draw() {
            c.drawImage(
                this.image,

                //x's value, moving to the rigth.
                this.frameCurrent * (this.image.width/this.framesMax),
                
                0,
                this.image.width / this.framesMax,
                this.image.height,

                this.position.x - this.offset.x, 
                this.position.y -this.offset.y, 
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            )
        }
        // new method to not reapeat myself
        animateFrame() {
            this.framesElapsed++

                if(this.framesElapsed % this.framesHold === 0){
                 if(this.frameCurrent < this.framesMax - 1){
                    this.frameCurrent++
                   }else{
                    this.frameCurrent=0
                  }
                }
        }

        
        update() {
            this.draw()
            this.animateFrame()
        }
    }
    
    class Fighter extends Sprite{
        constructor({
            position, 
            velocity, 
            color = "red", 
            imageSrc, 
            scale = 1, 
            framesMax = 1,
            offset = { x:0, y:0},
            sprites
        }) {
            //properties of Sprite
            super({
                position,
                imageSrc,
                scale,
                framesMax,
                offset
            })
             this.velocity = velocity
             this.width= 50
             this.height = 150
             this.lastKey
             this.attackBox = {
                position:{
                    x: this.position.x,
                    y: this.position.y
                } ,
                offset,
                width:100 ,
                height:50,
             }
             this.color = color
             this.isAttacking
             this.health= 100
             this.frameCurrent = 0
             this.framesElapsed = 0
             this.framesHold= 5
             this.sprites = sprites
             }

             update() {
                this.draw()
                this.animateFrame()
                

                this.attackBox.position.x = this.position.x + this.attackBox.offset.x,
                this.attackBox.position.y = this.position.y
        
                
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
        
                if( this.position.y + this.height + this.velocity.y >= canvas.height-95){
                    this.velocity.y= 0
                } else this.velocity.y += gravity
            }
            
               
        
            
            
            //method call this for attacking
            attack() {
               this.isAttacking = true 
               setTimeout (() => {
                this.isAttacking = false
        
               }, 100) //miliseconds
            }
    }