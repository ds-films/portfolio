document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRELOADER ---
    const preloader = document.getElementById('preloader');
    if(preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        });
        setTimeout(() => { 
            if(preloader.style.display !== 'none') {
                preloader.style.opacity = '0';
                setTimeout(() => { preloader.style.display = 'none'; }, 500);
            }
        }, 1500); 
    }

    // --- 2. MENU LOGIKA ---
    const burger = document.querySelector('.burger');
    const body = document.body;
    
    if (burger) {
        burger.addEventListener('click', () => {
            body.classList.toggle('nav-active');
        });
    }
    
    // Užsidaro paspaudus ant nuorodos
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('nav-active');
        });
    });

    // --- 3. HEADERIO EFEKTAS ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 4. ANIMACIJA ATSIRADIMO ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.gallery-item, .album-card, .service-card, .bio-block').forEach(item => {
        observer.observe(item);
    });

    // --- 5. HERO SLAIDERIS ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const changeSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };
        setInterval(changeSlide, 5000);
    }

    // --- 6. LIGHTBOX ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lb-close">&times;</div>
            <div class="lb-counter"></div>
            <button class="lb-btn lb-prev">&#10094;</button>
            <img src="" alt="Peržiūra">
            <button class="lb-btn lb-next">&#10095;</button>
        `;
        document.body.appendChild(lightbox);

        const lbImg = lightbox.querySelector('img');
        const lbCounter = lightbox.querySelector('.lb-counter');
        const lbClose = lightbox.querySelector('.lb-close');
        const btnPrev = lightbox.querySelector('.lb-prev');
        const btnNext = lightbox.querySelector('.lb-next');
        let currentIndex = 0;

        const updateImage = () => {
            lbImg.style.opacity = 0;
            setTimeout(() => {
                lbImg.src = galleryItems[currentIndex].src;
                lbCounter.innerText = `${currentIndex + 1} / ${galleryItems.length}`;
                lbImg.onload = () => { lbImg.style.opacity = 1; };
            }, 200);
        };

        const openLightbox = (index) => {
            currentIndex = index;
            updateImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        const nextImage = (e) => {
            if(e) e.stopPropagation();
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateImage();
        };

        const prevImage = (e) => {
            if(e) e.stopPropagation();
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateImage();
        };

        galleryItems.forEach((img, index) => {
            img.parentElement.addEventListener('click', () => openLightbox(index));
        });

        lbClose.addEventListener('click', closeLightbox);
        btnNext.addEventListener('click', nextImage);
        btnPrev.addEventListener('click', prevImage);
        lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
        
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
        
        // Touch Swipe
        let touchStartX = 0;
        lightbox.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
        lightbox.addEventListener('touchend', e => {
            if (touchStartX - e.changedTouches[0].screenX > 50) nextImage();
            if (e.changedTouches[0].screenX - touchStartX > 50) prevImage();
        }, {passive: true});
    }
});
