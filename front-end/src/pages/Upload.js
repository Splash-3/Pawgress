import React, { useState, useEffect } from 'react';


const Upload = ({  }) => {
    const [data, setData] = useState({});
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Load an image from a URL when the component mounts
        const loadImageFromURL = async () => {
            try {
                const response = await fetch("images/cat2.jpg");
                console.log(response);
                const blob = await response.blob();
                const initialFile = new File([blob], "default.jpg", { type: blob.type });
                setFile(initialFile);
            } catch (error) {
                console.error("Failed to load the default image:", error);
            }
        };

        loadImageFromURL();
    }, []);

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log("File loaded");
                setImage(e.target.result);
                console.log(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    useEffect(() => {
        if (image) {
            fetch("/api/analyse-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "image": image,
                }),
            }).then(response => {
                if (!response.ok) {
                    console.error(response)
                    console.error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
                .then(data => {
                    console.log("Success:", data);
                    setData(data);
                })
                .catch(error => {
                    console.error("Error:", error);
                })
                .finally(() => {
                    console.log("Request completed.");
                    
                });
            setData({});
        }
    }, [image]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className='vbox'>
            <h2>Upload an Image</h2>
            <label style={{ backgroundColor: "hsl(193, 100%, 60%)", borderRadius: "0.5rem", paddingTop: "1rem", paddingBottom: "1rem", margin: "1rem", width: "100%", cursor: "pointer", flex: "0 1 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                Click to select an image
                <input style={{ display: "none" }} type="file" onChange={handleFileChange} />
            </label><br />
            <div style={{ flex: "0 1 auto", position: "relative", display: "inline-block" }}>
                {image && <img src={image} alt="Uploaded" style={{ width: "100%", height: "100%" }} />}
            </div>
        </div>
    );
};

export default Upload;