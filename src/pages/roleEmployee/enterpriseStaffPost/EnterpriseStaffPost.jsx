import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Image } from "antd";
import { Popover } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { Popconfirm } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { imgUrl } from "service";
import { errorMasseg, successMasseg } from "utils/toastify";

export const EnterpriseStaffPost = () => {
  const [editId, seteditId] = useState(-1);
  const { id } = useParams();
  const navigate = useNavigate();
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `position/position/${id}`,
  });
  //   Xodimlar toifasini
  const {
    data: { data: personal },
  } = useGet({
    url: `category/find/list?lang=uz`,
  });
  //   Xodimlar toifasini
  const {
    data: { data: clasification },
  } = useGet({
    url: `classification/find-list?page=1&limit=9999999999999999&lang=uz`,
  });
  //   Xodimlar toifasini Aj
  const {
    data: { data: clasificationAj },
  } = useGet({
    url: `my-classification/list`,
  });

  const { mutate, isLoading: loadingName } = usePost();

  // form
  const { control, handleSubmit, reset } = useForm();
  //   modal
  const [openModal, setOpenModal] = useState(false);
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
    resInput();
    seteditId(-1);
  };
  //malumotni yuborish
  const onSubmit = (form) => {
    if (editId != -1) {
      mutate({
        url: "position/update",
        method: "PUT",
        data: {
          id: editId,
          department_id: id,
          category_id: form.category_id,
          classification_id: form.classification_id,
          staff_full: form.staff_full,
          plan: +form.plan,
          aj_item_id: form.aj_item_id,
        },
        onSuccess: () => {
          refetch();
          handleCancel();
          successMasseg("Ma'lumot yangilandi!");
          resInput();
          seteditId(-1);
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    } else {
      mutate({
        url: "position/create",
        method: "POST",
        data: {
          department_id: id,
          category_id: form.category_id,
          classification_id: form.classification_id,
          staff_full: form.staff_full,
          plan: +form.plan,
          aj_item_id: form.aj_item_id,
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
  // malumotni uchirish
  const deleteConfirm = (id) => {
    mutate({
      url: `position/delete/${id}`,
      method: "DELETE",
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot o'chirildi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  //inputlani bushatish
  const resInput = () => {
    reset({
      staff_full: null,
      category_id: null,
      classification_id: null,
      plan: null,
      aj_item_id: null,
    });
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    reset({
      staff_full: item.staff_full,
      category_id: item.category?.id,
      classification_id: item.classification?.id,
      plan: item?.plan,
      aj_item_id: item.group_item?.id,
    });
    showModal();
  };
  // input selectlani filterlash
  const filterOption = (input, option) => {
    if (typeof option?.children === "string") {
      return (option?.children ?? "")
        .toLowerCase()
        .includes(input.toLowerCase());
    } else if (typeof option?.children?.props?.children === "string") {
      return (option?.children?.props?.children ?? "")
        .toLowerCase()
        .includes(input.toLowerCase());
    } else {
      if (+input) {
        return (
          (
            option?.children?.props?.children?.[1]?.props?.children + "" ?? ""
          ).indexOf(input) > -1
        );
      } else {
        return (option?.children?.props?.children?.[0]?.props?.children ?? "")
          .toLowerCase()
          .includes(input.toLowerCase());
      }
    }
  };
  // klasificatsiyalarni tartiblash
  const getClassifications = (obj) => {
    let newArr = [...obj?.names, ...obj?.group_classifications];
    return newArr?.map((clas) => {
      if (typeof clas === "object") {
        return (
          <>
            <Select.Option
              key={clas?.item?.id}
              value={clas?.item?.id}
              className="border border-solid border-[var(--borderWhite-color)] !rounded-none"
            >
              <div className="flex items-center justify-between">
                <p className="text-base">{clas?.item?.name}</p>
                <p className="text-sm">{clas?.item?.code}</p>
              </div>
            </Select.Option>
          </>
        );
      } else {
        return (
          <>
            <Select.Option
              key={clas}
              disabled
              className="border border-solid border-[var(--borderWhite-color)] !rounded-none"
            >
              <p className="text-red-500 w-full text-center">{clas}</p>
            </Select.Option>
          </>
        );
      }
    });
  };

  // klasificatsiyalarni tartiblash
  const getClassificationsAj = (obj) => {
    return (
      <>
        <Select.Option
          key={obj?.id}
          disabled
          className="border border-solid border-[var(--borderWhite-color)] !rounded-none"
        >
          <p className="text-red-500 w-full text-center">{obj?.name}</p>
        </Select.Option>
        {obj?.contents?.map((e) => (
          <Select.Option
            key={e?.id}
            value={e?.id}
            className="border border-solid border-[var(--borderWhite-color)] !rounded-none"
          >
            <div className="flex items-center justify-between">
              <p className="text-base">{e?.name}</p>
              <p className="text-sm">{e?.code}</p>
            </div>
          </Select.Option>
        ))}
      </>
    );
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Lavozim qo'shish"}
        link1={"Tashkilot"}
        link2={"Lavozim qo'shish"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="w-full flex justify-end  mb-6">
          <button
            onClick={showModal}
            type="button"
            className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          >
            Lavozim qo'shish
          </button>
        </div>
        <div className="w-full h-max my-5 overflow-x-auto">
          <div className="w-full min-w-[1100px] border-collapse border-spacing-0">
            {data?.map((e, i) => {
              return (
                <>
                  <div
                    className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)] w-full flex items-stretch justify-between mt-7 first:mt-0"
                    key={e?.id}
                  >
                    {/* id */}
                    <div className="tracking-normal w-10 leading-[130%] text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                      {i + 1}
                    </div>
                    {/* full_name */}
                    <div className="w-[calc(100%-2.5rem-5rem*7)] text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-start">
                      {e?.staff_full}
                    </div>
                    {/* K/r kodi */}
                    <div className="w-20 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-[13px] font-medium border-b border-solid border-[var(--borderWhite-color)]">
                          K/r kodi
                        </p>
                        <Popover
                          placement="leftTop"
                          content={
                            <p className="text-[var(--textBlack-color)] text-sm">
                              {e?.classification?.name}
                            </p>
                          }
                        >
                          <p className="text-base font-medium py-1 px-2 rounded-lg bg-[var(--textOpasity-color)] ">
                            {e?.classification?.code}
                          </p>
                        </Popover>
                      </div>
                    </div>
                    {/* K/r (Aj) kodi */}
                    <div className="w-28 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-[13px] font-medium border-b border-solid border-[var(--borderWhite-color)]">
                          K/r (Aj) kodi
                        </p>
                        <Popover
                          placement="leftTop"
                          content={
                            <p className="text-[var(--textBlack-color)] text-sm">
                              {e?.group_item?.name}
                            </p>
                          }
                        >
                          <p className="text-base font-medium py-1 px-2 rounded-lg bg-[var(--textOpasity-color)] ">
                            {e?.group_item?.code}
                          </p>
                        </Popover>
                      </div>
                    </div>
                    {/* Bo'sh ish o'rni */}
                    <div className="w-32 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-[13px] font-medium border-b border-solid border-[var(--borderWhite-color)]">
                          Bo'sh ish o'rni
                        </p>
                        <p className="text-base font-medium py-1 px-2 rounded-lg bg-[var(--textOpasity-color)] ">
                          {e?.vacant}
                        </p>
                      </div>
                    </div>
                    {/* Sverx */}
                    <div className="w-36 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-[13px] font-medium border-b border-solid border-[var(--borderWhite-color)]">
                          Ortiqcha ish o'rni
                        </p>
                        <p className="text-base font-medium py-1 px-2 rounded-lg bg-[var(--textOpasity-color)] ">
                          {e?.sverx}
                        </p>
                      </div>
                    </div>
                    {/* Plan */}
                    <div className="w-20 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-[13px] font-medium border-b border-solid border-[var(--borderWhite-color)]">
                          Reja
                        </p>
                        <p className="text-base font-medium py-1 px-2 rounded-lg bg-[var(--textOpasity-color)] ">
                          {e?.plan}
                        </p>
                      </div>
                    </div>
                    {/* Fakt */}
                    <div className="w-20 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-[13px] font-medium border-b border-solid border-[var(--borderWhite-color)]">
                          Fakt
                        </p>
                        <p className="text-base font-medium py-1 px-2 rounded-lg bg-[var(--textOpasity-color)] ">
                          {e?.fact}
                        </p>
                      </div>
                    </div>
                    {/* Xodim */}
                    <div className="w-20 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-[13px] font-medium border-b border-solid border-[var(--borderWhite-color)]">
                          Xodim
                        </p>
                        <p className="text-base font-medium py-1 px-2 rounded-lg bg-[var(--textOpasity-color)] ">
                          {e?.cadries_count}
                        </p>
                      </div>
                    </div>
                    {/* action */}
                    <div className="w-20 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
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
                    </div>
                  </div>
                  {e?.cadries?.map((j, k) => {
                    return (
                      <div
                        key={j?.id}
                        className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)] w-full flex items-stretch justify-between"
                      >
                        <div className="tracking-normal w-10 leading-[130%] text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                          {k + 1}
                        </div>
                        {/* full_name */}
                        <div className="w-[calc(100%-2.5rem-15rem-8rem-14rem)] text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-start">
                          <Image
                            width={40}
                            height={40}
                            className="object-cover object-center rounded-sm overflow-hidden"
                            src={
                              j?.file?.url_1
                                ? imgUrl + j?.file?.url_1
                                : "https://www.w3schools.com/howto/img_avatar.png"
                            }
                          />
                          <Popover
                            placement="right"
                            content={
                              <p className="text-[var(--textBlack-color)] text-sm">
                                Tahrirlash
                              </p>
                            }
                          >
                            <p
                              className="ml-5 cursor-pointer"
                              onClick={() =>
                                navigate(
                                  `/employe/employee/employee-edit/${j?.id}`
                                )
                              }
                            >
                              {j?.full_name}
                            </p>
                          </Popover>
                        </div>
                        {/* tatil */}
                        <div className="w-60 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                          <p
                            className="mr-2 w-max rounded-md py-1 px-2"
                            style={{
                              color: j?.labor_leave?.labor_type?.color,
                              backgroundColor:
                                j?.labor_leave?.labor_type?.bg_color,
                            }}
                          >
                            {j?.labor_leave?.labor_type?.key ||
                            j?.labor_leave?.labor_type?.title
                              ? `${j?.labor_leave?.labor_type?.key} -
                            ${j?.labor_leave?.labor_type?.title}`
                              : "-"}
                          </p>
                        </div>
                        {/* stavka */}
                        <div className="w-32 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                          {j?.user_position?.rate} stavka
                        </div>
                        {/* Asosiy */}
                        <div className="w-56 text-[var(--textBlack-color)] text-sm border border-solid border-[var(--borderWhite-color)] p-2 flex items-center justify-center">
                          {/* {e?.cadries_count} */}
                          <p
                            className="mr-2 w-max rounded-md py-1 px-2"
                            style={{
                              color: j?.user_position?.category_staff?.color,
                              backgroundColor:
                                j?.user_position?.category_staff?.bg_color,
                            }}
                          >
                            {j?.user_position?.category_staff?.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
        <Modal
          title="Lavozim qo'shish"
          open={openModal}
          onOk={showModal}
          onCancel={handleCancel}
          width={800}
          zIndex={1050}
          footer={""}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-5 mt-5"
          >
            {/* Xodimlar toifa*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Xodimlar toifa{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="category_id"
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
                    placeholder="Xodimlar toifani tanlang"
                  >
                    <Select.Option value="" disabled>
                      Xodimlar toifani tanlang
                    </Select.Option>
                    {personal?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Lavozimga mos klassifikatorni tanlang*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Lavozimga mos klassifikatorni tanlang
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="classification_id"
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
                    placeholder="Lavozimga mos klassifikatorni tanlangni tanlang"
                  >
                    <Select.Option value="" disabled>
                      Lavozimga mos klassifikatorni tanlangni tanlang
                    </Select.Option>
                    {clasification?.items?.map((obj) => {
                      return getClassifications(obj);
                    })}
                  </Select>
                )}
              />
            </div>
            {/* Lavozimga mos klassifikatorni (AJ) tanlang*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Lavozimga mos klassifikatorni (AJ) tanlang
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="aj_item_id"
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
                    placeholder="Lavozimga mos klassifikatorni tanlangni tanlang"
                  >
                    <Select.Option value="" disabled>
                      Lavozimga mos klassifikatorni (AJ) tanlangni tanlang
                    </Select.Option>
                    {clasificationAj?.map((obj) => {
                      return getClassificationsAj(obj);
                    })}
                  </Select>
                )}
              />
            </div>
            {/* To'liq shtat lavozim nomi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                To'liq shtat lavozim nomi{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="staff_full"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="To'liq shtat lavozim nomi"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Plan */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Plan{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="plan"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Plan"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <button
                disabled={loadingName}
                type="submit"
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                Saqlash
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};
