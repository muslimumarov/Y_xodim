import { Switch } from "antd";
import { Select } from "antd";
import { Input } from "antd";
import { usePost } from "hooks";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { errorMasseg, successMasseg } from "utils/toastify";

export const MilitaryAccount = ({ data, militaryRank, refetch }) => {
  const { id } = useParams();
  // -------------------- form
  // Daftarga qo'shish --------------------------------------------------------------------------
  const { control, handleSubmit, reset } = useForm();
  const { mutate } = usePost();

  const inputsRef = useRef(null);
  const [inputref, setinputref] = useState(
    data?.employee?.account_group?.length > 0 ||
      data?.employee?.account_category?.length > 0 ||
      data?.employee?.composition?.length > 0 ||
      data?.employee?.xarbiy_hisobdagi_mutaxassisligi?.length > 0 ||
      data?.employee?.xarbiy_xizmatga_yaroqliligi?.length > 0 ||
      data?.employee?.xarbiy_mudofa_nomi?.length > 0 ||
      data?.employee?.maxsus_hisobda_turadi?.length > 0
  );
  //   click bulganda inputla ichiladi va yopiladi
  const inputsRefChange = () => {
    if (inputref) {
      inputsRef.current.style.maxHeight = "0px";
      setinputref(false);
    } else {
      inputsRef.current.style.maxHeight = `285px`;
      setinputref(true);
    }
  };

  useEffect(() => {
    if (data) {
      if (!inputref) {
        inputsRef.current.style.maxHeight = "0px";
      } else {
        inputsRef.current.style.maxHeight = `285px`;
      }

      reset({
        account_group: data?.employee?.account_group,
        account_category: data?.employee?.account_category,
        composition: data?.employee?.composition,
        militar_rank: data?.employee?.militar_rank,
        xarbiy_hisobdagi_mutaxassisligi:
          data?.employee?.xarbiy_hisobdagi_mutaxassisligi,
        xarbiy_xizmatga_yaroqliligi:
          data?.employee?.xarbiy_xizmatga_yaroqliligi,
        xarbiy_mudofa_nomi: data?.employee?.xarbiy_mudofa_nomi,
        maxsus_hisobda_turadi: data?.employee?.maxsus_hisobda_turadi,
      });
    }
  }, [data]);

  const onSubmit = (form) => {
    mutate({
      url: `employee-edit/employee-military/save`,
      method: "POST",
      data: {
        employee_id: id,
        account_group: form?.account_group,
        account_category: form?.account_category,
        composition: form?.composition,
        militar_rank: form?.militar_rank,
        xarbiy_hisobdagi_mutaxassisligi: form?.xarbiy_hisobdagi_mutaxassisligi,
        xarbiy_xizmatga_yaroqliligi: form?.xarbiy_xizmatga_yaroqliligi,
        xarbiy_mudofa_nomi: form?.xarbiy_mudofa_nomi,
        maxsus_hisobda_turadi: form?.maxsus_hisobda_turadi,
      },
      onSuccess: () => {
        successMasseg("Ma'lumot yangilandi !");
        refetch();
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
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
      <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
        <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5 flex items-center justify-start gap-7">
          <p className="text-sm text-[var(--textBlack-color)]">
            Harbiy hisob to'g'risidagi ma'lumot
          </p>
          <Switch
            checked={inputref}
            onChange={inputsRefChange}
            checkedChildren="Bor"
            unCheckedChildren="Yo'q"
            size="large"
            className="bg-red-600"
          />
        </div>
        <div
          ref={inputsRef}
          className="overflow-x-hidden ease-linear duration-500"
        >
          <div className="p-5 grid grid-cols-4 gap-5 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
            {/* Hisob guruhi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Hisob guruhi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="account_group"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Hisob guruhini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Hisob toifasi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Hisob toifasi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="account_category"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Hisob toifasini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Tarkibi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tarkibi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="composition"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tarkibini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Harbiy unvoni 1 */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Harbiy unvoni
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="militar_rank"
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
                    placeholder="Ma'lumotini tanlang"
                  >
                    {militaryRank?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Harbiy hisobdagi mutaxassisligi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Harbiy hisobdagi mutaxassisligi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="xarbiy_hisobdagi_mutaxassisligi"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Harbiy hisobdagi mutaxassisligini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Harbiy xizmatga yaroqliligi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Harbiy xizmatga yaroqliligi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="xarbiy_xizmatga_yaroqliligi"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Harbiy xizmatga yaroqliligini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Tuman mudofaa bo'limi nomi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tuman mudofaa bo'limi nomi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="xarbiy_mudofa_nomi"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tuman mudofaa bo'limi nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Maxsus hisobga turadi (№) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Maxsus hisobga turadi (№)
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="maxsus_hisobda_turadi"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Maxsus hisobga turadi (№)"
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
          </div>
        </div>
      </div>
    </form>
  );
};
