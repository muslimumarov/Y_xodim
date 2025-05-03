import {
  DownloadOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { DatePicker } from "antd";
import { Select } from "antd";
import { Modal } from "antd";
import { Input } from "antd";
import { Image } from "antd";
import { Pagination } from "antd";
import { Breadcrumb, Loading } from "components";
import dayjs from "dayjs";
import { useDownland, useGet } from "hooks";
import { useState } from "react";
import { useEffect } from "react";
import { imgUrl } from "service";
import { getDateForm, getDateReverse } from "utils/idCreate";
import { infoMasseg } from "utils/toastify";

export const HikJournalTime = () => {
  const { getData } = useDownland();
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [currentPage2, setcurrentPage2] = useState(1);
  const [totalPages2, settotalPages2] = useState(1);
  const [pageSize2, setpageSize2] = useState(10);
  const [date, setdate] = useState("");
  const [start_date, setstart_date] = useState("");
  const [end_date, setend_date] = useState("");

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [enterpriseId, setenterpriseId] = useState(null);
  const [latecomers, setlatecomers] = useState(null);
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `hik-user/time-report/all?page=${currentPage}&limit=${pageSize}${
      firstName ? `&first_name=${firstName}` : ""
    }${lastName ? `&last_name=${lastName}` : ""}${
      fatherName ? `&father_name=${fatherName}` : ""
    }${date ? `&date=${date}` : ""}${
      enterpriseId ? `&enterprise_id=${enterpriseId}` : ""
    }${latecomers ? `&type=${latecomers}` : ""}`,
  });
  const [timeEmployeeId, settimeEmployeeId] = useState(null);
  const [timeEmployeeDate, settimeEmployeeDate] = useState(null);
  //   backend bilan aloqa
  const {
    data: { data: allTime },
    refetch: refetch2,
    isLoading: isLoadingAllTime,
  } = useGet({
    url: `hik-user/find-one-employee/all-log/${timeEmployeeId}?page=${currentPage2}&limit=${pageSize2}&date=${timeEmployeeDate}`,
    enabled: timeEmployeeId,
  });

  // hamma tashkilotlar
  const {
    data: { data: organizationAll },
  } = useGet({
    url: "enterprise/find-all",
  });

  const handleProvinceChange1 = (value) => {
    setenterpriseId(value);
    setcurrentPage(1);
  };
  const handleProvinceChange12 = (value) => {
    setlatecomers(value);
    setcurrentPage(1);
  };

  const onChange = (date) => {
    setdate(getDateForm(date));
  };
  const onChange1 = (date) => {
    setstart_date(getDateForm(date));
  };
  const onChange2 = (date) => {
    setend_date(getDateForm(date));
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

  //   pagination onchange bulganda
  const onShowSizeChange21 = (current, pageSize) => {
    setcurrentPage2(current);
    setpageSize2(pageSize);
  };
  const onShowSizeChange22 = (current, pageSize) => {
    setcurrentPage2(current);
    setpageSize2(pageSize);
  };

  useEffect(() => {
    if (data?.items) {
      setcurrentPage(data?.meta?.currentPage || 1);
      settotalPages(data?.meta?.totalPages || 1);
    }
  }, [data]);

  useEffect(() => {
    if (allTime?.items) {
      setcurrentPage2(allTime?.meta?.currentPage || 1);
      settotalPages2(allTime?.meta?.totalPages || 1);
    }
  }, [allTime]);

  useEffect(() => {
    refetch();
  }, [date]);

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, pageSize, enterpriseId, latecomers]);

  useEffect(() => {
    if (allTime?.items) refetch2();
  }, [currentPage2, pageSize2]);

  function secondsToHms(d) {
    if (d > 0) {
      d = Number(d);
      const h = d > 0 ? Math.floor(d / 60 / 60) % 24 : 0;
      const m = d > 0 ? Math.floor(d / 60) % 60 : 0;
      const s =
        d > 0
          ? Math.floor(d) % 60 > 9
            ? Math.floor(d) % 60
            : "0" + (Math.floor(d) % 60)
          : 0;
      return `${h ? `${h}-soat,` : ""} ${m ? `${m}-daqiqa,` : ""} ${s}-soniya`;
    } else {
      return d;
    }
  }

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

  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  useEffect(() => {
    const messageIn = setTimeout(() => {
      infoMasseg("Xodimlarning ma'lumolarini olish uchun tashkilotni tanlang!");
    }, 100);
    () => {
      return clearTimeout(messageIn);
    };
  }, []);
  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Xodimlarning ishlagan vaqti"}
        link1={"Turniket"}
        link2={"Xodimlarning ishlagan vaqti"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="grid grid-cols-6 gap-2 max-md:grid-cols-3 max-sm:grid-cols-1 overflow-x-hidden">
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
            value={enterpriseId}
            onChange={handleProvinceChange1}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={filterOption}
            className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
            size="large"
            placeholder="Tashkilotni tanlang"
          >
            <Select.Option value="">Hammasini ko'rish</Select.Option>
            {organizationAll?.map((e) => (
              <Select.Option key={e?.id} value={e?.id}>
                {e?.name}
              </Select.Option>
            ))}
          </Select>
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
            <Select.Option value="tourniquet">
              Turnikitdan o'tmaganlar
            </Select.Option>
          </Select>
        </div>
        {enterpriseId && latecomers && (
          <div className="mt-2 grid grid-cols-6 gap-2 justify-end">
            <div></div>
            <div></div>
            <div></div>
            <DatePicker
              value={start_date ? dayjs(start_date) : ""}
              onChange={onChange1}
              format={"DD.MM.YYYY"}
              placeholder="Boshlanish vaqti"
              type="date"
              className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
            />
            <DatePicker
              value={end_date ? dayjs(end_date) : ""}
              onChange={onChange2}
              format={"DD.MM.YYYY"}
              placeholder="Tugash vaqti"
              type="date"
              className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
            />
            {/* xodim qo'shish */}
            <button
              onClick={() =>
                getData(
                  `hik-user/download/excel?${
                    date ? `&date=${date}` : ""
                  }&enterprise_id=${enterpriseId}&type=${latecomers}${
                    start_date ? `&start_date=${start_date}` : ""
                  }${end_date ? `&end_date=${end_date}` : ""}`
                )
              }
              type="button"
              className="min-w-max w-full ml-auto p-2 px-4 text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm"
            >
              <DownloadOutlined />
              Yuklab olish
            </button>
          </div>
        )}
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
                  Ishlagan kuni
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Ishga kelgan vaqti
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Ishdan ketgan vaqti
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Ishlagan vaqti
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
                          e?.file?.url_1
                            ? imgUrl + e?.file?.url_1
                            : "https://www.w3schools.com/howto/img_avatar.png"
                        }
                      />
                    </td>
                    <td
                      onClick={() => {
                        showModal(e?.id, e?.date);
                      }}
                      className="cursor-pointer tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0"
                    >
                      {e?.full_name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.user_position?.map((j) => (
                        <span key={j?.id} className="mr-2">
                          {j?.position?.staff_full}
                        </span>
                      ))}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.department?.name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {getDateReverse(e?.date)}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.type == "latecomers" ? (
                        <span className="text-red-600">
                          {e?.start_date || "-"}
                        </span>
                      ) : (
                        e?.start_date || "-"
                      )}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.end_date || "-"}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <p className="px-2 py-1 rounded-md font-medium w-max border border-green-500 bg-green-50 text-[#121926]">
                        {secondsToHms(e?.report_time)}
                      </p>
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
    </>
  );
};
