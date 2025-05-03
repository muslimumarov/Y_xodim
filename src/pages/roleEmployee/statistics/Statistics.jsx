import { BG, BG2, E1, E2, E3 } from "assets/icon";
import { Breadcrumb, Loading } from "components";
import { useGet } from "hooks";
import { useNavigate } from "react-router-dom";

export const Statistics = () => {
  const navigate = useNavigate();
  const {
    data: { data },
  } = useGet({
    url: `employee/birth-date-count`,
  });
  const {
    data: { data: jobs },
    isLoading,
  } = useGet({
    url: `home/jobs`,
  });
  const {
    data: { data: employee },
    isLoading: isLoading2,
  } = useGet({
    url: `home/employee-count`,
  });
  const {
    data: { data: lobar },
    isLoading: isLoading4,
  } = useGet({
    url: `home/labor-count`,
  });
  const {
    data: { data: category },
    isLoading: isLoading5,
  } = useGet({
    url: `home/category-staff-count`,
  });
  if (isLoading && isLoading2 && isLoading4 && isLoading5) return <Loading />;
  return (
    <>
      <Breadcrumb link={"Bosh sahifa"} link1={"Bosh sahifa"} link2={""} />
      <div className="grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
        {/* Jami ish o'rinlari */}
        <div className="group rounded-lg bg-[var(--text-color)] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-6px_0px_0px_var(--border-color)]">
          <p className="text-white text-2xl">{employee?.employee_count || 0}</p>
          <p className="text-white text-sm">Jami ish o'rinlari</p>
          <img
            src={E3}
            alt=""
            className="group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-60 transition group-hover:scale-110 duration-300"
          />
        </div>
        {/* Rejadagi ish o'rinlari  */}
        <div className="group rounded-lg bg-[var(--border-color)] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-6px_0px_0px_var(--text-color)]">
          <p className="text-white text-2xl">{jobs?.all_jobs_count || 0}</p>
          <p className="text-white text-sm">Rejadagi ish o'rinlari</p>
          <img
            src={E3}
            alt=""
            className="group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-60 transition group-hover:scale-110 duration-300"
          />
        </div>
        {/* Bo'sh ish o'rinlari */}
        <div className="group rounded-lg bg-gradient-to-r from-green-800 via-green-700 to-cyan-600 p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-6px_0px_0px_#E6533C]">
          <p className="text-white text-2xl">{jobs?.vacant || 0}</p>
          <p className="text-white text-sm">Bo'sh ish o'rinlari</p>
          <img
            src={E2}
            alt=""
            className="group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-60 transition group-hover:scale-110 duration-300"
          />
        </div>
        {/* Ortiqcha ish o'rinlari */}
        <div className="group rounded-lg bg-gradient-to-r from-rose-800 via-rose-700 to-orange-400 p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-6px_0px_0px_#0D9539]">
          <p className="text-white text-2xl">{jobs?.sverx || 0}</p>
          <p className="text-white text-sm">Ortiqcha ish o'rinlari</p>
          <img
            src={E1}
            alt=""
            className="group-hover:opacity-100 absolute right-[10%] top-[50%] translate-y-[-50%] opacity-60 transition group-hover:scale-110 duration-300"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5 max-md:grid-cols-1 font-teko">
        {/* Xodimlar hisobi */}
        <div className="bg-[var(--bgWhite-color)] p-6 rounded-lg group shadow-[0_1px_5px_rgb(0,0,0,0.1)] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition duration-300 relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 relative z-20 pb-2 before:content-[''] overflow-hidden before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:translate-x-[-50%] before:bg-[var(--border-color)] group-hover:before:translate-x-0 before:transition before:duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="24"
              height="24"
              x="0"
              y="0"
              viewBox="0 0 66 66"
              xmlSpace="preserve"
              className="fill-[var(--textBlack-color)]"
            >
              <g>
                <circle
                  cx="53.2"
                  cy="9"
                  r="5.4"
                  opacity="1"
                  data-original="#000000"
                ></circle>
                <path
                  d="M44.6 19.2c-1.2 1-2.9 2.1-3.7 1.8-.9-.4-2-2.8-2.1-8.4 0-1.1-.9-2-2-2s-2 .9-2 2c.1 9.1 3.6 15.9 11 10.7 1.5 20.5 1.3 19 1.4 19.2-.9 4.5-1.8 12.6-1.8 19.3 0 1.7 1.3 3 3 3 1.6 0 3-1.3 3-3 0-5.7.6-11.6 1.7-18.1h.1l1.3 18.4c.1 1.6 1.4 2.8 3 2.8.1 0 3.2-.2 3-3.2-.3-4 .7 10.1-1.4-19.4l1.2-17c1.9 4.2 1.3 7.7-.1 12-.3 1 .2 2.2 1.3 2.5 1.1.4 2.2-.3 2.5-1.3 5.3-15.6-6.5-30.2-19.4-19.3zm10.5-1.6-.8 2.6H52l-.8-2.6c1.3-.6 2.6-.6 3.9 0zm-3.2 3.9h2.6l.7 9.2-1.9 2.4-2-2.4zM22.4 47c-2 .7-4 1.1-6 1.3-.2 5.4-.1 10.1.5 14.2.3 1.7 1.9 2.8 3.4 2.5 1.6-.2 2.8-1.8 2.5-3.4-.6-4.1-.7-8.9-.4-14.6zM13.1 48.3c-2.1-.1-4-.6-5.9-1.3-.3 5.9-.1 10.9.5 15.2.2 1.5 1.5 2.5 2.9 2.5 1.8 0 3.2-1.6 3-3.4-.5-3.7-.7-7.9-.5-13z"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <circle
                  cx="15.1"
                  cy="6.5"
                  r="5.5"
                  opacity="1"
                  data-original="#000000"
                ></circle>
                <path
                  d="m16.1 39.6.8-8-8.7-.9c.1.8.2 1.7.4 2.7.4 1.6-.8 3.3-2.5 3.5s-3-1-3.3-2.4c-.3-1.5-.5-3-.6-4.4l-.7-.1-.8 8c4.3.5-3.7-.4 15.4 1.6z"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <path
                  d="M32.1 10.7c-1.1-.2-2.1.4-2.4 1.5-.4 1.7-1.9 7.1-3.6 7.2-1.8 0-3.1-4-4.2-4.6-4.4-2.6-10.2-2.2-13.6 0-2 1.5-6.5 8.6-4.5 19.4.2 1 1.1 1.8 2.3 1.6 1.2-.3 1.8-1.3 1.6-2.3-.8-3.8-.9-7.5.6-11.1 0 .5-.1 7-.1 7.5l9.6 1-1 9.6-11.3-1.2-1.2 5.1c6.6 4.3 14.7 3.6 21.7.1l-4-16.6v-6.5c5.4 5.3 9.8-.4 11.7-8.3.1-1.1-.5-2.1-1.6-2.4z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <p className="text-xl text-[var(--textBlack-color)] font-semibold">
              Xodimlar hisobi
            </p>
          </div>
          <div className="flex flex-wrap items-start justify-around gap-2 py-8 relative z-20">
            {/* jami */}
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 501.367 501.367"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="m501.367 390.662-59.209-8.603-26.479-53.65v.001l-.001.001-26.477 53.648c-6.446.938-43.355 6.3-55.958 8.131l20.637-20.117-71.312-10.361-31.891-64.619-31.891 64.619-71.31 10.361 20.636 20.115-55.946-8.129-26.478-53.652-.005.011-.005.01-26.469 53.632C52.042 383.1 7.213 389.613 0 390.662l42.844 41.762-10.114 58.971 52.947-27.838.005-.003.005-.003 52.958 27.844-10.115-58.971 41.456-40.408 29.089 28.355-12.181 71.021 63.782-33.531 63.782 33.531-12.182-71.02 29.097-28.362 41.461 40.414-10.114 58.971 52.956-27.843h.001v-.001l52.958 27.844-10.114-58.971 42.846-41.762zM120.677 264.973v-15c0-24.882 7.032-48.15 19.205-67.932a83.103 83.103 0 0 0-16.226-8.686c8.92-8.229 14.521-20.005 14.521-33.069 0-24.813-20.187-45-45-45-24.812 0-45 20.187-45 45 0 13.057 5.594 24.827 14.505 33.055-30.434 12.154-52.005 41.912-52.005 76.633v15h110zM380.677 249.973v15h110v-15c0-34.72-21.57-64.479-52.005-76.633 8.911-8.228 14.505-19.998 14.505-33.055 0-24.813-20.187-45-45-45-24.814 0-45 20.188-45 45 0 13.064 5.6 24.841 14.521 33.069a83.209 83.209 0 0 0-16.226 8.686c12.173 19.782 19.205 43.051 19.205 67.933zM350.67 249.973h.007c0-42.783-26.87-79.284-64.653-93.565 25.002-12.872 42.153-38.93 42.153-68.935 0-42.732-34.767-77.5-77.5-77.5s-77.5 34.768-77.5 77.5c0 30.005 17.151 56.063 42.153 68.935-37.783 14.281-64.653 50.782-64.653 93.565v15H350.67z"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded mt-2 text-[var(--textBlack-color)]">
                100%
              </span>{" "}
              <p className="text-[var(--textBlack-color)] font-normal text-2xl">
                {employee?.employee_count || 0}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                Umumiy xodimlar soni
              </p>
            </div>
            {/* Erkaklar ayollar */}
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 367.264 367.264"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="M125.652 121.915c-2.417-6.508-8.949-10.185-15.59-10.185-3.315 0-3.621.085-5.595.085H45.163c-7.584 0-13.17 3.591-15.587 10.1L.9 209.121c-2.732 7.358.96 15.561 8.245 18.32 7.286 2.76 15.407-.969 18.14-8.326l7.624-20.527s.544-2.07.544 6.967v121.039c0 10.582 8.494 19.16 18.973 19.16s18.973-8.578 18.973-19.16v-79.075s-.092-.699.644-.699h7.124c.703 0 .664.699.664.699v79.075c0 10.582 8.494 19.16 18.973 19.16s18.973-8.578 18.973-19.16V205.555c0-9.182.797-6.289.797-6.289l7.372 19.851c2.731 7.358 10.854 11.086 18.14 8.326 7.285-2.761 10.978-10.962 8.245-18.319l-28.679-87.209z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <ellipse
                    cx="77.991"
                    cy="61.825"
                    rx="40.736"
                    ry="40.317"
                    opacity="1"
                    data-original="#000000"
                  ></ellipse>
                  <circle
                    cx="285.821"
                    cy="61.599"
                    r="40.736"
                    opacity="1"
                    data-original="#000000"
                  ></circle>
                  <path
                    d="m365.921 207.192-34.758-84.667c-1.988-4.272-3.747-9.997-11.914-9.997H257.562c-8.146 0-12.396 5.308-14.727 10.089l-36.103 84.027c-3.438 7.055-.566 15.578 6.411 19.039 6.982 3.46 15.43.547 18.868-6.51l2.717-5.571s.844-1.503.527.159c-1.965 10.348-7.391 41.475-7.391 41.475-1.318 6.477 3.009 11.777 9.619 11.777h15.722c1.125 0 .925.848.925.848v62.566c0 10.479 6.526 15.973 14.58 15.973 8.051 0 14.581-5.494 14.581-15.973v-62.816s-.033-.62.623-.598c.847.027 2.991.004 3.952.004.548 0 .479.66.479.66v62.75c0 10.479 6.53 15.973 14.584 15.973 8.051 0 14.58-5.494 14.58-15.973v-62.399s-.096-1.015 1.112-1.015h16.912c6.609 0 11.043-5.32 9.851-11.822 0 0-5.438-33.385-6.887-42.48-.415-2.607 3.916 6.65 3.916 6.65 3.312 7.115 9.708 10.086 16.749 6.753 7.047-3.334 10.071-11.804 6.759-18.922zM190.443 338.754c0 3.85-3.149 7-7 7h-3c-3.85 0-7-3.15-7-7V32.113c0-3.85 3.15-7 7-7h3c3.85 0 7 3.15 7 7v306.641z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-base mt-2">
                <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded">
                  {(
                    ((employee?.male_count || 0) * 100) /
                    ((employee?.male_count || 0) + (employee?.woman_count || 0))
                  ).toFixed(2) || 0}
                  %
                </span>{" "}
                /{" "}
                <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded">
                  {(
                    ((employee?.woman_count || 0) * 100) /
                    ((employee?.male_count || 0) + (employee?.woman_count || 0))
                  ).toFixed(2) || 0}
                  %
                </span>
              </p>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl">
                {employee?.male_count || 0} / {employee?.woman_count || 0}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                Erkaklar / Ayollar
              </p>
            </div>
            {/* keksalar */}
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="M175.046 271v-33.017c45.839-11.244 79.95-52.677 79.95-101.934v-31.1C254.997 47.08 207.916 0 150.046 0S45.097 47.08 45.097 104.95v31.1c0 49.257 34.112 90.688 79.95 101.933V271c0 13.807 11.193 25 25 25s24.999-11.193 24.999-25zM124.39 154.868l15.05-15.05c5.857-5.857 15.354-5.857 21.213 0l15.05 15.05c5.858 5.857 5.858 15.354 0 21.213-5.858 5.857-15.355 5.859-21.213 0l-4.444-4.443-4.443 4.443c-5.859 5.859-15.355 5.858-21.213 0-5.858-5.857-5.858-15.355 0-21.213z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M95.046 286v-45H75c-41.421 0-75 33.579-75 75v181c0 8.284 6.716 15 15 15h120.046V326c-22.091 0-40-17.909-40-40zM283.993 269.586C269.792 251.638 248.52 241 225.093 241h-20.047v45c0 22.091-17.909 40-40 40v186h45.904V408.127c0-57.365 28.92-108.39 73.043-138.541z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M462.397 301.797a135.836 135.836 0 0 0-29.166-18.327c24.782-16.157 42.356-42.486 46.743-73.019H436.05c-24.519 0-46.326-11.828-60.02-30.077-13.696 18.22-35.484 30.027-59.98 30.027h-43.931c4.396 30.7 22.122 57.154 47.105 73.299a135.878 135.878 0 0 0-28.659 18.088c.31.432.612.869.928 1.296 19.585 26.456 50.258 42.936 84.978 42.936 35.048 0 66.273-16.834 85.926-44.223zM269.389 323.56c-17.815 22.943-28.439 51.735-28.439 82.964V512h120.53V375.202c-36.725-3.989-69.466-22.584-92.091-51.642zM483.565 323.566c-22.6 29.016-55.334 47.642-92.085 51.635V512H497c8.284 0 15-6.716 15-15v-90.476c0-31.227-10.622-60.016-28.435-82.958zM420.477 67.97c-3.152-21.753-21.915-38.52-44.527-38.52-22.637 0-41.416 16.805-44.536 38.593 28.118-9.879 59.672-10.346 89.063-.073zM391.05 135.45c0 24.813 20.187 45 45 45h43.924c-6.597-45.916-43.008-82.327-88.924-88.924zM361.05 135.4V91.526c-45.899 6.594-82.301 42.981-88.917 88.874h43.917c24.813 0 45-20.186 45-45z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-base mt-2">
                <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded">
                  {(
                    ((employee?.male_age_count || 0) * 100) /
                    ((employee?.male_age_count || 0) +
                      (employee?.woman_age_count || 0))
                  ).toFixed(2) || 0}
                  %
                </span>{" "}
                /{" "}
                <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded">
                  {(
                    ((employee?.woman_age_count || 0) * 100) /
                    ((employee?.male_age_count || 0) +
                      (employee?.woman_age_count || 0))
                  ).toFixed(2) || 0}
                  %
                </span>
              </p>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl">
                {employee?.male_age_count || 0} /{" "}
                {employee?.woman_age_count || 0}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                Nafaqa yoshdagi xodimlar soni <br />
                Erkaklar / Ayollar
              </p>
            </div>
          </div>
          <img
            src={BG}
            alt="wavy"
            className="absolute h-max w-full bottom-0 left-0 z-10 translate-y-2 group-hover:translate-y-8 transition duration-500"
          />
        </div>
        {/* Xodimlarning yoshi  */}
        <div className="bg-[var(--bgWhite-color)] p-6 rounded-lg group shadow-[0_1px_5px_rgb(0,0,0,0.1)] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition duration-300 relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 relative pb-2 z-20 before:content-[''] overflow-hidden before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:translate-x-[50%] before:bg-[var(--border-color)] group-hover:before:translate-x-0 before:transition before:duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 64 64"
              xmlSpace="preserve"
              className="fill-[var(--textBlack-color)]"
            >
              <g>
                <path
                  d="m16.76 14.96 6.1 3.97L34.57 8.76l2.62 3.02L39.29 2l-9.97.72 2.62 3.02-9.43 8.19-6.1-3.97-11.7 10.18 2.62 3.02z"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <circle
                  cx="9"
                  cy="42"
                  r="5"
                  opacity="1"
                  data-original="#000000"
                ></circle>
                <circle
                  cx="27"
                  cy="34"
                  r="6"
                  opacity="1"
                  data-original="#000000"
                ></circle>
                <circle
                  cx="50"
                  cy="25"
                  r="8"
                  opacity="1"
                  data-original="#000000"
                ></circle>
                <path
                  d="M17 53c0-3.31-2.69-6-6-6H7c-3.31 0-6 2.69-6 6v9h16zm-7-1H8v-2h2zM30 40h-6c-3.87 0-7 3.13-7 7v.73c1.24 1.41 2 3.25 2 5.27v6h18V47c0-3.87-3.13-7-7-7zm-2 9h-2v-2h2zm0-4h-2v-2h2zM54 33h-8c-4.77 0-8.66 3.71-8.97 8.4A8.956 8.956 0 0 1 39 47v9h24V42a9 9 0 0 0-9-9zm-3 13h-2v-2h2zm0-4h-2v-2h2zm0-4h-2v-2h2z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <p className="text-xl text-[var(--textBlack-color)] font-semibold">
              Xodimlarning yoshi
            </p>
          </div>
          <div className="flex flex-wrap items-start justify-around gap-2 py-8 relative z-20">
            {/* 30-yoshgacha */}
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="M256 0c-68.925 0-125 56.075-125 125s56.075 125 125 125 125-56.075 125-125S324.925 0 256 0zM257.6 280h-3.888a197.56 197.56 0 0 0-54.693 7.735l57.002 88.142 56.936-88.042A199.624 199.624 0 0 0 257.6 280zM453.716 447.961A197.383 197.383 0 0 0 341.721 298.6L271 407.959V512h192.453l-9.737-64.039zM170.255 298.5c-60.946 28.38-102.183 85.085-111.971 149.461L48.547 512H241V407.896L170.255 298.5z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-base mt-2">
                <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded">
                  {(
                    ((employee?.male_30 || 0) * 100) /
                    ((employee?.male_30 || 0) + (employee?.women_30 || 0))
                  ).toFixed(2) || 0}
                  %
                </span>{" "}
                /{" "}
                <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded">
                  {(
                    ((employee?.women_30 || 0) * 100) /
                    ((employee?.male_30 || 0) + (employee?.women_30 || 0))
                  ).toFixed(2) || 0}
                  %
                </span>
              </p>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl">
                {employee?.male_30 || 0} / {employee?.women_30 || 0}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                30-yoshgacha
                <br />
                Erkaklar / Ayollar
              </p>
            </div>
            {/* 31-40-yoshgacha */}
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <circle
                    cx="195"
                    cy="130"
                    r="100"
                    opacity="1"
                    data-original="#000000"
                  ></circle>
                  <path
                    d="M206.875 320h-23.75l-12.407 92.636L195 442.988l24.282-30.352zM182.707 290h24.586l5-30h-34.586z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="m140.133 415.009 14.701-109.766L147.293 260H120C53.726 260 0 313.726 0 380v87c0 8.284 6.716 15 15 15h172.791l-44.504-55.63a14.997 14.997 0 0 1-3.154-11.361zM297.561 263.201A120.104 120.104 0 0 0 270 260h-27.293l-7.54 45.243 14.701 109.766a15 15 0 0 1-3.154 11.362L202.209 482h77.832C270.603 469.456 265 453.871 265 437V325c0-25.614 12.911-48.263 32.561-61.799zM467 280h-8.5v-25c0-19.299-15.701-35-35-35h-40c-19.299 0-35 15.701-35 35v25H340c-24.853 0-45 20.147-45 45v10h217v-10c0-24.853-20.147-45-45-45zm-38.5 0h-50v-25c0-2.757 2.243-5 5-5h40c2.757 0 5 2.243 5 5zM295 437c0 24.853 20.147 45 45 45h127c24.853 0 45-20.147 45-45v-72H295z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-base mt-2">
                <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded">
                  {(
                    ((employee?.male_31_40 || 0) * 100) /
                    ((employee?.male_31_40 || 0) + (employee?.women_31_40 || 0))
                  ).toFixed(2) || 0}
                  %
                </span>{" "}
                /{" "}
                <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded">
                  {(
                    ((employee?.women_31_40 || 0) * 100) /
                    ((employee?.male_31_40 || 0) + (employee?.women_31_40 || 0))
                  ).toFixed(2) || 0}
                  %
                </span>
              </p>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl">
                {employee?.male_31_40 || 0} / {employee?.women_31_40 || 0}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                31-40-yoshgacha
                <br />
                Erkaklar / Ayollar
              </p>
            </div>
            {/* 41-nafaqa yoshgacha */}
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="M175.046 271v-33.017c45.839-11.244 79.95-52.677 79.95-101.934v-31.1C254.997 47.08 207.916 0 150.046 0S45.097 47.08 45.097 104.95v31.1c0 49.257 34.112 90.688 79.95 101.933V271c0 13.807 11.193 25 25 25s24.999-11.193 24.999-25zM124.39 154.868l15.05-15.05c5.857-5.857 15.354-5.857 21.213 0l15.05 15.05c5.858 5.857 5.858 15.354 0 21.213-5.858 5.857-15.355 5.859-21.213 0l-4.444-4.443-4.443 4.443c-5.859 5.859-15.355 5.858-21.213 0-5.858-5.857-5.858-15.355 0-21.213z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M95.046 286v-45H75c-41.421 0-75 33.579-75 75v181c0 8.284 6.716 15 15 15h120.046V326c-22.091 0-40-17.909-40-40zM283.993 269.586C269.792 251.638 248.52 241 225.093 241h-20.047v45c0 22.091-17.909 40-40 40v186h45.904V408.127c0-57.365 28.92-108.39 73.043-138.541z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M462.397 301.797a135.836 135.836 0 0 0-29.166-18.327c24.782-16.157 42.356-42.486 46.743-73.019H436.05c-24.519 0-46.326-11.828-60.02-30.077-13.696 18.22-35.484 30.027-59.98 30.027h-43.931c4.396 30.7 22.122 57.154 47.105 73.299a135.878 135.878 0 0 0-28.659 18.088c.31.432.612.869.928 1.296 19.585 26.456 50.258 42.936 84.978 42.936 35.048 0 66.273-16.834 85.926-44.223zM269.389 323.56c-17.815 22.943-28.439 51.735-28.439 82.964V512h120.53V375.202c-36.725-3.989-69.466-22.584-92.091-51.642zM483.565 323.566c-22.6 29.016-55.334 47.642-92.085 51.635V512H497c8.284 0 15-6.716 15-15v-90.476c0-31.227-10.622-60.016-28.435-82.958zM420.477 67.97c-3.152-21.753-21.915-38.52-44.527-38.52-22.637 0-41.416 16.805-44.536 38.593 28.118-9.879 59.672-10.346 89.063-.073zM391.05 135.45c0 24.813 20.187 45 45 45h43.924c-6.597-45.916-43.008-82.327-88.924-88.924zM361.05 135.4V91.526c-45.899 6.594-82.301 42.981-88.917 88.874h43.917c24.813 0 45-20.186 45-45z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-base mt-2">
                <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded">
                  {(
                    ((employee?.male_41_60 || 0) * 100) /
                    ((employee?.male_41_60 || 0) + (employee?.women_41_55 || 0))
                  ).toFixed(2) || 0}
                  %
                </span>{" "}
                /{" "}
                <span className="border border-[var(--text-color)] bg-[var(--textOpasity-color)] px-1 rounded">
                  {(
                    ((employee?.women_41_55 || 0) * 100) /
                    ((employee?.male_41_60 || 0) + (employee?.women_41_55 || 0))
                  ).toFixed(2) || 0}
                  %
                </span>
              </p>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl">
                {employee?.male_41_60 || 0} / {employee?.women_41_55 || 0}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                41-nafaqa yoshgacha
                <br />
                Erkaklar / Ayollar
              </p>
            </div>
          </div>
          <img
            src={BG2}
            alt="wavy"
            className="absolute h-max w-full bottom-0 left-0 z-10 translate-y-2 group-hover:translate-y-8 transition duration-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-5 mt-5 max-md:grid-cols-1 font-teko">
        {/* xodimlarni malumoti */}
        <div className="col-span-2 max-md:col-span-1 bg-[var(--bgWhite-color)] p-6 rounded-lg group shadow-[0_1px_5px_rgb(0,0,0,0.1)] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition duration-300 relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 relative pb-2 z-20 before:content-[''] overflow-hidden before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:translate-x-[-50%] before:bg-[var(--border-color)] group-hover:before:translate-x-0 before:transition before:duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="fill-[var(--textBlack-color)]"
            >
              <g>
                <circle
                  cx="195"
                  cy="130"
                  r="100"
                  opacity="1"
                  data-original="#000000"
                ></circle>
                <path
                  d="M206.875 320h-23.75l-12.407 92.636L195 442.988l24.282-30.352zM182.707 290h24.586l5-30h-34.586z"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <path
                  d="m140.133 415.009 14.701-109.766L147.293 260H120C53.726 260 0 313.726 0 380v87c0 8.284 6.716 15 15 15h172.791l-44.504-55.63a14.997 14.997 0 0 1-3.154-11.361zM297.561 263.201A120.104 120.104 0 0 0 270 260h-27.293l-7.54 45.243 14.701 109.766a15 15 0 0 1-3.154 11.362L202.209 482h77.832C270.603 469.456 265 453.871 265 437V325c0-25.614 12.911-48.263 32.561-61.799zM467 280h-8.5v-25c0-19.299-15.701-35-35-35h-40c-19.299 0-35 15.701-35 35v25H340c-24.853 0-45 20.147-45 45v10h217v-10c0-24.853-20.147-45-45-45zm-38.5 0h-50v-25c0-2.757 2.243-5 5-5h40c2.757 0 5 2.243 5 5zM295 437c0 24.853 20.147 45 45 45h127c24.853 0 45-20.147 45-45v-72H295z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <p className="text-xl text-[var(--textBlack-color)] font-semibold">
              Xodimlarning ma'lumotlari
            </p>
          </div>
          <div className="flex flex-wrap items-start flex-col justify-around gap-2 py-8 relative z-20">
            {jobs?.education_info?.map((e) => (
              <div key={e?.id} className="overflow-hidden w-full">
                <div className="flex w-full items-center justify-between gap-2 relative before:content-[''] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-full before:h-[2px] before:bg-[var(--text-color)] before:translate-x-[-100%] group-hover:before:translate-x-0 before:transition before:duration-[1500ms]">
                  <p
                    className={`text-base font-medium text-[var(--textBlack-color)] relative before:content-[''] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-3 before:h-3 before:rounded-full before:bg-[var(--text-color)] pl-4 pr-1 bg-[var(--bgWhite-color)]`}
                  >
                    {e?.name || ""}
                  </p>
                  <div className="min-w-[102px] flex items-center justify-between">
                    <p className="text-base border border-[var(--text-color)] bg-indigo-50 px-1 rounded relative">
                      {((e?.count || 0) * 100) /
                        (jobs?.education_info?.reduce(
                          (e, i) => e + i?.count,
                          0
                        ) || 0) ==
                      0
                        ? 0
                        : (
                            ((e?.count || 0) * 100) /
                            (jobs?.education_info?.reduce(
                              (e, i) => e + i?.count,
                              0
                            ) || 0)
                          ).toFixed(2) || 0}
                      %
                    </p>
                    <p className="text-base font-medium text-[var(--textBlack-color)] relative bg-[var(--bgWhite-color)] pl-1">
                      {e?.count}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <img
            src={BG2}
            alt="wavy"
            className="absolute h-max w-full bottom-0 left-0 z-10 translate-y-2 group-hover:translate-y-8 transition duration-500"
          />
        </div>
        {/* Ta'tildagi xodimlar */}
        <div className="col-span-4 max-md:col-span-1 bg-[var(--bgWhite-color)] p-6 rounded-lg group shadow-[0_1px_5px_rgb(0,0,0,0.1)] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition duration-300 relative overflow-hidden group">
          <div className="flex items-center justify-center gap-2 relative z-20 pb-2 before:content-[''] overflow-hidden before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:translate-x-[50%] before:bg-[var(--border-color)] group-hover:before:translate-x-0 before:transition before:duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 32 32"
              xmlSpace="preserve"
              className="fill-[var(--textBlack-color)]"
            >
              <g>
                <path
                  d="m30.35 10.36-.85.84-2.15 2.15c-.09.1-.22.15-.35.15h-.5v.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-.5h-3v.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-.5H21c-.13 0-.26-.05-.35-.15L18.5 11.2l-.84-.84c-.11.19-.16.41-.16.64v6c0 .83.67 1.5 1.5 1.5h10c.83 0 1.5-.67 1.5-1.5v-6c0-.23-.05-.45-.15-.64z"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <path
                  d="M21.21 12.5h5.58l2.01-2 .84-.85c-.19-.1-.41-.15-.64-.15h-2.55a2.5 2.5 0 0 0-4.9 0H19c-.23 0-.45.05-.64.15l.84.85 2.01 2zm2.79-4c.65 0 1.21.42 1.41 1h-2.82c.2-.58.76-1 1.41-1zM27 21.5H12.54l-3.89-9.23.95-.4c-.13-.3-.27-.6-.42-.9-.53-1.06-1.16-2.06-1.78-2.82-.84-1.03-1.33-1.23-1.49-1.23-.02 0-.03.01-.04.01-.37.15-.43 2.25.61 5.18.1.3.22.61.35.93l.9-.38 3.729 8.84H9.62l-2.56-2.56c-.57-.57-1.55-.57-2.12 0a1.498 1.498 0 0 0 0 2.12l3 3c.28.28.66.44 1.06.44h.79l-1.14 1.15c-.2.19-.2.51 0 .7.19.2.51.2.7 0l1.86-1.85h13.58l1.86 1.85c.09.1.22.15.35.15s.26-.05.35-.15c.2-.19.2-.51 0-.7l-1.14-1.15H27c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <path
                  d="M7.26 6.56c.29.24.6.56.92.95.67.83 1.35 1.91 1.92 3.07l.42.9 3.21-1.35c.25-.1.37-.4.26-.65a6.463 6.463 0 0 0-3.54-3.5C9.66 5.66 8.83 5.5 8 5.5c-.78 0-1.56.14-2.31.44.46-.09.99.12 1.57.62zM5.56 12.49c-.57-1.58-1.02-3.48-.93-4.83.06-.81.31-1.42.85-1.65-3.3 1.39-4.86 5.21-3.47 8.51.05.13.15.22.27.27.06.03.13.04.19.04.07 0 .13-.01.2-.04l3.24-1.37c-.12-.29-.24-.6-.35-.93z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <p className="text-xl text-[var(--textBlack-color)] font-semibold">
              Ta'tildagi xodimlar
            </p>
          </div>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 items-start py-8 gap-y-1 gap-x-12 relative z-20">
            {lobar?.list?.map((e) => (
              <div key={e?.id} className="overflow-hidden">
                <div
                  style={{
                    "--bg-color": e?.bg_color,
                  }}
                  className="flex w-full items-center justify-between gap-2 relative before:content-[''] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-full before:h-[2px] before:bg-[var(--bg-color)] before:translate-x-[-100%] group-hover:before:translate-x-0 before:transition before:duration-[1500ms]"
                >
                  <p
                    className={`text-base font-medium text-[var(--textBlack-color)] relative before:content-[''] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-3 before:h-3 before:rounded-full before:bg-[var(--bg-color)] pl-4 pr-1 bg-[var(--bgWhite-color)]`}
                  >
                    {e?.title} - {e?.key}
                  </p>
                  <div className="min-w-[102px] flex items-center justify-between">
                    <p className="text-base border border-[var(--text-color)] bg-indigo-50 px-1 rounded relative">
                      {((e?.count || 0) * 100) /
                        (lobar?.list?.reduce((e, i) => e + i?.count, 0) || 0) ==
                      0
                        ? 0
                        : (
                            ((e?.count || 0) * 100) /
                            (lobar?.list?.reduce((e, i) => e + i?.count, 0) ||
                              0)
                          ).toFixed(2) || 0}
                      %
                    </p>
                    <p className="text-base font-medium text-[var(--textBlack-color)] relative bg-[var(--bgWhite-color)] pl-1">
                      {e?.count}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <img
            src={BG}
            alt="wavy"
            className="absolute h-max w-full bottom-0 left-0 z-10 translate-y-2 group-hover:translate-y-8 transition duration-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-11 gap-5 mt-5 max-md:grid-cols-1 font-teko">
        {/* Ta'tildagi xodimlar */}
        <div className="col-span-6 max-md:col-span-1 bg-[var(--bgWhite-color)] p-6 rounded-lg group shadow-[0_1px_5px_rgb(0,0,0,0.1)] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition duration-300 relative overflow-hidden group">
          <div className="flex items-center justify-center gap-2 relative z-20 pb-2 before:content-[''] overflow-hidden before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:translate-x-[-50%] before:bg-[var(--border-color)] group-hover:before:translate-x-0 before:transition before:duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="fill-[var(--textBlack-color)]"
            >
              <g>
                <circle
                  cx="195"
                  cy="130"
                  r="100"
                  opacity="1"
                  data-original="#000000"
                ></circle>
                <path
                  d="M206.875 320h-23.75l-12.407 92.636L195 442.988l24.282-30.352zM182.707 290h24.586l5-30h-34.586z"
                  opacity="1"
                  data-original="#000000"
                ></path>
                <path
                  d="m140.133 415.009 14.701-109.766L147.293 260H120C53.726 260 0 313.726 0 380v87c0 8.284 6.716 15 15 15h172.791l-44.504-55.63a14.997 14.997 0 0 1-3.154-11.361zM297.561 263.201A120.104 120.104 0 0 0 270 260h-27.293l-7.54 45.243 14.701 109.766a15 15 0 0 1-3.154 11.362L202.209 482h77.832C270.603 469.456 265 453.871 265 437V325c0-25.614 12.911-48.263 32.561-61.799zM467 280h-8.5v-25c0-19.299-15.701-35-35-35h-40c-19.299 0-35 15.701-35 35v25H340c-24.853 0-45 20.147-45 45v10h217v-10c0-24.853-20.147-45-45-45zm-38.5 0h-50v-25c0-2.757 2.243-5 5-5h40c2.757 0 5 2.243 5 5zM295 437c0 24.853 20.147 45 45 45h127c24.853 0 45-20.147 45-45v-72H295z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <p className="text-xl text-[var(--textBlack-color)] font-semibold">
              Mehnat shartnomasi bo'yicha
            </p>
          </div>
          <div className="grid grid-cols-2 max-sm:grid-cols-1 items-start py-8 gap-y-1 gap-x-12 relative z-20">
            {category?.map((e, i) => (
              <div key={i} className="overflow-hidden">
                <div
                  style={{
                    "--bg-color": e?.bg_color || "#673ab7",
                  }}
                  className="flex w-full items-center justify-between gap-2 relative before:content-[''] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-full before:h-[2px] before:bg-[var(--bg-color)] before:translate-x-[-100%] group-hover:before:translate-x-0 before:transition before:duration-[1500ms]"
                >
                  <p
                    className={`text-base font-medium text-[var(--textBlack-color)] relative before:content-[''] before:absolute before:left-0 before:top-[50%] before:translate-y-[-50%] before:w-3 before:h-3 before:rounded-full before:bg-[var(--bg-color)] pl-4 pr-1 bg-[var(--bgWhite-color)]`}
                  >
                    {e?.name}
                  </p>
                  <div className="min-w-[102px] flex items-center justify-between">
                    <p className="text-base border border-[var(--text-color)] bg-indigo-50 px-1 rounded relative">
                      {((e?.count || 0) * 100) /
                        (category?.reduce((e, i) => e + i?.count, 0) || 0) ==
                      0
                        ? 0
                        : (
                            ((e?.count || 0) * 100) /
                            (category?.reduce((e, i) => e + i?.count, 0) || 0)
                          ).toFixed(2) || 0}
                      %
                    </p>
                    <p className="text-base font-medium text-[var(--textBlack-color)] relative bg-[var(--bgWhite-color)] pl-1">
                      {e?.count}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <img
            src={BG}
            alt="wavy"
            className="absolute h-max w-full bottom-0 left-0 z-10 translate-y-2 group-hover:translate-y-8 transition duration-500"
          />
        </div>
        {/* Ma'lumoti to'liq kiritilmagan xodimlar  */}
        <div
          className="cursor-pointer group col-span-5 max-md:col-span-1 bg-[var(--bgWhite-color)] p-6 rounded-lg group shadow-[0_1px_5px_rgb(0,0,0,0.1)] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition duration-300 relative overflow-hidden"
          onClick={() =>
            navigate("/employe/statistics/employee-information-no/no")
          }
        >
          <div className="flex items-center justify-center gap-2 relative pb-2 z-20 before:content-[''] overflow-hidden before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:translate-x-[50%] before:bg-[var(--border-color)] group-hover:before:translate-x-0 before:transition before:duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 13.229 13.229"
              xmlSpace="preserve"
              className="fill-[var(--textBlack-color)]"
            >
              <g>
                <path
                  d="M1.918 1.323a.798.798 0 0 0-.794.794v8.995c0 .436.359.794.794.794h6.31a2.721 2.721 0 0 1-.83-.96l-.001-.002a2.763 2.763 0 0 1 .13-2.792 2.779 2.779 0 0 1 2.275-1.27h.002c.106-.002.211.002.316.012V4.498H7.74a.798.798 0 0 1-.795-.794V1.323zm5.556.155v2.226c0 .15.116.265.265.265h2.226zm-4.1 2.49h2.38a.265.265 0 0 1 .265.265.265.265 0 0 1-.264.265H3.373a.265.265 0 0 1-.264-.265.265.265 0 0 1 .264-.264zm0 1.588h4.365a.265.265 0 0 1 .265.265.265.265 0 0 1-.265.264H3.373a.265.265 0 0 1-.264-.264.265.265 0 0 1 .264-.265zm0 1.588H6.68a.265.265 0 0 1 .264.264.265.265 0 0 1-.264.265H3.373a.265.265 0 0 1-.264-.265.265.265 0 0 1 .264-.264zm6.482.264a2.253 2.253 0 0 0-2.25 2.25 2.253 2.253 0 0 0 2.25 2.248 2.253 2.253 0 0 0 2.249-2.249 2.253 2.253 0 0 0-2.25-2.249zm0 1.092a.265.265 0 0 1 .264.264.265.265 0 0 1-.264.265.265.265 0 0 1-.265-.265.265.265 0 0 1 .265-.264zm-6.483.231h2.779a.265.265 0 0 1 .264.265.265.265 0 0 1-.264.264H3.373a.265.265 0 0 1-.264-.264.265.265 0 0 1 .264-.265zm6.483.496a.265.265 0 0 1 .264.265v1.058a.265.265 0 0 1-.264.265.265.265 0 0 1-.265-.265V9.492a.265.265 0 0 1 .265-.265z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <p className="text-xl text-[var(--textBlack-color)] font-semibold">
              Ma'lumoti to'liq kiritilmagan xodimlar
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="fill-[var(--text-color)] opacity-0 group-hover:opacity-100 transition duration-500"
            >
              <g>
                <g data-name="Layer 16">
                  <circle
                    cx="256"
                    cy="256"
                    r="69.74"
                    opacity="1"
                    data-original="#000000"
                  ></circle>
                  <path
                    d="M506.11 236.81C446.14 148 351.07 96 256 96.65 160.93 96 65.86 148 5.89 236.81a34.22 34.22 0 0 0 0 38.38C65.86 364 160.93 416 256 415.35c95.07.65 190.14-51.35 250.11-140.16a34.22 34.22 0 0 0 0-38.38zM256 363.74A107.74 107.74 0 1 1 363.74 256 107.74 107.74 0 0 1 256 363.74z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div className="flex flex-wrap items-start justify-around gap-2 py-8 relative z-20">
            {/* Mehnat faoliyati kiritilmagan xodimlar soni */}
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="M24 2h-2a1 1 0 0 0-1 1c0 .43.275.79.656.93L19 6.586l-1.293-1.293a1 1 0 0 0-1.414 0l-4 4a1 1 0 1 0 1.414 1.414L17 7.414l1.293 1.293a1 1 0 0 0 1.414 0l3.363-3.363c.14.381.5.656.93.656a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM15 18a4.997 4.997 0 0 0-3-4.578V15.5a.5.5 0 1 1-1 0v-2.4a5.021 5.021 0 0 0-2 0v2.4a.5.5 0 1 1-1 0v-2.078A4.997 4.997 0 0 0 5 18a1 1 0 0 0 0 2h10a1 1 0 0 0 0-2zM7 26h6v4H7zM2 30h4v-4a4 4 0 0 0-4 4zM14 26v4h4a4 4 0 0 0-4-4z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M6 21v1a4 4 0 0 0 8 0v-1zM29 16h-3V5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5zM25 16h-3V8.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5zM21 16h-3v-4.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5zM23.5 17a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 6c1.379 0 2.5 1.122 2.5 2.5 0 1.207-.86 2.217-2 2.45v.55a.5.5 0 1 1-1 0v-.55a2.504 2.504 0 0 1-2-2.45.5.5 0 1 1 1 0c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5a2.503 2.503 0 0 1-2.5-2.5c0-1.207.86-2.217 2-2.45v-.55a.5.5 0 1 1 1 0v.55c1.14.233 2 1.243 2 2.45a.5.5 0 1 1-1 0c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5.673 1.5 1.5 1.5z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl mt-2">
                {employee?.employee_labor_activity_count?.[0].count || 0}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                Mehnat faoliyati kiritilmagan <br /> xodimlar soni
              </p>
            </div>
            {/* Yaqin qarindoshlari kiritilmagan xodimlar soni */}
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 66 66"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="M45.4 49.1c0 .3-.2.6-.4.8l1.5 11.4c.2 1.3-.5 2.6-1.5 3.3.3.3 2.9-.1 3.2-2.5l1.7-14c-1.5-.1-2.9-.3-4.3-.7zM58.1 46.9c-1.8.6-3.7 1-5.6 1.1l1.7 14c.5 3.8 6.1 3 5.7-.7z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <circle
                    cx="15"
                    cy="6.4"
                    r="5.5"
                    opacity="1"
                    data-original="#000000"
                  ></circle>
                  <path
                    d="M21.6 52.6c-.9-.4-1.5-.8-1.8-1l1.4-7c-1.9 1.5-4.6-.7-3.5-3 0-.1 4.1-8.3 3.8-7.8.3-.5.7-1 1.3-1.2.1-1.5.6-8.1.6-7.6.1.5.3.9.4 1.4.7-1.2 2-2 3.4-2-.7-2.5-1.6-4.9-2.7-7.4-2.7-5.9-17.5-4.6-19.5.1-2.4 5.6-3.7 11-4 16.2-.1 2.5 3.7 2.7 3.8.2.1-2.8.7-5.7 1.5-8.7l1.4 18.4c0 .3.3.5.6.6L6.2 61.4c-.4 3.7 5.2 4.5 5.7.7L14 43.8h1.6L17.8 62c.3 2.3 3.1 3.3 4.7 1.8-.6-.5-1-1.3-1-2.1v-9.1zM61.2 29.6c-.3-2.6-1.5-5.4-2.7-7.7v3.9L62.1 44c-5 3-10.8 3.9-16.5 2.3.1-1.2-.3 4.4.9-11.8 2.2-1.2 4.6-3.5 5.1-8.2.1-1.6-1-3-2.6-3.1s-3 1-3.1 2.6-.6 2.5-1.2 3.1c-.4-.2-.9-.4-1.3-.6l.4-2.1c1.6-2.6.6-6-2.1-7.3 2.5-4.9 1.9-4.3 2.9-4.9 4-2 8-2.3 12.2-.5 3.8 1.6 7.7 11.4 8.3 15.5.2 2.6-3.5 3.2-3.9.6z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M51 11.9c3 0 5.5-2.4 5.5-5.5 0-3-2.5-5.5-5.5-5.5s-5.5 2.5-5.5 5.5c.1 3.1 2.5 5.5 5.5 5.5zM39.4 27.8c2.4 0 4.1-2 4.1-4.2 0-1.6-1-3.1-2.4-3.8-.5-.2-1.1-.4-1.7-.4-2.3 0-4.1 1.8-4.1 4.1 0 2.4 1.9 4.3 4.1 4.3z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="m45.6 61.4-1.5-11.1-.1-.9c.2 0 .4-.2.4-.4.9-10.6 1.2-15.1 1.2-15 3.2-1.4 4.7-4.2 5-7.7.1-1-.7-2-1.7-2.1s-2 .7-2.1 1.7c-.1 1.7-.7 3.3-2.1 4.2-1.2-.7-2.8-1.3-4.2-1.5-.1-.1-.9.4-2.4 0-.2 0-1.6.1-3.2 1-1.2.6-3 1.9-2.8 3.1.5.2.9.6 1.1 1.1 0 .1 4.1 8.3 3.8 7.8.9 2-1 4.1-3 3.2 0 .1.3 4.4.3 4.1 0 .2.2.4.4.4-1.8 13.1-1.6 12-1.6 12-.4 3.1 4.3 3.8 4.7.6l1-7.4.5 3.6.5 4c.3 2.4 3.1 3.6 5 2.4-.5-.1-.9-.2-1.3-.5 1.5-.2 2.3-1.4 2.1-2.6zM22.4 53l.1.6v8.1c0 2.5 3.8 2.5 3.8 0v-7.8c-1.3-.1-2.6-.4-3.9-.9.1 0 .1 0 0 0z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M32.6 63.2c.7-1.1.3-1.9.4-7.4l-.7 5.5c-.1.6.1 1.3.3 1.9zM28.3 61.7c0 2.5 3.8 2.5 3.8 0V53c-1.2.5-2.5.8-3.8.9zM24 28.6c0 4.3 6.6 4.3 6.6 0 0-1.8-1.5-3.3-3.3-3.3-1.8 0-3.3 1.5-3.3 3.3z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M33.8 51.2c0-.1-2.3-11.6-2.1-10.9v-1.2c0 .1 2.1 4.3 2.1 4.2.8 1.7 3.4.5 2.6-1.3-4.1-8.3-3.5-8.3-6.3-9.2-.4-.1-.7-.2-1.1-.3-.8.4-2.1.4-3.1 0-.8.2-1.9.5-2.8 1-.2.1-.5.3-.6.6-6.6 13.4.4-.8-3.8 7.8-.3.6-.1 1.3.4 1.7.6.6 1.8.3 2.2-.5.4-.9 2-4.1 1.9-3.9v.9c-1.8 9.1-2.2 11-2.1 10.9 4.1 2.7 8.7 2.6 12.7.2z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl mt-2">
                {employee?.user_relative_count?.[0].count || 0}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                Yaqin qarindoshlari kiritilmagan <br /> xodimlar soni
              </p>
            </div>
          </div>
          <img
            src={BG2}
            alt="wavy"
            className="absolute h-max w-full bottom-0 left-0 z-10 translate-y-2 group-hover:translate-y-8 transition duration-500"
          />
        </div>
      </div>
      {/* Daftardagi xodimlar  */}
      <div className="grid grid-cols-4 gap-5 mt-5 max-md:grid-cols-1 font-teko">
        {/* Daftardagi xodimlar  */}
        <div
          className="cursor-pointer group bg-[var(--bgWhite-color)] p-6 rounded-lg group shadow-[0_1px_5px_rgb(0,0,0,0.1)] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition duration-300 relative overflow-hidden"
          onClick={() =>
            navigate("/employe/statistics/employee-notebook-add/no")
          }
        >
          <div className="flex items-center justify-center gap-2 relative pb-2 z-20 before:content-[''] overflow-hidden before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:translate-x-[-50%] before:bg-[var(--border-color)] group-hover:before:translate-x-0 before:transition before:duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 13.229 13.229"
              xmlSpace="preserve"
              className="fill-[var(--textBlack-color)]"
            >
              <g>
                <path
                  d="M1.918 1.323a.798.798 0 0 0-.794.794v8.995c0 .436.359.794.794.794h6.31a2.721 2.721 0 0 1-.83-.96l-.001-.002a2.763 2.763 0 0 1 .13-2.792 2.779 2.779 0 0 1 2.275-1.27h.002c.106-.002.211.002.316.012V4.498H7.74a.798.798 0 0 1-.795-.794V1.323zm5.556.155v2.226c0 .15.116.265.265.265h2.226zm-4.1 2.49h2.38a.265.265 0 0 1 .265.265.265.265 0 0 1-.264.265H3.373a.265.265 0 0 1-.264-.265.265.265 0 0 1 .264-.264zm0 1.588h4.365a.265.265 0 0 1 .265.265.265.265 0 0 1-.265.264H3.373a.265.265 0 0 1-.264-.264.265.265 0 0 1 .264-.265zm0 1.588H6.68a.265.265 0 0 1 .264.264.265.265 0 0 1-.264.265H3.373a.265.265 0 0 1-.264-.265.265.265 0 0 1 .264-.264zm6.482.264a2.253 2.253 0 0 0-2.25 2.25 2.253 2.253 0 0 0 2.25 2.248 2.253 2.253 0 0 0 2.249-2.249 2.253 2.253 0 0 0-2.25-2.249zm0 1.092a.265.265 0 0 1 .264.264.265.265 0 0 1-.264.265.265.265 0 0 1-.265-.265.265.265 0 0 1 .265-.264zm-6.483.231h2.779a.265.265 0 0 1 .264.265.265.265 0 0 1-.264.264H3.373a.265.265 0 0 1-.264-.264.265.265 0 0 1 .264-.265zm6.483.496a.265.265 0 0 1 .264.265v1.058a.265.265 0 0 1-.264.265.265.265 0 0 1-.265-.265V9.492a.265.265 0 0 1 .265-.265z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <p className="text-xl text-[var(--textBlack-color)] font-semibold">
              Daftardagi xodimlar
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="fill-[var(--text-color)] opacity-0 group-hover:opacity-100 transition duration-500"
            >
              <g>
                <g data-name="Layer 16">
                  <circle
                    cx="256"
                    cy="256"
                    r="69.74"
                    opacity="1"
                    data-original="#000000"
                  ></circle>
                  <path
                    d="M506.11 236.81C446.14 148 351.07 96 256 96.65 160.93 96 65.86 148 5.89 236.81a34.22 34.22 0 0 0 0 38.38C65.86 364 160.93 416 256 415.35c95.07.65 190.14-51.35 250.11-140.16a34.22 34.22 0 0 0 0-38.38zM256 363.74A107.74 107.74 0 1 1 363.74 256 107.74 107.74 0 0 1 256 363.74z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div className="flex flex-wrap items-start justify-around gap-2 py-8 relative z-20">
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="M183.7 214.767h144.6c8.284 0 15-6.716 15-15v-32.133c0-22.182-8.32-42.454-21.998-57.871-15.635 18.67-39.101 30.57-65.302 30.57s-49.666-11.9-65.302-30.57C177.02 125.18 168.7 145.452 168.7 167.634v32.133c0 8.284 6.716 15 15 15z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M256 110.333c30.419 0 55.167-24.747 55.167-55.166S286.419 0 256 0s-55.167 24.748-55.167 55.167 24.748 55.166 55.167 55.166zM174.212 265.458c-15.529-15.529-40.707-15.529-56.236 0s-15.529 40.707 0 56.236l36.163 36.167c5.858 5.858 5.858 15.355 0 21.213-5.858 5.857-15.356 5.859-21.213 0l-.001-.001-64.265-64.266a15.002 15.002 0 0 1-4.394-10.607V176.733c0-17.753-14.356-32.133-32.133-32.133H15c-8.284 0-15 6.716-15 15v192.8c0 3.979 1.58 7.793 4.394 10.606L96.4 455.013V497c0 8.284 6.716 15 15 15h112.466c8.284 0 15-6.716 15-15V369.607c0-25.464-9.916-49.404-27.919-67.406zM497 144.6h-17.134c-17.777 0-32.133 14.381-32.133 32.133V304.2a15 15 0 0 1-4.394 10.607l-64.266 64.266-.001.001c-5.856 5.859-15.354 5.857-21.213 0-5.858-5.858-5.858-15.355 0-21.213l36.163-36.167c15.529-15.529 15.529-40.707 0-56.236s-40.707-15.529-56.236 0l-36.735 36.743c-18.003 18.002-27.919 41.942-27.919 67.406V497c0 8.284 6.716 15 15 15h112.466c8.284 0 15-6.716 15-15v-41.987l92.007-92.007a15 15 0 0 0 4.394-10.606V159.6c.001-8.284-6.715-15-14.999-15z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl mt-2">
                {employee?.notebook_count?.count || 0}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                Daftardagi xodimlar soni
              </p>
            </div>
          </div>
          <img
            src={BG2}
            alt="wavy"
            className="absolute h-max w-full bottom-0 left-0 z-10 translate-y-2 group-hover:translate-y-8 transition duration-500"
          />
        </div>
        {/* Bugungi tug'ilgan kunlar soni  */}
        <div
          className="cursor-pointer group bg-[var(--bgWhite-color)] p-6 rounded-lg group shadow-[0_1px_5px_rgb(0,0,0,0.1)] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition duration-300 relative overflow-hidden"
          onClick={() => navigate("/employe/statistics/employee-birth-day")}
        >
          <div className="flex items-center justify-center gap-2 relative pb-2 z-20 before:content-[''] overflow-hidden before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:translate-x-[-50%] before:bg-[var(--border-color)] group-hover:before:translate-x-0 before:transition before:duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 13.229 13.229"
              xmlSpace="preserve"
              className="fill-[var(--textBlack-color)]"
            >
              <g>
                <path
                  d="M1.918 1.323a.798.798 0 0 0-.794.794v8.995c0 .436.359.794.794.794h6.31a2.721 2.721 0 0 1-.83-.96l-.001-.002a2.763 2.763 0 0 1 .13-2.792 2.779 2.779 0 0 1 2.275-1.27h.002c.106-.002.211.002.316.012V4.498H7.74a.798.798 0 0 1-.795-.794V1.323zm5.556.155v2.226c0 .15.116.265.265.265h2.226zm-4.1 2.49h2.38a.265.265 0 0 1 .265.265.265.265 0 0 1-.264.265H3.373a.265.265 0 0 1-.264-.265.265.265 0 0 1 .264-.264zm0 1.588h4.365a.265.265 0 0 1 .265.265.265.265 0 0 1-.265.264H3.373a.265.265 0 0 1-.264-.264.265.265 0 0 1 .264-.265zm0 1.588H6.68a.265.265 0 0 1 .264.264.265.265 0 0 1-.264.265H3.373a.265.265 0 0 1-.264-.265.265.265 0 0 1 .264-.264zm6.482.264a2.253 2.253 0 0 0-2.25 2.25 2.253 2.253 0 0 0 2.25 2.248 2.253 2.253 0 0 0 2.249-2.249 2.253 2.253 0 0 0-2.25-2.249zm0 1.092a.265.265 0 0 1 .264.264.265.265 0 0 1-.264.265.265.265 0 0 1-.265-.265.265.265 0 0 1 .265-.264zm-6.483.231h2.779a.265.265 0 0 1 .264.265.265.265 0 0 1-.264.264H3.373a.265.265 0 0 1-.264-.264.265.265 0 0 1 .264-.265zm6.483.496a.265.265 0 0 1 .264.265v1.058a.265.265 0 0 1-.264.265.265.265 0 0 1-.265-.265V9.492a.265.265 0 0 1 .265-.265z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <p className="text-xl text-[var(--textBlack-color)] font-semibold">
              Bugungi tug'ilgan kunlar
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="fill-[var(--text-color)] opacity-0 group-hover:opacity-100 transition duration-500"
            >
              <g>
                <g data-name="Layer 16">
                  <circle
                    cx="256"
                    cy="256"
                    r="69.74"
                    opacity="1"
                    data-original="#000000"
                  ></circle>
                  <path
                    d="M506.11 236.81C446.14 148 351.07 96 256 96.65 160.93 96 65.86 148 5.89 236.81a34.22 34.22 0 0 0 0 38.38C65.86 364 160.93 416 256 415.35c95.07.65 190.14-51.35 250.11-140.16a34.22 34.22 0 0 0 0-38.38zM256 363.74A107.74 107.74 0 1 1 363.74 256 107.74 107.74 0 0 1 256 363.74z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div className="flex flex-wrap items-start justify-around gap-2 py-8 relative z-20">
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="m26.788 265.219 42.414 17.674a46.594 46.594 0 0 0 17.92 3.604c6.001 0 12.042-1.188 17.756-3.543l29-11.94c6.492-2.662 13.64-2.642 20.111.082l27.648 11.633c11.633 4.915 24.433 4.936 36.065.082l28.242-11.756a25.952 25.952 0 0 1 20.111 0l28.242 11.756c11.612 4.854 24.412 4.833 36.065-.082l27.628-11.633c6.492-2.744 13.64-2.744 20.132-.082l29 11.94c11.51 4.751 24.187 4.731 35.697-.082l42.394-17.654a10.234 10.234 0 0 0 6.308-9.441v-61.44c0-16.957-13.783-30.72-30.72-30.72h-92.16v-22.385c11.899-4.239 20.48-15.503 20.48-28.815 0-24.044-21.074-45.814-23.491-48.21-3.994-3.994-10.465-3.994-14.479 0-2.396 2.396-23.47 24.166-23.47 48.21 0 13.312 8.581 24.576 20.48 28.815v22.385h-81.92v-42.865c11.899-4.239 20.48-15.503 20.48-28.815 0-22.262-19.354-61.624-21.565-66.027-3.482-6.943-14.828-6.943-18.309 0-2.212 4.403-21.565 43.766-21.565 66.027 0 13.312 8.581 24.576 20.48 28.815v42.865h-81.92v-22.385c11.899-4.239 20.48-15.503 20.48-28.815 0-24.044-21.074-45.814-23.491-48.21-3.994-3.994-10.465-3.994-14.479 0-2.396 2.396-23.47 24.166-23.47 48.21 0 13.312 8.581 24.576 20.48 28.815v22.385H51.2c-16.937 0-30.72 13.763-30.72 30.72v61.44c0 4.117 2.478 7.844 6.308 9.442zM481.28 409.377H30.72C13.783 409.377 0 423.14 0 440.097c0 28.221 22.958 51.2 51.2 51.2h409.6c28.242 0 51.2-22.979 51.2-51.2 0-16.957-13.783-30.72-30.72-30.72zM399.319 301.878l-29-11.94a5.668 5.668 0 0 0-4.382.021l-27.628 11.653c-8.356 3.523-17.101 5.304-26.071 5.304-8.888 0-17.551-1.761-25.846-5.202l-28.201-11.756a5.605 5.605 0 0 0-4.362-.021l-28.262 11.776c-8.253 3.441-16.937 5.202-25.805 5.202-8.97 0-17.715-1.782-26.091-5.304l-27.607-11.653a5.946 5.946 0 0 0-2.232-.451c-.737 0-1.475.164-2.191.451l-28.959 11.919c-8.192 3.379-16.794 5.099-25.559 5.099-8.868 0-17.531-1.741-25.784-5.181l-20.378-8.479v95.58h430.08v-95.58l-20.357 8.479c-8.253 3.441-16.916 5.181-25.805 5.181-8.766.001-17.388-1.719-25.56-5.098z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl mt-2">
                {data?.count || 0}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                Bugungi tug'ilgan kunlar soni
              </p>
            </div>
          </div>
          <img
            src={BG}
            alt="wavy"
            className="absolute h-max w-full bottom-0 left-0 z-10 translate-y-2 group-hover:translate-y-8 transition duration-500"
          />
        </div>
        {/* Ish faoliyatini yakunlaganlar  */}
        <div
          className="cursor-pointer group bg-[var(--bgWhite-color)] p-6 rounded-lg group shadow-[0_1px_5px_rgb(0,0,0,0.1)] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition duration-300 relative overflow-hidden"
          onClick={() => navigate("/employe/archives-staff")}
        >
          <div className="flex items-center justify-center gap-2 relative pb-2 z-20 before:content-[''] overflow-hidden before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:translate-x-[-50%] before:bg-[var(--border-color)] group-hover:before:translate-x-0 before:transition before:duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 13.229 13.229"
              xmlSpace="preserve"
              className="fill-[var(--textBlack-color)]"
            >
              <g>
                <path
                  d="M1.918 1.323a.798.798 0 0 0-.794.794v8.995c0 .436.359.794.794.794h6.31a2.721 2.721 0 0 1-.83-.96l-.001-.002a2.763 2.763 0 0 1 .13-2.792 2.779 2.779 0 0 1 2.275-1.27h.002c.106-.002.211.002.316.012V4.498H7.74a.798.798 0 0 1-.795-.794V1.323zm5.556.155v2.226c0 .15.116.265.265.265h2.226zm-4.1 2.49h2.38a.265.265 0 0 1 .265.265.265.265 0 0 1-.264.265H3.373a.265.265 0 0 1-.264-.265.265.265 0 0 1 .264-.264zm0 1.588h4.365a.265.265 0 0 1 .265.265.265.265 0 0 1-.265.264H3.373a.265.265 0 0 1-.264-.264.265.265 0 0 1 .264-.265zm0 1.588H6.68a.265.265 0 0 1 .264.264.265.265 0 0 1-.264.265H3.373a.265.265 0 0 1-.264-.265.265.265 0 0 1 .264-.264zm6.482.264a2.253 2.253 0 0 0-2.25 2.25 2.253 2.253 0 0 0 2.25 2.248 2.253 2.253 0 0 0 2.249-2.249 2.253 2.253 0 0 0-2.25-2.249zm0 1.092a.265.265 0 0 1 .264.264.265.265 0 0 1-.264.265.265.265 0 0 1-.265-.265.265.265 0 0 1 .265-.264zm-6.483.231h2.779a.265.265 0 0 1 .264.265.265.265 0 0 1-.264.264H3.373a.265.265 0 0 1-.264-.264.265.265 0 0 1 .264-.265zm6.483.496a.265.265 0 0 1 .264.265v1.058a.265.265 0 0 1-.264.265.265.265 0 0 1-.265-.265V9.492a.265.265 0 0 1 .265-.265z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <p className="text-xl text-[var(--textBlack-color)] font-semibold">
              Ish faoliyatini yakunlaganlar
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="fill-[var(--text-color)] opacity-0 group-hover:opacity-100 transition duration-500"
            >
              <g>
                <g data-name="Layer 16">
                  <circle
                    cx="256"
                    cy="256"
                    r="69.74"
                    opacity="1"
                    data-original="#000000"
                  ></circle>
                  <path
                    d="M506.11 236.81C446.14 148 351.07 96 256 96.65 160.93 96 65.86 148 5.89 236.81a34.22 34.22 0 0 0 0 38.38C65.86 364 160.93 416 256 415.35c95.07.65 190.14-51.35 250.11-140.16a34.22 34.22 0 0 0 0-38.38zM256 363.74A107.74 107.74 0 1 1 363.74 256 107.74 107.74 0 0 1 256 363.74z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div className="flex flex-wrap items-start justify-around gap-2 py-8 relative z-20">
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 512.003 512.003"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="M259.203 400.601c0-52.089 28.315-97.683 70.358-122.216C194.918 179.087-.925 278.098.003 446.669v50.333c0 8.284 6.716 15 15 15h298.611c-33.098-25.904-54.411-66.209-54.411-111.401z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M400.603 289.202c-61.426 0-111.399 49.974-111.399 111.399 6.119 147.788 216.704 147.744 222.8-.001-.001-61.424-49.974-111.398-111.401-111.398zM439.615 418.4c5.858 5.857 5.859 15.355.002 21.213-5.857 5.859-15.355 5.859-21.213.002l-17.8-17.798-17.8 17.798c-5.857 5.857-15.355 5.857-21.213-.002-5.857-5.857-5.856-15.355.002-21.213l17.797-17.794-17.797-17.794c-5.858-5.857-5.859-15.355-.002-21.213 5.857-5.859 15.355-5.859 21.213-.002l17.8 17.798 17.8-17.798c5.857-5.857 15.355-5.857 21.213.002 5.857 5.857 5.856 15.355-.002 21.213l-17.797 17.794zM327.236 119.435C327.236 53.474 273.764.002 207.803.002c-158.426 6.291-158.38 232.599.001 238.866 65.96 0 119.432-53.472 119.432-119.433z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl mt-2">
                {lobar?.archive_employee_count}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                Ish faoliyatini yakunlaganlar soni
              </p>
            </div>
          </div>
          <img
            src={BG2}
            alt="wavy"
            className="absolute h-max w-full bottom-0 left-0 z-10 translate-y-2 group-hover:translate-y-8 transition duration-500"
          />
        </div>
        {/* Ishga yangi kirganlar  */}
        <div
          className="cursor-pointer group bg-[var(--bgWhite-color)] p-6 rounded-lg group shadow-[0_1px_5px_rgb(0,0,0,0.1)] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] transition duration-300 relative overflow-hidden"
          onClick={() =>
            navigate("/employe/statistics/employee-new-position/no")
          }
        >
          <div className="flex items-center justify-center gap-2 relative pb-2 z-20 before:content-[''] overflow-hidden before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:translate-x-[-50%] before:bg-[var(--border-color)] group-hover:before:translate-x-0 before:transition before:duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 13.229 13.229"
              xmlSpace="preserve"
              className="fill-[var(--textBlack-color)]"
            >
              <g>
                <path
                  d="M1.918 1.323a.798.798 0 0 0-.794.794v8.995c0 .436.359.794.794.794h6.31a2.721 2.721 0 0 1-.83-.96l-.001-.002a2.763 2.763 0 0 1 .13-2.792 2.779 2.779 0 0 1 2.275-1.27h.002c.106-.002.211.002.316.012V4.498H7.74a.798.798 0 0 1-.795-.794V1.323zm5.556.155v2.226c0 .15.116.265.265.265h2.226zm-4.1 2.49h2.38a.265.265 0 0 1 .265.265.265.265 0 0 1-.264.265H3.373a.265.265 0 0 1-.264-.265.265.265 0 0 1 .264-.264zm0 1.588h4.365a.265.265 0 0 1 .265.265.265.265 0 0 1-.265.264H3.373a.265.265 0 0 1-.264-.264.265.265 0 0 1 .264-.265zm0 1.588H6.68a.265.265 0 0 1 .264.264.265.265 0 0 1-.264.265H3.373a.265.265 0 0 1-.264-.265.265.265 0 0 1 .264-.264zm6.482.264a2.253 2.253 0 0 0-2.25 2.25 2.253 2.253 0 0 0 2.25 2.248 2.253 2.253 0 0 0 2.249-2.249 2.253 2.253 0 0 0-2.25-2.249zm0 1.092a.265.265 0 0 1 .264.264.265.265 0 0 1-.264.265.265.265 0 0 1-.265-.265.265.265 0 0 1 .265-.264zm-6.483.231h2.779a.265.265 0 0 1 .264.265.265.265 0 0 1-.264.264H3.373a.265.265 0 0 1-.264-.264.265.265 0 0 1 .264-.265zm6.483.496a.265.265 0 0 1 .264.265v1.058a.265.265 0 0 1-.264.265.265.265 0 0 1-.265-.265V9.492a.265.265 0 0 1 .265-.265z"
                  opacity="1"
                  data-original="#000000"
                ></path>
              </g>
            </svg>
            <p className="text-xl text-[var(--textBlack-color)] font-semibold">
              Ishga yangi kirganlar
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width={24}
              height={24}
              x="0"
              y="0"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              className="fill-[var(--text-color)] opacity-0 group-hover:opacity-100 transition duration-500"
            >
              <g>
                <g data-name="Layer 16">
                  <circle
                    cx="256"
                    cy="256"
                    r="69.74"
                    opacity="1"
                    data-original="#000000"
                  ></circle>
                  <path
                    d="M506.11 236.81C446.14 148 351.07 96 256 96.65 160.93 96 65.86 148 5.89 236.81a34.22 34.22 0 0 0 0 38.38C65.86 364 160.93 416 256 415.35c95.07.65 190.14-51.35 250.11-140.16a34.22 34.22 0 0 0 0-38.38zM256 363.74A107.74 107.74 0 1 1 363.74 256 107.74 107.74 0 0 1 256 363.74z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div className="flex flex-wrap items-start justify-around gap-2 py-8 relative z-20">
            <div className="flex items-center justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="64"
                height="64"
                x="0"
                y="0"
                viewBox="0 0 64 64"
                xmlSpace="preserve"
                className="fill-[var(--text-color)]"
              >
                <g>
                  <path
                    d="M30.46 32.15a14.075 14.075 0 1 0 0-28.15c-18.655.771-18.67 27.38 0 28.15zM46.55 35.88a12.06 12.06 0 1 0 12.06 12.06 12.092 12.092 0 0 0-12.06-12.06zm5 13.06h-4v4a1 1 0 0 1-2 0v-4h-4a1 1 0 0 1 0-2h4v-4a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M37.97 36.81q.435-.33.9-.63c-4.492-1.79-9.553-2.53-14.2-.88l-11.4 3.8a11.52 11.52 0 0 0-7.88 10.94v5.45A4.016 4.016 0 0 0 9.4 59.5h6.08v-4.63a1 1 0 0 1 2 0v4.63h21.09c-7.774-5.078-8.097-17.202-.6-22.69z"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <p className="text-[var(--textBlack-color)] font-normal text-2xl mt-2">
                {lobar?.new_employee_count}
              </p>
              <p className="text-[var(--textBlack-color)] font-medium text-base text-center">
                Ishga yangi kirganlar
              </p>
            </div>
          </div>
          <img
            src={BG}
            alt="wavy"
            className="absolute h-max w-full bottom-0 left-0 z-10 translate-y-2 group-hover:translate-y-8 transition duration-500"
          />
        </div>
      </div>
    </>
  );
};
