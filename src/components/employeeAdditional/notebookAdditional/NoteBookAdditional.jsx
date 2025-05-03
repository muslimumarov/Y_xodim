import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Select } from "antd";
import { Input } from "antd";
import { DatePicker } from "antd";
import { Popconfirm } from "antd";
import { Popover } from "antd";
import dayjs from "dayjs";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getDateForm, getDateReverse } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";

export const NoteBookAdditional = () => {
  const { id } = useParams();
  const [editId, seteditId] = useState(-1);
  // -------------------- form
  // Daftarga qo'shish --------------------------------------------------------------------------
  const { control, handleSubmit, reset } = useForm();
  const { mutate } = usePost();
  const {
    data: { data: data },
    refetch: refetch,
  } = useGet({
    url: `notebook/find-all/${id}`,
  });
  // daftar turini olish
  const {
    data: { data: notebook },
  } = useGet({
    url: `notebook/find-all-types`,
  });
  // yuborish
  const onSubmit = (form) => {
    if (editId != -1) {
      mutate({
        url: `notebook/update`,
        method: "PUT",
        data: {
          id: editId,
          user_id: id,
          date_of_listing: getDateForm(form?.date_of_listing),
          notebook_type_id: form?.notebook_type_id,
          category: form?.category,
        },
        onSuccess: () => {
          handleCancel();
          resInput();
          refetch();
          successMasseg("Ma'lumot yangilandi !");
          seteditId(-1);
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    } else {
      mutate({
        url: `notebook/create`,
        method: "POST",
        data: {
          user_id: id,
          date_of_listing: getDateForm(form?.date_of_listing),
          notebook_type_id: form?.notebook_type_id,
          category: form?.category,
        },
        onSuccess: () => {
          handleCancel();
          resInput();
          refetch();
          successMasseg("Ma'lumot yangilandi !");
        },
        onError: () => {
          errorMasseg("Xatolik ?");
        },
      });
    }
  };
  // malumotni uzgartirish daftar
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      date_of_listing: item?.date_of_listing
        ? dayjs(item?.date_of_listing)
        : "",
      notebook_type_id: item?.notebook_type_id,
      category: item?.category,
    });
    showModal();
  };
  // malumotni uchirish daftar
  const deleteConfirm = (id) => {
    mutate({
      url: `notebook/delete/${id}`,
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
  //inputlani bushatish
  const resInput = () => {
    reset({
      date_of_listing: null,
      notebook_type_id: null,
      category: null,
    });
  };
  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  return (
    <div className="mt-7">
      {data?.length > 0 ? (
        <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
          <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5 flex items-center justify-between">
            <p className="text-sm text-[var(--textBlack-color)]">
              Daftar ma'lumotlari
            </p>
            <button
              onClick={showModal}
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              <PlusOutlined /> Daftar qo'shish
            </button>
          </div>
          <div className="w-full h-max p-5 overflow-x-auto">
            <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
              <thead className="table-header-group">
                <tr className="text-inherit table-row align-middle outline-0">
                  <th className="w-11 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    T/r
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Ro'yxatga qo'yilgan sanasi
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Ro'yxatga qo'yilgan daftar turi
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Toifasi
                  </th>
                  <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="table-row-group align-middle border-inherit">
                {data?.map((e, i) => {
                  return (
                    <tr
                      className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                      key={i}
                    >
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {i + 1}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {getDateReverse(e?.date_of_listing)}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.notebook_type?.name}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.category}
                      </td>
                      <td className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        <Popover
                          placement="bottomRight"
                          content={
                            <div className="flex flex-col items-start justify-center">
                              <p
                                onClick={() => updateOrganizations(e)}
                                className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2"
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
                                <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2">
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
        </div>
      ) : (
        <div className="w-full h-20 flex items-center justify-center border border-[var(--text-color)] border-dashed">
          <button
            onClick={showModal}
            className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          >
            <PlusOutlined /> Daftar qo'shish
          </button>
        </div>
      )}
      <Modal
        title="Daftar qo'shish"
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
          {/* Ro'yxatga qo'yilgan daftar turi*/}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Ro'yxatga qo'yilgan daftar turi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="notebook_type_id"
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
                  placeholder="Ro'yxatga qo'yilgan daftar turini tanlang"
                >
                  {notebook?.map((e) => (
                    <Select.Option key={e?.id} value={e?.id}>
                      {e?.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </div>
          {/* Ro'yxatga qo'yilgan sanasi (kun-oy-yil) */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Ro'yxatga qo'yilgan sanasi (kun-oy-yil){" "}
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="date_of_listing"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  format={"DD.MM.YYYY"}
                  placeholder="KK.OO.YYYY"
                  type="date"
                  className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Toifa */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Toifa
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="category"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Toifani nomini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              Saqlash
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
