import React, { useState } from "react";
import NavBar from "../components/Header";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [],  // Change `image` to `images` for handling multiple files
    location: "",
    time: "",
    bounty: "",
    locationType: "",
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [coordinates, setCoordinates] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);  // Handle multiple files
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: files,
    }));
  };

  const handleLocationTypeChange = (e) => {
    const value = e.target.value;
    if (value === "Current Location") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const coords = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            setCoordinates(coords);
            setFormData({
              ...formData,
              locationType: value,
              location: coords,
            });
          },
          () => {
            console.error("Unable to fetch current location.");
            setCoordinates("Error fetching location");
            setFormData({
              ...formData,
              locationType: value,
              location: "Error fetching location",
            });
          }
        );
      }
    } else {
      setCoordinates("");
      setFormData({
        ...formData,
        locationType: value,
        location: "",
      });
    }
  };

  const handleBountyChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setFormData({ ...formData, bounty: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "title",
      "description",
      "images",
      "location",
      "bounty",
      "locationType",
      "name",
      "phoneNumber",
      "email",
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    const currentTime = new Date().toLocaleString();
    const updatedFormData = { ...formData, time: currentTime };

    // Create FormData object to handle file upload
    const formDataToSend = new FormData();
    Object.keys(updatedFormData).forEach((key) => {
      if (key === "images") {
        updatedFormData.images.forEach((file, index) => {
          formDataToSend.append(`images[${index}]`, file);
        });
      } else {
        formDataToSend.append(key, updatedFormData[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/form",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Form submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex h-fit min-h-screen justify-center bg-gray-300">
      <NavBar />
      <div className="mb-24 mt-24 w-2/3 rounded-lg bg-gray-200 p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-[rgb(96,147,93)] underline">
            Report Form
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Other form fields */}
          
          {/* Image Upload Field */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-[rgb(96,147,93)] underline">
              Upload Image(s)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-gray-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="rounded-md bg-darker-base-color px-3 py-1 text-white shadow-md transition-all duration-300 hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
