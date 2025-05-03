import { DownloadOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";
import { Pagination, Popover } from "antd";
import { Modal } from "antd";
import { Image } from "antd";
import { Breadcrumb, Loading } from "components";
import { imgUrl } from "service";
import { useDownland, useGet } from "hooks";
import { useState } from "react";
import { useEffect } from "react";
import { EmployeSee } from "pages/roleEmployee/employeAction";
import { Select } from "antd";
import { useParams } from "react-router-dom";

export const EmployeeInformationNo = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [date, setdate] = useState("labor");
  const { getData } = useDownland();
  const { id } = useParams();

  const [enterpriseId, setenterpriseId] = useState(null);
  const [managementsId, setmanagementsId] = useState(null);
  const [departmentsId, setdepartmentsId] = useState(null);
  const [departmentsAll, setdepartmentsAll] = useState([]);

  const [selectGetData, setselectGetData] = useState(null);
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `home/${
      id == "aj" ? "role/" : ""
    }find-all-labor?page=${currentPage}&limit=${pageSize}${
      date ? `&type=${date}` : ""
    }${selectGetData ? `&enterprise_id=${selectGetData}` : ""}`,
  });
  useEffect(() => {
    if (data?.items) {
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, pageSize, date]);

  const [openModal, setOpenModal] = useState(false);
  const [seeEpmloye, setseeEpmloye] = useState(null);
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
  };
  // kurish modalini ochish
  const showSeeEpmloye = (id) => {
    showModal();
    setseeEpmloye(id);
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

  const handleProvinceChange = (value) => {
    setdate(value);
    setcurrentPage(1);
  };

  // hamma tashkilotlar
  const {
    data: { data: organizationAll },
  } = useGet({
    url: "role-employee/find-all/items",
  });
  // boshqarmani olish
  const {
    data: { data: managementsAll },
  } = useGet({
    url: `role-employee/find-all/managements/${enterpriseId}`,
    enabled: enterpriseId,
  });
  // bulimlarni olish
  const {
    data: { data: departmentsgetAll },
  } = useGet({
    url: `role-employee/find-all/departments/${managementsId}`,
    enabled: managementsId,
  });

  const handleProvinceChange1 = (value) => {
    setenterpriseId(value);
    setselectGetData(value);
    setdepartmentsId(null);
    setmanagementsId(null);
  };
  const handleProvinceChange2 = (value) => {
    if (value) {
      setselectGetData(value);
    } else {
      setselectGetData(enterpriseId);
    }
    setmanagementsId(value);

    setdepartmentsId(null);
  };
  const handleProvinceChange3 = (value) => {
    if (value) {
      setselectGetData(value);
    } else {
      setselectGetData(managementsId);
    }
    setdepartmentsId(value);
  };

  useEffect(() => {
    setdepartmentsAll(managementsAll?.departments);
  }, [managementsAll?.departments]);
  useEffect(() => {
    setdepartmentsAll(departmentsgetAll?.departments);
  }, [departmentsgetAll?.departments]);
  useEffect(() => {
    refetch();
  }, [enterpriseId, managementsId, departmentsId]);

  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={`Ma'lumoti to'liq kiritilmagan xodimlar ${
          id == "aj" ? "(AJ)" : ""
        }`}
        link1={"Bosh sahifa"}
        link2={`Ma'lumoti to'liq kiritilmagan xodimlar ${
          id == "aj" ? "(AJ)" : ""
        }`}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="grid grid-cols-4 gap-2 overflow-x-hidden ease-in duration-500 max-lg:w-full max-sm:grid-cols-2">
          {id == "aj" ? (
            <>
              {/* tashkilot */}
              <Select
                value={enterpriseId}
                onChange={handleProvinceChange1}
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={filterOption}
                className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                size="middle"
                placeholder="Tashkilotni tanlang"
              >
                <Select.Option value="">Hammasini ko'rish</Select.Option>
                {organizationAll?.map((e) => (
                  <Select.Option key={e?.id} value={e?.id}>
                    {e?.name}
                  </Select.Option>
                ))}
              </Select>
              {/* Boshqarma */}
              <Select
                value={managementsId}
                onChange={handleProvinceChange2}
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={filterOption}
                className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                size="middle"
                placeholder="Boshqarma tanlang"
              >
                <Select.Option value="">Hammasini ko'rish</Select.Option>
                {managementsAll?.managements?.map((e) => (
                  <Select.Option key={e?.id} value={e?.id}>
                    {e?.name}
                  </Select.Option>
                ))}
              </Select>
              {/* Bo'lim */}
              <Select
                value={departmentsId}
                onChange={handleProvinceChange3}
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={filterOption}
                className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                size="middle"
                placeholder="Bo'lim tanlang"
              >
                <Select.Option value="">Hammasini ko'rish</Select.Option>
                {departmentsAll?.map((e) => (
                  <Select.Option key={e?.id} value={e?.id}>
                    {e?.name}
                  </Select.Option>
                ))}
              </Select>
            </>
          ) : (
            <>
              <div></div>
              <div></div>
              <div></div>
            </>
          )}

          <Select
            value={date}
            onChange={handleProvinceChange}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={filterOption}
            className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
            placeholder="Ma'lumoti to'liq kiritilmagan xodimlarni tanlang"
          >
            <Select.Option value="labor">
              Mehnat faoliyati kiritilmagan xodimlar
            </Select.Option>
            <Select.Option value="relative">
              Yaqin qarindoshlari kiritilmagan xodimlar
            </Select.Option>
          </Select>
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
                  Tashkilot, Boshqarma, Bo‘lim
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Status
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
                          e?.file?.url_1
                            ? imgUrl + e?.file?.url_1
                            : "https://www.w3schools.com/howto/img_avatar.png"
                        }
                      />
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.full_name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.enterprise_name}
                    </td>
                    <td className="w-[360px] tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <p className="border border-red-500 bg-red-50 w-max px-2 py-1 rounded">
                        {date == "labor"
                          ? "Mehnat faoliyati kiritilmagan xodimlar"
                          : "Yaqin qarindoshlari kiritilmagan xodimlar"}
                      </p>
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Popover
                        placement="bottomRight"
                        content={
                          <div className="flex flex-col items-start justify-center">
                            <p
                              onClick={() => showSeeEpmloye(e?.id)}
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                            >
                              <EyeOutlined />
                              Ko'rish
                            </p>
                            <p
                              onClick={() =>
                                getData(`employee-edit/download/docx/${e?.id}`)
                              }
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                            >
                              <DownloadOutlined />
                              Yuklash
                            </p>
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
        closeIcon={null}
        open={openModal}
        onOk={showModal}
        width={1300}
        onCancel={handleCancel}
        style={{ top: "0", borderRadius: "0" }}
        className="modal-employesee"
        zIndex={1050}
        footer={""}
      >
        <EmployeSee seeEpmloye={seeEpmloye} handleCancel={handleCancel} />
      </Modal>
    </>
  );
};
