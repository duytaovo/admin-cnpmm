import React, { ChangeEvent, memo, useState } from "react";
import { IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useAppDispatch } from "src/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";
import { use } from "i18next";
interface Props {
  placeholder: string;
  onChange: (value: string) => void;
  width?: string;
}

const Search = ({ placeholder, onChange, width }: Props) => {
  const dispatch = useAppDispatch();
  const [valueSearch, setValueSearch] = useState("");
  const getValue = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setValueSearch(value);
    onChange && onChange(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // onChange && onChange(valueSearch)
    }
  };

  return (
    <div
      style={{ width: width, height: 35 }}
      className="flex h-8 content-center border items-center  rounded  text-xl shadow"
    >
      <IconButton />
      <input
        className="mr-5 placeholder:text-xl focus:outline-none w-[inherit] text-xl bg-transparent"
        type="search"
        placeholder={`${placeholder}...`}
        onChange={getValue}
        onKeyDown={handleKeyDown}
        // defaultValue={JSON.parse(localStorage.getItem('end') || '')?.properties?.name}
        // defaultValue={''}
      />
      <SearchOutlinedIcon sx={{}} className="text-mainColor" />
    </div>
  );
};

export default memo(Search);
