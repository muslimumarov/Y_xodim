import { Breadcrumb, Loading } from "components";
import { Input } from "antd";
import { useState } from "react";
import {
  ExclamationCircleOutlined,
  FileSearchOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { api, imgUrl } from "service";
import { Image } from "antd";
import { Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "antd";
import { Select } from "antd";
import { getDateForm } from "utils/idCreate";
import { useGet, usePost } from "hooks";
import { errorMasseg, successMasseg } from "utils/toastify";
import { Switch } from "antd";

export const Unarchive = () => {
  const [employee, setemployee] = useState(null);
  const [isloading, setisloading] = useState(false);

  const { control, handleSubmit, setValue, reset } = useForm();

  //   shaxsiy malumotlrni olib kelish

  const [openModal, setopenModal] = useState(false);

  const showModal = () => {
    setopenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setopenModal(false);
    resetForm();
  };

  const [value, setvalue] = useState("");
  const onChange = (value) => {
    setvalue(value);
  };
  const { mutate } = usePost();

  const [isloadingPosition, setisloadingPosition] = useState(false);

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

  const onSubmit = (form) => {
    setisloadingPosition(true);
    let data = {
      user_id: employee?.user_id,
      staff_archive_id: employee?.id,
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
      is_main: false,
    };

    mutate({
      url: `staff-archive/recruiting`,
      method: "POST",
      data: data,
      onSuccess: () => {
        setisloadingPosition(false);
        successMasseg("Ma'lumot yangilandi !");
        setvalue("");
        handleCancel();
        setemployee(null);
      },
      onError: () => {
        setisloadingPosition(false);
        errorMasseg("Xatolik ?");
      },
    });
  };
  const resetForm = () => {
    reset();
  };
  const getEmployeeArchive = () => {
    setisloading(true);
    api
      .get(`staff-archive/pinfl?pinfl=${value}`)
      .then((res) => {
        setemployee(res?.data?.data);
        setisloading(false);
      })
      .catch(() => {
        setisloading(false);
      });
  };
  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  if (isloading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Arxivdan chiqarish"}
        link1={"Arxivdan chiqarish"}
        link2={""}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="max-w-[700px] w-full mt-6 grid grid-cols-6 gap-3 mx-auto max-sm:grid-cols-1">
          <Input
            value={value}
            maxLength={14}
            onChange={(e) => {
              let hash = e.target.value;
              var reg = new RegExp("^[0-9]*$");
              if (reg.test(hash)) {
                onChange(e.target.value);
              }
            }}
            placeholder="JSHSHIR kiriting"
            size="large"
            className="col-span-5 p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
          <button
            onClick={getEmployeeArchive}
            type="button"
            className="col-span-1 w-full p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm max-sm:w-max"
          >
            Izlash
          </button>
        </div>
        {employee ? (
          <div className="w-full flex items-center justify-center flex-col gap-4 mt-20">
            <p
              className={`text-sm text-[var(--textBlack-color)] px-5 py-3 w-full max-w-[400px] border-l-[6px] rounded-md  ${
                employee?.is_labor
                  ? "bg-red-100 border-red-500"
                  : "bg-amber-100 border-amber-500"
              }`}
            >
              <ExclamationCircleOutlined /> {employee?.description}
            </p>
            <p className="text-lg font-semibold text-[var(--textBlack-color)]">
              {employee?.first_name} {employee?.last_name}{" "}
              {employee?.father_name}
            </p>
            <Image
              width={150}
              height={200}
              className="object-cover object-center rounded-sm overflow-hidden"
              src={
                employee?.file?.url_1
                  ? imgUrl + employee?.file?.url_1
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
            />
            <p className="text-base font-normal text-[var(--textGray-color)]">
              <InfoCircleOutlined /> {employee?.job_name}
            </p>
            <button
              onClick={showModal}
              type="button"
              className="w-full max-w-[400px] p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm max-sm:w-max"
            >
              Arxivdan chiqarish
            </button>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center flex-col gap-7 mt-36 mb-36 opacity-50">
            <p className="text-8xl text-[var(--textBlack-color)]">
              <FileSearchOutlined />
            </p>
            <p className="text-base text-[var(--textBlack-color)]">
              Arxivdan izlash uchun xodimning JSHSHIRini kiriting va izlang
            </p>
          </div>
        )}
      </div>
      {/* Arxivdan chiqarish */}
      <Modal
        title="Arxivdan chiqarish"
        open={openModal}
        onOk={showModal}
        width={1000}
        onCancel={handleCancel}
        zIndex={1050}
        footer={""}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          {isloadingPosition ? (
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
                  control={control}
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
              <div className="w-full">
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
              <div className="w-full">
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
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      showSearch
                      allowClear
                      onChange={(e) => {
                        field.onChange(e);
                        setstaff(e);
                        setValue("position_id", null, {
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
                      {employeeAll?.departments?.map((e) => (
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
                  control={control}
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
                  control={control}
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
              <div className="max-md:hidden"></div>
              <div className="w-full mt-6">
                <button
                  disabled={isloadingPosition}
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
    </>
  );
};
