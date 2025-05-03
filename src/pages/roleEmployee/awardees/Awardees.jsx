import { SketchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Switch } from "antd";
import { DatePicker } from "antd";
import { Modal } from "antd";
import { Select } from "antd";
import { Badge } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { imgUrl } from "service";
import { getDateForm, getDateReverse } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";

export const Awardees = () => {
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `encourage/find/all`,
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

  const { control, handleSubmit, reset } = useForm();
  const { mutate } = usePost();

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

  // yuborish
  const onSubmit = (form) => {
    mutate({
      url: `encourage/create`,
      method: "POST",
      data: {
        user_id: form?.user_id,
        encourage_date: getDateForm(form?.encourage_date),
        order_number: form?.order_number,
        by_whom: form?.by_whom,
        type_of_encourage: form?.type_of_encourage,
        reason_for_encourage: form?.reason_for_encourage,
        is_state_award: form?.is_state_award,
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
      encourage_date: null,
      order_number: null,
      by_whom: null,
      type_of_encourage: null,
      reason_for_encourage: null,
      is_state_award: false,
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
        link={"Mukofotlanganlar"}
        link1={"Mukofotlanganlar"}
        link2={""}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="mb-6 flex items-center justify-end">
          <button
            onClick={showModal2}
            className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          >
            Rag'batlantirish qo'shish
          </button>
        </div>
        <div className="grid grid-cols-3 pl-8 gap-20 max-xl:grid-cols-2 max-md:grid-cols-1 max-md:gap-9">
          {data?.map((item) => (
            <div
              className="hover:scale-[1.02] transition ease-linear w-full"
              key={item?.id}
            >
              <Badge.Ribbon
                text={
                  // item?.items?.[0]?.is_state_award ? "Davlat mukofoti" : "!"
                  item?.items?.some((j) => j?.is_state_award == true)
                    ? "Davlat mukofoti"
                    : "!"
                }
                color="green"
              >
                <div className="border-[2px] border-green-500 w-full px-5 py-8 rounded-2xl flex justify-start items-center">
                  <Badge
                    count={item?.items?.length}
                    showZero
                    color="#2d8f06"
                    className="translate-x-[-3.25rem]"
                  >
                    <img
                      src={
                        item?.file?.url_1
                          ? imgUrl + item?.file?.url_1
                          : "https://www.w3schools.com/howto/img_avatar.png"
                      }
                      className="aspect-[3/4] object-cover object-center w-32 rounded-2xl max-w-[8rem] border-[2px] border-green-500"
                      alt="employee picture"
                    />
                  </Badge>
                  <div className="translate-x-[-2rem] flex flex-col justify-center items-start gap-3">
                    <p className="text-[var(--textBlack-color)] text-base font-bold">
                      {item?.full_name}
                    </p>
                    <p className="text-[var(--textGray-color)] text-sm">
                      {item?.items?.[0]?.type_of_encourage}
                    </p>
                    <button
                      onClick={() => {
                        showModal();
                        setdataModal(item?.items);
                      }}
                      className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded-xl text-center text-sm"
                    >
                      <SketchOutlined /> Batafsil
                    </button>
                  </div>
                </div>
              </Badge.Ribbon>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Barcha mukofotlari"
        open={openModal}
        onOk={showModal}
        onCancel={handleCancel}
        width={700}
        zIndex={1050}
        footer={""}
      >
        {dataModal?.map((item) => (
          <div
            key={item.id}
            className="mt-6 border-l-[2px] border-green-500 py-2 px-4 bg-gradient-to-r from-green-50"
          >
            <p className="text-[var(--textBlack-color)] text-base font-semibold">
              <span>Kim tomonidan </span> :{" "}
              <span className="text-[var(--text-color)]">{item?.by_whom}</span>
            </p>
            <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
              <span>Buyruq sanasi </span> :{" "}
              <span className="text-[var(--text-color)]">
                {getDateReverse(item?.encourage_date)}
              </span>
            </p>
            <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
              <span>Davlat mukofoti </span> :{" "}
              <span className="text-[var(--text-color)]">
                {item?.is_state_award ? "Davlat mukofoti" : "Yo'q"}
              </span>
            </p>
            <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
              <span>Buyruq raqami </span> :{" "}
              <span className="text-[var(--text-color)]">
                {item?.order_number}
              </span>
            </p>
            <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
              <span>Rag'batlantirish sababi </span> :{" "}
              <span className="text-[var(--text-color)]">
                {item?.reason_for_encourage}
              </span>
            </p>
            <p className="text-[var(--textBlack-color)] mt-2 text-base font-semibold">
              <span>Rag'batlantirish turi </span> :{" "}
              <span className="text-[var(--text-color)]">
                {item?.type_of_encourage}
              </span>
            </p>
          </div>
        ))}
      </Modal>
      <Modal
        title="Rag'batlantirish qo'shish"
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
          {/* Rag'batlantirish Sanasi (kun-oy-yil) */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Rag'batlantirish Sanasi (kun-oy-yil){" "}
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="encourage_date"
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
              name="order_number"
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
          {/* Rag'batlantirish turi */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Rag'batlantirish turi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="type_of_encourage"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Rag'batlantirish turini nomini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Rag'batlantirish sababi */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Rag'batlantirish sababi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="reason_for_encourage"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Rag'batlantirish sababini nomini kiriting"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          {/* Davlat mukofati sifatida qo'shilsin */}
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Davlat mukofati sifatida qo'shilsin
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="is_state_award"
              control={control}
              defaultValue={false}
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
