// Initialize Lightbox Thumbnails Background For Active Element
document.querySelector('.lightbox [data-active=true]').style.backgroundColor =
    '#fff';
// Product Images + Lightbox Images
const productImages = Array.from(
        document.querySelectorAll('.product .image-container img')
    ),
    lightboxImages = Array.from(
        document.querySelectorAll('.lightbox .image-container img')
    ),
    productImageContainers = Array.from(
        document.querySelectorAll('.product .image-container')
    ),
    lightboxImageContainers = Array.from(
        document.querySelectorAll('.lightbox .image-container')
    ),
    IMAGES_PATH = [
        '../assets/images/image-product-1.jpg',
        '../assets/images/image-product-2.jpg',
        '../assets/images/image-product-3.jpg',
        '../assets/images/image-product-4.jpg',
    ];

let productImagePreview = document.querySelector('.product .image-preview img'),
    lightboxImagePreview = document.querySelector(
        '.lightbox .image-preview img'
    );

const removeActive = (elements, type = 'element_class') => {
    if (type === 'element_class') {
        elements.forEach((element) => element.classList.remove('active'));
    } else if (type === 'data_active') {
        elements.forEach((element) =>
            element.setAttribute('data-active', false)
        );
    }
};

// START Big Image Preview Change Logic
productImages.forEach((img, index) => {
    img.addEventListener('click', (event) => {
        if (!event.currentTarget.classList.contains('active')) {
            removeActive(productImages);
            removeActive(productImageContainers, 'data_active');
            // console.log()

            productImagePreview.src = IMAGES_PATH[index];
            event.currentTarget.classList.add('active');
            event.currentTarget.parentElement.setAttribute('data-active', true);
            event.currentTarget.parentElement.style.backgroundColor = '#fff';
        } else {
            event.currentTarget.parentElement.style.removeProperty(
                'background-color'
            );
        }
    });
});
lightboxImages.forEach((img, index) => {
    img.addEventListener('click', (event) => {
        if (!event.currentTarget.classList.contains('active')) {
            removeActive(lightboxImages);
            removeActive(lightboxImageContainers, 'data_active');
            // console.log()

            lightboxImagePreview.src = IMAGES_PATH[index];
            event.currentTarget.classList.add('active');
            event.currentTarget.parentElement.setAttribute('data-active', true);
            event.currentTarget.parentElement.style.backgroundColor = '#fff';
        } else {
            event.currentTarget.parentElement.style.removeProperty(
                'background-color'
            );
        }
    });
});
// Lightbox Previous/Next Logic
const productNextIcon = document.querySelector('.product .icon-next'),
    productPrevIcon = document.querySelector('.product .icon-previous'),
    lightboxNextIcon = document.querySelector('.lightbox .icon-next'),
    lightboxPrevIcon = document.querySelector('.lightbox .icon-previous');

// imageContainers Needed for Data Index
const nextImage = (type) => {
    // 2 Types => product | lightbox for reusability purpose
    const activeImage = document.querySelector(`.${type} .active`);
    let activeIndex = activeImage.parentElement.dataset.index;

    if (type === 'product') {
        if (activeIndex < productImageContainers.length - 1) {
            activeIndex++;
            productImages[activeIndex].click();
        }
    } else if (type === 'lightbox') {
        if (activeIndex < productImageContainers.length - 1) {
            activeIndex++;
            lightboxImages[activeIndex].click();
        }
    }
};
const prevImage = (type) => {
    // 2 Types => product | lightbox for reusability purpose
    const activeImage = document.querySelector(`.${type} .active`);
    let activeIndex = activeImage.parentElement.dataset.index;
    if (type === 'product') {
        if (activeIndex > 0) {
            activeIndex--;
            productImages[activeIndex].click();
        }
    } else if (type === 'lightbox') {
        if (activeIndex > 0) {
            activeIndex--;
            lightboxImages[activeIndex].click();
        }
    }
};
const hideLightboxOverlay = () => {
    lightbox.classList.remove('active');
    overlay.classList.remove('active');
};
const showLightboxOverlay = () => {
    lightbox.classList.add('active');
    overlay.classList.add('active');
};

productNextIcon.addEventListener('click', () => nextImage('product'));
productPrevIcon.addEventListener('click', () => prevImage('product'));
lightboxNextIcon.addEventListener('click', () => nextImage('lightbox'));
lightboxPrevIcon.addEventListener('click', () => prevImage('lightbox'));
// END Big Image Preview Change Logic

const lightbox = document.querySelector('.lightbox');

// Make Sure No Click Allowed on Navbar Toggler when Lightbox is shown
productImagePreview.addEventListener('click', () => showLightboxOverlay());

// Close Lightbox with Close Icon
const closeIcon = document.querySelector('.icon-close');
closeIcon.addEventListener('click', () => hideLightboxOverlay());

// Make Sure overlay goes when Resize Below
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) hideLightboxOverlay();
});
// Hide Overlay, Navbar Menu And Lightbox When Clicking on Overlay
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('overlay')) {
        menu.classList.remove('active');
        hideLightboxOverlay();
        // Convert Menu Close Icon to Menu Icon
        navbarTogglerIcon.style.removeProperty('background-image');
    }
});
