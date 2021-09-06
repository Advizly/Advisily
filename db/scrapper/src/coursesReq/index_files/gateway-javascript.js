/****************************************************************************************************/
/*************************                                                  *************************/
/**********                                                                                **********/
/*****                                         Functions                                        *****/
/**********                                                                                **********/
/*************************                                                  *************************/
/****************************************************************************************************/

function expandbox(selector) {

}

function shrink(selector) {

}

/**************************************************/
/**********                              **********/
/*****              gatewayFix                *****/
/**********                              **********/
/**************************************************/
function gatewayFix() {
	// N1
	// only needed in gateway preview
	if (jQuery('.block_n1_left').length) {
		jQuery('.block_n1_left').parent('tr').addClass('acalog-block-n1');
	}

	// N3
	if (jQuery('.block_n3_off select').length) {
		jQuery('.block_n3_off select').attr('id','select_catalog');
		jQuery('.block_n3_off input[name="sel_cat_submit"]').attr('id','select_catalog_submit');
		jQuery('#select_catalog_submit').parent('td').addClass('select_catalog_submit_container');
		jQuery('#select_catalog').select2({
			dropdownParent: jQuery('#catalog_select_parent'),
			minimumResultsForSearch: Infinity,
			dropdownAutoWidth : true,
			containerCssClass: 'catalog-selection-container',
			dropdownCssClass: 'catalog-selection-dropdown',
			dropdownCss: {
				left: 'auto'
			}
		});
		jQuery('.catalog-selection-container').on('focus', function() {
			jQuery('#catalog_select_parent').children('span:nth-of-type(2)').hide().show(0);
		});
		jQuery('#select_catalog').change(function() {
			jQuery('#select_catalog_submit').trigger('click');
		});
		jQuery('#select_catalog').removeAttr("aria-hidden");  
	}

	// N2
	if (jQuery('.block_n2_search').length) {
		jQuery('.block_n2_search br').remove();
		jQuery('#location, #keyword').removeAttr('style');
		jQuery('#keyword ~ input').attr('id','keyword-submit');
		if (jQuery('.block_n2_search span.n2_search a').length) {
			jQuery('.block_n2_search span.n2_search a').removeClass('navbar');
		}
		jQuery('#location').select2({
			dropdownParent: jQuery('#location_select_parent'),
			minimumResultsForSearch: Infinity,
			dropdownAutoWidth : true,
			containerCssClass: 'location-selection-container',
			dropdownCssClass: 'location-selection-dropdown',
			// dropdownCss: {
			// 	// left: 'auto'
			// }
		});
		jQuery('.location-selection-container').on('focus', function() {
			jQuery('#location_select_parent').children('span:nth-of-type(2)').hide().show(0);
		});
	}
	if (jQuery('#acalog-navigation div:empty').length) {
		jQuery('#acalog-navigation div:empty').remove();
	}
	if(location.search.length === 0) {
		jQuery('#acalog-navigation .n2_links:first a').parent().attr('id', 'gateway-nav-current');
	} else {
		var absoluteLoc = encodeURI(window.location.toString());
		var relativeLoc = encodeURI(location.pathname + location.search);
		var returnToUrl = location.protocol + '//' + location.host + '/' + jQuery('.acalog-breadcrumb a').attr('href');
		if (jQuery('.acalog-breadcrumb a').length) {
			jQuery('.n2_links a[href="'+returnToUrl+'"]').parent().attr('id', 'gateway-nav-current');
		} else {
			jQuery('.n2_links a[href="'+absoluteLoc+'"]').parent().attr('id', 'gateway-nav-current');
			jQuery('.n2_links a[href="'+relativeLoc+'"]').parent().attr('id', 'gateway-nav-current');
		}
	}
	jQuery('.block_n2_content hr').closest('tr').addClass('gateway-nav-hr');
	jQuery('.block_n2_links .gateway-nav-hr').removeClass('gateway-nav-hr');
	jQuery('.block_n2_content .n2_links').each(function(index) {
		if (jQuery(this).children('a').length) {
			var link = jQuery(this).children('a');
			jQuery(this).empty().append(link);
		}
	});

	// Content
	if (jQuery('#course_search').length) {
		jQuery('#course_search tr:eq(2) td:eq(3)').removeAttr('nowrap');
		jQuery('#course_search tr:eq(2) td:eq(4)').removeAttr('nowrap');
		jQuery('#course_search tr:eq(3) td:eq(3)').removeAttr('nowrap');
		jQuery('#course_search tr:eq(3) td:eq(4)').removeAttr('nowrap');
		jQuery('#course_search input[name="filter[keyword]"]').attr('id','course_filter_keyword').removeAttr('style').width('100%');
		jQuery('#course_search input[name="filter[29]"]').width('100px');
	}
	if (jQuery('span.portfolio_link').length) {
		jQuery('span.portfolio_link').replaceWith(function() {
			return jQuery('<div>'+ this.innerHTML +'</div>');
		});
	}
	if (jQuery('#search_keyword_field').length && !jQuery('#search_form').length) {
		jQuery('form[name="database_search"]').attr('id', 'search_form');
	}
	if (jQuery('.block_content ul[type]').length) {
		jQuery('.block_content ul[type]').each(function(index) {
			jQuery(this).css({'list-style-type':jQuery(this).attr('type')});
		});
	}
	jQuery('#acalog-content').attr('id','acalog-page-title');
	jQuery('h1[id=acalog-content]').removeAttr('id');

	// Footer
	if (jQuery('.block_footer_rb').length) {
		jQuery('.block_footer_rb').wrapInner('<div id="gateway-footer-copyright" />');
		jQuery('#acalog-client-footer').prependTo('.block_footer_rb');
		jQuery('#gateway-footer-copyright').appendTo('#acalog-client-footer');
		jQuery('#gateway-footer-copyright nobr').each(function(index) {
			jQuery(this).addClass('gateway-footer-copyright-'+index);
		});
		jQuery('#gateway-footer-copyright .footer').removeClass('footer').addClass('gateway-footer-link');
	}
}

