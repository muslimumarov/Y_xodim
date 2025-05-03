import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Switch } from "antd";
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

export const Encourage = () => {
  const { id } = useParams();
  const [editId, seteditId] = useState(-1);
  // -------------------- form
  // Intizomiy Rag'batlantirishga qo'shish --------------------------------------------------------------------------
  const { control, handleSubmit, reset } = useForm();
  const { mutate } = usePost();
  const {
    data: { data: data },
    refetch: refetch,
  } = useGet({
    url: `encourage/find-all/${id}`,
  });
  // yuborish
  const onSubmit = (form) => {
    if (editId != -1) {
      mutate({
        url: `encourage/update`,
        method: "PUT",
        data: {
          id: editId,
          user_id: id,
          encourage_date: getDateForm(form?.encourage_date),
          order_number: form?.order_number,
          by_whom: form?.by_whom,
          type_of_encourage: form?.type_of_encourage,
          reason_for_encourage: form?.reason_for_encourage,
          is_state_award: form?.is_state_award,
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
        url: `encourage/create`,
        method: "POST",
        data: {
          user_id: id,
          encourage_date: getDateForm(form?.encourage_date),
          order_number: form?.order_number,
          by_whom: form?.by_whom,
          type_of_encourage: form?.type_of_encourage,
          reason_for_encourage: form?.reason_for_encourage,
          is_state_award: form?.is_state_award,
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
  // malumotni uzgartirish Intizomiy Rag'batlantirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      encourage_date: item?.encourage_date ? dayjs(item?.encourage_date) : "",
      order_number: item?.order_number,
      by_whom: item?.by_whom,
      type_of_encourage: item?.type_of_encourage,
      reason_for_encourage: item?.reason_for_encourage,
      is_state_award: item?.is_state_award,
    });
    showModal();
  };
  // malumotni uchirish Intizomiy Rag'batlantirish
  const deleteConfirm = (id) => {
    mutate({
      url: `encourage/delete/${id}`,
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
      encourage_date: null,
      order_number: null,
      by_whom: null,
      type_of_encourage: null,
      reason_for_encourage: null,
      is_state_award: false,
    });
  };
  return (
    <div className="mt-7">
      {data?.length > 0 ? (
        <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
          <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5 flex items-center justify-between">
            <p className="text-sm text-[var(--textBlack-color)]">
              Rag'batlantirish ma'lumotlari
            </p>
            <button
              onClick={showModal}
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              <PlusOutlined /> Rag'batlantirish qo'shish
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
                    Rag'batlantirish sanasi
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Kim tomonidan
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Buyruq raqami
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Rag'batlantirish turi
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Rag'batlantirish sababi
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Davlat mukofati sifatida qo'shilgan
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
                        {getDateReverse(e?.encourage_date)}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.by_whom}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.order_number}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.type_of_encourage}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.reason_for_encourage}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        <Switch
                          checked={e?.is_state_award}
                          checkedChildren="Bor"
                          unCheckedChildren="Yo'q"
                          size="large"
                          className="bg-red-600"
                        />
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
            <PlusOutlined /> Rag'batlantirish qo'shish
          </button>
        </div>
      )}
      <Modal
        title="Rag'batlantirish qo'shish"
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
          {/* Rag'batlantirish Sanasi (kun-oy-yil) */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Rag'batlantirish Sanasi (kun-oy-yil){" "}
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="encourage_date"
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
          {/* Buyruq raqami */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Buyruq raqami
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="order_number"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Buyruq raqamini nomini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Kim tomonidan */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Kim tomonidan
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="by_whom"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Kim tomonidanligini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Rag'batlantirish turi */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Rag'batlantirish turi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="type_of_encourage"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Rag'batlantirish turini nomini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Rag'batlantirish sababi */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Rag'batlantirish sababi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="reason_for_encourage"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Rag'batlantirish sababini nomini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Davlat mukofati sifatida qo'shilsin */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Davlat mukofati sifatida qo'shilsin
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="is_state_award"
              control={control}
              defaultValue={false}
              rules={{ required: false }}
              render={({ field }) => (
                <Switch
                  {...field}
                  checked={field.value}
                  checkedChildren="Ha"
                  unCheckedChildren="Yo'q"
                  size="large"
                  className="bg-red-600"
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
