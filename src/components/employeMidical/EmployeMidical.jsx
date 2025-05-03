import { Select } from "antd";
import { Input } from "antd";
import { DatePicker } from "antd";
import { Modal } from "antd";
import dayjs from "dayjs";
import { useGet, usePost } from "hooks";
import { useEffect } from "react";
import { memo } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getDateForm } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";

// eslint-disable-next-line react/display-name
export const EmployeMidical = memo(
  ({
    epmloyeMedicalId,
    setepmloyeMedicalId = () => {},
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
    // xodimning tibbiy xulosasini olish
    const {
      data: { data: summary },
    } = useGet({
      url: `medical-examination/find-all-summary`,
    });
    //   modal
    const [openModal, setOpenModal] = useState(false);
    // modalni ochish
    const showModal = () => {
      setOpenModal(true);
    };
    // modalni yopish
    const handleCancel = () => {
      setOpenModal(false);
      setepmloyeMedicalId(null);
      setdataedit(null);
    };
    useEffect(() => {
      if (epmloyeMedicalId) {
        showModal();
        reset({
          user_id: employe ? epmloyeMedicalId : null,
          medical_summary_id: null,
          comment: null,
          next_date: null,
          last_date: null,
        });
      }
    }, [epmloyeMedicalId]);

    useEffect(() => {
      reset({
        user_id: employe ? epmloyeMedicalId : null,
        medical_summary_id: dataedit?.medical_summary?.id
          ? dataedit?.medical_summary?.id
          : null,
        comment: dataedit?.comment ? dataedit?.comment : null,
        next_date: dataedit?.next_date ? dayjs(dataedit?.next_date) : null,
        last_date: dataedit?.last_date ? dayjs(dataedit?.last_date) : null,
      });
    }, [dataedit]);

    const { mutate, isLoading } = usePost();
    // form
    const { control, handleSubmit, reset } = useForm();

    //malumotni yuborish
    const onSubmit = (form) => {
      if (edit != -1) {
        mutate({
          url: `medical-examination/update`,
          method: "PUT",
          data: {
            id: edit,
            user_id: form?.user_id,
            medical_summary_id: form?.medical_summary_id,
            comment: form?.comment,
            next_date: form?.next_date ? getDateForm(form?.next_date) : "",
            last_date: form?.last_date ? getDateForm(form?.last_date) : "",
          },
          onSuccess: () => {
            handleCancel();
            resInput();
            refetch();
            successMasseg("Ma'lumot yangilandi !");
            setedit(-1);
          },
          onError: () => {
            errorMasseg("Xatolik?");
          },
        });
      } else {
        mutate({
          url: `medical-examination/create`,
          method: "POST",
          data: {
            user_id: form?.user_id,
            medical_summary_id: form?.medical_summary_id,
            comment: form?.comment,
            next_date: form?.next_date ? getDateForm(form?.next_date) : "",
            last_date: form?.last_date ? getDateForm(form?.last_date) : "",
          },
          onSuccess: () => {
            resInput();
            refetch();
            handleCancel();
            successMasseg("Ma'lumot yangilandi!");
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
        medical_summary_id: null,
        comment: null,
        next_date: null,
        last_date: null,
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
          title=" Tibbiy ko'rik hulosasini qo'shish"
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
                        <Select.Option value={e?.id} key={e?.id}>
                          {e?.full_name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              />
            </div>
            {/* Tibbiy xulosa*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tibbiy xulosa
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="medical_summary_id"
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
                    placeholder="Tibbiy xulosani tanlang"
                  >
                    {summary?.map((e) => {
                      return (
                        <Select.Option value={e?.id} key={e?.id}>
                          {e?.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              />
            </div>
            {/* sana */}
            <div className="grid grid-cols-2 gap-4 items-center justify-center">
              {/* Oxirgi o'tgan sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Oxirgi o'tgan sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="last_date"
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
              {/* Keyingi o'tish sanasi (kun-oy-yil) */}
              <div className="w-full">
                <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                  Keyingi o'tish sanasi (kun-oy-yil)
                  <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                    *
                  </sup>
                </label>
                <Controller
                  name="next_date"
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
            {/* Izoh*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Izoh
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="comment"
                control={control}
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
