import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Person_add() {
  let navigate = useNavigate();
  const AddUser = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    const response = await fetch(
      "https://pharma-mobile-backend.herokuapp.com/person_add/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          last: e.target.last.value,
          description: e.target.description.value,
          price: e.target.price.value,
        }),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      navigate(`/person/${data.id}`);
    } else {
      console.log("somethin went wrong status is not 200 ");
    }
  };
  return (
    <div>
      <form className=" add-person-form add-order-form" onSubmit={AddUser}>
        <div className="add-order-container">
          <label for="name">Name:</label>
          <input
            className="input-text"
            type="text"
            id="name"
            name="name"
            placeholder="type a name"
          />

          <label for="last">last:</label>
          <input
            className="input-text"
            type="text"
            id="last"
            name="last"
            placeholder="type a your last name"
          />

          <label for="description">describtion:</label>
          <input
            className="input-text"
            type="text"
            id="description"
            name="description"
            placeholder="description"
          />

          <label for="price">price:</label>
          <input
            className="input-text"
            type="text"
            id="price"
            name="price"
            placeholder="price"
          />
          <button className="add-button search-button">ADD</button>
        </div>
      </form>
    </div>
  );
}

export default Person_add;
