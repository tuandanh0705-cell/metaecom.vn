document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Effect on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position to account for fixed navbar height
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Mobile Menu Toggle (Basic setup)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // Note: In a full app, you would toggle a class to show/hide the menu
            // and add specific CSS for the mobile state.
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            }
        });
    }

    // 4. Award Slider Center Effect
    function updateCenterCard() {
        const slider = document.querySelector('.award-slider');
        if(!slider) return;
        
        const cards = slider.querySelectorAll('.award-card');
        const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;

        let closestCard = null;
        let minDistance = Infinity;

        cards.forEach(card => {
            // Tọa độ tương đối của thẻ so với thanh trượt
            const cardCenter = card.offsetLeft + card.clientWidth / 2 - slider.offsetLeft;
            const distance = Math.abs(sliderCenter - cardCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });

        cards.forEach(card => card.classList.remove('active-center'));
        if (closestCard) {
            closestCard.classList.add('active-center');
        }
    }

    const awardSlider = document.querySelector('.award-slider');
    if(awardSlider) {
        awardSlider.addEventListener('scroll', updateCenterCard);
        window.addEventListener('resize', updateCenterCard);
        // Chạy lần đầu sau khi DOM render xong
        setTimeout(updateCenterCard, 200);
        
        // Căn giữa thẻ thứ 3 ngay khi tải trang (hiệu ứng Novaon)
        setTimeout(() => {
            const cards = awardSlider.querySelectorAll('.award-card');
            if(cards.length >= 3) {
                const centerCard = cards[2];
                awardSlider.scrollTo({
                    left: centerCard.offsetLeft - awardSlider.clientWidth/2 + centerCard.clientWidth/2 - awardSlider.offsetLeft,
                    behavior: 'smooth'
                });
            }
        }, 500);
    }

    // 5. Expert Slider Navigation
    const expertSlider = document.getElementById('expertSlider');
    const expertPrevBtn = document.querySelector('.slider-btn.prev-btn');
    const expertNextBtn = document.querySelector('.slider-btn.next-btn');

    if (expertSlider && expertPrevBtn && expertNextBtn) {
        const getScrollAmount = () => {
            const card = expertSlider.querySelector('.expert-card');
            // Cuộn 1 lượng bằng chiều rộng thẻ + gap (2.5rem ~ 40px)
            return card ? card.offsetWidth + 40 : 320; 
        };

        expertNextBtn.addEventListener('click', () => {
            expertSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        expertPrevBtn.addEventListener('click', () => {
            expertSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

});
