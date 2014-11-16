            setTimeout(function() {
                fly($("#bird"), height);
                clearTimeout(timeout)
                timeout = setTimeout(function() {
                    fall($("#bird"),height);
                })

            }, delay);


 _Bird.prototype.collidesWithSide = function(obstacle) {
      var bird_width = (this.$el.width());
      var obstacle_right_edge = (obstacle.$top.offset().left) //when checking for edges, need to use offset

      var bird_height_from_top = (this.$el.position().top + this.$el.height())
      var bird_height_from_bottom = (this.$screen.height() - this.$el.position().top)
      var obstacle_height_top = obstacle.$top.height()
      var obstacle_height_bottom = (obstacle.$bottom.height())

      return  (bird_width > obstacle_right_edge) && 
              (bird_height_from_top < obstacle_height_top ||
              bird_height_from_bottom < obstacle_height_bottom )
  }            