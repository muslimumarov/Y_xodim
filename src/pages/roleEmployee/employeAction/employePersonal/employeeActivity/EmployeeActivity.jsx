import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PicCenterOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Popover } from "antd";
import { Input } from "antd";
import { Popconfirm } from "antd";
import { DatePicker } from "antd";
import { Loading } from "components/loading";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getDateForm, getDateReverse } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";
import dayjs from "dayjs";
import { useRef } from "react";
import { Switch } from "antd";

export const EmployeeActivity = () => {
  const [editId, seteditId] = useState(-1);
  const { id } = useParams();
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `employee-labor-activity/work/${id}`,
  });
  const { mutate, isLoading: loadingName } = usePost();
  // form
  const { control, handleSubmit, reset } = useForm();
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
        url: `employee-labor-activity/work-edit/${id}`,
        method: "PUT",
        data: {
          id: editId,
          start_date: form?.start_date ? getDateForm(form?.start_date) : "",
          end_date: form?.end_date ? getDateForm(form?.end_date) : "",
          jon_name: form?.jon_name,
          order_number: form?.order_number,
          order_date: form?.order_date ? getDateForm(form?.order_date) : "",
          contract_number: form?.contract_number,
          contract_date: form?.contract_date
            ? getDateForm(form?.contract_date)
            : "",
          is_main: form?.is_main,
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
        url: `employee-labor-activity/work-add/${id}`,
        method: "POST",
        data: {
          start_date: getDateForm(form?.start_date),
          end_date: form?.end_date ? getDateForm(form?.end_date) : "",
          jon_name: form?.jon_name,
          order_number: form?.order_number,
          order_date: form?.order_date ? getDateForm(form?.order_date) : "",
          contract_number: form?.contract_number,
          contract_date: form?.contract_date
            ? getDateForm(form?.contract_date)
            : "",
          is_main: form?.is_main,
        },
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
      url: `employee-labor-activity/work-remove/${id}`,
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
      start_date: null,
      end_date: null,
      jon_name: null,
      order_number: null,
      order_date: null,
      contract_number: null,
      contract_date: null,
      is_main: false,
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      start_date: item.start_date ? dayjs(item.start_date) : "",
      end_date: item.end_date ? dayjs(item.end_date) : "",
      jon_name: item.staff_name,
      order_number: item.order_number,
      order_date: item.order_date ? dayjs(item.order_date) : "",
      contract_number: item.contract_number,
      contract_date: item.contract_date ? dayjs(item.contract_date) : "",
      is_main: item.is_main,
    });
    showModal();
  };
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const dragStart = (e) => {
    dragItem.current = e.target.id;
  };
  const dragEnter = (e) => {
    dragOverItem.current = e.currentTarget.id;
  };
  const drop = () => {
    const copyListItem = [...data];
    const dragItemContent = copyListItem[dragItem.current];
    copyListItem.splice(dragItem.current, 1);
    copyListItem.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    handleOnDragEnd(copyListItem);
  };
  function handleOnDragEnd(result) {
    let newArr = [];
    result?.forEach((e, i) => {
      newArr.push({ id: e.id, position: i + 1 });
    });

    mutate({
      url: `employee-labor-activity/work-sort/${id}`,
      method: "PUT",
      data: { list: newArr },
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot yangilandi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  }
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="w-full flex justify-end  my-6">
        <button
          onClick={showModal}
          type="button"
          className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
        >
          Mehnat faoliyati qo'shish
        </button>
      </div>
      <div className="w-full h-max my-5 overflow-x-auto">
        <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
          <thead className="table-header-group">
            <tr className="text-inherit table-row align-middle outline-0">
              <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                <PicCenterOutlined />
              </th>
              <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                T/r
              </th>
              <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                Qachondan
              </th>
              <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                Qachongacha
              </th>
              <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                Lavozim
              </th>
              <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                Buyruq
              </th>
              <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                Shartnoma
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
                  onDragStart={(e) => dragStart(e)}
                  onDragEnter={(e) => dragEnter(e)}
                  onDragEnd={drop}
                  draggable
                  id={i}
                  key={i}
                >
                  <td className="tracking-normal cursor-move leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    <UnorderedListOutlined />
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    {i + 1}
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    {getDateReverse(e?.start_date)}
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    {e?.end_date
                      ? getDateReverse(e?.end_date)
                      : "Hozirgi vaqtgacha"}
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    {e?.staff_name}
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Buyruq №{" "}
                    <span className="font-semibold">{e?.order_number}</span> dan{" "}
                    <span className="font-semibold">
                      {getDateReverse(e?.order_date)}
                    </span>{" "}
                    y.
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    {e.is_main ? (
                      <>
                        №{" "}
                        <span className="font-semibold">
                          {e?.contract_number}
                        </span>
                        -sonli qo'shimcha kelishuv{" "}
                        <span className="font-semibold">
                          {getDateReverse(e?.contract_date)}
                        </span>
                        dan
                      </>
                    ) : (
                      <>
                        №{" "}
                        <span className="font-semibold">
                          {e?.contract_number}
                        </span>
                        -sonli mehnat shartnomasi{" "}
                        <span className="font-semibold">
                          {getDateReverse(e?.contract_date)}
                        </span>
                        dan
                      </>
                    )}
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
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
      <Modal
        title="Mehnat faoliyati qo'shish"
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
                  placeholder="Buyruq raqami"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Buyruq sanasi (kun-oy-yil) */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Buyruq sanasi (kun-oy-yil)
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="order_date"
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
          {/* Shartnoma raqami */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Shartnoma raqami
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="contract_number"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Shartnoma raqamini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Shartnoma tuzilgan sanasi (kun-oy-yil) */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Shartnoma tuzilgan sanasi (kun-oy-yil)
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="contract_date"
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
          {/* Qachondan (kun-oy-yil) */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Qachondan (kun-oy-yil){" "}
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="start_date"
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
          {/* Qachongacha (kun-oy-yil) */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Qachongacha (kun-oy-yil)
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="end_date"
              control={control}
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
          {/* Lavozim */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Xodimning ish joyi va lavozimi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="jon_name"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input.TextArea
                  rows={4}
                  {...field}
                  placeholder="Xodimning ish joyi va lavozimi to'liq nomini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Xodim boshqa lavozim o'tkazilmoqdami? */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Xodim boshqa lavozim o'tkazilmoqdami?
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="is_main"
              defaultValue={false}
              control={control}
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
