import { api, imgUrl } from "service";
import { errorMasseg } from "utils/toastify";

export const useDownland = () => {
  const getData = (url) => {
    api
      .get(url)
      .then((res) => {
        window.open(imgUrl + res?.data?.data?.url);
      })
      .catch(() => {
        errorMasseg("Xatolik ?");
      });
  };
  return {
    getData,
  };
};
