const gallery = document.getElementById('gallery');

function getEmployees(json){
    let employee;
employee = json.results.map(employee => {
console.log(employee.name.first);
console.log(employee.name.last);
console.log(employee.email);
console.log(employee.picture.thumbnail);

});
}

function generateHTML(data){
data.results.map(employee => {

const card = document.createElement('div');
card.setAttribute('class','card');
gallery.appendChild(card);
card.innerHTML = `
                <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${employee.picture.thumbnail}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="card-text">${employee.email}</p>
                        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                    </div>
                </div>
`;
});
return data;
}

function generateModal(data){
// modalContainer.setAttribute('class','modal-container');
  const modalConstantData = `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                    </div>
                </div>`;
    var div = document.createElement('div');
    div.innerHTML = modalConstantData;
                gallery.insertAdjacentElement('afterEnd', div );
div.style.display = 'none';
// gallery.appendChild(modalContainer);
const modalCloseButton = div.querySelector('.modal-close-btn');
    console.log(modalCloseButton);
modalCloseButton.addEventListener('click', (e) => {
div.style.display = 'none';
});
}

function updateModal(employee) {
const modalInfoContainer = document.querySelector('.modal-info-container');
modalInfoContainer.innerHTML = '';
var modalCustomContent = `<img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">name</h3>
                        <p class="modal-text">email</p>
                        <p class="modal-text cap">city</p>
                        <hr>
                        <p class="modal-text">(555) 555-5555</p>
                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                        <p class="modal-text">Birthday: 10/21/2015</p>`;
                        
modalInfoContainer.insertAdjacentHTML("afterbegin",modalCustomContent );

}



window.addEventListener("load", (e) => { 
    fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
// .then(getEmployees)
.then(generateHTML)
.then(generateModal)
// .then(data => console.log(data))
// .then(data => console.log(data.results[0].email))
// .then(data => console.log(data.results[0]))
// .then(data => console.log(data.results[0].name.first))
.catch(err => console.log('Error Fetching API: ', err));
});