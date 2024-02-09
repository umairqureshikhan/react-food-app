import React, { useEffect, useState } from "react";
import logo from "./../public/Foody Zone.png";
import SearchResult from "./components/searchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, Setloading] = useState(false);
  const [error, SetError] = useState(null);
  const [filteredData, SetFilteredData] = useState(null);
  const [selectedBtn, SetSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      Setloading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();

        setData(json);
        SetFilteredData(json);
        Setloading(false);
      } catch (error) {
        SetError("unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);
  console.log(data);
  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if (searchValue === "") {
      SetFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    SetFilteredData(filter);
  };
  const filterfood = (type) => {
    if (type === "all") {
      SetFilteredData(data);
      SetSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    SetFilteredData(filter);
    SetSelectedBtn(type);
  };

  

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "dinner",
      type: "dinner",
    },
    {
      name: "midnight",
      type: "midnight",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading...</div>;

  return (
    <div>
      <div>
        <div className="container">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="Search" />
          </div>
        </div>
        <div className="filter-container">
          {filterBtns.map((value) => (
            <button
              key={value.name}
              onClick={() => filterfood(value.type)}
              className={selectedBtn === value.type ? "selected" : ""}
            >
              {value.name}
            </button>
          ))}
          {/* <button onClick={() => filterfood("Breakfast")}>Breakfast</button>
          <button onClick={() => filterfood("Lunch")}>Lunch</button>
          <button onClick={() => filterfood("Dinner")}>Dinner</button> */}
        </div>
        <SearchResult data={filteredData} />
      </div>
    </div>
  );
};

export default App;
