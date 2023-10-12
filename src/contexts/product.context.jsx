import { createContext, useState, useEffect } from "react";

import PRODUCTS from "../shop-data.json";

import {
  onAuthStateChangedListner,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const ProductsContext = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  useEffect(() => {
    const unsubcribe = onAuthStateChangedListner((Product) => {
      if (Product) {
        createUserDocumentFromAuth(Product);
      }
    });

    return unsubcribe;
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
