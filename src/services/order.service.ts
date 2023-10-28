import http from "src/utils/http";

export const orderService = {
  getAllOrder() {
    return http.get(`${""}/orders/`);
  },

  updateHistoryOrder(id: number, data: any) {
    return http.patch(`${""}/orders/${id}`, data);
  },
};
