document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 400);
        });
        setTimeout(() => {
            if (preloader.style.opacity !== '0') {
                preloader.style.opacity = '0';
                setTimeout(() => { preloader.style.display = 'none'; }, 400);
            }
        }, 3000);
    }

    const burger = document.querySelector('.burger');
    const body = document.body;
    const navMenu = document.querySelector('.nav-menu');
    
    if (burger && navMenu) {
        burger.addEventListener('click', () => {
            body.classList.toggle('nav-active');
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => body.classList.remove('nav-active'));
        });
    }

    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item, .album-card, .service-card, .bio-block').forEach(item => observer.observe(item));

    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 5000);
    }

    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = '<div class="lb-close">&times;</div><div class="lb-counter"></div><button class="lb-btn lb-prev">&#10094;</button><img src="" alt="Zoom"><button class="lb-btn lb-next">&#10095;</button>';
        document.body.appendChild(lightbox);

        const lbImg = lightbox.querySelector('img');
        const lbCounter = lightbox.querySelector('.lb-counter');
        const lbClose = lightbox.querySelector('.lb-close');
        const btnPrev = lightbox.querySelector('.lb-prev');
        const btnNext = lightbox.querySelector('.lb-next');
        let index = 0;

        const update = () => {
            lbImg.src = galleryItems[index].src;
            lbCounter.innerText = `${index + 1} / ${galleryItems.length}`;
        };

        const open = (i) => {
            index = i; update(); lightbox.classList.add('active'); body.style.overflow = 'hidden';
        };

        const close = () => { lightbox.classList.remove('active'); body.style.overflow = 'auto'; };
        const next = (e) => { e?.stopPropagation(); index = (index + 1) % galleryItems.length; update(); };
        const prev = (e) => { e?.stopPropagation(); index = (index - 1 + galleryItems.length) % galleryItems.length; update(); };

        galleryItems.forEach((img, i) => img.parentElement.addEventListener('click', () => open(i)));
        lbClose.addEventListener('click', close);
        btnNext.addEventListener('click', next);
        btnPrev.addEventListener('click', prev);
        lightbox.addEventListener('click', (e) => { if(e.target === lightbox) close(); });
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        });
        
        let ts = 0;
        lightbox.addEventListener('touchstart', e => ts = e.changedTouches[0].screenX, {passive: true});
        lightbox.addEventListener('touchend', e => {
            let te = e.changedTouches[0].screenX;
            if (ts - te > 50) next();
            if (te - ts > 50) prev();
        }, {passive: true});
    }
});
