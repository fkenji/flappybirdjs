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

      if(self.scene.hasCollisionsWith(self.bird)){
        self.end()
      }

      if(self.scene.aboutToEnd()) {
            self.previousScene = self.scene;
            self.scene = new Scene("#screen");
            self.scene.build()
            self.scene.start()
      }

      if(self.previousScene && self.previousScene.hasEnded()) {
        self.previousScene.destroy()
      }
    }, 100)

  }

  _FlappyGame.prototype.end = function() {
    var $img = $("<img>")
    $img.attr('src', "images/explosion.gif")
    $img.attr('height', this.$el.height())
    $img.attr('width', this.$el.width())
    this.$el.replaceWith($img)
  }

  _FlappyGame.prototype._build = function(el) {
    console.log('FlappyGame.build')
    this.$el.addClass('screen')

    this.bird = new Bird(this.$el);
    this.bird.build();


  }

  return _FlappyGame;


})(jQuery);