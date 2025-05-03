import {
  CheckCircleOutlined,
  ClearOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  EditOutlined,
  LoginOutlined,
  LogoutOutlined,
  MoreOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Popover } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { Popconfirm } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "service";
import { errorMasseg, successMasseg } from "utils/toastify";

export const HikDevice = () => {
  const [editId, seteditId] = useState(-1);
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `hik-device/find/all`,
  });

  //   categoriyalarni olish
  const {
    data: { data: category },
  } = useGet({
    url: `hik-category/find/all`,
  });
  // tashkilotlarni olish
  const {
    data: { data: organizationAll },
  } = useGet({
    url: "enterprise/find-all",
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
        url: "hik-device/change",
        method: "POST",
        data: {
          action: "edit",
          id: editId,
          category_id: form.category_id,
          device_name: form.device_name,
          enterprise_id: form.enterprise_id,
          device_ip: form.device_ip,
          device_port: parseInt(form.device_port),
          device_user: form.device_user,
          device_password: form.device_password,
          device_type: form.device_type,
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
        url: "hik-device/change",
        method: "POST",
        data: {
          action: "add",
          category_id: form.category_id,
          device_name: form.device_name,
          enterprise_id: form.enterprise_id,
          device_ip: form.device_ip,
          device_port: parseInt(form.device_port),
          device_user: form.device_user,
          device_password: form.device_password,
          device_type: form.device_type,
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
      url: `hik-device/change`,
      method: "POST",
      data: {
        id: id,
        action: "delete",
        category_id: "delete",
        device_name: "delete",
        enterprise_id: "delete",
        device_ip: "delete",
        device_port: "delete",
        device_user: "delete",
        device_password: "delete",
        device_type: "one",
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
      category_id: null,
      device_name: null,
      enterprise_id: null,
      device_ip: null,
      device_port: null,
      device_user: null,
      device_password: null,
      device_type: null,
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      category_id: item?.category?.id,
      device_name: item?.device_name,
      enterprise_id: item?.enterprise?.id,
      device_ip: item?.device_ip,
      device_port: item?.device_port,
      device_user: item?.device_user,
      device_password: item?.device_password,
      device_type: item?.device_type == 1 ? "one" : "two",
    });
    showModal();
  };

  // connect
  const hikConnect = (id) => {
    api
      .get(`hik-device/connect/${id}`)
      .then((res) => {
        refetch();
        console.log(res);
        successMasseg("Ma'lumot yangilandi!");
      })
      .catch(() => {
        errorMasseg("Xatolik?");
      });
  };
  // Disconnect
  const hikDisconnect = (id) => {
    api
      .get(`hik-device/disconnect/${id}`)
      .then(() => {
        refetch();
        successMasseg("Ma'lumot yangilandi!");
      })
      .catch(() => {
        errorMasseg("Xatolik?");
      });
  };
  // status
  const hikStatus = (id) => {
    api
      .get(`hik-device/status/${id}`)
      .then(() => {
        refetch();
        successMasseg("Ma'lumot yangilandi!");
      })
      .catch(() => {
        errorMasseg("Xatolik?");
      });
  };
  // clear
  const hikClear = (id) => {
    api
      .get(`hik-device/clear/${id}`)
      .then(() => {
        refetch();
        successMasseg("Ma'lumot yangilandi!");
      })
      .catch(() => {
        errorMasseg("Xatolik?");
      });
  };

  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Qurilma (HIK)"}
        link1={"Turniket"}
        link2={"Qurilma (HIK)"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="w-full flex justify-end  mb-6">
          <button
            onClick={showModal}
            type="button"
            className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          >
            Qurilma (HIK) qo'shish
          </button>
        </div>
        <div className="w-full h-max my-5 overflow-x-auto">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  T/r
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Tashkilot (Korxona) nomi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Qurilmalar guruhi nomi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Qurilma (HIK) nomi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Qurilma (HIK) ip
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Qurilma (HIK) porti
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Qurilma (HIK) logini
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Qurilma (HIK) paroli
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Qurilma (HIK) status
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Qurilma (HIK) type
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
                      {e?.enterprise?.name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.category?.category_name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.device_name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.device_ip}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.device_port}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.device_user}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.device_password}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.device_status ? (
                        <p className="bg-green-500 px-2 py-1 rounded-md w-max text-white font-semibold">
                          Yoqilgan
                        </p>
                      ) : (
                        <p className="bg-red-500 px-2 py-1 rounded-md w-max text-white font-semibold">
                          O'chirilgan
                        </p>
                      )}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.device_type == 1 ? (
                        <div className="border border-green-500 w-max py-1 px-2 pl-7 rounded-md relative ml-4">
                          <p className="bg-green-500 rounded-full w-8 h-8 text-lg flex items-center justify-center text-white absolute top-[50%] left-[-1rem] translate-y-[-50%]">
                            <LoginOutlined />
                          </p>
                          <p>Kirish</p>
                        </div>
                      ) : (
                        <div className="border border-red-500 w-max py-1 px-2 pl-7 rounded-md relative ml-4">
                          <p className="bg-red-500 rounded-full w-8 h-8 text-lg flex items-center justify-center text-white absolute top-[50%] left-[-1rem] translate-y-[-50%]">
                            <LogoutOutlined />
                          </p>
                          <p>Chiqish</p>
                        </div>
                      )}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Popover
                        placement="bottomRight"
                        content={
                          <div className="flex flex-col items-start justify-center">
                            <p
                              onClick={() => hikConnect(e?.id)}
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                            >
                              <CheckCircleOutlined />
                              Connect
                            </p>
                            <p
                              onClick={() => hikDisconnect(e?.id)}
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                            >
                              <DisconnectOutlined />
                              Disconnect
                            </p>
                            <p
                              onClick={() => hikStatus(e?.id)}
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                            >
                              <SwapOutlined />
                              Status
                            </p>
                            <p
                              onClick={() => hikClear(e?.id)}
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                            >
                              <ClearOutlined />
                              Clear
                            </p>
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
        <Modal
          title="Qurilma (HIK) qo'shish"
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
            {/* Qurilmalar guruhi  */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qurilmalar guruhi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="category_id"
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
                    placeholder="Qurilmalar guruhini tanlang"
                  >
                    {category?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.category_name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Tashkilot (Korxona) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tashkilot (Korxona)ni tanlang
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
                    placeholder="Tashkilot (Korxona)ni tanlang"
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
            {/* Device  */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qurilma (HIK) nomi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="device_name"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Qurilma (HIK) nomi"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Device ip */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qurilma (HIK) ip
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="device_ip"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Qurilma (HIK) ip"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Device porti */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qurilma (HIK) porti
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="device_port"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Qurilma (HIK) porti"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Device logini */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qurilma (HIK) logini
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="device_user"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Qurilma (HIK) logini"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Device paroli */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qurilma (HIK) paroli
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="device_password"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Qurilma (HIK) paroli"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Devise type  */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qurilma (HIK) type
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="device_type"
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
                    placeholder="Qurilma (HIK) typeni tanlang"
                  >
                    <Select.Option value={"one"}>Kirish</Select.Option>
                    <Select.Option value={"two"}>Chiqish</Select.Option>
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
