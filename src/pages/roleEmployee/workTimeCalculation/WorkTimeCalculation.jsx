import { Popover } from "antd";
import { DatePicker } from "antd";
import { Input } from "antd";
import { Pagination } from "antd";
import { Breadcrumb, Loading } from "components";
import dayjs from "dayjs";
import { useGet, usePost } from "hooks";
import { useEffect } from "react";
import { useState } from "react";
import "./wrokTime.scss";
import { Modal } from "antd";
import { Image } from "antd";
import { api, imgUrl } from "service";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  LoadingOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { getDateReverse } from "utils/idCreate";
import { Controller, useForm } from "react-hook-form";
import { Select } from "antd";
import { errorMasseg, successMasseg } from "utils/toastify";
import { Popconfirm } from "antd";

export const WorkTimeCalculation = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [date, setdate] = useState(
    `${new Date()?.getFullYear()}-${new Date()?.getMonth() + 1}`
  );

  const [currentPage2, setcurrentPage2] = useState(1);
  const [totalPages2, settotalPages2] = useState(1);
  const [pageSize2, setpageSize2] = useState(10);

  const [timeEmployeeId, settimeEmployeeId] = useState(null);
  const [timeEmployeeDate, settimeEmployeeDate] = useState(null);
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `work-time-table/find/all?page=${currentPage}&limit=${pageSize}${
      firstName ? `&first_name=${firstName}` : ""
    }${lastName ? `&last_name=${lastName}` : ""}${
      fatherName ? `&father_name=${fatherName}` : ""
    }&year=${date.split("-")?.[0]}&month=${date.split("-")?.[1] * 1}`,
  });
  // xodimning tatilini olish
  const {
    data: { data: laborLeave },
  } = useGet({
    url: `labor-leave/find-all-types`,
  });
  //   backend bilan aloqa
  const {
    data: { data: allTime },
    refetch: refetch2,
    isLoading: isLoadingAllTime,
  } = useGet({
    url: `hik-user/find-one-employee/all-log/${timeEmployeeId}?page=${currentPage2}&limit=${pageSize2}&date=${timeEmployeeDate}`,
    enabled: timeEmployeeId,
  });

  useEffect(() => {
    if (data?.items) {
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);

  //   pagination onchange bulganda
  const onShowSizeChange = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };
  const onShowSizeChange2 = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };

  const onChange = (e) => {
    if (e) {
      let month = e?.$M + 1 > 9 ? e?.$M + 1 : `0${e?.$M + 1}`;
      let data = `${e?.$y}-${month}`;
      setdate(data);
    }
  };

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, pageSize, date]);

  useEffect(() => {
    if (allTime?.items) {
      setcurrentPage2(allTime?.meta?.currentPage || 1);
      settotalPages2(allTime?.meta?.totalPages || 1);
    }
  }, [allTime]);

  useEffect(() => {
    if (allTime?.items) refetch2();
  }, [currentPage2, pageSize2]);

  //   pagination onchange bulganda
  const onShowSizeChange21 = (current, pageSize) => {
    setcurrentPage2(current);
    setpageSize2(pageSize);
  };
  const onShowSizeChange22 = (current, pageSize) => {
    setcurrentPage2(current);
    setpageSize2(pageSize);
  };

  //   modal
  const [openModal, setOpenModal] = useState(false);
  // modalni ochish
  const showModal = (id, date) => {
    setOpenModal(true);
    settimeEmployeeId(id);
    settimeEmployeeDate(date);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
    settimeEmployeeId(null);
    settimeEmployeeDate(null);
    setcurrentPage2(1);
  };
  // xodimni vaqtini uzgartirish
  const [active, setactive] = useState(null);
  const [activeEmp, setactiveEmp] = useState(null);

  const { mutate, isLoading: loadingName } = usePost();
  // form
  const { control, handleSubmit, reset } = useForm();
  //   modal
  const [openModal2, setOpenModal2] = useState(false);
  // modalni ochish
  const showModal2 = (data, emp) => {
    setactive(data);
    setactiveEmp(emp);
    setOpenModal2(true);
    if (moreIdited == -1) {
      reset({
        desc: data?.comment || null,
        hour: Number(data?.hour) ? Math.round(Number(data?.hour)) + "" : null,
        // work_result_type: data?.workResultType || null,
      });
    } else {
      let clickdata = set_days?.find((e) => {
        return e.day == data?.day;
      });
      reset({
        desc: clickdata?.desc || data?.comment || null,
        hour:
          clickdata?.hour / 3600 || Number(data?.hour)
            ? clickdata?.hour / 3600 + "" || Math.round(Number(data?.hour)) + ""
            : null,
      });
      let dataArr = set_days?.filter((e) => e.day != data?.day);
      setset_days(dataArr);
    }
  };
  // modalni yopish
  const handleCancel2 = () => {
    setactive(null);
    setactiveEmp(null);
    setOpenModal2(false);
    reset();
  };

  // xodimning hamma vaqti
  const [set_days, setset_days] = useState([]);
  const [moreIdited, setmoreIdited] = useState(-1);

  const showModal3 = (data) => {
    setmoreIdited(data?.id);
    setactive(data);
  };

  const cancelModal3 = () => {
    setmoreIdited(-1);
    setactive(null);
    setset_days([]);
  };
  const sendModal3 = () => {
    mutate({
      url: "work-time-table/set-more-time",
      method: "POST",
      data: {
        user_id: moreIdited,
        year: date.split("-")?.[0],
        month: date.split("-")?.[1] * 1 - 1,
        set_days: set_days,
      },
      onSuccess: () => {
        reset();
        handleCancel();
        handleCancel2();
        cancelModal3();
        refetch();
        successMasseg("Ma'lumot yangilandi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };

  //malumotni yuborish
  const onSubmit = (form) => {
    if (moreIdited == -1) {
      mutate({
        url: "work-time-table/set-time",
        method: "POST",
        data: {
          user_id: activeEmp?.id,
          year: active?.year,
          month: active?.month - 1,
          day: active?.day,
          hour: form?.hour * 3600,
          desc: form?.desc,
        },
        onSuccess: () => {
          reset();
          handleCancel();
          handleCancel2();
          refetch();
          successMasseg("Ma'lumot yangilandi!");
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    } else {
      setset_days((data) => [
        ...data,
        {
          day: active?.day,
          hour: form?.hour * 3600,
          desc: form?.desc,
        },
      ]);
      reset();
      handleCancel2();
    }
  };

  const [loadingPdf, setloadingPdf] = useState(false);

  const downlandPdf = () => {
    setloadingPdf(true);
    api
      .get(
        `work-time-table/pdf/download?&year=${date.split("-")?.[0]}&month=${
          date.split("-")?.[1] * 1
        }`
      )
      .then((res) => {
        window.open(imgUrl + res?.data?.data?.url);
        setloadingPdf(false);
      })
      .catch(() => {
        errorMasseg("Xatolik ?");
        setloadingPdf(false);
      });
  };

  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "")
      ?.toLowerCase()
      ?.includes(input?.toLowerCase());
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Ish vaqti hisobi"}
        link1={"Ish vaqti hisobi"}
        link2={""}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="grid grid-cols-5 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 overflow-x-hidden">
          {/* Familiya */}
          <Input
            placeholder="Familiya"
            value={lastName}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            size="large"
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
          {/* Ism */}
          <Input
            placeholder="Ism"
            value={firstName}
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            size="large"
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
          {/* Otasining ismi */}
          <Input
            placeholder="Otasining ismi"
            size="large"
            value={fatherName}
            onChange={(e) => {
              setfatherName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
          <DatePicker
            value={date ? dayjs(date) : ""}
            picker="month"
            onChange={onChange}
            format={"MM.YYYY"}
            placeholder="OO.YYYY"
            type="date"
            className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
          <button
            onClick={downlandPdf}
            disabled={loadingPdf}
            type="button"
            className="w-full max-w-[200px] p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          >
            {loadingPdf ? <LoadingOutlined /> : "Xodimlar tabelini yuklash"}
          </button>
        </div>
        <div className="flex items-center justify-start gap-7 gap-y-3 mt-9 flex-wrap">
          {/* D - Dam olish kuni */}
          <div className="flex items-center justify-start gap-2">
            <div className="w-8 h-3 bg-red-300"></div>
            <p className="text-xs text-[var(--textBlack-color)]">
              D - Dam olish kuni
            </p>
          </div>
          {/* B - Bayram kuni */}
          <div className="flex items-center justify-start gap-2">
            <div className="w-8 h-3 bg-green-500"></div>
            <p className="text-xs text-[var(--textBlack-color)]">
              B - Bayram kuni
            </p>
          </div>
          {/* B/o - Bayramdan oldingi ish kuni */}
          <div className="flex items-center justify-start gap-2">
            <div className="w-8 h-3 bg-yellow-500"></div>
            <p className="text-xs text-[var(--textBlack-color)]">
              B/o - Bayramdan oldingi ish kuni
            </p>
          </div>
          {/* Y - Sababsiz ishga kelmaslik */}
          <div className="flex items-center justify-start gap-2">
            <div className="w-8 h-3 bg-red-500"></div>
            <p className="text-xs text-[var(--textBlack-color)]">
              Y - Sababsiz ishga kelmaslik
            </p>
          </div>
          {/* R/d - Ruxsat berilgan qo'shimcha dam olish kuni */}
          <div className="flex items-center justify-start gap-2">
            <div className="w-8 h-3 bg-teal-500"></div>
            <p className="text-xs text-[var(--textBlack-color)]">
              R/d - Ruxsat berilgan qo'shimcha dam olish kuni
            </p>
          </div>
          {/* O'zgartirilgan vaqt soati */}
          <div className="flex items-center justify-start gap-2">
            <div className="w-8 h-3 bg-cyan-300"></div>
            <p className="text-xs text-[var(--textBlack-color)]">
              O'zgartirilgan vaqt soati
            </p>
          </div>
          {/* Turniket vaqti */}
          <div className="flex items-center justify-start">
            <div className="w-8 h-3 bg-transparent border"></div>
            <sup className="text-red-600 text-xs relative">*</sup>
            <p className="text-xs text-[var(--textBlack-color)] ml-2">
              Turniket vaqti
            </p>
          </div>
          {laborLeave?.map((e) => (
            <div key={e?.id} className="flex items-center justify-start gap-2">
              <div
                style={{ backgroundColor: `${e?.bg_color}` }}
                className="w-8 h-3"
              ></div>
              <p className="text-xs text-[var(--textBlack-color)]">
                {e?.key} - {e?.title}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full h-max my-5 overflow-auto max-h-[600px]">
          <table
            className={`table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)] tableExcel`}
          >
            <thead className="table-header-group sticky top-0 z-40">
              {/* xodim malumoti */}
              <tr className="text-inherit table-row align-middle outline-0">
                <th
                  rowSpan={2}
                  className="w-[32px] sticky max-md:static left-0 z-10 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center"
                >
                  T/r
                </th>
                <th
                  rowSpan={2}
                  className="sticky max-md:static left-[34px] z-10 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center"
                >
                  F.I.O.
                </th>
                <th
                  rowSpan={2}
                  className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center"
                >
                  Lavozimi
                </th>
                <th
                  rowSpan={2}
                  className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center"
                >
                  Stavkasi
                </th>
                {/* <th
                  rowSpan={2}
                  className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center"
                >
                  Tabel raqami
                </th> */}
                <th
                  rowSpan={2}
                  className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center"
                >
                  Ish soatlarini o'zgartirish
                </th>
                <th
                  colSpan={data?.days}
                  className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center"
                >
                  Oy kunlari bo'yicha ishga kelgan va kelmagan kunlari
                </th>
                <th
                  colSpan={2}
                  className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center"
                >
                  Joriy davrda ishlagan vaqti
                </th>
              </tr>
              {/* ishlagan kunlari */}
              <tr className="text-inherit table-row align-middle outline-0">
                {Array.from(
                  { length: data?.days },
                  (_, index) => index + 1
                )?.map((e) => (
                  <th
                    key={e}
                    className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center"
                  >
                    {e}
                  </th>
                ))}
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center">
                  Kunlar
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center">
                  Soatlar
                </th>
              </tr>
            </thead>
            <tbody className="table-row-group align-middle border-inherit">
              {data?.items?.map((e, i) => {
                return (
                  <tr
                    className={`ease-linear duration-300 tablehovr tableHover ${
                      moreIdited == e?.id ? "tebleIdite" : ""
                    }`}
                    key={i}
                  >
                    <td className="sticky max-md:static left-0 z-30 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center">
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="sticky max-md:static left-[34px] z-30 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-left min-w-[200px]">
                      {e?.full_name}
                    </td>
                    <Popover
                      placement="right"
                      content={e?.user_position?.[0]?.position?.staff_full}
                    >
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center max-w-[140px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {e?.user_position?.[0]?.position?.staff_full}
                      </td>
                    </Popover>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center">
                      {e?.user_position?.[0]?.rate}
                    </td>
                    {/* <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center">
                      {e?.table_number}
                    </td> */}
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center">
                      {moreIdited == e?.id ? (
                        <div className="grid grid-cols-2 items-center justify-center gap-1">
                          <Popconfirm
                            title="Ma'lumotlarni tozalash"
                            description="Haqiqatdan ham tozalash hohlaysizmi?"
                            placement="topRight"
                            onConfirm={() => cancelModal3(e)}
                            onCancel={() => {}}
                            okText="Ha"
                            cancelText="Yo'q"
                          >
                            <button
                              type="button"
                              className="w-full p-1 px-2 text-white bg-red-500 rounded text-center text-sm"
                            >
                              <CloseOutlined />
                            </button>
                          </Popconfirm>

                          <button
                            onClick={() => sendModal3(e)}
                            type="button"
                            className="w-full p-1 px-2 text-white bg-green-500 rounded text-center text-sm"
                          >
                            <CheckOutlined />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => showModal3(e)}
                          type="button"
                          className="w-full p-1 px-2 text-white bg-[var(--text-color)] rounded text-center text-sm"
                        >
                          <EditOutlined />
                        </button>
                      )}
                    </td>
                    {e?.hours?.months?.length > 0
                      ? e?.hours?.months?.map((j, i) => (
                          <td
                            key={i}
                            className={`relative tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] text-center p-0 overflow-hidden ${
                              j?.workResultType == "i"
                                ? "font-medium"
                                : j?.workResultType == "d"
                                ? "!bg-red-200 font-semibold"
                                : j?.workResultType == "bo"
                                ? "!bg-yellow-200 font-semibold"
                                : j?.workResultType == "b"
                                ? "!bg-green-200 font-semibold"
                                : j?.workResultType == "xs"
                                ? "!bg-sky-200 font-semibold"
                                : j?.workResultType == "bs"
                                ? "!bg-yellow-200 font-semibold"
                                : j?.workResultType == "y"
                                ? "!bg-red-400 font-semibold"
                                : j?.workResultType == "rd"
                                ? "!bg-teal-200 font-semibold"
                                : j?.workResultType == "it"
                                ? "!bg-slate-200 font-semibold"
                                : j?.workResultType == "mo"
                                ? "!bg-violet-200 font-semibold"
                                : j?.workResultType == "k"
                                ? "!bg-lime-200 font-semibold"
                                : j?.workResultType == "t"
                                ? "!bg-purple-200 font-semibold"
                                : ""
                            }`}
                            style={{
                              backgroundColor: `${
                                Number(j?.hour)
                                  ? Number(j?.face_time) > 8
                                    ? ""
                                    : Number(j?.hour) != Number(j?.face_time)
                                    ? "#03eaff4d"
                                    : ""
                                  : ""
                              }`,
                            }}
                          >
                            <div
                              className="absolute z-10 w-full h-full top-0 left-0 opacity-20"
                              style={{
                                backgroundColor: `${
                                  j?.color ? j?.color : "transparent"
                                }`,
                              }}
                            ></div>
                            <Popover placement="right" content={j?.comment}>
                              {j?.workResultType == "i" ||
                              j?.workResultType == "bo" ? (
                                <div
                                  className={`relative flex items-center justify-center w-full h-full ${
                                    moreIdited == e?.id
                                      ? set_days?.some((e) => e?.day == j?.day)
                                        ? "bg-green-100"
                                        : ""
                                      : ""
                                  }`}
                                >
                                  <p className="absolute z-20 w-[1px] h-[100px] bg-[var(--borderWhite-color)] left-[50%] top-[-105%] gap-2"></p>
                                  <p
                                    className="p-2 cursor-pointer relative z-20"
                                    onClick={() => showModal(e?.id, j?.date)}
                                  >
                                    {j?.face_time}
                                    <sup className="text-red-600 text-xs relative">
                                      *
                                    </sup>
                                  </p>
                                  <p
                                    onClick={() => {
                                      if (moreIdited != -1) {
                                        if (moreIdited == e?.id) {
                                          showModal2(j, e);
                                        }
                                      } else {
                                        showModal2(j, e);
                                      }
                                    }}
                                    className={`p-2 cursor-pointer  relative z-20`}
                                  >
                                    {moreIdited == e?.id
                                      ? set_days?.find((e) => {
                                          return e.day == j?.day;
                                        })?.hour / 3600 || j?.hour
                                      : j?.hour}
                                  </p>
                                </div>
                              ) : (
                                <p
                                  onClick={() => showModal2(j)}
                                  className="relative z-20"
                                >
                                  {j?.workResultType?.toUpperCase()}
                                </p>
                              )}
                            </Popover>
                          </td>
                        ))
                      : Array.from(
                          { length: data?.days },
                          (_, index) => index + 1
                        )?.map((e) => (
                          <td
                            key={e}
                            className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] px-1 py-2 text-center"
                          >
                            0
                          </td>
                        ))}
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center">
                      {e?.hours?.user_days}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-xs table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-center">
                      {e?.hours?.user_hour}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-max mx-auto">
          <Pagination
            defaultCurrent={currentPage}
            total={totalPages * pageSize}
            defaultPageSize={pageSize}
            pageSizeOptions={[10, 20, 40, 60, 80, 100]}
            showSizeChanger={true}
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange2}
            locale={{ items_per_page: "/ Sahifa" }}
          />
        </div>
      </div>
      {/* xodimlar kirdi chiqdisi */}
      <Modal
        title="Xodimning kirish va chiqish ro'yhatlari"
        open={openModal}
        onOk={showModal}
        onCancel={handleCancel}
        zIndex={999}
        width={800}
        footer={""}
      >
        {isLoadingAllTime ? (
          <Loading />
        ) : (
          <>
            <div className="w-full h-max my-5 overflow-x-auto">
              <table className="table w-full min-w-[700px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
                <thead className="table-header-group">
                  <tr className="text-inherit table-row align-middle outline-0">
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      T/r
                    </th>
                    <th className="w-20 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Rasm
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Holati
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Sana / Vaqat
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Yo'lak
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Izoh
                    </th>
                  </tr>
                </thead>
                <tbody className="table-row-group align-middle border-inherit">
                  {allTime?.items?.map((e, i) => {
                    return (
                      <tr
                        className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                        key={i}
                      >
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {(currentPage2 - 1) * pageSize2 + i + 1}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <Image
                            width={40}
                            height={40}
                            className="object-cover object-center rounded-sm overflow-hidden"
                            src={
                              e?.user?.file?.url_1
                                ? imgUrl + e?.user?.file?.url_1
                                : "https://www.w3schools.com/howto/img_avatar.png"
                            }
                          />
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.device?.device_type == 1 ? (
                            <div className="border border-green-500 w-max py-1 px-2 pl-7 rounded-md relative ml-4">
                              <p className="bg-green-500 rounded-full w-8 h-8 text-lg flex items-center justify-center text-white absolute top-[50%] left-[-1rem] translate-y-[-50%]">
                                <LoginOutlined />
                              </p>
                              <p>Kirish</p>
                            </div>
                          ) : (
                            <div className="border border-red-500 w-max py-1 px-2 pl-7 rounded-md relative ml-4">
                              <p className="bg-red-500 rounded-full w-8 h-8 text-lg flex items-center justify-center text-white absolute top-[50%] left-[-1rem] translate-y-[-50%]">
                                <LogoutOutlined />
                              </p>
                              <p>Chiqish</p>
                            </div>
                          )}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.time}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.device?.device_name}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.description}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="w-max mx-auto">
              <Pagination
                defaultCurrent={currentPage2}
                total={totalPages2 * pageSize2}
                defaultPageSize={pageSize2}
                pageSizeOptions={[10, 20, 40, 60, 80, 100]}
                showSizeChanger={true}
                onChange={onShowSizeChange21}
                onShowSizeChange={onShowSizeChange22}
                locale={{ items_per_page: "/ Sahifa" }}
              />
            </div>
          </>
        )}
      </Modal>
      {/* xodimni soatini uzgartirish */}
      <Modal
        title={getDateReverse(active?.date)}
        open={openModal2}
        onOk={showModal2}
        onCancel={handleCancel2}
        zIndex={1050}
        footer={""}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5 mt-5"
        >
          {/*  Ish kunidagi sabablar */}
          {/* <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Ish kunidagi sabablar
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="work_result_type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value}
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={filterOption}
                  className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                  size="large"
                  placeholder="Ish kunidagi sabablar"
                >
                  <Select.Option value="d">D - dam olish kuni</Select.Option>
                  <Select.Option value="k">K - Kasal</Select.Option>
                  <Select.Option value="xs">X/s - Xizmat safari</Select.Option>
                  <Select.Option value="t">T - Ta'til</Select.Option>
                  <Select.Option value="bs">
                    B/s - Ish haqi saqlanmagan ta'til
                  </Select.Option>
                  <Select.Option value="i">I - ish kuni</Select.Option>
                  <Select.Option value="rd">
                    R/d - Ruxsat berilgan qo'shimcha dam olish kuni
                  </Select.Option>
                  <Select.Option value="y">
                    Y - Sababsiz ishga kelmaslik
                  </Select.Option>
                  <Select.Option value="bo">
                    B/o - Bayramdan oldingi ish kuni
                  </Select.Option>
                  <Select.Option value="b">B - bayram kuni</Select.Option>
                  <Select.Option value="it">
                    I/t - Ijtimoiy ta`til
                  </Select.Option>
                  <Select.Option value="mo">
                    M/o - Malaka oshirish
                  </Select.Option>
                </Select>
              )}
            />
          </div> */}
          {/* Ish vaqti soati */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Ish vaqti soati
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="hour"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value}
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={filterOption}
                  className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                  size="large"
                  placeholder="Ish vaqti soati"
                >
                  <Select.Option value="0">0-soat</Select.Option>
                  <Select.Option value="1">1-soat</Select.Option>
                  <Select.Option value="2">2-soat</Select.Option>
                  <Select.Option value="3">3-soat</Select.Option>
                  <Select.Option value="4">4-soat</Select.Option>
                  <Select.Option value="5">5-soat</Select.Option>
                  <Select.Option value="6">6-soat</Select.Option>
                  <Select.Option value="7">7-soat</Select.Option>
                  <Select.Option value="8">8-soat</Select.Option>
                  <Select.Option value="9">9-soat</Select.Option>
                  <Select.Option value="10">10-soat</Select.Option>
                  <Select.Option value="11">11-soat</Select.Option>
                  <Select.Option value="12">12-soat</Select.Option>
                  <Select.Option value="13">13-soat</Select.Option>
                  <Select.Option value="14">14-soat</Select.Option>
                  <Select.Option value="15">15-soat</Select.Option>
                  <Select.Option value="16">16-soat</Select.Option>
                  <Select.Option value="17">17-soat</Select.Option>
                  <Select.Option value="18">18-soat</Select.Option>
                  <Select.Option value="19">19-soat</Select.Option>
                  <Select.Option value="20">20-soat</Select.Option>
                  <Select.Option value="21">21-soat</Select.Option>
                  <Select.Option value="22">22-soat</Select.Option>
                  <Select.Option value="23">23-soat</Select.Option>
                  <Select.Option value="24">24-soat</Select.Option>
                </Select>
              )}
            />
          </div>
          {/* Ish vaqti soati o'zgartirish sababi */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Ish vaqti soati o'zgartirish sababi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="desc"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  rows={3}
                  placeholder="Ish vaqti soati o'zgartirish sababi"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          <div className="w-full">
            <button
              disabled={loadingName}
              type="submit"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              Saqlash
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
