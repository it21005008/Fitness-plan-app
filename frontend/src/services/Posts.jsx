import axios from "axios";

const POST_URL = `${process.env.REACT_APP_API_DOMAIN}/api/image-metadata/`;

export const getPosts = () => {
    const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return axios
        .get(POST_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log("List Posts Response:", response.data); // Log response for debugging
            return response.data;
        })
        .catch((error) => {
            console.error("List Posts Error:", error); // Log error for debugging
            throw error;
        });
};