import { CheckCircleOutlined, CopyOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { Popover } from "antd";
import { Image, Pagination } from "antd";
import { Input } from "antd";
import { Breadcrumb, Loading } from "components";
import dayjs from "dayjs";
import { useGet } from "hooks";
import { useEffect } from "react";
import { useState } from "react";
import { imgUrl } from "service";
import { getDateReverse } from "utils/idCreate";

export const ArchivesStaff = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [fatherName, setfatherName] = useState("");

  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  const [date, setdate] = useState(
    `${new Date()?.getFullYear()}-${
      new Date()?.getMonth() + 1 > 9
        ? new Date()?.getMonth() + 1
        : `0${new Date()?.getMonth() + 1}`
    }`
  );

  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `staff-archive/home/find-all-archive?page=${currentPage}&limit=${pageSize}&lang=uz${
      firstName ? `&first_name=${firstName}` : ""
    }${lastName ? `&last_name=${lastName}` : ""}${
      fatherName ? `&father_name=${fatherName}` : ""
    }${date ? `&month=${date}` : ""}`,
  });

  useEffect(() => {
    if (data?.items) {
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, pageSize, date]);

  //   pagination onchange bulganda
  const onShowSizeChange = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };
  const onShowSizeChange2 = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };
  const [copyText, setcopyText] = useState(false);
  function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      setcopyText(true);
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  }
  const onChange = (e) => {
    if (e) {
      let month = e?.$M + 1 > 9 ? e?.$M + 1 : `0${e?.$M + 1}`;
      let data = `${e?.$y}-${month}`;
      setdate(data);
    } else {
      setdate("");
    }
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Arxivdagi xodimlar"}
        link1={"Arxivdagi xodimlar"}
        link2={""}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="grid grid-cols-4 gap-2 overflow-x-hidden ease-in duration-500">
          {/* Familiya */}
          <Input
            placeholder="Familiya"
            value={lastName}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            size="small"
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
          {/* Ism */}
          <Input
            placeholder="Ism"
            value={firstName}
            onChange={(e) => {
              setfirstName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            size="small"
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
          {/* Otasining ismi */}
          <Input
            placeholder="Otasining ismi"
            size="small"
            value={fatherName}
            onChange={(e) => {
              setfatherName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
          <DatePicker
            value={date ? dayjs(date) : ""}
            picker="month"
            onChange={onChange}
            format={"MM.YYYY"}
            placeholder="OO.YYYY"
            allowClear
            type="date"
            className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
          />
        </div>
        <div className="w-full my-5 overflow-auto">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className=" w-8 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  T/r
                </th>
                <th className="w-20 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Rasm
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  F.I.O.
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Lavozimi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Buyruq raqam - Buyruq sanasi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  JSHSHIR
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Xodimning bo'shash sababi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Izoh
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
                    <td className="tracking-normal w-10 leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Image
                        width={40}
                        height={40}
                        className="object-cover object-center rounded-sm overflow-hidden"
                        src={
                          e?.file?.url_1
                            ? imgUrl + e?.file?.url_1
                            : "https://www.w3schools.com/howto/img_avatar.png"
                        }
                      />
                    </td>
                    <td className="cursor-pointer tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.first_name} {e?.last_name} {e?.father_name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.job_name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.order_name} - {getDateReverse(e?.order_date)}
                    </td>
                    <td
                      onClick={() => {
                        unsecuredCopyToClipboard(e?.pinfl);
                      }}
                      onMouseLeave={() => {
                        setcopyText(false);
                      }}
                      className="cursor-copy tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0"
                    >
                      <Popover
                        content={
                          <span className="text-[var(--textBlack-color)] text-sm">
                            {copyText ? (
                              <span className="text-green-500">
                                <CheckCircleOutlined /> Nusxa olindi
                              </span>
                            ) : (
                              "Nusxa olish"
                            )}
                          </span>
                        }
                      >
                        <div className="flex items-center justify-start gap-1">
                          {e?.pinfl}
                          <span className="border border-solid border-[var(--borderWhite-color)] rounded-md p-1">
                            <CopyOutlined />
                          </span>
                        </div>
                      </Popover>
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.reasons_for_dismissal?.name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.description}
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
            total={totalPages * pageSize}
            defaultPageSize={pageSize}
            pageSizeOptions={[10, 20, 40, 60, 80, 100]}
            showSizeChanger={true}
            onChange={onShowSizeChange}
            onShowSizeChange={onShowSizeChange2}
            locale={{ items_per_page: "/ Sahifa" }}
          />
        </div>
      </div>
    </>
  );
};
