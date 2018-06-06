$('.menu').click(function ()
{
    $('nav ul').toggleClass('show');
});

var offsetTop = 200;

$(window).scroll(function()
{
    var target = $('.kettlebell .right img');
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;

    var winScrollTop = $(this).scrollTop();
    if(winScrollTop > scrollToElem + offsetTop)
    {
        $(target).addClass('animated zoomIn');
    }
});

$(window).scroll(function()
{
    var target = $('.kettlebell .left');
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;

    var winScrollTop = $(this).scrollTop();
    if(winScrollTop > scrollToElem + offsetTop)
    {
        $(target).addClass('animated rollIn');
    }
});

$(window).scroll(function()
{
    var target = $('.our-program .list .item-wrapper:even');
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;

    var winScrollTop = $(this).scrollTop();
    if(winScrollTop > scrollToElem + offsetTop)
    {
        $(target).addClass('animated fadeInUp');
    }
});

$(window).scroll(function()
{
    var target = $('.our-program .list .item-wrapper:odd');
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;

    var winScrollTop = $(this).scrollTop();
    if(winScrollTop > scrollToElem + offsetTop)
    {
        $(target).addClass('animated fadeInDown');
    }
});