document.addEventListener('DOMContentLoaded', () => {
    
    // Greitas preloaderio išjungimas
    const preloader = document.getElementById('preloader');
    if(preloader) {
        const removeLoader = () => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 300);
        };
        window.addEventListener('load', removeLoader);
        setTimeout(removeLoader, 1500); // Apsauga
    }

    // Burger Meniu
    const burger = document.querySelector('.burger');
    const body = document.body;
    if (burger) {
        burger.addEventListener('click', () => {
            body.classList.toggle('nav-active');
        }, {passive: true});
        document.querySelectorAll('.nav-link').forEach(l => 
            l.addEventListener('click', () => body.classList.remove('nav-active'))
        );
    }

    // Header efektas
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }, {passive: true});
    }

    // Atsiradimo animacija (Observer)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Pritaiko animaciją tik jei JS veikia
    document.querySelectorAll('.album-card, .service-card, .bio-block, .gallery-item').forEach(item => {
        // Tik jei JS užsikrovė, paslepiam elementus ir leidžiam animaciją
        // (CSS pagal nutylėjimą gallery-item dabar rodoma)
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        observer.observe(item);
    });

    // Hero Slaideris
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 5000);
    }

    // Lightbox Galerija
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        const lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.innerHTML = '<div class="lb-close">&times;</div><div class="lb-counter"></div><button class="lb-btn lb-prev">&#10094;</button><img src="" alt="Peržiūra"><button class="lb-btn lb-next">&#10095;</button>';
        document.body.appendChild(lb);

        const img = lb.querySelector('img'), cnt = lb.querySelector('.lb-counter');
        let idx = 0;

        const show = (i) => {
            idx = (i + galleryItems.length) % galleryItems.length;
            img.src = galleryItems[idx].src;
            cnt.textContent = `${idx + 1} / ${galleryItems.length}`;
            lb.classList.add('active');
            body.style.overflow = 'hidden';
        };

        const hide = () => { lb.classList.remove('active'); body.style.overflow = ''; };
        
        galleryItems.forEach((el, i) => el.parentNode.addEventListener('click', () => show(i)));
        
        lb.querySelector('.lb-close').onclick = hide;
        lb.querySelector('.lb-prev').onclick = (e) => { e.stopPropagation(); show(idx - 1); };
        lb.querySelector('.lb-next').onclick = (e) => { e.stopPropagation(); show(idx + 1); };
        lb.onclick = (e) => { if(e.target === lb) hide(); };
        
        // Touch
        let x = 0;
        lb.addEventListener('touchstart', e => x = e.touches[0].clientX, {passive: true});
        lb.addEventListener('touchend', e => {
            if(x - e.changedTouches[0].clientX > 50) show(idx + 1);
            if(e.changedTouches[0].clientX - x > 50) show(idx - 1);
        }, {passive: true});
    }
});
