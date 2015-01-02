var Bird = (function ($, Motio) {
  
  var FLY_IMPULSE_TOTAL = 70,
      FLY_IMPULSE_UNIT = 4,
      FALL_UNIT = 4;

  function _Bird(screen) {
    var $div = $("<div>");
    $div.attr("id", "bird");
    this.$el = $div;
    this.$screen = $(screen);


    this.$screen.append(this.$el);
    var element = document.querySelector('#bird');
    var sprite = new Motio(element, {
        fps: 2,
        frames: 2
    });
    sprite.play(); 

    this.el = this.$el.get(0);
    this.y = this.$el.position().top;
    this.deltaY = 0;
    this.nextY = 0;
    
  }

  _Bird.prototype.hasGoneOutbounds = function() {
    return this.$el.position().top > this.$screen.height() || this.$el.position().top < 0;
  }

  _Bird.prototype.collidesWith = function(obstacle) {
    return this.$el.overlaps(obstacle.$top).hits.length > 0 || this.$el.overlaps(obstacle.$bottom).hits.length > 0
  }

  _Bird.prototype.fly = function() {
    this.deltaY = (- FLY_IMPULSE_UNIT);
    this.nextY = this.y - FLY_IMPULSE_TOTAL;
    // console.log(this.nextY)
    this.prevY = this.y
  }

  _Bird.prototype.update = function() {
    this.y = this.y + this.deltaY;
    this.el.style.top = this.y + 'px';

    if(this.nextY && this.y <= this.nextY) {
      this.nextY = null;
      this.deltaY = FALL_UNIT;
      console.log(this.nextY, this.deltaY)      
    }
  }

  return _Bird;

})(jQuery, Motio);