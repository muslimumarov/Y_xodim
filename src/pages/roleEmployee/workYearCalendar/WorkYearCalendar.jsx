import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import { Breadcrumb, GetMonths, Loading } from "components";
import { useGet } from "hooks";
import { useState } from "react";
import { useRef } from "react";
import { Fragment } from "react";

export const WorkYearCalendar = () => {
  const date = new Date().getFullYear() || 2024;
  const [active, setactive] = useState(date);
  const {
    data: { data = {} },
    isLoading,
    refetch,
  } = useGet({
    url: `work-year-calendar/get-days/${active}`,
    enabled: active,
  });

  // Oylar nomlari ro'yxati
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  const yearsArray = Array.from(
    { length: 2061 - 2023 },
    (_, index) => index + 2023
  );

  const carousel = useRef();

  const handleNext = () => {
    setactive((num) => {
      if (2060 == num) return num;
      return num + 1;
    });
    carousel.current.next();
  };

  const handlePrev = () => {
    setactive((num) => {
      if (2023 == num) return num;
      return num - 1;
    });
    carousel.current.prev();
  };

  const changeActive = (e) => {
    if (e > active) {
      setactive(e);
      carousel.current.next();
    } else if (e < active) {
      setactive(e);
      carousel.current.prev();
    }
  };
  return (
    <>
      <Breadcrumb
        link={
          <>
            Ish yili kalendari
            <span className="px-2 bg-green-50 border border-green-500 rounded w-max ml-2 text-green-800">
              {active}
            </span>
          </>
        }
        link1={"Ish yili kalendari"}
        link2={""}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="border border-solid border-[var(--borderWhite-color)] relative rounded">
          <Carousel
            ref={carousel}
            dots={false}
            slidesToShow={3}
            infinite={false}
          >
            {yearsArray?.map((e, i) => (
              <div key={i}>
                <p
                  onClick={() => changeActive(e)}
                  className={`flex items-center justify-center py-3 hover:bg-[var(--borderOpasity-color)] hover:text-black transition ease-linear text-[var(--textBlack-color)] ${
                    active == e
                      ? "border-[var(--text-color)] bg-[var(--textOpasity-color)] text-black"
                      : "border-transparent"
                  } border-b-4 font-semibold text-base`}
                >
                  {e}
                </p>
              </div>
            ))}
          </Carousel>
          <button
            onClick={handlePrev}
            className="absolute translate-y-[-50%] top-[50%] left-0 text-[var(--textBlack-color)]"
          >
            <CaretLeftOutlined />
          </button>
          <button
            onClick={handleNext}
            className="absolute translate-y-[-50%] top-[50%] right-0 text-[var(--textBlack-color)]"
          >
            <CaretRightOutlined />
          </button>
        </div>
        <div className="flex items-center justify-center gap-7 mt-9 flex-wrap">
          <div className="flex items-center justify-start gap-4">
            <div className="w-11 h-4 bg-red-500"></div>
            <p className="text-base text-[var(--textBlack-color)]">
              D - dam olish kuni
            </p>
          </div>
          <div className="flex items-center justify-start gap-4">
            <div className="w-11 h-4 bg-white border"></div>
            <p className="text-base text-[var(--textBlack-color)]">
              I - ish kuni
            </p>
          </div>
          <div className="flex items-center justify-start gap-4">
            <div className="w-11 h-4 bg-yellow-500"></div>
            <p className="text-base text-[var(--textBlack-color)]">
              B/o - Bayramdan oldingi ish kuni
            </p>
          </div>
          <div className="flex items-center justify-start gap-4">
            <div className="w-11 h-4 bg-green-500"></div>
            <p className="text-base text-[var(--textBlack-color)]">
              B - bayram kuni
            </p>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-6 gap-11 mt-9 max-xl:grid-cols-4 max-md:grid-cols-2 max-md:gap-5 max-sm:grid-cols-1">
            {Object?.values(data)?.map((e, i) => (
              <Fragment key={i}>
                <GetMonths month={e} monthName={months[i]} refetch={refetch} />
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
