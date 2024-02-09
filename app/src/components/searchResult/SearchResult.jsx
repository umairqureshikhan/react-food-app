import React from "react";
import { BASE_URL } from "../../App";

const SearchResult = ({ data: foods }) => {
  return (
    <div>
      <div className="food-card-container">
        {foods && foods.length > 0 ? (
          foods.map(({ name, image, text, price }) => (
            <div className="food_info" key={name}>
              <div className="food_image">
                <img src={BASE_URL + image} alt={name} />
              </div>
              <div className="info">
                <h3>{name}</h3>
                <p>{text}</p>
                <button>${price}</button>
              </div>
            </div>
          ))
        ) : (
          <div className="food_info">
            <p className="nofood">No food available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
