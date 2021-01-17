// class for entire game
class Game
{
    constructor()
    {
        this.titleImage = loadImage("images/title.png");
    }
    // gets gameState from database
    getState()
    {
        // refers to gamestate field in database
        var gameStateRef = database.ref("gameState");
        // checks for change and gives value to gameState
        gameStateRef.on("value", function(data)
        {
            gameState = data.val();
        })
    }
    // updates database with gameState
    update(state)
    {
        // refer to gameState field and set as 1 or 0
        database.ref("/").update({
            gameState: state
        })
    }
    // at the start of the game (menu)
    async start()
    {
        // if 4 players have not joined
        if(gameState === 0)
        {
            // create a player
            player = new Player();
            // refers to playerCount field and reads the value
            var playerCountRef = await database.ref("playerCount").once("value");
            // when there is a value
            if(playerCountRef.exists())
            {
                // gets value in playerCount field and stores in playerCount local var
                playerCount = playerCountRef.val();
                player.getCount();
            }
            // makes the menu form and displays
            form = new Form();
            form.display();
        }
        // when 4 players have joined
        // creates 4 cars and adds to cars array
        var y = height - 200;
        car1 = createSprite(width/2 - 300, y);
        car1.addImage(car1Img);
        car2 = createSprite(width/2 - 100, y);
        car2.addImage(car2Img);
        car3 = createSprite(width/2 + 100, y);
        car3.addImage(car3Img);
        car4 = createSprite(width/2 + 300, y);
        car4.addImage(car4Img);
        cars = [car1, car2, car3, car4];
    }
    // when 4 players join
    play()
    {
        // hide the form
        form.hide();
        // display start text
        textSize(20);
        text("START", width/2 - 30, 40);
        // gets all players details
        Player.getPlayerInfo();
        // if there are players
        if(allPlayers!=undefined)
        {
            background("green");
            image(trackImg, 0, -displayHeight*4, width, displayHeight*5);
            // give index as 0 to be incremented
            var index = 0;
            var x = width/2 - 500;
            var y;
            for(var plr in allPlayers)
            {
                index = index + 1;
                x += 200;
                y = height - allPlayers[plr].distance;
                cars[index - 1].x = x;
                cars[index - 1].y = y;
                if(index === player.index)
                {
                    fill("red");
                    ellipse(cars[index-1].x, cars[index-1].y, 60, 60);
                    camera.position.x = width/2;
                    camera.position.y = y;
                    imageMode(CENTER);
                    image(this.titleImage, width/2, cars[index-1].y - 250, 400, 100);
                }
            }
            if(keyDown(UP_ARROW) && player.index != null)
            {
                player.distance += 30;
                player.update();
            }
            if(player.distance >= 4590)
            {
                gameState = 2;
            }
        }
        drawSprites();
    }
    end()
    {
        background("green")
        image(trackImg, 0, -displayHeight*4, width, displayHeight*5);
        console.log("game ended");
        drawSprites();
    }
}