$(function(){
  //tabs
  $('[data-tab-link]').on('click', function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    var $target = $(target);

    $('[data-tab-link]').removeClass('state-active');
    $(this).addClass('state-active');
    $('[data-tab-content]').hide();
    $target.show();
  });

  $('.js-slick').slick({
    autoplay: true,
    autoplaySpeed: 5000
  });
});