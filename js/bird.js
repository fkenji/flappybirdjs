var Bird = (function ($, Motio) {
  

  function _Bird(screen) {
    var $div = $("<div>")
    $div.attr("id", "bird") 
    this.$el = $div
    this.$screen = $(screen)
  }


  _Bird.prototype.build = function() {
    this.$screen.append(this.$el);
    var element = document.querySelector('#bird');
    var sprite = new Motio(element, {
        fps: 2,
        frames: 2
    });
    sprite.play(); 
  }

  _Bird.prototype.hasGoneOutbounds = function() {
    return this.$el.position().top > this.$screen.height() || this.$el.position().top < 0;
  }

  _Bird.prototype.collidesWith = function(obstacle) {
    return this.$el.overlaps(obstacle.$top).hits.length > 0 || this.$el.overlaps(obstacle.$bottom).hits.length > 0
  }

  return _Bird;

})(jQuery, Motio);