import { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";

const productApi = {
  addProduct(data: any) {
    return http.post("/admin/products", data);
  },
  getProducts() {
    return http.get<SuccessResponse<any>>("/admin/products", {});
  },
  getDetailProduct(params: any) {
    return http.get<SuccessResponse<any[]>>(`/admin/products/detail/${params}`);
  },
  updateProduct({ _id, body }: any) {
    return http.put<SuccessResponse<any>>(
      `/admin/products/update/${_id}`,
      body
    );
  },
  deleteProduct(idProduct: string[]) {
    return http.delete<SuccessResponse<any>>(
      `/admin/products/delete/${idProduct}`,
      {
        data: idProduct,
      }
    );
  },
  uploadImageProduct(body: FormData) {
    return http.post<SuccessResponse<string>>(
      "/admin/products/upload-image",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  uploadImagesProduct(body: FormData) {
    return http.post<SuccessResponse<string>>(
      "/admin/products/upload-images",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};

export default productApi;
