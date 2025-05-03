import {
  ClearOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileSearchOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Popover } from "antd";
import { Input } from "antd";
import { Image } from "antd";
import { Pagination } from "antd";
import { Breadcrumb, DownlandModal, Loading } from "components";
import { useGet } from "hooks";
import { useState } from "react";
import { useEffect } from "react";
import { imgUrl } from "service";
import { EmployeSee } from "pages/roleEmployee/employeAction";
import { Select } from "antd";
import CountUp from "react-countup";

export const EmployeeSuper = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [selectGetData, setselectGetData] = useState(null);
  const [enterpriseId, setenterpriseId] = useState(null);
  const [managementsId, setmanagementsId] = useState(null);
  const [departmentsId, setdepartmentsId] = useState(null);
  const [departmentsAll, setdepartmentsAll] = useState([]);
  const [empolyeenumber, setempolyeenumber] = useState(0);

  // filter---------------------------------------------------------
  //  xodimlarni hamma Ma'lumotini olish
  const {
    data: { data: employeeAll },
  } = useGet({
    url: `employee/create?lang=uz`,
  });
  // tugilgan davlat idsini saqlash
  const [stateBornValue, setstateBornValue] = useState(null);
  //   Tug'ilgan viloyati olish
  const [regionStateBorn, setregionStateBorn] = useState(null);
  // tugilgan viloyat idsini saqlash
  const [regionStateBornValue, setregionStateBornValue] = useState(null);
  const {
    data: { data: region },
    isLoading: regionLoading,
  } = useGet({
    url: `employee/filter/region/${regionStateBorn}?lang=uz`,
    enabled: regionStateBorn,
  });
  //   Tug'ilgan tumani(Shahar) olish
  const [districtStateBorn, setdistrictStateBorn] = useState(null);
  // tugilgan tumani(Shahar) idsini saqlash
  const [districtStateBornValue, setdistrictStateBornValue] = useState(null);
  const {
    data: { data: district },
    isLoading: districtLoading,
  } = useGet({
    url: `employee/filter/district/${districtStateBorn}?lang=uz`,
    enabled: districtStateBorn,
  });
  // yashash davlat idsini saqlash
  const [stateLiveValue, setstateLiveValue] = useState(null);
  //   Yashayotgan viloyati olish
  const [regionStateLive, setregionStateLive] = useState(null);
  // tugilgan tumani(Shahar) idsini saqlash
  const [regionStateLiveValue, setregionStateLiveValue] = useState(null);
  const {
    data: { data: regionLive },
    isLoading: regionliveLoading,
  } = useGet({
    url: `employee/filter/region/${regionStateLive}?lang=uz`,
    enabled: regionStateLive,
  });
  //  Yashash tumani(Shahar) olish
  const [districtStateLive, setdistrictStateLive] = useState(null);
  // yashah tumani(Shahar) idsini saqlash
  const [districtStateLiveValue, setdistrictStateLiveValue] = useState(null);
  const {
    data: { data: districtLive },
    isLoading: districtliveLoading,
  } = useGet({
    url: `employee/filter/district/${districtStateLive}?lang=uz`,
    enabled: districtStateLive,
  });
  // malumoti
  const [educationsId, seteducationsId] = useState(null);
  // jinsi
  const [genderId, setgenderId] = useState(null);
  // yosh
  const [start_age, setstart_age] = useState(null);
  const [end_age, setend_age] = useState(null);
  const clearfilter = () => {
    setstateBornValue(null);
    setregionStateBorn(null);
    setregionStateBornValue(null);
    setdistrictStateBorn(null);
    setdistrictStateBornValue(null);
    setstateLiveValue(null);
    setregionStateLive(null);
    setregionStateLiveValue(null);
    setdistrictStateLive(null);
    setdistrictStateLiveValue(null);
    setgenderId(null);
    setstart_age(null);
    setend_age(null);
    // refetch();
  };
  // filter---------------------------------------------------------
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `role-employee/find/all?page=${currentPage}&limit=${pageSize}&lang=uz${
      firstName ? `&first_name=${firstName}` : ""
    }${lastName ? `&last_name=${lastName}` : ""}${
      fatherName ? `&father_name=${fatherName}` : ""
    }${selectGetData ? `&enterprise_id=${selectGetData}` : ""}${
      stateBornValue ? `&user_state_id=${stateBornValue}` : ""
    }${regionStateBornValue ? `&user_region_id=${regionStateBornValue}` : ""}${
      districtStateBornValue
        ? `&user_district_id=${districtStateBornValue}`
        : ""
    }${stateLiveValue ? `&user_live_state_id=${stateLiveValue}` : ""}${
      regionStateLiveValue ? `&user_live_region_id=${regionStateLiveValue}` : ""
    }${
      districtStateLiveValue
        ? `&user_live_district_id=${districtStateLiveValue}`
        : ""
    }${educationsId ? `&user_education_id=${educationsId}` : ""}${
      genderId ? `&gender=${genderId}` : ""
    }${start_age ? `&start_age=${start_age}` : ""}${
      end_age ? `&end_age=${end_age}` : ""
    }`,
  });
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
  //   pagination onchange bulganda
  const onShowSizeChange = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };
  const onShowSizeChange2 = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };
  const handleProvinceChange1 = (value) => {
    setenterpriseId(value);
    setselectGetData(value);
    setcurrentPage(1);
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
    setcurrentPage(1);
    setdepartmentsId(null);
  };
  const handleProvinceChange3 = (value) => {
    if (value) {
      setselectGetData(value);
    } else {
      setselectGetData(managementsId);
    }
    setdepartmentsId(value);
    setcurrentPage(1);
  };
  useEffect(() => {
    if (data?.items) {
      setempolyeenumber(data?.meta?.totalItems);
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);
  useEffect(() => {
    setdepartmentsAll(managementsAll?.departments);
  }, [managementsAll?.departments]);
  useEffect(() => {
    setdepartmentsAll(departmentsgetAll?.departments);
  }, [departmentsgetAll?.departments]);

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, pageSize, enterpriseId, managementsId, departmentsId]);
  // const { mutate } = usePost();
  //   modal
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
            Xodimlar
            <span className="px-2 bg-green-50 border border-green-500 rounded w-max ml-2 text-green-800">
              <CountUp duration={2} end={empolyeenumber} separator="" />
            </span>
          </>
        }
        link1={"Xodimlar"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="flex items-start justify-between gap-5 max-sm:gap-2 max-lg:flex-col">
          {/* ismalar buyicha qidirish */}
          <div className="grid grid-cols-3 gap-2 overflow-x-hidden ease-in duration-500 max-w-7xl w-[70%] max-lg:w-full max-sm:grid-cols-2">
            {/* Familiya */}
            <Input
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
              size="middle"
              className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
            />
            {/* Ism */}
            <Input
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
              size="middle"
              className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
            />
            {/* Otasining ismi */}
            <Input
              placeholder="Otasining ismi"
              size="middle"
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
          </div>
          <div className="w-[30%] flex items-start justify-end gap-5 max-sm:gap-2  max-lg:w-full">
            {/* saralash */}
            <Popover
              placement="bottomRight"
              content={
                <div className="flex flex-col items-start justify-center w-[650px] max-md:w-80 p-2 max-sm:w-64">
                  <p className="text-[var(--textBlack-color)] text-sm">
                    Qo'shimcha saralash sozlamalari
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-3 items-center max-md:grid-cols-1">
                    {/* Tug'ilgan davlati */}
                    <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Tug'ilgan davlati
                      </label>
                      <Select
                        value={stateBornValue}
                        showSearch
                        allowClear
                        onChange={(e) => {
                          setstateBornValue(e);
                          setregionStateBorn(e);
                          setregionStateBornValue(null);
                          setdistrictStateBornValue(null);
                        }}
                        optionFilterProp="children"
                        filterOption={filterOption}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        size="middle"
                        placeholder="Davlatini tanlang"
                      >
                        {employeeAll?.states?.map((e) => (
                          <Select.Option key={e?.id} value={e?.id}>
                            {e?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    {/* Tug'ilgan viloyati */}
                    <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Tug'ilgan viloyati
                      </label>
                      <Select
                        value={regionStateBornValue}
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        filterOption={filterOption}
                        onChange={(e) => {
                          setregionStateBornValue(e);
                          setdistrictStateBorn(e);
                        }}
                        loading={regionLoading}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        size="middle"
                        placeholder="Viloyatini tanlang"
                      >
                        {region?.map((e) => (
                          <Select.Option key={e?.id} value={e?.id}>
                            {e?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    {/* Tug'ilgan tumani(Shahar)*/}
                    <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Tug'ilgan tumani(Shahar)
                      </label>
                      <Select
                        value={districtStateBornValue}
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        filterOption={filterOption}
                        onChange={(e) => {
                          setdistrictStateBornValue(e);
                        }}
                        loading={districtLoading}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        size="middle"
                        placeholder="Tumanini tanlang"
                      >
                        {district?.map((e) => (
                          <Select.Option key={e?.id} value={e?.id}>
                            {e?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    {/* Yashash davlati */}
                    <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Yashash davlati
                      </label>
                      <Select
                        value={stateLiveValue}
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        filterOption={filterOption}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        onChange={(e) => {
                          setstateLiveValue(e);
                          setregionStateLive(e);
                          setregionStateLiveValue(null);
                          setdistrictStateLiveValue(null);
                        }}
                        size="middle"
                        placeholder="Yashash davlatini tanlang"
                      >
                        {employeeAll?.states?.map((e) => (
                          <Select.Option key={e?.id} value={e?.id}>
                            {e?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    {/* Yashash viloyati */}
                    <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Yashash viloyati
                      </label>
                      <Select
                        value={regionStateLiveValue}
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        filterOption={filterOption}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        onChange={(e) => {
                          setregionStateLiveValue(e);
                          setdistrictStateLive(e);
                          setdistrictStateLiveValue(null);
                        }}
                        loading={regionliveLoading}
                        size="middle"
                        placeholder="Yashash viloyatini tanlang"
                      >
                        {regionLive?.map((e) => (
                          <Select.Option key={e?.id} value={e?.id}>
                            {e?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    {/* Yashash tumani*/}
                    <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Yashash tumani
                      </label>
                      <Select
                        value={districtStateLiveValue}
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        onChange={(e) => {
                          setdistrictStateLiveValue(e);
                        }}
                        filterOption={filterOption}
                        loading={districtliveLoading}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        size="middle"
                        placeholder="Yashash tumanini tanlang"
                      >
                        {districtLive?.map((e) => (
                          <Select.Option key={e?.id} value={e?.id}>
                            {e?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    {/* Ma'lumoti*/}
                    <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Ma'lumoti
                      </label>
                      <Select
                        value={educationsId}
                        onChange={(e) => {
                          seteducationsId(e);
                        }}
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        filterOption={filterOption}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        size="middle"
                        placeholder="Ma'lumotini tanlang"
                      >
                        {employeeAll?.educations?.map((e) => (
                          <Select.Option key={e?.id} value={e?.id}>
                            {e?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    {/* Ta'til turi*/}
                    <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Ta'til turi
                      </label>
                      <Select
                        value={null}
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        filterOption={filterOption}
                        // loading={districtliveLoading}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        size="middle"
                        placeholder="Ta'til turini tanlang"
                      >
                        {[]?.map((e) => (
                          <Select.Option key={e?.id} value={e?.id}>
                            {e?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    {/* Mehnat munosabatlari turi*/}
                    <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Mehnat munosabatlari turi
                      </label>
                      <Select
                        value={null}
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        filterOption={filterOption}
                        // loading={districtliveLoading}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        size="middle"
                        placeholder="Mehnat munosabatlari turini tanlang"
                      >
                        {[]?.map((e) => (
                          <Select.Option key={e?.id} value={e?.id}>
                            {e?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                    {/* Jinsi */}
                    <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Jinsi
                      </label>
                      <Select
                        value={genderId}
                        onChange={(e) => {
                          setgenderId(e);
                        }}
                        showSearch
                        allowClear
                        optionFilterProp="children"
                        filterOption={filterOption}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        size="middle"
                        placeholder="Jinsini tanlang"
                      >
                        <Select.Option value="male">Erkak</Select.Option>
                        <Select.Option value="woman">Ayol</Select.Option>
                      </Select>
                    </div>
                    {/* yosh tanlash */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="w-full">
                        <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                          Yosh oralig'i
                        </label>
                        <Input
                          placeholder="0"
                          value={start_age}
                          onChange={(e) => {
                            setstart_age(e.target.value);
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
                      </div>
                      <div className="w-full">
                        <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                          <span className="font-semibold ml-2">
                            {start_age || 0}-{end_age || 0}
                          </span>
                        </label>
                        <Input
                          placeholder="0"
                          value={end_age}
                          onChange={(e) => {
                            setend_age(e.target.value);
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
                      </div>
                    </div>
                    {/* yosh tanlash */}
                    {/* <div className="w-full">
                      <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        Yosh oralig'i
                        <span className="font-semibold ml-2">
                          {start_age || 1}-{end_age || 99}
                        </span>
                      </label>
                      <Slider
                        value={[start_age || 1, end_age || 99]}
                        range
                        min={1}
                        max={100}
                        onChange={(e) => {
                          setstart_age(e[0]);
                          setend_age(e[1]);
                        }}
                      />
                    </div> */}
                    <div className="w-full h-full flex items-end justify-end gap-3">
                      <button
                        type="button"
                        onClick={clearfilter}
                        className="w-max p-1 px-2 text-white bg-red-500 rounded flex gap-2 items-center justify-center  text-sm"
                      >
                        <ClearOutlined />
                        Tozalash
                      </button>
                      <button
                        onClick={() => {
                          if (currentPage == 1) refetch();
                          else setcurrentPage(1);
                        }}
                        type="button"
                        className="w-max p-1 px-2 text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm"
                      >
                        <SearchOutlined />
                        Izlash
                      </button>
                    </div>
                  </div>
                </div>
              }
              trigger="click"
            >
              <button
                type="button"
                className="w-max p-2 px-4 text-white bg-[#1b273c] rounded flex gap-2 items-center justify-center text-sm min-w-[128px] max-sm:min-w-min max-sm:w-full"
              >
                <FileSearchOutlined />
                Saralash
              </button>
            </Popover>
            <button
              type="button"
              className="w-max p-2 px-4 text-white bg-[var(--border-color)] rounded flex gap-2 items-center justify-center text-sm min-w-[128px] max-sm:min-w-min max-sm:w-full"
            >
              <DownloadOutlined />
              Yuklash
            </button>
          </div>
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
                            <DownlandModal
                              link={`employee-edit/download/docx/${e?.id}`}
                              text={
                                <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2">
                                  <DownloadOutlined />
                                  Yuklash
                                </p>
                              }
                            />
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
