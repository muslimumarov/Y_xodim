import {
  CaretDownOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Input } from "antd";
import { Select } from "antd";
import { errorMasseg, successMasseg } from "utils/toastify";
import { Popover } from "antd";
import { Switch } from "antd";
import { Popconfirm } from "antd";
import { organizationReturnText } from "utils/role";

export const Organization = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    data: { data: organization },
    isLoading,
    refetch,
  } = useGet({
    url: "enterprise/all/items",
  });
  const {
    data: { data: organizationAll },
    refetch: refechAll,
  } = useGet({
    url: "enterprise/find-all",
  });

  const { mutate, isLoading: loadingName } = usePost();
  const { control, handleSubmit, reset } = useForm();
  const [editId, seteditId] = useState(-1);
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
        url: "enterprise/update",
        method: "PUT",
        data: {
          id: editId,
          status: form.status,
          enterprise_id: form.enterprise_id,
          name: form.name_uz,
          is_cadry: form?.is_cadry,
        },
        onSuccess: () => {
          refetch();
          refechAll();
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
        url: "enterprise/create",
        method: "POST",
        data: {
          status: form.status,
          enterprise_id: form.enterprise_id,
          name: form.name_uz,
          is_cadry: form?.is_cadry,
        },
        onSuccess: () => {
          refetch();
          refechAll();
          handleCancel();
          successMasseg("Ma'lumot yangilandi!");
          resInput();
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
      url: `enterprise/delete/${id}`,
      method: "DELETE",
      onSuccess: () => {
        refetch();
        refechAll();
        successMasseg("Ma'lumot o'chirildi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      status: item.enterprise_status,
      enterprise_id: item.org_id,
      name_uz: item.name,
      is_cadry: item.is_cadry,
    });
    showModal();
  };
  //inputlani bushatish
  const resInput = () => {
    reset({
      status: null,
      enterprise_id: null,
      name_uz: null,
      is_cadry: false,
    });
  };
  //  bunda parent yoki birinchi array keladi
  const tableParent = (data) => {
    return data?.map((item, index) => {
      if (item?.items?.length > 0) {
        return tableChild(item);
      } else {
        return (
          <div key={index} className="px-6 relative">
            <div className="absolute top-[10px] left-0 h-[1px] w-6 bg-[var(--borderWhite-color)]"></div>
            <div className="flex w-full items-center justify-center border rounded-md border-solid border-[var(--borderWhite-color)] p-2 mt-3 ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]">
              <div className="w-[30%] flex items-center justify-start">
                <p className="text-sm font-normal text-[var(--textBlack-color)]">
                  {item?.name}
                </p>
              </div>
              <div className="w-[20%] flex items-center justify-start">
                <p className="text-sm font-normal text-[var(--textBlack-color)]">
                  {organizationReturnText(item?.enterprise_status)}
                </p>
              </div>
              <div className="w-[15%] flex items-center justify-start">
                <p className="text-sm font-normal text-[var(--textBlack-color)]">
                  {item?.create_at}
                </p>
              </div>
              <div className="w-[10%] flex items-center justify-end gap-10">
                <Switch
                  checkedChildren="Ochiq"
                  unCheckedChildren="Yopiq"
                  className="bg-red-600"
                  defaultChecked
                  onChange={() => {
                    // console.log(item.id);
                  }}
                />
              </div>
              <div className="w-[15%] flex items-center justify-end gap-10">
                <Switch
                  checked={item.is_cadry}
                  checkedChildren="Bor"
                  unCheckedChildren="Yo'q"
                  size="large"
                  className="bg-red-600"
                />
              </div>
              <div className="w-[10%] flex items-center justify-end">
                <Popover
                  placement="bottomRight"
                  content={
                    <div className="flex flex-col items-start justify-center">
                      <p
                        onClick={() => updateOrganizations(item)}
                        className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2"
                      >
                        <EditOutlined />
                        Tahrirlash
                      </p>
                      <Popconfirm
                        title="Ma'lumotni o'chirish"
                        description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                        placement="topRight"
                        onConfirm={() => deleteConfirm(item.id)}
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
                  <div className="text-xl flex items-center justify-center bg-[var(--textOpasity-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300 p-1  rounded-lg">
                    <MoreOutlined />
                  </div>
                </Popover>
              </div>
            </div>
          </div>
        );
      }
    });
  };
  //  bunda child yoki ichidagi obyekt keladi
  const tableChild = (item) => {
    return (
      <div className="px-6 mt-3 relative" key={item.id}>
        <div className="absolute top-[10px] left-0 h-[1px] w-6 bg-[var(--borderWhite-color)]"></div>
        <div className="flex w-full items-center justify-center border rounded-md border-solid border-[var(--borderWhite-color)] p-2 ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]">
          <div
            className="w-[30%] flex items-center justify-start text-[var(--textBlack-color)] cursor-pointer"
            onClick={() => {
              if (document.getElementById(item.id).style.display == "none") {
                document.getElementById(item.id).style.display = "block";
              } else {
                document.getElementById(item.id).style.display = "none";
              }
            }}
          >
            <span className="mr-2">
              <CaretDownOutlined />
            </span>
            <p className="text-sm font-normal text-[var(--textBlack-color)]">
              {item?.name}
            </p>
          </div>
          <div className="w-[20%] flex items-center justify-start">
            <p className="text-sm font-normal text-[var(--textBlack-color)]">
              {organizationReturnText(item?.enterprise_status)}
            </p>
          </div>
          <div className="w-[15%] flex items-center justify-start">
            <p className="text-sm font-normal text-[var(--textBlack-color)]">
              {item?.create_at}
            </p>
          </div>
          <div className="w-[10%] flex items-center justify-end gap-10">
            <Switch
              checkedChildren="Ochiq"
              unCheckedChildren="Yopiq"
              className="bg-red-600"
              defaultChecked
              onChange={() => {
                // console.log(item.id);
              }}
            />
          </div>
          <div className="w-[15%] flex items-center justify-end gap-10">
            <Switch
              checked={item.is_cadry}
              checkedChildren="Bor"
              unCheckedChildren="Yo'q"
              size="large"
              className="bg-red-600"
            />
          </div>
          <div className="w-[10%] flex items-center justify-end gap-10">
            <Popover
              placement="bottomRight"
              content={
                <div className="flex flex-col items-start justify-center">
                  <p
                    onClick={() => updateOrganizations(item)}
                    className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2"
                  >
                    <EditOutlined />
                    Tahrirlash
                  </p>
                  <Popconfirm
                    title="Ma'lumotni o'chirish"
                    description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                    placement="topRight"
                    onConfirm={() => deleteConfirm(item.id)}
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
              <div className="text-xl flex items-center justify-center bg-[var(--textOpasity-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300 p-1  rounded-lg">
                <MoreOutlined />
              </div>
            </Popover>
          </div>
        </div>
        <div id={item.id} style={{ display: "none" }}>
          <div
            style={{
              height: `${
                (item?.items?.length || 1) * 46 +
                (item?.items?.length || 1) * 12 +
                8
              }px`,
            }}
            className={`absolute top-1 left-6 w-[1px] bg-[var(--borderWhite-color)] `}
          ></div>
          {tableParent(item?.items)}
        </div>
      </div>
    );
  };
  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  if (isLoading) return <Loading />;

  return (
    <>
      <Breadcrumb link={"Tashkilot"} link1={"Tashkilot"} link2={""} />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="w-full flex justify-end  mb-6">
          <button
            onClick={showModal}
            type="button"
            className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          >
            Tashkilot qo'shish
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="flex flex-col border border-solid border-[var(--borderWhite-color)] rounded-md min-w-[1100px]">
            <div className="p-5 flex w-full items-center justify-center border-b border-solid border-[var(--borderWhite-color)]">
              <div className="w-[30%] flex items-center justify-start">
                <p className="text-sm font-medium text-[var(--textBlack-color)]">
                  Tashkilot nomi
                </p>
              </div>
              <div className="w-[20%] flex items-center justify-start">
                <p className="text-sm font-medium text-[var(--textBlack-color)]">
                  Tashkilot mavqei
                </p>
              </div>
              <div className="w-[15%] flex items-center justify-start">
                <p className="text-sm font-medium text-[var(--textBlack-color)]">
                  Tashkilot yaratilgan vaqti
                </p>
              </div>
              <div className="w-[10%] flex items-center justify-end">
                <p className="text-sm font-medium text-[var(--textBlack-color)]">
                  Tashkilot holati
                </p>
              </div>
              <div className="w-[15%] flex items-center justify-end">
                <p className="text-sm font-medium text-[var(--textBlack-color)]">
                  Tashkilotda kadrlar bormi
                </p>
              </div>
              <div className="w-[10%] flex items-center justify-end">
                <p className="text-sm font-medium text-[var(--textBlack-color)]">
                  Amallar
                </p>
              </div>
            </div>
            <div className="pb-2">{tableParent(organization)}</div>
          </div>
        </div>
        <Modal
          title="Tashkilot qo'shish"
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
                Tashkilot turini tanlang{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="status"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Tashkilot turini tanlang"
                  >
                    <Select.Option value="parent">
                      Yuqori turuvchi tashkilot
                    </Select.Option>
                    <Select.Option value="child">
                      Quyi turuvchi tashkilot
                    </Select.Option>
                  </Select>
                )}
              />
            </div>
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tarkibiga qo'shiladigan tashkilotni tanlang
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="enterprise_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Tarkibiga qo'shiladigan tashkilotni tanlang"
                  >
                    {organizationAll?.map((e) => (
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
                Tashkilotda kadrlar bormi?
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="is_cadry"
                defaultValue={false}
                control={control}
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
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tashkilot nomi{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="name_uz"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tashkilot nomi"
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
