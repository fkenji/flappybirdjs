var Bird = (function ($) {
  

  function _Bird(screen) {
    var $div = $("<div>")
    $div.attr("id", "bird") 
    this.$el = $div
    this.$screen = $(screen)
  }


  _Bird.prototype.build = function() {
    this.$screen.append(this.$el);
    this._bindEvents()
  }

  _Bird.prototype._bindEvents = function() {
    var timeout = 0
    var self = this
    $("body").on("keyup", function(event) {
        if (event.keyCode == 32) {
            var height = 100
            var delay = 100

            clearTimeout(timeout)
            self.$el.stop()
            self.$el.clearQueue()
            self.fly(height);
            
            timeout = setTimeout(function() {
                self.fall(1000); 
            }, delay);
    }});    
  }

  _Bird.prototype.fly = function(height) {
    this.$el.animate({ "top": "-="+ height}, 900);
  }

  _Bird.prototype.fall = function(height) {
    this.$el.animate({ "top": "+="+ height}, 4500);
  }  

  _Bird.prototype.stop = function() {
    $("body").off('keyup')
    
    this.$el.stop() 
    this.$el.clearQueue() 
  }

  _Bird.prototype.collidesWith = function(obstacle) {
    return this.$el.overlaps(obstacle.$top).hits.length > 0 || this.$el.overlaps(obstacle.$bottom).hits.length > 0
  }

  return _Bird;

})(jQuery);