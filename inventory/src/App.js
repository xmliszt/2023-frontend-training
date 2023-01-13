import "./App.css";
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ItemsDisplay from "./components/ItemsDisplay";
import AddItem from "./components/AddItem";
import styled from "styled-components";

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: midnightblue;
  font-weight: bolder;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding-top: 5em;
  background: ghostwhite;
`;

function App() {
  const [data, setData] = useState({ items: [] });
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/items").then((response) => {
      response.json().then((items) => {
        setData({
          items,
        });
      });
    });
  }, []);

  const updateFilters = (searchParams) => {
    setFilters(searchParams);
  };

  const addItemToData = (item) => {
    let itemsValue = data["items"];
    item.id = itemsValue.length;
    itemsValue.push(item);
    setData({ items: itemsValue });
  };

  const filterData = (data) => {
    let filtersPrice = parseInt(filters.price);
    // check if at least one field is true
    if (
      (filters.name === "" || filters.name === undefined) &&
      (filtersPrice === 0 || isNaN(filtersPrice)) &&
      (filters.type === "" || filters.type === undefined) &&
      (filters.brand === "" || filters.brand === undefined)
    ) {
      console.log("no search, returning all items");
      return data;
    }

    const filteredData = data.filter((item) => {
      // must match all
      return (
        (item.name === filters.name || filters.name === "") &&
        (filtersPrice >= Number(item.price) || filtersPrice === 0) &&
        (item.type === filters.type || filters.type === "") &&
        (item.brand === filters.brand || filters.brand === "")
      );
    });
    return filteredData;
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <Title color="gray">Item Inventory Tracker</Title>
        </div>
        <div className="row mt-3">
          <SearchBar updateSearchParams={updateFilters} />
        </div>
        <div className="row mt-3">
          <ItemsDisplay items={filterData(data["items"])} />
        </div>
        <div className="row mt-3">
          <AddItem addItem={addItemToData} />
        </div>
      </div>
    </Wrapper>
  );
}

export default App;
