window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
});

setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader && preloader.style.display !== "none") {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }
}, 3000);

document.addEventListener("DOMContentLoaded", () => {
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
                document.body.style.overflow = "hidden";
            } else {
                if (window.scrollY <= 50) {
                    header.classList.remove("scrolled");
                }
                document.body.style.overflow = "auto";
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
                if (lightboxImg) lightboxImg.src = imageArray[currentIndex];
                if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";
            });
        });

        const updateL = () => {
            if (lightboxImg) lightboxImg.src = imageArray[currentIndex];
            if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
        };

        if (closeBtn) closeBtn.addEventListener("click", () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
        });
        
        if (nextBtn) nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % imageArray.length;
            updateL();
        });
        
        if (prevBtn) prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
            updateL();
        });

        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") {
                lightbox.classList.remove("active");
                document.body.style.overflow = "auto";
            }
            if (e.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % imageArray.length;
                updateL();
            }
            if (e.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
                updateL();
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in-up").forEach(el => observer.observe(el));
});
