import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { Select } from "antd";
import { Input } from "antd";
import { Image } from "antd";
import { Pagination } from "antd";
import { Breadcrumb, Loading } from "components";
import dayjs from "dayjs";
import { useGet } from "hooks";
import { useState } from "react";
import { useEffect } from "react";
import { imgUrl } from "service";
import { io } from "socket.io-client";
import { getDateForm } from "utils/idCreate";
// import { socket } from "socket/socket";

export const HikJournalEmployee = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [date, setdate] = useState("");

  // const [isLoading, setisLoading] = useState(true);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [latecomers, setlatecomers] = useState(null);
  //   backend bilan aloqa
  const {
    data: { data },
    refetch,
    isLoading,
  } = useGet({
    url: `hik-user/log-find-cadry/all?page=${currentPage}&limit=${pageSize}${
      date ? `&date=${date}` : ""
    }${firstName ? `&first_name=${firstName}` : ""}${
      lastName ? `&last_name=${lastName}` : ""
    }${fatherName ? `&father_name=${fatherName}` : ""}${
      latecomers ? `&type=${latecomers}` : ""
    }`,
    onSuccess: () => {
      // setisLoading(false);
    },
    onError: () => {
      // setisLoading(false);
    },
  });

  const onChange = (date) => {
    setdate(getDateForm(date));
  };
  //   pagination onchange bulganda
  const onShowSizeChange = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };
  const onShowSizeChange2 = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };

  useEffect(() => {
    if (data?.items) {
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [date]);

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, pageSize, latecomers]);

  const handleProvinceChange12 = (value) => {
    setlatecomers(value);
    setcurrentPage(1);
  };

  useEffect(() => {
    const socket = io("https://hrm.kuprikqurilish.uz/websocket"); // Nest.js serveringizning manzili
    socket.on("connect", () => {
      // console.log("Connected to server");
    });
    socket.on("new_data", (data) => {
      // console.log("Response from server:", data);
      // Serverdan kelgan javobni qabul qilish
      if (data?.ok) {
        refetch();
      }
    });
    return () => {
      socket.disconnect(); // Komponent bekor qilinganda ulanishni to'xtatish
    };
  }, []);

  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb link={"Davomat"} link1={"Turniket"} link2={"Davomat"} />
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
            onChange={onChange}
            format={"DD.MM.YYYY"}
            placeholder="KK.OO.YYYY"
            type="date"
            className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
          <Select
            value={latecomers}
            onChange={handleProvinceChange12}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={filterOption}
            className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
            size="large"
            placeholder="Kechikganlarni ko'rish"
          >
            <Select.Option value="">Hammasini ko'rish</Select.Option>
            <Select.Option value="latecomers">Kechikganlar</Select.Option>
          </Select>
        </div>
        <div className="w-full h-max my-5 overflow-x-auto">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  T/r
                </th>
                <th className="w-20 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Rasm
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  F.I.O.
                </th>
                <th className="w-[280px] tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Lavozimi
                </th>
                <th className="w-[280px] tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Tashkilot, Boshqarma, Bo‘lim
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
              {data?.items?.map((e, i) => {
                return (
                  <tr
                    className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                    key={i}
                  >
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {(currentPage - 1) * pageSize + i + 1}
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
                    <td className="cursor-pointer tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.user?.full_name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.user_position?.map((j) => (
                        <span key={j?.id} className="mr-2">
                          {j?.position?.staff_full}
                        </span>
                      ))}
                      {e?.user?.job_name ? e?.user?.job_name : ""}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.guest == "guest" ? (
                        <p className="px-2 py-1 text-white bg-yellow-500 w-max rounded">
                          Mehmon
                        </p>
                      ) : (
                        e?.department?.name
                      )}
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
                      {e?.type == "latecomers" ? (
                        <span className="text-red-600">{e?.time || "-"}</span>
                      ) : (
                        e?.time || "-"
                      )}
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
    </>
  );
};
