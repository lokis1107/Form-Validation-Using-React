import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

axios.defaults.baseURL = "http://localhost:8080/";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    lat: "",
    long: "",
  });

  const [active, setActive] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "school name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "email is not valid";
    }

    if (!formData.mobile.trim()) {
      validationErrors.mobile = "mobile is required";
    } else if (formData.mobile.length < 6) {
      validationErrors.mobile = "mobile should be at least 10 char";
    }

    if (!formData.address.trim()) {
      validationErrors.address = "address is required";
    }

    if (!formData.lat.trim()) {
      validationErrors.lat = "laditude is required";
    }

    if (!formData.long.trim()) {
      validationErrors.long = "longitude name is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted successfully");
      const data = await axios.post("/create", formData);
      setActive(false);
    }
  };

  return (
    <>
      <Nav />
      {active ? (
        <form className="mt-10" onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="name"
              placeholder="school name"
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.name && <span>{errors.name}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              autoComplete="off"
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label>Mobile:</label>
            <input
              type="number"
              name="mobile"
              autoComplete="off"
              placeholder="Mobile Number"
              onChange={handleChange}
            />
            {errors.mobile && <span>{errors.mobile}</span>}
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              autoComplete="off"
              placeholder="Address"
              onChange={handleChange}
            />
            {errors.address && <span>{errors.address}</span>}
          </div>
          <div>
            <label>Laditude:</label>
            <input
              type="text"
              name="lat"
              autoComplete="off"
              placeholder="Latidute"
              onChange={handleChange}
            />
            {errors.lat && <span>{errors.lat}</span>}
          </div>
          <div>
            <label>Longidute:</label>
            <input
              type="text"
              name="long"
              autoComplete="off"
              placeholder="Longidute"
              onChange={handleChange}
            />
            {errors.long && <span>{errors.long}</span>}
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="mt-20">
          <h3 className="font-bold text-center text-xl mb-3">Contact detils</h3>
          <p className="text-center mx-40">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div onClick={() => setActive(true)} className="p-2">
            <h2
              style={{ cursor: "pointer" }}
              className="text-xl text-center font-bold"
            >
              Feedback Form
            </h2>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
