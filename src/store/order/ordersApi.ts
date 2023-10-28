import { orderService } from "src/services/order.service";
import { getAllOrder } from "./ordersSlice";
export const getAllOrders = async (dispatch: any) => {
  let res = await orderService.getAllOrder();
  dispatch(getAllOrder(res.data));
};
