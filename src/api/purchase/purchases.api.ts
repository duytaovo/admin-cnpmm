import { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";

const purchasesApi = {
  getPurchases() {
    return http.get<SuccessResponse<any>>("/admin/purchases", {});
  },
  getDetailPurchase(params: any) {
    return http.get<SuccessResponse<any[]>>(
      `/admin/purchases/detail/${params}`,
    );
  },
  updatePurchase(_id: any) {
    return http.put<SuccessResponse<any>>(`/admin/purchases/update/${_id}`);
  },
  deletePurchase(idProduct: string[]) {
    return http.delete<SuccessResponse<any>>(
      `/admin/purchases/delete/${idProduct}`,
    );
  },
};

export default purchasesApi;

