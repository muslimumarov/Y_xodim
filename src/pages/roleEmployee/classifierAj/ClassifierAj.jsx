import { Input } from "antd";
import { Select } from "antd";
import { Pagination } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet } from "hooks";
import { useState } from "react";
import { useEffect } from "react";
import CountUp from "react-countup";

export const ClassifierAj = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [grupu, setgrupu] = useState(null);
  const [groupname, setgroupname] = useState("");
  const [groupcode, setgroupcode] = useState("");
  const [pageSize, setpageSize] = useState(10);
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `my-classification/find/all-items-v2?page=${currentPage}&limit=${pageSize}${
      grupu ? `&group_id=${grupu}` : ""
    }${groupname ? `&name=${groupname}` : ""}${
      groupcode ? `&code=${groupcode}` : ""
    }`,
  });

  const {
    data: { data: groupsAll },
    isLoading: isLoading2,
  } = useGet({
    url: `my-classification/find/all-groups?page=1&limit=100000000000`,
  });
  //   pagination onchange bulganda
  const onShowSizeChange = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };
  const onShowSizeChange2 = (current, pageSize) => {
    setcurrentPage(current);
    setpageSize(pageSize);
  };

  useEffect(() => {
    if (data?.items) {
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, grupu, pageSize]);

  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={
          <>
            Klassifikator
            <span className="px-2 bg-green-50 border border-green-500 rounded w-max ml-2 text-green-800">
              <CountUp duration={2} end={data?.meta?.totalItems} separator="" />
            </span>
          </>
        }
        link1={"Klassifikator"}
        link2={""}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="flex gap-5 justify-end items-center">
          {/* gruh */}
          <Select
            value={grupu}
            onChange={(e) => setgrupu(e)}
            showSearch
            allowClear
            loading={isLoading2}
            optionFilterProp="children"
            filterOption={filterOption}
            className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[200px]"
            size="middle"
            placeholder="Klassifikator gruhini tanlang"
          >
            <Select.Option value="">Hammasini ko'rish</Select.Option>
            {groupsAll?.items?.map((e) => (
              <Select.Option key={e?.id} value={e?.id}>
                {e?.name}
              </Select.Option>
            ))}
          </Select>
          {/* Klassfikator (AJ) nomi */}
          <Input
            placeholder="Klassfikator (AJ) nomi"
            value={groupname}
            onChange={(e) => {
              setgroupname(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            size="small"
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[200px]"
          />
          {/* Klassfikator (AJ) kodi */}
          <Input
            placeholder="Klassfikator (AJ) kodi"
            value={groupcode}
            onChange={(e) => {
              setgroupcode(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (currentPage == 1) refetch();
                else setcurrentPage(1);
              }
            }}
            size="small"
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[200px]"
          />
        </div>
        <div className="w-full h-max my-5 overflow-x-auto">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  T/r
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Klassfikator (AJ) nomi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Klassfikatordagi xodimlar soni
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Klassfikator (AJ) kodi
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Gruhlar nomi
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
                      {(currentPage - 1) * pageSize + i + 1}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.name}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <span className="px-2 bg-green-50 border border-green-500 rounded w-max ml-2 text-green-800">
                        {e?.count}
                      </span>
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.code}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.group?.name}
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
