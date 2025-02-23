//SIDEBAR
function showSidebar() {
    let sidebar = document.getElementById('sidebar');
    if (sidebar.style.right === '0px') {
        sidebar.style.right = '-250px'; // Hide sidebar
    } else {
        sidebar.style.right = '0px'; // Show sidebar
    }
}

let dynamicTtile = document.getElementById('dynamicTtile')
//get Data From Local Storage
let bookings = JSON.parse(localStorage.getItem("bookings"));
console.log(bookings)
let dataContainer = document.getElementById("dataContainer")
function getResturants() {
    dataContainer.innerHTML = "";
    let hasData = false;

    bookings.forEach(object => {
        if (object.type === 'restaurant') {
            hasData = true;
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class='imageContainer'>
            <img src= '${object.item.thumbnail}'/>
            </div>
            <div class='detailsContainer'>
            <span>Restro Name:<b> ${object.item.name}</b></span>
            <span>Booked On: <b>${object.date}</b></span>
            <span>Payment: <b>${object.item.priceTypes}</b> </span>
            <span>Status: <b>${object.item.openStatusText}</b> </span>
            <span>Contact:  <b>${object.item.telephone}</b></span>
            </div>
            <div class='buttonContainer'>
                <button class='delete-btn'>Delete</button>
            </div>
            `;
            dataContainer.appendChild(itemDiv);
            itemDiv.querySelector(".delete-btn").onclick = () => deleteData(object);
        }
    });

    if (!hasData) {
        dataContainer.innerHTML = `<span>Currently, you don't have any restaurant bookings</span>`;
    }
}

function getHotels() {
    dataContainer.innerHTML = "";
    let hasData = false;

    bookings.forEach(object => {
        if (object.type === 'hotel') {
            hasData = true;
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class='imageContainer'>
            <img src= '${object.item.thumbnail}'/>
            </div>
            <div class='detailsContainer'>
            <span>Hotel: <b>${object.item.name}</b></span>
            <span>Booked On: <b>${object.date}</b></span>
            <span>Address: <b>${object.item.address.fullAddress}</b></span>
            <span>Price: <b>Min:${object.item.price.priceMin}$</b> - <b>Max:${object.item.price.priceMax}$</b></span>
            <span>Contact: <b>${object.item.contacts.phone}</b></span>
            </div>
            <div class='buttonContainer'>
                <button class='delete-btn'>Delete</button>
            </div>
            `;
            dataContainer.appendChild(itemDiv);
            itemDiv.querySelector(".delete-btn").onclick = () => deleteData(object);
        }
    });

    if (!hasData) {
        dataContainer.innerHTML = `<span>Currently, you don't have any hotel bookings</span>`;
    }
}

function getLocations() {
    dataContainer.innerHTML = "";
    let hasData = false;

    bookings.forEach((object, index) => {
        if (object.type === 'place') {
            hasData = true;
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class='imageContainer'>
            <img src= '${object.item.image}'/>
            </div>
            <div class='detailsContainer'>
            <span>Title: <b>${object.item.title}</b></span>
            <span>Booked On: <b>${object.date}</b></span>
            <span>Operator: <b>${object.item.operator}</b></span>
            <span>Price: <b>${object.item.price.total}$</b></span>
            <span>Duration: <b>${object.item.duration}</b></span>
            <span>Cancellation: <b>${object.item.cancellation}</b></span>
            </div>
            <div class='buttonContainer'>
                <button class='delete-btn'>Delete</button>
            </div>
            `;
            dataContainer.appendChild(itemDiv);
            itemDiv.querySelector(".delete-btn").onclick = () => deleteData(object, index);
        }
    });

    if (!hasData) {
        dataContainer.innerHTML = `<span>Currently, you don't have any location bookings</span>`;
    }
}

function deleteData(obj, index) {
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    getLocations();
    getHotels();
    getResturants();
}

// Initial Calls
getResturants();
getHotels();
getLocations();
