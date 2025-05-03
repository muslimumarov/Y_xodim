import { Select } from "antd";
import { Input } from "antd";
import { DatePicker } from "antd";
import { Modal } from "antd";
import { UploadMoreFile } from "components/uploadMoreFile";
import dayjs from "dayjs";
import { useGet, usePost } from "hooks";
import { useEffect } from "react";
import { memo } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getDateForm } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";

// eslint-disable-next-line react/display-name
export const EmployeVacation = memo(
  ({
    epmloyeEmployeVacationId,
    setepmloyeEmployeVacationId = () => {},
    employe,
    refetch = () => {},
    edit = -1,
    setedit,
    dataedit,
    setdataedit = () => {},
  }) => {
    // xodimga tatil qo'shish
    const {
      data: { data },
      isLoading: dataLoading,
    } = useGet({
      url: `employee/find/all?page=1&limit=1000000&lang=uz`,
    });
    // xodimga asos qushish
    const [descId, setdescId] = useState(null);
    const [descIdOpen, setdescIdOpen] = useState(false);
    const {
      data: { data: desc = [] },
      isLoading: descLoading,
    } = useGet({
      url: `labor-leave/find-desc/${descId}`,
      enabled: descId,
      onSuccess: (res) => {
        if (res?.data?.length > 0) {
          setdescIdOpen(true);
        } else {
          setdescIdOpen(false);
        }
      },
    });
    // file
    const [files, setfiles] = useState([]);
    const [files2, setfiles2] = useState([]);
    // xodimning tibbiy xulosasini olish
    const {
      data: { data: laborLeave },
    } = useGet({
      url: `labor-leave/find-all-types`,
    });
    // data
    const [isInterval, setisInterval] = useState(false);
    const [isOrderDate, setisOrderDate] = useState(false);
    //   modal
    const [openModal, setOpenModal] = useState(false);
    // modalni ochish
    const showModal = () => {
      setOpenModal(true);
    };
    // modalni yopish
    const handleCancel = () => {
      setOpenModal(false);
      setepmloyeEmployeVacationId(null);
      setisInterval(false);
      setisOrderDate(false);
      setdataedit(null);
    };
    useEffect(() => {
      if (epmloyeEmployeVacationId) {
        showModal();
        reset({
          user_id: employe ? epmloyeEmployeVacationId : null,
          labor_leave_item_id: null,
          order_number: null,
          order_date: null,
          start_date: null,
          end_date: null,
          business_day_date: null,
          interval_start_date: null,
          interval_end_date: null,
          description: null,
          day_count: null,
          desc_id: null,
        });
        setfiles([]);
        setfiles2([]);
      }
    }, [epmloyeEmployeVacationId]);

    useEffect(() => {
      reset({
        user_id: employe ? epmloyeEmployeVacationId : null,
        labor_leave_item_id: dataedit?.labor_leave_item_id
          ? dataedit?.labor_leave_item_id
          : null,
        description: dataedit?.description ? dataedit?.description : null,
        day_count: dataedit?.day_count ? dataedit?.day_count : null,
        desc_id: dataedit?.desc?.id ? dataedit?.desc?.id : null,
        start_date: dataedit?.start_date ? dayjs(dataedit?.start_date) : null,
        end_date: dataedit?.end_date ? dayjs(dataedit?.end_date) : null,
        order_date: dataedit?.order_date ? dayjs(dataedit?.order_date) : null,
        order_number: dataedit?.order_number ? dataedit?.order_number : null,
        interval_start_date: dataedit?.interval_start_date
          ? dayjs(dataedit?.interval_start_date)
          : null,
        interval_end_date: dataedit?.interval_end_date
          ? dayjs(dataedit?.interval_end_date)
          : null,
        business_day_date: dataedit?.business_day_date
          ? dayjs(dataedit?.business_day_date)
          : null,
      });
      setisInterval(dataedit?.labor_type?.is_interval ?? false);
      setisOrderDate(dataedit?.labor_type?.is_order_date ?? false);
      setdescId(dataedit?.labor_leave_item_id ?? null);
      if (dataedit?.file) {
        setfiles([
          {
            id: dataedit?.file?.id,
            url: dataedit?.file?.url_1,
            name: dataedit?.file?.name_1,
          },
        ]);
      }
      if (dataedit?.file_2) {
        setfiles2([
          {
            id: dataedit?.file_2?.id,
            url: dataedit?.file_2?.url_1,
            name: dataedit?.file_2?.name_1,
          },
        ]);
      }
    }, [dataedit]);

    const { mutate, isLoading } = usePost();
    // form
    const { control, handleSubmit, reset } = useForm();

    //malumotni yuborish
    const onSubmit = (form) => {
      if (edit != -1) {
        mutate({
          url: `labor-leave/update`,
          method: "PUT",
          data: {
            id: edit,
            user_id: form?.user_id,
            labor_leave_item_id: form?.labor_leave_item_id,
            description: form?.description,
            desc_id: descIdOpen ? form?.desc_id : "",
            day_count: form?.day_count,
            order_number: isOrderDate ? form?.order_number : "",
            order_date: isOrderDate
              ? form?.order_date
                ? getDateForm(form?.order_date)
                : ""
              : "",
            start_date: form?.start_date ? getDateForm(form?.start_date) : "",
            end_date: form?.end_date ? getDateForm(form?.end_date) : "",
            business_day_date: form?.business_day_date
              ? getDateForm(form?.business_day_date)
              : "",
            interval_start_date: isInterval
              ? form?.interval_start_date
                ? getDateForm(form?.interval_start_date)
                : ""
              : "",
            interval_end_date: isInterval
              ? form?.interval_end_date
                ? getDateForm(form?.interval_end_date)
                : ""
              : "",
            file_id: isOrderDate
              ? files?.length > 0
                ? files?.[files?.length - 1]?.id
                : ""
              : "",
            file_2_id: descIdOpen
              ? files2?.length > 0
                ? files2?.[files2?.length - 1]?.id
                : ""
              : "",
          },
          onSuccess: () => {
            successMasseg("Ma'lumot yangilandi !");
            handleCancel();
            resInput();
            refetch();
            setedit(-1);
          },
          onError: () => {
            errorMasseg("Xatolik?");
          },
        });
      } else {
        mutate({
          url: `labor-leave/create`,
          method: "POST",
          data: {
            user_id: form?.user_id,
            labor_leave_item_id: form?.labor_leave_item_id,
            description: form?.description,
            desc_id: descIdOpen ? form?.desc_id : "",
            day_count: form?.day_count,
            order_number: isOrderDate ? form?.order_number : "",
            order_date: isOrderDate
              ? form?.order_date
                ? getDateForm(form?.order_date)
                : ""
              : "",
            start_date: form?.start_date ? getDateForm(form?.start_date) : "",
            end_date: form?.end_date ? getDateForm(form?.end_date) : "",
            business_day_date: form?.business_day_date
              ? getDateForm(form?.business_day_date)
              : "",
            interval_start_date: isInterval
              ? form?.interval_start_date
                ? getDateForm(form?.interval_start_date)
                : ""
              : "",
            interval_end_date: isInterval
              ? form?.interval_end_date
                ? getDateForm(form?.interval_end_date)
                : ""
              : "",
            file_id: isOrderDate
              ? files?.length > 0
                ? files?.[files?.length - 1]?.id
                : ""
              : "",
            file_2_id: descIdOpen
              ? files2?.length > 0
                ? files2?.[files2?.length - 1]?.id
                : ""
              : "",
          },
          onSuccess: () => {
            successMasseg("Ma'lumot yangilandi!");
            resInput();
            refetch();
            handleCancel();
          },
          onError: () => {
            errorMasseg("Xatolik?");
          },
        });
      }
    };

    const resInput = () => {
      reset({
        user_id: null,
        labor_leave_item_id: null,
        order_number: null,
        order_date: null,
        start_date: null,
        end_date: null,
        business_day_date: null,
        interval_start_date: null,
        interval_end_date: null,
        description: null,
        day_count: null,
        desc_id: null,
      });
    };
    // input selectlani filterlash
    const filterOption = (input, option) => {
      return (option?.children ?? "")
        .toLowerCase()
        .includes(input.toLowerCase());
    };

    return (
      <>
        <Modal
          title="Ta'til qo'shish"
          open={openModal}
          onOk={showModal}
          onCancel={handleCancel}
          width={700}
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
                    allowClear
                    loading={dataLoading}
                    disabled={employe}
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Xodimni tanlang"
                  >
                    {data?.items?.map((e) => {
                      return (
                        <Select.Option
                          value={e?.id}
                          key={e?.id}
                          disabled={e?.role == "ROLE_CIVIL" ? true : false}
                        >
                          {e?.full_name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              />
            </div>
            {/* Ta'til turi*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ta'til turi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="labor_leave_item_id"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      let oneObj = laborLeave?.filter(
                        (obj) => obj.id == e
                      )?.[0];
                      setisInterval(oneObj?.is_interval || false);
                      setisOrderDate(oneObj?.is_order_date || false);
                      setdescId(e);
                    }}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Ta'til turini tanlang"
                  >
                    {laborLeave?.map((e) => {
                      return (
                        <Select.Option value={e?.id} key={e?.id}>
                          {e?.title}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              />
            </div>
            {/* Buyruq raqam sanasi */}
            {isOrderDate ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-full relative">
                  <p className="text-[var(--textBlack-color)] text-sm mx-auto bg-[var(--bgWhite-color)] relative px-1 z-20 w-max">
                    Buyruq (raqam, sanasi)
                  </p>
                  <div className="border-t-[1px] border-[var(--borderWhite-color)] border-dashed w-full absolute z-10 top-[10px]"></div>
                </div>
                <div className="grid grid-cols-2 gap-4 items-center justify-center">
                  {/* Buyruq raqami*/}
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
                          placeholder="Buyruq raqamini kiriting"
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
                </div>
              </div>
            ) : (
              ""
            )}
            {isOrderDate ? (
              <>
                {/* fayl yuklash */}
                <div className="w-full">
                  <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                    Buyruq faylini yuklash
                    <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                      *
                    </sup>
                  </label>
                  <UploadMoreFile files={files} setfiles={setfiles} />
                </div>
              </>
            ) : (
              ""
            )}
            {/* Qachongacha Qachondan */}
            <div className="grid grid-cols-2 gap-4 items-center justify-center">
              {/* Qachondan (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Qachondan (kun-oy-yil)
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
              {/* Qachongacha (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Qachongacha (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="end_date"
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
            <div className="grid grid-cols-2 gap-4 items-center justify-center">
              {/* Ishga chiqish sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Ishga chiqish sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="business_day_date"
                  control={control}
                  rules={{ required: true }}
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
              {/* Ta'til kuni */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Ta'til kuni
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="day_count"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Ta'til kuni"
                      size="large"
                      className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                    />
                  )}
                />
              </div>
            </div>
            {/* tatil davri */}
            {isInterval ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-full relative">
                  <p className="text-[var(--textBlack-color)] text-sm mx-auto bg-[var(--bgWhite-color)] relative px-1 z-20 w-max">
                    Ta'til davri
                  </p>
                  <div className="border-t-[1px] border-[var(--borderWhite-color)] border-dashed w-full absolute z-10 top-[10px]"></div>
                </div>
                {/* Qachongacha (Ta'til davri) Qachondan (Ta'til davri) */}
                <div className="grid grid-cols-2 gap-4 items-center justify-center">
                  {/* Qachondan (Ta'til davri) (kun-oy-yil) */}
                  <div className="w-full">
                    <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                      Qachondan (Ta'til davri) (kun-oy-yil)
                      <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                        *
                      </sup>
                    </label>
                    <Controller
                      name="interval_start_date"
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
                  {/* Qachongacha (Ta'til davri) (kun-oy-yil) */}
                  <div className="w-full">
                    <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                      Qachongacha (Ta'til davri) (kun-oy-yil)
                      <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                        *
                      </sup>
                    </label>
                    <Controller
                      name="interval_end_date"
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
            ) : (
              ""
            )}
            {descIdOpen && (
              <>
                {/* Berilgan tashkilot nomi (Asos)*/}
                <div className="w-full">
                  <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                    Berilgan tashkilot nomi (Asos)
                    <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                      *
                    </sup>
                  </label>
                  <Controller
                    name="desc_id"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        showSearch
                        allowClear
                        loading={descLoading}
                        optionFilterProp="children"
                        filterOption={filterOption}
                        className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                        size="large"
                        placeholder="Berilgan tashkilot nomi (Asos)ni tanlang"
                      >
                        {desc?.map((e) => {
                          return (
                            <Select.Option value={e?.id} key={e?.id}>
                              {e?.description}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    )}
                  />
                </div>
              </>
            )}
            {descIdOpen && (
              <>
                {/* fayl yuklash 2 */}
                <div className="w-full">
                  <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                    Hujjat faylini yuklash
                    <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                      *
                    </sup>
                  </label>
                  <UploadMoreFile files={files2} setfiles={setfiles2} />
                </div>
              </>
            )}

            {/* Ta'til berilish sababi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ta'til berilish sababi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="description"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input.TextArea
                    rows={3}
                    {...field}
                    placeholder="Ta'til berilish sababi"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <button
                disabled={isLoading}
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
  }
);
