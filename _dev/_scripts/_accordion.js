(function ($) {
    $(document).ready(function () {
        $('.b-aside__items_active').find('.b-aside__items__elements').show();
        $('.b-aside__items__main').on('click', function () {
            var $this = $(this),
                item = $(this).closest('.b-aside__items'),
                elements = item.find('.b-aside__items__elements'),
                items = item.closest('.b-aside'),
                durationSlide = 200;

            if (!item.hasClass('b-aside__items_active')) {
                $('.b-aside__items_active').find('.b-aside__items__elements').slideUp(durationSlide);
                elements.slideDown(durationSlide);
                items.find('.b-aside__items').removeClass('b-aside__items_active');
                item.addClass('b-aside__items_active');
            }
        })
    })
})(jQuery);