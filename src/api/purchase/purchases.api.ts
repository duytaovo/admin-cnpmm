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
  updateGetting(_id: any) {
    return http.put<SuccessResponse<any>>(
      `/admin/purchases/updateGetting/${_id}`,
    );
  },
  updateProgress(_id: any) {
    return http.put<SuccessResponse<any>>(
      `/admin/purchases/updateProgress/${_id}`,
    );
  },
  updateDelivered(_id: any) {
    return http.put<SuccessResponse<any>>(
      `/admin/purchases/updateDelivered/${_id}`,
    );
  },
  updateCancel(_id: any) {
    return http.put<SuccessResponse<any>>(
      `/admin/purchases/updateCancel/${_id}`,
    );
  },

  deletePurchase(idProduct: string[]) {
    return http.delete<SuccessResponse<any>>(
      `/admin/purchases/delete/${idProduct}`,
    );
  },
};

export default purchasesApi;

