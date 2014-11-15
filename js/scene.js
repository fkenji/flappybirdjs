var Scene = (function($) {

  function _Scene(screen) {
    var $div = $("<div>")
    $div.addClass("scene")
    this.$el = $div
    this.$screen = screen
  }

  _Scene.prototype.build = function() {
    this.$el.css("right", "-" + this.$screen.width())
    this.$screen.append(this.$el);
  }

  _Scene.prototype.start = function() {
    console.log('starting', this.$el)
    this.$el.animate({ "right": "800" }, 10000, 'linear')
  }

  _Scene.prototype.hasEnded = function() {
    return this.$el.position().left + this.$screen.width() <= 0
  }

  return _Scene

})(jQuery);