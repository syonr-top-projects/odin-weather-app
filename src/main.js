import { getData } from "./api.js";
import { parse, format } from "date-fns";
import { weatherThemes } from "./weatherThemes.js";
import './styles.css';

const app = document.getElementById('app');
const body = document.querySelector('body');

// F/C Button

function tempSwitch(csp, country) {
    const switchSpan = document.createElement('span');
    const fahrenheit = document.createElement('button');
    fahrenheit.textContent = 'F';
    const celsius = document.createElement('button');
    celsius.textContent = 'C';
    let unit; 

    fahrenheit.addEventListener('click', async () => {
        unit = 'us';
        const data = await getData(csp, country, unit);
        toggleDisplay(data, csp, country, 'F');
    });

    celsius.addEventListener('click', async () => {
        unit = 'metric';
        const data = await getData(csp, country, unit);
        toggleDisplay(data, csp, country, 'C');
    });

    switchSpan.appendChild(fahrenheit);
    switchSpan.appendChild(celsius);

    return switchSpan;
}

// Display

function toggleDisplay(data, csp, country, unit) {

    if (document.getElementById('display-container')) {
        app.removeChild(document.getElementById('display-container'));
    }

    const displayDiv = document.createElement('div');
    displayDiv.id = 'display-container';

    const locationDiv = document.createElement('div');
    locationDiv.textContent = data.resolvedAddress;
    locationDiv.className = 'grid-item';
    const timeDiv = document.createElement('div');
    const time = parse(data.currentConditions.datetime, "HH:mm:ss", new Date())
    timeDiv.textContent = format(time, "h:mmaaa");
    timeDiv.className = 'grid-item';

    const iconId = data.currentConditions.icon;
    const theme = weatherThemes[iconId] ?? weatherThemes.cloudy;
    body.style.backgroundColor = theme.color;
    body.style.backgroundImage = theme.gradient;

    import(`../weather-icons/${iconId}.svg`).then((response) => {
        const iconDiv = document.createElement('img');
        iconDiv.src = response.default;
        iconDiv.alt = iconId;

        displayDiv.appendChild(iconDiv);
        displayDiv.appendChild(timeDiv);
        displayDiv.appendChild(temp);
        displayDiv.appendChild(toggleUnit);
        displayDiv.appendChild(hiLo);
    })

    const temp = document.createElement('div');
    temp.textContent = `${data.days[0].temp}°${unit}`;
    const hiLo = document.createElement('div');
    hiLo.textContent = `${data.days[0].tempmax}°${unit}/${data.days[0].tempmin}°${unit}`;

    const toggleUnit = tempSwitch(csp, country);

    displayDiv.appendChild(locationDiv);

    app.appendChild(displayDiv);
}

// Form

function createForm() {
    const form = document.createElement('form');

    const cSPDiv = document.createElement('div');
    const cSPLabel = document.createElement('label');
    cSPLabel.textContent = 'City/State/Province: ';
    const cSPInput = document.createElement('input');
    cSPInput.name = 'csp';
    cSPInput.required = true;
    cSPDiv.appendChild(cSPLabel);
    cSPDiv.appendChild(cSPInput);

    const countryDiv = document.createElement('div');
    const countryLabel = document.createElement('label');
    countryLabel.textContent = 'Country: ';
    const countryInput = document.createElement('input');
    countryInput.name = 'country';
    countryDiv.appendChild(countryLabel);
    countryDiv.appendChild(countryInput);

    const searchBtn = document.createElement('button'); 
    searchBtn.type = 'submit';
    searchBtn.textContent = 'Search';

    form.appendChild(cSPDiv);
    form.appendChild(countryDiv);
    form.appendChild(searchBtn);

    app.appendChild(form);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const csp = formData.get('csp');
        const country = formData.get('country');
        const data = await getData(csp, country);
        console.log(data);
        toggleDisplay(data, csp, country, 'F'); 
    })
}

createForm(); 
