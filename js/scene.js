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

    var heightFactor = 0.75
  
      new Obstacle({
        source: this.$el,
        position: "5%",
        height: Math.random() * (this.$el.height() * heightFactor)
      }).build()
    
      new Obstacle({
        source: this.$el,
        position: "35%",
        height: Math.random() * (this.$el.height() * heightFactor)
      }).build()

      new Obstacle({
        source: this.$el,
        position: "65%",
        height: Math.random() * (this.$el.height() * heightFactor)
      }).build()       

      new Obstacle({
        source: this.$el,
        position: "85%",
        height: Math.random() * (this.$el.height() * heightFactor)
      }).build()         

    this.$screen.append(this.$el);
  }

  _Scene.prototype.start = function() {
    this.$el.animate({ "left": "-" + this.$screen.width() }, 10000, 'linear')
  }

  _Scene.prototype.hasEnded = function() {
    return this.$el.position().left + this.$screen.width() === 0
  }

  _Scene.prototype.aboutToEnd = function() {
    return this.$el.position().left + this.$screen.width() < (this.$screen.width() / 1.25)
  }  

  _Scene.prototype.destroy = function() {
    this.$el.remove()
  }

  return _Scene

})(jQuery);