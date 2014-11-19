var FlappyGame = (function($) {


  function _FlappyGame(sourceEl) {
    this.$el = $(sourceEl)
    this.scene = null;
    this.previousScene = null;    
  }

  _FlappyGame.prototype.start = function() {
    console.log('Game Started!')
    var self = this;
    self.currentScene.start()
    this.interval = setInterval(function() {
      if(self.currentScene.hasCollisionsWith(self.bird) || self.bird.hasGoneOutbounds()){
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
  }

  _FlappyGame.prototype.build = function(el) {
    this.$el.addClass('screen')

    this.bird = new Bird(this.$el);
    this.bird.build();

    this.currentScene = new Scene(this.$el) 
    this.currentScene.build();

    this.bindStartGameEvent();
  }

  _FlappyGame.prototype.bindStartGameEvent = function() {
    var self = this,
        gameStartEventHandler = function(event) {
          if (event.keyCode == 32) {
            self.start();            
            $("body").off("keyup", gameStartEventHandler);
          }   
        }

    $("body").on("keyup", gameStartEventHandler);    
  };

  return _FlappyGame;


})(jQuery);