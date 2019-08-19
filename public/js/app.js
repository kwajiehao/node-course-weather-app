console.log('Client side javascript file is loaded');

/* example of fetch 

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});
*/

// elements needed on document
const weatherForm = document.querySelector('.search-form');
const searchElement = document.querySelector('#search-input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// setting message properties
messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading message
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    // get location 
    const location = searchElement.value;

    // pass location into app using fetch
    fetch(`http://127.0.0.1:3000/weather?address=${encodeURIComponent(location)}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});