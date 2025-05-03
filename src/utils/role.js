export const ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN"; // super admin
export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_USER = "ROLE_USER";
export const ROLE_EMPLOYEE = "ROLE_EMPLOYEE";
export const ROLE_EMPLOYEE_SUPER = "ROLE_EMPLOYEE_SUPER";
export const ROLE_EMPLOYEE_VIEW = "ROLE_EMPLOYEE_VIEW";
export const ROLE_UCT = "ROLE_UCT";
export const ALLROLE = [
  ROLE_SUPER_ADMIN,
  ROLE_ADMIN,
  ROLE_USER,
  ROLE_EMPLOYEE,
  ROLE_EMPLOYEE_SUPER,
  ROLE_EMPLOYEE_VIEW,
];

export const roleReturnText = (role) => {
  switch (role) {
    case ROLE_SUPER_ADMIN:
      return "Super admin";
    case ROLE_ADMIN:
      return "Boshqaruvchi";
    case ROLE_USER:
      return "Xodim";
    case ROLE_EMPLOYEE:
      return "Xodimlar bo'limi mutaxassisi";
    case ROLE_EMPLOYEE_SUPER:
      return "Xodimlar bo'limi boshqaruvchisi";
    case ROLE_EMPLOYEE_VIEW:
      return "Kuzatuvchi";
    default:
      return role;
  }
};
export const organizationReturnText = (org) => {
  switch (org) {
    case "parent":
      return "Yuqori turuvchi tashkilot";
    case "child":
      return "Quyi turuvchi tashkilot";
    default:
      return org;
  }
};
export const workingWekdayText = (wek) => {
  switch (wek) {
    case "days_5":
      return "5 kunlik";
    case "days_6":
      return "6 kunlik";
    case "days_7":
      return "7 kunlik";
    default:
      return wek;
  }
};
