(function() {
    $(document).ready(function() {
      var walkthrough2;
      walkthrough2 = {
        index: 0,
        nextScreen: function() {
          if (this.index < this.indexMax()) {
            this.index++;
            return this.updateScreen();
          }
        },
        prevScreen: function() {
          if (this.index > 0) {
            this.index--;
            return this.updateScreen();
          }
        },
        updateScreen: function() {
          this.reset();
          this.goTo(this.index);
          return this.setBtns();
        },
        setBtns: function() {
          var $lastBtn, $nextBtn, $prevBtn;
          $nextBtn = $('.next-screen2');
          $prevBtn = $('.prev-screen2');
          $lastBtn = $('.finish');
          if (walkthrough2.index === walkthrough2.indexMax()) {
            $nextBtn.prop('disabled', true);
            $prevBtn.prop('disabled', false);
            return $lastBtn.addClass('active2').prop('disabled', false);
          } else if (walkthrough2.index === 0) {
            $nextBtn.prop('disabled', false);
            $prevBtn.prop('disabled', true);
            return $lastBtn.removeClass('active2').prop('disabled', true);
          } else {
            $nextBtn.prop('disabled', false);
            $prevBtn.prop('disabled', false);
            return $lastBtn.removeClass('active2').prop('disabled', true);
          }
        },
        goTo: function(index) {
          $('.screen2 ').eq(index).addClass('active2');
          return $('.dot2').eq(index).addClass('active2');
        },
        reset: function() {
          return $('.screen2 , .dot2').removeClass('active2');
        },
        indexMax: function() {
          return $('.screen2 ').length - 1;
        },
        closeModal: function() {
          $('.walkthrough2, .shade').removeClass('reveal2');
          return setTimeout((() => {
            $('.walkthrough2, .shade').removeClass('show2');
            this.index = 0;
            return this.updateScreen();
          }), 200);
        },
        openModal: function() {
          $('.walkthrough2, .shade').addClass('show2');
          setTimeout((() => {
            return $('.walkthrough2, .shade').addClass('reveal2');
          }), 200);
          return this.updateScreen();
        }
      };
      $('.next-screen2').click(function() {
        return walkthrough2.nextScreen();
      });
      $('.prev-screen2').click(function() {
        return walkthrough2.prevScreen();
      });
      $('.close').click(function() {
        return walkthrough2.closeModal();
      });
      $('.open-walkthrough2').click(function() {
        return walkthrough2.openModal();
      });
      walkthrough2.openModal();
      
      // Optionally use arrow keys to navigate walkthrough2
      return $(document).keydown(function(e) {
        switch (e.which) {
          case 37:
            // left
            walkthrough2.prevScreen();
            break;
          case 38:
            // up
            walkthrough2.openModal();
            break;
          case 39:
            // right
            walkthrough2.nextScreen();
            break;
          case 40:
            // down
            walkthrough2.closeModal();
            break;
          default:
            return;
        }
        e.preventDefault();
      });
    });
  
  }).call(this);
