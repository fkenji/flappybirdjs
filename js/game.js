var FlappyGame = (function($) {


  function _FlappyGame(sourceEl) {
    this.$el = $(sourceEl)
    _build.call(this, this.$el);
  }

  _FlappyGame.prototype.start = function() {
    this.$scene.start();
    var self = this
    // setInterval(function() {
    //   console.log(self.$scene.hasEnded())
    // }, 100)
  }

  function _build(el) {
    this.$el.addClass('screen')

    this.$bird = new Bird(this.$el);
    this.$bird.build();

    this.$scene = new Scene(this.$el) //scene has pipes
    this.$scene.build();
  }

  return _FlappyGame;


})(jQuery);