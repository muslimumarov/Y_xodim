import {
  AppstoreFilled,
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Popover } from "antd";
import { Input } from "antd";
import { Image } from "antd";
import { Popconfirm } from "antd";
import { Pagination } from "antd";
import { Breadcrumb, Loading, UploadOneImg } from "components";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { imgUrl } from "service";
import { errorMasseg, successMasseg } from "utils/toastify";

export const TeamAdmin = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [editId, seteditId] = useState(-1);
  // ismlar
  const [lastName, setlastName] = useState("");
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `users/find-uct/all?page=${currentPage}&limit=10${
      lastName ? `&last_name=${lastName}` : ""
    }`,
  });
  const { mutate, isLoading: loadingName } = usePost();
  //   pagination onchange bulganda
  const onShowSizeChange = (current) => {
    setcurrentPage(current);
  };
  useEffect(() => {
    if (data?.items) {
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage]);
  // form
  const { control, handleSubmit, reset } = useForm();
  const [imgs, setimgs] = useState();
  //   modal
  const [openModal, setOpenModal] = useState(false);
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
    seteditId(-1);
  };
  //malumotni yuborish
  const onSubmit = (form) => {
    if (editId != -1) {
      mutate({
        url: "users/change",
        method: "POST",
        data: {
          file_id: imgs?.id,
          id: editId,
          action: "edit",
          full_name: form?.full_name,
          username: form?.username,
          password: form?.password,
          phone_number: form?.phone_number,
        },
        onSuccess: () => {
          setimgs();
          refetch();
          resInput();
          handleCancel();
          seteditId(-1);
          successMasseg("Ma'lumot yangilandi !");
        },
        onError: () => {
          errorMasseg("Xatolik ?");
        },
      });
    } else {
      mutate({
        url: "users/change",
        method: "POST",
        data: {
          file_id: imgs?.id,
          action: "add",
          full_name: form?.full_name,
          username: form?.username,
          password: form?.password,
          phone_number: form?.phone_number,
        },
        onSuccess: () => {
          setimgs();
          refetch();
          resInput();
          handleCancel();
          successMasseg("Ma'lumot yangilandi !");
        },
        onError: () => {
          errorMasseg("Xatolik ?");
        },
      });
    }
  };
  // malumotni uchirish
  const deleteConfirm = (id) => {
    mutate({
      url: `users/change`,
      method: "POST",
      data: {
        action: "delete",
        id: id,
        full_name: "admin F.I.O si",
        username: "admin logini",
        password: "admin paroli",
        phone_number: "admin Telefon nomeri",
        file_id: "rasmni idsi",
      },
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot o'chirildi !");
      },
      onError: () => {
        errorMasseg("Xatolik ?");
      },
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      full_name: item?.full_name,
      username: item?.username,
      phone_number: item?.phone_number,
    });
    setimgs({
      id: item?.file?.file_id,
      url: item?.file?.url_1,
    });
    showModal();
  };
  //inputlani bushatish
  const resInput = () => {
    reset({
      full_name: null,
      username: null,
      password: null,
      phone_number: null,
    });
  };
  const [inputref, setinputref] = useState(true);
  const inputsRef = useRef(null);
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
      <Breadcrumb
        link={"Boshqaruvchi(HRM)"}
        link1={"Boshqaruvchilar"}
        link2={"Boshqaruvchi(HRM)"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="w-full items-center flex justify-between  mb-6">
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
                placeholder="F.I.O."
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
            </div>
          </div>
          <button
            onClick={showModal}
            type="button"
            className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          >
            Boshqaruvchi qo'shish
          </button>
        </div>
        <div className="w-full h-max my-5 overflow-x-auto">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  T/r
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Rasm
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  F.I.O.
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Foydalanuvchi nomi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Telefon raqam
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
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {(currentPage - 1) * 10 + i + 1}
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
                      {e?.username}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.phone_number}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Popover
                        placement="bottomRight"
                        content={
                          <div className="flex flex-col items-center justify-start">
                            <p
                              onClick={() => updateOrganizations(e)}
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                            >
                              <EditOutlined />
                              Tahrirlash
                            </p>
                            <Popconfirm
                              title="Ma'lumotni o'chirish"
                              description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                              placement="topRight"
                              onConfirm={() => deleteConfirm(e?.id)}
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
            total={totalPages * 10}
            showSizeChanger={false}
            onChange={onShowSizeChange}
          />
        </div>
        <Modal
          title="Boshqaruvchi qo'shish"
          open={openModal}
          onOk={showModal}
          onCancel={handleCancel}
          zIndex={1050}
          footer={""}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-5 mt-5"
          >
            <UploadOneImg imgs={imgs} setimgs={setimgs} />
            {/* ism */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                F.I.O.
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="full_name"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="F.I.O."
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* nomi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Foydalanuvchi nomi{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="username"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Foydalanuvchi nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* parol */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Parol{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Parol kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* raqam */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Telefon raqam{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="phone_number"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Telefon raqam kiriting"
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
      </div>
    </>
  );
};
