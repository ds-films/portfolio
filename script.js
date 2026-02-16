document.addEventListener('DOMContentLoaded', () => {
    
    const preloader = document.getElementById('preloader');
    if(preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 400);
        });
        setTimeout(() => { 
            if(preloader.style.display !== 'none') {
                preloader.style.opacity = '0';
                setTimeout(() => { preloader.style.display = 'none'; }, 400);
            }
        }, 1500);
    }

    const burger = document.querySelector('.burger');
    const body = document.body;
    if (burger) {
        burger.addEventListener('click', () => {
            body.classList.toggle('nav-active');
        }, {passive: true});
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                body.classList.remove('nav-active');
            });
        });
    }

    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }, {passive: true});
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item, .album-card, .service-card, .bio-block').forEach(item => {
        item.style.opacity = 0; 
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });
    
    // Papildoma CSS taisyklė per JS animacijai, kad CSS faile liktų švariau
    const styleSheet = document.createElement("style");
    styleSheet.innerText = ".visible { opacity: 1 !important; transform: translateY(0) !important; }";
    document.head.appendChild(styleSheet);

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
        const lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.innerHTML = '<div class="lb-close">&times;</div><div class="lb-counter"></div><button class="lb-btn lb-prev">&#10094;</button><img src="" alt="Peržiūra"><button class="lb-btn lb-next">&#10095;</button>';
        document.body.appendChild(lb);

        const lbImg = lb.querySelector('img');
        const lbCount = lb.querySelector('.lb-counter');
        let idx = 0;

        const update = () => {
            lbImg.style.opacity = 0;
            setTimeout(() => {
                lbImg.src = galleryItems[idx].src;
                lbCount.textContent = `${idx + 1} / ${galleryItems.length}`;
                lbImg.onload = () => lbImg.style.opacity = 1;
            }, 150);
        };

        const show = (i) => { idx = i; update(); lb.classList.add('active'); body.style.overflow = 'hidden'; };
        const close = () => { lb.classList.remove('active'); body.style.overflow = ''; };
        const next = (e) => { e?.stopPropagation(); idx = (idx + 1) % galleryItems.length; update(); };
        const prev = (e) => { e?.stopPropagation(); idx = (idx - 1 + galleryItems.length) % galleryItems.length; update(); };

        galleryItems.forEach((el, i) => el.parentNode.addEventListener('click', () => show(i)));
        
        lb.querySelector('.lb-close').onclick = close;
        lb.querySelector('.lb-next').onclick = next;
        lb.querySelector('.lb-prev').onclick = prev;
        lb.onclick = (e) => { if(e.target === lb) close(); };
        
        document.addEventListener('keydown', (e) => {
            if (!lb.classList.contains('active')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        });
        
        let tx = 0;
        lb.addEventListener('touchstart', e => tx = e.touches[0].clientX, {passive: true});
        lb.addEventListener('touchend', e => {
            if (tx - e.changedTouches[0].clientX > 50) next();
            if (e.changedTouches[0].clientX - tx > 50) prev();
        }, {passive: true});
    }
});
