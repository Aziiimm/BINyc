import React, { useState } from "react";
import NavBar from "../components/Header";
import { FaFileUpload } from "react-icons/fa";

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
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
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
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
          },
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // List of required fields
    const requiredFields = [
      "title",
      "description",
      "image",
      "location",
      "bounty",
      "locationType",
      "name",
      "phoneNumber",
      "email",
    ];

    // Check for empty fields
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }

    // Get current time and update form data
    const currentTime = new Date().toLocaleString();
    setFormData({ ...formData, time: currentTime });

    // Submit the form (you can replace this with actual form submission logic)
    console.log({ ...formData, time: currentTime });
    alert("Form submitted successfully!");
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
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Name Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[rgb(96,147,93)] underline">
              Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="block h-10 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[rgb(96,147,93)] underline">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="block h-10 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[rgb(96,147,93)] underline">
              Phone Number:
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="(123) 456-7890"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="block h-10 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Title Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[rgb(96,147,93)] underline">
              Title:
            </label>
            <input
              type="text"
              name="title"
              placeholder="Short Title"
              value={formData.title}
              onChange={handleChange}
              className="block h-10 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Location Type Dropdown */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[rgb(96,147,93)] underline">
              Location Type:
            </label>
            <select
              name="locationType"
              value={formData.locationType}
              onChange={handleLocationTypeChange}
              className="block h-10 w-full rounded-md border border-gray-300 p-2"
            >
              <option value="" hidden>
                {formData.locationType || "Select Location Type"}
              </option>
              <option value="address">Enter Address</option>
              <option value="Current Location">Use Current Location</option>
            </select>
          </div>
          {/* Location Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[rgb(96,147,93)] underline">
              Location:
            </label>
            <input
              type="text"
              name="location"
              placeholder={
                formData.locationType === "Current Location"
                  ? coordinates || "Fetching coordinates..."
                  : "Enter Address"
              }
              value={formData.location}
              onChange={handleChange}
              disabled={formData.locationType === "Current Location"}
              className="block h-10 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          {/* Bounty Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[rgb(96,147,93)] underline">
              Bounty:
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                $
              </span>
              <input
                type="number"
                name="bounty"
                placeholder="Amount"
                value={formData.bounty}
                onChange={handleBountyChange}
                className="block h-10 w-full rounded-md border border-gray-300 p-2 pl-8"
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[rgb(96,147,93)] underline">
              Description:
            </label>
            <textarea
              name="description"
              placeholder="Detailed description of the issue"
              value={formData.description}
              onChange={handleChange}
              className="block h-20 w-full rounded-md border border-gray-300 p-2"
            ></textarea>
          </div>

          <div className="col-span-1 md:col-span-2">
            {/* Image Upload Field */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-[rgb(96,147,93)] underline">
                Upload Image (JPG or PNG):
                <div>{formData.image ? formData.image.name : ""}</div>
              </label>
              <div className="flex items-center justify-between">
                <div className="flex w-full items-center">
                  <input
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileUpload"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-[rgb(96,147,93)] px-4 py-3 font-semibold text-white hover:cursor-pointer hover:bg-[rgb(96,140,120)]"
                  >
                    <FaFileUpload className="text-xl" />
                    <span>Upload File</span>
                  </label>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-[rgb(96,147,93)] px-4 py-3 font-semibold text-white hover:bg-[rgb(96,140,120)]"
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
