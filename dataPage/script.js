// Fetch data when the page loads();
document.addEventListener('DOMContentLoaded', getData);
function onclickHamburger() {
    let sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');
}

const loader = document.getElementById('loader');
// Variables to track the current booking item and its type
let currentBookingItem = null;
let currentBookingType = null;

async function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');

    if (city) {
        console.log('City from URL:', city);

        // Check localStorage for preloaded data
        const cachedCityData = localStorage.getItem(city);
        if (cachedCityData) {
            console.log('Using cached data for city:', city);
            populateData(JSON.parse(cachedCityData));
            return;
        }

        // Fetch data if not cached
        try {
            loader.style.display = 'flex';
            let response = await fetch(`https://false-vivid-feta.glitch.me/${city}`);
            let result = await response.json();
            console.log('Fetched data for city:', result);

            // Cache city-specific data
            localStorage.setItem(city, JSON.stringify(result));
            populateData(result);
        } catch (error) {
            console.error('Error fetching data for city:', city, error);
        } finally {
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    } else {
        console.error('City parameter not found in URL');
    }
}

function populateData(data) {
    getButtons(data);
    if (data.Resturants) {
        loadRestaurants(data.Resturants);
    }
}

let dynamicTitle = document.getElementById('dynamicTitle');

function getButtons(res) {
    let btnContainer = document.getElementById('btnContainer');
    btnContainer.innerHTML = ''; // Clear previous buttons

    for (let key in res) {
        let btn = document.createElement('button');
        btn.textContent = key;
        btn.setAttribute('id', `${key}-btn`);
        btnContainer.appendChild(btn);

        btn.addEventListener('click', () => {
            if (key === 'Resturants') {
                dynamicTitle.textContent = 'Search Places to eat';
                loadRestaurants(res[key]);
            };
            if (key === 'Hotels') {
                dynamicTitle.textContent = 'Stay somewhere great';
                loadHotels(res[key]);
            };
            if (key === 'Places') {
                dynamicTitle.textContent = 'EXPLORE & DO something fun';
                loadPlaces(res[key]);
            }
        });
    }
}

function loadRestaurants(items) {
    let contentContainer = document.getElementById('dataContainer');
    contentContainer.innerHTML = '';

    items.forEach((item) => {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item-Container';

        let imageCarousel = document.createElement('div');
        imageCarousel.className = 'imageCarousel owl-carousel';

        item.photos.forEach((photo) => {
            let imgElement = document.createElement('img');
            imgElement.src = photo;
            imgElement.alt = item.name || 'Image';
            imageCarousel.appendChild(imgElement);
        });

        let detailsDiv = document.createElement('div');
        detailsDiv.innerHTML = `
            <span>Name: ${item.name || 'No name available'}</span>
            <span>Cuisines: ${item.cuisines || 'No cuisines available'}</span>
            <span>Address: ${item.address.fullAddress || 'No address available'}</span>
            <span>Rating & Reviews: ${item.rating || 'N/A'} & ${item.reviewsCount || 'N/A'} reviews</span>
            <span>Contacts: ${item.telephone || 'No contact available'}</span>
        `;

        let btnContainer = document.createElement('div');
        btnContainer.className = 'btnContainer';
        let bookButton = document.createElement('button');
        bookButton.textContent = 'BOOK NOW';
        bookButton.addEventListener('click', function () {
            currentBookingItem = item;
            currentBookingType = 'restaurant';
            openModal('Booking Confirmation', 'Do you want to proceed with your booking?');
        });
        // let checkListButton = document.createElement('button');
        // checkListButton.textContent = 'Add to Checklist';
        btnContainer.appendChild(bookButton);
        // btnContainer.appendChild(checkListButton);

        itemDiv.appendChild(imageCarousel);
        itemDiv.appendChild(detailsDiv);
        itemDiv.appendChild(btnContainer);
        contentContainer.appendChild(itemDiv);
    });

    $('.owl-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        margin: 10,
        nav: true,
    });
}

