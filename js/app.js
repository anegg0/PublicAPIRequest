const gallery = document.getElementById("gallery");
const nameHtmlCollection = document.getElementsByClassName("name");

document.getElementById("search-message").style.display = "none";

// Creates a card for each employee returned by the api call
// takes API output as argument and fills profile card with relevant information
function generateHTML(data) {
  data.results.map((employee) => {
    const card = document.createElement("div");
    gallery.appendChild(card);
    card.innerHTML = `
                <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${employee.picture.large}" alt="profile picture">
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

// Creates empty modal
function generateModal() {
  const modalConstantData = `
            <div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
                `;
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

// Adds profile info to modal
// takes API output as argument and fills clicked modal with relevant profile information
function updateModal(employee) {
  const modalInfoContainer = document.querySelector(".modal-info-container");
  modalInfoContainer.innerHTML = "";
  var modalCustomContent = `<img class="modal-img" src="${
    employee.picture.large
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

// Toggles modal view
// takes API output as argument and calls updateModal
function displayModal(data) {
  const cardArray = document.getElementsByClassName("card");
  for (let i = 0; i < cardArray.length; i++) {
    cardArray[i].addEventListener("click", (event) => {
      const wrapper = document.querySelector(".wrapper");
      wrapper.style.display = "flex";
      updateModal(data.results[i]);
    });
  }
  return data;
}

// Toggles back and forth between employees when the modal window is open
// Takes API output as argument and updates modal with each new profile
function modalToggle(data) {
  const wrapper = document.querySelector(".wrapper");
  wrapper.style.display = "none";
  const numberOfEmployeesToDisplay = data.results.length;
  const modalPrev = document.querySelector("#modal-prev");
  const modalNext = document.querySelector("#modal-next");
  let currentIndex = 0;
  modalPrev.addEventListener("click", (event) => {
    if (currentIndex == 0) {
      currentIndex = numberOfEmployeesToDisplay - 1;
    } else {
      currentIndex--;
    }
    updateModal(data.results[currentIndex]);
  });
  modalNext.addEventListener("click", (event) => {
    if (currentIndex == numberOfEmployeesToDisplay - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateModal(data.results[currentIndex]);
  });
}

// Matches search input with relevant profiles on page
// Displays matching profiles
// Displays message is no profile is matching the query
const searchInput = document.querySelector("#search-input");
searchInput.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  let noMatch = true;
  const filterThroughNames = (nameHtmlCollection) => {
    for (let i = 0; i < nameHtmlCollection.length; i++) {
      if (
        !nameHtmlCollection[i].textContent.toLowerCase().includes(searchString)
      ) {
        nameHtmlCollection[i].parentElement.parentElement.style.display =
          "none";
      }
    }
    for (let i = 0; i < nameHtmlCollection.length; i++) {
      if (
        !nameHtmlCollection[i].textContent.toLowerCase().includes(searchString)
      )
        continue;
      noMatch = false;
      break;
    }
    if (noMatch) {
      document.getElementById("search-message").innerHTML =
        "your search term was not found";
      document.getElementById("search-message").style.display = "flex";
    }
  };
  filterThroughNames(nameHtmlCollection);
});

// Assigns a search listener to search box
document
  .querySelector("#search-input")
  .addEventListener("search", function (event) {
    for (let i = 0; i < nameHtmlCollection.length; i++) {
      nameHtmlCollection[i].parentElement.parentElement.style.display = "flex";
      document.getElementById("search-message").innerHTML = "";
    }
  });

// Calls each relevant function asynchronously
window.addEventListener("load", (e) => {
  fetch("https://randomuser.me/api/?nat=us&results=12")
    .then((response) => response.json())
    .then(generateHTML)
    .then(displayModal)
    .then(modalToggle)
    .catch((err) => console.log("Error Fetching API: ", err));
});
