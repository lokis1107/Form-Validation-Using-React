import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Form from "./components/Form";

const Table = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    lat: "",
    long: "",
    _id: "",
  });

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
      alert("Data Updated successfully");
      const data = await axios.put("/update", formData);
      setActive(false);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setData(data.data.data);
    }
  };

  const handleEdit = (item) => {
    setActive(true);
    setFormData(item);
  };

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };
  return (
    <div>
      <Nav />
      <div className="flex-1 items-center justify-center">
        <div>
          {active ? (
            <Form
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              rest={formData}
            />
          ) : (
            <table className=" mt-36 ml-20">
              <tr>
                <th>School Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {data.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.address}</td>
                  <td>{item.lat}</td>
                  <td>{item.long}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                      className="ml-3 bg-yellow-400 p-1 w-20 rounded-lg text-white mt-2 mb-2"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="ml-3 bg-red-500 p-1 w-20 rounded-lg text-white mt-2 mb-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Table;
