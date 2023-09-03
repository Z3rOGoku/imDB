let movieNameRef = document.getElementById("movie-name");
let result = document.getElementById("result");

// Define an array to store watchlist items
let watchlist = [];

// Function to add a movie to the watchlist and update localStorage
let addToWatchlist = (title) => {
    // Check if the movie is not already in the watchlist
    if (!watchlist.includes(title)) {
        watchlist.push(title);
        alert(`${title} added to your watchlist!`);
        updateLocalStorage();
    } else {
        alert(`${title} is already in your watchlist.`);
    }
};

// Function to update localStorage with the current watchlist
function updateLocalStorage() {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

// Function to load watchlist from localStorage on page load
function loadWatchlistFromLocalStorage() {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
        watchlist = JSON.parse(storedWatchlist);
    }
}

// Load watchlist from localStorage when the page loads
loadWatchlistFromLocalStorage();

// Function to display the watchlist page
let displayWatchlist = () => {
    // Create a list of watchlist items
    let watchlistItems = watchlist.map((title) => `${title}\n`).join("");

    // Display the watchlist in an alert
    alert(`Your Watchlist:\n\n${watchlistItems}`);
};

// Event listener for the "Add to Watchlist" button
result.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-watchlist")) {
        let title = event.target.getAttribute("data-title");
        addToWatchlist(title);
    }
});



// Event listener for displaying the watchlist
document.getElementById("show-watchlist").addEventListener("click", displayWatchlist);

// Function to fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${"956b09ca"}`;

    // If input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name </h3>`;
    } else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // If movie exists in the database
                if (data.Response == "True") {
                    result.innerHTML = `
                                <h3>Plot:</h3>
                                <p>${data.Plot}</p>
                                <h3>Cast:</h3>
                                <p>${data.Actors}</p>
                                <button class="add-to-watchlist" data-title="${data.Title}">Add to Watchlist</button>
                                <div class="info">
                                    <img src=${data.Poster} class="poster">
                                    <div>
                                        <h2>${data.Title}</h2>
                                        <div class="rating">
                                            <img src="star-icon.svg">
                                            <h4>${data.imdbRating}</h4>
                                        </div>
                                        <div class="details">
                                            <span>${data.Rated}</span>
                                            <span>${data.Year}</span>
                                            <span>${data.Runtime}</span>
                                        </div>
                                        <div class="genre">
                                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                                        </div>
                                    </div>
                                </div>
                                <h3>Plot:</h3>
                                <p>${data.Plot}</p>
                                <h3>Cast:</h3>
                                <p>${data.Actors}</p>
                            `;
                }
                // If movie doesn't exist in the database
                else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            // If an error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
            });
    }
};

// Attach the event listener to the input field to trigger search on input change
movieNameRef.addEventListener("input", getMovie);

// Dark/light Mode button
var colorToggleButton = document.getElementById("color-toggle");

// Set an initial background color (black)
var isWhite = false;
updateBackgroundColor();

// Add a click event listener to the button
colorToggleButton.addEventListener("click", function () {
    isWhite = !isWhite; // Toggle the flag
    updateBackgroundColor();
});

// Function to update the background color based on the flag
function updateBackgroundColor() {
    if (isWhite) {
        document.body.style.backgroundColor = "white";
        colorToggleButton.innerText = "DARK MODE 🌚";
    } else {
        document.body.style.backgroundColor = "rgb(36, 36, 36)";
        colorToggleButton.innerText = "LIGHT MODE ☀️";
    }
}
