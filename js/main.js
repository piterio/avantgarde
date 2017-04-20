const swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    mousewheelControl: true,
    resizeReInit: true,
    coverflow: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
    },
    onTap(swiper, event) {
        const $target = $(event.target);
        if ($target.parents('.item').length > 0 && $target.parents('.swiper-slide-active').length === 0) {
            swiper.slideTo($target.parents('.item').index());
        }
    },
    onTransitionStart(swiper) {
        const $slide = $(swiper.slides[swiper.realIndex]);

        $('.rating.positive .rating-number').stop(true, true).prop('Counter', 0).animate({
            Counter: $slide.data('positive')
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });

        $('.rating.negative .rating-number').stop(true, true).prop('Counter', 0).animate({
            Counter: $slide.data('negative')
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    }
});

const resetForm = function resetForm(form) {
    $(form).find('input, textarea').not('.js-send').val('');
    $(form).find('.js-send').html('Sent!');
};

$('.js-feedback').on('click touchend', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    if ($(evt.target).parents('.item').hasClass('swiper-slide-active'))
        $('#feedback').addClass('show');
});

$('.js-close-popup').on('click touchend', (evt) => {
    $('#feedback').removeClass('show');
    resetForm('.js-form');
    $('.js-form').find('.js-send').html('Send');
});

$('.js-form').on('submit', (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    $(evt.target).find('.js-send').html('Sending...');

    setTimeout(() => {
        resetForm(evt.target);
    }, 5000);

});

