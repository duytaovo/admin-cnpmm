import { Helmet } from "react-helmet-async";
import Order from "./Order";

const Orders = () => {
  return (
    <div className="h-1/2 bg-white">
      <Helmet>
        <title>{"Trang quản lý đơn hàng "}</title>
        <meta name="description" />
      </Helmet>
      <Order />
    </div>
  );
};

export default Orders;

