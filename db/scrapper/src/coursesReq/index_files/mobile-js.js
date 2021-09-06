$(document).ready(function(){
  $('.mobile-menu-toggle').click(function () {
    $(this).toggleClass('open');
    $('.block_n2_links.links_table').toggleClass('open');
    $('.block_n2_tools').toggleClass('open');
  });
  $(window).resize(function() {
    if ($(document).width() > 768) {
      $('.mobile-menu-toggle, .block_n2_links.links_table, .block_n2_tools').removeClass('open');
    }
  });
});