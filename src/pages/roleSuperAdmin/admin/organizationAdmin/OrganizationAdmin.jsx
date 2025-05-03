import {
  AppstoreFilled,
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Select } from "antd";
import { Input } from "antd";
import { Image } from "antd";
import { Popconfirm } from "antd";
import { Popover } from "antd";
import { Pagination } from "antd";
import { Breadcrumb, Loading, UploadOneImg } from "components";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { imgUrl } from "service";
import { roleReturnText } from "utils/role";
import { errorMasseg, successMasseg } from "utils/toastify";

export const OrganizationAdmin = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [orgId, setorgId] = useState(0);
  const [editId, seteditId] = useState(-1);

  // ismlar
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fatherName, setfatherName] = useState("");
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `cadry/find/all?page=${currentPage}&limit=10${
      firstName ? `&first_name=${firstName}` : ""
    }${lastName ? `&last_name=${lastName}` : ""}${
      fatherName ? `&surname_name=${fatherName}` : ""
    }`,
    // url: `users/find-org/all?page=${currentPage}&limit=10&org_id=${orgId}&lang=uz`,
  });
  const {
    data: { data: enterpriseAll },
  } = useGet({
    url: "cadry/enterprise/find-all",
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
  }, [currentPage, orgId]);
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
    resInput();
    seteditId(-1);
  };
  //malumotni yuborish
  const onSubmit = (form) => {
    if (editId != -1) {
      mutate({
        url: "cadry/update",
        method: "PUT",
        data: {
          ...form,
          id: editId,
          file_id: imgs?.id,
        },
        onSuccess: () => {
          refetch();
          handleCancel();
          successMasseg("Ma'lumot yangilandi!");
          resInput();
          seteditId(-1);
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    } else {
      mutate({
        url: "cadry/create",
        method: "POST",
        data: { ...form, file_id: imgs?.id },
        onSuccess: () => {
          refetch();
          resInput();
          handleCancel();
          successMasseg("Ma'lumot yangilandi!");
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    }
  };
  // malumotni uchirish
  const deleteConfirm = (id) => {
    mutate({
      url: `cadry/delete/${id}`,
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
  //inputlani bushatish
  const resInput = () => {
    reset({
      first_name: null,
      last_name: null,
      surname_name: null,
      username: null,
      password: null,
      phone_number: null,
      role: null,
      pinfl: null,
    });
    setimgs();
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      first_name: item?.first_name,
      last_name: item?.last_name,
      surname_name: item?.father_name,
      username: item?.username,
      phone_number: item?.phone_number,
      role: item?.role,
      pinfl: item?.pinfl,
    });
    setimgs({
      id: item?.file?.file_id,
      url: item?.file?.url_1,
    });
    showModal();
  };
  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
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
  const [margeloading, setmargeloading] = useState(false);

  const margeCadry = (id, cadry) => {
    setmargeloading(true);
    mutate({
      url: `cadry/merge`,
      method: "PUT",
      data: {
        cadry_id: cadry?.id,
        enterprises: id,
      },
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot yangilandi!");
        setmargeloading(false);
      },
      onError: () => {
        errorMasseg("Xatolik?");
        setmargeloading(false);
      },
    });
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Boshqaruvchi(Tashkilot)"}
        link1={"Boshqaruvchilar"}
        link2={"Boshqaruvchi(Tashkilot)"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="w-full items-center flex justify-between  mb-6 max-md:flex-col max-md:justify-center max-md:items-start">
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
          <div className="w-max flex items-center justify-end gap-6">
            {/* <Select
              value={orgId == 0 ? "" : orgId}
              showSearch
              allowClear
              optionFilterProp="children"
              onChange={(e) => setorgId(e)}
              filterOption={filterOption}
              className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-[260px]"
              size="large"
              placeholder="Tashkilotni tanlang"
            >
              <Select.Option value="" disabled>
                Tashkilotni tanlang
              </Select.Option>
              <Select.Option value="0">Hammasini ko'rish</Select.Option>
              {enterpriseAll?.map((e) => (
                <Select.Option value={e.id} key={e.id}>
                  {e.name}
                </Select.Option>
              ))}
            </Select> */}
            <button
              onClick={showModal}
              type="button"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              Tashkilotga boshqaruvchi qo'shish
            </button>
          </div>
        </div>
        <div className="w-full h-max overflow-x-auto my-5">
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
                  JSHSHIR
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Telefon nomer
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Foydalanuvchi roli
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Tashkiloti
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
                    <td className="cursor-pointer tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.full_name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.username}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.pinfl}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.phone_number}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {roleReturnText(e?.role)}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Select
                        mode="multiple"
                        showSearch
                        allowClear
                        loading={margeloading}
                        disabled={margeloading}
                        optionFilterProp="children"
                        defaultValue={e?.organizations}
                        onChange={(item) => {
                          margeCadry(item, e);
                        }}
                        filterOption={filterOption}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-[360px]"
                        size="middle"
                        placeholder="Tashkilotga kadr qo'shish"
                      >
                        {enterpriseAll?.map((e, i) => {
                          return (
                            <Select.Option value={e?.id} key={i}>
                              {e?.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
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
          title="Tashkilotga bohsqaruvchi qo'shish"
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
            {/* Ismi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ismi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ismini kiritng"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Familiyasi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Familiyasi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="last_name"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Familiyasini kiritng"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Otasining ismi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Otasining ismi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="surname_name"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Otasining ismini kiritng"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Foydalanuvchi nomi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Foydalanuvchi nomi
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
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                JSHSHIR
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="pinfl"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="JSHSHIR ni kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Parol */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Parol
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
            {/* Telefon raqami */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Telefon raqami
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
                    placeholder="Telefon raqamini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Foydalanuvchi roli */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Foydalanuvchi roli
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="role"
                control={control}
                rules={{ required: false }}
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
                    placeholder="Foydalanuvchi rolini tanlang"
                  >
                    <Select.Option value="ROLE_EMPLOYEE">
                      {roleReturnText("ROLE_EMPLOYEE")}
                    </Select.Option>
                    <Select.Option value="ROLE_EMPLOYEE_SUPER">
                      {roleReturnText("ROLE_EMPLOYEE_SUPER")}
                    </Select.Option>
                    <Select.Option value="ROLE_EMPLOYEE_VIEW">
                      {roleReturnText("ROLE_EMPLOYEE_VIEW")}
                    </Select.Option>
                  </Select>
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
