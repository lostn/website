/*<-- ============================================ 

    File:     default.js
    Brief:  Implementation of common functionality for whole website
    Dependencies:
        jquery-1.3.2.min.js             (jQuery library)
		jquery.cookie.js 		          (jQuery cookie plugin)  
		jquery.cycle.js 
		jquery.scrollTo.js 	   
		cufon-yui.js                    (font replacement tool) 

  =========================================== --> */

//<-- ============================================ Cufon Font Replacement
Cufon.replace('h1.styled, h2.styled, h3.styled, h4.styled, h5.styled, h6.styled'); 

//<-- ============================================ Navigation Animated Bar
$(function(){

	var $el, leftPos, newwidth,
	$nav = $("#navigation > ul");
	$nav.append("<li id='magic-line'></li>");
	var  $magicLine = $("#magic-line");
	
	$magicLine
		.width($("#navigation ul li.current").width())
		.css("left", $("#navigation .current").position().left+7)
		.data("origLeft", $magicLine.position().left)
		.data("origWidth", $("#navigation ul li.current").width());
		
	$("#navigation ul li a").hover(function(){
		$el = $(this);
		leftPos = $el.position().left - 5;
		newWidth = $el.width();
		
		$magicLine.stop().animate({
			left: leftPos,
			width: newWidth
		});
	}, function(){
		$magicLine.stop().animate({
			left: $magicLine.data("origLeft"),
			width: $magicLine.data("origWidth")
		});
	});

});

//<-- ============================================ Search
$(function(){
	$("#searchbox").focus(function(){
		$(this).val("");
	});
	$("#searchbox").blur(function(){
		$(this).val("Search");
	});
});

//<-- ============================================ List / Grid View
$(function(){
	//Variables
	var viewWrap = $('.viewwrap');
	var toggleView = $('.switch-view');
	
	//Toggle View Event
	toggleView.click(function(){
		if( viewWrap.hasClass('grid') ){
			listView();
		}else{
			gridView();
		}
		return false;
	});
	//Toggle List View
	function listView(){
		toggleView.removeClass('grid-b');
		viewWrap.fadeOut('fast',function(){
			$(this).fadeIn('fast').removeClass('grid');
			$.cookie('grid-view', '', { expires: 30 });
		});
	};	
	//Toggle Grid View
	function gridView(){
		toggleView.addClass('grid-b');
		viewWrap.fadeOut('fast',function(){
			$(this).fadeIn('fast').addClass('grid');
			$.cookie('grid-view', 'grid', { expires: 30 });
		});
	}	
	
	if ( $.cookie('grid-view') == 'grid'){
		$('.switch-view').addClass('grid-b');
		viewWrap.addClass('grid');
	}
});

//<-- ============================================ Home Page Feature
$(function() {	
	$('#feature').before('<a href="#" id="feature-prev"></a>');
	$('#feature').after('<a href="#" id="feature-next"></a>');
	
	$('#feature').cycle({
		fx: 'fade',
		easing:'swing',
		speed: 1000,
		timeout: 3000,
		next:   '#feature-next', 
		prev:   '#feature-prev', 
		pause: 1,
		height: 'auto',
		pauseOnPagerHover: 1,
		fastOnEvent: 350,
		pager: '#f-button',
		pagerAnchorBuilder: function(idx, slide) { 
			return '<li><a href="#">&nbsp;</a></li>'; 
		} 
	});
});

//<-- ============================================ Related Posts
$(function() {	
	$('#slider').before('<a href="#" id="related-prev"></a>');
	$('#slider').after('<a href="#" id="related-next"></a>');
	
	$('#slider').cycle({
		fx: 'scrollHorz',
		easing:'swing',
		speed: 1000,
		timeout: 0,
		next:   '#related-next', 
		prev:   '#related-prev', 
		pause: 1,
		height: 'auto',
		auto:false
	});
});
	
//<-- ============================================ Toggle Sidebar Functionality
$(function(){
	$('.use-sidebar #sidebar').before('<a href="#" id="separator">&nbsp;</a>');
	var contentWrap = $('#page-wrap');
	var togglebtn = $('#separator');
	
	//Toggle Sidebar
	togglebtn.click(function(){
		if( contentWrap.hasClass('use-sidebar') ){
			hideSidebar();
		}else{
			showSidebar();
		}
		return false;
	});
	
	//Show Sidebar
	function showSidebar(){
		contentWrap.addClass('use-sidebar');
		$.cookie('sidebar-pref2', 'use-sidebar', { expires: 30 });
	}
	//Hide Sidebar
	function hideSidebar(){
		contentWrap.removeClass('use-sidebar');
		$.cookie('sidebar-pref2', '', { expires: 30 });
	}
	// Load preference
	if ( $.cookie('sidebar-pref2') == ''){
		contentWrap.removeClass('use-sidebar');
	}
});

//<-- ============================================ Page Scroll
$(function() {
	 $('#page').localScroll();
	 $('#returntop').localScroll();
});
//<-- ============================================ UI Tabs
$(function() {

	//Default Action
	$(".tab-content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab-content:first").show(); //Show first tab content
	
	//On Click Event
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab-content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active content
		return false;
	});
});