/**************************************************/
/**********                              **********/
/*****               toolbar                  *****/
/**********                              **********/
/**************************************************/
function toolbar() {
	jQuery('.help_block').closest('td').attr('id','gateway-toolbar-container');

	// Publisher Preview Fix
	if (jQuery('.print_link').length === 1) {
		jQuery('.print_link').parent('div').appendTo('#gateway-toolbar-container');
		jQuery('a[href="javascript:window.close();"]').parent('div').addClass('gateway-close-link');
	}
	if (jQuery('.acalog_close_link').length && jQuery('.acalog_top_link').length === 1) {
		jQuery('.acalog_close_link').parent().remove();
	}

	// Prepare For Icons
	jQuery('.block_content hr:last ~ div').remove();
	jQuery('#gateway-toolbar-container br').remove();
	jQuery('#gateway-toolbar-container').prepend('<div id="gateway-toolbar-1" class="gateway-toolbar clearfix" />');

	// Standardise Specific Links
	if (jQuery('#gateway-toolbar-container .print_degree_planner_link').length) {
		var toolbarDegreePlannerLink = jQuery('<div>').append(jQuery('#gateway-toolbar-container .print_degree_planner_link a').clone()).remove().html();
		jQuery('#gateway-toolbar-1').append('<div class="gateway-toolbar-degree-planner gateway-toolbar-item">'+toolbarDegreePlannerLink+'</div>');
	}
	if (jQuery('#gateway-toolbar-container a.portfolio_link').length) {
		var toolbarPortfolioLink = jQuery('<div>').append(jQuery('#gateway-toolbar-container a.portfolio_link').clone()).remove().html();
		jQuery('#gateway-toolbar-1').append('<div class="gateway-toolbar-portfolio gateway-toolbar-item">'+toolbarPortfolioLink+'</div>');
	}
	if (jQuery('#gateway-toolbar-container .acalog-social-media-links').children().size() > 0) {
		var toolbarShareLink = jQuery('<div>').append(jQuery('#gateway-toolbar-container .acalog-social-media-links').contents().clone()).remove().html();
		jQuery('#gateway-toolbar-1').append('<div class="gateway-toolbar-share gateway-toolbar-item">'+toolbarShareLink+'</div>');
	}
	if (jQuery('#gateway-toolbar-container .print_link').length) {
		var toolbarPrintLink = jQuery('<div>').append(jQuery('#gateway-toolbar-container .print_link').clone()).remove().html();
		jQuery('#gateway-toolbar-1').append('<div class="gateway-toolbar-print gateway-toolbar-item">'+toolbarPrintLink+'</div>');
	}
	if (jQuery('#gateway-toolbar-container .help').length) {
		var toolbarHelpLink = jQuery('<div>').append(jQuery('#gateway-toolbar-container .help').text('Help').clone()).remove().html();
		jQuery('#gateway-toolbar-1').append('<div class="gateway-toolbar-help gateway-toolbar-item">'+toolbarHelpLink+'</div>');
	}

	// Remove Old Links
	jQuery('#gateway-toolbar-container .help').parent('div:not(.gateway-toolbar-item)').remove();
	jQuery('#gateway-toolbar-container .portfolio_link').parent('div:not(.gateway-toolbar-item)').remove();
	jQuery('#gateway-toolbar-container .print_link').parent('div:not(.gateway-toolbar-item)').remove();
	jQuery('#gateway-toolbar-container .acalog-social-media-links').remove();

	// Catalog List Fix
	jQuery('#gateway-toolbar-container > .help').remove();

	// Standardise Remaining Links
	if (jQuery('#gateway-toolbar-container > div').not('#gateway-toolbar-1').children().size() > 0) {
		jQuery('#gateway-toolbar-container > div').not('#gateway-toolbar-1').removeAttr('style').addClass('gateway-toolbar-misc').prependTo('#gateway-toolbar-1');
		jQuery('#gateway-toolbar-1 .gateway-toolbar-misc a').removeClass('header_4');
		jQuery('#gateway-toolbar-1 .gateway-toolbar-misc a img').parent().parent().addClass('gateway-toolbar-misc-icon');
	}

	// Change Link Text
	if (jQuery('#gateway-toolbar-1 .gateway-toolbar-degree-planner').length) {
		var degreePlannerLinkText = jQuery('#gateway-toolbar-1 .gateway-toolbar-degree-planner a').text();
		jQuery('#gateway-toolbar-1 .gateway-toolbar-degree-planner a').attr('title', degreePlannerLinkText).attr('aria-label', degreePlannerLinkText).html('<span class="accessibly-hidden-text">a</span>');
	}
	if (jQuery('#gateway-toolbar-1 .gateway-toolbar-portfolio').length) {
		var portfolioLinkText = jQuery('#gateway-toolbar-1 .gateway-toolbar-portfolio').text();
		var portfolioLinkTextSub = portfolioLinkText.substr(1);
		if (portfolioLinkText.indexOf('Currently in') >= 0 ) {
			jQuery('#gateway-toolbar-1 .gateway-toolbar-portfolio a').attr('title', portfolioLinkText).html('<span class="sr-only">Currently In Favorites (opens a new window)</span>');
			jQuery('#gateway-toolbar-1 .gateway-toolbar-portfolio').addClass('gateway-toolbar-portfolio-active');
		} else {
			jQuery('#gateway-toolbar-1 .gateway-toolbar-portfolio a').html('<span class="sr-only">Add to My Favorites (opens a new window)</span>');
		}
	}
	if (jQuery('#gateway-toolbar-1 .gateway-toolbar-share').length) {
		jQuery('#gateway-toolbar-1 .gateway-toolbar-share').wrapInner('<div class="gateway-toolbar-share-contents-wrapper"><div class="gateway-toolbar-share-contents"></div></div>');
		jQuery('#gateway-toolbar-1 .gateway-toolbar-share').prepend('<button class="acalog-share acalog-icon" aria-expanded="false" aria-controls="share-icons"><span class="sr-only">Share this Page</span>');

		jQuery('#gateway-toolbar-1 .gateway-toolbar-share-contents').addClass('acalog-social-media-links');
	}
	if (jQuery('#gateway-toolbar-1 .gateway-toolbar-print').length) {
		var printLinkText = jQuery('#gateway-toolbar-1 .gateway-toolbar-print').text();
		var printLinkTextSub1 = printLinkText.substr(0,1);
		var printLinkTextSub2 = printLinkText.substr(1);
		jQuery('#gateway-toolbar-1 .gateway-toolbar-print a').attr('title', printLinkText).html('<span class="sr-only">Print (opens a new window)</span>');
	}
	if (jQuery('#gateway-toolbar-1 .gateway-toolbar-help').length) {
		jQuery('#gateway-toolbar-1 .gateway-toolbar-help a').attr('title', 'Help (opens a new window)').html('<span class="sr-only">Help (opens a new window)</span>');
	}

	// Clean Up Toolbar
	jQuery('#gateway-toolbar-1 .gateway-toolbar-item > a').removeAttr('style').addClass('acalog-icon');
	// Remove the accesskey attribute from the cloned gateway toolbar so that we don't have the same accesskey on the page twice for 508c compliance
	jQuery('#gateway-toolbar-1').clone().attr('id', 'gateway-toolbar-2').appendTo('#gateway-toolbar-container').find('.gateway-toolbar-help a').removeAttr('accesskey');
	jQuery('#gateway-toolbar-1').prependTo('#gateway-toolbar-container');
	jQuery('#gateway-toolbar-2').appendTo('.block_content');

	if (jQuery('#gateway-toolbar-1 .gateway-toolbar-share').length) {
		socialMediaActivate();
	}

	// Share Icon Hover
	jQuery('.gateway-toolbar-share').hover(
		function() {
			jQuery(this).addClass('gateway-toolbar-item-active');
		},
		function() {
			jQuery(this).removeClass('gateway-toolbar-item-active');
		}
	);
	jQuery('.gateway-toolbar-share .acalog-icon').click(function(event) {
		event.preventDefault();
	});

	// $('.gateway-toolbar a').each(function() {
	//     var ariaText = $(this).attr('title');
	//     $(this).attr('aria-label',ariaText);
	// });

}

