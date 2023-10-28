import { SuccessResponse } from "src/types/utils.type";
import http from "src/utils/http";

const authApi = {
  login(data: any) {
    return http.post("/login", data);
  },
  register(data: any) {
    return http.post("/register", data);
  },
  logout() {
    return http.post("/logout-user", {});
  },
  addUser(data: any) {
    return http.post("/admin/users", data);
  },
  getUsers() {
    return http.get<SuccessResponse<any>>("/admin/users", {});
  },
  getDetailUser(user_id: any) {
    return http.get<SuccessResponse<any[]>>(`/admin/users/detail/${user_id}`);
  },
  updateUserProfile({ user_id, body }: any) {
    return http.put<SuccessResponse<any>>(
      `/admin/users/update/${user_id}`,
      body
    );
  },
  deleteUser(user_id: any) {
    return http.delete<SuccessResponse<any>>(`/admin/users/delete/${user_id}`);
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>(
      "/admin/users/upload-avatar",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};

export default authApi;
