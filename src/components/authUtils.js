// authUtils.js
import axios from 'axios';

import { BASE_URL1 } from './constants';

export const checkLogin = async () => {
    try {
        const response = await axios.get(`${BASE_URL1}/isLogin`, { withCredentials: true });
        return response.data // Assuming the API returns { isLoggedIn: true/false }
    } catch (error) {
        console.error('Error checking login status:', error);
        return false; // Return false if an error occurs
    }
};