/**************************************************/
/**********                              **********/
/*****               toolbar                  *****/
/**********                              **********/
/**************************************************/
function inlineToolbar() {
	jQuery('.inline-gateway-toolbar').each(function() {
		// Prepare For Icons
		jQuery(this).before('<div class="gateway-toolbar clearfix" />');
		var oldToolbar = jQuery(this);
		var newToolbar = jQuery(this).prev();

		// Standardise Specific Links
		if (oldToolbar.find('a.portfolio_link').length) {
			var toolbarPortfolioLink = jQuery('<div>').append(oldToolbar.find('a.portfolio_link').clone()).remove().html();
			newToolbar.append('<div class="gateway-toolbar-portfolio gateway-toolbar-item">'+toolbarPortfolioLink+'</div>');
		}
		if (oldToolbar.children('.print_link').length) {
			var toolbarPrintLink = jQuery('<div>').append(oldToolbar.children('.print_link').clone()).remove().html();
			newToolbar.append('<div class="gateway-toolbar-print gateway-toolbar-item">'+toolbarPrintLink+'</div>');
		}

		// Change Link Text
		if (newToolbar.children('.gateway-toolbar-portfolio').length) {
			var portfolioLinkText = newToolbar.children('.gateway-toolbar-portfolio').text();
			var portfolioLinkTextSub = portfolioLinkText.substr(1);
			if (portfolioLinkText.indexOf('Currently in') >= 0 ) {
				newToolbar.children('.gateway-toolbar-portfolio').children().attr('title', portfolioLinkText).html('<span class="sr-only">Currently In Favorites (opens a new window)</span>');
				newToolbar.children('.gateway-toolbar-portfolio').addClass('gateway-toolbar-portfolio-active');
			} else {
				newToolbar.children('.gateway-toolbar-portfolio').children().attr('title', portfolioLinkText).html('<span class="sr-only">Add to My Favorites (opens a new window)</span>');
			}
		}
		if (newToolbar.children('.gateway-toolbar-print').length) {
			var printLinkText = newToolbar.children('.gateway-toolbar-print').text();
			var printLinkTextSub1 = printLinkText.substr(0,1);
			var printLinkTextSub2 = printLinkText.substr(1);
			newToolbar.children('.gateway-toolbar-print').children().attr('title', printLinkText).html('<span class="sr-only">Print (opens a new window)</span>');
		}

		// Clean Up Toolbar
		newToolbar.children('.gateway-toolbar-item').children().removeAttr('style').addClass('acalog-icon');
		oldToolbar.remove();

	});
}

