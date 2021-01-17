class Form
{
    constructor()
    {
        this.title = createElement("h1");
        this.input = createInput("name");
        this.button = createButton("play");
        this.greeting = createElement("h3");
        this.resetButton = createButton("reset game");
    }
    hide()
    {
        this.title.hide();
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
    }
    display()
    {
        this.input.position(width/2 - 70, 250);
        this.button.position(width/2 - 20, 300);
        this.resetButton.position(width/2 - 20, height - 50);
        this.resetButton.mousePressed(() => 
        {
            game.update(0);
            player.updateCount(0);
        })
        this.button.mousePressed(() =>
        {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount++;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Welcome to the game " + player.name + "!");
            this.greeting.position(width/2 - 80, 200);
        })
    }
}