import {
  BankOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
  FileSyncOutlined,
  GlobalOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import { NAQSH } from "assets/imgs";
import { DownlandModal, Loading } from "components";
import { useGet } from "hooks";
import { useState } from "react";
import { imgUrl } from "service";
import { getDateReverse } from "utils/idCreate";

export const EmployeSee = ({ seeEpmloye, handleCancel }) => {
  //   shaxsiy malumotlrni olib kelish
  const {
    data: { data },
    isLoading,
  } = useGet({
    url: `employee-edit/view/${seeEpmloye}`,
    enabled: seeEpmloye,
  });
  //  Oliygoh Malumotlarni olib kelish
  const {
    data: { data: university },
  } = useGet({
    url: `university-information/find-all/${seeEpmloye}`,
    enabled: seeEpmloye,
  });
  //   Tug'ilgan viloyati olish
  const {
    data: { data: regionLive },
  } = useGet({
    url: `employee/filter/region/${data?.employee?.user_live_state_id}?lang=uz`,
    enabled: data?.employee?.user_live_state_id,
  });
  // bu yerdan mehnat faolyati olinadi
  const [data1, setdata1] = useState([]);
  const { isSuccess: isSuccess1 } = useGet({
    url: `employee-labor-activity/work/${seeEpmloye}`,
    enabled: seeEpmloye,
    onSuccess: (data) => {
      setdata1(data?.data);
    },
    onError: () => {
      setdata1([]);
    },
  });
  // bu yerdan yaqin qarindosghlari olinadi
  const [data2, setdata2] = useState({});
  const { isSuccess: isSuccess2 } = useGet({
    url: `employee-relative/relative/${seeEpmloye}`,
    enabled: seeEpmloye,
    onSuccess: (data) => {
      setdata2(data?.data);
    },
    onError: () => {
      setdata2({});
    },
  });
  // bu yerdan Tibbiy kurik olinadi
  const [data4, setdata4] = useState([]);
  const { isSuccess: isSuccess4 } = useGet({
    url: `medical-examination/find-all/${seeEpmloye}`,
    enabled: seeEpmloye,
    onSuccess: (data) => {
      setdata4(data?.data);
    },
    onError: () => {
      setdata4([]);
    },
  });
  // bu yerdan tatil malumotkari olinadi
  const [data5, setdata5] = useState([]);
  const { isSuccess: isSuccess5 } = useGet({
    url: `labor-leave/find-all/${seeEpmloye}`,
    enabled: seeEpmloye,
    onSuccess: (data) => {
      setdata5(data?.data);
    },
    onError: () => {
      setdata5([]);
    },
  });
  // bu yerdan rabatlantirish olinadi
  const [data6, setdata6] = useState([]);
  const { isSuccess: isSuccess6 } = useGet({
    url: `encourage/find-all/${seeEpmloye}`,
    enabled: seeEpmloye,
    onSuccess: (data) => {
      setdata6(data?.data);
    },
    onError: () => {
      setdata6([]);
    },
  });
  // bu yerdan intizomiy jazo malumotlari olinadi
  const [data7, setdata7] = useState([]);
  const { isSuccess: isSuccess7 } = useGet({
    url: `disciplinary-action/find-all/${seeEpmloye}`,
    enabled: seeEpmloye,
    onSuccess: (data) => {
      setdata7(data?.data);
    },
    onError: () => {
      setdata7([]);
    },
  });

  //   harbiy xizmat
  const {
    data: { data: militaryRank },
  } = useGet({
    url: `military-titles/find/all`,
  });

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="px-8 py-5 relative max-md:px-2 max-md:py-2">
        <img
          src={NAQSH}
          alt=""
          className="absolute top-[-20px] right-[-24px] opacity-10 object-cover object-center"
        />
        {/* rasm va buttonlar */}
        <div className="flex items-start justify-between relative z-10 max-md:flex-col-reverse gap-5">
          <div className="flex items-center justify-start gap-10 max-sm:flex-col">
            <div>
              <img
                src={
                  data?.employee?.file?.url_1
                    ? imgUrl + data?.employee?.file?.url_1
                    : "https://www.w3schools.com/howto/img_avatar.png"
                }
                width={140}
                height={190}
                className="w-[140px] h-[190px] object-cover object-center rounded-md relative z-10"
                alt="logo"
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-1">
              <h3 className="text-xl font-semibold text-[var(--text-color)]">
                {data?.employee?.full_name || "-"}
              </h3>
              <p className="mt-4 text-base text-[var(--textBlack-color)]">
                <span className="font-bold">JSHSHIR:</span>{" "}
                {data?.employee?.pinfl || "-"}
              </p>
              <p className=" text-base font-medium text-[var(--textBlack-color)]">
                <span className="font-bold">Bo‘lim nomi:</span>{" "}
                {data?.employee?.positions?.map((e, i) => (
                  <span key={e?.id} className="mr-2">
                    {i > 0 ? ", " : ""} {e?.department?.name}
                  </span>
                )) || "-"}
              </p>
              <p className="text-base font-medium text-[var(--textBlack-color)]">
                <span className="font-bold">Lavozim nomi:</span>{" "}
                {data?.employee?.positions?.map((e, i) => (
                  <span key={e?.id} className="mr-2">
                    {i > 0 ? ", " : ""} {e?.position?.staff_full}
                  </span>
                )) || "-"}
              </p>
              <p className="text-base font-medium text-[var(--textBlack-color)]">
                <span className="font-bold">Lavozim sanasi:</span>{" "}
                {getDateReverse(data?.employee?.positions?.[0]?.start_date) ||
                  "-"}
              </p>
            </div>
          </div>
          <div className="flex items-start justify-end gap-5">
            <button className="w-max py-1 px-3 text-[#3165cb] bg-[#dee9ff] border border-[#3165cb] rounded text-center text-xl">
              <FileSyncOutlined />
            </button>
            <DownlandModal
              link={`employee-edit/download/docx/${seeEpmloye}`}
              text={
                <p className="w-max py-1 px-3 text-[#61ab66] bg-[#e4fced] border border-[#61ab66] rounded text-center text-xl cursor-pointer">
                  <DownloadOutlined />
                </p>
              }
            />
            <DownlandModal
              link={`employee-edit/download/t2/${seeEpmloye}`}
              text={
                <p className="w-max py-1 px-3 text-[#61ab66] bg-[#e4fced] border border-[#61ab66] rounded text-center text-xl cursor-pointer">
                  T2
                </p>
              }
            />
            <button
              onClick={handleCancel}
              className="w-max py-1 px-3 text-red-500 bg-red-100 border border-red-500 rounded text-center text-xl"
            >
              <CloseCircleOutlined />
            </button>
          </div>
        </div>
        {/* tugilgan sana va qisqacha malumotlar */}
        <div className="grid grid-cols-4 gap-6 my-8 relative z-10 max-md:grid-cols-2 max-sm:grid-cols-1">
          {/* ugilgan kun */}
          <div className="border border-solid border-[var(--borderWhite-color)] rounded-md py-2 px-4 flex justify-start items-center gap-5">
            <p className="text-3xl text-[var(--text-color)]">
              <CalendarOutlined />
            </p>
            <div className="flex flex-col justify-center items-start">
              <p className="text-sm leading-[18px] text-[var(--textGray-color)]">
                Tug'ilgan sana
              </p>
              <p className="text-sm leading-[18px] text-[var(--textBlack-color)] font-semibold">
                {getDateReverse(data?.employee?.birth_date) || "-"}
              </p>
            </div>
          </div>
          {/* Ma'lumoti */}
          <div className="border border-solid border-[var(--borderWhite-color)] rounded-md py-2 px-4 flex justify-start items-center gap-5">
            <p className="text-3xl text-[var(--text-color)]">
              <BankOutlined />
            </p>
            <div className="flex flex-col justify-center items-start">
              <p className="text-sm leading-[18px] text-[var(--textGray-color)]">
                Ma'lumoti
              </p>
              <p className="text-sm leading-[18px] text-[var(--textBlack-color)] font-semibold">
                {data?.educations?.filter(
                  (e) => e?.id == data?.employee?.user_education_id
                )?.[0]?.name || "-"}
              </p>
            </div>
          </div>
          {/* Telefon raqami */}
          <div className="border border-solid border-[var(--borderWhite-color)] rounded-md py-2 px-4 flex justify-start items-center gap-5">
            <p className="text-3xl text-[var(--text-color)]">
              <PhoneOutlined />
            </p>
            <div className="flex flex-col justify-center items-start">
              <p className="text-sm leading-[18px] text-[var(--textGray-color)]">
                Telefon raqami
              </p>
              <p className="text-sm leading-[18px] text-[var(--textBlack-color)] font-semibold">
                {data?.employee?.phone_number || "-"}
              </p>
            </div>
          </div>
          {/* Millati */}
          <div className="border border-solid border-[var(--borderWhite-color)] rounded-md py-2 px-4 flex justify-start items-center gap-5">
            <p className="text-3xl text-[var(--text-color)]">
              <GlobalOutlined />
            </p>
            <div className="flex flex-col justify-center items-start">
              <p className="text-sm leading-[18px] text-[var(--textGray-color)]">
                Millati
              </p>
              <p className="text-sm leading-[18px] text-[var(--textBlack-color)] font-semibold">
                {data?.nationalities?.filter(
                  (e) => e?.id == data?.employee?.nationality_id
                )?.[0]?.name || "-"}
              </p>
            </div>
          </div>
        </div>
        {/* mehnat faoliyati tab */}
        <Tabs
          defaultActiveKey="1"
          className="tab-employeesee"
          items={[
            {
              key: "1",
              label: <p className="text-sm">Mehnat faoliyati</p>,
              children: (
                <>
                  {isSuccess1 && data1?.length > 0 ? (
                    <div className="w-full h-max overflow-x-auto">
                      <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border-2 border-solid border-white">
                        <thead className="table-header-group">
                          <tr className="text-inherit table-row align-middle outline-0 bg-[var(--text-color)]">
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Qachondan
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Qachongacha
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Lavozim
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-row-group align-middle border-inherit">
                          {data1?.map((e, i) => {
                            return (
                              <tr
                                className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]"
                                key={i}
                              >
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {getDateReverse(e?.start_date) || "-"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {getDateReverse(e?.end_date) ||
                                    "Hozirgi vaqtgacha"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.staff_name || "-"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <section className="py-10 bg-white h-max rounded-2xl flex items-center justify-center flex-col">
                      <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] w-full bg-no-repeat h-[400px] bg-center">
                        <h1 className="text-center text-4xl font-bold">
                          Ma'lumot topilmadi!
                        </h1>
                      </div>
                    </section>
                  )}
                </>
              ),
            },
            {
              key: "2",
              label: <p className="text-sm">Yaqin qarindoshlari</p>,
              children: (
                <>
                  {isSuccess2 && data2?.cadryRelatives?.length > 0 ? (
                    <div className="w-full h-max overflow-x-auto">
                      <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border-2 border-solid border-white">
                        <thead className="table-header-group">
                          <tr className="text-inherit table-row align-middle outline-0 bg-[var(--text-color)]">
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Qarindoshligi
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              F.I.SH
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Tug'ilgan yili
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Tug'ilgan joyi
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Kasbi
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Yashash manzili
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-row-group align-middle border-inherit">
                          {data2?.cadryRelatives?.map((e, i) => {
                            return (
                              <tr
                                className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]"
                                key={i}
                              >
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.relative_id?.name || "-"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.full_name || "-"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {getDateReverse(e?.birthday) || "-"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.address || "-"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.job_name || "-"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.current_address || "-"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <section className="py-10 bg-white h-max rounded-2xl flex items-center justify-center flex-col">
                      <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] w-full bg-no-repeat h-[400px] bg-center">
                        <h1 className="text-center text-4xl font-bold">
                          Ma'lumot topilmadi!
                        </h1>
                      </div>
                    </section>
                  )}
                </>
              ),
            },
            {
              key: "3",
              label: <p className="text-sm">Umumiy ma'lumoti</p>,
              children: (
                <div className="w-full h-max overflow-x-auto">
                  <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border-2 border-solid border-white">
                    <tbody className="table-row-group align-middle border-inherit">
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="w-[300px] tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Yashash davlati
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {data?.states?.filter(
                            (e) => e?.id == data?.employee?.user_live_state_id
                          )?.[0]?.name || "-"}
                        </td>
                      </tr>
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="w-[300px] tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Yashash viloyati
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {regionLive?.filter(
                            (e) => e?.id == data?.employee?.user_live_region_id
                          )?.[0]?.name || "-"}
                        </td>
                      </tr>
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="w-[300px] tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Yashash manzili
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {data?.employee?.user_live_address || "-"}
                        </td>
                      </tr>
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Oliygoh
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {university?.map((e, i) => (
                            <p key={e?.id}>
                              {i + 1} - {e?.education_name || "-"}
                            </p>
                          )) || "-"}
                        </td>
                      </tr>
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Mutaxassisligi
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {university?.map((e, i) => (
                            <p key={e?.id}>
                              {i + 1} - {e?.specialty || "-"}
                            </p>
                          )) || "-"}
                        </td>
                      </tr>
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Chet tillari
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {data?.languages
                            ?.filter((e) =>
                              data?.employee?.languages?.includes(e?.id)
                            )
                            ?.map((e, i) => (
                              <span key={e?.id}>
                                {i > 0 ? ", " : ""}
                                {e?.name}
                              </span>
                            )) || "-"}
                        </td>
                      </tr>
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Ilmiy  unvon
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {data?.academictitlies?.filter(
                            (e) =>
                              e?.id == data?.employee?.user_academictitlies_id
                          )?.[0]?.name || "-"}
                        </td>
                      </tr>
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Ilmiy  daraja
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {data?.academicdegree?.filter(
                            (e) =>
                              e?.id == data?.employee?.user_academic_degree_id
                          )?.[0]?.name || "-"}
                        </td>
                      </tr>
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Harbiy unvoni
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {militaryRank?.filter(
                            (e) => e?.id == data?.employee?.militar_rank
                          )?.[0]?.name || "-"}
                        </td>
                      </tr>
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Partiyaviyligi
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {data?.parties?.filter(
                            (e) => e?.id == data?.employee?.user_parties_id
                          )?.[0]?.name || "-"}
                        </td>
                      </tr>
                      <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Saylangan organlarga a'zoligi
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          {data?.employee?.elected_body || "-"}
                        </td>
                      </tr>
                      {/* <tr className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]">
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                          Deputatligi
                        </td>
                        <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center"></td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              ),
            },
            {
              key: "4",
              label: <p className="text-sm">Tibbiy ko'rik ma'lumoti</p>,
              children: (
                <>
                  {isSuccess4 && data4?.length > 0 ? (
                    <div className="w-full h-max overflow-x-auto">
                      <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border-2 border-solid border-white">
                        <thead className="table-header-group">
                          <tr className="text-inherit table-row align-middle outline-0 bg-[var(--text-color)]">
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Xulosa
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Izoh
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Oxirgi sana
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Keyingi sana
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-row-group align-middle border-inherit">
                          {data4?.map((e, i) => {
                            return (
                              <tr
                                className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]"
                                key={i}
                              >
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  <p
                                    className="w-max rounded-md py-1 px-2 mx-auto"
                                    style={{
                                      color: e?.medical_summary?.color,
                                      backgroundColor:
                                        e?.medical_summary?.bg_color,
                                    }}
                                  >
                                    {e?.medical_summary?.name || "-"}
                                  </p>
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.comment || "-"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {getDateReverse(e?.last_date) || "-"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {getDateReverse(e?.next_date) || "-"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <section className="py-10 bg-white h-max rounded-2xl flex items-center justify-center flex-col">
                      <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] w-full bg-no-repeat h-[400px] bg-center">
                        <h1 className="text-center text-4xl font-bold">
                          Ma'lumot topilmadi!
                        </h1>
                      </div>
                    </section>
                  )}
                </>
              ),
            },
            {
              key: "5",
              label: <p className="text-sm">Ta'til ma'lumoti</p>,
              children: (
                <>
                  {isSuccess5 && data5?.length > 0 ? (
                    <div className="w-full h-max overflow-x-auto">
                      <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border-2 border-solid border-white">
                        <thead className="table-header-group">
                          <tr className="text-inherit table-row align-middle outline-0 bg-[var(--text-color)]">
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Ta'til turi
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Qachondan
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Qachongacha
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Ishga chiqish sanasi
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-row-group align-middle border-inherit">
                          {data5?.map((e, i) => {
                            return (
                              <tr
                                className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]"
                                key={i}
                              >
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  <p
                                    className="mx-auto w-max rounded-md py-1 px-2"
                                    style={{
                                      color: e?.medical_summary?.color,
                                      backgroundColor:
                                        e?.medical_summary?.bg_color,
                                    }}
                                  >
                                    {e?.medical_summary?.key ||
                                    e?.medical_summary?.title
                                      ? `${e?.medical_summary?.key} -
                            ${e?.medical_summary?.title}`
                                      : "-"}
                                  </p>
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {getDateReverse(e?.start_date) || "-"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {getDateReverse(e?.end_date) || "-"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {getDateReverse(e?.business_day_date) || "-"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <section className="py-10 bg-white h-max rounded-2xl flex items-center justify-center flex-col">
                      <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] w-full bg-no-repeat h-[400px] bg-center">
                        <h1 className="text-center text-4xl font-bold">
                          Ma'lumot topilmadi!
                        </h1>
                      </div>
                    </section>
                  )}
                </>
              ),
            },
            {
              key: "6",
              label: <p className="text-sm">Rag'batlantirishlar</p>,
              children: (
                <>
                  {isSuccess6 && data6?.length > 0 ? (
                    <div className="w-full h-max overflow-x-auto">
                      <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border-2 border-solid border-white">
                        <thead className="table-header-group">
                          <tr className="text-inherit table-row align-middle outline-0 bg-[var(--text-color)]">
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Kim tomonidan
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Buyruq sanasi
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Davlat mukofoti
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Buyruq raqami
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Rag'batlantirish sababi
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Rag'batlantirish turi
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-row-group align-middle border-inherit">
                          {data6?.map((e, i) => {
                            return (
                              <tr
                                className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]"
                                key={i}
                              >
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.by_whom}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {getDateReverse(e?.encourage_date)}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.is_state_award
                                    ? "Davlat mukofoti"
                                    : "Yo'q"}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.order_number}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.reason_for_encourage}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.type_of_encourage}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <section className="py-10 bg-white h-max rounded-2xl flex items-center justify-center flex-col">
                      <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] w-full bg-no-repeat h-[400px] bg-center">
                        <h1 className="text-center text-4xl font-bold">
                          Ma'lumot topilmadi!
                        </h1>
                      </div>
                    </section>
                  )}
                </>
              ),
            },
            {
              key: "7",
              label: <p className="text-sm">Intizomiy jazolar</p>,
              children: (
                <>
                  {isSuccess7 && data7?.length > 0 ? (
                    <div className="w-full h-max overflow-x-auto">
                      <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border-2 border-solid border-white">
                        <thead className="table-header-group">
                          <tr className="text-inherit table-row align-middle outline-0 bg-[var(--text-color)]">
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Kim tomonidan
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Buyruq sanasi
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Buyruq raqami
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Intizomiy jazo sababi
                            </th>
                            <th className="tracking-normal font-medium leading-[130%] text-white text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                              Intizomiy jazo turi
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-row-group align-middle border-inherit">
                          {data7?.map((e, i) => {
                            return (
                              <tr
                                className="ease-linear duration-300 odd:bg-[var(--textOpasity-color)]"
                                key={i}
                              >
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.by_whom}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {getDateReverse(e?.punishment_date)}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.punishment_number}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.reason_for_punishment}
                                </td>
                                <td className="tracking-normal font-medium leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border-2 border-solid border-white p-2 text-center">
                                  {e?.type_of_punishment}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <section className="py-10 bg-white h-max rounded-2xl flex items-center justify-center flex-col">
                      <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] w-full bg-no-repeat h-[400px] bg-center">
                        <h1 className="text-center text-4xl font-bold">
                          Ma'lumot topilmadi!
                        </h1>
                      </div>
                    </section>
                  )}
                </>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};
