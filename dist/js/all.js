// Counter Logic
const cartNumber = document.querySelector('.cart-number'),
    decreaseCartAmountIcon = document.querySelector('.remove-icon'),
    increaseCartAmountIcon = document.querySelector('.plus-icon');
let productAmountValue = document.querySelector('.product_amount');

const changeCounter = (type) => {
    if (type === 'increment' && +productAmountValue.innerText >= 0) {
        +productAmountValue.innerText++;
    } else if (type === 'decrement' && +productAmountValue.innerText >= 1) {
        +productAmountValue.innerText--;
    }
};

const updateCartItemsCount = () => {
    cartNumber.innerText = document.querySelectorAll('.cart_product').length;
};

decreaseCartAmountIcon.addEventListener('click', () =>
    changeCounter('decrement')
);
increaseCartAmountIcon.addEventListener('click', () =>
    changeCounter('increment')
);

// Show Cart Box Details
const cartIcon = document.querySelector('.cart-icon');
const cartDetailsBox = document.querySelector('.cart_details');

cartIcon.addEventListener('click', (event) => {
    cartDetailsBox.style.display = 'block';
    event.stopPropagation();
});

document.addEventListener('click', (event) => {
    if (
        !event.target.classList.contains('cart_details') ||
        !event.target.classList.contains('cart-icon')
    ) {
        cartDetailsBox.style.display = 'none';
    }
});

// Toggle Menu Logic
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarTogglerIcon = document.querySelector('.navbar-toggler-icon');
const menu = document.querySelector('.navbar-collapse');
const overlay = document.querySelector('.overlay');

navbarToggler.addEventListener('click', () => {
    if (menu.classList.contains('active')) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        // The Close Icon Convert to Menu Icon
        navbarTogglerIcon.style.removeProperty('background-image');
    } else {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        navbarTogglerIcon.style.backgroundImage =
            'url("../assets/images/icon-close.svg")';
    }
});

// Start Cart Logic
const cartProductWrapper = document.querySelector('.cart_product_wrapper');
const cartProductContainer = document.querySelector('.cart_product_container');
const addCartButton = document.querySelector('.add_cart_button');
const removeCartItemIcons = document.querySelectorAll('.delete-icon');
const productType = document.querySelector('product_type');
const productPrice = document.querySelector('.price');

const cartProductWrapperHeight = cartProductWrapper.offsetHeight;
cartDetailsBox.style.display = 'none';

const isCartEmpty = () => {
    if (cartProductContainer.children.length === 0) {
        return true;
    } else {
        return false;
    }
};
const createCartItem = () => {
    if (+productAmountValue.innerHTML === 0) {
        return false;
    }
    const cartProduct = document.createElement('div'),
        cartProductImage = document.createElement('img'),
        cartInfo = document.createElement('div'),
        cartDeleteIcon = document.createElement('div'),
        cartDeleteIconImg = document.createElement('img'),
        cartInfoProductType = document.createElement('span'),
        cartProductPriceInfo = document.createElement('p'),
        cartProductPrice = document.createElement('span'),
        cartProductAmount = document.createElement('span'),
        cartTotalPrice = document.createElement('span');

    const activeImageThumbnail = document.querySelector(
            '.product .images-thumbnails img.active'
        ),
        productType = document.querySelector('.product_type');

    cartProduct.classList.add(
        'cart_product',
        'd-flex',
        'justify-content-between',
        'align-items-center',
        'mb-3'
    );
    cartProductImage.classList.add('me-3', 'rounded-3');
    cartInfo.classList.add('cart_info', 'flex-wrap', 'd-flex');
    cartDeleteIcon.classList.add('delete-icon');

    cartInfoProductType.classList.add('cart_product_type', 'w-100');
    cartProductPriceInfo.classList.add('cart_product_price_info', 'me-2');
    cartProductPrice.classList.add('cart_product_price');
    cartProductAmount.classList.add('cart_product_amount');
    cartTotalPrice.classList.add('cart_total_price', 'fw-bold');

    cartProductImage.src = activeImageThumbnail.src;
    cartProductImage.alt = activeImageThumbnail.alt;
    cartDeleteIconImg.src = './assets/images/icon-delete.svg';
    cartDeleteIconImg.alt = 'icon delete';

    cartInfoProductType.innerText = productType.innerText;
    cartProductPrice.innerHTML = `${productPrice.innerHTML} `;
    cartProductAmount.innerHTML = `x ${productAmountValue.innerHTML} `;
    cartTotalPrice.innerHTML = `&#36;${(
        parseInt(productPrice.innerText.slice(1)) *
        parseInt(cartProductAmount.innerText.slice(1))
    ).toFixed(2)}`;

    console.log(isCartEmpty());

    cartProductPriceInfo.append(cartProductPrice, cartProductAmount);
    cartInfo.append(cartInfoProductType, cartProductPriceInfo, cartTotalPrice);
    cartDeleteIcon.append(cartDeleteIconImg);
    cartProduct.append(cartProductImage, cartInfo, cartDeleteIcon);

    cartProductContainer.appendChild(cartProduct);
};
const addCheckoutButtonOrMessage = () => {
    if (isCartEmpty()) {
        const messageForEmptyCart = document.createElement('p'),
            checkoutButton = document.querySelector('.checkout-btn');

        messageForEmptyCart.innerText = 'Your Cart is Empty';
        messageForEmptyCart.classList.add('message-empty');

        cartProductWrapper.style.height = '178px';
        cartProductWrapper.appendChild(messageForEmptyCart);
        // Make Sure Element Exist So There is no Error
        if (checkoutButton !== null) {
            checkoutButton.remove();
        }
    } else {
        const messageEmpty = document.querySelector('.message-empty');
        const checkoutButton = document.querySelector('.checkout-btn');
        if (messageEmpty) messageEmpty.remove();

        // Make Sure to Make no Duplicate Checkout Button
        if (checkoutButton === null) {
            const newCartCheckoutButton = document.createElement('button');
            newCartCheckoutButton.classList.add(
                'checkout-btn',
                'btn',
                'd-flex',
                'gap-2',
                'justify-content-center',
                'align-items-center',
                'py-3',
                'rounded-3',
                'w-100',
                'text-white',
                'fw-bold'
            );
            newCartCheckoutButton.innerText = 'Checkout';
            cartProductWrapper.style.removeProperty('height');
            cartProductWrapper.appendChild(newCartCheckoutButton);
        }
    }
};

// To Initalize the Message if There is no Cart Items
addCheckoutButtonOrMessage();

addCartButton.addEventListener('click', () => {
    createCartItem();
    addCheckoutButtonOrMessage();
    updateCartItemsCount();
    productAmountValue.innerText = '0';
});
cartDetailsBox.addEventListener('click', (event) => {
    // Remove Cart Item
    if (
        event.target.tagName.toLowerCase() === 'img' &&
        event.target.parentElement.classList.contains('delete-icon')
    ) {
        event.target.parentElement.parentElement.remove();
        addCheckoutButtonOrMessage();
        updateCartItemsCount();
    }
    // To Stop The Cart Box From Hide
    event.stopPropagation();
});

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
        './assets/images/image-product-1.jpg',
        './assets/images/image-product-2.jpg',
        './assets/images/image-product-3.jpg',
        './assets/images/image-product-4.jpg',
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

//# sourceMappingURL=all.js.map
