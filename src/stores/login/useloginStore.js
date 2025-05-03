import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useLoginStore = create(
  persist(
    (set) => ({
      isAuthenicated: false,
      token: null,
      data: {},
      role: null,
      signIn: (data) => {
        set({
          isAuthenicated: true,
          token: data.access_token,
          data: data,
          role: data.role,
        });
      },
      logOut: () => {
        set({
          isAuthenicated: false,
          token: null,
          data: {},
          role: null,
        });
        localStorage.setItem("currentPage", 1);
        localStorage.setItem("pageSize", 10);
      },
    }),
    {
      name: "login-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
