(function ($) {
    $(document).ready(function () {
        $('.b-menu__element').on(
            {
                mouseenter: function () {
                    $(this).toggleClass('b-menu__element_hover');
                },
                mouseleave: function () {
                    $(this).toggleClass('b-menu__element_hover');
                }
            }
        )
    })
})(jQuery);