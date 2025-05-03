import {
  ArrowLeftOutlined,
  AuditOutlined,
  FileSyncOutlined,
  IdcardOutlined,
  ReadOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";
import { Breadcrumb } from "components";
import { useGet } from "hooks";
import {
  EmployeeActivity,
  EmployeeAdditional,
  EmployeeInformation,
  EmployeePersonalInfo,
  EmployeePreparation,
  EmployeeRelatives,
  EmployeeUpdatinginfo,
} from "pages";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export const EmployeeEdit = () => {
  //   shaxsiy malumotlrni olib kelish
  const { id } = useParams();
  const {
    data: { data },
  } = useGet({
    url: `employee-edit/view/${id}`,
  });

  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb
        link={
          <>
            Xodimlar
            <span className="px-2 bg-green-50 border border-green-500 rounded w-max ml-2 text-green-800">
              {data?.employee?.full_name || "F.I.O."}
            </span>
          </>
        }
        link1={"Xodimlar"}
        link2={"Xodimlarni tahrirlash"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <button
          onClick={() => navigate("/employe/employee")}
          className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm"
        >
          <ArrowLeftOutlined /> Orqaga
        </button>
        <div className=" my-8">
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: "1",
                label: (
                  <p className="text-lg">
                    <IdcardOutlined />
                    Shaxsiy ma'lumotlar
                  </p>
                ),
                children: <EmployeePersonalInfo />,
              },
              {
                key: "2",
                label: (
                  <p className="text-lg">
                    <SolutionOutlined />
                    Ma'lumoti
                  </p>
                ),
                children: <EmployeeInformation />,
              },
              {
                key: "3",
                label: (
                  <p className="text-lg">
                    <AuditOutlined />
                    Faoliyati
                  </p>
                ),
                children: <EmployeeActivity />,
              },
              {
                key: "4",
                label: (
                  <p className="text-lg">
                    <TeamOutlined />
                    Qarindoshlari
                  </p>
                ),
                children: <EmployeeRelatives />,
              },
              {
                key: "5",
                label: (
                  <p className="text-lg">
                    <UserOutlined />
                    Qo'shimcha
                  </p>
                ),
                children: <EmployeeAdditional />,
              },
              {
                key: "6",
                label: (
                  <p className="text-lg">
                    <ReadOutlined />
                    Tayyorlov
                  </p>
                ),
                children: <EmployeePreparation />,
              },
              {
                key: "7",
                label: (
                  <p className="text-lg">
                    <FileSyncOutlined />
                    Ma'lumotlarni yangilash
                  </p>
                ),
                children: <EmployeeUpdatinginfo />,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};
