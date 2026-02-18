import React, { useState, useRef, useEffect } from "react";
import "./CreateFeed.css";
import axios from 'axios'
import flower from "../assets/flower.png";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const CreateFeed = () => {

  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    axios.post("http://localhost:3000/create-post" , formData)
    .then((res) => {
      
      navigate("/feed")
      alert("Post created successfully!");

    })

    .catch((err) => {
      console.log(err)
      alert("error creating post")
    })

  }


  const [preview, setPreview] = useState(null);
  const [active, setActive] = useState(false);

  const fileRef = useRef(null);
  const previewRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setActive(false);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  /* click outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (previewRef.current && !previewRef.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="main-div">

      {/* flowers */}
      <img src={flower} alt="flower" className="flower-bg" />
      <img src={flower} alt="flower" className="flower-bg2" />

      {/* ⭐ LANDING PAGE */}
      <div className="landing-container">

        {/* LEFT HERO */}
        <div className="hero-left">
          <img src={logo} alt="Diary Files" className="hero-logo" />

          <h1 className="hero-title">
            Capture your memories beautifully ✨
          </h1>

          <p className="hero-text">
            Diary Files helps you save your photos and moments with emotion,
            creativity and aesthetic vibes. Start your digital diary today.
          </p>

          <div className="hero-buttons">
            <button className="cta-btn">Start Writing</button>
            <button className="cta-btn outline">Explore</button>
          </div>
        </div>

        {/* RIGHT UPLOAD CARD */}
        <div className="hero-right">
          <div className="form-box">

            <h1>ADD IMAGE</h1>

            <form onSubmit={handleSubmit} >
              {/* preview */}
              <div
                ref={previewRef}
                className={`preview-container ${active ? "active" : ""}`}
                onClick={() => preview && setActive(true)}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="preview" className="preview-img" />

                    {active && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage();
                        }}
                      >
                        ✖
                      </button>
                    )}
                  </>
                ) : (
                  <p className="placeholder-text">No image selected</p>
                )}
              </div>

              {/* hidden input */}
              <input
                type="file"
                id="fileupload"
                name="image"
                ref={fileRef}
                className="input-file"
                onChange={handleImageChange}
              />

              <label htmlFor="fileupload" className="add-button">
                Upload photo
              </label>

              <textarea
                name="caption"
                className="descrip-bar"
                placeholder="Write something..."
              ></textarea>

              <button className="add-button">Submit</button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CreateFeed;
