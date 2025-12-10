document.addEventListener("DOMContentLoaded", function() {
    
    // =========================================
    // 1. ANIMACIONES SCROLL (Reveal)
    // =========================================
    const reveals = document.querySelectorAll(".reveal");
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };
    
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Ejecutar una vez al inicio


    // =========================================
    // 2. NAVBAR CAMBIA DE COLOR
    // =========================================
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // =========================================
    // 3. MENÚ RESPONSIVO (MÓVIL)
    // =========================================
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.menu-group');
    const navLinks = document.querySelectorAll('.nav-link');

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('active');
            });
        });
    }


    // =========================================
    // 4. CARRUSEL AUTOMÁTICO Y LIGHTBOX
    // =========================================
    const track = document.querySelector('.carousel-track');
    
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        let currentIndex = 0;
        
        // Configuración Autoplay
        const autoPlayDelay = 3000; // 3 Segundos
        let autoPlayTimer;

        // Función para mover el carrusel
        const updateCarousel = () => {
            // Ancho de slide + gap (20px)
            const slideWidth = slides[0].getBoundingClientRect().width + 20; 
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        const moveToNext = () => {
            // Escritorio: 3 visibles | Móvil: 1 visible
            const itemsVisible = window.innerWidth > 768 ? 3 : 1;
            const maxIndex = slides.length - itemsVisible;

            if (currentIndex >= maxIndex) {
                currentIndex = 0; // Volver al inicio
            } else {
                currentIndex++;
            }
            updateCarousel();
        };

        const moveToPrev = () => {
            const itemsVisible = window.innerWidth > 768 ? 3 : 1;
            const maxIndex = slides.length - itemsVisible;

            if (currentIndex <= 0) {
                currentIndex = maxIndex; // Ir al final
            } else {
                currentIndex--;
            }
            updateCarousel();
        };

        // Eventos de botones (Flechas)
        nextButton.addEventListener('click', () => {
            moveToNext();
            resetTimer();
        });

        prevButton.addEventListener('click', () => {
            moveToPrev();
            resetTimer();
        });

        // Lógica de Autoplay
        const startAutoPlay = () => {
            autoPlayTimer = setInterval(moveToNext, autoPlayDelay);
        };

        const resetTimer = () => {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        };

        // Iniciar
        startAutoPlay();
        window.addEventListener('resize', updateCarousel);


        // --- LIGHTBOX (VER FOTO EN GRANDE) ---
        const lightboxModal = document.getElementById("lightbox-modal");
        const lightboxImg = document.getElementById("lightbox-img");
        const closeLightboxBtn = document.querySelector(".close-lightbox");
        const carouselImages = document.querySelectorAll(".carousel-img");

        carouselImages.forEach(img => {
            img.addEventListener('click', function() {
                clearInterval(autoPlayTimer); // Pausar carrusel
                lightboxModal.style.display = "flex";
                lightboxImg.src = this.src;
            });
        });

        const closeLightbox = () => {
            lightboxModal.style.display = "none";
            startAutoPlay(); // Reanudar carrusel
        };

        closeLightboxBtn.addEventListener('click', closeLightbox);
        
        // Cerrar al dar clic fuera de la imagen
        window.addEventListener('click', function(event) {
            if (event.target == lightboxModal) {
                closeLightbox();
            }
        });
    }


    // =========================================
    // 5. GESTIÓN DE MÚSICA Y PANTALLA DE ENTRADA (SPLASH SCREEN)
    // =========================================
    const splashScreen = document.getElementById('splash-screen');
    const enterBtn = document.getElementById('enter-site-btn');
    
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const playStatus = document.getElementById('play-status');
    const musicIcon = musicBtn ? musicBtn.querySelector('i') : null;

    // A. Lógica del Botón "ENTER SITE"
    if (enterBtn && bgMusic) {
        enterBtn.addEventListener('click', () => {
            // 1. Reproducir música (Permitido porque el usuario hizo clic)
            bgMusic.volume = 0.5; // Volumen al 50%
            
            bgMusic.play().then(() => {
                // Si la música arranca, actualizamos el botón flotante a "Pause"
                musicBtn.classList.add('playing');
                playStatus.textContent = "Pause";
                if(musicIcon) {
                   musicIcon.classList.remove('fa-music');
                   musicIcon.classList.add('fa-compact-disc');
                }
            }).catch(error => {
                console.log("Error al intentar reproducir audio:", error);
            });

            // 2. Desvanecer la pantalla negra
            if(splashScreen) {
                splashScreen.classList.add('hidden-splash');
            }
        });
    }

    // B. Lógica del Botón Flotante (Play/Pause manual)
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                // Si está pausado, reproducir
                bgMusic.play();
                musicBtn.classList.add('playing');
                playStatus.textContent = "Pause";
                if(musicIcon) {
                    musicIcon.classList.remove('fa-music');
                    musicIcon.classList.add('fa-compact-disc');
                }
            } else {
                // Si está sonando, pausar
                bgMusic.pause();
                musicBtn.classList.remove('playing');
                playStatus.textContent = "Play Music";
                if(musicIcon) {
                    musicIcon.classList.remove('fa-compact-disc');
                    musicIcon.classList.add('fa-music');
                }
            }
        });
    }

});