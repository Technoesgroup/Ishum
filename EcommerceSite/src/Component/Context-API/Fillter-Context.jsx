import { createContext, useContext, useState, useEffect } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // All products from backend
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setSelected] = useState({
    category: null,
    size: null,
    color: null,
    tag: null, // for EXCLUSIVE, DHOTI, etc.
    collection: null,
  });

  const normalize = (str) => str?.toLowerCase().trim(); 




  useEffect(() => {
    fetch("http://localhost:4000/api/products/get-product")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data); // Yeh line check karni zaruri hai
        setProducts(data.products); // 👈 Yeh tabhi chalega jab 'products' key ho data me
      })
      .catch((err) => console.error(err));
  }, []);
  

  useEffect(() => {

    // console.log("Selected Collection:", selected.collection);
    // console.log("All Products:", products);

    let filtered = [...products];



    if (selected.category) {
      filtered = filtered.filter(
        (item) => item.category === selected.category
      );
    }

    if (selected.size) {
      filtered = filtered.filter((item) => item.size === selected.size);
    }

    if (selected.color) {
      filtered = filtered.filter((item) => item.color === selected.color);
    }

    if (selected.tag) {
      filtered = filtered.filter((item) =>
        item.tags?.includes(selected.tag.toLowerCase())
      );
    }
   
  // Collection filter
  if (selected.collection) {
    // console.log("Filtering by collection:", selected.collection);
      filtered = filtered.filter((item) => {
        return normalize(item.collectionName).includes(normalize(selected.collection));
    });
  }
  
    setFilteredProducts(filtered);
  }, [selected, products]);

  const handleSelection = (section, value) => {
    setSelected((prev) => ({ ...prev, [section]: value }));
  };

  return (
    <FilterContext.Provider
      value={{ selected, setSelected, handleSelection, filteredProducts }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);


