import { AsideMenusChild } from "components";
import { NavLink } from "react-router-dom";
import { routsData } from "routs";
import { useLoginStore } from "stores";

export const Aside = ({ menu }) => {
  const { role } = useLoginStore();
  return (
    <>
      {routsData?.map((item) => {
        if (item?.index && item.role.includes(role)) {
          if (item?.line) {
            return (
              <p
                className={`text-sm font-semibold text-[var(--textBlack-color)] border border-[var(--borderWhite-color)] border-l-0 border-r-0 border-b-0 pt-3 mb-2 mt-3 first:border-t-0 first:mt-0 overflow-hidden whitespace-nowrap ${
                  menu ? "" : "hidden max-md:block"
                }`}
                key={item.id}
              >
                {item?.title}
              </p>
            );
          } else {
            if (item.index) {
              if (item.child) {
                return (
                  <AsideMenusChild key={item.id} data={item} change={menu} />
                );
              } else {
                return (
                  <NavLink
                    key={item.id}
                    className={({ isActive }) =>
                      isActive
                        ? "text-sm font-medium flex items-center justify-start gap-4 px-4 py-2 mt-1 bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--text-color)] overflow-hidden whitespace-nowrap"
                        : "text-sm font-medium flex items-center justify-start gap-4 px-4 py-2 mt-1 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--text-color)] overflow-hidden whitespace-nowrap"
                    }
                    to={item.path}
                  >
                    {item?.icon}
                    {item?.title?.length > 30 ? (
                      <marquee>{item?.title}</marquee>
                    ) : (
                      item?.title
                    )}
                  </NavLink>
                );
              }
            }
          }
        }
      })}
    </>
  );
};
