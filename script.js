document.addEventListener('DOMContentLoaded', () => {
    // Greitas preloaderis be ilgo laukimo
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.onload = () => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 300);
        };
        setTimeout(() => preloader.style.display = 'none', 2000); // Apsauga
    }

    // Burger meniu
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

    // Headeris
    const header = document.querySelector('header');
    if(header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }, {passive: true});
    }

    // Lightbox Galerijai
    const items = document.querySelectorAll('.gallery-item img');
    if (items.length > 0) {
        const lb = document.createElement('div');
        lb.id = 'lightbox';
        lb.innerHTML = '<div class="lb-close">&times;</div><div class="lb-counter"></div><button class="lb-btn lb-prev">&#10094;</button><img src="" alt="Peržiūra"><button class="lb-btn lb-next">&#10095;</button>';
        document.body.appendChild(lb);

        const img = lb.querySelector('img'), cnt = lb.querySelector('.lb-counter');
        let idx = 0;

        const show = (i) => {
            idx = (i + items.length) % items.length;
            img.src = items[idx].src;
            cnt.textContent = `${idx + 1} / ${items.length}`;
            lb.classList.add('active');
            body.style.overflow = 'hidden';
        };

        const hide = () => { lb.classList.remove('active'); body.style.overflow = ''; };

        items.forEach((el, i) => el.parentNode.addEventListener('click', () => show(i)));
        lb.querySelector('.lb-close').onclick = hide;
        lb.querySelector('.lb-prev').onclick = (e) => { e.stopPropagation(); show(idx - 1); };
        lb.querySelector('.lb-next').onclick = (e) => { e.stopPropagation(); show(idx + 1); };
        lb.onclick = (e) => { if(e.target === lb) hide(); };
    }
});
