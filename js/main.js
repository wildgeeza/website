// Twitter button
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

$(function() {
  var lazy      = $('.lazy'),
      portfolio = $('.portfolio .span6'),
      overlay   = $('.overlay'),
      budget    = $('#budget'),
      workBtn   = $('.work-btn'),
      doc       = $('html, body'),
      
      youtube = $('.youtube-btn');
    
  checkOverlayShouldShow(overlay);
  $(window).resize(function() {
    checkOverlayShouldShow(overlay);
  });
    

  workBtn.click(function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $('.the-form').offset().top
    }, 1000);
  });

  youtube.click(function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $('.youtube-player').offset().top
    }, 1000);
  });
    

    
  lazy.lazyload({ effect: 'fadeIn' });

    
  portfolio.hover(function() {
    $(this).find('.overlay').stop(true, false).fadeIn();
  }, function() {
    $(this).find('.overlay').stop(true, false).fadeOut();
  });
    

  /*budget.select2({ placeholder: 'Project budget' });*/


	$(".submit").click(function() {
		var name = $("input[name=name]").val();
		var email = $("input[name=email]").val();
		var source = $("input[name=source]").val();
		var message = $("textarea[name=message]").val();
		var err = $(".errors");
	
		if (name === "") {
			err.fadeOut("fast", function () {
				err.text("You forgot to enter your name!");
			});
			err.fadeIn("fast");
			return false;
		}
		else if (email === "") {
			
			err.fadeOut("fast", function () {
				err.text("You forgot to enter your e-mail address!");
			});
			err.fadeIn("fast");
			return false;
		}
  		else if (message === "") {
			
			err.fadeOut("fast", function () {
				err.text("You forgot to enter your message!");
			});
			err.fadeIn("fast");
			return false;
		}
		
		var dataString = 'name='+ name + '&email=' + email + '&source=' + source + '&message=' + message;
		//alert (dataString);return false;
		err.text("Please wait...").hide().fadeIn("fast");
		$.ajax({
			type: "POST",
			url: "contact.php",
			data: dataString,
			success: function() {
				$('form').html("");
				$('form').append("<div id='success'><h3>Message sent!</h3><p>Thanks, I will be in touch soon.</p></div>");
			}
		});
        
		return false;
	});
  
});

function checkOverlayShouldShow(overlay) {
  var width = $(window).width();
  if (width <= 767 && width > 505)
    overlay.css('opacity', '1');
  else if (width <= 980)
    overlay.css('opacity', '0');
  else
    overlay.css('opacity', '1');
}