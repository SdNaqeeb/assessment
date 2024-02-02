// Function to handle "Add to Cart" button click
function addToCart() {
    const selectedColor = document.getElementById('colorSelector').value;
    const selectedSize = document.getElementById('sizeSelector').value;
    const selectedQuantity = document.getElementById('quantitySelector').value;

    const addToCartMessage = `Added to Cart: ${selectedQuantity} ${selectedColor} - Size ${selectedSize}`;
    document.getElementById('addToCartMessage').innerText = addToCartMessage;
}

// Function to create and append option elements to a selector
function populateSelector(selector, options) {
    options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.innerText = option;
        selector.appendChild(optionElement);
    });
}

// Function to populate the page with dummy data
function populateProductPage() {
    const dummyData = {
        productImage: 'https://via.placeholder.com/400',
        productVendor: 'Example Vendor',
        productTitle: 'Example Product',
        price: 50,
        compareAtPrice: 100,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla, sem vel pellentesque ultrices, ligula dui fringilla quam.',
        variants: [
            { color: 'Red', size: 'Small' },
            { color: 'Blue', size: 'Medium' },
            { color: 'Green', size: 'Large' },
        ]
    };

    // Update the DOM with dummy data
    document.getElementById('productImage').src = dummyData.productImage;
    document.getElementById('productVendor').innerText = dummyData.productVendor;
    document.getElementById('productTitle').innerText = dummyData.productTitle;
    document.getElementById('price').innerText = `Price: $${dummyData.price}`;
    document.getElementById('compareAtPrice').innerText = `Compare at Price: $${dummyData.compareAtPrice}`;
    
    // Populate color and size selectors
    const colorSelector = document.getElementById('colorSelector');
    const sizeSelector = document.getElementById('sizeSelector');

    populateSelector(colorSelector, dummyData.variants.map((variant) => variant.color));
    populateSelector(sizeSelector, dummyData.variants.map((variant) => variant.size));
}

// Call the function to populate the page on load
populateProductPage();
// Function to handle "Add to Cart" button click
function addToCart() {
    const selectedColor = document.querySelector('.color-selector').value;
    const selectedSize = document.querySelector('.size-selector').value;
    const selectedQuantity = document.querySelector('.quantity-selector').value;

    const addToCartMessage = `Added to Cart: ${selectedQuantity} ${selectedColor} - Size ${selectedSize}`;
    document.querySelector('.add-to-cart-message').innerText = addToCartMessage;
}

// Function to create and append option elements to a selector
function populateSelector(selector, options) {
    options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.innerText = option;
        selector.appendChild(optionElement);
    });
}

// Function to populate the page with product data from the API
async function populateProductPage() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json');
        const data = await response.json();

        // Update the DOM with data from the API
        document.querySelector('.product-image img').src = data.productImage;
        document.querySelector('.product-title').innerText = data.productTitle;
        document.querySelector('.product-vendor').innerText = data.productVendor;
        document.querySelector('.product-price').innerText = `Price: $${data.price}`;
        document.querySelector('.product-compare-price').innerText = `Compare at Price: $${data.compareAtPrice}`;

        // Populate color, size selectors, and thumbnails
        const colorSelector = document.querySelector('.color-selector');
        const sizeSelector = document.querySelector('.size-selector');
        const thumbnailsContainer = document.querySelector('.thumbnails');

        populateSelector(colorSelector, data.variants.map((variant) => variant.color));
        populateSelector(sizeSelector, data.variants.map((variant) => variant.size));

        data.variants.forEach((variant) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = data.productImage; // Assuming the same image for all thumbnails
            thumbnail.alt = variant.color;
            thumbnail.addEventListener('click', () => changeThumbnail(variant.color));
            thumbnailsContainer.appendChild(thumbnail);
        });

        // Calculate and display percentage off
        const percentageOff = ((data.compareAtPrice - data.price) / data.compareAtPrice) * 100;
        document.querySelector('.product-percentage-off').innerText = `Percentage Off: ${percentageOff.toFixed(2)}%`;

        // Populate description
        document.querySelector('.product-description p').innerText = data.description;
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

// Function to change the main product image when a thumbnail is clicked
function changeThumbnail(color) {
    // Assuming the product images have different URLs for each color
    // Replace 'data.productImages[color]' with the actual property name from the API response
    document.querySelector('.product-image img').src = data.productImages[color];
}

// Call the function to populate the page on load
populateProductPage();
