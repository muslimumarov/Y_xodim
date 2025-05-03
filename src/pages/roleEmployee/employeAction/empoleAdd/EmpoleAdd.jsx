import { Select } from "antd";
import { DatePicker } from "antd";
import { Breadcrumb, UploadOneImg } from "components";
import { useGet, usePost } from "hooks";
import { Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getDateForm } from "utils/idCreate";
import { errorMasseg, infoMasseg, successMasseg } from "utils/toastify";
import { useEffect } from "react";
import { api } from "service";

export const EmpoleAdd = () => {
  // ------------------api
  const navigate = useNavigate();
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
  //   Bulim orqali lavozimni olish
  const [staff, setstaff] = useState(false);
  const {
    data: { data: staffData },
    isLoading: staffLoading,
  } = useGet({
    url: `employee/filter/staff/${staff}?lang=uz`,
    enabled: staff,
  });
  //  xodimlarni hamma Ma'lumotini olish
  const {
    data: { data: employeeAll },
  } = useGet({
    url: `employee/create?lang=uz`,
  });
  // -------------------- form
  const { mutate, isLoading: loadingName } = usePost();
  // form
  const { control, handleSubmit, setValue } = useForm();
  const [imgs, setimgs] = useState();
  const [postPinfl, setpostPinfl] = useState(false);
  //malumotni yuborish
  const onSubmit = (form) => {
    let data = {
      employee_data: {
        file_id: imgs?.id,
        pinfl: form?.pinfl,
        inn: form?.inn,
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
        trade_union: form?.trade_union,
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
        order_number: form?.order_number,
        order_date: getDateForm(form?.order_date),
        contract_number: form?.contract_number,
        contract_date: getDateForm(form?.contract_date),
        start_date: getDateForm(form?.start_date),
        department_id: form?.department_id,
        position_id: form?.position_id,
        category_staff_id: form?.category_staff_id,
        rate: form?.rate,
        first_position_date: getDateForm(form?.first_position_date),
        specialty_start_date: getDateForm(form?.specialty_start_date),
        case_number: form?.case_number,
        table_number: form?.table_number,
      },
      information: {
        educations_id: form?.educations_id,
        language_id: form?.language_id,
        // military_rank: form?.military_rank,
        academicdegree_id: form?.academicdegree_id,
        academictitlies_id: form?.academictitlies_id,
        parties_id: form?.parties_id,
        elected_body: form?.elected_body,
      },
    };
    if (postPinfl) {
      mutate({
        url: "employee/create",
        method: "POST",
        data: data,
        onSuccess: () => {
          successMasseg("Ma'lumot yangilandi !");
          navigate("/employe/employee");
        },
        onError: (err) => {
          errorMasseg(err?.response?.data?.data?.message ?? "Xatolik !");
        },
      });
    }
  };
  // xodimni pinfli bor yuqligini tekshirish
  const setPinflGet = (e) => {
    api.get(`employee/check-pinfl?pinfl=${e}`).then((res) => {
      setpostPinfl(res?.data?.ok);
      if (!res?.data?.ok) errorMasseg("Bu JSHSHIR avvaldan mavjud");
    });
  };
  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  useEffect(() => {
    const messageIn = setTimeout(() => {
      infoMasseg(
        "Xodimlar ma'lumotini xodimning passport ma'lumotlari bo'yicha lotin tilida va xatosiz kiritishingizni so'raymiz!"
      );
    }, 100);
    () => {
      return clearTimeout(messageIn);
    };
  }, []);
  return (
    <>
      <Breadcrumb
        link={"Xodimlar qo'shish"}
        link1={"Xodimlar"}
        link2={"Xodimlar qo'shish"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <button
          onClick={() => navigate("/employe/employee")}
          className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm"
        >
          <ArrowLeftOutlined /> Orqaga
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          {/*  Foydalanuvchi rasmi */}
          {/* Yangi xodim ishga qabul qilish */}
          <div className="flex items-stretch justify-start gap-6 max-md:flex-col">
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
                  Yangi xodim ishga qabul qilish
                </p>
              </div>
              <div className="p-5 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
                {/* JSHSHIR / pinfl */}
                <div className="w-full">
                  <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                    JSHSHIR
                    <sup className="text-red-600 text-lg relative top-[0px]">
                      *
                    </sup>
                  </label>
                  <Controller
                    name="pinfl"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        maxLength={14}
                        onChange={(e) => {
                          let hash = e.target.value;
                          var reg = new RegExp("^[0-9]*$");
                          if (reg.test(hash)) {
                            field.onChange(e);
                            if (e.target.value.length > 13) {
                              setPinflGet(e.target.value);
                            }
                          }
                        }}
                        placeholder="JSHSHIR kiriting"
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
                    rules={{ required: false }}
                    control={control}
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
                    rules={{ required: false }}
                    control={control}
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
                    <sup className="text-red-600 text-lg relative top-[0px]">
                      *
                    </sup>
                  </label>
                  <Controller
                    name="last_name"
                    rules={{ required: true }}
                    control={control}
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
                    <sup className="text-red-600 text-lg relative top-[0px]">
                      *
                    </sup>
                  </label>
                  <Controller
                    name="first_name"
                    rules={{ required: true }}
                    control={control}
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
                    <sup className="text-red-600 text-lg relative top-[0px]">
                      *
                    </sup>
                  </label>
                  <Controller
                    name="father_name"
                    rules={{ required: true }}
                    control={control}
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
                        placeholder="Millatini tanlang"
                      >
                        {employeeAll?.nationalities?.map((e) => (
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
                        {employeeAll?.marital_status?.map((e) => (
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
                        {employeeAll?.states?.map((e) => (
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
                    rules={{ required: false }}
                    control={control}
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
            <div className="p-5 grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
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
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Davlatini tanlang"
                    >
                      {employeeAll?.states?.map((e) => (
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
              {/* Tug'ilgan joyi hozirda yuq */}
              <div className="w-full">
                {/* <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Tug'ilgan joyi <sup className="text-red-600 text-lg relative top-[0px] opacity-0">*</sup>
                </label>
                <Controller
                name="user_live_address"
                
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
                /> */}
              </div>
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
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Yashash davlatini tanlang"
                    >
                      {employeeAll?.states?.map((e) => (
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
                      loading={regionliveLoading}
                      onChange={(e) => {
                        field.onChange(e);
                        setdistrictStateLive(e);
                        setValue("live_district_id", null, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
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
              {/* Yashash tumani(Shahar)*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Yashash tumani(Shahar)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="live_district_id"
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
            <div className="p-5 grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {/* JSHSHIR pinfl*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  JSHSHIR
                  <sup className="text-red-600 text-lg relative top-[0px]">
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
                      onChange={(e) => {
                        let hash = e.target.value;
                        var reg = new RegExp("^[0-9]*$");
                        if (reg.test(hash)) {
                          field.onChange(e);
                          if (e.target.value.length > 13) {
                            setPinflGet(e.target.value);
                          }
                        }
                      }}
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
                      {employeeAll?.states?.map((e) => (
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
                      onChange={(e) => {
                        field.onChange(e);
                        setdistrictStatepasport(e);
                        setValue("pasport_district_id", null, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      loading={regionpasportLoading}
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
                  rules={{ required: false }}
                  control={control}
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
          {/* LAVOZIM MA'LUMOTLARI */}
          <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
            <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5 flex items-center justify-between gap-2">
              <p className="text-sm text-[var(--textBlack-color)]">
                Lavozim ma'lumotlari
              </p>
            </div>
            <div className="p-5 grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {/* Mehnat munosabatlari turi*/}
              <div className={`w-full`}>
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Mehnat munosabatlari turi
                  <sup className="text-red-600 text-lg relative top-[0px]">
                    *
                  </sup>
                </label>
                <Controller
                  name="category_staff_id"
                  rules={{ required: true }}
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
                      placeholder="Mehnat munosabatlari turini tanlang"
                    >
                      {employeeAll?.category_staff?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Buyruq raqami */}
              <div className={`w-full}`}>
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Buyruq raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="order_number"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Buyruq raqamini kiriting"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Buyruq sanasi (kun-oy-yil) */}
              <div className={`w-full}`}>
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Buyruq sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="order_date"
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
              {/* Shartnoma raqami */}
              <div className={`w-full}`}>
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Shartnoma raqami
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="contract_number"
                  control={control}
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
              <div className={`w-full}`}>
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Shartnoma tuzilgan sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="contract_date"
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
              {/* Ishga chiqish sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Ishga chiqish sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="start_date"
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
              {/* Bo'lim(Tashkilot,Boshqarma) nomi*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Bo'lim,Tashkilot,Boshqarma nomi
                  <sup className="text-red-600 text-lg relative top-[0px]">
                    *
                  </sup>
                </label>
                <Controller
                  name="department_id"
                  rules={{ required: true }}
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
                        setstaff(e);
                        setValue("position_id", null, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      size="large"
                      placeholder="Bo'lim,Tashkilot,Boshqarma nomini tanlang"
                    >
                      {employeeAll?.departments?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Shtat lavozimi*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Shtat lavozimi
                  <sup className="text-red-600 text-lg relative top-[0px]">
                    *
                  </sup>
                </label>
                <Controller
                  name="position_id"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      filterOption={filterOption}
                      loading={staffLoading}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Shtat lavozimini tanlang"
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
              {/* Stavka */}
              <div className={`w-full}`}>
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Stavka
                  <sup className="text-red-600 text-lg relative top-[0px]">
                    *
                  </sup>
                </label>
                <Controller
                  name="rate"
                  control={control}
                  rules={{ required: true }}
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
              {/* Tizimda birinchi ish boshlagan sanasi (kun-oy-yil) */}
              <div className={`w-full}`}>
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Tizimda birinchi ish boshlagan sanasi (kun-oy-yil)
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
              <div className={`w-full}`}>
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
              <div className={`w-full}`}>
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
              <div className={`w-full}`}>
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
              {/* Xodimning guruhi */}
              <div className={`w-full}`}>
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Xodimning guruhi
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
              <div className={`w-full}`}>
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
                      placeholder="Xodimning oylik maoshini kiriting"
                      type="text"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          {/* MA'LUMOTLARI */}
          <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
            <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5">
              <p className="text-sm text-[var(--textBlack-color)]">
                Ma'lumotlari
              </p>
            </div>
            <div className="p-5 grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {/* Ma'lumoti*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Ma'lumoti
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="educations_id"
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
                      placeholder="Ma'lumotini tanlang"
                    >
                      {employeeAll?.educations?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Chet tillari*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Chet tillari
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="language_id"
                  defaultValue={[]}
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      mode="multiple"
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Chet tillarini tanlang"
                    >
                      {employeeAll?.languages?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Harbiy unvoni
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Harbiy unvoni
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="military_rank"
                  rules={{ required: false }}
                  defaultValue={"Yo'q"}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Harbiy unvonini kiriting"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div> */}
              {/* Saylangan organlarga a'zoligi */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Saylangan organlarga a'zoligi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="elected_body"
                  rules={{ required: false }}
                  defaultValue={"Yo'q"}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Saylangan organlarga a'zoligini kiriting"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
              {/* Ilmiy darajasi*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Ilmiy darajasi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="academicdegree_id"
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
                      placeholder="Ilmiy darajasini tanlang"
                    >
                      {employeeAll?.academicdegree?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Partiyaviyligi*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Partiyaviyligi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="parties_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      showSearch
                      allowClear
                      rules={{ required: false }}
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Partiyaviyligini tanlang"
                    >
                      {employeeAll?.parties?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* Ilmiy unvoni*/}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Ilmiy unvoni
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="academictitlies_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      rules={{ required: false }}
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Ilmiy unvonini tanlang"
                    >
                      {employeeAll?.academictitlies?.map((e) => (
                        <Select.Option key={e?.id} value={e?.id}>
                          {e?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              {/* kasaba uyishmasiga azoligi */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Kasaba uyishmasiga a'zoligi
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="trade_union"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      rules={{ required: false }}
                      defaultValue={"true"}
                      showSearch
                      allowClear
                      optionFilterProp="children"
                      filterOption={filterOption}
                      className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                      size="large"
                      placeholder="Kasaba uyishmasiga a'zoligini tanlang"
                    >
                      <Select.Option value={"true"}>A'zo</Select.Option>
                      <Select.Option value={"false"}>A'zo emas</Select.Option>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-6">
            <button
              disabled={loadingName}
              type="submit"
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
