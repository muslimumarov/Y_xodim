import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Modal, Pagination } from "antd";
import { Popover } from "antd";
import { Input } from "antd";
import { Popconfirm } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { errorMasseg, successMasseg } from "utils/toastify";

export const CassificationGroupAj = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [editId, seteditId] = useState(-1);

  const [groupname, setgroupname] = useState("");
  const [groupcode, setgroupcode] = useState("");
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `my-classification/find/all-groups?page=${currentPage}${
      groupname ? `&name=${groupname}` : ""
    }${groupcode ? `&code=${groupcode}` : ""}`,
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
  }, [currentPage]);

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
        url: "my-classification/group-action",
        method: "POST",
        data: {
          action: "edit",
          id: editId,
          name: form.name,
          code: form.code,
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
        url: "my-classification/group-action",
        method: "POST",
        data: {
          action: "add",
          name: form.name,
          code: form.code,
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
      url: `my-classification/group-action`,
      method: "POST",
      data: {
        action: "delete",
        id: id,
        name: "Delete",
        code: "Delete",
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
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      name: item.name,
      code: item.code,
    });
    showModal();
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Klassfikator (AJ) guruh yaratish"}
        link1={"Klassfikator (AJ)"}
        link2={"Klassfikator (AJ) guruh yaratish"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="flex items-center justify-end mb-6 gap-6">
          {/* Klassfikator (AJ) guruh nomi */}
          <Input
            placeholder="Klassfikator (AJ) guruh nomi"
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
            placeholder="Klassfikator (AJ) guruh kodi"
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
          <div className="w-max flex justify-end ">
            <button
              onClick={showModal}
              type="button"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              Klassfikator (AJ) guruh qo'shish
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
                  Klassfikator (AJ) guruhni nomi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Klassfikator (AJ) guruhni kodi
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
          title="Klassfikator (AJ) guruh qo'shish"
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
                Klassfikator (AJ) guruh nomi{" "}
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
                    placeholder="Klassfikator (AJ) guruh nomi"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Klassfikator (AJ) guruh kodi
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
                    placeholder="Klassfikator (AJ) guruh kodi"
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
