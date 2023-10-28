import { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";

const categoryApi = {
  addCategory(data: any) {
    return http.post("/admin/categories", data);
  },
  getCategorys() {
    return http.get<SuccessResponse<any>>("/admin/categories", {});
  },
  getDetailCategory(params: any) {
    return http.get<SuccessResponse<any[]>>(
      `/admin/categories/detail/${params}`,
      {
        params,
      }
    );
  },
  updateCategory({ _id, body }: any) {
    return http.put<SuccessResponse<any>>(
      `/admin/categories/update/${_id}`,
      body
    );
  },
  deleteCategory(idcategory: string[]) {
    return http.delete<SuccessResponse<any>>(
      `/admin/categories/delete/${idcategory}`
    );
  },
};

export default categoryApi;
