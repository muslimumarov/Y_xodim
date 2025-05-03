import { AppstoreFilled, AppstoreOutlined } from "@ant-design/icons";
import { Breadcrumb, EmployeMidical, Loading } from "components";
import { useGet } from "hooks";
import { Input, Pagination } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Image } from "antd";
import { imgUrl } from "service";
import { getDateReverse } from "utils/idCreate";

export const MedicalExamination = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fatherName, setfatherName] = useState("");
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `medical-examination/find/all?page=${currentPage}&limit=${pageSize}&lang=uz${
      firstName ? `&first_name=${firstName}` : ""
    }${lastName ? `&last_name=${lastName}` : ""}${
      fatherName ? `&father_name=${fatherName}` : ""
    }`,
  });

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
    if (data?.items) refetch();
  }, [currentPage, pageSize]);

  // xodimga tatil qo'shish\
  const [epmloyeMedicalId, setepmloyeMedicalId] = useState(null);
  const [epmloyeMedicalId1, setepmloyeMedicalId1] = useState(null);
  const [edit, setedit] = useState(-1);

  const [dataedit, setdataedit] = useState(null);

  const inputsRef = useRef(null);
  const [inputref, setinputref] = useState(true);
  //   click bulganda inputla ichiladi va yopiladi
  const inputsRefChange = () => {
    if (inputsRef.current.offsetWidth > 0) {
      inputsRef.current.style.maxWidth = "0px";
      setinputref(false);
    } else {
      inputsRef.current.style.maxWidth = `724px`;
      setinputref(true);
    }
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb link={"Tibbiy ko'rik"} link1={"Tibbiy ko'rik"} link2={""} />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="flex justify-between items-center  mb-6  max-md:flex-col max-md:items-start">
          {/* ismalar buyicha qidirish */}
          <div className="flex items-center justify-start">
            <button
              onClick={inputsRefChange}
              className="w-max p-2 px-4 text-[var(--text-color)] rounded text-center text-3xl"
            >
              {inputref ? <AppstoreFilled /> : <AppstoreOutlined />}
            </button>
            <div
              ref={inputsRef}
              className="grid grid-cols-4 gap-2 overflow-x-hidden ease-in duration-500"
            >
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
                size="small"
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
                size="small"
                className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
              />
              {/* Otasining ismi */}
              <Input
                placeholder="Otasining ismi"
                size="small"
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
            </div>
          </div>
          {/* yuklash va filter */}
          <div className="flex items-center justify-end gap-5">
            {/* xodim qo'shish */}
            <button
              onClick={() => setepmloyeMedicalId(1)}
              type="button"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm"
            >
              Xodimga tibbiy ko'rik qo’shish
            </button>
          </div>
        </div>
        <div className="w-full h-max my-5 overflow-x-auto">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className=" w-8 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  T/r
                </th>
                <th className="w-20 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Rasm
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  F.I.O.
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Tashkilot, Boshqarma, Bo‘lim
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Xulosa
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Holati
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Izoh
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Oxirgi sana
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Keyingi sana
                </th>
                <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Amallar
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
                    <td className="tracking-normal w-10 leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
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
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.full_name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.department?.name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <p
                        className="mr-2 w-max rounded-md py-1 px-2"
                        style={{
                          color: e?.medical_data?.medical_summary?.color,
                          backgroundColor:
                            e?.medical_data?.medical_summary?.bg_color,
                        }}
                      >
                        {e?.medical_data?.medical_summary?.name || "-"}
                      </p>
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.medical_data?.status > 0 ? (
                        <p className="mr-2 w-max rounded-md py-1 px-2 text-white bg-green-500">
                          {e?.medical_data?.status || 0} kun qoldi
                        </p>
                      ) : (
                        <p className="mr-2 w-max rounded-md py-1 px-2 text-white bg-red-500">
                          {e?.medical_data?.status ||
                          e?.medical_data?.status == 0
                            ? `${Math.abs(
                                e?.medical_data?.status
                              )} kun oldin tugagan `
                            : "-"}
                        </p>
                      )}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.medical_data?.comment || "-"}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {getDateReverse(e?.medical_data?.last_date) || "-"}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {getDateReverse(e?.medical_data?.next_date) || "-"}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <button
                        onClick={() => {
                          setepmloyeMedicalId1(e?.id);
                          setedit(e?.medical_data?.id);
                          setdataedit(e?.medical_data);
                        }}
                        type="button"
                        className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm"
                      >
                        Yangilash
                      </button>
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
      <EmployeMidical
        epmloyeMedicalId={epmloyeMedicalId}
        setepmloyeMedicalId={setepmloyeMedicalId}
        employe={false}
        refetch={refetch}
      />
      <EmployeMidical
        epmloyeMedicalId={epmloyeMedicalId1}
        setepmloyeMedicalId={setepmloyeMedicalId1}
        employe={true}
        refetch={refetch}
        edit={edit}
        setedit={setedit}
        dataedit={dataedit}
      />
    </>
  );
};
