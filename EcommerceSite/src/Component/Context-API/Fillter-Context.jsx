import { createContext, useContext, useState, useEffect } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // All products from backend
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selected, setSelected] = useState({
    category: null,
    size: null,
    color: null,
    tag: null, 
    collection: null,
    price:null
  });

  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

  const normalize = (str) => str?.toLowerCase().trim(); 


  useEffect(() => {
    fetch(`${baseURL}/api/products/get-product`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products); 
      })
      .catch((err) => console.error(err));
  }, []);
  

  useEffect(() => {

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
   
   if (selected.collection) {
    filtered = filtered.filter((item) => {
      if (typeof item.collectionName === "object" && item.collectionName?.title) {
        return normalize(item.collectionName.title) === normalize(selected.collection);
      }
      return normalize(item.collectionName) === normalize(selected.collection);
    });
  }

  if (selected.price) {
    filtered = filtered.filter((item) => item.price <= selected.price); // Price filter
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


