/* =====================================================
   HAPPY BIRTHDAY WEBSITE
   Premium Script
   Part 1
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const loader = document.getElementById("loader");
    const starfield = document.querySelector(".starfield");

    const hero = document.getElementById("hero");

    const envelope = document.querySelector(".envelope");
    const letterSection = document.getElementById("letterSection");

    const photoCards = document.querySelectorAll(".photo-card");

    let envelopeOpened = false;

    /* =========================
       CREATE STARS
    ========================= */

    function createStars(count = 180) {

        if (!starfield) return;

        for (let i = 0; i < count; i++) {

            const star = document.createElement("span");

            star.className = "star";

            const size = Math.random() * 3 + 1;

            star.style.width = size + "px";
            star.style.height = size + "px";

            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";

            star.style.animationDelay =
                Math.random() * 4 + "s";

            star.style.animationDuration =
                2 + Math.random() * 4 + "s";

            starfield.appendChild(star);

        }

    }

    createStars();

    /* =========================
       LOADER
    ========================= */

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

            hero.classList.add("hero-visible");

        }, 1800);

    });

    /* =========================
       HERO INTRO
    ========================= */

    function revealHero() {

        hero.animate(

            [

                {
                    opacity:0,
                    transform:"translateY(60px)"
                },

                {
                    opacity:1,
                    transform:"translateY(0)"
                }

            ],

            {

                duration:1200,
                easing:"ease-out",
                fill:"forwards"

            }

        );

    }

    setTimeout(revealHero,1900);

    /* =========================
       ENVELOPE
    ========================= */

    function openEnvelope(){

        if(envelopeOpened) return;

        envelopeOpened=true;

        envelope.classList.add("open");

        envelope.animate(

            [

                {

                    transform:
                    "scale(1)"

                },

                {

                    transform:
                    "scale(1.05)"

                },

                {

                    transform:
                    "scale(1)"

                }

            ],

            {

                duration:800,
                easing:"ease"

            }

        );

setTimeout(() => {

    // Start the music first
    const music = document.getElementById("bgMusic");
    console.log(music);

    if (music && music.paused) {

        music.volume = 0;

        music.play().catch(() => {});

        let volume = 0;

        const fade = setInterval(() => {

            volume += 0.02;
            music.volume = Math.min(volume, 0.45);

            if (volume >= 0.45) {
                clearInterval(fade);
            }

        }, 100);
    }

    document.body.classList.add("opening-letter");

    // Wait a little so the first note starts
    setTimeout(() => {

        window.scrollTo({
            top: document.getElementById("letter").offsetTop,
            behavior: "smooth"
        });

    }, 700);

    setTimeout(() => {
        document.body.classList.remove("opening-letter");
    }, 1900);

}, 1200);


    }

    if(envelope){

        envelope.addEventListener(

            "click",

            openEnvelope

        );

    }

    /* =========================
       GALLERY OBSERVER
    ========================= */

    const observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },

        {

            threshold:.2

        }

    );

    photoCards.forEach(card=>{

        observer.observe(card);

    });

});
/* =====================================================
   PART 2
   Letter • Hearts • Lightbox • Gallery
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const letter = document.querySelector(".letter");
    const gallery = document.getElementById("gallery");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
    const closeBtn = document.getElementById("closeLightbox");

    const photos = document.querySelectorAll(".photo-card img");

    let currentImage = 0;

    /* =========================
       LETTER REVEAL
    ========================= */

    if(letter){

        const letterObserver = new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(!entry.isIntersecting) return;

                letter.animate(

                    [

                        {
                            opacity:0,
                            transform:"translateY(60px)"
                        },

                        {
                            opacity:1,
                            transform:"translateY(0)"
                        }

                    ],

                    {

                        duration:1000,
                        easing:"ease-out",
                        fill:"forwards"

                    }

                );

                letterObserver.disconnect();

            });

        },{

            threshold:.3

        });

        letterObserver.observe(letter);

    }

    /* =========================
       IMAGE PRELOAD
    ========================= */

    photos.forEach(img=>{

        img.style.opacity="0";

        if(img.complete){

            img.style.opacity="1";

            return;

        }

        img.addEventListener("load",()=>{

            img.animate(

                [

                    {
                        opacity:0,
                        transform:"scale(.95)"
                    },

                    {
                        opacity:1,
                        transform:"scale(1)"
                    }

                ],

                {

                    duration:700,
                    easing:"ease-out",
                    fill:"forwards"

                }

            );

        });

    });

    const epilogue = document.getElementById("epilogue");

const epilogueObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            setTimeout(()=>{

                epilogue.classList.add("show");

            },3000);

        }

    });

},{
    threshold:.5
});