function loadHotels(items) {
    let contentContainer = document.getElementById('dataContainer');
    contentContainer.innerHTML = '';

    items.forEach((item) => {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item-Container';

        let imageCarousel = document.createElement('div');
        imageCarousel.className = 'imageCarousel owl-carousel';

        item.photos.forEach((photo) => {
            let imgElement = document.createElement('img');
            imgElement.src = photo;
            imgElement.alt = item.name || 'Image';
            imageCarousel.appendChild(imgElement);
        });

        let detailsDiv = document.createElement('div');
        detailsDiv.innerHTML = `
            <span>Name: ${item.name || 'No name available'}</span>
            <span>Cuisines: ${item.cuisines || 'No cuisines available'}</span>
            <span>Address: ${item.address.fullAddress || 'No address available'}</span>
            <span>Rating & Reviews: ${item.rating || 'N/A'} & ${item.reviewsCount || 'N/A'} reviews</span>
            <span>Contacts: ${item.telephone || 'No contact available'}</span>
        `;

        let btnContainer = document.createElement('div');
        btnContainer.className = 'btnContainer';
        let bookButton = document.createElement('button');
        bookButton.textContent = 'BOOK NOW';
        bookButton.addEventListener('click', function () {
            currentBookingItem = item;
            currentBookingType = 'hotel';
            openModal('Booking Confirmation', 'Do you want to proceed with your booking?');
        });
        // let checkListButton = document.createElement('button');
        // checkListButton.textContent = 'Add to Checklist';
        btnContainer.appendChild(bookButton);
        // btnContainer.appendChild(checkListButton);

        itemDiv.appendChild(imageCarousel);
        itemDiv.appendChild(detailsDiv);
        itemDiv.appendChild(btnContainer);
        contentContainer.appendChild(itemDiv);
    });

    $('.owl-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        margin: 10,
        nav: true,
    });
}

function loadPlaces(items) {
    let contentContainer = document.getElementById('dataContainer');
    contentContainer.innerHTML = '';

    items.forEach((item) => {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'item-Container';

        let imageCarousel = document.createElement('div');
        imageCarousel.className = 'imageCarousel owl-carousel';

        item.photos.forEach((photo) => {
            let imgElement = document.createElement('img');
            imgElement.src = photo;
            imgElement.alt = item.title || 'Image';
            imageCarousel.appendChild(imgElement);
        });

        let detailsDiv = document.createElement('div');
        detailsDiv.innerHTML = `
            <span>Title: ${item.title || 'No name available'}</span>
            <span>Operator: ${item.operator}</span>
            
            <span>Cuisines: ${item.languages || 'No cuisines available'}</span>
            <span>Address: ${item.category || 'No address available'}</span>
            <span>Cancellation: ${item.cancellation}</span>
            <span>Rating & Reviews: ${item.rating || 'N/A'} & ${item.reviewsCount || 'N/A'} reviews</span>
            <span>Contacts: ${item.telephone || 'No contact available'}</span>
        `;

        let btnContainer = document.createElement('div');
        btnContainer.className = 'btnContainer';
        let bookButton = document.createElement('button');
        bookButton.textContent = 'BOOK NOW';
        bookButton.addEventListener('click', function () {
            currentBookingItem = item;
            currentBookingType = 'place';
            openModal('Booking Confirmation', 'Do you want to proceed with your booking?');
        });
        // let checkListButton = document.createElement('button');
        // checkListButton.textContent = 'Add to Checklist';
        btnContainer.appendChild(bookButton);
        // btnContainer.appendChild(checkListButton);

        itemDiv.appendChild(imageCarousel);
        itemDiv.appendChild(detailsDiv);
        itemDiv.appendChild(btnContainer);
        contentContainer.appendChild(itemDiv);
    });

    $('.owl-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        margin: 10,
        nav: true,
    });
}

// Modal Elements
const modal = document.getElementById('modalContainer');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const closeModal = document.querySelector('.close');
const confirmMessage = document.getElementById('bookingconfrimMessage');

function openModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function closeModalFunc() {
    modal.style.display = 'none';
    currentBookingItem = null;
    currentBookingType = null;
    document.getElementById('date').value = ''; // Reset date input
}

// Confirm Booking
confirmBtn.addEventListener('click', () => {
    const date = document.getElementById('date').value;
    if (!date) {
        alert("Please select a date before confirming.");
        return;
    }
    // if (!currentBookingItem || !currentBookingType) {
    //     alert("No booking item selected.");
    //     return;
    // }

    const booking = {
        item: currentBookingItem,
        date: date,
        type: currentBookingType
    };

    // Retrieve and update bookings
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    existingBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    // Show confirmation
    confirmMessage.style.display = 'inline';
    confirmMessage.textContent = `Booking confirmed for ${currentBookingItem.name || currentBookingItem.title} on ${date}!`;
    confirmMessage.style.color = "green";

    setTimeout(() => {
        confirmMessage.style.display = 'block';
        closeModalFunc();
    },0);
});

closeModal.addEventListener('click', closeModalFunc);
cancelBtn.addEventListener('click', closeModalFunc);
window.addEventListener('click', (event) => {
    if (event.target === modal) closeModalFunc();
});

