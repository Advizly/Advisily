// jQuery version of social media links activation
SocialMediaLinks = {
	links: [],
	identifier: 0,
	addLink: function (link) {
		link.identifier = SocialMediaLinks.identifier;
		link.socialMediaActivated = true;
		SocialMediaLinks.links[SocialMediaLinks.identifier] = link;
		SocialMediaLinks.identifier += 1;
	},
	getLink: function (id) {
		return SocialMediaLinks.links[id];
	}
}

function socialMediaActivate() {
	// Get all social media links
	var links = jQuery('.acalog-social-media-links a');
	$links = jQuery(links)

	// If we find some, iterate
	if (links.length > 0) {
		links.each(function(index) {
			link = $links.get(index);
			// Check if it was already activated, and skip
			if (link.socialMediaActivated == true) {
				return;
			}

			// Record the link
			SocialMediaLinks.addLink(link);

			// Add click event handler to link
			jQuery(link).on('click', function(event) {
				try {
					smlink = event.target;

					data_link = jQuery(this).attr('href');

					// test ajax
					var sharelink = jQuery.ajax({
						type: 'POST',
						url: '/getShortUrl.php',
						dataType: 'json',
						data: {
							id: index,
							link: data_link
						}
					});
					sharelink.done(function(response) {
						var json = response;
						var response_link = SocialMediaLinks.getLink(json.id);
						acalogPopup(json.link, '_blank', 700, 450, 'yes');
					});
				} catch (e) {
					console.log(e);
				}
				event.preventDefault();
			});
		});
	}
}
