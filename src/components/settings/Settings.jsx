import { useState } from "react";
import { Drawer } from "antd";
import { DarkMode } from "hooks";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import { MOON, SUN, UCT } from "assets/icon";

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const { settheme, setcolor, setfamily } = DarkMode();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const zoomNum = (num) => {
    document.querySelector("body").style.zoom = num;
  };

  return (
    <>
      <div
        className="w-[48px] h-[48px] bg-[var(--text-color)] flex justify-center items-center text-white text-xl fixed z-50 right-2 top-1/4 rounded-3xl rounded-br-lg cursor-pointer shadow-2xl shadow-[var(--textOpasity-color)]"
        onClick={showDrawer}
      >
        <SettingOutlined className="animate-spin" />
      </div>
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        styles={{
          header: {
            display: "none",
          },
        }}
      >
        <div className="w-full h-full">
          {/* yopish */}
          <div className="flex items-center justify-between p-5 border border-[var(--borderWhite-color)] border-l-0 border-r-0">
            <p className="text-sm font-medium text-[var(--textBlack-color)] max-[540px]:">
              MAVZUNI SOZLASH
            </p>
            <div className="flex items-center justify-between gap-5">
              <button
                onClick={() => {
                  settheme("ligth");
                  setcolor("purple");
                  zoomNum(1);
                  setfamily("inter");
                }}
                className="text-sm font-medium border border-red-500 text-red-500 rounded py-[2px] px-3"
              >
                Qayta yuklash
              </button>
              <span
                onClick={onClose}
                className="text-[var(--textBlack-color)] text-2xl cursor-pointer"
              >
                <CloseOutlined />
              </span>
            </div>
          </div>
          {/* dark mode */}
          <div className="flex items-center justify-between py-4 px-5 bg-[var(--bgGray-color)] border border-[var(--borderWhite-color)] border-l-0 border-r-0">
            <p className="text-sm font-medium text-[var(--textBlack-color)]">
              MAVZU REJIMI
            </p>
            <div className="flex items-center justify-between gap-5">
              <button
                className="w-12 h-12 rounded border-2 border-[var(--border-color)] flex items-center justify-center"
                onClick={() => settheme("ligth")}
              >
                <img src={SUN} alt="sun" />
              </button>
              <button
                className="w-12 h-12 rounded border-2 border-[var(--border-color)] flex items-center justify-center bg-[#121926]"
                onClick={() => settheme("dark")}
              >
                <img src={MOON} alt="moon" />
              </button>
            </div>
          </div>
          {/* change color */}
          <div className="p-5 border border-[var(--borderWhite-color)] border-l-0 border-r-0">
            <p className="text-sm font-medium text-[var(--textBlack-color)]">
              OLDINDAN SOZLANGAN RANG
            </p>
            <div className="open-color-change mt-2 p-3 pb-0 flex flex-wrap gap-3 items-center justify-between">
              <button
                onClick={() => {
                  setcolor("purple");
                }}
                className="w-12 h-12 rounded-full"
                style={{
                  background:
                    "var(--berrydashboard-io-dashboard-default-1920-x-1080-default-linear-dodger-blue-royal-purple, linear-gradient(135deg, #2196F3 50%, #673AB7 50%))",
                }}
              ></button>
              <button
                onClick={() => {
                  setcolor("green");
                }}
                className="w-12 h-12 rounded-full"
                style={{
                  background:
                    "var(--berrydashboard-io-dashboard-default-1920-x-1080-default-linear-lynch-persian-green, linear-gradient(135deg, #607D8B 50%, #009688 50%))",
                }}
              ></button>
              <button
                onClick={() => {
                  setcolor("red");
                }}
                className="w-12 h-12 rounded-full"
                style={{
                  background:
                    "var(--berrydashboard-io-dashboard-default-1920-x-1080-default-linear-cello-french-rose, linear-gradient(135deg, #203461 50%, #EC407A 50%))",
                }}
              ></button>
              <button
                onClick={() => {
                  setcolor("orange");
                }}
                className="w-12 h-12 rounded-full"
                style={{
                  background:
                    "var(--berrydashboard-io-dashboard-default-1920-x-1080-default-linear-eden-ochre, linear-gradient(135deg, #16595A 50%, #C77E23 50%))",
                }}
              ></button>
              <button
                onClick={() => {
                  setcolor("blue");
                }}
                className="w-12 h-12 rounded-full"
                style={{
                  background:
                    "var(--berrydashboard-io-dashboard-default-1920-x-1080-default-san-marino, #3F51B5)",
                }}
              ></button>
            </div>
          </div>
          {/* font size */}
          <div className="p-5 border border-[var(--borderWhite-color)] border-l-0 border-r-0">
            <p className="text-sm font-medium text-[var(--textBlack-color)]">
              SHRIFT KATTALIGI
            </p>
            <div className="open-color-change mt-2 p-3 pb-0 flex flex-wrap gap-3 items-center justify-around">
              <button
                onClick={() => zoomNum(1)}
                className="w-11 h-11 rounded border-2 border-[var(--border-color)] font-medium text-xs text-[var(--textBlack-color)]"
              >
                A
              </button>
              <button
                onClick={() => zoomNum(1.025)}
                className="w-11 h-11 rounded border-2 border-[var(--border-color)] font-medium text-base text-[var(--textBlack-color)]"
              >
                A
              </button>
              <button
                onClick={() => zoomNum(1.05)}
                className="w-11 h-11 rounded border-2 border-[var(--border-color)] font-medium text-xl text-[var(--textBlack-color)]"
              >
                A
              </button>
            </div>
          </div>
          {/* font family */}
          <div className="p-5 border border-[var(--borderWhite-color)] border-l-0 border-r-0">
            <p className="text-sm font-medium text-[var(--textBlack-color)]">
              SHRIFT USLUBI
            </p>
            <div className="open-color-change mt-2 p-3 pb-0 flex flex-wrap gap-3 items-center justify-around">
              <button
                onClick={() => setfamily("inter")}
                className="w-full text-left p-3 rounded border-2 border-[var(--border-color)] font-medium text-sm text-[var(--textBlack-color)] font-['Inter']"
              >
                Inter
              </button>
              <button
                onClick={() => setfamily("poppins")}
                className="w-full text-left p-3 rounded border-2 border-[var(--border-color)] font-medium text-sm text-[var(--textBlack-color)] font-['Poppins']"
              >
                Poppins
              </button>
              <button
                onClick={() => setfamily("roboto")}
                className="w-full text-left p-3 rounded border-2 border-[var(--border-color)] font-medium text-sm text-[var(--textBlack-color)] font-['Roboto']"
              >
                Roboto
              </button>
            </div>
          </div>
          {/* developed by*/}
          <div className="p-5 mt-40 border border-[var(--borderWhite-color)] border-l-0 border-r-0 ">
            <p className="text-sm font-medium text-[var(--textBlack-color)]">
              &copy; 2023 "Ko'prikqurilish" AJ.
            </p>
            <div className="flex items-center justify-start gap-4">
              <p className="text-sm font-medium text-[var(--textBlack-color)]">
                Barcha huquqlar himoyalangan.
              </p>
              <a href="https://uct-org.uz" target="blank">
                <img
                  src={UCT}
                  alt="logo"
                  className="w-14 object-cover object-center"
                />
              </a>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
