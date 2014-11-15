var Bird = (function ($) {
  

  function _Bird(screen) {
    var $div = $("<div>")
    $div.attr("id", "bird") 
    this.$el = $div
    this.$screen = screen
  }


  _Bird.prototype.build = function() {
    this.$screen.append(this.$el);
  }


  return _Bird;

})(jQuery);