var spawnList = [];

function spawn(x,y,h,w,speed){
    this.x = Math.floor(Math.random() * 800);
    this.y = 0//Math.floor(Math.random() * - 2000);
    this.h = 10;
    this.w = 10;
    this.speed = 3//Math.floor(Math.random() * 5) + 1;
    this.fill = '#00FF00';
}

function createSpawn(){
    //for(x=0;x<2;x++){
        var newSpawn = new spawn();
        spawnList.push(newSpawn);
    //}
}

createSpawn();


var game = (function(){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    //Create player object and define argument that will be used for fillRect()
    var player = {
        x:0,
        y:475,
        h:25,
        w:25,
        fill:'#fff',
        stroke:'#00FF00',
        dir:'right',
        speed:2
    }

    function launchSpawns(obj){
        checkPosition(obj);
        if(obj.y > canvas.height){
            obj.y=0;
             
        }
        ctx.fillStyle=obj.fill;

        ctx.clearRect(
            obj.x-1,
            obj.y-obj.speed,
            obj.w+2,
            obj.h+2
        );
    
        ctx.fillRect(
            obj.x,
            obj.y = (obj.y + 1),
            obj.w,
            obj.h
        );
        checkPosition(obj);
      }

    return{
        getPlayer: function(){
           return player;
        },
        player: function(){
         ctx.fillStyle=player.fill;
         ctx.strokeStyle=player.stroke;
         ctx.clearRect(player.x-2,player.y-2,player.h+6,player.w+6);
         //ctx.strokeRect(player.x++,player.y,player.h,player.w); 
         
            if(player.dir === 'right'){
                player.x += player.speed;
                ctx.fillRect(
                    player.x,
                    player.y,
                    player.h,
                    player.w
                ); 
                if((player.x + player.w) >= canvas.width){
                    player.dir='left';
                }
            }  
            else if (player.dir === 'left'){
                player.x -= player.speed;
                ctx.fillRect(player.x,player.y,player.h,player.w); 
                if((player.x + player.w) <= 25){
                    player.dir='right';
                }
            }
            else if (player.dir == 'up'){
                player.y -= player.speed;
                ctx.fillRect(
                    player.x,
                    player.y,
                    player.h,
                    player.w
                ); 
                if((player.y + player.h) <= 0){
                    player.dir='down';
                }
            }
            else{ /// player.dir == down
                player.y += player.speed;
                ctx.fillRect(
                    player.x,
                    player.y,
                    player.h,
                    player.w
                ); 
                if((player.y + player.h) >= canvas.height){
                    player.dir='up';
                }
            }
        },
        changeDirection: function(code){
            /*if(player.dir ==='left'){
                player.dir='right';
            }
            else if(player.dir ==='right'){
                player.dir='left';
            }*/
            if(code == 37){
                player.dir='left';
            }
            else if(code == 38){
                player.dir='up';
            }
            else if(code == 39){
                player.dir='right';
            }
            else if(code == 40){
                player.dir='down';
            } 
        },
        animate: function(){
            this.player();
            for(var x=0;x<spawnList.length; x++){  
                launchSpawns(spawnList[x]);
            } 
            window.requestAnimationFrame(this.animate.bind(this));
        },
        init: function(){
            canvas.width = 800;
            canvas.height = 600;
            this.animate();
        }
    } 
})();

game.init();


window.addEventListener('keyup' ,function(evt){
    if(evt.keyCode == 37){
        game.changeDirection(37);
    }
    else if(evt.keyCode == 38){
        game.changeDirection(38);
    }
    else if(evt.keyCode == 39){
        game.changeDirection(39);
    }
    else if(evt.keyCode == 40){
        game.changeDirection(40);
    } 
    
});

function checkPosition(obj)
{
   //console.log(obj.x);
   //console.log(game.getPlayer());
   if(obj.x>=game.getPlayer().x-15 && obj.x<=game.getPlayer().x+15)
   {
       //alert("Game Over");

       if(obj.y>=game.getPlayer().y && obj.y<=game.getPlayer().y+15)
       {
           alert("Game Over");
       }
   }
}
 

