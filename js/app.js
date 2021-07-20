const gallery = document.getElementById("gallery");
const nameArray = document.getElementsByClassName("name");
// This function creates a card for each employee returned by the api call
function generateHTML(data) {
  data.results.map((employee) => {
    const card = document.createElement("div");
    gallery.appendChild(card);
    card.innerHTML = `
                <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${employee.picture.thumbnail}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 class="card-name cap name">${employee.name.first} ${employee.name.last}</h3>
                        <p class="card-text">${employee.email}</p>
                        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
                    </div>
                </div>
`;
  });
  generateModal();
  return data;
}

function generateModal() {
  const modalConstantData = `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                    </div>
                </div>`;
  var div = document.createElement("div");
  div.setAttribute("class", "wrapper");
  div.innerHTML = modalConstantData;
  gallery.insertAdjacentElement("afterend", div);
  div.style.display = "none";
  const modalCloseButton = div.querySelector(".modal-close-btn");
  modalCloseButton.addEventListener("click", (e) => {
    div.style.display = "none";
  });
}

function updateModal(employee) {
  const modalInfoContainer = document.querySelector(".modal-info-container");
  modalInfoContainer.innerHTML = "";
  var modalCustomContent = `<img class="modal-img" src="${
    employee.picture.medium
  }" alt="profile picture">
                        <h3 class="modal-name cap name">${
                          employee.name.first
                        } ${employee.name.last}</h3>
                        <p class="modal-text">${employee.email}</p>
                        <p class="modal-text cap">${employee.location.city}</p>
                        <hr>
                        <p class="modal-text">${employee.cell}</p>
                        <p class="modal-text">${
                          employee.location.street.number
                        } ${employee.location.street.name}, ${
    employee.location.city
  }, ${employee.location.state} ${employee.location.postcode}</p>
                        <p class="modal-text">Birthday: ${employee.dob.date.slice(
                          0,
                          10
                        )}</p>`;

  modalInfoContainer.insertAdjacentHTML("afterbegin", modalCustomContent);
}

function addClickHandlers(data) {
  const cardArray = document.getElementsByClassName("card");
  for (let i = 0; i < cardArray.length; i++) {
    cardArray[i].addEventListener("click", (event) => {
      const wrapper = document.querySelector(".wrapper");
      wrapper.style.display = "flex";
      console.log(data.results[i]);
      updateModal(data.results[i]);
    });
  }
}

const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filterThroughNames = (nameArray) => {
    for (let i = 0; i < nameArray.length; i++) {
      if (!nameArray[i].textContent.toLowerCase().includes(searchString)) {
        nameArray[i].parentElement.parentElement.style.display = "none";
      }
    }
  };
  filterThroughNames(nameArray);
});


document.querySelector("#search-input").addEventListener("search", function(event) {
  // console.log(nameArray);
  for (let i = 0; i < nameArray.length; i++) {
    nameArray[i].parentElement.parentElement.style.display = "flex";
    // console.log(nameArray[i]);
  }
});

window.addEventListener("load", (e) => {
  fetch("https://randomuser.me/api/?results=12")
    .then((response) => response.json())
    .then(generateHTML)
    .then(addClickHandlers)
    .catch((err) => console.log("Error Fetching API: ", err));
});
