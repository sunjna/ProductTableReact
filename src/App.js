import { useState } from "react";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export const FilterableProductTable = ({ products }) => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const onFilterTextChange = (value) => {
    setFilterText(value);
  };
  const handleOnChange1 = (checked) => {
    setInStockOnly(checked);
  };
  return (
    <>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={onFilterTextChange}
        inStockOnly={inStockOnly}
        handleOnChange1={handleOnChange1}
      />
      <FilterTable
        products={products}
        inStockOnly={inStockOnly}
        filterText={filterText}
      />
    </>
  );
};

const ProductCategoryRow = ({ product }) => {
  return (
    <tr>
      <th colSpan="2">{product.category}</th>
    </tr>
  );
};
export const FilterTable = ({ products, inStockOnly, filterText }) => {
  const rows = [];
  const category = {};
  let lastCategory = null;
  products.forEach((product) => {
    if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
      return;
      return null;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow product={product} />);
      lastCategory = product.category;
    }
    rows.push(<ProductRow product={product} />);
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
export const ProductRow = ({ product }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}> {product.name}</span>
  );

  return (
    <tr>
      <th>{name}</th>
      <th>{product.price}</th>
    </tr>
  );
};
export const SearchBar = ({
  filterText,
  onFilterTextChange,
  inStockOnly,
  handleOnChange1,
}) => {
  return (
    <form>
      <input
        type="text"
        placeHolder="Search"
        value={filterText}
        onChange={(e) => {
          onFilterTextChange(e.target.value);
        }}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => {
            handleOnChange1(e.target.checked);
          }}
        />
        Only Show Products in stock
      </label>
    </form>
  );
};

const App = () => {
  return <FilterableProductTable products={PRODUCTS} />;
};

export default App;
