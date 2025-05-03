import { Modal } from "antd";
import { Select } from "antd";
import { Input } from "antd";
import { Popover } from "antd";
import { usePost } from "hooks";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getDateReverse, getFullDateNow } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";

export const GetMonths = ({ month, monthName, refetch }) => {
  const [week, setweek] = useState([]);
  const [active, setactive] = useState(null);
  const [nowDate, setnowDate] = useState(getFullDateNow());

  const { mutate, isLoading: loadingName } = usePost();
  // form
  const { control, handleSubmit, reset } = useForm();
  //   modal
  const [openModal, setOpenModal] = useState(false);
  // modalni ochish
  const showModal = (date, data) => {
    let arrDate = date?.split("-");
    let arrNowDate = nowDate?.split(".");
    if (arrDate?.[0] == arrNowDate?.[0]) {
      if (arrDate?.[1] > arrNowDate?.[1]) {
        setactive(date);
        setOpenModal(true);
      } else if (arrDate?.[1] == arrNowDate?.[1]) {
        if (arrDate?.[2] >= arrNowDate?.[2]) {
          setactive(date);
          setOpenModal(true);
        }
      }
    } else if (arrDate?.[0] > arrNowDate?.[0]) {
      setactive(date);
      setOpenModal(true);
    }
    reset({
      comment: data?.comment || null,
      work_result_type: data?.workResultType || null,
    });
  };
  // modalni yopish
  const handleCancel = () => {
    setactive(null);
    setOpenModal(false);
    resInput();
  };
  //malumotni yuborish
  const onSubmit = (form) => {
    mutate({
      url: "work-year-calendar/set-holiday",
      method: "POST",
      data: {
        day: active?.split("-")?.[2] * 1,
        month: active?.split("-")?.[1] * 1,
        year: active?.split("-")?.[0] * 1,
        comment: form?.comment,
        work_result_type: form?.work_result_type,
      },
      onSuccess: () => {
        resInput();
        handleCancel();
        refetch();
        successMasseg("Ma'lumot yangilandi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  //inputlani bushatish
  const resInput = () => {
    reset();
  };

  useLayoutEffect(() => {
    setweek([]);
    if (month[0]?.week == 0) {
      setweek([1, 2, 3, 4, 5, 6]);
    } else {
      for (let i = 1; i < month[0]?.week; i++) {
        setweek((ell) => [...ell, i]);
      }
    }
  }, []);
  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };

  return (
    <>
      <div className="border border-solid border-[var(--borderWhite-color)]">
        <div className="p-3 flex items-center justify-center bg-[var(--text-color)]">
          <p className="text-sm text-white">{monthName}</p>
        </div>
        {/* oy */}
        <div>
          {/* hafta */}
          <div className="grid grid-cols-7">
            <p className="flex items-center justify-center py-2 font-semibold text-xs text-[var(--textBlack-color)]">
              Du
            </p>
            <p className="flex items-center justify-center py-2 font-semibold text-xs text-[var(--textBlack-color)]">
              Se
            </p>
            <p className="flex items-center justify-center py-2 font-semibold text-xs text-[var(--textBlack-color)]">
              Cho
            </p>
            <p className="flex items-center justify-center py-2 font-semibold text-xs text-[var(--textBlack-color)]">
              Pa
            </p>
            <p className="flex items-center justify-center py-2 font-semibold text-xs text-[var(--textBlack-color)]">
              Ju
            </p>
            <p className="flex items-center justify-center py-2 font-semibold text-xs text-[var(--textBlack-color)]">
              Sha
            </p>
            <p className="flex items-center justify-center py-2 font-semibold text-xs text-[var(--textBlack-color)]">
              Ya
            </p>
          </div>
          {/* oy kuni */}
          <div className="grid grid-cols-7">
            {week?.map((e, i) => (
              <p key={i}></p>
            ))}
            {month?.map((e, i) => (
              <Popover key={i} placement="right" content={e?.comment}>
                <p
                  onClick={() => showModal(e?.date, e)}
                  className={`flex items-center justify-center py-2 text-xs text-[var(--textBlack-color)] hover:bg-slate-200 cursor-pointer ${
                    e?.workResultType == "i"
                      ? "bg-transparent text-[var(--textBlack-color)] font-medium"
                      : e?.workResultType == "d"
                      ? "bg-red-100 text-red-600 font-semibold"
                      : e?.workResultType == "bo"
                      ? "bg-yellow-100 text-yellow-600 font-semibold"
                      : e?.workResultType == "b"
                      ? "bg-green-100 text-green-600 font-semibold"
                      : ""
                  }`}
                >
                  {e?.day}
                </p>{" "}
              </Popover>
            ))}
          </div>
        </div>
      </div>
      <Modal
        title={getDateReverse(active)}
        open={openModal}
        onOk={showModal}
        onCancel={handleCancel}
        zIndex={1050}
        footer={""}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-5 mt-5"
        >
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Dam olish sababi
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
                  placeholder="Dam olish sababi"
                  size="large"
                  className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                />
              )}
            />
          </div>
          <div className="w-full">
            <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
              Dam olish nomi
              <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                *
              </sup>
            </label>
            <Controller
              name="work_result_type"
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
                  placeholder="Dam olish nomi"
                >
                  <Select.Option value="d">D - dam olish kuni</Select.Option>
                  <Select.Option value="i">I - ish kuni</Select.Option>
                  <Select.Option value="bo">
                    B/o - Bayramdan oldingi ish kuni
                  </Select.Option>
                  <Select.Option value="b">B - bayram kuni</Select.Option>
                </Select>
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
    </>
  );
};
