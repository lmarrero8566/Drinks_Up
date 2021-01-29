document.addEventListener('DOMContentLoaded', function() {
    var carousel = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(carousel);
    var select = document.querySelectorAll('select');
    var instances = M.FormSelect.init(select);
    var tabs = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(tabs);
  });

  