import { useState } from "react";
import { Aside } from "./aside";
import { Header } from "./header";

export const Layouts = ({ children }) => {
  const [menu, setmenu] = useState(true);
  const [menuTwo, setmenuTwo] = useState(true);
  const changeMenu = () => {
    if (menu) {
      setmenu(false);
      setmenuTwo(false);
    } else {
      setmenu(true);
      setmenuTwo(true);
    }
  };
  return (
    <div className="bg-[var(--bgWhite-color)] w-full min-h-screen h-max">
      <Header changeMenu={changeMenu} />
      <div
        className={`fixed top-20 left-0 bg-[var(--bgWhite-color)] z-[999]  h-[calc(100vh-80px)] px-4 pt-0 pb-3 overflow-y-auto overflow-x-hidden ease-linear duration-300 ${
          menu ? "w-64" : "w-[78px] max-md:w-64 max-md:translate-x-[-256px]"
        }`}
        onMouseMove={() => {
          if (!menuTwo) setmenu(true);
        }}
        onMouseLeave={() => {
          if (!menuTwo) setmenu(false);
        }}
      >
        <Aside menu={menu} />
      </div>
      <div
        className={`mr-4 p-5 rounded-t-xl bg-[var(--bgGray-color)] ease-linear duration-300 h-[100vh] overflow-y-auto ${
          menu ? "ml-64 max-md:ml-4" : "ml-[78px] max-md:ml-4"
        }`}
      >
        <div className="w-full mt-20 h-max">{children}</div>
      </div>
    </div>
  );
};
