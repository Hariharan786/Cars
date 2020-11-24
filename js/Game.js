class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }



  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(200,120,30,30);
    car1.addImage(car1img);
    car2 = createSprite(300,120,30,30);
    car2.addImage(car2img);
    car3 = createSprite(400,120,30,30);
    car3.addImage(car3img);
    car4 = createSprite(500,120,30,30);
    car4.addImage(car4img);

    cars=[car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(groundimg);
      image(track,0,-displayHeight*4,displayWidth,displayHeight*10);
      var index = 0;
      var x = 185;
      var y;
      for(var p in allPlayers){
        index = index+1;
        x=x+200;
        y=displayHeight-allPlayers[p].distance;
        cars[index-1].x=x;
        cars[index-1].y=y;

        if(index===player.index){
          fill("red");
          ellipse(x,y,80,80);

          cars[index-1].shapeColor="red";
          
          camera.position.x=displayWidth/2
          camera.position.y=cars[index-1].y;
        }
        

      }
    }
    //allPlayers=[player1,player2,player3,player4]
    //allPlayers[0]
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>3990){
      gamestate=2;
      player.rank=player.rank+1
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();
  }

  end(){
    console.log("gameOver");
    console.log(player.rank);
  }

}
