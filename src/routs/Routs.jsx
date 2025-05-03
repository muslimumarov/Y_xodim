import { Route, Routes } from "react-router-dom";
import { routsData } from "./routsData";
import { useLoginStore } from "stores";
import { Private } from "./private";

export const Routs = () => {
  const { role } = useLoginStore();
  return (
    <>
      <Routes>
        {routsData?.map((item) => {
          if (item.role) {
            if (item.role.includes(role)) {
              // agarda ichida child bulsa shu block ishlidi
              if (item.child) {
                return item.child?.map((item2) => {
                  return (
                    <Route
                      key={item2.id}
                      path={item2.path}
                      element={<Private>{item2.page}</Private>}
                    />
                  );
                });
              } else
                return (
                  <Route
                    key={item.id}
                    path={item.path}
                    element={<Private>{item.page}</Private>}
                  />
                );
            }
          } else {
            // bunga role yuq kodla ihlidi
            return (
              <Route
                key={item.id}
                path={item.path}
                element={<Private>{item.page}</Private>}
              />
            );
          }
        })}
      </Routes>
    </>
  );
};
