var Obstacle = (function($) {

  function _Obstacle(spec) {
    var $div = $("<div>")
    $div.addClass("obstacle")
    $div.height(spec.height)
    this.position = spec.position

    this.$el = $div
    this.$source = $(spec.source)

    console.log(spec)
  }

  _Obstacle.prototype.build = function() {
    console.log('position', this.position)
    this.$el.css("left", this.position)
    this.$source.append(this.$el);
  }

  return _Obstacle;


})(jQuery);