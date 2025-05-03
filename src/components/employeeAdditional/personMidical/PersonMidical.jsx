import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Popconfirm } from "antd";
import { Popover } from "antd";
import { EmployeMidical } from "components/employeMidical";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getDateReverse } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";

export const PersonMidical = () => {
  const { id } = useParams();
  // -------------------- form
  const { mutate } = usePost();
  const {
    data: { data: data },
    refetch: refetch,
  } = useGet({
    url: `medical-examination/find-all/${id}`,
  });

  const [epmloyeMedicalId1, setepmloyeMedicalId1] = useState(null);
  const [edit, setedit] = useState(-1);

  const [dataedit, setdataedit] = useState(null);

  // malumotni uchirish daftar
  const deleteConfirm = (id) => {
    mutate({
      url: `medical-examination/delete/${id}`,
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
  return (
    <div className="mt-7">
      {data?.length > 0 ? (
        <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
          <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5 flex items-center justify-between">
            <p className="text-sm text-[var(--textBlack-color)]">
              Tibbiy ko'rik ma'lumotlari
            </p>
          </div>
          <div className="w-full h-max p-5 overflow-x-auto">
            <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
              <thead className="table-header-group">
                <tr className="text-inherit table-row align-middle outline-0">
                  <th className="w-11 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    T/r
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Xulosa
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Izoh
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Oxirgi sana
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Keyingi sana
                  </th>
                  <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="table-row-group align-middle border-inherit">
                {data?.map((e, i) => {
                  return (
                    <tr
                      className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                      key={i}
                    >
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {i + 1}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        <p
                          className="mr-2 w-max rounded-md py-1 px-2"
                          style={{
                            color: e?.medical_summary?.color,
                            backgroundColor: e?.medical_summary?.bg_color,
                          }}
                        >
                          {e?.medical_summary?.name || "-"}
                        </p>
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {e?.comment || "-"}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {getDateReverse(e?.last_date) || "-"}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {getDateReverse(e?.next_date) || "-"}
                      </td>
                      <td className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        <Popover
                          placement="bottomRight"
                          content={
                            <div className="flex flex-col items-start justify-center">
                              <p
                                onClick={() => {
                                  setepmloyeMedicalId1(id);
                                  setedit(e?.id);
                                  setdataedit(e);
                                }}
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="w-full h-20 flex items-center justify-center border border-[var(--text-color)] border-dashed">
          <button className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm opacity-70 cursor-default">
            <PlusOutlined /> Tibbiy ko'rik qo'shish
          </button>
        </div>
      )}
      <EmployeMidical
        epmloyeMedicalId={epmloyeMedicalId1}
        setepmloyeMedicalId={setepmloyeMedicalId1}
        employe={true}
        refetch={refetch}
        edit={edit}
        setedit={setedit}
        dataedit={dataedit}
        setdataedit={setdataedit}
      />
    </div>
  );
};
