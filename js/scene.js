var Scene = (function($) {

  function _Scene(screen) {
    this.$screen = $(screen);

    var $div = $("<div>");
    $div.addClass("scene");
    this.$el = $div;

    //scenes should have the same size as the base screen
    this.$el.width(this.$screen.width());
    this.$el.height(this.$screen.height());

    this.x = this.$screen.width() - 5;
    this.el = this.$el.get(0);
    this.el.style.left = this.x + 'px';

    this.obstacles = []
    this.obstacles.push(new Obstacle({ source: this.$el, position: "5%",}))
    this.obstacles.push(new Obstacle({ source: this.$el, position: "45%",}))
    this.obstacles.push(new Obstacle({ source: this.$el, position: "85%",}))

    this.obstacles.forEach(function(obstacle){
      obstacle.build();
    });

    this.$screen.append(this.$el);
    this.deltaX = 4;
  }

  _Scene.prototype.update = function() {
    this.x = this.x - this.deltaX;
    this.el.style.left = this.x + 'px';
  }

  _Scene.prototype.hasEnded = function() {
    return this.$el.position().left <= - (this.$screen.width());
  }

  _Scene.prototype.aboutToEnd = function() {
    return this.$el.position().left  <= 0
  }  

  _Scene.prototype.destroy = function() {
    this.$el.remove();
  }

  _Scene.prototype.stop = function() {
    this.$el.stop()
  }  

  _Scene.prototype.hasCollisionsWith = function(the_bird) {
    for(var i = 0; i < this.obstacles.length; i++) {
      if(the_bird.collidesWith(this.obstacles[i])) {
        return true;
      }
    }
    return false;
  }

  return _Scene

})(jQuery);