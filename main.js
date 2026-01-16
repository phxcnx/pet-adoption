const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function petsArea() {
    const petsPromise = await fetch("https://phxcnx-netlify-pets.netlify.app/.netlify/functions/pets")
    const petsData = await petsPromise.json()
    petsData.forEach(pet => {
        const clone = template.content.cloneNode(true)

        clone.querySelector(".pet-card").dataset.species = pet.species
        clone.querySelector("h3").textContent = pet.name
        clone.querySelector(".pet-description").textContent = pet.description
        clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)

        if (!pet.photo) {
            pet.photo = "images/fallback.jpg"
        }
        clone.querySelector(".pet-card-photo img").src = pet.photo
        clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`
        wrapper.appendChild(clone)
        document.querySelector(".list-of-pets").appendChild(wrapper)
    })
}

petsArea()

document.querySelectorAll(".pet-filter button")

function createAgeText(birthYear) {
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear
    
    if (age == 1) return "1 year old"
    if (age == 0) return "Less than a year old"
    return `${age} years old`
}

const allButtons = document.querySelectorAll(".pet-filter button")

allButtons.forEach(el => {
    el.addEventListener("click", handleFilterClick)
})

function handleFilterClick(e) { 
    allButtons.forEach(el => el.classList.remove("active"))
    e.target.classList.add("active")
    const currentFilter = e.target.dataset.filter
    document.querySelectorAll(".pet-card").forEach(el =>{
        if (currentFilter == "all" || currentFilter == el.dataset.species) {
            el.style.display = "grid"
        } else {
            el.style.display = "none"
        }
    })
}

async function getWeather() {
const WeatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
const WeatherData = await WeatherPromise.json()

const ourTemperature = WeatherData.properties.periods[0].temperature

document.querySelector("#temperature-output").textContent = ourTemperature  }

getWeather()