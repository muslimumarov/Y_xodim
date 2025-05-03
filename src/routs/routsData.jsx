import {
  AcademicdegreeName,
  AcademictitliesName,
  ArchivesStaff,
  CassificationGroup,
  CategorystaffName,
  CertificateName,
  ClassificationAdd,
  Classifier,
  Department,
  DistrictName,
  EducationsName,
  Employee,
  EmployeeAcademic,
  EmployeeEdit,
  EmpoleAdd,
  ExodimAdmin,
  FundingEdu,
  LanguageName,
  Management,
  NationalityName,
  Organization,
  OrganizationAdmin,
  PageNoteFound,
  PartiesName,
  Personal,
  Profile,
  RegionName,
  RelativesName,
  StaffOnVacation,
  Statistics,
  SteteName,
  Unarchive,
  Staff,
  MedicalExamination,
  Awardees,
  MaritalStatus,
  CertificateOfQualification,
  ManagementStaff,
  EnterpriseStaff,
  EnterpriseStaffPost,
  ManagementStaffPost,
  EducationTypes,
  EducationLavel,
  NoteBook,
  Kpi,
  MedicalSummary,
  WorkTimeCalculation,
  DisciplinaryActionEmploye,
  LaborLeave,
  HikCategory,
  HikDevice,
  HikSynchronization,
  HikDeviceEmployeeId,
  HikJournal,
  HikJournalTime,
  DistributionOfWorkingHours,
  WorkYearCalendar,
  EmployeeSuper,
  Guest,
  HikSynchronizationGuest,
  HikDeviceEmployeeGuestId,
  TeamAdmin,
  TeamHikJournal,
  EmployeeBirthDay,
  HikJournalEmployee,
  FileDownland,
  MilitaryRankName,
  ReasonsForDismissal,
  ArchivesStaffSuper,
  DisciplinaryActionName,
  EmpoleAddCivilLegal,
  EmpoleeditCivilLegal,
  ClassificationAddAj,
  CassificationGroupAj,
  StatisticsSuper,
  EmployeeInformationNo,
  LaborLeaveDesc,
  EmployeeNotebookadd,
  ClassifierAj,
  ArchivesStaffEmployeyeeSuper,
  EmployeeNewPosition,
  ClassifierAj2,
} from "pages";
import { idCreate } from "utils/idCreate";
import {
  ALLROLE,
  ROLE_SUPER_ADMIN,
  ROLE_ADMIN,
  ROLE_EMPLOYEE_SUPER,
  ROLE_EMPLOYEE,
  ROLE_EMPLOYEE_VIEW,
  ROLE_UCT,
} from "../utils/role";
import {
  ApartmentOutlined,
  AppstoreAddOutlined,
  BarChartOutlined,
  CalendarOutlined,
  CoffeeOutlined,
  ContainerOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  FileProtectOutlined,
  FileZipOutlined,
  FundProjectionScreenOutlined,
  GiftOutlined,
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
  SolutionOutlined,
  SwapOutlined,
  TrophyOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { HikJournalTimeEmployee } from "pages/roleEmployeeSuper/hikJournalTimeEmployee";

export const routsData = [
  // ROLE_SUPER_ADMIN, ROLE_ADMIN ---------------------------------------------------------------------------------------------- admin roli
  {
    id: idCreate(),
    title: "Sahifalar",
    index: true,
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    line: true,
  },
  // Boshqaruvchilar
  {
    id: idCreate(),
    title: "Boshqaruvchi(HRM)",
    index: true,
    icon: <UsergroupAddOutlined />,
    path: "/admin/admin-exodim",
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    page: <ExodimAdmin />,
  },
  // Kadrlar
  {
    id: idCreate(),
    title: "Kadrlar",
    index: true,
    icon: <UserSwitchOutlined />,
    path: "/admin/cadry",
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    page: <OrganizationAdmin />,
  },
  // Mehmon qo'shish
  {
    id: idCreate(),
    title: "Mehmonlar",
    index: true,
    icon: <UserSwitchOutlined />,
    path: "/admin/guest",
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    page: <Guest />,
  },
  // Manzil
  {
    id: idCreate(),
    title: "Manzil",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    child: [
      {
        id: idCreate(),
        title: "Davlatlar",
        path: "/admin/state/state-name",
        index: true,
        page: <SteteName />,
      },
      {
        id: idCreate(),
        title: "Viloyat",
        path: "/admin/state/region-name",
        index: true,
        page: <RegionName />,
      },
      {
        id: idCreate(),
        title: "Tuman(Shahar) qo'shish",
        path: "/admin/state/district-name",
        index: true,
        page: <DistrictName />,
      },
    ],
  },
  // Ma'lumotlar
  {
    id: idCreate(),
    title: "Ma'lumotlar",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    child: [
      {
        id: idCreate(),
        title: "Millati",
        path: "/admin/info/nationality",
        index: true,
        page: <NationalityName />,
      },
      {
        id: idCreate(),
        title: "Chet tili",
        path: "/admin/info/language",
        index: true,
        page: <LanguageName />,
      },
      {
        id: idCreate(),
        title: "Sertifikat turi",
        path: "/admin/info/certificate",
        index: true,
        page: <CertificateName />,
      },
      {
        id: idCreate(),
        title: "Guvohnoma (malakaoshirish)",
        path: "/admin/info/certificate-of-qualification",
        index: true,
        page: <CertificateOfQualification />,
      },
      {
        id: idCreate(),
        title: "Ilmiy unvon",
        path: "/admin/info/academictitlies",
        index: true,
        page: <AcademictitliesName />,
      },
      {
        id: idCreate(),
        title: "Ilmiy daraja",
        path: "/admin/info/academicdegree",
        index: true,
        page: <AcademicdegreeName />,
      },
      {
        id: idCreate(),
        title: "Harbiy unvon",
        path: "/admin/info/military-rank",
        index: true,
        page: <MilitaryRankName />,
      },
      {
        id: idCreate(),
        title: "Ishdan bo'shash sabablari",
        path: "/admin/info/reasons-for-dismissal",
        index: true,
        page: <ReasonsForDismissal />,
      },
      {
        id: idCreate(),
        title: "Partiya",
        path: "/admin/info/parties",
        index: true,
        page: <PartiesName />,
      },
      {
        id: idCreate(),
        title: "Mehnat munosabatlari turi",
        path: "/admin/info/category-staff",
        index: true,
        page: <CategorystaffName />,
      },
      {
        id: idCreate(),
        title: "Qarindosh qo'shish",
        path: "/admin/info/relatives-user",
        index: true,
        page: <RelativesName />,
      },
      {
        id: idCreate(),
        title: "Oilaviy ahvoli",
        path: "/admin/info/marital-status",
        index: true,
        page: <MaritalStatus />,
      },
      // {
      //   id: idCreate(),
      //   title: "Fuqoroligi",
      //   path: "/admin/info/citizenship",
      //   index: true,
      //   page: <CitizenshipName />,
      // },
    ],
  },
  // Oliygoh ma'lumoti
  {
    id: idCreate(),
    title: "Oliygoh ma'lumoti",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    child: [
      {
        id: idCreate(),
        title: "Ma'lumoti",
        path: "/admin/info/educations",
        index: true,
        page: <EducationsName />,
      },
      {
        id: idCreate(),
        title: "Ta'lim turi",
        path: "/admin/info/education-types",
        index: true,
        page: <EducationTypes />,
      },
      {
        id: idCreate(),
        title: "Ta'lim darajalari",
        path: "/admin/info/education-lavel",
        index: true,
        page: <EducationLavel />,
      },
    ],
  },
  // Qo'shimcha
  {
    id: idCreate(),
    title: "Qo'shimcha",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    child: [
      {
        id: idCreate(),
        title: "Daftar",
        path: "/admin/addition/notebook",
        index: true,
        page: <NoteBook />,
      },
      {
        id: idCreate(),
        title: "Tibbiy ko'rik xulosasi",
        path: "/admin/addition/medical-summary",
        index: true,
        page: <MedicalSummary />,
      },
      // {
      //   id: idCreate(),
      //   title: "Ta'til turlari",
      //   path: "/admin/addition/labor-leave",
      //   index: true,
      //   page: <LaborLeave />,
      // },
      // {
      //   id: idCreate(),
      //   title: "Ta'til turlariga asos",
      //   path: "/admin/addition/labor-leave-desc",
      //   index: true,
      //   page: <LaborLeaveDesc />,
      // },
      {
        id: idCreate(),
        title: "Intizomiy jazo turlari",
        path: "/admin/addition/disciplinary-action-name",
        index: true,
        page: <DisciplinaryActionName />,
      },
    ],
  },
  // Ta'tillar
  {
    id: idCreate(),
    title: (
      <>
        Ta'tillar
        <CoffeeOutlined />
      </>
    ),
    index: true,
    icon: <CoffeeOutlined />,
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    child: [
      {
        id: idCreate(),
        title: "Ta'til turlari",
        path: "/admin/addition/labor-leave",
        index: true,
        page: <LaborLeave />,
      },
      {
        id: idCreate(),
        title: "Ta'til turlariga asos",
        path: "/admin/addition/labor-leave-desc",
        index: true,
        page: <LaborLeaveDesc />,
      },
    ],
  },
  // Tashkilot
  {
    id: idCreate(),
    title: "Tashkilot",
    index: true,
    icon: <ApartmentOutlined />,
    path: "/admin/organization",
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    page: <Organization />,
  },
  // Boshqarma
  {
    id: idCreate(),
    title: "Boshqarma",
    index: true,
    icon: <HomeOutlined />,
    path: "/admin/management",
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    page: <Management />,
  },
  // Xodimlar toifasi
  {
    id: idCreate(),
    title: "Xodimlar toifasi",
    index: true,
    icon: <UsergroupAddOutlined />,
    path: "/admin/personal",
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    page: <Personal />,
  },
  // classification
  {
    id: idCreate(),
    title: "Klassfikator",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    child: [
      {
        id: idCreate(),
        title: "Klassfikator guruh yaratish",
        path: "/admin/classification/classification-group",
        index: true,
        page: <CassificationGroup />,
      },
      {
        id: idCreate(),
        title: "Klassfikator qo'shish",
        path: "/admin/classification/classification-add",
        index: true,
        page: <ClassificationAdd />,
      },
    ],
  },
  // classification Aj
  {
    id: idCreate(),
    title: "Klassfikator (AJ)",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    child: [
      {
        id: idCreate(),
        title: "Klassfikator (AJ) guruh yaratish",
        path: "/admin/classification/classification-group-aj",
        index: true,
        page: <CassificationGroupAj />,
      },
      {
        id: idCreate(),
        title: "Klassfikator (AJ) qo'shish",
        path: "/admin/classification/classification-add-aj",
        index: true,
        page: <ClassificationAddAj />,
      },
    ],
  },
  // Turniket
  {
    id: idCreate(),
    title: "Turniket",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_SUPER_ADMIN, ROLE_ADMIN],
    child: [
      {
        id: idCreate(),
        title: "Qurilmalar guruhi (HIK)",
        path: "/admin/tourniquet/hik-category",
        index: true,
        page: <HikCategory />,
      },
      {
        id: idCreate(),
        title: "Qurilma (HIK)",
        path: "/admin/tourniquet/hik-device",
        index: true,
        page: <HikDevice />,
      },
      {
        id: idCreate(),
        title: "Sinxronizatsiya (HIK)",
        path: "/admin/tourniquet/hik-synchronization",
        index: true,
        page: <HikSynchronization />,
      },
      {
        id: idCreate(),
        title: "Sinxronizatsiya (Mehmon) (HIK)",
        path: "/admin/tourniquet/hik-synchronization-guest",
        index: true,
        page: <HikSynchronizationGuest />,
      },
      {
        id: idCreate(),
        path: "/admin/tourniquet/hik-device-employee/:id",
        index: false,
        page: <HikDeviceEmployeeId />,
      },
      {
        id: idCreate(),
        path: "/admin/tourniquet/hik-device-employee-guest/:id",
        index: false,
        page: <HikDeviceEmployeeGuestId />,
      },
      {
        id: idCreate(),
        title: "Davomat",
        path: "/admin/tourniquet/hik-journal",
        index: true,
        page: <HikJournal />,
      },
      {
        id: idCreate(),
        title: "Xodimlarning ishlagan vaqti",
        path: "/admin/tourniquet/hik-journal-time",
        index: true,
        page: <HikJournalTime />,
      },
    ],
  },
  // ROLE_ADMIN
  // Mablag'lashtirish
  {
    id: idCreate(),
    title: "Mablag'lashtirish",
    index: true,
    icon: <FundProjectionScreenOutlined />,
    path: "/admin/funding-edu",
    role: [ROLE_ADMIN, ROLE_SUPER_ADMIN],
    page: <FundingEdu />,
  },
  // Xodimlar akademiyasi
  {
    id: idCreate(),
    title: "Xodimlar akademiyasi",
    index: true,
    icon: <SolutionOutlined />,
    path: "/admin/employee-academic",
    role: [ROLE_ADMIN, ROLE_SUPER_ADMIN],
    page: <EmployeeAcademic />,
  },
  // ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW ----------------------------------------------------------------------------------------------------------------------------------
  // Statistika sahifalari
  {
    id: idCreate(),
    title: "Bosh sahifa (AJ)",
    index: true,
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW],
    line: true,
  },
  // Statistika
  {
    id: idCreate(),
    title: "Bosh sahifa (AJ)",
    index: true,
    icon: <BarChartOutlined />,
    path: "/employe/statistics-seper",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW],
    page: <StatisticsSuper />,
  },
  // tugilgan kun
  {
    id: idCreate(),
    index: false,
    path: "/employe/statistics/employee-birth-day",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW, ROLE_EMPLOYEE],
    page: <EmployeeBirthDay />,
  },
  // Ma'lumoti to'liq kiritilmagan xodimlar
  {
    id: idCreate(),
    index: false,
    path: "/employe/statistics/employee-information-no/:id",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW, ROLE_EMPLOYEE],
    page: <EmployeeInformationNo />,
  },
  // Daftardagi hodimlar soni
  {
    id: idCreate(),
    index: false,
    path: "/employe/statistics/employee-notebook-add/:id",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW, ROLE_EMPLOYEE],
    page: <EmployeeNotebookadd />,
  },
  // ishdan bushatilganlar
  {
    id: idCreate(),
    index: false,
    path: "/employe/statistics-seper/archives-staff-staff",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW, ROLE_EMPLOYEE],
    page: <ArchivesStaffEmployeyeeSuper />,
  },
  // Yangi ishga olinganlar
  {
    id: idCreate(),
    index: false,
    path: "/employe/statistics/employee-new-position/:id",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW, ROLE_EMPLOYEE],
    page: <EmployeeNewPosition />,
  },

  // // Xodimlar sahifalari
  // {
  //   id: idCreate(),
  //   title: "Xodimlar sahifalari (AJ)",
  //   index: true,
  //   role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW],
  //   line: true,
  // },
  // Xodimlar (AJ)
  {
    id: idCreate(),
    title: "Xodimlar (AJ)",
    index: true,
    icon: <UsergroupAddOutlined />,
    path: "/employe/employee-super",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW],
    page: <EmployeeSuper />,
  },
  // Arxivdagi xodimlar
  {
    id: idCreate(),
    title: "Arxivdagi xodimlar (AJ)",
    index: true,
    icon: <FileZipOutlined />,
    path: "/employe/archives-staff-staff",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW],
    page: <ArchivesStaffSuper />,
  },
  // Klassifikator (AJ)
  {
    id: idCreate(),
    title: "Klassifikator (AJ)",
    index: true,
    icon: <BarChartOutlined />,
    path: "/employe/klassifikator-aj",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW],
    page: <ClassifierAj2 />,
  },
  // Klassifikator (AJ)
  {
    id: idCreate(),
    title: "Davomat (AJ)",
    index: true,
    icon: <UsergroupAddOutlined />,
    path: "/employe/tourniquet/hik-journal",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE_VIEW],
    page: <HikJournal />,
  },
  // Turniket sahifalari
  {
    id: idCreate(),
    title: "Turniket sahifalari",
    index: true,
    role: [ROLE_EMPLOYEE_VIEW],
    line: true,
  },
  // Turniket
  {
    id: idCreate(),
    title: "Turniket",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_EMPLOYEE_VIEW],
    child: [
      {
        id: idCreate(),
        title: "Davomat",
        path: "/admin/tourniquet/hik-journal",
        index: true,
        page: <HikJournal />,
      },
      {
        id: idCreate(),
        title: "Xodimlarning ishlagan vaqti",
        path: "/admin/tourniquet/hik-journal-time",
        index: true,
        page: <HikJournalTime />,
      },
    ],
  },
  // ROLE_EMPLOYEE,ROLE_EMPLOYEE_SUPER --------------------------------------------------------------------------------------------------------- xodim roli
  // Statistika sahifalari
  {
    id: idCreate(),
    title: "Bosh sahifa",
    index: true,
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    line: true,
  },

  // Statistika
  {
    id: idCreate(),
    title: "Bosh sahifa",
    index: true,
    icon: <BarChartOutlined />,
    path: "/employe/statistics",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <Statistics />,
  },
  // // Xodimlar sahifalari
  // {
  //   id: idCreate(),
  //   title: "Xodimlar sahifalari",
  //   index: true,
  //   role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
  //   line: true,
  // },
  // Xodimlar
  {
    id: idCreate(),
    title: "Xodimlar",
    index: true,
    icon: <UsergroupAddOutlined />,
    path: "/employe/employee",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <Employee />,
  },
  // Xodimlar qo'shish
  {
    id: idCreate(),
    title: "Xodimlar qo'shish",
    index: false,
    icon: <UsergroupAddOutlined />,
    path: "/employe/employee/employee-add",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <EmpoleAdd />,
  },
  // Xodimlarni tahrirlash
  {
    id: idCreate(),
    title: "Xodimlarni tahrirlash",
    index: false,
    icon: <UsergroupAddOutlined />,
    path: "/employe/employee/employee-edit/:id",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <EmployeeEdit />,
  },
  // Fuqoroviy qo'shish
  {
    id: idCreate(),
    title: "Fuqoroviy qo'shish",
    index: false,
    icon: <UsergroupAddOutlined />,
    path: "/employe/employee/employee-add-civil-legal",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <EmpoleAddCivilLegal />,
  },
  // Fuqoroviy tahrirlash
  {
    id: idCreate(),
    title: "Fuqoroviy tahrirlash",
    index: false,
    icon: <UsergroupAddOutlined />,
    path: "/employe/employee/employee-edit-civil-legal/:id",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <EmpoleeditCivilLegal />,
  },
  // Xodimlarni yuklash page
  {
    id: idCreate(),
    index: false,
    path: "/employe/employee/employee/file-downland",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <FileDownland />,
  },
  // Lavozim qo'shish sahifalari
  {
    id: idCreate(),
    title: "Lavozim qo'shish sahifalari",
    index: true,
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    line: true,
  },
  {
    id: idCreate(),
    title: "Lavozim qo'shish sahifalari",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    child: [
      // Tashkilot lavozim
      {
        id: idCreate(),
        title: "Ma'muriyat",
        path: "/employe/enterprise",
        index: true,
        page: <EnterpriseStaff />,
      },
      // Boshqarma lavozim
      {
        id: idCreate(),
        title: "Boshqarmalar",
        path: "/employe/management",
        index: true,
        page: <ManagementStaff />,
      },
      // Bulim
      {
        id: idCreate(),
        title: "Bo'lim",
        path: "/employe/department",
        index: true,
        page: <Department />,
      },
    ],
  },
  // Tashkilot lavozim
  // {
  //   id: idCreate(),
  //   title: "Ma'muriyat",
  //   index: true,
  //   icon: <ApartmentOutlined />,
  //   path: "/employe/enterprise",
  //   role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
  //   page: <EnterpriseStaff />,
  // },
  // Lavozim qo'shish tashkilot
  {
    id: idCreate(),
    title: "Lavozim qo'shish",
    index: false,
    icon: <AppstoreAddOutlined />,
    path: "/employe/enterprise/staff/:id",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <EnterpriseStaffPost />,
  },
  // Boshqarma lavozim
  // {
  //   id: idCreate(),
  //   title: "Boshqarmalar",
  //   index: true,
  //   icon: <HomeOutlined />,
  //   path: "/employe/management",
  //   role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
  //   page: <ManagementStaff />,
  // },
  // Lavozim qo'shish boshqarma
  {
    id: idCreate(),
    title: "Lavozim qo'shish",
    index: false,
    icon: <AppstoreAddOutlined />,
    path: "/employe/management/staff/:id",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <ManagementStaffPost />,
  },
  // Bulim
  // {
  //   id: idCreate(),
  //   title: "Bo'lim",
  //   index: true,
  //   icon: <ApartmentOutlined />,
  //   path: "/employe/department",
  //   role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
  //   page: <Department />,
  // },
  // Lavozim qo'shish
  {
    id: idCreate(),
    title: "Lavozim qo'shish",
    index: false,
    icon: <AppstoreAddOutlined />,
    path: "/employe/department/staff/:id",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <Staff />,
  },
  // Ish vaqti hisobi
  {
    id: idCreate(),
    title: "Ish vaqti hisobi",
    index: true,
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    line: true,
  },
  // Ish vaqti hisobi
  {
    id: idCreate(),
    title: "Ish vaqti hisobi",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    child: [
      // Ish soatini taqsimlash
      {
        id: idCreate(),
        title: "Ish soatini taqsimlash",
        path: "/employe/distribution-of-working-hours",
        index: true,
        page: <DistributionOfWorkingHours />,
      },
      {
        id: idCreate(),
        title: "Ish vaqti hisobi tabeli",
        path: "/employe/work-time-calculation",
        index: true,
        page: <WorkTimeCalculation />,
      },
      {
        id: idCreate(),
        title: "Ish yili kalendari",
        path: "/employe/work-year-calendar",
        index: true,
        page: <WorkYearCalendar />,
      },
    ],
  },
  // Turniket sahifalari
  {
    id: idCreate(),
    title: "Turniket sahifalari",
    index: true,
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    line: true,
  },
  // Turniket
  {
    id: idCreate(),
    title: "Turniket",
    index: true,
    icon: <DownOutlined />,
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    child: [
      {
        id: idCreate(),
        title: "Davomat",
        path: "/admin/tourniquet/hik-journal",
        index: true,
        page: <HikJournalEmployee />,
      },
      {
        id: idCreate(),
        title: "Xodimlarning ishlagan vaqti",
        path: "/admin/tourniquet/hik-journal-time",
        index: true,
        page: <HikJournalTimeEmployee />,
      },
    ],
  },
  // Ish soatini taqsimlash
  // {
  //   id: idCreate(),
  //   title: "Ish soatini taqsimlash",
  //   index: true,
  //   icon: <ScheduleOutlined />,
  //   path: "/employe/distribution-of-working-hours",
  //   role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
  //   page: <DistributionOfWorkingHours />,
  // },
  // // Ish vaqti hisobi tabeli
  // {
  //   id: idCreate(),
  //   title: "Ish vaqti hisobi tabeli",
  //   index: true,
  //   icon: <ScheduleOutlined />,
  //   path: "/employe/work-time-calculation",
  //   role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
  //   page: <WorkTimeCalculation />,
  // },
  // // ish yili kalendari
  // {
  //   id: idCreate(),
  //   title: "Ish yili kalendari",
  //   index: true,
  //   icon: <ScheduleOutlined />,
  //   path: "/employe/work-year-calendar",
  //   role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
  //   page: <WorkYearCalendar />,
  // },
  // Boshqa sahifalar
  {
    id: idCreate(),
    title: "Boshqa sahifalar",
    index: true,
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    line: true,
  },
  // Klassifikator
  {
    id: idCreate(),
    title: "Klassifikator",
    index: true,
    icon: <ContainerOutlined />,
    path: "/employe/classifier",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <Classifier />,
  },
  // Klassifikator(AJ)
  {
    id: idCreate(),
    title: "Klassifikator (AJ)",
    index: true,
    icon: <ContainerOutlined />,
    path: "/employe/classifier-aj",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <ClassifierAj />,
  },
  // Arxivdan chiqarish
  {
    id: idCreate(),
    title: "Arxivdan chiqarish",
    index: true,
    icon: <FileProtectOutlined />,
    path: "/employe/unarchive",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <Unarchive />,
  },
  // Arxivdagi xodimlar
  {
    id: idCreate(),
    title: "Arxivdagi xodimlar",
    index: true,
    icon: <FileZipOutlined />,
    path: "/employe/archives-staff",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <ArchivesStaff />,
  },
  // Ta'tildagi xodimlar
  {
    id: idCreate(),
    title: "Ta'tildagi xodimlar",
    index: true,
    icon: <CalendarOutlined />,
    path: "/employe/staff-on-vacation",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <StaffOnVacation />,
  },
  // Tibbiy ko'rik
  {
    id: idCreate(),
    title: "Tibbiy ko'rik",
    index: true,
    icon: <PlusOutlined />,
    path: "/employe/medical-examination",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <MedicalExamination />,
  },
  // Mukofotlanganlar
  {
    id: idCreate(),
    title: "Mukofotlanganlar",
    index: true,
    icon: <GiftOutlined />,
    path: "/employe/awardeess",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <Awardees />,
  },
  // Intizomiy jazo
  {
    id: idCreate(),
    title: "Intizomiy jazo",
    index: true,
    icon: <ExclamationCircleOutlined />,
    path: "/employe/disciplinary-action",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <DisciplinaryActionEmploye />,
  },
  // Turniket
  // {
  //   id: idCreate(),
  //   title: (
  //     <div className="flex items-center justify-start gap-2 w-max">
  //       Turniket
  //       <div className="border border-red-600 bg-red-100 text-red-600 text-sm font-medium rounded-md px-1 relative group overflow-hidden w-max">
  //         <div className="absolute transform right-0 w-8 h-32 -mt-12 transition-all duration-1000 bg-white opacity-50 translate-x-[360px] animate-waving-hand rotate-12"></div>
  //         <SettingOutlined className="animate-spin" />
  //       </div>
  //     </div>
  //   ),
  //   index: true,
  //   icon: <SwapOutlined />,
  //   path: "/employe/tourniquet",
  //   role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
  //   page: <Tourniquet />,
  // },
  // Kpi
  {
    id: idCreate(),
    title: (
      <div className="flex items-center justify-start gap-2 w-max">
        KPI
        <div className="border border-red-600 bg-red-100 text-red-600 text-sm font-medium rounded-md px-1 relative group overflow-hidden w-max">
          <div className="absolute transform right-0 w-8 h-32 -mt-12 transition-all duration-1000 bg-white opacity-50 translate-x-[360px] animate-waving-hand rotate-12"></div>
          <SettingOutlined className="animate-spin" />
        </div>
      </div>
    ),
    index: true,
    icon: <TrophyOutlined />,
    path: "/employe/kpi",
    role: [ROLE_EMPLOYEE_SUPER, ROLE_EMPLOYEE],
    page: <Kpi />,
  },

  // profile page all
  // ROLE_UCT ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- tream roli
  {
    id: idCreate(),
    title: "Jamo",
    index: true,
    role: [ROLE_UCT],
    line: true,
  },
  {
    id: idCreate(),
    title: "Boshqaruvchi(HRM)",
    index: true,
    icon: <UsergroupAddOutlined />,
    path: "/admin/admin-team-exodim",
    role: [ROLE_UCT],
    page: <TeamAdmin />,
  },
  {
    id: idCreate(),
    title: "Davomat",
    index: true,
    icon: <SwapOutlined />,
    path: "/admin/admin-team-hik-journal",
    role: [ROLE_UCT],
    page: <TeamHikJournal />,
  },
  // profile page
  {
    id: idCreate(),
    title: "Profile",
    index: false,
    icon: <UserAddOutlined />,
    path: "/profile",
    role: ALLROLE,
    page: <Profile />,
  },
  // 404 page
  {
    id: idCreate(),
    title: "404",
    index: false,
    path: "*",
    page: <PageNoteFound />,
  },
];

// tez orada degan animatsiya
{
  /* <div className="flex items-center justify-start gap-2 w-max">
Arxivdan chiqarish
<div className="border border-red-600 bg-red-100 text-red-600 text-sm font-medium rounded-md px-1 relative group overflow-hidden w-max">
  <div className="absolute transform right-0 w-8 h-32 -mt-12 transition-all duration-1000 bg-white opacity-50 translate-x-[360px] animate-waving-hand rotate-12"></div>
  <SettingOutlined className="animate-spin" />
</div>
</div> */
}
