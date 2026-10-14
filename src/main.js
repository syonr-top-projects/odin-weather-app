const API_KEY = 'KZPJ8FU5TLDMMYP346GHRV8FZ'; // public free API key

let unitGroup = 'us';

async function getData(cSPInput, countryInput) {
    let cSP = cSPInput;
    let country = countryInput;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cSP},${country}/today/?key=${API_KEY}&unitGroup=${unitGroup}`
    
    try {
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new HttpError(response.status);
        } else {
            let data = await response.json();
            console.log(data.days[0]);
        }
    } catch (err) {
        console.error(err);
    }
    return 0;
}

const data = getData('Paris', 'France');
console.log(data);