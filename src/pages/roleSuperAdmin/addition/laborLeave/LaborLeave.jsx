import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PicCenterOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Popover } from "antd";
import { Switch } from "antd";
import { Input } from "antd";
import { Popconfirm } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useRef } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { errorMasseg, successMasseg } from "utils/toastify";

export const LaborLeave = () => {
  const [editId, seteditId] = useState(-1);
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `labor-leave-item/find/all`,
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
        url: "labor-leave-item/edit",
        method: "PUT",
        data: {
          id: editId,
          title: form?.title,
          key: form?.key,
          color: form?.color,
          bg_color: form?.bg_color,
          is_interval: form?.is_interval,
          is_order_date: form?.is_order_date,
          hash: form?.hash,
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
        url: "labor-leave-item/add",
        method: "POST",
        data: {
          title: form?.title,
          key: form?.key,
          color: form?.color,
          bg_color: form?.bg_color,
          is_interval: form?.is_interval,
          is_order_date: form?.is_order_date,
          hash: form?.hash,
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
      url: `labor-leave-item/delete/${id}`,
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
      title: null,
      key: null,
      color: null,
      bg_color: null,
      is_interval: false,
      is_order_date: false,
      hash: null,
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      title: item?.title,
      key: item?.key,
      color: item?.color,
      bg_color: item?.bg_color,
      is_interval: item?.is_interval,
      is_order_date: item?.is_order_date,
      hash: item?.hash,
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
      url: `labor-leave-item/sort`,
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
      <Breadcrumb link={"Ta'til turlari"} link1={"Ta'til turlari"} link2={""} />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="w-full flex justify-end  mb-6">
          <button
            onClick={showModal}
            type="button"
            className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          >
            Ta'til turlarini qo'shish
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
                  Ta'til nomi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Ta'til nomi qisqartmasi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Hash
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Ta'til davri
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Ta'til buyrug'i
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
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <UnorderedListOutlined />
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {i + 1}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <p
                        className="w-max rounded-md py-1 px-2"
                        style={{
                          color: e?.color,
                          backgroundColor: e?.bg_color,
                        }}
                      >
                        {e?.title}
                      </p>
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.key}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.hash}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Switch
                        checked={e?.is_interval}
                        checkedChildren="Bor"
                        unCheckedChildren="Yo'q"
                        size="large"
                        className="bg-red-600"
                      />
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Switch
                        checked={e?.is_order_date}
                        checkedChildren="Bor"
                        unCheckedChildren="Yo'q"
                        size="large"
                        className="bg-red-600"
                      />
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
          title="Ta'til turlarini qo'shish"
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
            {/* ta'til nomi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ta'til nomi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="title"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ta'til nomi"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Ta'til nomi qisqartmasi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ta'til nomi qisqartmasi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="key"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ta'til nomi qisqartmasi"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Hash*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Hash
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="hash"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Hash"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* text rangi */}
            <div className="w-full flex flex-col ">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Matn rangi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="color"
                control={control}
                rules={{ required: false }}
                render={({ field }) => <input {...field} type="color" />}
              />
            </div>
            {/* orqafon rangi */}
            <div className="w-full flex flex-col ">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Orqa fon rangi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="bg_color"
                control={control}
                rules={{ required: false }}
                render={({ field }) => <input {...field} type="color" />}
              />
            </div>
            {/* ta'til davri */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ta'til davri bormi ?
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="is_interval"
                control={control}
                defaultValue={false}
                rules={{ required: false }}
                render={({ field }) => (
                  <Switch
                    {...field}
                    checked={field.value}
                    checkedChildren="Bor"
                    unCheckedChildren="Yo'q"
                    size="large"
                    className="bg-red-600"
                  />
                )}
              />
            </div>
            {/* ta'til buyrug'i */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ta'til buyrug'i bormi ?
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="is_order_date"
                control={control}
                defaultValue={false}
                rules={{ required: false }}
                render={({ field }) => (
                  <Switch
                    {...field}
                    checked={field.value}
                    checkedChildren="Bor"
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
      </div>
    </>
  );
};
