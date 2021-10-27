/* Javascript functions for all of public acalog site. */

function hide_print_link() {
	$parent = $( '.print_anchor' ).parent();
	$self = $( '.print_anchor' );

	$self.detach();

	setTimeout(function(){
		$( $parent ).html( $self[0] );
	}, 500);
}

/* GENERAL pup up window function */
function acalogPopup(URL, NAME, WIDTH, HEIGHT, SCROLL) {
	//	Get width and height for IE.
	if (screen.height) {
		LEFT = (screen.width - WIDTH) / 2;
		TOP = (screen.height - HEIGHT) / 2;
	} else {
		LEFT = (screen.availWidth - WIDTH) / 2;
		TOP = (screen.availHeight - HEIGHT) / 2;
	}
	popupWindow = window.open(URL,NAME,'height='+HEIGHT+',width='+WIDTH+',resizable=yes,scrollbars='+SCROLL+',menubar=no,toolbar=no,personalbar=no,statusbar=no,locationbar=no,screenX='+LEFT+',screenY='+TOP+',left='+LEFT+',top='+TOP);
	if(popupWindow != null) {
		popupWindow.focus();
	}
}

/* PRINT LINK capability testing and window pop function for popup print links. */
function print_link_popup(URL, NAME, WIDTH, HEIGHT, SCROLL) {
	if (!window.print) {
		URL ="help.php#print_link";
	}
	acalogPopup(URL,NAME,WIDTH,HEIGHT,SCROLL);
}

/* PRINT LINK capability testing and window pop function for non-popup print links. */
function print_link_nopop() {
	if (window.print) {
		window.print();
	} else {
		acalogPopup('help.php#print_link','help',600,470,'yes');
	}
}

//	Validate N2 search options.
function validateSearchOptions() {
	if ($('location').selectedIndex == 0) {
		alert('You must select a search location.');
		return false;
	}
	if (document.getElementById('keyword').value == 'Enter Keyword  ' || document.getElementById('keyword').value.replace(/(^ +| +$)/, '') == '') {
		alert('You have not entered a search term.');
		return false;
	}

	return true;
}

/* Close popup and change location of popup opener. */
function redirect_opener(LOCATION) {
	window.close();
	window.opener.location = LOCATION;
}

/* Fix links within description data. */
function fix_link(URL) {
	document.location.href=URL;
}

function fix_link_popup(URL) {
	acalogPopup(URL, 'temp', 770, 530, 'yes');
}

/*	The following functions are used to show/hide information in complex filter links.	*/

//	Display the formatted Display/Hide link.
//	@param	id_name		- The ID name of the DIV to display/hide must always start with "data".
//	@param	link_copy	- The information to be displayed/hidden such as "Programs" or "Courses".
//	@return	nothing
function showlink(id_name, link_copy) {
	if (document.getElementById) {
		document.write("<a href=\"javascript:hideshow('"+id_name+"')\"><span id=\"link"+id_name.substring(4)+"\">Display</span> "+link_copy+"</a>");
	}
}

//	Displays or hides the selected DIV and changes the Display/Hide link to say "Display" or "Hide" as appropriate.
//	@param	div_id	- The DIV id to display/hide.
//	@return	nothing
function hideshow(div_id) {
	if (document.getElementById) {
		dataobj = document.getElementById(div_id);
		linkobj = document.getElementById("link"+div_id.substring(4));
		if (dataobj.style.display=="none") {
			dataobj.style.display="";
			linkobj.innerHTML = "Hide";
		} else {
			dataobj.style.display="none";
			linkobj.innerHTML = "Display";
		}
	}
}

/**
* Implements ajax call to fetch course preview or tooltip data
* @param url 		A string containing the URL to which the request is sent.
* @param params 	Data to be sent to server
* @param success	Function to be called if request succeeds
* @param failure	Function to be called if request fails
* @param useSpinner Show spinner
*/
function getCatalogData(url, params, activator, success, failure, useSpinner) {
	spinner = $('<img>').attr('src', '/loading.gif').css({width: '16px',height: '16px'});
	var node = activator.parentNode;
	showHideAjaxCallbackClass(node);
	preview = $.ajax({
		url: url,
		data: params,
		beforeSend: function() {
			if(useSpinner){
				$(node).append(spinner.clone()).html();
			}
		}
	});
	preview.done(function(data) {
		if(success === 'showData') {
			showData(data, node);
		}
	});
	preview.fail(function() {
		if( failure != null ) {
			window.ajax.fail = failure;
		}
	});
}