/**************************************************/
/**********                              **********/
/*****              toolbarText               *****/
/**********                              **********/
/**************************************************/
function toolbarText() {
	jQuery('.gateway-toolbar').removeClass('gateway-toolbar').addClass('gateway-toolbar-text');
	jQuery('.gateway-toolbar-item').removeClass('gateway-toolbar-item').addClass('gateway-toolbar-item-text');
	jQuery('#gateway-toolbar-1').appendTo('#gateway-toolbar-container');
}

/**************************************************/
/**********                              **********/
/*****              miniToolbar               *****/
/**********                              **********/
/**************************************************/
function miniToolbar() {
	// Prepare For Icons
	jQuery('.gateway-course-opening').find('.ajaxcourseindentfix:first').attr('id','temp-toolbar');
	jQuery('#temp-toolbar').parent().prepend('<div class="gateway-toolbar gateway-mini-toolbar gateway-mini-toolbar-current clearfix" />');

	// Standardise Specific Links
	if (jQuery('#temp-toolbar a.portfolio_link').length) {
		var miniToolbarPortfolioLink = jQuery('<div>').append(jQuery('#temp-toolbar a.portfolio_link').clone()).remove().html();
		jQuery('.gateway-mini-toolbar-current').append('<div class="gateway-toolbar-portfolio gateway-toolbar-item">'+miniToolbarPortfolioLink+'</div>');
	}
	if (jQuery('#temp-toolbar .acalog-social-media-links').children().size() > 0) {
		var miniToolbarShareLink = jQuery('<div>').append(jQuery('#temp-toolbar .acalog-social-media-links').contents().clone()).remove().html();
		jQuery('.gateway-mini-toolbar-current').append('<div class="gateway-toolbar-share gateway-toolbar-item">'+miniToolbarShareLink+'</div>');
	}
	if (jQuery('#temp-toolbar .print_link').length) {
		var miniToolbarPrintLink = jQuery('<div>').append(jQuery('#temp-toolbar .print_link a').clone()).remove().html();
		jQuery('.gateway-mini-toolbar-current').append('<div class="gateway-toolbar-print gateway-toolbar-item">'+miniToolbarPrintLink+'</div>');
	}

	// Remove Old Links
	jQuery('#temp-toolbar a.portfolio_link').parent('span').remove();
	jQuery('#temp-toolbar .print_link a').parent('span').remove();
	jQuery('#temp-toolbar .acalog-social-media-links').remove();

	// Standardise Remaining Links
	if (jQuery('#temp-toolbar > a').size() > 0) {
		jQuery('#temp-toolbar > a').removeAttr('style').removeClass('header_4').wrap('<div class="gateway-toolbar-misc" />');
		jQuery('#temp-toolbar .gateway-toolbar-misc').prependTo('.gateway-mini-toolbar-current');
		jQuery('.gateway-mini-toolbar-current .gateway-toolbar-misc a img').parent().parent().addClass('gateway-toolbar-misc-icon');
	}

	// Change Link Text
	if (jQuery('.gateway-mini-toolbar-current .gateway-toolbar-portfolio').length) {
		var miniPortfolioLinkText = jQuery('.gateway-mini-toolbar-current .gateway-toolbar-portfolio').text();
		var miniPortfolioLinkTextSub = miniPortfolioLinkText.substr(1);
		if (miniPortfolioLinkText.indexOf('Currently in') >= 0 ) {
			jQuery('.gateway-mini-toolbar-current .gateway-toolbar-portfolio a').attr('title', miniPortfolioLinkText).attr('aria-label', miniPortfolioLinkText).html('<span class="sr-only">Currently In Favorites (opens a new window)</span>');
			jQuery('.gateway-mini-toolbar-current .gateway-toolbar-portfolio').addClass('gateway-toolbar-portfolio-active');
		} else {
			jQuery('.gateway-mini-toolbar-current .gateway-toolbar-portfolio a').attr('title', miniPortfolioLinkText).attr('aria-label', miniPortfolioLinkText).html('<span class="sr-only">Add to My Favorites (opens a new window)</span>');
		}
	}
	if (jQuery('.gateway-mini-toolbar-current .gateway-toolbar-share').length) {
		jQuery('.gateway-mini-toolbar-current .gateway-toolbar-share').wrapInner('<div class="gateway-toolbar-share-contents-wrapper"><div class="gateway-toolbar-share-contents"></div></div>');
		jQuery('.gateway-mini-toolbar-current .gateway-toolbar-share').prepend('<button class="acalog-share acalog-icon" aria-expanded="false" aria-controls="share-icons"><span class="sr-only">Share this Page</span>');
		jQuery('.gateway-mini-toolbar-current .gateway-toolbar-item > a').removeAttr('style').addClass('acalog-icon');
		if (!jQuery('.gateway-mini-toolbar-current .gateway-toolbar-share-contents').hasClass('acalog-social-media-links')) {
			jQuery('.gateway-mini-toolbar-current .gateway-toolbar-share-contents').addClass('acalog-social-media-links');
		}
		socialMediaActivate();
	}
	if (jQuery('.gateway-mini-toolbar-current .gateway-toolbar-print').length) {
		var miniPrintLinkText = jQuery('.gateway-mini-toolbar-current .gateway-toolbar-print').text();
		var miniPrintLinkTextSub1 = miniPrintLinkText.substr(0,1);
		var miniPrintLinkTextSub2 = miniPrintLinkText.substr(1);
		jQuery('.gateway-mini-toolbar-current .gateway-toolbar-print a').attr('title', miniPrintLinkText).html('<span class="sr-only">Print (opens a new window)</span>');
	}

	// Clean Up Toolbar
	jQuery('.gateway-mini-toolbar-current .gateway-toolbar-item > a').addClass('acalog-icon');
	jQuery('.gateway-mini-toolbar-current').removeClass('gateway-mini-toolbar-current');
	jQuery('#temp-toolbar').remove();

	// Share Icon Hover
	jQuery('.gateway-toolbar-share').hover(
		function() {
			jQuery(this).addClass('gateway-toolbar-item-active');
		},
		function() {
			jQuery(this).removeClass('gateway-toolbar-item-active');
		}
	);
	jQuery('.gateway-toolbar-share .acalog-icon').click(function(event) {
		event.preventDefault();
	});
}

