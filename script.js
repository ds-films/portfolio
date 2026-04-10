document.addEventListener("DOMContentLoaded", () => {
    
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        if (preloader) {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }
    });

    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    });

    const burger = document.querySelector(".burger");
    const navMenu = document.querySelector(".nav-menu");
    if (burger && navMenu) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            if (navMenu.classList.contains("active")) {
                header.classList.add("scrolled");
            } else if (window.scrollY <= 50) {
                header.classList.remove("scrolled");
            }
        });
    }

    const slides = document.querySelectorAll(".hero-slide");
    let currentSlide = 0;
    
    if (slides.length > 1) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 5000);
    }

    const galleryImages = document.querySelectorAll(".gallery-item img");
    const lightbox = document.getElementById("lightbox");
    
    if (galleryImages.length > 0 && lightbox) {
        const lightboxImg = document.getElementById("lightbox-img");
        const lightboxCounter = document.getElementById("lightbox-counter");
        const closeBtn = document.querySelector(".lightbox-close");
        const prevBtn = document.querySelector(".lightbox-prev");
        const nextBtn = document.querySelector(".lightbox-next");

        let currentIndex = 0;
        let imageArray = [];

        galleryImages.forEach((img, index) => {
            imageArray.push(img.src);
            img.addEventListener("click", () => {
                currentIndex = index;
                updateLightbox();
                lightbox.classList.add("active");
            });
        });

        function updateLightbox() {
            if (lightboxImg) lightboxImg.src = imageArray[currentIndex];
            if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
        }

        function closeLightbox() {
            lightbox.classList.remove("active");
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % imageArray.length;
            updateLightbox();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
            updateLightbox();
        }

        if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
        if (nextBtn) nextBtn.addEventListener("click", showNext);
        if (prevBtn) prevBtn.addEventListener("click", showPrev);

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
        });
    }
});