/*	in_portfolio is actually the current catalog oid and, if present, denotes that the course is being displayed in the portfolio
	is_archive denotes if the catalog is an archived catalog when showing courses in the portfolio.
	if show_program_display_field is 1, then display the program display text after a course (usually credits) */
function hideCourse(catalog, course, activator, display_options) {
	url = '/ajax/preview_course.php';
	params = {catoid: catalog, coid: course, display_options: display_options, hide: ''};
	success = 'showData';

	getCatalogData(url, params, activator, success, null, true);
}

/*	in_portfolio is actually the current catalog oid and, if present, denotes that the course is being displayed in the portfolio
	is_archive denotes if the catalog is an archived catalog when showing courses in the portfolio.
	if show_program_display_field is 1, then display the program display text after a course (usually credits) */
function showCourse(catalog, course, activator, display_options) {
	var node = '';
	var comp = function() {
		Tooltip.setup();
		socialMediaActivate();
		courseAjaxCallback();
		var temp = $('#search_keyword_field').val();

		if (temp) {
			highlight.process(temp, node);
		} else {
			var ref = window.location + "";
			if (ref.indexOf('?') == -1) return;
			var qs = ref.substr(ref.indexOf('?')+1);
			var qsa = qs.split('&');
			for (var i=0;i<qsa.length;i++) {
				var qsip = qsa[i].split('=');
				if (qsip.length == 1) continue;
				if (qsip[0] == 'hl') {
					var wordstring = unescape(qsip[1].replace(/\+/g,' '));
					highlight.process(wordstring, node);
				}
			}
		}
	};
	try {
		node = activator.parentNode;
		showHideAjaxCallbackClass(node);
		preview = $.ajax({
			url: '/ajax/preview_course.php',
			data: "catoid=" +catalog+ "&coid=" +course+ "&display_options=" +display_options+ "&show",
			beforeSend: function() {
				spinner = $('<img>').attr('src', '/loading.gif').css({width: '16px',height: '16px'});
				$(node).append(spinner.clone()).html();
			}
		});

		preview.done(function(data){
			showData(data, node);
		},comp);
	} catch(e) {
		acalogPopup('preview_course.php?catoid=' +catalog+ '&coid=' +course,'preview_course',600,325,'yes');
	}
}

/*	Use AJAX to show the courses that exist underneath an entity in filters 10 and 15.
	Created for ticket #2174.	*/
function showHideFilterData(activator, show_hide, cat_oid, nav_oid, ent_oid, type, link_text) {
	url = '/ajax/preview_filter_show_hide_data.php';
	params = "&show_hide=" + show_hide + "&cat_oid=" + cat_oid + "&nav_oid=" + nav_oid + "&ent_oid=" + ent_oid + "&type=" + type + "&link_text=" + link_text;
	success = 'showData';
	getCatalogData( url, params, activator, success, null, true );
}

