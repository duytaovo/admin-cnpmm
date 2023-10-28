import React, { ReactNode } from "react";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Link } from "react-router-dom";
import { Dropdown, Space } from "antd";

interface Props {
  children?: ReactNode;
  items?: ItemType[] | undefined;
  className?: string;
  isOnClick?: boolean;
  arrow?: boolean;
  menuStyle?: React.CSSProperties;
}
const CustomDropDown = ({
  children,
  items,
  className,
  isOnClick,
  arrow,
  menuStyle = {},
}: Props) => (
  <div>
    {isOnClick == true ? (
      <div className={className}>
        <Dropdown
          arrow={arrow}
          placement="bottomLeft"
          menu={{ items }}
          trigger={["click"]}
        >
          <Link
            to=""
            onClick={(e) => e.preventDefault()}
            className="hover:text-mainColor"
          >
            <Space>{children}</Space>
          </Link>
        </Dropdown>
      </div>
    ) : (
      <div className={className}>
        <Dropdown
          menu={{ items, style: menuStyle }}
          placement="bottom"
          arrow={arrow}
          className="cursor-pointer hover:text-mainColor"
        >
          {children}
        </Dropdown>
      </div>
    )}
  </div>
);

export default CustomDropDown;
