// Function to fetch and display the library data from the JSON file
async function fetchLibraryData() {
    try {
        const response = await fetch('/pages/json/library.json');  // Path to your JSON file
        const data = await response.json();

        // Call the function to populate the library with the fetched data
        populateLibrary(data);
    } catch (error) {
        console.error('Error fetching the JSON data:', error);
    }
}

// Function to populate the HTML with fetched book data
function populateLibrary(categories) {
    const librarySection = document.querySelector('main');

    categories.forEach(categoryObj => {
        const section = document.createElement('section');
        section.classList.add('category');
        
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = categoryObj.category;
        section.appendChild(categoryTitle);

        const list = document.createElement('ul');
        categoryObj.books.forEach(book => {
            const listItem = document.createElement('li');
            const bookLink = book.link ? `<a href="${book.link}" target="_blank">${book.title}</a>` : book.title;
            listItem.innerHTML = `${bookLink} by ${book.author}`;
            list.appendChild(listItem);
        });
        section.appendChild(list);

        librarySection.appendChild(section);
    });
}

// Fetch and populate the data when the page loads
window.onload = fetchLibraryData;