//	This function is used to hide catalog data shown via a placeholder.
function hideCatalogData(catalog, data_type, data_id, link_text, activator, display_options) {
	switch (data_type) {
		case '20': // Hierarchy Items
			params = "catoid=" + catalog + "&ent_oid=" + data_id + "&link_text=" + link_text + "&display_options=" + display_options + "&hide";
			ajax_page = '/ajax/preview_entity.php';
			break;
		case '1': // Programs
			params = "catoid=" + catalog + "&poid=" + data_id + "&link_text=" + link_text + "&display_options=" + display_options + "&hide";
			ajax_page = '/ajax/preview_program.php';
			break;
		case '3': // Courses
			params = "catoid=" + catalog + "&coid=" + data_id + "&link_text=" + link_text + "&display_options=" + display_options + "&hide";
			ajax_page = '/ajax/preview_course.php';
			break;
		case '14':	//	Filters
			params = "catoid=" + catalog + "&nav_oid=" + data_id + "&link_text=" + link_text  + "&display_options=" + display_options + "&hide";
			ajax_page = '/ajax/preview_filter.php';
			ajax_catch = "acalogPopup('preview_content.php?catoid=" + catalog + "&nav_oid=" + data_id + "','preview_content',770,530,'yes');";
			break;
		case '107': // Images
			params = "catoid=" + catalog + "&id=" + data_id + "&link_text=" + link_text + "&display_options=" + display_options + "&hide";
			ajax_page = '/ajax/preview_image.php';
			break;
		case '16':
			params = "catoid=" + catalog + "&id=" + data_id + "&link_text=" + link_text  + "&display_options=" + display_options + "&hide";
			ajax_page = '/ajax/preview_page.php';
			break;
	}

	success = 'showData';
	getCatalogData( ajax_page, params, activator, success, null, true );
}

//	This function is used to show catalog data shown via a placeholder.
function showCatalogData(catalog, data_type, data_id, link_text, activator, display_options) {
	switch (data_type) {
		case '20':
			params = "catoid=" + catalog + "&ent_oid=" + data_id + "&link_text=" + link_text  + "&display_options=" + display_options + "&show";
			ajax_page = '/ajax/preview_entity.php';
			ajax_catch = "acalogPopup('preview_entity.php?catoid=" + catalog + "&ent_oid=" + data_id + "','preview_entity',770,530,'yes');";
			break;
		case '1':
			params = "catoid=" + catalog + "&poid=" + data_id + "&link_text=" + link_text  + "&display_options=" + display_options + "&show";
			ajax_page = '/ajax/preview_program.php';
			ajax_catch = "acalogPopup('preview_program.php?catoid=" + catalog + "&poid=" + data_id + "','preview_program',770,530,'yes');";
			break;
		case '3':
			params = "catoid=" + catalog + "&coid=" + data_id + "&link_text=" + link_text  + "&display_options=" + display_options + "&show";
			ajax_page = '/ajax/preview_course.php';
			ajax_catch = "acalogPopup('preview_course.php?catoid=" + catalog + "&coid=" + data_id + "','preview_course',770,530,'yes');";
			break;
		case '14':
			params = "catoid=" + catalog + "&nav_oid=" + data_id + "&link_text=" + link_text  + "&display_options=" + display_options + "&show";
			ajax_page = '/ajax/preview_filter.php';
			ajax_catch = "acalogPopup('preview_content.php?catoid=" + catalog + "&nav_oid=" + data_id + "','preview_content',770,530,'yes');";
			break;
		case '107':
			params = "catoid=" + catalog + "&id=" + data_id + "&link_text=" + link_text  + "&display_options=" + display_options + "&show";
			ajax_page = '/ajax/preview_image.php';
			ajax_catch = "acalogPopup('preview_image.php?catoid=" + catalog + "&id=" + data_id + "','preview_image',770,530,'yes');";
			break;
		case '16':
			params = "catoid=" + catalog + "&id=" + data_id + "&link_text=" + link_text  + "&display_options=" + display_options + "&show";
			ajax_page = '/ajax/preview_page.php';
			ajax_catch = "acalogPopup('content.php?catoid=" + catalog + "&navoid=" + data_id + "','preview_page',770,530,'yes');";
			break;
	}

	success = 'showData';
	getCatalogData( ajax_page, params, activator, success, null, true );

}

