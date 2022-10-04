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
            'url("./assets/images/icon-close.svg")';
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
