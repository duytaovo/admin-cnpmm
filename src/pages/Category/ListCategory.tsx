import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TableCategory from "./Tables";

export default function ListCategory() {
  const locationUrl = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    function getProducts() {
      //   ProductService.getProducts(1, 9999).then((res) => setData(res.data));
    }
    getProducts();
  }, []);
  return (
    <div>
      <TableCategory />
    </div>
  );
}