/*
* Consistent display of course data received from ajax call
* Implements highlighting of search terms with course preview dropdowns on search page
* @param request 	Ajax data from the server
*/
function showData(request, element) {
	Tooltip.setup();
	socialMediaActivate();

	try {
		if (typeof(request) != 'undefined') {
			element.innerHTML = request;
			var parent = element.parentNode;
		}
	} catch(e) {}

	Tooltip.setup();
	socialMediaActivate();
	courseAjaxCallback();

	try {
		var temp = $('#search_keyword_field').val();
		if (temp != null) {
			highlight.process( temp, parent );
		} else {
			var ref = window.location + "";
			if (ref.indexOf('?') == -1) return;
			var qs = ref.substr(ref.indexOf('?')+1);
			var qsa = qs.split('&');
			for (var i=0;i<qsa.length;i++) {
				var qsip = qsa[i].split('=');
				if (qsip.length == 1) continue;
				if (qsip[0] == 'hl') {
					var wordstring = unescape(qsip[1].replace(/\+/g,' '));
					highlight.process(wordstring, parent);
				}
			}
		}
	} catch(e) {
		$.load('/ajax/log_js_error.php', {
			'File': e.fileName,
			'Function': 'expandbox()',
			'JSLine': e.lineNumber,
			'Message': e.message
		},function(){});
		console.log(e);
	}

	// Accessibility - Focus on the first anchor element
	$(element).find("a").first().focus();

	// Namespace to avoid duplicate event handlers
	$(element).on("keyup.escapeKey", handleContentEscape);
}

function select_ie_fix() {
	$('select').each(function(option) {
		var div = $('<div>').addClass('selectWrapper');

		div.css({
			width: option.offsetWidth + 'px',
			height: option.offsetHeight + 'px',
			zIndex: '9999',
			textAlign: 'left',
			display: 'inline',
			position: 'relative'
		});

		option.wrap(div);

		option.on('mousedown', expandbox);
		option.on('change', shrink);
		option.on('blur', shrink);
	});
}

function expandbox() {
	try {
		var select = event.target;
		selectorWidth = select.cloneNode(true);
		select.parentNode.appendChild(selectorWidth);

		selectorWidth.style.width = 'auto';
		var widthFull = selectorWidth.offsetWidth;
		select.parentNode.removeChild(selectorWidth);
		if ( widthFull >= select.originalWidth ) {
			select.style.width = 'auto';
		}
		select.style.position = 'absolute';
		select.style.zIndex = '9999';
	} catch(e) {
		// Log the error using new logging conventions. (sernst 2013-10-08 Refs #99)
		$.load('/ajax/log_js_error.php', {
			'File': e.fileName,
			'Function': 'expandbox()',
			'JSLine': e.lineNumber,
			'Message': e.message
		},function(){});
	}
}

function showPrintLinks() {
		var printLinks = $$('.print_link');
		for(var i=0; i < printLinks.length; i++){
			printLinks[i].style.display = 'inline';
		}
	}

// Prevent Callback to non existing function
function showHideAjaxCallbackClass(showHideObj) {}
function courseAjaxCallback() {}

if (typeof $$ === 'function') {
	if (typeof window.attachEvent != "undefined") {
		window.attachEvent("onload", select_ie_fix);
		window.attachEvent("onload", showPrintLinks);
	} else if (typeof window.addEventListener != "undefined") {
		window.addEventListener("load", showPrintLinks, false);
	}
}

/**	@function
 *	@private
 *	@name createShowHideAllLinks
 *	@description Creates the show/hide all links on the PDP
 */
function createShowHideAllLinks() {
	$('.print_link')
		.parent()
			.prepend('<a class="showHideAllLink" onclick="setAll(false);">Show All</a><span class="showHideAllDivider">|</span>');
}

/**	@function
 *	@name getPoid
 *	@description Returns the current poid from the url
 *	@returns string
 */
function getPoid() {
	poid = window.location['href'].match(/poid=\d+/)[0];
	poid = poid.match(/\d+/)[0];
	return poid;
}

/** @function
 *	@name getShortname
 *	@description Returns the current site's shortname
 *	@returns string
 */
function getShortname() {
	shortname = $('#acalogClientName').val();
	return shortname;
}

/** @function
 *	@name buildCoreCookieKey
 *	@description Builds a key for whether to show or hide a core's cookie
 *	@param {string} coreid - The coreid to build a cookie for
 *	@returns string
 */
function buildCoreCookieKey(coreid) {
	shortname = getShortname();
	ret = 'pdp_core_hide|' + shortname + '|' + coreid;
	return ret;
}

