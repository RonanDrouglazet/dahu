(function () {

    // BACKGROUND management
    const bgCount = 3
    const bgToShow = Math.max(1, Math.round(Math.random() * bgCount))
    $('.showroom').css('backgroundImage', `url(images/bg${bgToShow}.jpg)`)

    $('.showroom').click(() => {
        $('.showroom').fadeOut()
    })

    const logoBlackOffset = $('.main.container .logo').offset()
    $('.showroom .logo').css({
        top: logoBlackOffset.top,
        left: logoBlackOffset.left
    })
})()
