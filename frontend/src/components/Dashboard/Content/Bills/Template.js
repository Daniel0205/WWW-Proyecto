import React from "react";
import Image from "./Template.jpg";
import "./Template.css";

const customer = {
  id: "1630536",
  name: "JEM POOL",
  last_name: "SUAREZ",
  email: "jem.suarez@correounivalle.edu.co",
  city: "CALI",
  address: "CL 72C 5N-45",
  neighborhood: "Los Guaduales",
  strata: "3",
  due_date: "May 12, 2019",
  amount_due: "$106.62",
};

export default function Template() {
  return (
    <div className="text">
      <div className="container">
        <img src={Image} alt="" />
      </div>

      <span id="service">{"Service to:"}</span>
      <span id="name">{customer.name + " " + customer.last_name}</span>
      <span id="address">{customer.address + ", " + customer.city}</span>
      <span id="due_date">{customer.due_date}</span>
      <span id="amount_due">{customer.amount_due}</span>
    </div>
  );
}
