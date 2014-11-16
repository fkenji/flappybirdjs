var Obstacle = (function($) {

  function _Obstacle(spec) {
    this.position = spec.position

    
    this.$source = $(spec.source)
    this.$el = this.$source

    var baseHeight = this.$el.height()
    var topHeight = 0
    var birdHeightPercentage = 30
    var bottomHeight = 0
    var topHeightPercentage = Math.random() * 60
    var bottomHeightPercentage = 0;
    
    topHeight = (topHeightPercentage) / 100 * baseHeight;

    bottomHeightPercentage = 100 - birdHeightPercentage - topHeightPercentage
    bottomHeight = baseHeight * bottomHeightPercentage / 100

    this.$top = $("<div>")
    this.$top.addClass("obstacle").addClass("top")
    this.$top.height(topHeight)

    this.$bottom = $("<div>")
    this.$bottom.addClass("obstacle").addClass("bottom")
    this.$bottom.height(bottomHeight)

    console.log('topHeight', topHeight, 'bottomHeight', bottomHeight)

  }

  _Obstacle.prototype.build = function() {
    console.log('position', this.position)
    this.$top.css("left", this.position)
    this.$bottom.css("left", this.position)
    this.$source.append(this.$top);
    this.$source.append(this.$bottom);
  }

  return _Obstacle;


})(jQuery);