epilogueObserver.observe(epilogue);


    /* =========================
       LIGHTBOX OPEN
    ========================= */

    photos.forEach((img,index)=>{

        img.addEventListener("click",()=>{

            if(!lightbox) return;

            currentImage=index;

            lightbox.classList.add("active");

            lightboxImg.src=img.src;

            document.body.style.overflow="hidden";

        });

    });

    /* =========================
       CLOSE
    ========================= */

    function closeLightbox(){

        if(!lightbox) return;

        lightbox.classList.remove("active");

        document.body.style.overflow="";

    }

    if(closeBtn){

        closeBtn.addEventListener("click",closeLightbox);

    }

    if(lightbox){

        lightbox.addEventListener("click",(e)=>{

            if(e.target===lightbox){

                closeLightbox();

            }

        });

    }

    /* =========================
       KEYBOARD
    ========================= */

    document.addEventListener("keydown",(e)=>{

        if(!lightbox.classList.contains("active")) return;

        if(e.key==="Escape"){

            closeLightbox();

        }

        if(e.key==="ArrowRight"){

            currentImage++;

            if(currentImage>=photos.length){

                currentImage=0;

            }

            lightboxImg.src=photos[currentImage].src;

        }

        if(e.key==="ArrowLeft"){

            currentImage--;

            if(currentImage<0){

                currentImage=photos.length-1;

            }

            lightboxImg.src=photos[currentImage].src;

        }

    });

    /* =========================
       FLOATING HEARTS
    ========================= */

    function createHeart(){

        const heart=document.createElement("div");

        heart.innerHTML="❤";

        heart.style.position="fixed";

        heart.style.left=Math.random()*100+"vw";

        heart.style.bottom="-30px";

        heart.style.fontSize=(16+Math.random()*18)+"px";

        heart.style.color="rgba(255,170,210,.85)";

        heart.style.pointerEvents="none";

        heart.style.zIndex="999";

        heart.style.transition="transform 5s linear, opacity 5s";

        document.body.appendChild(heart);

        requestAnimationFrame(()=>{

            heart.style.transform=
            `translateY(-110vh) translateX(${(Math.random()*120)-60}px)`;

            heart.style.opacity="0";

        });

        setTimeout(()=>{

            heart.remove();

        },5000);

    }

    /* =========================
       ENVELOPE MAGIC
    ========================= */

    const envelope=document.querySelector(".envelope");

    if(envelope){

        envelope.addEventListener("click",()=>{

            for(let i=0;i<18;i++){

                setTimeout(createHeart,i*120);

            }

        },{once:true});

    }

});
/* =====================================================
   PART 3
   Finale • Balloons • Confetti • Typewriter
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const finale = document.getElementById("finale");
    const balloonContainer = document.getElementById("balloonContainer");
    const confettiContainer = document.getElementById("confettiContainer");

    const finalTitle = finale ? finale.querySelector(".display") : null;

    /* =========================
       BALLOONS
    ========================= */

    function createBalloon() {

        if (!balloonContainer) return;

        const balloon = document.createElement("div");

        balloon.className = "balloon";

        const colors = [
            "#ff6b9d",
            "#ffd166",
            "#8ec5ff",
            "#b892ff",
            "#ff9f68",
            "#90ee90"
        ];

        balloon.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        balloon.style.left = Math.random() * 100 + "%";

        balloon.style.animationDuration =
            (8 + Math.random() * 6) + "s";

        balloonContainer.appendChild(balloon);

        setTimeout(() => {

            balloon.remove();

        }, 15000);

    }

    /* =========================
       CONFETTI
    ========================= */

    function launchConfetti() {

        if (!confettiContainer) return;

        const colors = [
            "#FFD166",
            "#FF6B6B",
            "#4D96FF",
            "#6BCB77",
            "#C77DFF",
            "#FFFFFF"
        ];

        for (let i = 0; i < 180; i++) {

            const piece = document.createElement("span");

            piece.className = "confetti";

            piece.style.left = Math.random() * 100 + "%";

            piece.style.top = "-20px";

            piece.style.background =
                colors[Math.floor(Math.random() * colors.length)];

            piece.style.animationDuration =
                (3 + Math.random() * 2) + "s";

            piece.style.animationDelay =
                (Math.random() * .5) + "s";

            piece.style.transform =
                `rotate(${Math.random() * 360}deg)`;

            confettiContainer.appendChild(piece);

            setTimeout(() => {

                piece.remove();

            }, 6000);

        }

    }

    /* =========================
       TYPEWRITER
    ========================= */

    function typeWriter(element) {

        if (!element) return;

        const original = element.textContent.trim();

        element.textContent = "";

        let index = 0;

        function write() {

            if (index >= original.length) return;

            element.textContent += original.charAt(index);

            index++;

            setTimeout(write, 80);

        }

        write();

    }

    /* =========================
       FINALE OBSERVER
    ========================= */

    if (finale) {

        const finaleObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                finale.animate(

                    [
                        {
                            opacity: 0,
                            transform: "translateY(80px)"
                        },

                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }

                    ],

                    {
                        duration: 1200,
                        easing: "ease-out",
                        fill: "forwards"
                    }

                );

                typeWriter(finalTitle);

                launchConfetti();

                for (let i = 0; i < 25; i++) {

                    setTimeout(createBalloon, i * 350);

                }

                finaleObserver.disconnect();

            });

        }, {

            threshold: .4

        });

        finaleObserver.observe(finale);

    }

});
/* =========================
   PARALLAX
========================= */

const aurora = document.querySelector(".aurora");
const starfield = document.querySelector(".starfield");

document.addEventListener("mousemove",(e)=>{

    const x=(e.clientX/window.innerWidth-.5)*20;
    const y=(e.clientY/window.innerHeight-.5)*20;

    if(aurora){

        aurora.style.transform=
        `translate(${x*0.4}px,${y*0.4}px)`;

    }

    if(starfield){

        starfield.style.transform=
        `translate(${x}px,${y}px)`;

    }

});
/* =========================
   SHOOTING STARS
========================= */

function shootingStar(){

    const star=document.createElement("div");

    star.style.position="fixed";

    star.style.width="3px";

    star.style.height="3px";

    star.style.background="#fff";

    star.style.boxShadow="0 0 20px white";

    star.style.left=Math.random()*window.innerWidth+"px";

    star.style.top="-20px";

    star.style.zIndex="2";

    star.style.pointerEvents="none";

    document.body.appendChild(star);

    star.animate([

        {

            transform:"translate(0,0) scale(1)",

            opacity:1

        },

        {

            transform:"translate(-600px,600px) scale(.2)",

            opacity:0

        }

    ],{

        duration:1200,

        easing:"ease-out"

    });

    setTimeout(()=>{

        star.remove();

    },1200);

}

setInterval(shootingStar,7000);