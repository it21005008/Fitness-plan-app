import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import statement

const API_URL = `${process.env.REACT_APP_API_DOMAIN}/api/user`;

export async function getNameFromToken() {
    try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const decodedToken = jwtDecode(token); // Correct function call
        
        const email = decodedToken.sub;
        const getAPI = `${API_URL}/${email}`;

        const response = await axios.get(getAPI);

        if (response.data) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}


