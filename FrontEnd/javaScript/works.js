//** this function makes new elements and injects them into the html. **
function displayWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  works.forEach((work) => {
    const workDiv = document.createElement("div");
    workDiv.classList.add("work-div");

    const workImg = document.createElement("img");
    workImg.src = work.imageUrl;

    const workTitle = document.createElement("p");
    workTitle.classList.add("work-title");
    workTitle.innerText = work.title;

    workDiv.appendChild(workImg);
    workDiv.appendChild(workTitle);
    gallery.appendChild(workDiv);
  });
}

//** this function is used to filter the works **
function filterWorks(category, allWorks) {
  if (category === "all") {
    return allWorks;
  }
  return allWorks.filter((work) => work.category.name === category);
}

//** this function retrieves the data from the API, then calls the first two functions, to display the works and the filtered ones. **
export function displayAndFilteredWorks() {
  const url = "http://localhost:5678/api/works";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWorks(data);

      const filters = document.getElementById("filter-all");
      filters.addEventListener("click", () => {
        displayWorks(data);
      });

      let filteredObjects = document.getElementById("object-filter");
      filteredObjects.addEventListener("click", () => {
        filteredObjects = filterWorks("Objets", data);
        displayWorks(filteredObjects);
      });

      let filteredApartments = document.getElementById("apartment-filter");
      filteredApartments.addEventListener("click", () => {
        filteredApartments = filterWorks("Appartements", data);
        displayWorks(filteredApartments);
      });

      let filteredHotelsRestaurants = document.getElementById(
        "filter-hotels-restaurants"
      );
      filteredHotelsRestaurants.addEventListener("click", () => {
        filteredHotelsRestaurants = filterWorks("Hotels & restaurants", data);
        displayWorks(filteredHotelsRestaurants);
      });
    });
}

displayAndFilteredWorks();
