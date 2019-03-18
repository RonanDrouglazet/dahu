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

    $('.showroom').click(() => {
        $('.showroom').fadeOut()
    })

    const showRow = name => {
        if (!$(`.content > .row.${name}`).is(':visible')) {
            $('.content > .row').fadeOut(0)
            $(`.content > .row.${name}`).stop().fadeIn()
            $('.menu .content-text').html('')
            $('.menu .content-text').html($(`.content > .row.${name} .content-text`).html())
        }
    }

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
        showRow('realisation')
        let sign1 = reaButtonOpen ? '-' : '+'
        let sign2 = reaButtonOpen ? '+' : '-'
        $(this).html($(this).html().replace(sign1, sign2))
        $('.menu-sub.realisation').toggle()
        if (sign2 === '+') {
            showRea('.rea', 0)
            $('.menu-sub.realisation span.active').removeClass('active')
        }
        reaButtonOpen = !reaButtonOpen
    })

    $('.menu-sub.realisation span').click(function() {
        $('.rea .slides').fadeOut(0)
        const filter = `data-filter="${$(this).attr('data-filter')}"`
        $(`.rea`).stop().fadeOut(0)
        showRea(`.rea[${filter}]`)
        $('.menu-sub.realisation span.active').removeClass('active')
        $(this).addClass('active')
        $('.menu .content-text').html('')
    })

    let atelierButtonOpen = false
    $('.menu-button.atelier').click(function () {
        //showRow('realisation')
        let sign1 = atelierButtonOpen ? '-' : '+'
        let sign2 = atelierButtonOpen ? '+' : '-'
        $(this).html($(this).html().replace(sign1, sign2))
        $('.menu-sub.atelier').toggle()
        if (sign2 === '+') {
            //showRea('.rea', 0)
            $('.menu-sub.atelier span.active').removeClass('active')
        }
        atelierButtonOpen = !atelierButtonOpen
    })

    $('.menu-sub.atelier span').each(function() {
        const el = $(this)
        const page = el.attr('data-page')

        el.click(() => {
            showRow(page)
            if (page === 'equipe') {
                $(`.row.${page} .slides`).fadeIn()
            }
        })
    })

    $('.menu-button.contact').click(() => showRow('contact'))

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
            top: logoBlackOffset.top - scrollY,
            left: logoBlackOffset.left,

        })
        $('.showroom .logo img').css('width', blackLogo.width() + 'px')
    }

    $('.rea').click(function() {
        $(this).find('.slides').fadeIn()
        $('.menu .content-text').html($(this).find('.description').html())
    })

    $('.slides').each((i, slides) => {
        const rea = $(slides)
        rea.find('a.left').click(() => move_in_galery(rea, -1))
        rea.find('a.right').click(() => move_in_galery(rea, +1))
        rea.find('img').each(index => {
            rea.find('.num-button-container').append(`<div class="num-button">${index + 1}</div>`)
            rea.find('.num-button').last().click(() => move_in_galery(rea, 0, index))
        })
        move_in_galery(rea, 0, 0)
    })

    $('.slides').fadeOut(0)

    setInterval(placeLogo, 100)
    placeLogo()
    $('.showroom .logo').fadeOut(0)
    $('.showroom .logo').fadeIn(500)
})()
