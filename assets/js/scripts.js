const tl = gsap.timeline();
const opSeqcontainer = document.querySelector('#opening-sequence-container');
const skipButton = document.querySelector('#skip-button');
const skipButtonOuter = document.querySelector('.skip-button__outer');
const rocket = document.querySelector('#rocket');
const container = document.querySelector('#container');
const menuToggle = document.querySelector('.menu-toggle');
const avatar = document.querySelector('.img-container');
const textContainer = document.querySelector('.text-container');
const arrowDown = document.querySelector('#down-to-content');
const backToTopButton = document.querySelector('#back-to-top');
const disabledLink = document.querySelector('.disabled-link');

let rocketVib = -1;


const nav = document.querySelector('.nav');
const Navlist = nav.querySelectorAll('li')
const showNav = gsap.timeline({ paused: true, yoyo: true })
Navlist.forEach((item) => {
    showNav.to(item, { autoAlpha: 1, x: -20, duration: .25 })
})

const workImg = document.querySelectorAll('.work__image');



window.onload = () => {
    //opening animation
    tl.addLabel('seq1')
        .from(opSeqcontainer.querySelector('.progress-bar'), { autoAlpha: 0, width: 0, duration: 1 }, 'seq1+=1')
        .from(opSeqcontainer.querySelector('#first'), { autoAlpha: 0, duration: 1 }, 'seq1+=2')
        .to(opSeqcontainer.querySelector('.progress'), { width: '100%', duration: 3, ease: "slow(0.7, 0.7, false)" }, 'seq1+=2')
        .from(opSeqcontainer.querySelector('#second'), { autoAlpha: 0, duration: 1, }, 'seq1+=3')
        .to([opSeqcontainer.querySelector('#first'), opSeqcontainer.querySelector('#second')], { autoAlpha: 0, duration: .75 }, 'seq1+=5')
        .to(opSeqcontainer.querySelector('.progress-bar'), .75, { width: '100vw', height: '0px' }, 'seq1+=5')
        .set([rocket, container], { autoAlpha: 1, display: 'block' })
        .set(opSeqcontainer, { display: 'none', delay: .5 })
        .addLabel('seq2')
        .set(skipButtonOuter, { autoAlpha: 0 }, 'seq2')
        .to(rocket, { duration: 0.1, x: "-=5", yoyo: true, repeat: rocketVib }, 'seq2')
        .to(rocket, { duration: 2, y: "-120vh" }, 'seq2')
        .from(container, { duration: 2, y: "120vh" }, 'seq2')
        .from(avatar, 1.5, { x: "12.5vw", autoAlpha: 0, rotation: 360, transformOrigin: 'center', }, 'seq2+=2')
        .from(textContainer.querySelector('h2'), .5, { autoAlpha: 0, y: "-2.5vh" }, 'seq2+=2.5')
        .from(textContainer.querySelector('h3'), .5, { autoAlpha: 0, scale: 0 }, 'seq2+=3')
        .from(arrowDown, 1, {
            autoAlpha: 0, y: "-2.5vh", onComplete: () => {
                AOS.init({ duration: 1000, delay: 200 });
                ScrollTrigger.refresh();
            }
        }, 'seq2+=3.5')
        .set("body", { overflowY: 'scroll' }, 'seq2+=3.5')

    //toggle sidebar menu
    menuToggle.addEventListener('click', function () {
        this.classList.toggle('is-active');

        if (this.classList.contains('is-active')) {
            nav.classList.toggle('mobile-nav')
            showNav.play()
        } else {
            showNav.reverse()
            setTimeout(function () { nav.classList.toggle('mobile-nav') }, 1100)
        }
    })

    //skip animation
    skipButton.addEventListener('click', function () {
        tl.seek('-=0', false);
    });

    // When the user clicks on the button, scroll to the top of the document
    backToTopButton.onclick = function () {
        document.querySelector('#container').scrollIntoView({ behavior: 'smooth' });
    };

    //scroll to section
    Navlist.forEach((item) => {
        console.log(item.dataset.scrollid)
        item.addEventListener('click', () => {
            document.getElementById(item.dataset.scrollid).scrollIntoView({ behavior: 'smooth' })
            menuToggle.classList.toggle('is-active');
            showNav.reverse()
            setTimeout(function () { nav.classList.toggle('mobile-nav') }, 1100)
        })
    })

    //scroll to main 
    arrowDown.addEventListener('click', function () {
        document.getElementById('content-container').scrollIntoView({ behavior: 'smooth' });
    })

    // overlay animation
    workImg.forEach(element => {
        const showOverlayTl = gsap.timeline({ paused: true, duration: .25 })
            .to(element.querySelector('.img__overlay'), { autoAlpha: 1 })

        //scrolltrigger overlay (for smaller screens)
        if (('ontouchstart' in document.documentElement && /mobi/i.test(navigator.userAgent))) {
            ScrollTrigger.create({
                trigger: element,
                start: "top 20%",
                onEnter: () => showOverlayTl.play(),
                onLeave: () => showOverlayTl.reverse()
            })
        }

        element.addEventListener('mouseenter', () => {
            showOverlayTl.play();

        })

        element.addEventListener('mouseleave', () => {
            showOverlayTl.reverse();
        })
    });

    disabledLink.addEventListener('click', function (e) {
        e.preventDefault();
        alert('sorry that\'s private 😉');
    })

}


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
};
