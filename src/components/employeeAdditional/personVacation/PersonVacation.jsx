import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Popconfirm } from "antd";
import { Popover } from "antd";
import { EmployeVacation } from "components/employeVacation";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getDateReverse } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";

export const PersonVacation = () => {
  const { id } = useParams();
  // -------------------- form
  const { mutate } = usePost();
  const {
    data: { data: data },
    refetch: refetch,
  } = useGet({
    url: `labor-leave/find-all/${id}`,
  });

  const [epmloyeEmployeVacationId1, setepmloyeEmployeVacationId1] =
    useState(null);
  const [edit, setedit] = useState(-1);

  const [dataedit, setdataedit] = useState(null);

  // malumotni uchirish daftar
  const deleteConfirm = (id) => {
    mutate({
      url: `labor-leave/delete/${id}`,
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
              Ta'tillar ma'lumotlari
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
                    Ta'til turi
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Qachondan
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Qachongacha
                  </th>
                  <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                    Ishga chiqish sanasi
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
                          {`${e?.medical_summary?.key} -
                            ${e?.medical_summary?.title}` || "-"}
                        </p>
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {getDateReverse(e?.start_date) || "-"}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {getDateReverse(e?.end_date) || "-"}
                      </td>
                      <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        {getDateReverse(e?.business_day_date) || "-"}
                      </td>
                      <td className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                        <Popover
                          placement="bottomRight"
                          content={
                            <div className="flex flex-col items-start justify-center">
                              <p
                                onClick={() => {
                                  setepmloyeEmployeVacationId1(id);
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
            <PlusOutlined /> Ta'tillar qo'shish
          </button>
        </div>
      )}
      <EmployeVacation
        epmloyeEmployeVacationId={epmloyeEmployeVacationId1}
        setepmloyeEmployeVacationId={setepmloyeEmployeVacationId1}
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
