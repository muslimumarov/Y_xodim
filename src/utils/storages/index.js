const getStorage = (session) => (session ? sessionStorage : localStorage);

export const token = "token_admin";
export const role = "role";

export const getToken = () => getStorage().getItem(token);
export const setToken = (t) => getStorage().setItem(token, t);
export const getRole = () => getStorage().getItem(role);
export const setRole = (r) => getStorage().getItem(role, r);
export const getLocale = () => getStorage().getItem("i18nextLng");
