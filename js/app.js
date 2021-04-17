const gallery = document.getElementById('gallery');

// function getEmployees(json){
//     let employee;
// employee = json.results.map(employee => {
// console.log(employee.name.first);
// console.log(employee.name.last);
// console.log(employee.email);
// console.log(employee.picture.thumbnail);

// });
// }

function generateHTML(data){
data.results.map(employee => {

const card = document.createElement('div');
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
generateModal();
return data;
}

function generateModal(){
// modalContainer.setAttribute('class','modal-container');
  const modalConstantData = `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                    </div>
                </div>`;
    var div = document.createElement('div');
    div.setAttribute('class', 'wrapper');
    div.innerHTML = modalConstantData;
                gallery.insertAdjacentElement('afterend', div );
div.style.display = 'none';
// gallery.appendChild(modalContainer);
const modalCloseButton = div.querySelector('.modal-close-btn');
modalCloseButton.addEventListener('click', (e) => {
div.style.display = 'none';
});
}

function updateModal(employee) {
// data.results.map(employee => {
    // console.log(`for updateModal, employee is: ${employee.results}`);
const modalInfoContainer = document.querySelector('.modal-info-container');
modalInfoContainer.innerHTML = '';
var modalCustomContent = `<img class="modal-img" src="${employee.picture.medium}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.cell}</p>
                        <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${(employee.dob.date).slice(0,10)}</p>`;
                        
modalInfoContainer.insertAdjacentHTML("afterbegin",modalCustomContent );

// });
}

function addClickHandlers(data) {
  const cardArray = document.getElementsByClassName('card');
//   console.log(cardArray);
    //  console.log(data);
  for (let i = 0; i < cardArray.length; i++) {
    //   console.log(data);
 cardArray[i].addEventListener('click', (event)  => {
     const wrapper = document.querySelector('.wrapper');
     wrapper.style.display = "flex";
     console.log(data.results[i]);
    updateModal(data.results[i]);
});
  }
}


window.addEventListener("load", (e) => { 
    fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
// .then(getEmployees)
.then(generateHTML)
// .then(generateModal)
// .then(updateModal)
.then(addClickHandlers)
// .then(data => console.log(data))
// .then(data => console.log(data.results[0].email))
// .then(data => console.log(data.results[0]))
// .then(data => console.log(data.results[0].name.first))
.catch(err => console.log('Error Fetching API: ', err));
});