// Checklist Modal Handling (unchanged from previous code)
// ... [Keep the existing checklist modal code as is] 


// // ADD TO CHECKLIST MODAL
// // Modal Elements
// const checklistModal = document.getElementById('checklistModalContainer');
// const checklistModalTitle = document.getElementById('checklistModalTitle');
// const checklistModalMessage = document.getElementById('checklistModalMessage');
// const checklistConfirmBtn = document.getElementById('checklistConfirmBtn');
// const checklistCancelBtn = document.getElementById('checklistCancelBtn');
// const checklistCloseModal = document.querySelector('#checklistModalContainer .close');
// const checklistConfirmMessage = document.getElementById('checklistconfrimMessage');

// // Open Modal Function
// function openChecklistModal(title, message) {
//     checklistModalTitle.textContent = title;
//     checklistModalMessage.textContent = message;
//     checklistModal.style.display = 'none';
// }

// // Close Modal Function
// function closeChecklistModalFunc() {
//     checklistModal.style.display = 'none';
// }

// // Attach event listeners to all "Add to Checklist" buttons
// document.addEventListener('click', (event) => {
//     if (event.target.textContent.trim() === 'Add to Checklist') {
//         openChecklistModal('ADD TO CHECKLIST', 'Do you want to proceed?');
//     }
// });

// // Attach Confirm Button Event Listener
// checklistConfirmBtn.addEventListener('click', () => {
//     checklistConfirmMessage.style.display = 'inline';
//     checklistConfirmMessage.textContent = `Successfully added to checklist.`;
//     checklistConfirmMessage.style.color = "green";
    
//     setTimeout(() => {
//         checklistConfirmMessage.style.display = 'none';
//     }, 6000);

//     // Close modal after showing the confirmation message
//     setTimeout(closeChecklistModalFunc, 0);
// });

// // Close modal events
// checklistCloseModal.addEventListener('click', closeChecklistModalFunc);
// checklistCancelBtn.addEventListener('click', closeChecklistModalFunc);
// window.addEventListener('click', (event) => {
//     if (event.target === checklistModal) closeChecklistModalFunc();
// });




// Hotels Confrim
let title = document.getElementById('title')
function bookNow(item){
    title.value = item.name
}
function confrimTrip(){
    // date.value=""
    let date = document.getElementById('date').value;

    if (!date) {
        alert("Please select a date before confirming.");
        return;
    }
    let newBooking = {
        restaurant: title.value,
        date: date
    };

    // Retrieve existing bookings from localStorage
    let existingBookings = JSON.parse(localStorage.getItem('Booked')) || [];

    // Ensure it's an array
    if (!Array.isArray(existingBookings)) {
        existingBookings = [];
    }

    // Add the new booking to the array
    existingBookings.push(newBooking);

    // Save updated bookings back to localStorage
    localStorage.setItem('Resturants', JSON.stringify(existingBookings));
    setTimeout(closeModalFunc, 0);
    
}


function bookHotelNow(item){
    title.value = item.name
}
function confrimTrip(){
    // date.value=""
    let date = document.getElementById('date').value;

    if (!date) {
        alert("Please select a date before confirming.");
        return;
    }
    let newBooking = {
        hotel: title.value,
        date: date
    };

    // Retrieve existing bookings from localStorage
    let existingBookings = JSON.parse(localStorage.getItem('Hotels')) || [];

    // Ensure it's an array
    if (!Array.isArray(existingBookings)) {
        existingBookings = [];
    }

    // Add the new booking to the array
    existingBookings.push(newBooking);

    // Save updated bookings back to localStorage
    localStorage.setItem('Hotels', JSON.stringify(existingBookings));
    setTimeout(closeModalFunc, 0);
    
}
function bookTravelNow(item){
    console.log(item)
    title.value = item.title
    console.log(item)
}
function confrimTrip(){
    // date.value=""
    let date = document.getElementById('date').value;

    if (!date) {
        alert("Please select a date before confirming.");
        return;
    }
    let newBooking = {
        travel: title.value,
        date: date
    };

    // Retrieve existing bookings from localStorage
    let existingBookings = JSON.parse(localStorage.getItem('Travel')) || [];

    // Ensure it's an array
    if (!Array.isArray(existingBookings)) {
        existingBookings = [];
    }

    // Add the new booking to the array
    existingBookings.push(newBooking);

    // Save updated bookings back to localStorage
    localStorage.setItem('Travel', JSON.stringify(existingBookings));
    setTimeout(closeModalFunc, 0);
    
}