var FlappyGame = (function($) {


  function _FlappyGame(sourceEl) {
    this.$el = $(sourceEl)
    this._build(this.$el);
    this.scene = null;
    this.previousScene = null;
  }

  _FlappyGame.prototype.start = function() {
    this.scene = new Scene(this.$el) 
    this.scene.build();    
    this.scene.start();

    var self = this

    setInterval(function() {
      if(self.scene.aboutToEnd()) {
        console.log('about to end..')
            self.previousScene = self.scene;
            self.scene = new Scene("#screen");
            self.scene.build()
            self.scene.start()
      }

      if(self.previousScene && self.previousScene.hasEnded()) {
        console.log('gonna destroy', self.previousScene)
        self.previousScene.destroy()
      }
    }, 100)

  }

  _FlappyGame.prototype.hasEnded = function() {

  }

  _FlappyGame.prototype._build = function(el) {
    console.log('FlappyGame.build')
    this.$el.addClass('screen')

    this.$bird = new Bird(this.$el);
    this.$bird.build();


  }

  return _FlappyGame;


})(jQuery);