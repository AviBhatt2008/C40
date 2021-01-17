var database;
var gameState = 0;
var playerCount = 0;
var form;
var player;
var game;
var allPlayers;
var car1, car2, car3, car4;
var cars = [];
var car1Img, car2Img, car3Img, car4Img, trackImg, titleImage, formBackground;

function preload()
{
    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");

    trackImg = loadImage("images/track.jpg");
    
    titleImage = loadImage("images/title.png");
    formBackground = loadImage("images/racetrackImage.jpg");
}

function setup()
{
    createCanvas(windowWidth - (windowWidth/14), windowHeight - (windowHeight/5));

    database = firebase.database();

    game = new Game();
    game.getState()
    game.start();
}

function draw()
{
    background("white");
    if(playerCount === 4)
    {
        game.update(1);
    }
    if(gameState === 1)
    {
        clear();
        game.play();
    }
    if(gameState === 2)
    {
        game.end();
    }
    if(gameState === 0)
    {
        image(formBackground, 0, 0, width, height);
        imageMode(CENTER);
        image(titleImage, width/2, 60, 400, 100);
    }
}
