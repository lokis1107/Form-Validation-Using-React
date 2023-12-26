import React, { useState } from "react";

const Form = ({ handleSubmit, handleChange, rest }) => {
  const [errors, setErrors] = useState({});
  return (
    <div>
      <form onSubmit={handleSubmit} className=" mt-10">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="name"
            value={rest.name}
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
            value={rest.email}
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
            value={rest.mobile}
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
            value={rest.address}
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
            value={rest.lat}
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
            value={rest.long}
            autoComplete="off"
            placeholder="Longidute"
            onChange={handleChange}
          />
          {errors.long && <span>{errors.long}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
