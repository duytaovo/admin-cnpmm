import { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";

const purchasesApi = {
  getPurchases() {
    return http.get<SuccessResponse<any>>("/admin/purchases", {});
  },
  getDetailProduct(params: any) {
    return http.get<SuccessResponse<any[]>>(`/admin/products/detail/${params}`);
  },
  updatePurchase(_id: any) {
    return http.put<SuccessResponse<any>>(`/admin/purchases/update/${_id}`);
  },
  deletePurchase(idProduct: string[]) {
    return http.delete<SuccessResponse<any>>(
      `/admin/purchases/delete/${idProduct}`
    );
  },
};

export default purchasesApi;
