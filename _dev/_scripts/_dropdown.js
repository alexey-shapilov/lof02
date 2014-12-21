(function ($) {
    $(document).ready(function () {
        $('.b-dropdown__select__btn').on('click', function () {
            var $this = $(this),
                dropdown = $this.closest('.b-dropdown');
            dropdown.toggleClass('b-dropdown_open')
        });

        $('.b-dropdown__option').on('click', function () {
            var $this = $(this),
                dropdown = $this.closest('.b-dropdown');
            $('.b-dropdown__option').removeClass('b-dropdown__option_current');
            $this.toggleClass('b-dropdown__option_current');
            dropdown.toggleClass('b-dropdown_open');
            dropdown.attr('data-selected',$this.attr('data-index'))
        });
    })
})(jQuery);