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
});
