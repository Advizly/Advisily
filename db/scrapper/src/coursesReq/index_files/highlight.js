highlight = {
  highlightWord: function(node,word, style) {
    // Iterate into this nodes childNodes
    if (node.hasChildNodes) {
	    for (var hi_cn=0;hi_cn<node.childNodes.length;hi_cn++) {
		    highlight.highlightWord(node.childNodes[hi_cn],word, style);
	    }
    }

    // And do this node itself
    if (node.nodeType == 3) { // text node
	    tempNodeVal = node.nodeValue.toLowerCase();
	    tempWordVal = word.toLowerCase();
	    if (tempNodeVal.indexOf(tempWordVal) != -1) {
		    var pn = node.parentNode;
		    // check if we're inside a "nosearchhi" zone
		    var checkn = pn;
		    while (checkn.nodeType != 9 &&
		    checkn.nodeName.toLowerCase() != 'body') {
		    // 9 = top of doc
			    if (checkn.className.match(/\bnosearchhi\b/)) { return; }
			    checkn = checkn.parentNode;
		    }
		    if (pn.className != style) {
			    // word has not already been highlighted!
			    var nv = node.nodeValue;
			    var ni = tempNodeVal.indexOf(tempWordVal);
			    // Create a load of replacement nodes
			    var before = document.createTextNode(nv.substr(0,ni));
			    var docWordVal = nv.substr(ni,word.length);
			    var after = document.createTextNode(nv.substr(ni+word.length));
			    var hiwordtext = document.createTextNode(docWordVal);
			    var hiword = document.createElement("span");
			    hiword.className = style;
			    hiword.appendChild(hiwordtext);
			    pn.insertBefore(before,node);
			    pn.insertBefore(hiword,node);
			    pn.insertBefore(after,node);
			    pn.removeChild(node);
			    highlight.found += 1;
		    }
	    }
    }
  },

  searchHighlight: function(highlight_text) {
	if (typeof(highlight_text) != 'undefined' ){
	  highlight.process(highlight_text, $('.block_content').get( 0 ));
	} else {
		var ref = window.location + "";
		if (ref.indexOf('?') == -1) return;
		var qs = ref.substr(ref.indexOf('?')+1);
		var qsa = qs.split('&');
		//	If on a print page ("print" is in the querystring) we will not highlight. (Refs #4107)
		for (var i=0;i<qsa.length;i++) {
			if (qsa[i] == 'print') {
				return;
			}
		}
		for (var i=0;i<qsa.length;i++) {
			var qsip = qsa[i].split('=');
		  if (qsip.length == 1) continue;
		  if (qsip[0] == 'hl') {
				var wordstring = unescape(qsip[1].replace(/\+/g,' '));
				highlight.process(wordstring, $('.block_content').get( 0 ));
		  }
		}
	}
  },

  process: function(wordstring, content) {
	highlight.found = 0;

	//	If the exact_match is checked and the keyword is not surrounded by quotes already, quote it. (Refs #4085)
	exact_match = $('#exact_match');
	if (exact_match && exact_match.prop( 'checked' )) {
		if (wordstring.charAt(0) != '"' && wordstring.charAt(wordstring.length-1) != '"') {
			wordstring = '"' + wordstring + '"';
		}
	}

	//	If wordstring is quoted it is an exact match search and should not be split up into component words. (Refs #4085)
	if (wordstring.charAt(0) == '"' && wordstring.charAt(wordstring.length - 1) == '"') {
		wordstring = wordstring.substring(1, wordstring.length - 1);
		var words = new Array(wordstring);
	} else {
		wordstring = wordstring.replace("%22", "");
		wordstring = wordstring.replace('"', "");
		var words = wordstring.split(/\s+/);
	}
	var style_counter = 0;
    for (w=0;w<words.length;w++) {
		if (words[w].length <= 2 || words[w] == 'AND' || words[w] == 'OR') {
			continue;
		}

		var style;
		style_counter++;

		if (style_counter < 6) {
			style = 'acalog-highlight-search-' + style_counter;
		} else {
			style = 'acalog-highlight-search-6';
		}

		highlight.highlightWord(content,words[w], style);
    }
    if (highlight.found === 0) {
      highlight.nohits();
    }
  },

  nohits: function() {
  },

  init: function() {
    if (!document.createElement || !document.getElementsByTagName) return;
    // hook up forms of type searchhi
    var frms = $("form");
    for (var i=0; i<frms.length; i++) {
      	if (frms[i].className.match(/\bsearchhi\b/)) {
	        frms[i].on('submit', function() {
	        	var inps = $(this).find('input');
	        	for (var j = 0; j < length; j++) {
	        		if ((inps[j].attr('type')) === 'text') {
	        			highlight.process(inps[j].val(), $('.block_content').get( 0 ));
	        			return false;
	        		}
	        	}
	        });
      	}
    }
    // highlight search engine referrer results
    highlight.searchHighlight();
  }
};

(function(i) {var u =navigator.userAgent;var e=/*@cc_on!@*/false; var st =
setTimeout;if(/webkit/i.test(u)){st(function(){var dr=document.readyState;
if(dr=="loaded"||dr=="complete"){i()}else{st(arguments.callee,10);}},10);}
else if((/mozilla/i.test(u)&&!/(compati)/.test(u)) || (/opera/i.test(u))){
document.addEventListener("DOMContentLoaded",i,false); } else if(e){     (
function(){var t=document.createElement('doc:rdy');try{t.doScroll('left');
i();t=null;}catch(e){st(arguments.callee,0);}})();}else{window.onload=i;}})(highlight.init);