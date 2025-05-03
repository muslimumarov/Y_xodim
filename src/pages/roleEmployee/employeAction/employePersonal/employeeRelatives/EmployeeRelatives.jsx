import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PicCenterOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { DatePicker } from "antd";
import { Popover } from "antd";
import { Input } from "antd";
import { Popconfirm } from "antd";
import { Select } from "antd";
import { Loading } from "components/loading";
import dayjs from "dayjs";
import { useGet, usePost } from "hooks";
import { useRef } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getDateForm, getDateReverse } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";

export const EmployeeRelatives = () => {
  const [editId, seteditId] = useState(-1);
  const { id } = useParams();
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `employee-relative/relative/${id}`,
  });

  //   Qarindoshlarni olish
  const {
    data: { data: kinship },
  } = useGet({
    url: `user-kinship/find/all`,
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
        url: `employee-relative/relative-edit/${id}`,
        method: "PUT",
        data: {
          id: editId,
          relative_id: form?.relative_id,
          full_name: form?.full_name,
          birthday: form?.birthday ? getDateForm(form?.birthday) : "",
          address: form?.address,
          job_name: form?.job_name,
          current_address: form?.current_address,
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
        url: `employee-relative/relative-add/${id}`,
        method: "POST",
        data: {
          relative_id: form?.relative_id,
          full_name: form?.full_name,
          birthday: form?.birthday ? getDateForm(form?.birthday) : "",
          address: form?.address,
          job_name: form?.job_name,
          current_address: form?.current_address,
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
      url: `employee-relative/relative-remove/${id}`,
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
      relative_id: null,
      full_name: null,
      birthday: null,
      address: null,
      job_name: null,
      current_address: null,
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      relative_id: item?.relative_id?.id,
      full_name: item?.full_name,
      birthday: item?.birthday ? dayjs(item?.birthday) : "",
      address: item?.address,
      job_name: item?.job_name,
      current_address: item?.current_address,
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
    const copyListItem = [...data?.cadryRelatives];
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
      url: `employee-relative/relative-sort/${id}`,
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

  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="w-full flex justify-end  my-6">
        <button
          onClick={showModal}
          type="button"
          className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
        >
          Qarindosh qo'shish
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
                Qarindoshligi
              </th>
              <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                F.I.SH
              </th>
              <th className=" tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                Tug'ilgan yili
              </th>
              <th className=" tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                Tug'ilgan joyi
              </th>
              <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                Kasbi
              </th>
              <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                Yashash manzili
              </th>
              <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody className="table-row-group align-middle border-inherit">
            {data?.cadryRelatives?.map((e, i) => {
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
                    {e?.relative_id?.name}
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    {e?.full_name}
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    {getDateReverse(e?.birthday)}
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    {e?.address}
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    {e?.job_name}
                  </td>
                  <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    {e?.current_address}
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
        title="QARINDOSH qo'shish"
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
          {/* Qarindoshligi*/}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Qarindoshligi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="relative_id"
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
                  placeholder="Qarindoshligini tanlang"
                >
                  {kinship?.map((e) => {
                    return (
                      <Select.Option value={e?.id} key={e?.id}>
                        {e?.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              )}
            />
          </div>
          {/* F.I.SH */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              F.I.SH
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
                  placeholder="F.I.SH ni kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Tug'ilgan yili (kun-oy-yil) */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Tug'ilgan yili (kun-oy-yil)
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="birthday"
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
          {/* Tug'ilgan joyi*/}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Tug'ilgan joyi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="address"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Tug'ilgan joyini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Kasbi*/}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Kasbi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="job_name"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Kasbini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Hozirda yashash manzili*/}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Hozirda yashash manzili
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="current_address"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Hozirda yashash manzilini kiriting"
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
    </>
  );
};