/** @function
 *	@name setAll
 *	@description Shows or hides all PDP descriptions
 *	@param {boolean} hide - If true, hide all descriptions,
		otherwise, show them all.
 */
function setAll(hide) {
	hideString = hide.toString();
	shortname = getShortname();
	poid = getPoid();
	$('.pdp-hideable')
		.each( function() {
			if (hide) {
				if ($(this).hasClass('pdp-program')) {
					thisCookie = Cookies.get('pdp_program_hide|' + shortname + '|' + poid);
					if (hideString != thisCookie) {
						setDescription();
					}
				} else {
					thisCookie = Cookies.get('pdp_core_hide|' + shortname + '|' + poid);
					if (hideString != thisCookie) {
						setCore($(this).attr('id'));
					}
				}
			} else {
				if ($(this).hasClass('pdp-program')) {
					thisCookie = Cookies.get('pdp_program_hide|' + shortname + '|' + poid);
					if (hideString != thisCookie) {
						setDescription()
					}
				} else {
					thisCookie = checkPDPCookie($(this).attr('id'), 'core');
					if (hideString != thisCookie) {
						displayCore($(this).attr('id'));
					}
				}
			}
		});

	changeShowHideAllStatus();
}

/** @function
 *	@name changeShowHideAllStatus
 *	@description Changes the show/hide all text and onclick action for the PDP
 */
function changeShowHideAllStatus() {
	anyHidden = false;
	if ($('.pdp-hideable:hidden:not(:empty)').length > 0) {
		$('.showHideAllLink')
			.attr('onclick', 'setAll(false);').text('Show All');
	} else {
		$('.showHideAllLink')
			.attr('onclick', 'setAll(true);').text('Hide All');
	}
}

/** @function
 *	@name displayCore
 *	@description An alias for setCore, but always makes the core visible.
 *	@param {string} coreid - The core's coreid
 */
function displayCore(coreid) {
	coreSelector = 'div#' + coreid;
	$(coreSelector)
		.hide()
		.prev()
			.find('.fa.fa-chevron-up')
				.addClass('fa-chevron-down')
				.removeClass('fa-chevron-up');
	setCore(coreid);
}

/** @function
 *	@name hideCore
 *	@description An alias for setCore, but always makes the core hidden
 *	@param {string} coreid - The core's coreid
 */
function hideCore(coreid) {
	$(coreSelector)
		.show()
		.prev()
			.find('.fa.fa-chevron-down')
				.addClass('fa-chevron-up')
				.removeClass('fa-chevron-down');
	setCore(coreid);
}

/** @function
 *	@name setCore
 *	@description Shows or hides a core and sets the relevant cookie
		appropriately
 *	@param {string} coreid - The coreid of the core to show or hid
 */
function setCore(coreid, initialSetShow) {
	if (initialSetShow === undefined){
		initialSetShow = false;
	}
	coreSelector = 'div#' + coreid;
	cookieKey = buildCoreCookieKey(coreid);
	if (initialSetShow) {
		$(coreSelector)
			.prev()
				.find('.fa.fa-chevron-down')
					.addClass('fa-chevron-up')
					.removeClass('fa-chevron-down');
		hideCookie = false;
	} else {
		if ($(coreSelector).is(':visible')) {
			$(coreSelector)
				.hide()
				.prev()
					.find('.fa.fa-chevron-up')
						.addClass('fa-chevron-down')
						.removeClass('fa-chevron-up');
			hideCookie = true;
		} else {
			$(coreSelector)
				.show()
				.prev()
					.find('.fa.fa-chevron-down')
						.addClass('fa-chevron-up')
						.removeClass('fa-chevron-down');
			hideCookie = false;
		}
	}
	Cookies.set(cookieKey, hideCookie, {expires: 365});
	changeShowHideAllStatus();
}
/** @function
 *	@name setDescription
 *	@description Shows or hides the PDP program description
 *	@param {boolean} hide - If true, hide the description, otherwise, show it
 */
