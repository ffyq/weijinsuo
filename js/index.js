$(function() {
  banner();
  $('[data-toggle="tooltip"]').tooltip();
  initMobileTab();
});
var banner = function() {
  $.ajax({
    type: 'get',
    url: 'js/data.json',
    //强制转换后台返回的json数据为json对象
    dataType: 'json',
    data: '',
    success: function(data) {
      var isMobile = $(window).width() < 768;
      // console.log(data);
      var pointHtml = template('pointTemplate', { list: data }); //只能传对象，data是数组
      // console.log(pointHtml);
      var imageHtml = template('imageTemplate', { list: data, isM: isMobile });
      // console.log(imageHtml);
      $('.carousel-indicators').html(pointHtml);
      $('.carousel-inner').html(imageHtml);
    }
  });

  var startX = 0;
  var moveX = 0;
  var distanceX = 0;
  var isMove = false;
  $('.wjs_banner').on('touchstart', function(e) {
    startX = e.originalEvent.touches[0].clientX;
  }).on('touchmove', function(e) {
    moveX = e.originalEvent.touches[0].clientX;
    distanceX = moveX - startX;
    isMove = true;
  }).on('touchend', function(e) {
    if (isMove && Math.abs(distanceX) > 50) {
      if (distanceX < 0) {
        $('.carousel').carousel('next');
      } else {
        $('.carousel').carousel('prev');
      }
    }
    startX = 0;
    moveX = 0;
    distanceX = 0;
    isMove = false;
  })
};


var initMobileTab = function() {
  /*1.解决换行问题*/
  var $navTabs = $('.wjs_product .nav-tabs');
  var width = 0;
  $navTabs.find('li').each(function(i, item) {
    var $currLi = $(this); //$(item);
    /*
     * width()  内容
     * innerWidth() 内容+内边距
     * outerWidth() 内容+内边距+边框
     * outerWidth(true) 内容+内边距+边框+外边距
     * */
    var liWidth = $currLi.outerWidth(true);
    width += liWidth;
  });
  // console.log(width);
  $navTabs.width(width);

  /*2.修改结构使之区域滑动的结构*/
  //加一个父容器给 .nav-tabs 叫  .nav-tabs-parent

  /*3.自己实现滑动效果 或者 使用iscroll */
  new IScroll($('.nav-tabs-parent')[0], {
    scrollX: true,
    scrollY: false,
    click: true,
  });
};