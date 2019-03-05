(function () {

    // BACKGROUND management
    const backgrounds = [
        'images/inauguration.jpg', 'images/equipe.jpg', 'images/mur.jpg', 'images/sable.jpg',
        'videos/encens.mp4', 'videos/gravure_bois.mp4'
    ]
    const bgToShow = backgrounds[
        Math.round(Math.random() * (backgrounds.length - 1))
    ]
    if (bgToShow.match(/\.(jpg)$/)) {
        $('.showroom').css('backgroundImage', `url(${bgToShow})`)
    } else {
        $('.showroom').append(`<video src="${bgToShow}" autoplay muted loop></video>`)
    }

    $(`.rea`).stop().fadeOut(0)
    $('.showroom').click(() => {
        $('.showroom').fadeOut()
        showRea('.rea', 0)
    })

    // REALISATION
    let reaTransitions = []
    const showRea = (filter, duration = 200) => {
        reaTransitions.forEach(_ => clearTimeout(_))
        reaTransitions = []
        $(filter).each((i, rea) => {
            reaTransitions.push(setTimeout(() => $(rea).stop().fadeIn(), 0))
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
        $('.rea .slides').fadeOut(0)
        const filter = `data-filter="${$(this).attr('data-filter')}"`
        $(`.rea`).stop().fadeOut(0)
        showRea(`.rea[${filter}]`)
        $('.menu-sub span.active').removeClass('active')
        $(this).addClass('active')
        $('.menu .content-text').html('')
    })

    /** GALERY */
    const prepare_neighbours = function (fsi, index) {
        let indexNext = index + 1
        let indexPrev = index - 1
        if (indexNext > fsi.length - 1) {
            indexNext = 0
        }
        if (indexPrev < 0) {
            indexPrev = fsi.length - 1
        }
        const next = $(fsi.get(indexNext))
        const prev = $(fsi.get(indexPrev))
        next.addClass('next').removeClass('prev')
        prev.addClass('prev').removeClass('next')
    }

    const move_in_galery = function (slides, relative, absolute) {
        // get index
        const old = slides.find('img.current')
        let index = absolute !== undefined ? absolute : old.index() + relative
        const fsi = slides.find('img')

        if (index > fsi.length - 1) {
            index = 0
        } else if (index < 0) {
            index = fsi.length - 1
        }

        old.removeClass('current')
        prepare_neighbours(fsi, index)

        const current = $(fsi.get(index))
        current.removeClass('next').removeClass('prev').addClass('current')

        slides.find('.num-button.current').removeClass('current')
        $(slides.find('.num-button').get(index)).addClass('current')
    }

    /**
     * END GALERY
     */

    function placeLogo() {
        const blackLogo = $('.main.container .logo')
        const logoBlackOffset = blackLogo.offset()
        $('.showroom .logo').css({
            top: logoBlackOffset.top,
            left: logoBlackOffset.left,

        })
        $('.showroom .logo img').css('width', blackLogo.width() + 'px')
    }

    $('.rea').click(function() {
        $(this).find('.slides').fadeIn()
        $('.menu .content-text').html($(this).find('.description').html())
    })

    $('.rea .slides').each((i, slides) => {
        const rea = $(slides)
        rea.find('a.left').click(() => move_in_galery(rea, -1))
        rea.find('a.right').click(() => move_in_galery(rea, +1))
        rea.find('img').each(index => {
            rea.find('.num-button-container').append(`<div class="num-button">${index + 1}</div>`)
            rea.find('.num-button').last().click(() => move_in_galery(rea, 0, index))
        })
        move_in_galery(rea, 0, 0)
    })

    $('.rea .slides').fadeOut(0)

    setInterval(placeLogo, 100)
    placeLogo()
    $('.showroom .logo').fadeOut(0)
    $('.showroom .logo').fadeIn(500)
})()
