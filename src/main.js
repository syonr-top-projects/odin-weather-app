import { getData } from "./api.js";
import { parse, format } from "date-fns";

const app = document.getElementById('app');

// Display

function toggleDisplay(data) {
    const displayDiv = document.createElement('div');
    displayDiv.className = 'grid-container';

    const locationDiv = document.createElement('div');
    locationDiv.textContent = data.resolvedAddress;
    locationDiv.className = 'grid-item';
    const timeDiv = document.createElement('div');
    const time = parse(data.currentConditions.datetime, "HH:mm:ss", new Date())
    timeDiv.textContent = format(time, "h:mmaaa");
    timeDiv.className = 'grid-item';

    const iconId = data.currentConditions.icon;

    import(`../weather-icons/${iconId}.svg`).then((response) => {
        const iconDiv = document.createElement('img');
        iconDiv.src = response.default;
        iconDiv.alt = iconId;

        displayDiv.appendChild(iconDiv);
    })

    const temp = document.createElement('div');
    temp.textContent = data.days[0].temp;
    const hiLo = document.createElement('div');
    hiLo.textContent = `${data.days[0].tempmax}/${data.days[0].tempmin}`;

    displayDiv.appendChild(locationDiv);
    displayDiv.appendChild(timeDiv);

    displayDiv.appendChild(temp);
    displayDiv.appendChild(hiLo);

    app.appendChild(displayDiv);
}

// Form

function createForm() {
    const form = document.createElement('form');

    const cSPDiv = document.createElement('div');
    const cSPLabel = document.createElement('label');
    cSPLabel.textContent = 'City/State/Province';
    const cSPInput = document.createElement('input');
    cSPInput.name = 'csp';
    cSPDiv.appendChild(cSPLabel);
    cSPDiv.appendChild(cSPInput);

    const countryDiv = document.createElement('div');
    const countryLabel = document.createElement('label');
    countryLabel.textContent = 'Country';
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
        const data = await getData(formData.get('csp'), formData.get('country'));
        console.log(data);
        toggleDisplay(data); // how to not add more and replace
    })
}

// F/C Button

function tempSwitch() {
    
}