import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import items from "../data/items.json";
import "./ItemList.css";

const ItemList = () => {
  const [itemList, setItemList] = useState([]);

  // get the itemsList from the items.json file
  useEffect(() => {
    setItemList(items);
  }, []);

  return (
    <div className="ItemList">
      {itemList.map((item) => (
        <div key={item.id} className="item">
          <img src={item.imageUrl} alt={item.name} width="100%" />
          <h2>{item.name}</h2>
          <Link to={`/item/${item.id}`} className="link">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
