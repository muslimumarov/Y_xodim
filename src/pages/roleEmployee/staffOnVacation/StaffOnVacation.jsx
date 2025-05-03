import {
  AppstoreFilled,
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Breadcrumb, EmployeVacation, Loading } from "components";
import { useGet, usePost } from "hooks";
import { Input, Pagination } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Image } from "antd";
import { imgUrl } from "service";
import { getDateReverse } from "utils/idCreate";
import { Popover } from "antd";
import { Popconfirm } from "antd";
import { errorMasseg, successMasseg } from "utils/toastify";
import { Modal } from "antd";

export const StaffOnVacation = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fatherName, setfatherName] = useState("");

  const [epmloyeEmployeVacationId, setepmloyeEmployeVacationId] =
    useState(null);
  const [epmloyeEmployeVacationId1, setepmloyeEmployeVacationId1] =
    useState(null);
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `labor-leave/find/all?page=${currentPage}&limit=${pageSize}&lang=uz${
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

  const [dataModal, setdataModal] = useState({});
  //   modal
  const [openModal, setOpenModal] = useState(false);
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, pageSize]);
  // -------------------- form
  const { mutate } = usePost();
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
  // malumotni uchirish daftar
  const deleteConfirm = (id) => {
    mutate({
      url: `labor-leave/delete/${id}`,
      method: "DELETE",
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot o'chirildi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Ta'tildagi xodimlar"}
        link1={"Ta'tildagi xodimlar"}
        link2={""}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:items-start">
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
              className="grid grid-cols-3 gap-2 overflow-x-hidden ease-in duration-500"
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
              onClick={() => setepmloyeEmployeVacationId(1)}
              type="button"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm"
            >
              Xodimga ta'til qo’shish
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
                  Ta'til turi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Qachondan
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Qachongacha
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Ishga chiqish sanasi
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
                          color: e?.labor_leave?.labor_type?.color,
                          backgroundColor: e?.labor_leave?.labor_type?.bg_color,
                        }}
                      >
                        {e?.labor_leave?.labor_type?.key ||
                        e?.labor_leave?.labor_type?.title
                          ? `${e?.labor_leave?.labor_type?.key} -
                            ${e?.labor_leave?.labor_type?.title}`
                          : "-"}
                      </p>
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {getDateReverse(e?.labor_leave?.start_date) || "-"}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {getDateReverse(e?.labor_leave?.end_date) || "-"}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <span
                        className={`${
                          e?.labor_leave?.is_active
                            ? ""
                            : "bg-red-50 border border-red-500 py-1 px-2 rounded"
                        }`}
                      >
                        {getDateReverse(e?.labor_leave?.business_day_date) ||
                          "-"}
                      </span>
                    </td>
                    <td className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Popover
                        placement="bottomRight"
                        content={
                          <div className="flex flex-col items-start justify-center">
                            <p
                              onClick={() => {
                                showModal();
                                setdataModal(e?.labor_leave);
                              }}
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                            >
                              <EyeOutlined />
                              Batafsil
                            </p>
                            <p
                              onClick={() => {
                                setepmloyeEmployeVacationId1(e?.id);
                                setedit(e?.labor_leave?.id);
                                setdataedit(e?.labor_leave);
                              }}
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                            >
                              <EditOutlined />
                              Tahrirlash
                            </p>
                            <Popconfirm
                              title="Ma'lumotni o'chirish"
                              description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                              placement="topRight"
                              onConfirm={() =>
                                deleteConfirm(e?.labor_leave?.id)
                              }
                              onCancel={() => {}}
                              okText="Ha"
                              cancelText="Yo'q"
                            >
                              <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2">
                                <DeleteOutlined />
                                O'chirish
                              </p>
                            </Popconfirm>
                          </div>
                        }
                        trigger="click"
                      >
                        <div className="text-xl w-max flex items-center justify-center bg-[var(--textOpasity-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300 p-1  rounded-lg">
                          <MoreOutlined />
                        </div>
                      </Popover>
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
      <EmployeVacation
        epmloyeEmployeVacationId={epmloyeEmployeVacationId}
        setepmloyeEmployeVacationId={setepmloyeEmployeVacationId}
        employe={false}
        refetch={refetch}
      />
      <EmployeVacation
        epmloyeEmployeVacationId={epmloyeEmployeVacationId1}
        setepmloyeEmployeVacationId={setepmloyeEmployeVacationId1}
        employe={true}
        refetch={refetch}
        edit={edit}
        setedit={setedit}
        dataedit={dataedit}
        setdataedit={setdataedit}
      />
      <Modal
        title="Ta'til ma'lumotlari"
        open={openModal}
        onOk={showModal}
        onCancel={handleCancel}
        width={700}
        zIndex={1050}
        footer={""}
      >
        <div className="mt-6">
          <p className="text-[var(--textBlack-color)] text-base font-semibold">
            <span>Ta'til turi </span> :{" "}
            <span className="text-[var(--text-color)]">
              {dataModal?.labor_type?.title}
            </span>
          </p>
          <p className="text-[var(--textBlack-color)] text-base font-semibold">
            <span>Ta'til kuni </span> :{" "}
            <span className="text-[var(--text-color)]">
              {dataModal?.day_count} kun
            </span>
          </p>
          <p className="text-[var(--textBlack-color)] text-base font-semibold">
            <span>Ta'til berilish sababi </span> :{" "}
            <span className="text-[var(--text-color)]">
              {dataModal?.description}
            </span>
          </p>
          <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
            <span>Qachondan </span> :{" "}
            <span className="text-[var(--text-color)]">
              {getDateReverse(dataModal?.start_date)}
            </span>
          </p>
          <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
            <span>Qachongacha </span> :{" "}
            <span className="text-[var(--text-color)]">
              {getDateReverse(dataModal?.end_date)}
            </span>
          </p>
          <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
            <span>Buyruq raqami </span> :{" "}
            <span className="text-[var(--text-color)]">
              {dataModal?.order_number || "-"}
            </span>
          </p>
          <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
            <span>Buyruq sanasi </span> :{" "}
            <span className="text-[var(--text-color)]">
              {getDateReverse(dataModal?.order_date) || "-"}
            </span>
          </p>
          <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
            <span>Qachondan (Ta'til davri) </span> :{" "}
            <span className="text-[var(--text-color)]">
              {getDateReverse(dataModal?.interval_start_date) || "-"}
            </span>
          </p>
          <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
            <span>Qachongacha (Ta'til davri) </span> :{" "}
            <span className="text-[var(--text-color)]">
              {getDateReverse(dataModal?.interval_end_date) || "-"}
            </span>
          </p>
          <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
            <span>Ishga chiqish sanasi </span> :{" "}
            <span className="text-[var(--text-color)]">
              {getDateReverse(dataModal?.business_day_date) || "-"}
            </span>
          </p>
        </div>
      </Modal>
    </>
  );
};
