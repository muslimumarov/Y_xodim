import {
  CaretDownOutlined,
  CaretRightFilled,
  CaretUpOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const AsideMenusChild = ({ data, change }) => {
  const [menu, setmenu] = useState(true);
  const [height, setheight] = useState(0);
  const first = useRef();

  const changeMenu = () => {
    setmenu(!menu);
    setheight(first.current.scrollHeight);
  };
  useEffect(() => {
    setmenu(true);
  }, [change]);
  return (
    <>
      <p
        onClick={changeMenu}
        className={
          menu
            ? "text-sm font-medium flex items-center justify-start gap-4 px-4 py-2 mt-1 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--text-color)] overflow-hidden whitespace-nowrap"
            : "text-sm font-medium flex items-center justify-start gap-4 px-4 py-2 mt-1 bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--text-color)] overflow-hidden whitespace-nowrap"
        }
      >
        {menu ? <CaretDownOutlined /> : <CaretUpOutlined />}
        {data?.title?.length > 30 ? (
          <marquee>{data?.title}</marquee>
        ) : (
          data?.title
        )}
      </p>
      <ul
        style={{
          height: `${menu ? 0 : height}px`,
        }}
        ref={first}
        className={
          menu
            ? "overflow-hidden ease-linear duration-300 px-3"
            : "overflow-hidden ease-linear duration-300 border border-[var(--borderWhite-color)] border-t-0 border-r-0 border-b-0 ml-6 my-3 px-3"
        }
      >
        {data?.child?.map((item) => {
          if (item.index)
            return (
              <li key={item.id} className="mt-5 first:mt-0">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center justify-start gap-2 text-sm font-medium w-full ease-linear duration-300 text-[var(--text-color)] overflow-hidden whitespace-nowrap"
                      : "flex items-center justify-start gap-2 text-sm font-medium w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--text-color)] overflow-hidden whitespace-nowrap"
                  }
                >
                  <CaretRightFilled />
                  {item?.title?.length > 20 ? (
                    <marquee>{item?.title}</marquee>
                  ) : (
                    item?.title
                  )}
                </NavLink>
              </li>
            );
        })}
      </ul>
    </>
  );
};
