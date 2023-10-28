import { lazy } from "react";
import path from "src/constants/path";

const Home = lazy(() => import("src/pages/Home/Home"));
const Orders = lazy(() => import("src/pages/Order"));
const NotFound = lazy(() => import("src/pages/NotFound/NotFound"));
const ListUser = lazy(() => import("src/pages/ListUser/ListUser"));
const AddUser = lazy(() => import("src/pages/ListUser/NewUser"));
const UpdateUser = lazy(() => import("src/pages/ListUser/UpdateUser"));
const Products = lazy(() => import("src/pages/Product"));
const Categorys = lazy(() => import("src/pages/Category"));
const UpdateProduct = lazy(() => import("src/pages/Product/UpdateProduct"));
const UpdateCategory = lazy(() => import("src/pages/Category/UpdateCategory"));
const NewCategory = lazy(() => import("src/pages/Category/NewCategory"));
const Purchase = lazy(() => import("src/pages/Purchases"));
const TabsProducts = lazy(() => import("src/pages/TabsProducts"));

export const routeMain = [
  {
    path: path.home,
    Component: Home,
  },
  {
    path: path.orders,
    Component: Purchase,
  },
  {
    path: path.users,
    Component: ListUser,
  },
  {
    path: path.usersDetail,
    Component: UpdateUser,
  },
  {
    path: path.usersNew,
    Component: AddUser,
  },
  {
    path: path.products,
    Component: Products,
  },
  {
    path: path.productNew,
    Component: TabsProducts,
  },
  {
    path: path.productsDetail,
    Component: UpdateProduct,
  },
  {
    path: path.categories,
    Component: Categorys,
  },
  {
    path: path.category,
    Component: UpdateCategory,
  },
  {
    path: path.categoryNew,
    Component: NewCategory,
  },

  {
    path: "*",
    Component: NotFound,
  },
];