/**************************************************/
/**********                              **********/
/*****            miniToolbarText             *****/
/**********                              **********/
/**************************************************/
function miniToolbarText() {
	jQuery('.gateway-course-opening .gateway-toolbar').removeClass('gateway-toolbar').addClass('gateway-toolbar-text');
	jQuery('.gateway-course-opening .gateway-toolbar-item').removeClass('gateway-toolbar-item').addClass('gateway-toolbar-item-text');
}

/**************************************************/
/**********                              **********/
/*****              searchBar                 *****/
/**********                              **********/
/**************************************************/
function searchBar() {
	jQuery('#keyword-submit').hide();
	jQuery('#keyword').parent().addClass('clearfix').append('<a href="javascript:void(0);" id="keyword-submit-icon" title="Search"><span class="acalog-icons-visible" aria-hidden="true">S</span><span class="acalog-icons-hidden" aria-hidden="true" aria-label="Search Catalog" title="Share catalog">earch</span></a>');

	var seachBarWidth = jQuery('.block_n2_search').width();
	var searchBarSpanPadding = (parseInt(jQuery('#keyword').parent('span').css('padding-left')) + parseInt(jQuery('#keyword').parent('span').css('padding-right')) );
	var seachBarWidthIE = seachBarWidth - searchBarSpanPadding - (jQuery('#keyword').outerWidth() - jQuery('#keyword').width());

	jQuery('#keyword').width(seachBarWidth);
	if (jQuery('.msie7').length || jQuery('.msie6').length) {
		jQuery('#keyword').width(seachBarWidthIE);
	}

	var catalogTermRaw = jQuery('#acalog-navigation > .n2_links:first > a').text();
	var catalogTermReverse = catalogTermRaw.split('').reverse().join('');
	var catalogTermOnlyReverse = catalogTermReverse.substring(5);
	var catalogTermOnly = catalogTermOnlyReverse.split('').reverse().join('');

	jQuery('#keyword').val('Search ' + catalogTermOnly);

	jQuery('.block_n2_search').on('mouseup', '#keyword-submit-icon', function(event) {
		event.preventDefault();
		if (!(jQuery('#keyword').val() === 'Search ' + catalogTermOnly)) {
			jQuery('#keyword-submit').trigger('click');
		}
		else {
			alert('You have not entered a search term.');
		}
	});

	jQuery('#keyword').focus(function () {
		if (jQuery('#keyword').val() === 'Search ' + catalogTermOnly) {
			jQuery(this).val('');
			jQuery('#keyword').attr('aria-label', 'Search Keyword Field, required');
		}
	});

	jQuery('#keyword').blur(function () {
		if (jQuery('#keyword').val() === '') {
			jQuery(this).val('Search ' + catalogTermOnly);
			jQuery('#keyword').attr('aria-label', 'Search Keyword Field, required');
		}
	});
}

