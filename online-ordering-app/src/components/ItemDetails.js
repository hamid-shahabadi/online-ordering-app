import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import items from "../data/items.json";
import { CartContext } from "../context/CartContext";
import "./ItemDetails.css";

const ItemDetail = () => {
  const { id } = useParams();
  const { addItemToCart } = useContext(CartContext);
  const item = items.find((item) => item.id === id);

  //if the user tries to go to a page whos id doesnt exist then show item not found message
  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="itemDetails">
      <h2>{item.name} - Details</h2>
      <img src={item.imageUrl} alt={item.name} />
      <p className="description">{item.description}</p>
      <p className="price">{item.price / 100}$</p>
      <button onClick={() => addItemToCart({ ...item, quantity: 1 })}>
        Add to Cart
      </button>
    </div>
  );
};

export default ItemDetail;
