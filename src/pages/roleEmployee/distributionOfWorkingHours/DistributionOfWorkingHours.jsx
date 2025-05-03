import {
  DeleteOutlined,
  EditOutlined,
  FieldTimeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Select } from "antd";
import { Input } from "antd";
import { Image, Pagination } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useEffect } from "react";
import { useState } from "react";
import { imgUrl } from "service";
import CountUp from "react-countup";
import { Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { errorMasseg, successMasseg } from "utils/toastify";
import { Checkbox } from "antd";
import { TimePicker } from "antd";
import { Popover } from "antd";
import { Popconfirm } from "antd";
import { workingWekdayText } from "utils/role";
import { getTimeForm } from "utils/idCreate";
import dayjs from "dayjs";

export const DistributionOfWorkingHours = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [empolyeenumber, setempolyeenumber] = useState(0);
  const [editId, seteditId] = useState(-1);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [enterpriseId, setenterpriseId] = useState(null);

  const [checkboxDevice, setcheckboxDevice] = useState([]);
  const [checkboxDeviceAll, setcheckboxDeviceAll] = useState(false);

  // bu yerda pagenationni malumotlari bor
  const [currentPage2, setcurrentPage2] = useState(1);
  const [totalPages2, settotalPages2] = useState(1);

  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `work-time-planning/find/all?page=${currentPage}&limit=${pageSize}`,
  });

  const {
    data: { data: employeeAll },
    refetch: refetchEmployee,
    isLoading: employeeLoading,
  } = useGet({
    url: `work-time-planning/employee-all?page=${currentPage2}&limit=10&lang=uz${
      firstName ? `&first_name=${firstName}` : ""
    }${lastName ? `&last_name=${lastName}` : ""}${
      fatherName ? `&father_name=${fatherName}` : ""
    }${enterpriseId ? `&enterprise_id=${enterpriseId}` : ""}`,
  });

  // hamma tashkilotlar
  const {
    data: { data: organizationAll },
  } = useGet({
    url: "work-time-planning/enterprise-all",
  });

  const handleProvinceChange1 = (value) => {
    setcheckboxDevice([]);
    setcheckboxDeviceAll(false);
    setenterpriseId(value);
    setcurrentPage(1);
  };

  //   pagination onchange bulganda
  const onShowSizeChange = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };
  const onShowSizeChange2 = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };

  //   pagination onchange bulganda
  const onShowSizeChange22 = (current) => {
    setcurrentPage2(current);
  };

  useEffect(() => {
    if (data?.items) {
      setempolyeenumber(data?.meta?.totalItems);
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (data?.items) refetchEmployee();
  }, [currentPage, pageSize]);

  // xodimlar

  useEffect(() => {
    if (employeeAll?.items) {
      setcurrentPage2(employeeAll?.meta?.currentPage);
      settotalPages2(employeeAll?.meta?.totalPages);

      if (checkboxDeviceAll) {
        employeeAll?.items?.map((item) => {
          if (!checkboxDevice.includes(item?.id))
            setcheckboxDevice((arr) => [...arr, item?.id]);
        });
      }
    }
  }, [employeeAll]);

  useEffect(() => {
    if (employeeAll?.items) refetchEmployee();
  }, [currentPage2]);

  useEffect(() => {
    refetchEmployee();
  }, [enterpriseId]);

  //   modal
  const [openModal, setOpenModal] = useState(false);
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    seteditId(-1);
    setOpenModal(false);
    setcheckboxDevice([]);
    setcheckboxDeviceAll(false);
    resInput();
  };
  const { mutate, isLoading: loadingPostDate } = usePost();
  // form
  const { control, handleSubmit, reset } = useForm();
  //malumotni yuborish
  const onSubmit = (form) => {
    if (editId != -1) {
      mutate({
        url: "work-time-planning/change",
        method: "POST",
        data: {
          action: "edit",
          id: editId,
          start_time: getTimeForm(form?.start_time),
          end_time: getTimeForm(form?.end_time),
          work_time_plan: form?.work_time_plan,
          user_ids: checkboxDevice,
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
    } else {
      mutate({
        url: "work-time-planning/change",
        method: "POST",
        data: {
          action: "add",
          start_time: getTimeForm(form?.start_time),
          end_time: getTimeForm(form?.end_time),
          work_time_plan: form?.work_time_plan,
          user_ids: checkboxDevice,
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

  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      start_time: item?.start_time ? dayjs(item?.start_time, "HH:mm") : "",
      end_time: item?.end_time ? dayjs(item?.end_time, "HH:mm") : "",
      work_time_plan: item?.working_days,
    });
    setcheckboxDevice([item?.user?.id]);
    showModal();
  };

  //inputlani bushatish
  const resInput = () => {
    reset({
      start_time: dayjs("09:00", "HH:mm"),
      end_time: dayjs("18:00", "HH:mm"),
      work_time_plan: null,
    });
  };
  // hammasi
  const changeCheckboxDeviceAll = (check) => {
    if (check) {
      setcheckboxDevice(employeeAll?.items?.map((item) => item.id));
      setcheckboxDeviceAll(true);
    } else {
      setcheckboxDevice([]);
      setcheckboxDeviceAll(false);
    }
  };
  const changeCheckboxDevice = (id) => {
    setcheckboxDeviceAll(false);
    if (!checkboxDevice.includes(id)) setcheckboxDevice((arr) => [...arr, id]);
    else setcheckboxDevice((arr) => arr.filter((item) => item != id));
  };
  // malumotni uchirish
  const deleteConfirm = (id) => {
    mutate({
      url: `work-time-planning/change`,
      method: "POST",
      data: {
        action: "delete",
        id: id,
        start_time: "08:00",
        end_time: "08:00",
        work_time_plan: "days_5",
        user_ids: ["delete"],
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
  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={
          <>
            Ish soatini taqsimlash
            <span className="px-2 bg-green-50 border border-green-500 rounded w-max ml-2 text-green-800">
              <CountUp duration={3} end={empolyeenumber} separator="" />
            </span>
          </>
        }
        link1={"Ish soatini taqsimlash"}
        link2={""}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="grid grid-cols-1 gap-2 overflow-x-hidden">
          {/* Familiya */}
          {/* <Input
            placeholder="Familiya"
            value={lastName}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            size="small"
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          /> */}
          {/* Ism */}
          {/* <Input
            placeholder="Ism"
            value={firstName}
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            size="small"
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          /> */}
          {/* Otasining ismi */}
          {/* <Input
            placeholder="Otasining ismi"
            size="small"
            value={fatherName}
            onChange={(e) => {
              setfatherName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
          <Select
            value={enterpriseId}
            onChange={handleProvinceChange1}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={filterOption}
            className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
            size="large"
            placeholder="Tashkilotni tanlang"
          >
            <Select.Option value="">Hammasini ko'rish</Select.Option>
            {organizationAll?.map((e) => (
              <Select.Option key={e?.id} value={e?.id}>
                {e?.name}
              </Select.Option>
            ))}
          </Select> */}
          <button
            onClick={showModal}
            className="w-max ml-auto p-2 px-4 text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm"
          >
            <FieldTimeOutlined /> Ish vaqti qo'shish
          </button>
        </div>
        <div className="w-full h-max my-5 overflow-x-auto">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className=" w-8 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  T/r
                </th>
                <th className="w-20 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Rasm
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  F.I.O.
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Lavozimi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Tashkilot, Boshqarma, Bo‘lim
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Mehnat munosabatlari turi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Ish stavkasi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Haftadagi ish kunlari
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Ish boshlash soati
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Ish tugatish soati
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
                    <td className="tracking-normal w-10 leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Image
                        width={40}
                        height={40}
                        className="object-cover object-center rounded-sm overflow-hidden"
                        src={
                          e?.user?.file?.url_1
                            ? imgUrl + e?.user?.file?.url_1
                            : "https://www.w3schools.com/howto/img_avatar.png"
                        }
                      />
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.user?.full_name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.user_position?.map((j) => (
                        <span key={j?.id} className="mr-2">
                          {j?.position?.staff_full}
                        </span>
                      ))}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.department?.name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.user_position?.map((j) => (
                        <p
                          key={j?.category_staff?.id}
                          className="mr-2 w-max rounded-md py-1 px-2"
                          style={{
                            color: j?.category_staff?.color,
                            backgroundColor: j?.category_staff?.bg_color,
                          }}
                        >
                          {j?.category_staff?.name}
                        </p>
                      ))}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.user_position?.[0]?.rate} st
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {workingWekdayText(e?.working_days)}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.start_time}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.end_time}
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
            total={totalPages * pageSize}
            defaultPageSize={pageSize}
            pageSizeOptions={[10, 20, 40, 60, 80, 100]}
            showSizeChanger={true}
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange2}
            locale={{ items_per_page: "/ Sahifa" }}
          />
        </div>
      </div>
      <Modal
        title={"Ish soatini taqsimlash"}
        open={openModal}
        onOk={showModal}
        onCancel={handleCancel}
        width={900}
        zIndex={1050}
        footer={""}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5 mt-5"
        >
          <div className="grid grid-cols-3 gap-3 w-full max-md:grid-cols-1">
            {/* Haftada ish kunlari */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Haftadagi ish kunlari
                <sup className="text-red-600 text-lg relative top-[0px]">*</sup>
              </label>
              <Controller
                name="work_time_plan"
                control={control}
                rules={{ required: true }}
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
                    placeholder="Haftadagi ish kunlarini tanlang"
                  >
                    <Select.Option value="days_5">5 kunlik</Select.Option>
                    <Select.Option value="days_6">6 kunlik</Select.Option>
                    <Select.Option value="days_7">7 kunlik</Select.Option>
                  </Select>
                )}
              />
            </div>
            {/* soat dan*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Soatdan
                <sup className="text-red-600 text-lg relative top-[0px]">*</sup>
              </label>
              <Controller
                name="start_time"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TimePicker
                    {...field}
                    // value={dayjs("09:00", "HH:mm")}
                    format={"HH:mm"}
                    placeholder="--:--"
                    size="large"
                    className="block p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* soat gacha*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Soatgacha
                <sup className="text-red-600 text-lg relative top-[0px]">*</sup>
              </label>
              <Controller
                name="end_time"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TimePicker
                    {...field}
                    // defaultValue={dayjs("18:00", "HH:mm")}
                    format={"HH:mm"}
                    placeholder="--:--"
                    size="large"
                    className="block p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
          </div>
          {/* tashkilotlar */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Tashkilotni tanlang
              <sup className="text-red-600 text-lg relative top-[0px]">*</sup>
            </label>
            <Select
              value={enterpriseId}
              onChange={handleProvinceChange1}
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={filterOption}
              className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
              size="large"
              placeholder="Tashkilotni tanlang"
            >
              <Select.Option value="">Hammasini ko'rish</Select.Option>
              {organizationAll?.map((e) => (
                <Select.Option key={e?.id} value={e?.id}>
                  {e?.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-3 w-full max-md:grid-cols-1">
            {/* Familiya */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Familiya
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Input
                placeholder="Familiya"
                value={lastName}
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (currentPage2 == 1) refetchEmployee();
                    else setcurrentPage2(1);
                  }
                }}
                size="large"
                className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
              />
            </div>
            {/* Ism */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ism
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Input
                placeholder="Ism"
                value={firstName}
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (currentPage2 == 1) refetchEmployee();
                    else setcurrentPage2(1);
                  }
                }}
                size="large"
                className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
              />
            </div>
            {/* Otasining ismi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Otasining ismi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Input
                placeholder="Otasining ismi"
                size="large"
                value={fatherName}
                onChange={(e) => {
                  setfatherName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (currentPage2 == 1) refetchEmployee();
                    else setcurrentPage2(1);
                  }
                }}
                className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
              />
            </div>
          </div>
          {/* xodimlar */}
          <div className="border border-[var(--border-color)] p-2 rounded-md w-full">
            <p
              onClick={() => changeCheckboxDeviceAll(!checkboxDeviceAll)}
              className="text-[var(--textBlack-color)] text-sm border border-[var(--border-color)] rounded mt-1 py-1 px-3"
            >
              <Checkbox
                checked={checkboxDeviceAll}
                // onChange={(e) => changeCheckboxDeviceAll(e?.target?.checked)}
              ></Checkbox>
              <span className="ml-3">
                Barcha xodimlarni belgilash , Tanlangan xodimlar soni :{" "}
                <span className="bg-green-500 px-2 py-1 rounded text-white">
                  {checkboxDevice?.length}
                </span>
              </span>
            </p>
            {employeeLoading ? (
              <div className="w-full h-[360px] overflow-hidden flex items-center justify-center">
                <Loading />
              </div>
            ) : (
              employeeAll?.items?.map((e) => (
                <p
                  key={e?.id}
                  className={`cursor-pointer text-[var(--textBlack-color)] text-sm border border-[var(--borderWhite-color)] rounded mt-1 py-1 px-3 ${
                    checkboxDevice.includes(e?.id) ? "!border-[#2196f3]" : ""
                  }`}
                  onClick={() => {
                    changeCheckboxDevice(e?.id);
                  }}
                >
                  <Checkbox
                    checked={checkboxDevice.includes(e?.id)}
                    // onChange={() => {
                    //   changeCheckboxDevice(e?.id);
                    // }}
                  ></Checkbox>
                  <span className="ml-3">{e?.full_name}</span>
                </p>
              ))
            )}

            <div className="w-max mx-auto mt-2">
              <Pagination
                defaultCurrent={currentPage2}
                total={totalPages2 * 10}
                showSizeChanger={false}
                onChange={onShowSizeChange22}
              />
            </div>
          </div>
          <div className="w-full">
            <button
              disabled={loadingPostDate}
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
