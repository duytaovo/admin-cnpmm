import MoreVertIcon from "@mui/icons-material/MoreVert";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { Box, CircularProgress, Typography } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import { Progress } from "antd";

export default function Featured() {
  return (
    <div className="flex-[2] shadow-[2px 4px 10px 1px rgba(0, 0, 0, 0.47)] p-[3]">
      <div className="flex items-center justify-between text-gray-500">
        <h1 className="text-lg font-medium">Total Revenue</h1>
        <MoreVertIcon fontSize="large" />
      </div>
      <div className="p-5 flex items-center justify-between flex-col gap-4 ">
        <div className="w-1/3">
          {/* <Progress
            type="circle"
            percent={75}
            strokeWidth={5}
            className="text-blue"
          /> */}
          <CircularProgressbar
            value={70}
            text={"70%"}
            strokeWidth={5}
            className="text-blue"
          />
        </div>
        <p className="text-gray-500 font-medium">Total sales made today</p>
        <p className="text-[25px]">$420</p>
        <p className="font-[300] text-[12px] text-gray-500 text-center">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="w-full flex items-center justify-between">
          <div className="text-center">
            <div className="text-2xl text-gray-500">Target</div>
            <div className="flex item-center mt-[10px] text-3xl text-red-500">
              <KeyboardArrowDownIcon fontSize="medium" />
              <div className="text-3xl">$12.4k</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-gray-500">Last Week</div>
            <div className="flex item-center mt-[10px] text-3xl text-green-500">
              <KeyboardArrowUpOutlinedIcon fontSize="medium" />
              <div className="text-3xl">$12.4k</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-gray-500">Last Month</div>
            <div className="flex item-center mt-[10px] text-3xl text-green-500">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="text-3xl">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
