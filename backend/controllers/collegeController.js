import axios from 'axios';
import {config} from 'dotenv'
config()
const API_BASE = 'https://api.countrystatecity.in/v1';
const COUNTRY_CODE = 'IN'; // India

export const getStates = async (req, res) => {
  try {
    const response = await axios.get(
      `${API_BASE}/countries/${COUNTRY_CODE}/states`,
      {
        headers: {
          'X-CSCAPI-KEY': process.env.COUNTRY_API_KEY,
        },
      }
    );

    const states = response.data.map((state) => ({
      id: state.iso2,
      name: state.name,
    }));

    res.status(200).json(states);
  } catch (error) {
    console.error('Error fetching states:', error.message);
    res.status(500).json({ error: 'Failed to fetch states' });
  }
};


export const getLocation = async (req, res) => {
  const { query } = req.params;
    
  const apiKey = process.env.MAP_API_KEY
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?types=establishment&region=IN&key=${apiKey}&input=${query}`
  try {
    

    const response = await axios.get(url);
   
     const data =  response?.data?.predictions?.map(prediction => prediction.structured_formatting.main_text);


    return res.json({ success: true, data});
  } catch (err) {
    console.error("ERR", err.response?.status || err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch colleges", error: err.message });
  }
};