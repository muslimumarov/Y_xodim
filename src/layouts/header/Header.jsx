import {
  BellOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LogoutOutlined,
  PicLeftOutlined,
  SettingOutlined,
  TranslationOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import { LOGO } from "assets/icon";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginStore } from "stores";

export const Header = ({ changeMenu }) => {
  const [screen, setscreen] = useState(false);
  const { logOut } = useLoginStore();
  const fullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setscreen(false);
    } else {
      document.body.requestFullscreen();
      setscreen(true);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-20 px-6 bg-[var(--bgWhite-color)] flex items-center justify-between z-[999]">
      <div className="flex items-center justify-start gap-10">
        <div className="flex items-start justify-center flex-col max-md:hidden">
          {/* <h1 className="text-xl leading-5 font-['Kanit'] text-[var(--text-color)]">{`"KO‘PRIKQURILISH"`}</h1>
          <h3 className="text-lg leading-5 font-['Kanit'] text-[var(--text-color)]">
            Aksiyadorlik jamiyati
          </h3> */}
          <img
            src={LOGO}
            alt=""
            className="w-[160px] object-cover object-center"
          />
        </div>
        <button
          onClick={changeMenu}
          className="bg-[var(--textOpasity-color)] px-3 py-1 rounded text-[var(--text-color)] text-lg hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300"
        >
          <PicLeftOutlined />
        </button>
      </div>
      <div className="flex items-center justify-end gap-6">
        <Popover
          placement="bottom"
          content={
            <div className="flex flex-col items-start justify-center">
              <p className="cursor-pointer text-center px-4 py-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)]">
                O'zb
              </p>
              <p className="cursor-pointer text-center px-4 py-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)]">
                Ўзб
              </p>
              <p className="cursor-pointer text-center px-4 py-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)]">
                Rus
              </p>
              <p className="cursor-pointer text-center px-4 py-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)]">
                Eng
              </p>
            </div>
          }
          trigger="click"
        >
          <div className="text-xl flex items-center justify-center bg-[var(--textOpasity-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300 p-2  rounded-lg">
            <TranslationOutlined />
          </div>
        </Popover>
        <div
          onClick={fullScreen}
          className="text-xl flex items-center justify-center bg-[var(--borderOpasity-color)] text-[var(--border-color)] hover:bg-[var(--border-color)] hover:text-white ease-linear duration-300 p-2  rounded-lg"
        >
          {screen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </div>
        <div className="text-xl flex items-center justify-center bg-[var(--textOpasity-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300 p-2  rounded-lg">
          <BellOutlined />
        </div>
        <Popover
          placement="bottomRight"
          content={
            <div className="flex flex-col items-start justify-center min-w-[140px]">
              <Link
                to="/profile"
                className="flex items-center justify-start gap-4 px-4 py-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)]"
              >
                <UserAddOutlined />
                Profil
              </Link>
              <div
                className="flex cursor-pointer items-center justify-start gap-4 px-4 py-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)]"
                onClick={logOut}
              >
                <LogoutOutlined />
                Chiqish
              </div>
            </div>
          }
          trigger="click"
        >
          <div className="text-lg flex items-center justify-center gap-3 bg-[var(--borderOpasity-color)] text-[var(--border-color)] hover:bg-[var(--border-color)] hover:text-white ease-linear duration-300 p-2 pr-4 rounded-3xl">
            <img
              className="w-9 h-9 object-cover object-center rounded-full"
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="profile"
            />
            <SettingOutlined />
          </div>
        </Popover>
      </div>
    </div>
  );
};
