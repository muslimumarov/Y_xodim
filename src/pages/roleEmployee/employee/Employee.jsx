import {
  AppstoreFilled,
  AppstoreOutlined,
  ArrowDownOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  ClearOutlined,
  CrownOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  FileExcelOutlined,
  FileSearchOutlined,
  LoadingOutlined,
  MedicineBoxOutlined,
  MoreOutlined,
  PicCenterOutlined,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { Popover } from "antd";
import { Input } from "antd";
import { Image } from "antd";
import { Pagination } from "antd";
import {
  Breadcrumb,
  DownlandModal,
  EmployeMidical,
  EmployeVacation,
  Loading,
} from "components";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, imgUrl } from "service";
import { EmployeSee } from "../employeAction";
import { Select } from "antd";
import { errorMasseg, successMasseg } from "utils/toastify";
import CountUp from "react-countup";
import { Checkbox } from "antd";
import { Spin } from "antd";
import { Popconfirm } from "antd";
import { Badge } from "antd";

export const Employee = () => {
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
  // checkbox
  const [checkboxEmployeeAll, setcheckboxEmployeeAll] = useState(false);
  const [checkboxEmployee, setcheckboxEmployee] = useState([]);
  const [checkboxsee, setcheckboxsee] = useState(false);
  const changeCheckboxEmployee = (id) => {
    setcheckboxEmployeeAll(false);
    if (!checkboxEmployee.includes(id))
      setcheckboxEmployee((arr) => [...arr, id]);
    else setcheckboxEmployee((arr) => arr.filter((item) => item != id));
  };
  // hammasi
  const changeCheckboxEmployeeAll = (check) => {
    if (check) {
      setcheckboxEmployee(data?.items?.map((item) => item.id));
    } else {
      setcheckboxEmployee([]);
    }
  };
  // checkboxni kurish
  const changecheckboxEmployee = () => {
    if (checkboxsee) {
      setcheckboxsee(false);
      setcheckboxEmployeeAll(false);
      setcheckboxEmployee([]);
    } else {
      setcheckboxsee(true);
    }
  };
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(
    localStorage.getItem("currentPage") ?? 1
  );
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(
    localStorage.getItem("pageSize") ?? 10
  );
  const inputsRef = useRef(null);
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [empolyeenumber, setempolyeenumber] = useState(0);
  const [role_user, setrole_user] = useState();
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `employee/find/all?page=${currentPage}&limit=${pageSize}&lang=uz${
      firstName ? `&first_name=${firstName}` : ""
    }${lastName ? `&last_name=${lastName}` : ""}${
      fatherName ? `&father_name=${fatherName}` : ""
    }${role_user ? `&role_user=${role_user}` : ""}${
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
  //   pagination onchange bulganda
  const onShowSizeChange = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
    localStorage.setItem("currentPage", current);
    localStorage.setItem("pageSize", pageSize);
  };
  const onShowSizeChange2 = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };

  useEffect(() => {
    if (data?.items) {
      setempolyeenumber(data?.meta?.totalItems);
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
      if (checkboxEmployeeAll) {
        data?.items?.map((item) => {
          if (!checkboxEmployee.includes(item?.id))
            setcheckboxEmployee((arr) => [...arr, item?.id]);
        });
      }
    }
  }, [data]);

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, pageSize, role_user]);
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
  const [inputref, setinputref] = useState(true);
  //   click bulganda inputla ichiladi va yopiladi
  const inputsRefChange = () => {
    if (inputsRef.current.offsetWidth > 0) {
      inputsRef.current.style.maxWidth = "0px";
      setinputref(false);
    } else {
      inputsRef.current.style.maxWidth = `724px`;
      setinputref(true);
    }
  };
  // kurish modalini ochish
  const showSeeEpmloye = (id) => {
    showModal();
    setseeEpmloye(id);
  };
  // dargen drop
  const { mutate, isLoading: loadingFile } = usePost();
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const dragStart = (e) => {
    dragItem.current = e.target.id;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };
  const dragEnter = (e) => {
    e.currentTarget.parentNode.style.border = "2px solid var(--text-color)";
    e.currentTarget.parentNode.style.opacity = "0";
    dragOverItem.current = e.currentTarget.id;
  };
  const dragLeave = (e) => {
    if (e.currentTarget.id !== dragOverItem.current) {
      e.currentTarget.parentNode.style.border = "0px solid var(--text-color)";
      e.currentTarget.parentNode.style.opacity = "1";
    }
  };
  const drop = () => {
    const copyListItem = [...data?.items];
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
      url: `employee/employee-sort`,
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
  // xodimga tibbiy kurik qo'shish\
  const [epmloyeMedicalId, setepmloyeMedicalId] = useState(null);
  // xodimga tatil qo'shish\
  const [epmloyeEmployeVacationId, setepmloyeEmployeVacationId] =
    useState(null);
  // input selectlani filterlash
  //   modal
  const [openModal2, setOpenModal2] = useState(false);
  // modalni ochish
  const showModal2 = () => {
    setOpenModal2(true);
  };
  // modalni yopish
  const handleCancel2 = () => {
    setOpenModal2(false);
  };
  const [arraySortDownland, setarraySortDownland] = useState([]);
  const [downlandSort, setdownlandSort] = useState([
    ["inn", "Soliq INN"],
    ["pinfl", "JSHSHIR"],
    ["birth_date", "Tug'ilgan yili"],
    ["full_name", "F.I.O."],
    ["gender", "Jinsi"],
    ["nationality_id", "Millati"],
    ["phone_number", "Telefon raqami"],
    ["marital_status_id", "Oilaviy ahvol"],
    ["citizen_state_id", "Xodimni fuqaroligi"],
    ["user_state_id", "Tug'ilgan davlati"],
    ["user_region_id", "Tug'ilgan viloyati"],
    ["user_district_id", "Tug'ilgan tumani(Shahar)"],
    ["user_live_state_id", "Xodimni yashash davlati"],
    ["user_live_region_id", "Xodimni yashash Viloyati"],
    ["user_live_district_id", "Xodimni yashash Tumani"],
    ["user_live_address", "Xodimni yashash manzili"],
    ["pasport_seria_number", "Pasport seria va raqami"],
    ["pasport_given", "Pasport kim tomonidan berilgan"],
    ["pasport_date", "Pasport berilgan sanasi"],
    ["pasport_date_end", "Pasport amal qilish sanasi"],
    ["user_education_id", "Xodimni ma'lumoti"],
    ["languages", "Xodimni til bilishlari"],
    ["militar_rank", "Harbiy unvoni"],
    ["elected_body", "Saylangan organlarga a'zoligi"],
    ["user_academic_degree_id", "Ilmiy darajasi"],
    ["user_parties_id", "Partiyaviyligi"],
    ["user_academictitlies_id", "Ilmiy unvoni"],
    ["first_position_date", "Birinchi lavozim sanasi (O'TY staj)"],
    ["enterprise_id", "Tashkilot"],
    ["employee_position", "Lavozimi"],
  ]);
  function exportSelectData() {
    mutate({
      url: `downloads/select-download-excel`,
      method: "POST",
      data: {
        contents: arraySortDownland,
      },
      onSuccess: () => {
        navigate("/employe/employee/employee/file-downland");
        // successMasseg("Ma'lumot yangilandi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  }

  const deleteEmploye = (id) => {
    api
      .get(`employee/delete-employee-by-id/${id}`, {})
      .then(() => {
        refetch();
      })
      .catch(() => {});
  };

  const startEmploye = (id) => {
    api
      .get(`employee/boss/${id}`, {})
      .then(() => {
        refetch();
      })
      .catch(() => {});
  };

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
        <div className="flex justify-between items-center mb-6 max-lg:flex-col max-lg:items-start">
          {/* ismalar buyicha qidirish */}
          <div className="flex items-center justify-start">
            <button
              onClick={inputsRefChange}
              className="w-max p-2 px-4 text-[var(--text-color)] rounded text-center text-3xl"
            >
              {inputref ? <AppstoreFilled /> : <AppstoreOutlined />}
            </button>
            <div
              ref={inputsRef}
              className="grid grid-cols-4 gap-2 overflow-x-hidden ease-in duration-500"
            >
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
                size="small"
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
                size="small"
                className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
              />
              {/* Otasining ismi */}
              <Input
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
              {/* Lavozim */}
              <Select
                value={role_user}
                onChange={(e) => setrole_user(e)}
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={filterOption}
                className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] max-w-[180px]"
                placeholder="Mehnat munosabatlari turi"
              >
                <Select.Option value="">Hammasini ko'rish</Select.Option>
                <Select.Option value="ROLE_CIVIL">Fuqaroviy</Select.Option>
              </Select>
            </div>
          </div>
          {/* yuklash va filter */}
          <div className="flex items-center justify-end gap-5 max-md:flex-wrap">
            {/* saralash */}
            <Popover
              placement={"bottomRight"}
              content={
                <div className="flex flex-col items-start justify-center w-[650px] p-2 max-md:w-[450px] max-sm:w-[300px]">
                  <p className="text-[var(--textBlack-color)] text-sm">
                    Qo'shimcha saralash sozlamalari
                  </p>
                  {/* Bo'lim,Tashkilot,Boshqarma tanlang */}
                  <div className="w-full mt-3">
                    <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                      Bo'lim,Tashkilot,Boshqarma tanlang
                    </label>
                    <Select
                      value={null}
                      showSearch
                      allowClear
                      onChange={(e) => {
                        // field.onChange(e);
                        // setstaff(e);
                        // setValue2("position_id", null, {
                        //   shouldValidate: true,
                        //   shouldDirty: true,
                        // });
                      }}
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="middle"
                      placeholder="Bo'lim,Tashkilot,Boshqarma tanlang"
                    >
                      {[]?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  {/* Lavozimni tanlang */}
                  <div className="w-full mt-3">
                    <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                      Lavozimni tanlang
                    </label>
                    <Select
                      value={null}
                      showSearch
                      allowClear
                      // loading={staffLoading}
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="middle"
                      placeholder="Lavozimni tanlang"
                    >
                      {[]?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.staff_full}
                        </Select.Option>
                      ))}
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3 items-center max-md:grid-cols-1 w-full">
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
                className="w-max p-2 px-4 text-white bg-[#1b273c] rounded flex gap-2 items-center justify-center  text-sm"
              >
                <FileSearchOutlined />
                Saralash
              </button>
            </Popover>
            {/* yuklash */}
            <div className="w-max text-white bg-[var(--border-color)] rounded flex gap-2 items-center justify-center text-sm cursor-pointer">
              <Popover
                placement="bottomRight"
                content={
                  <div className="flex flex-col items-start justify-center">
                    <p
                      onClick={showModal2}
                      className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                    >
                      <CheckSquareOutlined />
                      Yuklash
                    </p>
                    {/* <p
                      onClick={changecheckboxEmployee}
                      className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                    >
                      <CheckSquareOutlined />
                      Tanlash orqali yuklash
                    </p> */}
                    <p
                      onClick={showModal2}
                      className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                    >
                      <FileExcelOutlined />
                      Excelda yuklash
                    </p>
                    <p
                      onClick={() => {
                        navigate("/employe/employee/employee/file-downland");
                      }}
                      className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                    >
                      <DownloadOutlined />
                      Yuklangan fayllar
                    </p>
                    <DownlandModal
                      link={`employee-edit/excel/age3_12`}
                      text={
                        <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2">
                          <DownloadOutlined />
                          3-12 yoshgacha farzandlar
                        </p>
                      }
                    />
                    <DownlandModal
                      link={`employee-edit/excel/age7_14`}
                      text={
                        <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2">
                          <DownloadOutlined />
                          7-14 yoshgacha farzandlar
                        </p>
                      }
                    />
                    <DownlandModal
                      link={`employee-edit/excel/age7`}
                      text={
                        <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2">
                          <DownloadOutlined />7 yoshdagi farzandlar
                        </p>
                      }
                    />
                  </div>
                }
                trigger="click"
              >
                <div className="w-max p-2 px-4 text-white bg-[var(--bordertext-color)] rounded flex gap-2 items-center justify-center  text-sm">
                  <DownloadOutlined />
                  Yuklash
                </div>
              </Popover>
            </div>
            {/* xodim qo'shish */}
            <div className="w-max text-white bg-[var(--text-color)] rounded flex items-center justify-center text-sm cursor-pointer">
              <Popover
                placement="bottomRight"
                content={
                  <div className="flex flex-col items-start justify-center">
                    <p
                      onClick={() => navigate("/employe/employee/employee-add")}
                      className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                    >
                      <PlusOutlined />
                      Asosiy shartnoma
                    </p>
                    <p
                      onClick={() =>
                        navigate("/employe/employee/employee-add-civil-legal")
                      }
                      className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                    >
                      <PlusOutlined />
                      Fuqaroviy huquqiy shartnoma
                    </p>
                  </div>
                }
                trigger="click"
              >
                <div className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm">
                  <PlusOutlined />
                  Xodim qo’shish
                </div>
              </Popover>
            </div>
          </div>
        </div>
        {checkboxsee && (
          <div className="text-[var(--textBlack-color)] text-sm font-semibold">
            Tanlangan xodimlar soni:
            <span className="px-2 bg-green-50 border border-green-500 rounded w-max ml-2 text-green-800">
              {checkboxEmployee?.length || 0}
            </span>
          </div>
        )}
        <div className="w-full h-max my-5 overflow-auto max-h-[calc(100vh-400px)] max-lg:max-h-max">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className=" w-8 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  <PicCenterOutlined />
                </th>
                {checkboxsee && (
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    <Checkbox
                      checked={checkboxEmployeeAll}
                      onChange={(e) => {
                        changeCheckboxEmployeeAll(e?.target?.checked);
                        setcheckboxEmployeeAll(e?.target?.checked);
                      }}
                    ></Checkbox>
                  </th>
                )}
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
                    <td
                      draggable
                      onDragStart={(e) => dragStart(e)}
                      onDragEnter={(e) => dragEnter(e)}
                      onDragLeave={(e) => dragLeave(e)}
                      onDragEnd={drop}
                      id={i}
                      className="tracking-normal cursor-move w-10 leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0"
                    >
                      <UnorderedListOutlined />
                    </td>
                    {checkboxsee && (
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        <Checkbox
                          checked={checkboxEmployee.includes(e?.id)}
                          onChange={() => {
                            changeCheckboxEmployee(e?.id);
                          }}
                        ></Checkbox>
                      </td>
                    )}
                    <td className="tracking-normal w-10 leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <div className="w-max h-max relative">
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
                        {e?.is_boss ? (
                          <span className="absolute bottom-0 -right-2 z-20 border border-[var(--text-color)] text-[var(--text-color)] bg-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                            <StarFilled />
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                    <td
                      onClick={() => {
                        if (e?.role == "ROLE_CIVIL") {
                          navigate(
                            `/employe/employee/employee-edit-civil-legal/${e?.id}`
                          );
                        } else {
                          navigate(`/employe/employee/employee-edit/${e?.id}`);
                        }
                      }}
                      className="cursor-pointer tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0"
                    >
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
                      {e?.role == "ROLE_CIVIL" && (
                        <p className="text-sm text-white bg-blue-700 w-max rounded-md py-1 px-2">
                          Fuqaroviy
                        </p>
                      )}
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
                              onClick={() => {
                                if (e?.role == "ROLE_CIVIL") {
                                  navigate(
                                    `/employe/employee/employee-edit-civil-legal/${e?.id}`
                                  );
                                } else {
                                  navigate(
                                    `/employe/employee/employee-edit/${e?.id}`
                                  );
                                }
                              }}
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2"
                            >
                              <EditOutlined />
                              Tahrirlash
                            </p>
                            <p
                              onClick={() => {
                                if (e?.role != "ROLE_CIVIL") {
                                  setepmloyeEmployeVacationId(e?.id);
                                }
                              }}
                              className={`${
                                e?.role == "ROLE_CIVIL" ? "opacity-50" : ""
                              } text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2`}
                            >
                              <CalendarOutlined />
                              Ta'til
                            </p>
                            <p
                              onClick={() => {
                                if (e?.role != "ROLE_CIVIL") {
                                  setepmloyeMedicalId(e?.id);
                                }
                              }}
                              className={`${
                                e?.role == "ROLE_CIVIL" ? "opacity-50" : ""
                              } text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2`}
                            >
                              <MedicineBoxOutlined />
                              Tibbiy ko'rik
                            </p>
                            {e?.role != "ROLE_CIVIL" ? (
                              <DownlandModal
                                link={`employee-edit/download/docx/${e?.id}`}
                                text={
                                  <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2">
                                    <DownloadOutlined />
                                    Yuklash
                                  </p>
                                }
                              />
                            ) : (
                              <p className="opacity-50 text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2">
                                <DownloadOutlined />
                                Yuklash
                              </p>
                            )}
                            <Popconfirm
                              title="Ma'lumotni o'chirish"
                              description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                              placement="topRight"
                              onConfirm={() => deleteEmploye(e?.id)}
                              onCancel={() => {}}
                              okText="Ha"
                              cancelText="Yo'q"
                            >
                              <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2">
                                <DeleteOutlined />
                                Xodimni o'chirish
                              </p>
                            </Popconfirm>
                            <p
                              onClick={() => {
                                startEmploye(e?.id);
                              }}
                              className={`text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-start gap-2`}
                            >
                              <CrownOutlined />
                              Rahbar
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
      <EmployeMidical
        epmloyeMedicalId={epmloyeMedicalId}
        setepmloyeMedicalId={setepmloyeMedicalId}
        employe={true}
      />
      <EmployeVacation
        epmloyeEmployeVacationId={epmloyeEmployeVacationId}
        setepmloyeEmployeVacationId={setepmloyeEmployeVacationId}
        employe={true}
      />
      <Modal
        title="Yuklanadigan ma'lumot turlarini tanlang!"
        open={openModal2}
        onOk={showModal2}
        onCancel={handleCancel2}
        zIndex={1050}
        width={1200}
        footer={""}
      >
        <div className="grid grid-cols-3 gap-3 mt-8">
          {downlandSort?.map((arr, i) => (
            <div key={i} className="flex items-center justify-start gap-2 mt-1">
              <Checkbox
                checked={arraySortDownland?.some((obj) => obj.key == arr?.[0])}
                onChange={() => {
                  if (arraySortDownland?.some((obj) => obj.key == arr?.[0])) {
                    setarraySortDownland((obj) => {
                      let thisObj = obj.find((k) => k.key == arr?.[0]);
                      return obj
                        ?.filter((e) => e.key != arr?.[0])
                        .map((p) => {
                          if (p?.sort > thisObj?.sort) {
                            return {
                              sort: p?.sort - 1,
                              key: p?.key,
                            };
                          } else {
                            return p;
                          }
                        });
                    });
                  } else {
                    setarraySortDownland((data) => [
                      ...data,
                      {
                        sort: data.length + 1,
                        key: arr[0],
                      },
                    ]);
                  }
                }}
              >
                <p className="text-base text-[var(--textBlack-color)]">
                  {arr?.[1]}
                </p>
              </Checkbox>
              <p className="text-base text-[var(--text-color)]">
                {arraySortDownland?.find((obj) => obj.key == arr?.[0])?.sort ||
                  ""}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={exportSelectData}
          disabled={loadingFile}
          type="button"
          className="w-max min-w-[200px] p-2 px-8 text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm mt-10 mx-auto"
        >
          {loadingFile ? (
            <Spin indicator={<LoadingOutlined style={{ color: "#fff" }} />} />
          ) : (
            <>
              <ArrowDownOutlined />
              Xodim ma'lumotlarini yuklash
            </>
          )}
        </button>
      </Modal>
    </>
  );
};
