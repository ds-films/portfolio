document.addEventListener('DOMContentLoaded', () => {

    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    const hideLoader = () => { if(preloader) { preloader.style.opacity = 0; setTimeout(()=>preloader.style.display='none',500); }};
    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 2000); // Atsarginis

    // --- BURGER & MENIU ---
    const burger = document.querySelector('.burger');
    const body = document.body;
    if(burger) {
        burger.addEventListener('click', () => body.classList.toggle('nav-active'));
    }

    // --- DROPDOWN MENIU LOGIKA (Svarbu!) ---
    const dropdownBtns = document.querySelectorAll('.nav-link-group span');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Uždaryti kitus, jei reikia, arba tiesiog perjungti šį
            btn.parentElement.classList.toggle('group-active');
        });
    });

    // --- SCROLL ANIMACIJOS ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.gallery-item, .album-card').forEach(i => observer.observe(i));

    // --- HERO SLIDER ---
    const slides = document.querySelectorAll('.hero-slide');
    if(slides.length) {
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 5000);
    }

    // --- LIGHTBOX ---
    const items = document.querySelectorAll('.gallery-item img');
    if(items.length > 0) {
        const lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.innerHTML = '<div class="lb-close">&times;</div><button class="lb-btn lb-prev">&#10094;</button><img src=""><button class="lb-btn lb-next">&#10095;</button>';
        document.body.appendChild(lb);

        const img = lb.querySelector('img');
        const next = lb.querySelector('.lb-next');
        const prev = lb.querySelector('.lb-prev');
        const close = lb.querySelector('.lb-close');
        let idx = 0;

        const show = (i) => {
            idx = i;
            img.src = items[idx].src;
            lb.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const hide = () => { lb.classList.remove('active'); document.body.style.overflow = ''; };
        
        items.forEach((item, i) => item.parentElement.addEventListener('click', () => show(i)));
        
        next.addEventListener('click', (e) => { e.stopPropagation(); idx = (idx + 1) % items.length; show(idx); });
        prev.addEventListener('click', (e) => { e.stopPropagation(); idx = (idx - 1 + items.length) % items.length; show(idx); });
        close.addEventListener('click', hide);
        lb.addEventListener('click', (e) => { if(e.target === lb) hide(); });

        // Touch Swipe
        let tx = 0;
        lb.addEventListener('touchstart', e => tx = e.touches[0].clientX);
        lb.addEventListener('touchend', e => {
            let diff = tx - e.changedTouches[0].clientX;
            if(Math.abs(diff) > 50) {
                if(diff > 0) idx = (idx + 1) % items.length; // Swipe Left -> Next
                else idx = (idx - 1 + items.length) % items.length; // Swipe Right -> Prev
                show(idx);
            }
        });
    }
});
