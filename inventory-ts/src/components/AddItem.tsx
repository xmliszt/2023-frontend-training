import { useState } from "react";
import IItem from "../models/ItemModel";
import styles from "./AddItem.module.css";

function AddItem({ addItem }: { addItem: (item: IItem) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");

  const addItemButtonPressed = () => {
    addItem({
      name: name,
      price: price,
      type: type,
      brand: brand,
    });
    setName("");
    setPrice(0);
    setType("");
    setBrand("");
  };

  const resetButtonPressed = () => {
    setName("");
    setPrice(0);
    setType("");
    setBrand("");
  };

  return (
    // the Search button is not a submit button
    // set to be just a regular button
    <div className="container">
      <div className="row">
        <h2>Add an Item</h2>
      </div>
      <form onReset={resetButtonPressed}>
        <div className="row">
          <label htmlFor="name-field">Name: </label>
          <input
            id="name-field"
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="price-field">Price: </label>
          <input
            id="price-field"
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
          />
          <label htmlFor="type-field">Type: </label>
          <input
            id="type-field"
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          />
          <label htmlFor="brand-field">Brand: </label>
          <input
            id="brand-field"
            className="form-control"
            type="text"
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          />
        </div>
        <div className="row mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addItemButtonPressed}
          >
            Add Item
          </button>
        </div>
        <div className="row mt-3">
          {/* fake col-4 stuff */}
          <div className="col col-5"></div>
          <button type="reset" className={"col-2 btn " + styles.error}>
            RESET
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItem;
