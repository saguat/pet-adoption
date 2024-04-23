const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/106,52/forecast")
  const weatherData = await weatherPromise.json()

  const ourTemperature = weatherData.properties.periods[0].temperature
  document.querySelector("#temperature-output").textContent = ourTemperature
}

start()

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()

  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true)

    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".descrizione").textContent = pet.description
    clone.querySelector(".età").textContent = createAgeText(pet.birthYear)
    clone.querySelector(".pet-immagine img").src = pet.photo
    clone.querySelector(".pet-immagine img").alt = `a ${pet.species} named ${pet.name}.`

    wrapper.appendChild(clone)
  })
  document.querySelector(".pet-cards").appendChild(wrapper)
}

petsArea()

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if (age == 1) return "1 year old"
  if (age == 0) return "Less than a year old"

  return age + " years old"
}