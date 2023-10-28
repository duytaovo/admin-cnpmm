import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

export default function Widget({ type, path }: { type: string; path: string }) {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="text-[25px] rounded-[5px] self-end"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="text-[25px]  rounded-[5px] self-end"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="text-[25px]  rounded-[5px] self-end"
            style={{
              backgroundColor: "rgba(0, 128, 0, 0.2)",
              color: "green",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceOutlinedIcon
            className="text-[25px]  rounded-[5px] self-end"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }
  return (
    <div className="widget flex justify-between flex-1 p-[10px] shadow-[2px_4px_10px_1px_rgba(201,201,201,0.47)] rounded-[10px] h-[100px]">
      <div className="flex flex-col justify-between">
        <span className="font-bold text-base text-[rgb(160,160,160)]">
          {data?.title}
        </span>
        <span className="text-[28px] font-light">
          {data?.isMoney && "$"} {amount}
        </span>
        <Link to={`${type}s`}>
          <span className="w-max text-lg border-b-[1px_solid_gray]">
            {data?.link}
          </span>
        </Link>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center text-xl text-green-500">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data?.icon}
      </div>
    </div>
  );
}
