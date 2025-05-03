import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { DatePicker } from "antd";
import { Modal } from "antd";
import { Select } from "antd";
import { Badge } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { imgUrl } from "service";
import { getDateForm, getDateReverse } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";

export const DisciplinaryActionEmploye = () => {
  const {
    data: { data },
    refetch,
    isLoading,
  } = useGet({
    url: `disciplinary-action/find/all`,
  });

  const {
    data: { data: disciplinaryName },
  } = useGet({
    url: `disciplinary-action/find-types/all`,
  });

  // xodimga tatil qo'shish
  const {
    data: { data: dataEmployee },
    isLoading: dataLoading,
  } = useGet({
    url: `employee/find/all?page=1&limit=1000000&lang=uz`,
  });

  const [dataModal, setdataModal] = useState([]);
  //   modal
  const [openModal, setOpenModal] = useState(false);
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
  };

  //   modal
  const [openModal2, setOpenModal2] = useState(false);
  // modalni ochish
  const showModal2 = () => {
    setOpenModal2(true);
  };
  // modalni yopish
  const handleCancel2 = () => {
    setOpenModal2(false);
    resInput();
  };

  const { control, handleSubmit, reset } = useForm();
  const { mutate } = usePost();
  // yuborish
  const onSubmit = (form) => {
    mutate({
      url: `disciplinary-action/create`,
      method: "POST",
      data: {
        user_id: form?.user_id,
        punishment_date: getDateForm(form?.punishment_date),
        punishment_number: form?.punishment_number,
        by_whom: form?.by_whom,
        type_of_punishment: form?.type_of_punishment,
        reason_for_punishment: form?.reason_for_punishment,
        type_disciplinary_punishment_id: form?.type_disciplinary_punishment_id,
      },
      onSuccess: () => {
        handleCancel2();
        resInput();
        refetch();
        successMasseg("Ma'lumot yangilandi !");
      },
      onError: () => {
        errorMasseg("Xatolik ?");
      },
    });
  };

  //inputlani bushatish
  const resInput = () => {
    reset({
      user_id: null,
      punishment_date: null,
      punishment_number: null,
      by_whom: null,
      type_of_punishment: null,
      reason_for_punishment: null,
      type_disciplinary_punishment_id: null,
    });
  };

  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb link={"Intizomiy jazo"} link1={"Intizomiy jazo"} link2={""} />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="mb-6 flex items-center justify-end">
          <button
            onClick={showModal2}
            className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          >
            Intizomiy jazo qo'shish
          </button>
        </div>
        <div className="grid grid-cols-3 pl-8 gap-20 max-xl:grid-cols-2 max-md:grid-cols-1 max-md:gap-9">
          {data?.map((item) => (
            <div
              className="hover:scale-[1.02] transition ease-linear w-full"
              key={item?.id}
            >
              <div className="border-[2px] border-red-500 w-full px-5 py-8 rounded-2xl flex justify-start items-center">
                <Badge
                  count={item?.items?.length}
                  showZero
                  color="#ba0909"
                  className="translate-x-[-3.25rem]"
                >
                  <img
                    src={
                      item?.file?.url_1
                        ? imgUrl + item?.file?.url_1
                        : "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    className="aspect-[3/4] object-cover object-center w-32 rounded-2xl max-w-[8rem] border-[2px] border-red-500"
                    alt="employee picture"
                  />
                </Badge>
                <div className="translate-x-[-2rem] flex flex-col justify-center items-start gap-3">
                  <p className="text-[var(--textBlack-color)] text-base font-bold">
                    {item?.full_name}
                  </p>
                  <p className="text-[var(--textGray-color)] text-sm">
                    {item?.items?.[0]?.type_of_punishment}
                  </p>
                  <button
                    onClick={() => {
                      showModal();
                      setdataModal(item?.items);
                    }}
                    className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded-xl text-center text-sm"
                  >
                    <ExclamationCircleOutlined /> Batafsil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Intizomiy jazolar"
        open={openModal}
        onOk={showModal}
        onCancel={handleCancel}
        zIndex={1050}
        width={700}
        footer={""}
      >
        {dataModal?.map((item) => (
          <div
            key={item.id}
            className="mt-6 border-l-[2px] border-red-500 py-2 px-4 bg-gradient-to-r from-red-50"
          >
            <p className="text-[var(--textBlack-color)] text-base font-semibold">
              <span>Kim tomonidan </span> :{" "}
              <span className="text-[var(--text-color)]">{item?.by_whom}</span>
            </p>
            <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
              <span>Buyruq sanasi </span> :{" "}
              <span className="text-[var(--text-color)]">
                {getDateReverse(item?.punishment_date)}
              </span>
            </p>
            <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
              <span>Buyruq raqami </span> :{" "}
              <span className="text-[var(--text-color)]">
                {item?.punishment_number}
              </span>
            </p>
            <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
              <span>Intizomiy jazo sababi </span> :{" "}
              <span className="text-[var(--text-color)]">
                {item?.reason_for_punishment}
              </span>
            </p>
            <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
              <span>Intizomiy jazo turi </span> :{" "}
              <span className="text-[var(--text-color)]">
                {item?.type_of_punishment}
              </span>
            </p>
          </div>
        ))}
      </Modal>
      {/* qushish */}
      <Modal
        title="Intizomiy jazo qo'shish"
        open={openModal2}
        onOk={showModal2}
        onCancel={handleCancel2}
        zIndex={1050}
        footer={""}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5 mt-5"
        >
          {/* Xodim*/}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Xodim
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="user_id"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value}
                  showSearch
                  loading={dataLoading}
                  allowClear
                  optionFilterProp="children"
                  filterOption={filterOption}
                  className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                  size="large"
                  placeholder="Xodimni tanlang"
                >
                  {dataEmployee?.items?.map((e) => {
                    return (
                      <Select.Option value={e?.id} key={e?.id}>
                        {e?.full_name}
                      </Select.Option>
                    );
                  })}
                </Select>
              )}
            />
          </div>
          {/* Intizomiy jazo Sanasi (kun-oy-yil) */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Intizomiy jazo Sanasi (kun-oy-yil){" "}
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="punishment_date"
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
          {/* Buyruq raqami */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Buyruq raqami
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="punishment_number"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Buyruq raqamini nomini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Kim tomonidan */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Kim tomonidan
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="by_whom"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Kim tomonidanligini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Intizomiy jazo turi*/}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Intizomiy jazo turi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="type_disciplinary_punishment_id"
              control={control}
              rules={{ required: false }}
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
                  placeholder="Intizomiy jazo turini tanlang"
                >
                  {disciplinaryName?.map((e) => (
                    <Select.Option key={e?.id} value={e?.id}>
                      {e?.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </div>
          {/* Intizomiy jazo sababi */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Intizomiy jazo sababi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="reason_for_punishment"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Intizomiy jazo sababini nomini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          <div className="w-full">
            <button
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
