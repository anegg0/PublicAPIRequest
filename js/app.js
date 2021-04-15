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
    // console.log(data.results);
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
}

window.addEventListener("load", (e) => { 
    fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
// .then(getEmployees)
.then(generateHTML)
// .then(data => console.log(data))
// .then(data => console.log(data.results[0].email))
// .then(data => console.log(data.results[0]))
// .then(data => console.log(data.results[0].name.first))
.catch(err => console.log('Error Fetching API: ', err));
});