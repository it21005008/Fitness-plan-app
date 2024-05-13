import axios from "axios";

export const uploadVideo = (image, caption) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const formData = new FormData();
  formData.append("image", image);
  formData.append("caption", caption);

  return axios
    .post(`${process.env.REACT_APP_API_DOMAIN}/api/image-metadata/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Upload Image Response:", response.data); // Log response for debugging
      return response.data;
    })
    .catch((error) => {
      console.error("Upload Image Error:", error); // Log error for debugging
      throw error;
    });
};
