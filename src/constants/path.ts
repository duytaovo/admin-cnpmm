const path = {
  home: "/",
  login: "/login",
  logout: "/logout",
  register: "/register",
  orders: "/orders",
  users: "/users",
  usersNew: "/users/new",
  usersDetail: "/user/detail/:user_id",
  products: "/products",
  productsDetail: "/product/detail/:_id",
  productNew: "/products/new",
  categories: "/categories",
  category: "/category/detail/:_id",
  categoryNew: "/category/new",
  brand: "/brand",
  brandDetail: "/brand/detail",
  brandNew: "/brand/new",
} as const;

export default path;
