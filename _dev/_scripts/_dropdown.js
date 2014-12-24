(function ($) {
    $(document).ready(function () {
        $('.b-dropdown__select__btn').on('click', function () {
            var $this = $(this),
                dropdown = $this.closest('.b-dropdown');
            dropdown.toggleClass('b-dropdown_open')
        });

        $('.b-dropdown__option').on('click', function () {
            var $this = $(this),
                dropdown = $this.closest('.b-dropdown'),
                index = $this.attr('data-index');

            $('.b-dropdown__option').removeClass('b-dropdown__option_current');
            $('.b-dropdown__option').each(function () {
                var $this = $(this);
                if ($this.attr('data-index')==index) {
                    $this.addClass('b-dropdown__option_current');
                }
            });
            dropdown.toggleClass('b-dropdown_open');
            $('.b-dropdown').each(function () {
                $(this).attr('data-selected', $this.attr('data-index'));
            });
            $('.b-products').attr('class', 'b-products b-products_' + index);
            $('.b-dropdown__select__text').text($this.text());
        });
    })
})(jQuery);