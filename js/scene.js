var Scene = (function($) {

  function _Scene(screen) {
    this.$screen = $(screen)

    var $div = $("<div>")
    $div.addClass("scene")
    this.$el = $div

    //scenes should have the same size as the base screen
    this.$el.width(this.$screen.width())
    this.$el.height(this.$screen.height())
    
  }

  _Scene.prototype.build = function() {
    //positioning
    this.$el.css("left", this.$screen.width())
  
    this.obstacles = []
    this.obstacles.push(new Obstacle({ source: this.$el, position: "5%",}))
    this.obstacles.push(new Obstacle({ source: this.$el, position: "45%",}))
    this.obstacles.push(new Obstacle({ source: this.$el, position: "85%",}))
    

    this.obstacles.forEach(function(obstacle){
      obstacle.build()
    })

    this.$screen.append(this.$el);
  }

  _Scene.prototype.start = function() {
    this.$el.animate({ "left": "-" + this.$screen.width() }, 10000, 'linear')
  }

  _Scene.prototype.hasEnded = function() {
    return this.$el.position().left + this.$screen.width() === 0
  }

  _Scene.prototype.aboutToEnd = function() {
    return this.$el.position().left + this.$screen.width() < (this.$screen.width() / 1.05)
  }  

  _Scene.prototype.destroy = function() {
    this.$el.remove()
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