import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';


// Below is for the Ccrds
export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country)
    {
        changeableUrl = `${url}/countries/${country}`;
    }
    try {
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(changeableUrl);
        // const modifiedData = {
        //     confirmed:   confirmed,
        //     recovered:   recovered,
        //     deaths:      deaths,
        //     lastUpdate: lastUpdate,
        // }
        // Instead of above we can write like the following
        // const modifiedData = { confirmed, recovered, deaths, lastUpdate, }
        // The above will still work because javascript objects that have the same key and value
        // behave a bit differently.
        return { confirmed, recovered, deaths, lastUpdate, } ;
    } catch (error) {
        console.log(error);
    }
}

// Below is for Chart

export const fetchDailyData = async () =>{
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData)=>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

// Below is for CountryPicker
export const fetchCountries = async() => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);
        
        return countries.map((country)=>country.name);
    } catch (error) {
        console.log(error);
    }
}