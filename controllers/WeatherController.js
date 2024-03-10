import dotenv from 'dotenv';
dotenv.config();

export const getWeather = async(req, res) => {
    try {
        const cities = req.cities || [];
        const responseData = [];
        for (const city of cities) {
            const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city.name}`;
            const fetchedData = await fetchData(url);
            const data = {
                id: city._id,
                name: fetchedData.location.name,
                country: fetchedData.location.country,
                temperature: fetchedData.current.temp_c,
                humidity: fetchedData.current.humidity,
                condition: fetchedData.current.condition.text,
                icon_url: fetchedData.current.condition.icon
            };
            responseData.push(data);
        }
        res.status(200).send({description: 'Successful response', cities: responseData});
    } catch (error) {
        res.status(500).send({description: 'Internal server error', error: 'Server error, please try again later'});
    }
}

const fetchData = async (url) => {
    const fetchedData = await fetch(url);
    return await fetchedData.json();
}