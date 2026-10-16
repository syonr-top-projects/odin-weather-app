const API_KEY = 'KZPJ8FU5TLDMMYP346GHRV8FZ'; // public free API key

export async function getData(cSPInput, countryInput, unit) {
    let unitGroup = unit ?? 'us';
    let cSP = cSPInput;
    let country = countryInput;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cSP},${country}/today/?key=${API_KEY}&unitGroup=${unitGroup}&iconSet=icons1`;
    
    try {
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            let data = await response.json();
            return data;
        }
    } catch (err) {
        console.error(err);
    }
}
