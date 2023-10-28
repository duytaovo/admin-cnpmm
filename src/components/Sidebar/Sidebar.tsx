import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ChatIcon from "@mui/icons-material/Chat";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "src/contexts/darkModeContext";
import { useTranslation } from "react-i18next";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
export default function Sidebar() {
  const { enable, setEnable } = useContext(DarkModeContext);
  const { t } = useTranslation("home");
  const logout = () => {
    if (confirm("Bạn có muốn thoát không?")) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };
  return (
    <div className="border-r-[0.5px_solid_rgb(230,227,227)] min-h-screen bg-white sidebar">
      <div className="h-[50px] flex items-center justify-center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="text-xl font-bold text-mainColor">TECH-ADMIN</span>
        </Link>
      </div>
      <hr />
      <div className="pl-[10px]">
        <ul>
          <p className="text-[10px] font-bold text-[#999] mt-[15px] mb-[5px]">
            MAIN
          </p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]">
              <DashboardIcon className="text-[18px] text-mainColor" />
              <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
                {t("sidebar.dashboard")}
              </span>
            </li>
          </Link>
          <p className="text-[10px] font-bold text-[#999] mt-[15px] mb-[5px]">
            LISTS
          </p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]">
              <PersonOutlineIcon className="text-[18px] text-mainColor" />
              <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
                {t("sidebar.users")}
              </span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]">
              <StoreIcon className="text-[18px] text-mainColor" />
              <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
                {t("sidebar.products")}
              </span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]">
              <CreditCardIcon className="text-[18px] text-mainColor" />
              <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
                {t("sidebar.orders")}
              </span>
            </li>
          </Link>
          <Link to="/delivery" style={{ textDecoration: "none" }}>
            <li className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]">
              <LocalShippingIcon className="text-[18px] text-mainColor" />
              <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
                {t("sidebar.delivery")}
              </span>
            </li>
          </Link>
          <Link to="/category" style={{ textDecoration: "none" }}>
            <li className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]">
              <CategoryOutlinedIcon className="text-[18px] text-mainColor" />
              <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
                {t("sidebar.Category")}
              </span>
            </li>
          </Link>
          <Link to="/brand" style={{ textDecoration: "none" }}>
            <li className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]">
              <LocalPoliceOutlinedIcon className="text-[18px] text-mainColor" />
              <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
                {t("sidebar.Brand")}
              </span>
            </li>
          </Link>
          <Link to="/order" style={{ textDecoration: "none" }}></Link>
          <p className="text-[10px] font-bold text-[#999] mt-[15px] mb-[5px]">
            USEFUL
          </p>
          <li className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]">
            <InsertChartIcon className="text-[18px] text-mainColor" />
            <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
              {t("sidebar.status")}
            </span>
          </li>
          <li className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]">
            <NotificationsNoneIcon className="text-[18px] text-mainColor" />
            <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
              {t("sidebar.notification")}
            </span>
          </li>
          <p className="text-[10px] font-bold text-[#999] mt-[15px] mb-[5px]">
            USER
          </p>
          <li className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]">
            <AccountCircleOutlinedIcon className="text-[18px] text-mainColor" />
            <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
              {t("sidebar.profile")}
            </span>
          </li>
          <li
            onClick={logout}
            className="flex item-center p-[5px] cursor-pointer hover:bg-[#ece8ff]"
          >
            <ExitToAppIcon className="text-[18px] text-mainColor" />
            <span className="text-[13px] font-[600] text-[#888] ml-[10px]">
              {t("sidebar.logout")}
            </span>
          </li>
        </ul>
      </div>
      <div className="flex items-center m-[10px]">
        <div
          className="w-5 h-5 rounded border-[1px_solid_#7451f8] cursor-pointer m-[5px]"
          onClick={() => setEnable("false")}
        >
          <LightModeOutlinedIcon />
        </div>
        <div
          className="w-5 h-5 rounded border-[1px_solid_#7451f8] cursor-pointer m-[5px]"
          onClick={() => setEnable("true")}
        >
          <Brightness4OutlinedIcon />
        </div>
      </div>
    </div>
  );
}
