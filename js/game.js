var FlappyGame = (function($) {


  function _FlappyGame(sourceEl) {
    this.$el = $(sourceEl)
    this.scene = null;
    this.previousScene = null;    
  }

  _FlappyGame.prototype.start = function() {
    this.displaySplashScreen();
    this.bindStartGameEvent();
  }

  _FlappyGame.prototype.startLoop = function() {
    console.log('Game Started!')
    var self = this;
    self.currentScene.start()
    this.interval = setInterval(function() {
      if((self.previousScene && self.previousScene.hasCollisionsWith(self.bird)) ||
        self.currentScene.hasCollisionsWith(self.bird) || self.bird.hasGoneOutbounds()){
        self.end()
      }

      if(self.currentScene.aboutToEnd()) {
            self.previousScene = self.currentScene;
            self.currentScene = new Scene("#screen");
            self.currentScene.build()
            self.currentScene.start()
      }

      if(self.previousScene && self.previousScene.hasEnded()) {
        self.previousScene.destroy()
      }
    }, 10)

  }

  _FlappyGame.prototype.end = function() {
    clearInterval(this.interval)
    this.$el.stop()
    this.currentScene.stop()
    this.bird.stop()  
    $("*").stop()  
  }

  _FlappyGame.prototype.build = function(el) {
    this.bird = new Bird(this.$el);
    this.bird.build();

    this.currentScene = new Scene(this.$el) 
    this.currentScene.build();
  }

  _FlappyGame.prototype.bindStartGameEvent = function() {
    var self = this;
    var gameStartEventHandler = function(event) {
          if (event.keyCode == 32) {
            self.build();
            self.startLoop();            
            self.$splashScreen.remove()
            $("body").off("keyup", gameStartEventHandler);
          }   
        }

    $("body").on("keyup", gameStartEventHandler);    
  };

  _FlappyGame.prototype.displaySplashScreen = function() {
    this.$splashScreen = $("<div>").addClass("splash")
    this.$splashScreen.append("<h1 class='gametitle'>Snappy Bird</h1>")
    this.$splashScreen.append("<p class='instructions'>press spacebar to start!</p>")
    this.$el.html(this.$splashScreen);
  }  

  return _FlappyGame;


})(jQuery);