/**************************************************/
/**********                              **********/
/*****               backToTop                *****/
/**********                              **********/
/**************************************************/
function backToTop() {

	jQuery('table.block_n2_and_content').append('<tr><td><div id="gateway-back-to-top-icon-container"><a id="gateway-back-to-top-icon" href="javascript:void(0);" title="Back To Top" aria-label="Back To Top"><span class="accessibly-hidden-text">T</span></a></div></td></tr>');

	jQuery('#gateway-back-to-top-icon').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop:0}, 'slow');
		jQuery('#skip').attr('tabindex', 0).focus();

	});

	jQuery(window).scroll(function(event) {
		if (jQuery('.msie7').length || jQuery('.msie8').length) {
			var backToTopLocation = jQuery('#gateway-back-to-top-icon-container').offset().top;
			var bottomToolbarLocation = jQuery('#gateway-toolbar-2').offset().top + jQuery('html').scrollTop();
			var windowLocation = jQuery('html').scrollTop() + jQuery('html').height() - parseInt(jQuery('#gateway-back-to-top-icon-container').css('marginBottom')) - jQuery('#gateway-back-to-top-icon-container').outerHeight();
			var pageWidth = jQuery('table.block_n2_and_content').outerWidth() + 20;
			if (jQuery('html').scrollTop() > 75) {
				jQuery('#gateway-back-to-top-icon-container').fadeIn(1000);
			}
			if (jQuery('html').scrollTop() < 75) {
				jQuery('#gateway-back-to-top-icon-container').fadeOut(1000);
			}
			if (bottomToolbarLocation < windowLocation) {
				jQuery('#gateway-back-to-top-icon-container').css({'position':'absolute', 'top':bottomToolbarLocation - parseInt(jQuery('#gateway-back-to-top-icon-container').css('marginTop')), 'marginLeft':pageWidth });
			}
			if (bottomToolbarLocation >= windowLocation) {
				jQuery('#gateway-back-to-top-icon-container').css({'position':'fixed', 'top':'auto'});
			}
		} else {
			var backToTopLocation = jQuery('#gateway-back-to-top-icon-container').offset().top;
			var bottomToolbarLocation = jQuery('#gateway-toolbar-2').offset().top;
			var windowLocation = jQuery(window).scrollTop() + jQuery(window).height() - parseInt(jQuery('#gateway-back-to-top-icon-container').css('marginBottom')) - jQuery('#gateway-back-to-top-icon-container').outerHeight();
			var pageWidth = jQuery('table.block_n2_and_content').outerWidth() + 20;
			if (jQuery(window).scrollTop() > 75) {
				jQuery('#gateway-back-to-top-icon-container').fadeIn(1000);
			}
			if (jQuery(window).scrollTop() < 75) {
				jQuery('#gateway-back-to-top-icon-container').fadeOut(1000);
			}
			if (bottomToolbarLocation < windowLocation) {
				jQuery('#gateway-back-to-top-icon-container').css({'position':'absolute', 'top':bottomToolbarLocation - parseInt(jQuery('#gateway-back-to-top-icon-container').css('marginTop')), 'marginLeft':pageWidth });
			}
			if (bottomToolbarLocation >= windowLocation) {
				jQuery('#gateway-back-to-top-icon-container').css({'position':'fixed', 'top':'auto'});
			}
		}
	});
}

