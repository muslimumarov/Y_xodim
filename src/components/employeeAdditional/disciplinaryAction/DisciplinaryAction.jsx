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

export const DisciplinaryAction = () => {
  const { id } = useParams();
  const [editId, seteditId] = useState(-1);
  // -------------------- form
  // Intizomiy Intizomiy jazoga qo'shish --------------------------------------------------------------------------
  const { control, handleSubmit, reset } = useForm();
  const { mutate } = usePost();
  const {
    data: { data: data },
    refetch: refetch,
  } = useGet({
    url: `disciplinary-action/find-all/${id}`,
  });

  const {
    data: { data: disciplinaryName },
  } = useGet({
    url: `disciplinary-action/find-types/all`,
  });

  // yuborish
  const onSubmit = (form) => {
    if (editId != -1) {
      mutate({
        url: `disciplinary-action/update`,
        method: "PUT",
        data: {
          id: editId,
          user_id: id,
          punishment_date: getDateForm(form?.punishment_date),
          punishment_number: form?.punishment_number,
          by_whom: form?.by_whom,
          type_of_punishment: form?.type_of_punishment,
          reason_for_punishment: form?.reason_for_punishment,
          type_disciplinary_punishment_id:
            form?.type_disciplinary_punishment_id,
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
        url: `disciplinary-action/create`,
        method: "POST",
        data: {
          user_id: id,
          punishment_date: getDateForm(form?.punishment_date),
          punishment_number: form?.punishment_number,
          by_whom: form?.by_whom,
          type_of_punishment: form?.type_of_punishment,
          reason_for_punishment: form?.reason_for_punishment,
          type_disciplinary_punishment_id:
            form?.type_disciplinary_punishment_id,
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
  // malumotni uzgartirish Intizomiy Intizomiy jazo
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      punishment_date: item?.punishment_date
        ? dayjs(item?.punishment_date)
        : "",
      punishment_number: item?.punishment_number,
      by_whom: item?.by_whom,
      type_of_punishment: item?.type_of_punishment,
      reason_for_punishment: item?.reason_for_punishment,
      type_disciplinary_punishment_id: item?.type?.id,
    });
    showModal();
  };
  // malumotni uchirish Intizomiy Intizomiy jazo
  const deleteConfirm = (id) => {
    mutate({
      url: `disciplinary-action/delete/${id}`,
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
      punishment_date: null,
      punishment_number: null,
      by_whom: null,
      type_of_punishment: null,
      reason_for_punishment: null,
      type_disciplinary_punishment_id: null,
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
              Intizomiy jazo ma'lumotlari
            </p>
            <button
              onClick={showModal}
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              <PlusOutlined /> Intizomiy jazo qo'shish
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
                    Intizomiy jazo sanasi
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Kim tomonidan
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Buyruq raqami
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Intizomiy jazo turi
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Intizomiy jazo sababi
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
                        {getDateReverse(e?.punishment_date)}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.by_whom}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.punishment_number}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.type?.name}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.reason_for_punishment}
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
            <PlusOutlined /> Intizomiy jazo qo'shish
          </button>
        </div>
      )}
      <Modal
        title="Intizomiy jazo qo'shish"
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
          {/* Intizomiy jazo Sanasi (kun-oy-yil) */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Intizomiy jazo Sanasi (kun-oy-yil){" "}
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="punishment_date"
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
              name="punishment_number"
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
          {/* Intizomiy jazo turi */}
          {/* <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Intizomiy jazo turi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="type_of_punishment"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Intizomiy jazo turini nomini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div> */}
          {/* Intizomiy jazo turi*/}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Intizomiy jazo turi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="type_disciplinary_punishment_id"
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
                  placeholder="Intizomiy jazo turini tanlang"
                >
                  {disciplinaryName?.map((e) => (
                    <Select.Option key={e?.id} value={e?.id}>
                      {e?.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </div>
          {/* Intizomiy jazo sababi */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Intizomiy jazo sababi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="reason_for_punishment"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Intizomiy jazo sababini nomini kiriting"
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
