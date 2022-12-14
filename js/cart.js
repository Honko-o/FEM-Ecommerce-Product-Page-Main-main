// Counter Logic
const cartNumber = document.querySelector('.cart-number'),
  decreaseCartAmountIcon = document.querySelector('.remove-icon'),
  increaseCartAmountIcon = document.querySelector('.plus-icon');
let cartAmountValue = document.querySelector('.product_amount');

const changeCounter = (type) => {
  if (type === 'increment' && +cartAmountValue.innerText >= 0) {
    +cartAmountValue.innerText++;
  } else if (type === 'decrement' && +cartAmountValue.innerText >= 1) {
    +cartAmountValue.innerText--;
  }
};

const updateCartItemsCount = () =>
  (cartNumber.innerText = document.querySelectorAll('.cart_product').length);

// Event Listeners
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
  if (!event.target.classList.contains('cart_details')) {
    cartDetailsBox.style.display = 'none';
  }
});

// Start Cart Logic
const cartProductWrapper = document.querySelector('.cart_product_wrapper');
const cartProductContainer = document.querySelector('.cart_product_container');
const addCartButton = document.querySelector('.add_cart_button');
const removeCartItemIcons = document.querySelectorAll('.delete-icon');
const productType = document.querySelector('product_type');
const productPrice = document.querySelector('.price');

// Display none by default until click on cart Icon happen
cartDetailsBox.style.display = 'none';

const isCartEmpty = () => {
  if (cartProductContainer.children.length === 0) {
    return true;
  } else {
    return false;
  }
};

const createCheckoutBtn = () => {
  const checkoutButton = document.querySelector('.checkout-btn');
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
};

const createEmptyMessage = () => {
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
    if (messageEmpty) messageEmpty.remove();

    createCheckoutBtn();
  }
};

const createCartItem = () => {
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
  cartProductAmount.innerHTML = `x ${cartAmountValue.innerHTML} `;
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
const addCheckoutButtonOrMessage = () => {};

// To Initalize the Message if There is no Cart Items
createEmptyMessage();

addCartButton.addEventListener('click', () => {
  if (+cartAmountValue.innerHTML === 0) {
    return false;
  }
  createCartItem();
  createEmptyMessage();
  updateCartItemsCount();
  cartAmountValue.innerText = '0';
});

cartDetailsBox.addEventListener('click', (event) => {
  // Remove Cart Item
  if (
    event.target.tagName.toLowerCase() === 'img' &&
    event.target.parentElement.classList.contains('delete-icon')
  ) {
    event.target.parentElement.parentElement.remove();
    createEmptyMessage();
    updateCartItemsCount();
  }
  // To Stop The Cart Box From Hide
  event.stopPropagation();
});
