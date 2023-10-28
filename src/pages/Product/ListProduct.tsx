import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TableProduct from "./Tables";

export default function ListProduct() {
  return (
    <div>
      <div>
        <TableProduct />
      </div>
    </div>
  );
}
