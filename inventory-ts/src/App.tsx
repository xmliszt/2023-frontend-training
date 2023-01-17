import "./App.css";
import { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import ItemsDisplay from "./components/ItemsDisplay";
import AddItem from "./components/AddItem";
import IItem from "./models/ItemModel";
import ISearchParams from "./models/SearchParamsModel";

function App() {
  // never set data directly
  // data will be updated in the next render
  const [data, setData] = useState<{ items: IItem[] }>({ items: [] });
  const [filters, setFilters] = useState<ISearchParams>();

  useEffect(() => {
    fetch("http://localhost:9000/items").then((response) =>
      response.json().then((data) => {
        console.log(data);
        setData({ items: data });
      })
    );
    return () => {
      console.log("unmount");
    };
  }, []); // if dependency array is empty, line 30 will only be called once

  const updateFilters = (searchParams: ISearchParams) => {
    setFilters(searchParams);
  };

  const deleteItem = useCallback((item: IItem) => {
    const items = data["items"];
    const requestOptions = {
      method: "DELETE",
    };

    fetch(`http://localhost:9000/items/${item.name}`, requestOptions).then(
      (response) => {
        if (response.ok) {
          //update the current state
          const idx = items.indexOf(item);
          // splice to index delete
          items.splice(idx, 1);
          setData({ items: items });
        }
      }
    );
  }, []);

  const addItemToData = (item: IItem) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };

    fetch("http://localhost:9000/items", requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        let itemsValue = data["items"];
        itemsValue.push(responseData);
        setData({ items: itemsValue });
      });
  };

  const filterData = (data: IItem[]) => {
    if (filters === undefined) return;
    if (
      (filters.name === "" || filters.name === undefined) &&
      (filters.price === 0 || filters.price === undefined) &&
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
        ((filters.price ?? 0 >= item.price) || filters.price === 0) &&
        (item.type === filters.type || filters.type === "") &&
        (item.brand === filters.brand || filters.brand === "")
      );
    });
    return filteredData;
  };

  return (
    <div className="container">
      <div className="row">
        <h1 color="gray">Item Inventory Tracker</h1>
      </div>
      <div className="row mt-3">
        <SearchBar updateSearchParams={updateFilters} />
      </div>
      <div className="row mt-3">
        <ItemsDisplay
          items={filterData(data["items"]) ?? []}
          deleteItem={deleteItem}
        />
      </div>
      <div className="row mt-3">
        <AddItem addItem={addItemToData} />
      </div>
    </div>
  );
}

export default App;
