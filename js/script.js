(function () {

    // BACKGROUND management
    const bgCount = 3
    const bgToShow = Math.max(1, Math.round(Math.random() * bgCount))
    $('.showroom').css('backgroundImage', `url(images/bg${bgToShow}.jpg)`)

    $('.showroom').click(() => {
        $('.showroom').fadeOut()
    })

    // REALISATION
    let reaTransitions = []
    const showRea = (filter, duration = 200) => {
        reaTransitions.forEach(_ => clearTimeout(_))
        reaTransitions = []
        $(filter).each((i, rea) => {
            reaTransitions.push(setTimeout(() => $(rea).stop().fadeIn(), i * duration))
        })
    }

    let reaButtonOpen = false
    $('.menu-button.realisation').click(function() {
        let sign1 = reaButtonOpen ? '-' : '+'
        let sign2 = reaButtonOpen ? '+' : '-'
        $(this).html($(this).html().replace(sign1, sign2))
        $('.menu-sub').toggle()
        if (sign2 === '+') {
            showRea('.rea', 0)
            $('.menu-sub span.active').removeClass('active')
        }
        reaButtonOpen = !reaButtonOpen
    })

    $('.menu-sub span').click(function() {
        const filter = `data-filter="${$(this).attr('data-filter')}"`
        $(`.rea`).stop().fadeOut(0)
        showRea(`.rea[${filter}]`)
        $('.menu-sub span.active').removeClass('active')
        $(this).addClass('active')
    })

    function placeLogo() {
        const blackLogo = $('.main.container .logo')
        const logoBlackOffset = blackLogo.offset()
        $('.showroom .logo').css({
            top: logoBlackOffset.top,
            left: logoBlackOffset.left,

        })
        $('.showroom .logo img').css('width', blackLogo.width() + 'px')
    }

    setInterval(placeLogo, 100)
    placeLogo()
    $('.showroom .logo').fadeOut(0)
    $('.showroom .logo').fadeIn(500)
})()
