import { Select } from "antd";
import { DatePicker } from "antd";
import { UploadOneImg } from "components/uploadOneImg";
import { useGet, usePost } from "hooks";
import { Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  AppstoreAddOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UngroupOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import { getDateForm } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";
import { api } from "service";
import { Loading } from "components";
import { Switch } from "antd";
import { Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

export const EmployeePersonalInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //   shaxsiy malumotlrni olib kelish
  const {
    data: { data },
    refetch,
    isLoading,
  } = useGet({
    url: `employee-edit/view/${id}`,
  });
  // boshash sababi
  const {
    data: { data: ReasonsForDismissal },
  } = useGet({
    url: `reasons-for-dismissal/find/all`,
  });
  //   Tug'ilgan viloyati olish
  const [regionStateBorn, setregionStateBorn] = useState(false);
  const {
    data: { data: region },
    isLoading: regionLoading,
  } = useGet({
    url: `employee/filter/region/${regionStateBorn}?lang=uz`,
    enabled: regionStateBorn,
  });
  //   Tug'ilgan tumani(Shahar) olish
  const [districtStateBorn, setdistrictStateBorn] = useState(false);
  const {
    data: { data: district },
    isLoading: districtLoading,
  } = useGet({
    url: `employee/filter/district/${districtStateBorn}?lang=uz`,
    enabled: districtStateBorn,
  });
  //   Yashayotgan viloyati olish
  const [regionStateLive, setregionStateLive] = useState(false);
  const {
    data: { data: regionLive },
    isLoading: regionliveLoading,
  } = useGet({
    url: `employee/filter/region/${regionStateLive}?lang=uz`,
    enabled: regionStateLive,
  });
  //  Yashash tumani(Shahar) olish
  const [districtStateLive, setdistrictStateLive] = useState(false);
  const {
    data: { data: districtLive },
    isLoading: districtliveLoading,
  } = useGet({
    url: `employee/filter/district/${districtStateLive}?lang=uz`,
    enabled: districtStateLive,
  });
  //   passport berilgan viloyati olish
  const [regionStatepasport, setregionStatepasport] = useState(false);
  const {
    data: { data: regionpasport },
    isLoading: regionpasportLoading,
  } = useGet({
    url: `employee/filter/region/${regionStatepasport}?lang=uz`,
    enabled: regionStatepasport,
  });
  //   passport berilgan tumani(Shahar) olish
  const [districtStatepasport, setdistrictStatepasport] = useState(false);
  const {
    data: { data: districtpasport },
    isLoading: districtpasportLoading,
  } = useGet({
    url: `employee/filter/district/${districtStatepasport}?lang=uz`,
    enabled: districtStatepasport,
  });
  // form
  // -------------------- form
  const { mutate } = usePost();
  const { control, handleSubmit, reset, setValue } = useForm();
  const [imgs, setimgs] = useState();
  const onSubmit = (form) => {
    let data = {
      employee_data: {
        employee_id: id,
        file_id: imgs?.id,
        inn: form?.inn,
        pinfl: form?.pinfl,
        birth_date: getDateForm(form?.birth_date),
        last_name: form?.last_name,
        first_name: form?.first_name,
        father_name: form?.father_name,
        gender: form?.gender,
        nationality_id: form?.nationality_id,
        marital_status_id: form?.marital_status_id,
        phone_number: form?.phone_number,
        work_phone_number: form?.work_phone_number,
        citizen_state_id: form?.citizen_state_id,
      },
      employee_live_data: {
        state_id: form?.state_id,
        region_id: form?.region_id,
        district_id: form?.district_id,
        live_state_id: form?.live_state_id,
        live_region_id: form?.live_region_id,
        live_district_id: form?.live_district_id,
        user_live_address: form?.user_live_address,
      },
      pasport_data: {
        pasport_seria_number: form?.pasport_seria_number,
        pasport_state_id: form?.pasport_state_id,
        pasport_region_id: form?.pasport_region_id,
        pasport_district_id: form?.pasport_district_id,
        pasport_date: getDateForm(form?.pasport_date),
        pasport_date_end: getDateForm(form?.pasport_date_end),
      },
      position_data: {
        first_position_date: getDateForm(form?.first_position_date),
        specialty_start_date: getDateForm(form?.specialty_start_date),
        case_number: form?.case_number,
        table_number: form?.table_number,
      },
    };
    mutate({
      url: `employee-edit/save`,
      method: "POST",
      data: data,
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot yangilandi !");
      },
      onError: () => {
        errorMasseg("Xatolik ?");
      },
    });
  };
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    setValue: setValue2,
  } = useForm();
  const {
    control: control3,
    handleSubmit: handleSubmit3,
    setValue: setValue3,
  } = useForm();
  const [editdepartments, seteditdepartments] = useState([]);
  const [editcategory_staff, seteditcategory_staff] = useState([]);
  const [employee_position_id, setemployee_position_id] = useState(null);
  const onSubmit2 = (form) => {
    let data = {
      employee_id: id,
      employee_position_id: employee_position_id,
      order_number: form?.order_number,
      order_date: form?.order_date ? getDateForm(form?.order_date) : "",
      contract_date: form?.contract_date
        ? getDateForm(form?.contract_date)
        : "",
      contract_number: form?.contract_number,
      start_date: form?.start_date ? getDateForm(form?.start_date) : "",
      department_id: form?.department_id,
      position_id: form?.position_id,
      category_staff_id: form?.category_staff_id,
      rate: form?.rate,
      is_main: form?.is_main,
    };
    mutate({
      url: `employee-edit/position-employee/save`,
      method: "POST",
      data: data,
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot yangilandi !");
        handleCancel2();
        setemployee_position_id(null);
      },
      onError: () => {
        errorMasseg("Xatolik ?");
      },
    });
  };
  const [openModal2, setopenModal2] = useState(false);
  const [openModal3, setopenModal3] = useState(false);
  //   Bulim orqali lavozimni olish
  const [staff, setstaff] = useState(false);
  const {
    data: { data: staffData },
    isLoading: staffLoading,
  } = useGet({
    url: `employee/filter/staff/${staff}?lang=uz`,
    enabled: staff,
  });
  // modalni ochish
  const [isloadingPosition, setisloadingPosition] = useState(false);
  const showModal2 = (id1, id2) => {
    setisloadingPosition(true);
    setemployee_position_id(id2);
    api
      .get(`employee-edit/employee-position/${id1}/${id2}`)
      .then((res) => {
        setisloadingPosition(false);
        seteditdepartments(res?.data?.data?.departments);
        seteditcategory_staff(res?.data?.data?.category_staff);
        setstaff(res?.data?.data?.employee_position?.department_id);
        reset2({
          order_number: res?.data?.data?.employee_position?.order_number,
          order_date: res?.data?.data?.employee_position?.order_date
            ? dayjs(res?.data?.data?.employee_position?.order_date)
            : "",
          contract_number: res?.data?.data?.employee_position?.contract_number,
          department_id: res?.data?.data?.employee_position?.department_id,
          position_id: res?.data?.data?.employee_position?.position_id,
          category_staff_id:
            res?.data?.data?.employee_position?.category_staff_id,
          start_date: res?.data?.data?.employee_position?.start_date
            ? dayjs(res?.data?.data?.employee_position?.start_date)
            : "",
          contract_date: res?.data?.data?.employee_position?.contract_date
            ? dayjs(res?.data?.data?.employee_position?.contract_date)
            : "",
          rate: res?.data?.data?.employee_position?.rate,
          is_main: res?.data?.data?.employee_position?.is_main || false,
        });
      })
      .catch(() => {
        setisloadingPosition(false);
      });
    setopenModal2(true);
  };
  const showModal3 = () => {
    setopenModal3(true);
  };
  // modalni yopish
  const handleCancel2 = () => {
    setopenModal2(false);
    setemployee_position_id(null);
  };
  // modalni yopish
  const handleCancel3 = () => {
    setopenModal3(false);
    setemployee_position_id(null);
  };
  const [isloadingPosition3, setisloadingPosition3] = useState(false);
  const onSubmit3 = (form) => {
    setisloadingPosition3(true);
    let data = {
      employee_id: id,
      employee_position_id: employee_position_id,
      order_number: form?.order_number,
      order_date: form?.order_date ? getDateForm(form?.order_date) : "",
      contract_date: form?.contract_date
        ? getDateForm(form?.contract_date)
        : "",
      contract_number: form?.contract_number,
      start_date: form?.start_date ? getDateForm(form?.start_date) : "",
      department_id: form?.department_id,
      position_id: form?.position_id,
      category_staff_id: form?.category_staff_id,
      rate: form?.rate,
      first_position_date: form?.first_position_date
        ? getDateForm(form?.first_position_date)
        : "",

      case_number: form?.case_number,
      table_number: form?.table_number,
      // is_main: form?.is_main,
      is_main: false,
    };
    mutate({
      url: `employee-edit/position-add/${id}`,
      method: "PUT",
      data: data,
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot yangilandi !");
        handleCancel3();
        setemployee_position_id(null);
        setisloadingPosition3(false);
      },
      onError: () => {
        errorMasseg("Xatolik ?");
        setisloadingPosition3(false);
      },
    });
  };
  useEffect(() => {
    if (data) {
      // tugilgan vloyatni olish
      setregionStateBorn(data?.employee?.user_state_id);
      // tugilgan tumanni olish
      setdistrictStateBorn(data?.employee?.user_region_id);
      // yashash viloyat olish
      setregionStateLive(data?.employee?.user_live_state_id);
      // yashashtumani olish
      setdistrictStateLive(data?.employee?.user_live_region_id);
      // passport viloyatni olish
      setregionStatepasport(data?.employee?.pasport_state_id);
      // passport tumanni olish
      setdistrictStatepasport(data?.employee?.pasport_region_id);
      reset({
        pinfl: data?.employee?.pinfl,
        phone_number: data?.employee?.phone_number,
        work_phone_number: data?.employee?.work_phone_number,
        inn: data?.employee?.inn,
        last_name: data?.employee?.last_name,
        first_name: data?.employee?.first_name,
        father_name: data?.employee?.father_name,
        birth_date: data?.employee?.birth_date
          ? dayjs(data?.employee?.birth_date)
          : "",
        gender: data?.employee?.gender,
        citizen_state_id: data?.employee?.citizen_state_id,
        marital_status_id: data?.employee?.marital_status_id,
        nationality_id: data?.employee?.nationality_id,
        state_id: data?.employee?.user_state_id,
        region_id: data?.employee?.user_region_id,
        district_id: data?.employee?.user_district_id,
        live_state_id: data?.employee?.user_live_state_id,
        live_region_id: data?.employee?.user_live_region_id,
        live_district_id: data?.employee?.user_live_district_id,
        user_live_address: data?.employee?.user_live_address,
        pasport_seria_number: data?.employee?.pasport_seria_number,
        pasport_state_id: data?.employee?.pasport_state_id,
        pasport_region_id: data?.employee?.pasport_region_id,
        pasport_district_id: data?.employee?.pasport_district_id,
        pasport_date: data?.employee?.pasport_date
          ? dayjs(data?.employee?.pasport_date)
          : "",
        pasport_date_end: data?.employee?.pasport_date_end
          ? dayjs(data?.employee?.pasport_date_end)
          : "",
        first_position_date: data?.employee?.first_position_date
          ? dayjs(data?.employee?.first_position_date)
          : "",
        specialty_start_date: data?.employee?.specialty_start_date
          ? dayjs(data?.employee?.specialty_start_date)
          : "",
        case_number: data?.employee?.case_number,
        table_number: data?.employee?.table_number,
      });
      setimgs({
        id: data?.employee?.file?.id,
        url: data?.employee?.file?.url_1,
      });
    }
  }, [data]);

  //Boshqa lavozimga o'tkazish
  const [openModal4, setopenModal4] = useState(false);
  const [isloadingPosition4, setisloadingPosition4] = useState(false);

  const showModal4 = () => {
    setopenModal4(true);
  };
  // modalni yopish
  const handleCancel4 = () => {
    setopenModal4(false);
  };

  const {
    control: control4,
    handleSubmit: handleSubmit4,
    reset: reset4,
    setValue: setValue4,
  } = useForm();

  const onSubmit4 = (form) => {
    let data = {
      order_number: form?.order_number,
      order_date: form?.order_date ? getDateForm(form?.order_date) : "",
      contract_number: form?.contract_number,
      contract_date: form?.contract_date
        ? getDateForm(form?.contract_date)
        : "",
      department_id: form?.department_id,
      position_id: form?.position_id,
      category_staff_id: form?.category_staff_id,
      rate: form?.rate,
      // is_main: form?.is_main,
      is_main: true,
    };
    setisloadingPosition4(true);
    mutate({
      url: `employee-edit/new-position-employee/${id}`,
      method: "PUT",
      data: data,
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot yangilandi !");
        handleCancel4();
        setisloadingPosition4(false);
        reset4();
      },
      onError: () => {
        errorMasseg("Xatolik ?");
        setisloadingPosition4(false);
      },
    });
  };

  const {
    control: control5,
    handleSubmit: handleSubmit5,
    reset: reset5,
  } = useForm();
  const [user_id5, setuser_id5] = useState(null);
  const [openModal5, setopenModal5] = useState(false);

  const showModal5 = (e) => {
    setopenModal5(true);
    setuser_id5(e?.user_id);
  };
  // modalni yopish
  const handleCancel5 = () => {
    setopenModal5(false);
    reset5({
      order_number: null,
      order_date: null,
      // contract_end_date: null,
      description: null,
      is_labor: null,
    });
    setuser_id5(null);
  };

  // const thisWorkEnd = (e) => {
  const onSubmit5 = (form) => {
    let data = {
      user_id: user_id5,
      order_name: form?.order_number,
      order_date: form?.order_date ? getDateForm(form?.order_date) : "",
      // contract_end_date: form?.contract_end_date
      //   ? getDateForm(form?.contract_end_date)
      //   : "",
      description: form?.description,
      reasons_for_dismissal_id: form?.reasons_for_dismissal_id,
      is_labor: form?.is_labor,
    };
    mutate({
      url: `staff-archive/cancel-labor`,
      method: "POST",
      data: data,
      onSuccess: () => {
        successMasseg("Ma'lumot yangilandi !");
        handleCancel5();
        navigate("/employe/employee");
      },
      onError: () => {
        errorMasseg("Xatolik ?");
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
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {/*  Foydalanuvchi rasmi */}
        {/* Yangi xodim ishga qabul qilish */}
        <div className="flex items-stretch justify-start gap-6 max-md:flex-col ">
          {/* rasm */}
          <div className="w-[320px] max-md:w-full border rounded-md border-solid border-[var(--borderWhite-color)]">
            <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5">
              <p className="text-sm text-[var(--textBlack-color)]">
                Foydalanuvchi rasmi
              </p>
            </div>
            <div className="p-5 flex items-center justify-center">
              <UploadOneImg imgs={imgs} setimgs={setimgs} />
            </div>
          </div>
          {/* input */}
          <div className="flex-1 border rounded-md border-solid border-[var(--borderWhite-color)]">
            <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5">
              <p className="text-sm text-[var(--textBlack-color)]">
                Shaxsiy ma'lumotlari
              </p>
            </div>
            <div className="p-5 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {/* JSHSHIR */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  JSHSHIR
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="pinfl"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="JSHSHIR kiriting"
                      onChange={(e) => {
                        if (+e.target.value) field.onChange(e);
                      }}
                      maxLength={14}
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* INN */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  STIR (INN)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="inn"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      onChange={(e) => {
                        if (+e.target.value) field.onChange(e);
                      }}
                      placeholder="INN kiriting"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Tug'ilgan sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Tug'ilgan sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="birth_date"
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
              {/* Familiyasi */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Familiyasi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="last_name"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Familiyasi"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Ismi */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Ismi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="first_name"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Ismi"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
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
                <Controller
                  name="father_name"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Otasining ismi"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Jinsi */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Jinsi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="gender"
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
                      placeholder="Jinsini tanlang"
                    >
                      <Select.Option value="male">Erkak</Select.Option>
                      <Select.Option value="woman">Ayol</Select.Option>
                    </Select>
                  )}
                />
              </div>
              {/* Millati */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Millati
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="nationality_id"
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
                      placeholder="Millatini tanlang"
                    >
                      {data?.nationalities?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Oilaviy ahvoli */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Oilaviy ahvoli
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="marital_status_id"
                  rules={{ required: false }}
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
                      placeholder="Oilaviy ahvolini tanlang"
                    >
                      {data?.marital_status?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Fuqaroligi*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Fuqaroligi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="citizen_state_id"
                  rules={{ required: false }}
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
                      loading={districtliveLoading}
                      size="large"
                      placeholder="Fuqaroligini tanlang"
                    >
                      {data?.states?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Telefon raqami */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Telefon raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="phone_number"
                  defaultValue="+998"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Telefon raqami kiriting"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Ish telefon raqami */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Ish telefon raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="work_phone_number"
                  rules={{ required: false }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="tel"
                      placeholder="Ish telefon raqami kiriting"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Elektron pochtasi
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Elektron pochtasi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name=""
                  rules={{ required: false }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Elektron pochtasi"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div> */}
            </div>
          </div>
        </div>
        {/* YASHASH JOYI TO‘G‘RISIDA MA’LUMOTLARI */}
        <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
          <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5">
            <p className="text-sm text-[var(--textBlack-color)]">
              Yashash joyi to‘g‘risida ma’lumotlari
            </p>
          </div>
          <div className="p-5 grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
            {/* Tug'ilgan davlati */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tug'ilgan davlati
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="state_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    onChange={(e) => {
                      field.onChange(e);
                      setregionStateBorn(e);
                      setValue("region_id", null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setValue("district_id", null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Davlatini tanlang"
                  >
                    {data?.states?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Tug'ilgan viloyati */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tug'ilgan viloyati
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="region_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    onChange={(e) => {
                      field.onChange(e);
                      setdistrictStateBorn(e);
                      setValue("district_id", null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    loading={regionLoading}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Viloyatini tanlang"
                  >
                    {region?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Tug'ilgan tumani(Shahar)*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tug'ilgan tumani(Shahar)
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="district_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    loading={districtLoading}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Tumanini tanlang"
                  >
                    {district?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Tug'ilgan joyi */}
            <div></div>
            {/* <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tug'ilgan joyi <sup className="text-red-600 text-lg relative top-[0px] opacity-0">*</sup>
              </label>
              <Controller
                name="joyi"
               
                control={control}
                rules={{ required: false}}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ko'cha va uy manzili"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div> */}
            {/* Yashash davlati */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Yashash davlati
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="live_state_id"
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
                    onChange={(e) => {
                      field.onChange(e);
                      setregionStateLive(e);
                      setValue("live_region_id", null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setValue("live_district_id", null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    size="large"
                    placeholder="Yashash davlatini tanlang"
                  >
                    {data?.states?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Yashash viloyati */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Yashash viloyati
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="live_region_id"
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
                    onChange={(e) => {
                      field.onChange(e);
                      setdistrictStateLive(e);
                      setValue("live_district_id", null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    loading={regionliveLoading}
                    size="large"
                    placeholder="Yashash viloyatini tanlang"
                  >
                    {regionLive?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Yashash tumani*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Yashash tumani
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="live_district_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    loading={districtliveLoading}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Yashash tumanini tanlang"
                  >
                    {districtLive?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Yashash joyi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Yashash joyi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="user_live_address"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ko'cha va uy manzili"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
          </div>
        </div>
        {/* PASPORT MA'LUMOTLARI */}
        <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
          <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5">
            <p className="text-sm text-[var(--textBlack-color)]">
              Pasport ma'lumotlari
            </p>
          </div>
          <div className="p-5 grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
            {/* JSHSHIR */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                JSHSHIR
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="pinfl"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    maxLength={14}
                    placeholder="JSHSHIR kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Seriya va raqami */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Seriya va raqami
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="pasport_seria_number"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    onInput={(e) =>
                      (e.target.value = e.target.value.toUpperCase())
                    }
                    maxLength={9}
                    placeholder="AA0000000"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Berilgan davlati */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Berilgan davlati
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="pasport_state_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    onChange={(e) => {
                      field.onChange(e);
                      setregionStatepasport(e);
                      setValue("pasport_region_id", null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setValue("pasport_district_id", null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Berilgan davlatini tanlang"
                  >
                    {data?.states?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Berilgan viloyati */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Berilgan viloyati
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="pasport_region_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    onChange={(e) => {
                      field.onChange(e);
                      setdistrictStatepasport(e);
                      setValue("pasport_district_id", null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    loading={regionpasportLoading}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Berilgan viloyatini tanlang"
                  >
                    {regionpasport?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Berilgan tumani*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Berilgan tumani
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="pasport_district_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    loading={districtpasportLoading}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Berilgan tumanini tanlang"
                  >
                    {districtpasport?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Berilgan sanasi (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Berilgan sanasi (kun-oy-yil)
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="pasport_date"
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
            {/* Amal qilish muddati (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Amal qilish muddati (kun-oy-yil)
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="pasport_date_end"
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
          </div>
        </div>
        {/* QUSHUMCHA MA'LUMOTLARI */}
        <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
          <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5">
            <p className="text-sm text-[var(--textBlack-color)]">
              Qo'shimcha ma'lumotlar
            </p>
          </div>
          <div className="p-5 grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
            {/* Tizimda birinchi ish boshlagan sanasi (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tizimda birinchi ish boshlagan sanasi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="first_position_date"
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
            {/* Mutaxasislik bo'yicha ish boshlagan sanasi (kun-oy-yil) */}
            <div className={`w-full}`}>
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Mutaxasislik bo'yicha ish boshlagan sanasi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="specialty_start_date"
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
            {/* Delo raqami */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Delo raqami
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="case_number"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Delo raqamini kiriting"
                    type="text"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Tabel raqami */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tabel raqami
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="table_number"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tabel raqamini kiriting"
                    type="number"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Xodimning toifasi (Разряд) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Xodimning toifasi (Разряд)
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name=""
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    disabled
                    placeholder="Xodimning toifasini kiriting"
                    type="text"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Xodimning guruhi (Группа) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Xodimning guruhi (Группа)
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name=""
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    disabled
                    placeholder="Xodimning guruhini kiriting"
                    type="text"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Xodimning oylik maoshi (Оклад) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Xodimning oylik maoshi (Оклад)
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name=""
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    disabled
                    placeholder="Xodimning oylik maoshi"
                    type="text"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            <div className="w-full mt-[30px]">
              <button
                type="button"
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm max-sm:w-full max-sm:overflow-hidden"
              >
                Oylik maoshni hisoblash
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mt-6">
          <button
            type="submit"
            className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm "
          >
            Saqlash
          </button>
        </div>
      </form>
      {/* Lavozim ma'lumotlari */}
      <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
        <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-3 flex items-center justify-between max-md:flex-col max-md:items-start">
          <p className="text-sm text-[var(--textBlack-color)]">
            Lavozim ma'lumotlari
          </p>
          {data?.employee?.positions?.length > 0 ? (
            <button
              type="button"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm flex items-center justify-center gap-2 max-sm:w-full max-sm:overflow-hidden"
            >
              <AppstoreAddOutlined />
              Qo'shimcha lavozimga tayinlash
            </button>
          ) : (
            <button
              onClick={() => showModal3()}
              type="button"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm flex items-center justify-center gap-2 max-sm:w-full max-sm:overflow-hidden"
            >
              <PlusOutlined />
              Lavozim qo'shish
            </button>
          )}
        </div>
        {data?.employee?.positions?.map((e) => {
          return (
            <div className="p-5" key={e?.id}>
              <div className="border border-solid border-[var(--borderWhite-color)]">
                <div className="p-2">
                  <p className="text-sm text-[var(--textBlack-color)]">
                    Lavozim nomi
                  </p>
                </div>
                <div className="flex max-md:flex-col">
                  <div className="w-[800px] max-md:w-full max-sm:grid-cols-1 grid grid-cols-3 items-center justify-center">
                    <div className="border border-solid border-[var(--borderWhite-color)] rounded-none p-2 h-[100%]">
                      <p className="text-base text-[var(--text-color)] px-3 mb-1 font-medium">
                        Shartnoma raqami
                      </p>
                      <p className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        {e?.contract_number}
                      </p>
                    </div>
                    <div className="border border-solid border-[var(--borderWhite-color)] rounded-none p-2 h-[100%]">
                      <p className="text-base text-[var(--text-color)] px-3 mb-1 font-medium">
                        Buyruq raqami
                      </p>
                      <p className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        {e?.order_number}
                      </p>
                    </div>
                    <div className="border border-solid border-[var(--borderWhite-color)] rounded-none p-2 h-[100%]">
                      <p className="text-base text-[var(--text-color)] px-3 mb-1 font-medium">
                        Mehnat munosabatlari turi
                      </p>
                      <p className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        {e?.category_staff?.name}
                      </p>
                    </div>{" "}
                    <div className="border border-solid border-[var(--borderWhite-color)] rounded-none p-2 h-[100%]">
                      <p className="text-base text-[var(--text-color)] px-3 mb-1 font-medium">
                        Shartnoma sanasi
                      </p>
                      <p className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        {e?.contract_date}
                      </p>
                    </div>
                    <div className="border border-solid border-[var(--borderWhite-color)] rounded-none p-2 h-[100%]">
                      <p className="text-base text-[var(--text-color)] px-3 mb-1 font-medium">
                        Buyruq sanasi
                      </p>
                      <p className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        {e?.order_date}
                      </p>
                    </div>
                    <div className="border border-solid border-[var(--borderWhite-color)] rounded-none p-2 h-[100%]">
                      <p className="text-base text-[var(--text-color)] px-3 mb-1 font-medium">
                        Stavkasi
                      </p>
                      <p className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        {e?.rate}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex items-start justify-center flex-col w-full">
                    <div className="border border-solid border-[var(--borderWhite-color)] rounded-none p-2 w-full h-[50%]">
                      <p className="text-base text-[var(--text-color)] px-3 mb-1 font-medium">
                        Tashkilot, Boshqarma, Bo‘lim
                      </p>
                      <p className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        {e?.department?.name}
                      </p>
                    </div>
                    <div className="border border-solid border-[var(--borderWhite-color)] rounded-none p-2 w-full h-[50%]">
                      <p className="text-base text-[var(--text-color)] px-3 mb-1 font-medium">
                        Lavozim
                      </p>
                      <p className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                        {e?.position?.staff_full}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full my-5 flex items-center justify-end gap-3 max-md:flex-wrap">
                <button
                  onClick={() => showModal2(data?.employee?.id, e?.id)}
                  type="submit"
                  className="w-max p-2 px-4 text-white bg-[#1b273c] rounded text-center text-sm flex gap-2 items-center justify-center"
                >
                  <EditOutlined />
                  Lavozimni tahrirlash
                </button>
                <button
                  onClick={showModal4}
                  type="submit"
                  className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm flex gap-2 items-center justify-center"
                >
                  <UngroupOutlined />
                  Boshqa lavozimga o'tkazish
                </button>
                <Popconfirm
                  title="Mehnat shartnomasini yakunlash"
                  description="Haqiqatdan ham mehnat shartnomasini yakunlashni hohlaysizmi?"
                  placement="topRight"
                  onConfirm={() => showModal5(e)}
                  onCancel={() => {}}
                  okText="Ha"
                  cancelText="Yo'q"
                >
                  <button
                    type="submit"
                    className="w-max p-2 px-4 text-white bg-[#EF4444] rounded text-center text-sm flex gap-2 items-center justify-center"
                  >
                    <DeleteOutlined />
                    Mehnat shartnomasini yakunlash
                  </button>
                </Popconfirm>
              </div>
            </div>
          );
        })}
      </div>
      {/* Lavozimni tahrirlash */}
      <Modal
        title="Lavozimni tahrirlash"
        open={openModal2}
        onOk={showModal2}
        width={1000}
        onCancel={handleCancel2}
        zIndex={1050}
        footer={""}
      >
        {isloadingPosition ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit2(onSubmit2)} className="mt-5">
            {/* Lavozimni tahrirlash */}
            <div className="p-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
              {/* Buyruq raqami */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Buyruq raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="order_number"
                  control={control2}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Buyruq raqami"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Buyruq sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Buyruq sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="order_date"
                  control={control2}
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
              {/* Shartnoma raqami */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Shartnoma raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="contract_number"
                  control={control2}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Shartnoma raqamini kiriting"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Shartnoma tuzilgan sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Shartnoma tuzilgan sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="contract_date"
                  control={control2}
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
              {/* Bo'lim,Tashkilot,Boshqarma tanlang */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Bo'lim,Tashkilot,Boshqarma tanlang
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="department_id"
                  control={control2}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      showSearch
                      allowClear
                      onChange={(e) => {
                        field.onChange(e);
                        setstaff(e);
                        setValue2("position_id", null, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Bo'lim,Tashkilot,Boshqarma tanlang"
                    >
                      {editdepartments?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Lavozimni tanlang */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Lavozimni tanlang
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="position_id"
                  control={control2}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      showSearch
                      allowClear
                      loading={staffLoading}
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Lavozimni tanlang"
                    >
                      {staffData?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.staff_full}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Mehnat munosabatlari turi*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Mehnat munosabatlari turi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="category_staff_id"
                  control={control2}
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
                      placeholder="Mehnat munosabatlari turini tanlang"
                    >
                      {editcategory_staff?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Lavozim sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Lavozim sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="start_date"
                  control={control2}
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
              {/* Stavka */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Stavka
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="rate"
                  control={control2}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Stavkani kiriting"
                      type="number"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              <div className="max-md:hidden"></div>
              {/* Xodim boshqa lavozim o'tkazilmoqdami? */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Xodim boshqa lavozim o'tkazilmoqdami ?
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="is_main"
                  defaultValue={false}
                  control={control2}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      checkedChildren="Ha"
                      unCheckedChildren="Yo'q"
                      size="large"
                      className="bg-red-600"
                    />
                  )}
                />
              </div>
              <div className="max-md:hidden"></div>
              {/* button */}
              <div className="w-full mt-6">
                <button
                  type="submit"
                  className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>
      {/* Lavozimni qo'shish */}
      <Modal
        title="Lavozimni qo'shish"
        open={openModal3}
        onOk={showModal3}
        width={1000}
        onCancel={handleCancel3}
        zIndex={1050}
        footer={""}
      >
        <form onSubmit={handleSubmit3(onSubmit3)} className="mt-5">
          {/* Lavozimni qo'shish */}
          {isloadingPosition3 ? (
            <Loading />
          ) : (
            <div className="p-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
              {/* Buyruq raqami */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Buyruq raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="order_number"
                  control={control3}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Buyruq raqami"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Buyruq sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Buyruq sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="order_date"
                  control={control3}
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
              {/* Shartnoma raqami */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Shartnoma raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="contract_number"
                  control={control3}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Shartnoma raqamini kiriting"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Shartnoma tuzilgan sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Shartnoma tuzilgan sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="contract_date"
                  control={control3}
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
              {/* Bo'lim,Tashkilot,Boshqarma tanlang */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Bo'lim,Tashkilot,Boshqarma tanlang
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="department_id"
                  control={control3}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      showSearch
                      allowClear
                      onChange={(e) => {
                        field.onChange(e);
                        setstaff(e);
                        setValue3("position_id", null, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Bo'lim,Tashkilot,Boshqarma tanlang"
                    >
                      {data?.departments?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Lavozimni tanlang */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Lavozimni tanlang
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="position_id"
                  control={control3}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      showSearch
                      allowClear
                      loading={staffLoading}
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Lavozimni tanlang"
                    >
                      {staffData?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.staff_full}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Mehnat munosabatlari turi*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Mehnat munosabatlari turi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="category_staff_id"
                  control={control3}
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
                      placeholder="Mehnat munosabatlari turini tanlang"
                    >
                      {data?.category_staff?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Stavka */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Stavka
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="rate"
                  control={control3}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Stavkani kiriting"
                      type="number"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Lavozim sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Lavozim sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="start_date"
                  control={control3}
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
              {/* Tizimda birinchi ish boshlagan sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Tizimda birinchi ish boshlagan sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="first_position_date"
                  control={control3}
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
              {/* Delo raqami */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Delo raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="case_number"
                  control={control3}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Delo raqamini kiriting"
                      type="text"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Tabel raqami */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Tabel raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="table_number"
                  control={control3}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Tabel raqamini kiriting"
                      type="number"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Xodim boshqa lavozim o'tkazilmoqdami? */}
              {/* <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Xodim boshqa lavozim o'tkazilmoqdami?
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="is_main"
                  defaultValue={false}
                  control={control3}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      checkedChildren="Ha"
                      unCheckedChildren="Yo'q"
                      size="large"
                      className="bg-red-600"
                    />
                  )}
                />
              </div> */}
              {/* <div className="max-md:hidden"></div> */}
              {/* button */}
              <div className="w-full mt-6">
                <button
                  disabled={isloadingPosition3}
                  type="submit"
                  className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
                >
                  Saqlash
                </button>
              </div>
            </div>
          )}
        </form>
      </Modal>
      {/* Boshqa lavozimga o'tkazish */}
      <Modal
        title="Boshqa lavozimga o'tkazish"
        open={openModal4}
        onOk={showModal4}
        width={1000}
        onCancel={handleCancel4}
        zIndex={1050}
        footer={""}
      >
        {isloadingPosition4 ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit4(onSubmit4)} className="mt-5">
            {/* Boshqa lavozimga o'tkazish */}
            <div className="p-5 grid grid-cols-2 gap-5 max-md:grid-cols-1">
              {/* Buyruq raqami */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Buyruq raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="order_number"
                  control={control4}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Buyruq raqami"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Buyruq sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Buyruq sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="order_date"
                  control={control4}
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
              {/* Shartnoma raqami */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Asosiy shartnomaga ilova raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="contract_number"
                  control={control4}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Shartnoma raqamini kiriting"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Shartnoma tuzilgan sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Shartnoma tuzilgan sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="contract_date"
                  control={control4}
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
              {/* Bo'lim,Tashkilot,Boshqarma tanlang */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Bo'lim,Tashkilot,Boshqarma tanlang
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="department_id"
                  control={control4}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      showSearch
                      allowClear
                      onChange={(e) => {
                        field.onChange(e);
                        setstaff(e);
                        setValue4("position_id", null, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Bo'lim,Tashkilot,Boshqarma tanlang"
                    >
                      {data?.departments?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Lavozimni tanlang */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Lavozimni tanlang
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="position_id"
                  control={control4}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      showSearch
                      allowClear
                      loading={staffLoading}
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Lavozimni tanlang"
                    >
                      {staffData?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.staff_full}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Mehnat munosabatlari turi*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Mehnat munosabatlari turi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="category_staff_id"
                  control={control4}
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
                      placeholder="Mehnat munosabatlari turini tanlang"
                    >
                      {data?.category_staff?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Lavozim sanasi (kun-oy-yil) */}
              {/* <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Lavozim sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="start_date"
                  control={control4}
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
              </div> */}
              {/* Stavka */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Stavka
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="rate"
                  control={control4}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Stavkani kiriting"
                      type="number"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Xodim boshqa lavozim o'tkazilmoqdami? */}
              <div className="w-full hidden">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Xodim boshqa lavozim o'tkazilmoqdami?
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="is_main"
                  defaultValue={false}
                  control={control4}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      // checked={true}
                      checked={field.value}
                      checkedChildren="Ha"
                      unCheckedChildren="Yo'q"
                      size="large"
                      className="bg-red-600"
                    />
                  )}
                />
              </div>
              {/* <div className="max-md:hidden"></div> */}
              {/* button */}
              <div className="w-full mt-6">
                <button
                  type="submit"
                  className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>
      {/*Mehnat shartnomasini yakunlash */}
      <Modal
        title="Mehnat shartnomasini yakunlash"
        open={openModal5}
        onOk={showModal5}
        width={1000}
        onCancel={handleCancel5}
        zIndex={1050}
        footer={""}
      >
        <form onSubmit={handleSubmit5(onSubmit5)} className="mt-5 p-5">
          {/*Mehnat shartnomasini yakunlash */}
          <div className=" grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {/* Buyruq raqami */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Buyruq raqami
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="order_number"
                control={control5}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Buyruq raqami"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Buyruq sanasi (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Buyruq sanasi (kun-oy-yil)
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="order_date"
                control={control5}
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
            {/* Shartnoma tugash sanasi (kun-oy-yil) */}
            {/* <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Shartnoma tugash sanasi (kun-oy-yil)
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="contract_end_date"
                control={control5}
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
            </div> */}
            {/* Bo'shash sababini tanlang */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Xodimning bo'shash sababi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="reasons_for_dismissal_id"
                control={control5}
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
                    placeholder="Xodimning bo'shash sababini tanlang"
                  >
                    {ReasonsForDismissal?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Izoh */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Izoh
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="description"
                control={control5}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Izohni kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
          </div>
          {/* Mehnat faoliyati davrida yo'l qo'ygan qo'pol xatolari munosabati bilan ? */}
          <div className="w-full mt-5">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Mehnat faoliyati davrida yo'l qo'ygan qo'pol xatolari munosabati
              bilan ?
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="is_labor"
              defaultValue={false}
              control={control5}
              rules={{ required: false }}
              render={({ field }) => (
                <Switch
                  {...field}
                  checked={field.value}
                  checkedChildren="Ha"
                  unCheckedChildren="Yo'q"
                  size="large"
                  className="bg-red-600"
                />
              )}
            />
          </div>
          <div className="max-md:hidden"></div>
          {/* button */}
          <div className="w-full mt-6">
            <button
              type="submit"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              Yakunlash
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