/**************************************************/
/**********                              **********/
/*****            backToTopText               *****/
/**********                              **********/
/**************************************************/
function backToTopText() {

	jQuery('body').append('<div id="gateway-back-to-top-container"><a id="gateway-back-to-top" href="javascript:void(0);" title="Back To Top">Back To Top</a></div>');
	jQuery('#gateway-back-to-top').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop:0}, 'slow');
		var focusable = document.querySelectorAll('a, [tabindex]:not([tabindex="-1"])');
		var firstFocusable = focusable[0];
		firstFocusable.focus();
	});
}

/**************************************************/
/**********                              **********/
/*****              AjaxCallback              *****/
/**********                              **********/
/**************************************************/
function tooltipAjaxCallbackClass(tooltipClass) {
	jQuery('.'+tooltipClass).addClass('gateway-course-opening');
	if (jQuery('.'+tooltipClass).css('filter') != 'none') {
		jQuery('.'+tooltipClass).css('filter','');
	}
}

function showHideAjaxCallbackClass(showHideObj) {
	jQuery(showHideObj).addClass('gateway-course-opening');
}

function courseAjaxCallback() {
	miniToolbar();

	if (gatewayFeatureToolbarText === true) {
		miniToolbarText();
	}

	if (jQuery('.gateway-course-opening table.td_dark').length) {
		jQuery('.gateway-course-opening').parent('li.acalog-course').addClass('acalog-course-open');
		firstTextNode = jQuery('.gateway-course-opening').contents().filter(function () { return this.nodeType == 3; });
		if (jQuery(firstTextNode[0]).text().indexOf('•') != -1) {
			jQuery(firstTextNode[0]).remove();
		}
	} else {
		jQuery('.gateway-course-opening').parent('li.acalog-course-open').removeClass('acalog-course-open');
	}

	jQuery('.gateway-course-opening').removeClass('gateway-course-opening');
}

