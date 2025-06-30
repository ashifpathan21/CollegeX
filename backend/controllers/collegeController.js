import axios from 'axios';

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

// 🔧 Mock colleges (fake data for testing)
export const getCollegesByState = async (req, res) => {
  try {
    const { state } = req.params;
    const decodedState = decodeURIComponent(state);

    // Mock colleges just for demo
    const colleges = [
      { name: 'Indian Institute of Technology', location: decodedState },
      { name: 'National Institute of Technology', location: decodedState },
      { name: 'State Engineering College', location: decodedState },
    ];

    res.status(200).json(colleges);
  } catch (error) {
    console.error('Error fetching colleges:', error.message);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
};
