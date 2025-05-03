import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Modal, Pagination } from "antd";
import { Select } from "antd";
import { Popover } from "antd";
import { Input } from "antd";
import { Popconfirm } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { errorMasseg, successMasseg } from "utils/toastify";

export const ClassificationAddAj = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [editId, seteditId] = useState(-1);

  const [groupname, setgroupname] = useState("");
  const [groupcode, setgroupcode] = useState("");
  const [group_id, setgroup_id] = useState(null);
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `my-classification/find/all-items?page=${currentPage}${
      groupname ? `&name=${groupname}` : ""
    }${groupcode ? `&code=${groupcode}` : ""}${
      group_id ? `&group_id=${group_id}` : ""
    }`,
  });

  // gruh all
  const {
    data: { data: dataGroupAll },
  } = useGet({
    url: `my-classification/find-group/all`,
  });
  const { mutate, isLoading: loadingName } = usePost();
  useEffect(() => {
    if (data?.items) {
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, group_id]);

  //   pagination onchange bulganda
  const onShowSizeChange = (current) => {
    setcurrentPage(current);
  };
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
        url: "my-classification/item-action",
        method: "POST",
        data: {
          action: "edit",
          id: editId,
          name: form.name,
          code: form.code,
          group_id: form.group_id,
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
        url: "my-classification/item-action",
        method: "POST",
        data: {
          action: "add",
          name: form.name,
          code: form.code,
          group_id: form.group_id,
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
      url: `my-classification/item-action`,
      method: "POST",
      data: {
        action: "delete",
        id: id,
        name: "Delete",
        code: "Delete",
        group_id: "Delete",
      },
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
      name: null,
      code: null,
      group_id: null,
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      name: item.name,
      code: item.code,
      group_id: item.group_id,
    });
    showModal();
  };

  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Klassfikator (AJ) qo'shish"}
        link1={"Klassfikator"}
        link2={"Klassfikator (AJ) qo'shish"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="flex items-center justify-end mb-6 gap-6">
          {/* Klassfikator (AJ) guruh nomi */}
          <Input
            placeholder="Klassfikator (AJ) nomi"
            value={groupname}
            onChange={(e) => {
              setgroupname(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            size="small"
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[200px]"
          />
          {/* Klassfikator (AJ) guruh kodi */}
          <Input
            placeholder="Klassfikator (AJ) kodi"
            value={groupcode}
            onChange={(e) => {
              setgroupcode(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            size="small"
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[200px]"
          />
          <Select
            value={group_id}
            onChange={(e) => setgroup_id(e)}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={filterOption}
            className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[200px]"
            placeholder="Klassfikator (AJ) guruh nomi"
          >
            {dataGroupAll?.map((e) => (
              <Select.Option key={e?.id} value={e?.id}>
                {e?.name}
              </Select.Option>
            ))}
          </Select>
          <div className="w-max flex justify-end ">
            <button
              onClick={showModal}
              type="button"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              Klassfikator (AJ) qo'shish
            </button>
          </div>
        </div>
        <div className="w-full h-max my-5 overflow-x-auto">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  #
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Klassfikator (AJ) nomi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Klassfikator (AJ) kodi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Gruhlar nomi
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
                      {i + 1}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.code}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.group?.name}
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
        <div className="w-max mx-auto">
          <Pagination
            defaultCurrent={currentPage}
            total={totalPages * 10}
            showSizeChanger={false}
            onChange={onShowSizeChange}
          />
        </div>
        <Modal
          title="Klassfikator (AJ) qo'shish"
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
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Klassfikator (AJ) guruhni tanlang
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="group_id"
                control={control}
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
                    placeholder="Klassfikator (AJ) guruhni tanlang"
                  >
                    {dataGroupAll?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Klassfikator (AJ) nomi{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="name"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Klassfikator (AJ) nomi"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Klassfikator (AJ) kodi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="code"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Klassfikator (AJ) kodi"
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
