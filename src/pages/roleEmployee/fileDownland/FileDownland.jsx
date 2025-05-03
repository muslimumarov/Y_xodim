import {
  CheckCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FieldTimeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Pagination, Popover } from "antd";
import { Popconfirm } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useEffect } from "react";
import { useState } from "react";
import { getDateReverse } from "utils/idCreate";
import { errorMasseg, successMasseg } from "utils/toastify";

export const FileDownland = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `downloads/find/all?page=${currentPage}&limit=10&lang=uz`,
  });

  useEffect(() => {
    if (data?.items) {
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage]);

  //   pagination onchange bulganda
  const onShowSizeChange = (current) => {
    setcurrentPage(current);
  };

  const { mutate, isLoading: loadingName } = usePost();
  // malumotni uchirish
  const deleteConfirm = (id) => {
    mutate({
      url: `downloads/delete/${id}`,
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
  const downlandFile = (file) => {
    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${file}`;
    window.open(linkSource);
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Yuklangan fayllar"}
        link1={"Xodimlar"}
        link2={"Yuklangan fayllar"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="w-full h-max my-5 overflow-x-auto">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className="w-14 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  T/r
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Fayl nomi
                </th>
                <th className="w-44 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Status
                </th>
                <th className="w-44 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Sana
                </th>
                <th className="w-44 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Yuklash
                </th>
                <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="table-row-group align-middle border-inherit">
              {data?.items?.map((e, i) => {
                return (
                  <tr
                    className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                    key={i}
                  >
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {(currentPage - 1) * 10 + i + 1}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.comment}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.status == 1 ? (
                        <p className="border-green-500 border text-green-700 bg-green-50 rounded-md w-max py-1 px-2">
                          <CheckCircleOutlined /> Yakunlangan
                        </p>
                      ) : (
                        <div className="flex space-x-2 justify-start items-center h-max">
                          <div className="h-3 w-3 bg-[var(--text-color)] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-3 w-3 bg-[var(--text-color)] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-3 w-3 bg-[var(--text-color)] rounded-full animate-bounce"></div>
                          <div className="h-3 w-3 bg-[var(--text-color)] rounded-full animate-bounce [animation-delay:0.15s]"></div>
                          <div className="h-3 w-3 bg-[var(--text-color)] rounded-full animate-bounce [animation-delay:0.3s]"></div>
                          <div className="h-3 w-3 bg-[var(--text-color)] rounded-full animate-bounce [animation-delay:0.45s]"></div>
                        </div>
                      )}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <span className="border-violet-500 border text-violet-700 bg-violet-50 rounded-md w-max py-1 px-2">
                        {getDateReverse(e?.create_at?.split(" ")?.[0])}
                      </span>
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.status == 1 ? (
                        <button
                          onClick={() => downlandFile(e?.file)}
                          className="border-green-500 border text-green-700 bg-green-50 rounded-md w-max py-1 px-2"
                        >
                          <DownloadOutlined /> Yuklash
                        </button>
                      ) : (
                        <button className="border-yellow-500 border text-yellow-700 bg-yellow-50 rounded-md w-max py-1 px-2">
                          <FieldTimeOutlined /> Kutilmoqda
                        </button>
                      )}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Popover
                        placement="bottomRight"
                        content={
                          <div className="flex flex-col items-start justify-center">
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
        <div className="w-max mx-auto">
          <Pagination
            defaultCurrent={currentPage}
            total={totalPages * 10}
            showSizeChanger={false}
            onChange={onShowSizeChange}
          />
        </div>
      </div>
    </>
  );
};
