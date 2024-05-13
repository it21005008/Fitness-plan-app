import React, { useState } from "react";
import { uploadImage } from "../../services/UploadImage";
import { uploadVideo } from "../../services/UploadVideo";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CreateNewPost() {
  const navigate = useNavigate(); // Define navigate function

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
    setVideoPreview(URL.createObjectURL(selectedVideo));
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleImageSelect = () => {
    document.getElementById("image").click();
  };

  const handleVideoSelect = () => {
    document.getElementById("video").click();
  };

  const handleCancelImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleCancelVideo = () => {
    setVideo(null);
    setVideoPreview("");
  };

  const handleImageSubmit = async () => {
    try {
      const data = await uploadImage(image, caption);
      console.log("Image uploaded successfully:", data);
      //navigate('/post/' + data.id);
      setImage(null);
      setImagePreview("");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleVideoSubmit = async () => {
    try {
      const data = await uploadVideo(video, caption);
      console.log("Video uploaded successfully:", data);
      setVideo(null);
      setVideoPreview("");
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    if (image) {
      await handleImageSubmit();
    } else if (video) {
      await handleVideoSubmit();
    } else {
      console.log("Please select an image or video.");
    }
    setPublishing(false);
  };

  return (
    <div className="bg-blue-200 mt-3 p-5 rounded-xl">
      <div>
        <div>
          <div>
            <textarea 
              name=""  
              className="w-full bg-slate-700 border border-slate-700 rounded-xl p-4 placeholder:text-sm text-slate-400 text-white" 
              placeholder="What's on your mind?"
              value={caption}
              onChange={handleCaptionChange}
            ></textarea>
          </div>
          <div className="flex items-center justify-between gap-1 ">
            <div className="flex items-center gap-2">
              <button onClick={handleImageSelect} className="bg-blue-800 text-sm font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
                </svg>

                {image ? image.name : "Photo"}
              </button>
              {image && (
                <button onClick={handleCancelImage} className="bg-blue-800 text-sm font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
                  Cancel
                </button>
              )}
              <button onClick={handleVideoSelect} className="bg-blue-800 text-sm font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path d="M3 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H3ZM15 4.75a.75.75 0 0 0-1.28-.53l-2 2a.75.75 0 0 0-.22.53v2.5c0 .199.079.39.22.53l2 2a.75.75 0 0 0 1.28-.53v-6.5Z" />
                </svg>

                {video ? video.name : "Video"}
              </button>
              {video && (
                <button onClick={handleCancelVideo} className="bg-blue-800 text-sm font-semibold px-2 py-1 rounded-lg flex items-center gap-1">
                  Cancel
                </button>
              )}
            </div>
            <div>
              <button onClick={handlePublish} className="bg-green-500 text-sm font-semibold px-2 py-1 rounded-lg flex items-center gap-1" disabled={publishing}>
                {publishing ? "Publishing..." : "Publish"}
              </button>
            </div>
          </div>
        </div>
        <form id="image-upload" className="hidden" onSubmit={handleImageSubmit}>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <button type="submit">Upload</button>
        </form>

        <form id="video-upload" className="hidden" onSubmit={handleVideoSubmit}>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleVideoChange}
            required
          />
          <button type="submit">Upload</button>
        </form>
      </div>
      
    </div>
  );
}

export default CreateNewPost;