/**************************************************/
/**********                              **********/
/*****           locationDetection            *****/
/**********                              **********/
/**************************************************/
function locationDetection() {
	var stylesPreview = Boolean(jQuery('#error.hide_data').length);
	var degreePlanner = Boolean(jQuery('link[href="degree_styles.css"]').length);
	var gateway = Boolean(jQuery('link[href="css/public_custom.php"]').length);
	var publisherPreview = Boolean(jQuery('link[href ^="/preview/css/"][href $="public_custom.php"]').length);
	var print = Boolean(jQuery('link[href*="print-friendly.css"]').length);
	var toplevel = Boolean(jQuery('.toplevel').length);
	var popup = Boolean(jQuery('.toplevel_popup').length);

	if (stylesPreview) {
		viewLocation = 'Gateway Styles Preview';
		gatewayType = 'gateway-page';
	} else if (degreePlanner) {
		viewLocation = 'Gateway - Degree Planner';
		gatewayType = 'gateway-print';
	} else if (gateway && !print && toplevel) {
		viewLocation = 'Gateway - Normal';
		gatewayType = 'gateway-page';
	} else if (gateway && !print && popup) {
		viewLocation = 'Gateway - Popup';
		gatewayType = 'gateway-popup';
	} else if (gateway && print) {
		viewLocation = 'Gateway - Print';
		gatewayType = 'gateway-print';
	} else if (publisherPreview && !print && toplevel) {
		viewLocation = 'Publisher Preview - Normal';
		gatewayType = 'gateway-page';
		jQuery('html').addClass('publisher-preview');
	} else if (publisherPreview && !print && popup) {
		viewLocation = 'Publisher Preview - Popup';
		gatewayType = 'gateway-popup';
		jQuery('html').addClass('publisher-preview');
	} else if (publisherPreview && print) {
		viewLocation = 'Publisher Preview - Print';
		gatewayType = 'gateway-print';
		jQuery('html').addClass('publisher-preview');
	} else {
		viewLocation = 'Gateway Styles Preview';
		gatewayType = 'gateway-page';
	}

	jQuery('html').attr('id', gatewayType);
	if (jQuery('html.msie').length) {
		jQuery('link[href="ie.css"]').remove();
	}
}

/****************************************************************************************************/
/*************************                                                  *************************/
/**********                                                                                **********/
/*****                                         On Load                                          *****/
/**********                                                                                **********/
/*************************                                                  *************************/
/****************************************************************************************************/

jQuery.noConflict();
jQuery(document).ready( function() {
	locationDetection();

	if (viewLocation === 'Gateway Styles Preview') {
		gatewayFix();
		toolbar();
		inlineToolbar();
		if (gatewayFeatureSearchBar === true) {searchBar();}
		if (gatewayFeatureToolbarText === true) {toolbarText();}
		if (gatewayFeatureBackToTopText === true) {backToTopText();}
		if (gatewayFeatureBackToTopText === false) {backToTop();}
	} else if (viewLocation === 'Gateway - Degree Planner') {

	} else if (viewLocation === 'Gateway - Normal') {
		gatewayFix();
		toolbar();
		inlineToolbar();
		if (gatewayFeatureSearchBar === true) {searchBar();}
		if (gatewayFeatureToolbarText === true) {toolbarText();}
		if (gatewayFeatureBackToTopText === true) {backToTopText();}
		if (gatewayFeatureBackToTopText === false) {backToTop();}
	} else if (viewLocation === 'Gateway - Popup') {

	} else if (viewLocation === 'Gateway - Print') {

	} else if (viewLocation === 'Publisher Preview - Normal') {
		gatewayFix();
		toolbar();
		inlineToolbar();
		if (gatewayFeatureSearchBar === true) {searchBar();}
		if (gatewayFeatureToolbarText === true) {toolbarText();}
		if (gatewayFeatureBackToTopText === true) {backToTopText();}
		if (gatewayFeatureBackToTopText === false) {backToTop();}
	} else if (viewLocation === 'Publisher Preview - Popup') {

	} else if (viewLocation === 'Publisher Preview - Print') {

	} else {
		gatewayFix();
		toolbar();
		inlineToolbar();
		if (gatewayFeatureSearchBar === true) {searchBar();}
		if (gatewayFeatureToolbarText === true) {toolbarText();}
		if (gatewayFeatureBackToTopText === true) {backToTopText();}
		if (gatewayFeatureBackToTopText === false) {backToTop();}
	}

	// Acalog Share button Key Press Code
	jQuery('button.acalog-share').click(function() {
		var expanded = jQuery(this).attr('aria-expanded');
		if (expanded == 'false') {
			expanded = 'true';
		} 
		else {
			expanded = 'false';
		}
		jQuery(this).attr('aria-expanded', expanded);
		jQuery('.gateway-toolbar-share-contents-wrapper').toggleClass('expanded');
		jQuery('.gateway-toolbar-share').toggleClass('gateway-toolbar-item-active');
	});
});
