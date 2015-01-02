var FlappyGame = (function($) {

  var STATE_DISPLAY_SPLASH_SCREEN = 0,
      STATE_WAIT_FOR_SPLASH_SCREEN_INPUT = 10,
      STATE_INIT_GAME = 20,
      STATE_PLAYING_GAME = 30,
      STATE_GAME_OVER = 40,
      STATE_END = 50;

  var KEY_SPACEBAR = 32;

  function _FlappyGame(sourceEl) {
    this.$el = $(sourceEl)
    this.scene = null;
    this.previousScene = null;
    this.gameFunction = null;
    this.switchState(STATE_DISPLAY_SPLASH_SCREEN);
    this.keyPressedList = [];
  }

  _FlappyGame.prototype.switchState = function(newState) {
    this.state = newState;

    switch(this.state) {
      case STATE_DISPLAY_SPLASH_SCREEN:
           this.gameFunction = this.displaySplashScreen;
           break;
      case STATE_WAIT_FOR_SPLASH_SCREEN_INPUT:
           this.gameFunction = this.waitForSplashScreenInput;
           break;
      case STATE_INIT_GAME:
           this.gameFunction = this.initGame;
           break; 
      case STATE_PLAYING_GAME:
           this.gameFunction = this.runGame;
           break;
      case STATE_GAME_OVER:
           this.gameFunction = this.showGameOver;
           break;
      case STATE_END:
           this.gameFunction = this.end;
           break;
    }

  }

  _FlappyGame.prototype.start = function() {
    this.bindStartGameEvent();
    this.gameLoop();
  }

  _FlappyGame.prototype.gameLoop = function() {
    var self = this;
    self.gameFunction();

    var runGameLoop = function() {
      self.gameLoop();
    };

    //setTimeout(runGameLoop, 33);
    window.requestAnimationFrame(runGameLoop);
  }

  _FlappyGame.prototype.end = function() {
    
  }


  _FlappyGame.prototype.bindStartGameEvent = function() {
    var self = this;

    $("body").on("keyup", function(event) {
      self.keyPressedList[event.keyCode] = false;
    });

    $("body").on("keydown", function(event) {
      self.keyPressedList[event.keyCode] = true;
    });    

  };

  _FlappyGame.prototype.displaySplashScreen = function() {
    this.$splashScreen = $("<div>").addClass("splash")
    this.$splashScreen.append("<h1 class='gametitle'>Snappy Bird</h1>")
    this.$splashScreen.append("<p class='instructions'>press spacebar to start!</p>")
    this.$el.html(this.$splashScreen);
    this.switchState(STATE_WAIT_FOR_SPLASH_SCREEN_INPUT);
  }  

  _FlappyGame.prototype.waitForSplashScreenInput = function() {
    if(this.keyPressedList[KEY_SPACEBAR]) {
      this.switchState(STATE_INIT_GAME);
    }
  }

  _FlappyGame.prototype.initGame = function() {
    this.$splashScreen.remove();
    this.bird = new Bird(this.$el);
    this.currentScene = new Scene(this.$el) 
    this.switchState(STATE_PLAYING_GAME);
  }

  _FlappyGame.prototype.runGame = function() {

    this.currentScene.update();
    this.checkKeys();
    this.bird.update();

    if(this.currentScene.aboutToEnd()) {
      this.previousScene = this.currentScene;
      this.currentScene = new Scene("#screen");
    }    

    if(this.previousScene){
      this.previousScene.update();
      if(this.previousScene.hasEnded()) {
        this.previousScene.destroy();
      }      
    }


    if((this.previousScene && this.previousScene.hasCollisionsWith(this.bird)) ||
      this.currentScene.hasCollisionsWith(this.bird) || this.bird.hasGoneOutbounds()){
      this.switchState(STATE_GAME_OVER);
    }

  }


  _FlappyGame.prototype.checkKeys = function() {
    if(this.keyPressedList[KEY_SPACEBAR]) {
      this.bird.fly();
    }
  }

  _FlappyGame.prototype.showGameOver = function() {
    var $gameover = $("<h1 class='gameover'>Game over!</h1>")
    this.$el.append($gameover);    
    switchState(STATE_END)
  }

  return _FlappyGame;

})(jQuery);