function setDescription(initialSetShow) {
	if (initialSetShow === undefined){
		initialSetShow = false;
	}
	descriptionSelector = '#' + poid;
	cookieKey = 'pdp_program_hide|' + getShortname() + '|' + getPoid();
	if (initialSetShow) {
		$(descriptionSelector)
			.prev()
				.find('.fa.fa-chevron-down')
					.addClass('fa-chevron-up')
					.removeClass('fa-chevron-down');
		hideCookie = false;
	} else {
		if ($(descriptionSelector).is(':visible')) {
			$(descriptionSelector)
				.hide()
				.prev()
					.find('.fa.fa-chevron-up')
						.addClass('fa-chevron-down')
						.removeClass('fa-chevron-up');
			hideCookie = true;
		} else {
			$(descriptionSelector)
				.show()
				.prev()
					.find('.fa.fa-chevron-down')
						.addClass('fa-chevron-up')
						.removeClass('fa-chevron-down');
			hideCookie = false;
		}
	}

	Cookies.set(cookieKey, hideCookie, {expires: 365});
	changeShowHideAllStatus();
}

/**	@function
 *	@name checkPDPCookie
 *	@access private
 *	@description Checks to see if a PDP description show/hide cookie
		exists and returns the state.
 *	@param {Number} id - The id of the core to check for
 *	@param {string} [type='core'] - Whether to search for a core or
		program description cookie
 *	@return {Boolean|null} The true if the description should be hidden,
		false if it should be shown, and null if catalog's default should
		be relied upon.
 */
function checkPDPCookie(id, type) {
	if (type === undefined){
		type = 'core';
	}
	poid = getPoid();
	shortname = getShortname();
	cookies = Cookies.getJSON();
	if (type == 'program') {
		key = 'pdp_program_hide|' + shortname + '|' + poid;
	} else {
		key = 'pdp_core_hide|' + shortname + '|' + id;
	}
	if (key in cookies) {
		if (cookies[key] == true) {
			return true;
		} else if(cookies[key] == false) {
			return false;
		} else {
			return null;
		}
	}
	return null;
}

/*	@function
 *	@name initialDisplay
 *	@description Shows or hides PDP core descriptions when the page loads
 */
function initialDisplay() {
	poid = getPoid();
	cookies = Cookies.getJSON();

	// Create the show/hide all links
	createShowHideAllLinks();

	/* Make empty cores and program descriptions into simple text and remove
		their chevrons */
	disableEmptyTitles();

	$('.pdp-hideable')
		.each(function () {
			if ($(this).hasClass('pdp-program')) {
				pdpCookie = checkPDPCookie($(this).attr('id'), 'program');
			} else {
				pdpCookie = checkPDPCookie($(this).attr('id'), 'core');
			}
			if (pdpCookie != true && pdpCookie != false) {
				pdpCookie = $('#default-hide-descriptions').attr('value');
				if (pdpCookie == 'true') {
					pdpCookie = true;
				} else {
					pdpCookie = false;
				}
			}
			if ($(this).hasClass('pdp-program')) {
				if (pdpCookie) {
					setDescription(false);
				} else {
					setDescription(true);
				}
			} else if ($(this).is('.pdp-core , .pdp-subcore') && $(this).hasClass('pdp-hideable')) {
				if (pdpCookie) {
					setCore($(this).attr('id'), false);
				} else {
					setCore($(this).attr('id'), true);
				}
			}
		});
}

/** @function
 *	@name disableEmptyTitles
 *	@description Removes the onclick attribute (and the associated styling)
		and the chevrons from titles of programs and cores that are empty
 */
function disableEmptyTitles() {
		$('.pdp-hideable:empty')
			.prev()
			.removeClass('pdp-hideable')
			.removeClass('pdp-settable')
				.off('click')
				.find('.fa.fa-chevron-up , .fa.fa-chevron-down')
					.remove();

		// Titles are not handled correctly by .off()
		$('.pdp-program:empty')
			.prev()
				.removeAttr('onclick');
}

function handleContentEscape(ev) {
	ev.stopImmediatePropagation();
	var charCode = ev.which,
		el, parent;

	if (charCode !== 27) {
		return;
	}

	parent = $(ev.currentTarget);
	el = parent.find("a.link-open").first();
	if (el.length !== 0) {
		el.trigger("click");
	}
}
