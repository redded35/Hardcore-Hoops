var isShooting = false;
var score = 0;
var misses = 0;

var time = 200;

var endFlag = false;

var style = {font: '35px Arial', fill:'#1C3AA7', align: 'center'};


//creates a GameScreen object
var GameScreen = {
    
    //the preload method runs first
    //it is where we load our assets
    preload : function() {
        //loads an image named 'logo'
        game.load.image('logo', 'assets/images/basketball.png');
        game.load.image('hoop', '/assets/images/basketball-net.jpg');
        game.load.image('bg', '/assets/images/basketball-court-backgrounds1.jpg');
        //loads an image named 'start'
        game.load.image('start', '/assets/images/start.png');
        game.load.image('lebron', '/assets/images/lebron.png');
    },
    
    //the create method is run after the preload method
    //it is where we set up the basics of the game, essentially what it will look like when we start the game
    create: function () {
//makes the background color of the whole screen black
        game.stage.backgroundColor = '#000000';
        
        this.bg = game.add.image(0,0, 'bg');
        this.bg.width = 640;
        this.bg.height = 480;
        
        //starts the physics system for the game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //creates a variable that handles the arrow keys
        this.cursor = game.input.keyboard.createCursorKeys();
        
        this.hoop = game.add.sprite(game.world.centerX - 100, 0, 'hoop');
        this.hoop.scale.x = 0.50;
        this.hoop.scale.y = 0.50;
        game.physics.arcade.enable(this.hoop);
        this.hoop.body.immovable = true;
        this.hoop.body.velocity.x = 650;
        this.hoop.body.collideWorldBounds = true;
        this.hoop.body.bounce.x = 1;
        
        this.lebron = game.add.sprite(30,100, 'lebron');
        this.lebron.scale.x = 0.2;
        this.lebron.scale.y = 0.2;
        game.physics.arcade.enable(this.lebron);
        this.lebron.body.immovable = true;
        this.lebron.body.velocity.x = 350;
        this.lebron.body.collideWorldBounds = true;
        this.lebron.body.bounce.x = 1;
        
        //creates a sprite with the 'logo' image at (200, 400) and assigns it to a variable
        this.mc = game.add.sprite(50, 4308, 'logo');
        this.mc.scale.x = 0.16;
        this.mc.scale.y = 0.16;
        //enables the physics system for the mc
        game.physics.arcade.enable(this.mc);
        
        //make it so the mc can't leave the screen
        this.mc.body.collideWorldBounds = true;
        
        this.scoring = game.add.text(490,410, "Made: " + score.toString(), style);
        this.missing = game.add.text(468,440, "Missed: " + misses.toString(), style);
        this.timer = game.add.text(0,0, "Time: " + time.toString(), style);
        
    },
    
    //function that is called 60 times per second
    //where we put the logic of the game
    update: function() {
        if (!endFlag) {
            game.physics.arcade.collide(this.hoop, this.mc, this.hit, null, this);
            game.physics.arcade.collide(this.lebron, this.mc, this.blocked, null, this);
            if(this.mc.y == 0){
                console.log("test");
                this.mc.x = 50;
                this.mc.y = 4308;
                isShooting = false;
                misses++;
                this.missing.text = "Missed: "+misses;
            }

            //if the right arrow is pressed, move to the right        
            if (this.cursor.up.isDown) {
                isShooting = true;
                this.mc.body.velocity.x = 0;
                this.mc.body.velocity.y = -400;         
            }else{
                if (this.cursor.right.isDown && isShooting == false) {
                    this.mc.body.velocity.x = 350;
                } else if (this.cursor.left.isDown && isShooting == false) { 
                    //if the left arrow is pressed, move to the left
                    this.mc.body.velocity.x = -350;
                } else { //if no arrow keys are being pressed, stop moving
                    this.mc.body.velocity.x = 0;
                }
            }
        
            if (time > 0) {
                time--;
                this.timer.text = "Time: "+ time;   
            } else {
                console.log("here");
                endFlag = true;
                this.mc.kill();
                this.hoop.kill();
                this.lebron.kill();
                game.add.text(300,300, "You made " + score.toString() + " baskets", style);

            }
            
        }
        
    },
    
    hit: function(hoop, mc) {
        if (mc.body.touching.up) {
            this.mc.x = 50;
            this.mc.y = 4308;
            isShooting = false;
            score++;
            this.scoring.text = "Made: "+ score;
        }
    },
    
blocked: function(lebron, mc) {
        if (mc.body.touching.up) {
            this.mc.x = 50;
            this.mc.y = 4308;
            misses++;
            this.missing.text = "Missed: "+misses;
            isShooting = false;
        }
    }
};