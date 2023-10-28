import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useContext } from "react";
import { DarkModeContext } from "src/contexts/darkModeContext";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { changeLanguage } from "i18next";
import { MenuProps } from "antd";
import CustomDropDown from "../Dropdown/Dropdown";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { locales } from "src/i18n/i18n";
import Search from "../Search";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <button
        className=" px-2 text-left text-xl hover:text-mainColor"
        onClick={() => changeLanguage("vi")}
      >
        VN
      </button>
    ),
  },
  {
    key: "2",
    label: (
      <button
        className="px-2 text-left text-xl hover:text-mainColor "
        onClick={() => changeLanguage("en")}
      >
        ENG
      </button>
    ),
  },
];
const customDropdownStyle = {
  arrow: false,
  isOnClick: false,
  className: "px-1 mx-3 text-xl xl:p-0 xl:mr-0 hover:text-mainColor",
};
const menuStyle = {
  padding: "20px 20px",
  borderRadius: "16px",
};
export default function NavbarCustom() {
  const { t } = useTranslation("home");
  const { i18n } = useTranslation();
  const currentLanguage = locales[i18n.language as keyof typeof locales];
  const { setEnable, enable } = useContext(DarkModeContext);
  return (
    <div className="h-[50px] border-b-[0.5px_solid_rgb(231,228,228)] flex items-center text-base text-[#555]">
      <div className="w-full p-5 flex items-center justify-between">
        <div className="flex items-center border-[0.5px solid lightgray] dark">
          <Search onChange={() => {}} placeholder="Tìm kiếm" width="300px" />
        </div>
        <div className="flex items-center">
          <div className="">
            <CustomDropDown
              {...customDropdownStyle}
              menuStyle={menuStyle}
              items={items}
            >
              <div className=" hover:text-mainColor">
                <LanguageIcon />
                <span className="mx-1 text-mainColor text-xl">
                  {currentLanguage}
                </span>
              </div>
            </CustomDropDown>
          </div>
          <div className="flex items-center mr-5 relative">
            {enable === "true" ? (
              <IconButton>
                <DarkModeOutlinedIcon
                  className="text-xl  text-white/70"
                  onClick={() => {
                    setEnable("false");
                    localStorage.setItem("enable", "false");
                  }}
                />
              </IconButton>
            ) : (
              <IconButton>
                <LightModeOutlinedIcon
                  className="text-xl"
                  onClick={() => {
                    setEnable("true");
                    localStorage.setItem("enable", "true");
                  }}
                />
              </IconButton>
            )}
          </div>
          <div className="flex item-center mr-5 relative">
            <FullscreenExitOutlinedIcon className="text-xl" />
          </div>
          <div className="flex item-center mr-5 relative">
            <NotificationsNoneOutlinedIcon className="text-xl" />
            <div className="w-[15px] h-[15px] bg-red-500 rounded-[50%] text-white flex items-center justify-center text-[10px] font-bold absolute -top-[5px] -r-[5px]">
              1
            </div>
          </div>
          <div className="flex item-center mr-5 relative">
            <ChatBubbleOutlineOutlinedIcon className="text-xl" />
            <div className="w-[15px] h-[15px] bg-red-500 rounded-[50%] text-white flex items-center justify-center text-[10px] font-bold absolute -top-[5px] -r-[5px]">
              2
            </div>
          </div>
          <div className="flex item-center mr-5 relative">
            <ListOutlinedIcon className="text-xl" />
          </div>
          <div className="flex item-center mr-5 relative">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="w-[30px] h-[30px] rounded-[50%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
