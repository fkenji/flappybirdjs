var FlappyGame = (function($) {


  function _FlappyGame(sourceEl) {
    this.$el = $(sourceEl)
    this._build(this.$el);
  }

  _FlappyGame.prototype.start = function() {
    this.$scene.start();
    var self = this
    setInterval(function() {

      if(self.$scene.hasEnded()){
        self.$scene.destroy()
      }

    }, 100)
  }

  _FlappyGame.prototype._build = function(el) {
    console.log('FlappyGame.build')
    this.$el.addClass('screen')

    this.$bird = new Bird(this.$el);
    this.$bird.build();

    this.$scene = new Scene(this.$el) //scene has pipes
    this.$scene.build();
  }

  return _FlappyGame;


})(jQuery);