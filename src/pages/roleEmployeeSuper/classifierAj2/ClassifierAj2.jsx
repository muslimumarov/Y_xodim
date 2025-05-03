import { Input } from "antd";
import { Select } from "antd";
import { Pagination } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet } from "hooks";
import { useState } from "react";
import { useEffect } from "react";
import CountUp from "react-countup";

export const ClassifierAj2 = () => {
  // bu yerda pagenationni malumotlari bor
  const [currentPage, setcurrentPage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [grupu, setgrupu] = useState(null);
  const [groupname, setgroupname] = useState("");
  const [groupcode, setgroupcode] = useState("");
  const [pageSize, setpageSize] = useState(10);

  const [enterpriseId, setenterpriseId] = useState(null);
  const [managementsId, setmanagementsId] = useState(null);
  const [departmentsId, setdepartmentsId] = useState(null);
  const [departmentsAll, setdepartmentsAll] = useState([]);

  const [selectGetData, setselectGetData] = useState(null);
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `my-classification/role-find/all-items-v2?page=${currentPage}&limit=${pageSize}${
      grupu ? `&group_id=${grupu}` : ""
    }${groupname ? `&name=${groupname}` : ""}${
      groupcode ? `&code=${groupcode}` : ""
    }${selectGetData ? `&enterprise_id=${selectGetData}` : ""}`,
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
  const {
    data: { data: groupsAll },
    isLoading: isLoading2,
  } = useGet({
    url: `my-classification/find/all-groups?page=1&limit=100000000000`,
  });
  useEffect(() => {
    if (data?.items) {
      setcurrentPage(data?.meta?.currentPage);
      settotalPages(data?.meta?.totalPages);
    }
  }, [data]);
  useEffect(() => {
    if (data?.items) refetch();
  }, [currentPage, pageSize, grupu]);

  // hamma tashkilotlar
  const {
    data: { data: organizationAll },
  } = useGet({
    url: "role-employee/find-all/items",
  });
  // boshqarmani olish
  const {
    data: { data: managementsAll },
  } = useGet({
    url: `role-employee/find-all/managements/${enterpriseId}`,
    enabled: enterpriseId,
  });
  // bulimlarni olish
  const {
    data: { data: departmentsgetAll },
  } = useGet({
    url: `role-employee/find-all/departments/${managementsId}`,
    enabled: managementsId,
  });

  const handleProvinceChange1 = (value) => {
    setenterpriseId(value);
    setselectGetData(value);
    setdepartmentsId(null);
    setmanagementsId(null);
  };
  const handleProvinceChange2 = (value) => {
    if (value) {
      setselectGetData(value);
    } else {
      setselectGetData(enterpriseId);
    }
    setmanagementsId(value);

    setdepartmentsId(null);
  };
  const handleProvinceChange3 = (value) => {
    if (value) {
      setselectGetData(value);
    } else {
      setselectGetData(managementsId);
    }
    setdepartmentsId(value);
  };

  useEffect(() => {
    setdepartmentsAll(managementsAll?.departments);
  }, [managementsAll?.departments]);
  useEffect(() => {
    setdepartmentsAll(departmentsgetAll?.departments);
  }, [departmentsgetAll?.departments]);
  useEffect(() => {
    refetch();
  }, [enterpriseId, managementsId, departmentsId]);
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
            Klassifikator (AJ)
            <span className="px-2 bg-green-50 border border-green-500 rounded w-max ml-2 text-green-800">
              <CountUp duration={2} end={data?.meta?.totalItems} separator="" />
            </span>
          </>
        }
        link1={"Klassifikator (AJ)"}
        link2={""}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="flex flex-wrap gap-5 justify-end items-center">
          {/* tashkilot */}
          <Select
            value={enterpriseId}
            onChange={handleProvinceChange1}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={filterOption}
            className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[240px]"
            size="middle"
            placeholder="Tashkilotni tanlang"
          >
            <Select.Option value="">Hammasini ko'rish</Select.Option>
            {organizationAll?.map((e) => (
              <Select.Option key={e?.id} value={e?.id}>
                {e?.name}
              </Select.Option>
            ))}
          </Select>
          {/* Boshqarma */}
          <Select
            value={managementsId}
            onChange={handleProvinceChange2}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={filterOption}
            className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[240px]"
            size="middle"
            placeholder="Boshqarma tanlang"
          >
            <Select.Option value="">Hammasini ko'rish</Select.Option>
            {managementsAll?.managements?.map((e) => (
              <Select.Option key={e?.id} value={e?.id}>
                {e?.name}
              </Select.Option>
            ))}
          </Select>
          {/* Bo'lim */}
          <Select
            value={departmentsId}
            onChange={handleProvinceChange3}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={filterOption}
            className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[240px]"
            size="middle"
            placeholder="Bo'lim tanlang"
          >
            <Select.Option value="">Hammasini ko'rish</Select.Option>
            {departmentsAll?.map((e) => (
              <Select.Option key={e?.id} value={e?.id}>
                {e?.name}
              </Select.Option>
            ))}
          </Select>
          {/* gruh */}
          <Select
            value={grupu}
            onChange={(e) => setgrupu(e)}
            showSearch
            allowClear
            loading={isLoading2}
            optionFilterProp="children"
            filterOption={filterOption}
            className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[240px]"
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
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[240px]"
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
            className="p-1 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full max-w-[240px]"
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
