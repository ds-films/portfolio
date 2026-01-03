document.addEventListener('DOMContentLoaded', () => {
    
    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    if(preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // --- BURGER MENU ---
    const burger = document.querySelector('.burger');
    const body = document.body;
    
    if (burger) {
        burger.addEventListener('click', () => {
            body.classList.toggle('nav-active');
        });
    }

    // --- HEADER SCROLL EFFECT ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- SCROLL ANIMATION (OBSERVER) ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.gallery-item, .album-card').forEach(item => {
        observer.observe(item);
    });

    // --- HERO SLIDER (TIK INDEX PUSLAPYJE) ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Keičiasi kas 5 sekundes
    }

    // --- LIGHTBOX (GALERIJOS PERŽIŪRA) ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
            <div class="lb-close">&times;</div>
            <div class="lb-counter"></div>
            <button class="lb-btn lb-prev">&#10094;</button>
            <img src="" alt="Full screen view">
            <button class="lb-btn lb-next">&#10095;</button>
        `;
        document.body.appendChild(lightbox);

        const lbImg = lightbox.querySelector('img');
        const lbCounter = lightbox.querySelector('.lb-counter');
        const lbClose = lightbox.querySelector('.lb-close');
        const btnPrev = lightbox.querySelector('.lb-prev');
        const btnNext = lightbox.querySelector('.lb-next');
        
        let currentIndex = 0;

        const openLightbox = (index) => {
            currentIndex = index;
            lbImg.src = galleryItems[currentIndex].src;
            lbCounter.innerText = `${currentIndex + 1} / ${galleryItems.length}`;
            lightbox.classList.add('active');
            body.style.overflow = 'hidden'; // Stop scrolling
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            body.style.overflow = 'auto';
        };

        const showNext = (e) => {
            if(e) e.stopPropagation();
            currentIndex = (currentIndex + 1) % galleryItems.length;
            openLightbox(currentIndex);
        };

        const showPrev = (e) => {
            if(e) e.stopPropagation();
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            openLightbox(currentIndex);
        };

        // Event Listeners
        galleryItems.forEach((img, index) => {
            img.parentElement.addEventListener('click', () => openLightbox(index));
        });

        lbClose.addEventListener('click', closeLightbox);
        btnNext.addEventListener('click', showNext);
        btnPrev.addEventListener('click', showPrev);

        // Click outside image to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });

        // Swipe support (Mobile)
        let touchStartX = 0;
        let touchEndX = 0;
        
        lightbox.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
        lightbox.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) showNext();
            if (touchEndX - touchStartX > 50) showPrev();
        });
    }
});
