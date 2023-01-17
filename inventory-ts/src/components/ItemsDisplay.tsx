import IItem from "../models/ItemModel";

interface ItemsDisplayProps {
  items: IItem[];
  deleteItem: (item: IItem) => void;
}

function ItemsDisplay(props: ItemsDisplayProps) {
  const showItem = (index: number, item: IItem) => {
    return (
      <tr>
        <th key="id" scope="row">
          {index}
        </th>
        <th key="name" scope="row">
          {item.name}
        </th>
        <th key="price" scope="row">
          {item.price}
        </th>
        <th key="type" scope="row">
          {item.type}
        </th>
        <th key="brand" scope="row">
          {item.brand}
        </th>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => props.deleteItem(item)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };
  return (
    // map tells us how to process each items individually in the list rather than a for-loop
    // React uses the key prop create a relationship between the component and the DOM element. The library uses this relationship to determine whether or not the component should be re-rendered.
    // Keys do not have to be unique globally. They just need to be unique across sibling elements.
    <div className="container">
      <div className="row">
        <h2> Items</h2>
      </div>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr key="">
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Brand</th>
            </tr>
          </thead>
          {/* each value returned by map is going to be a row, within a row exists 5 items mapped to the 5 columns */}
          <tbody>
            {props.items.map((item, index) => {
              return showItem(index + 1, item);
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemsDisplay;
