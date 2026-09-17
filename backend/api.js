// Determine the API base URL depending on the environment
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000' // Change to your local backend port if different
  : 'https://thrivetradingllc.onrender.com';

export default API_BASE_URL;