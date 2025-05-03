import { Image, Progress } from "antd";
import { Checkbox } from "antd";
import { Tooltip } from "antd";
import { Select } from "antd";
import { Input } from "antd";
import { Modal, Pagination } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { imgUrl } from "service";
import { infoMasseg, successMasseg } from "utils/toastify";

export const HikSynchronizationGuest = () => {
  const { mutate } = usePost();
  const navigate = useNavigate();
  //   divayslarni olish
  const {
    data: { data },
    isLoading,
  } = useGet({
    url: `hik-device/find/all`,
  });
  // barcha xodimlar

  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  //   backend bilan aloqa

  const [firstName, setfirstName] = useState("");
  const [divaceId, setdivaceId] = useState(null);
  // divace
  const [checkboxDevice, setcheckboxDevice] = useState([]);
  // employee
  const [checkboxEmployeeAll, setcheckboxEmployeeAll] = useState(false);
  const [checkboxEmployee, setcheckboxEmployee] = useState([]);
  const [dataAll, setdataAll] = useState(0);
  const [dataSucces, setdataSucces] = useState(0);
  const [dataSuccesAll, setdataSuccesAll] = useState([]);
  const [dataError, setdataError] = useState(0);
  const [dataErrorAll, setdataErrorAll] = useState([]);

  const [closeModal, setcloseModal] = useState(true);

  const {
    data: allEmployee,
    isLoading: isLoading1,
    refetch,
  } = useGet({
    url: `guest/find/all?page=${currentPage}&limit=${pageSize}${
      firstName ? `&full_name=${firstName}` : ""
    }${divaceId ? `&device_id=${divaceId}` : ""}`,
  });
  //   pagination onchange bulganda
  const onShowSizeChange = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };
  const onShowSizeChange2 = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };
  useEffect(() => {
    if (allEmployee?.items) {
      setcurrentPage(allEmployee?.meta?.currentPage);
      settotalPages(allEmployee?.meta?.totalPages);
      if (checkboxEmployeeAll) {
        allEmployee?.items?.map((item) => {
          if (!checkboxEmployee.includes(item?.id))
            setcheckboxEmployee((arr) => [...arr, item?.id]);
        });
      }
    }
  }, [allEmployee]);

  useEffect(() => {
    if (allEmployee?.items) refetch();
  }, [currentPage, divaceId, pageSize]);

  //   modal
  const [openModal, setOpenModal] = useState(false);
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    if (closeModal) {
      setOpenModal(false);
      setdataError(0);
      setdataSucces(0);
      setdataAll(0);
      setcheckboxDevice([]);
      setcheckboxEmployee([]);
      setdataSuccesAll([]);
      setdataErrorAll([]);
    }
  };
  // xodim qo'shish
  const onSubmit = () => {
    if (checkboxDevice?.length > 0 && checkboxEmployee?.length > 0) {
      func1(0);
      setcloseModal(false);
      showModal();
    }
  };

  const func1 = (dev) => {
    if (dev > checkboxDevice?.length - 1) {
      successMasseg("Xodimlar ma'lumotini yuklash yakunlandi");
      setcloseModal(true);
      // handleCancel();
    } else {
      func2(dev, 0);
    }
  };

  const func2 = (dev, emp) => {
    if (emp > checkboxEmployee?.length - 1) {
      func1(dev + 1);
    } else {
      func3(dev, emp);
    }
  };
  const func3 = (dev, emp) => {
    mutate({
      url: `hik-user/device-add-user`,
      method: "POST",
      data: {
        device_id: checkboxDevice[dev],
        user_id: checkboxEmployee[emp],
      },
      onSuccess: () => {
        let checkboxDeviceOne = checkboxDeviceReturnOne(checkboxDevice[dev]);
        let checkboxEmployeeOne = checkboxEmployeeReturnOne(
          checkboxEmployee[emp]
        );
        // const timoClear = setTimeout(() => {
        func2(dev, emp + 1);
        setdataSucces((num) => num + 1);
        setdataAll((num) => num + 1);
        setdataSuccesAll((data) => [
          ...data,
          { ...checkboxDeviceOne, ...checkboxEmployeeOne },
        ]);
        //   clearTimeout(timoClear);
        // }, 200);
      },
      onError: (err) => {
        console.log("no", err);
        let checkboxDeviceOne = checkboxDeviceReturnOne(checkboxDevice[dev]);
        let checkboxEmployeeOne = checkboxEmployeeReturnOne(
          checkboxEmployee[emp]
        );
        // setTimeout(() => {
        func2(dev, emp + 1);
        setdataError((num) => num + 1);
        setdataAll((num) => num + 1);
        setdataErrorAll((data) => [
          ...data,
          {
            ...checkboxDeviceOne,
            ...checkboxEmployeeOne,
            errorMessage: err?.response?.data?.data?.message,
          },
        ]);
        // }, 200);
      },
    });
  };

  const checkboxDeviceReturnOne = (id) => {
    return data?.filter((item) => item?.id == id)[0];
  };
  const checkboxEmployeeReturnOne = (id) => {
    return allEmployee?.items?.filter((item) => item?.id == id)[0];
  };

  const handleProvinceChange = (value) => {
    setdivaceId(value);
    setcurrentPage(1);
  };
  // hammasi
  const changeCheckboxDeviceAll = (check) => {
    if (check) {
      setcheckboxDevice(data?.map((item) => item.id));
    } else {
      setcheckboxDevice([]);
    }
  };
  const changeCheckboxDevice = (id) => {
    if (!checkboxDevice.includes(id)) setcheckboxDevice((arr) => [...arr, id]);
    else setcheckboxDevice((arr) => arr.filter((item) => item != id));
  };
  // hammasi
  const changeCheckboxEmployeeAll = (check) => {
    if (check) {
      setcheckboxEmployee(allEmployee?.items?.map((item) => item.id));
    } else {
      setcheckboxEmployee([]);
    }
  };
  const changeCheckboxEmployee = (id) => {
    setcheckboxEmployeeAll(false);
    if (!checkboxEmployee.includes(id))
      setcheckboxEmployee((arr) => [...arr, id]);
    else setcheckboxEmployee((arr) => arr.filter((item) => item != id));
  };
  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  useEffect(() => {
    const messageIn = setTimeout(() => {
      infoMasseg(
        "Xodimlarning ma'lumolarini qo'shish uchun kerakli qurilma va xodimni tanlang!"
      );
    }, 100);
    () => {
      return clearTimeout(messageIn);
    };
  }, []);
  if (isLoading && isLoading1) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Sinxronizatsiya (Mehmon) (HIK)"}
        link1={"Turniket"}
        link2={"Sinxronizatsiya (Mehmon) (HIK)"}
      />
      <div className="grid gap-8 grid-cols-8 items-start justify-center">
        {/* Устройства */}
        <div className="col-span-3 max-md:col-span-8 p-6 rounded-lg bg-[var(--bgWhite-color)]">
          <div className="w-full flex justify-end">
            <button
              onClick={onSubmit}
              type="button"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              Xodimlarni qo'shish
            </button>
          </div>
          <div className="w-full h-max my-5 overflow-x-auto">
            <table className="table w-full min-w-[500px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
              <thead className="table-header-group">
                <tr className="text-inherit table-row align-middle outline-0">
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    <Checkbox
                      onChange={(e) =>
                        changeCheckboxDeviceAll(e?.target?.checked)
                      }
                    ></Checkbox>
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    T/r
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Qurilma (HIK) ip
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Qurilma (HIK) nomi
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
                        <Checkbox
                          checked={checkboxDevice.includes(e?.id)}
                          onChange={() => {
                            changeCheckboxDevice(e?.id);
                          }}
                        ></Checkbox>
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {i + 1}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.device_ip}
                      </td>
                      <td
                        onClick={() => {
                          navigate(
                            `/admin/tourniquet/hik-device-employee-guest/${e?.id}`
                          );
                        }}
                        className="cursor-pointer tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0"
                      >
                        {e?.device_name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Сотрудники */}
        <div className="col-span-5 max-md:col-span-8 p-6 rounded-lg bg-[var(--bgWhite-color)]">
          <div className="grid grid-cols-3 gap-2 overflow-x-hidden">
            {/* F.I.O. */}
            <Input
              placeholder="F.I.O."
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
            />
            <Select
              value={divaceId}
              onChange={handleProvinceChange}
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={filterOption}
              className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
              size="middle"
              placeholder="Qurilmani tanlang"
            >
              <Select.Option value="">Hammasini ko'rish</Select.Option>
              {data?.map((e) => (
                <Select.Option key={e?.id} value={e?.id}>
                  {e?.device_name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="w-full h-max my-5 overflow-x-auto">
            <table className="table w-full min-w-[800px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
              <thead className="table-header-group">
                <tr className="text-inherit table-row align-middle outline-0">
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    <Checkbox
                      checked={checkboxEmployeeAll}
                      onChange={(e) => {
                        changeCheckboxEmployeeAll(e?.target?.checked);
                        setcheckboxEmployeeAll(e?.target?.checked);
                      }}
                    ></Checkbox>
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    T/r
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    ID
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
                </tr>
              </thead>
              <tbody className="table-row-group align-middle border-inherit">
                {allEmployee?.items?.map((e, i) => {
                  return (
                    <tr
                      className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                      key={i}
                    >
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        <Checkbox
                          checked={checkboxEmployee.includes(e?.id)}
                          onChange={() => {
                            changeCheckboxEmployee(e?.id);
                          }}
                        ></Checkbox>
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {(currentPage - 1) * pageSize + i + 1}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.card}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        <Image
                          width={40}
                          height={40}
                          className="object-cover object-center rounded-sm overflow-hidden"
                          src={
                            e?.file?.url_1
                              ? imgUrl + e?.file?.url_1
                              : "https://www.w3schools.com/howto/img_avatar.png"
                          }
                        />
                      </td>
                      <td className="cursor-pointer tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.full_name}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.job_name}
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
      </div>
      <Modal
        title=""
        open={openModal}
        onOk={showModal}
        onCancel={handleCancel}
        zIndex={1000}
        width={1100}
        footer={""}
      >
        <div className="flex items-center justify-around">
          <Progress
            type="circle"
            percent={Math.ceil(
              (dataAll * 100) /
                (checkboxDevice?.length * checkboxEmployee?.length)
            )}
            format={(percent) => `${percent}%`}
            strokeColor={"#0ebf0e"}
            strokeWidth={8}
            size={180}
            strokeLinecap="butt"
          />
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="">
            <p className="text-[var(--textBlack-color)] text-sm mb-2">
              Yuklangan ma'lumotlar soni
            </p>
            <div className="relative mb-5">
              <div className="rounded-full border border-green-500 p-1">
                <div
                  className="flex h-5 items-center justify-center rounded-full bg-green-300 text-xs leading-none transition duration-700 ease-in-out w-0"
                  style={{
                    width: `${Math.ceil(
                      (dataSucces * 100) /
                        (checkboxDevice?.length * checkboxEmployee?.length)
                    )}%`,
                  }}
                >
                  <span className="p-1 text-white">{dataSucces}</span>
                </div>
              </div>
            </div>
            <div className="h-max max-h-[500px] overflow-y-auto">
              <table className="table w-full border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
                <thead className="table-header-group">
                  <tr className="text-inherit table-row align-middle outline-0">
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      T/r
                    </th>
                    <th className="w-20 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Rasm
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      F.I.O.
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Qurilma (HIK) nomi
                    </th>
                  </tr>
                </thead>
                <tbody className="table-row-group align-middle border-inherit">
                  {dataSuccesAll?.map((e, i) => {
                    return (
                      <tr
                        className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                        key={i}
                      >
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {i + 1}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <Image
                            width={40}
                            height={40}
                            className="object-cover object-center rounded-sm overflow-hidden"
                            src={
                              e?.file?.url_1
                                ? imgUrl + e?.file?.url_1
                                : "https://www.w3schools.com/howto/img_avatar.png"
                            }
                          />
                        </td>
                        <td className="cursor-pointer tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.full_name}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.device_name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="">
            <p className="text-[var(--textBlack-color)] text-sm mb-2 text-end">
              Yuklanmagan ma'lumotlar soni
            </p>
            <div className="relative mb-5">
              <div className="rounded-full border border-red-500 p-1">
                <div
                  className="flex h-5 items-center justify-center rounded-full bg-red-300 text-xs leading-none transition duration-700 ease-in-out w-0"
                  style={{
                    width: `${Math.ceil(
                      (dataError * 100) /
                        (checkboxDevice?.length * checkboxEmployee?.length)
                    )}%`,
                  }}
                >
                  <span className="p-1 text-white">{dataError}</span>
                </div>
              </div>
            </div>
            <div className="h-max max-h-[500px] overflow-y-auto">
              <table className="table w-full border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
                <thead className="table-header-group">
                  <tr className="text-inherit table-row align-middle outline-0">
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      T/r
                    </th>
                    <th className="w-20 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Rasm
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      F.I.O.
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Qurilma (HIK) nomi
                    </th>
                  </tr>
                </thead>
                <tbody className="table-row-group align-middle border-inherit">
                  {dataErrorAll?.map((e, i) => {
                    return (
                      <tr
                        className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                        key={i}
                      >
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {i + 1}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <Image
                            width={40}
                            height={40}
                            className="object-cover object-center rounded-sm overflow-hidden"
                            src={
                              e?.file?.url_1
                                ? imgUrl + e?.file?.url_1
                                : "https://www.w3schools.com/howto/img_avatar.png"
                            }
                          />
                        </td>
                        <td className="cursor-pointer tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <Tooltip title={e?.errorMessage || "Xatolik"}>
                            {e?.full_name}
                          </Tooltip>
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.device_name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
