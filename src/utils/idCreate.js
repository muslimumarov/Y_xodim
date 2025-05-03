// bu yerda id yaratilmoqda
export function idCreate() {
  return "id" + Math?.random()?.toString(16)?.slice(2);
}

export const getFullDateNow = () => {
  const today = new Date();
  const yyyy = today?.getFullYear();
  let mm = today?.getMonth() + 1; // Months start at 0!
  let dd = today?.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return yyyy + "." + mm + "." + dd;
};
export const getDateForm = (e) => {
  if (e) {
    let day = e?.$D > 9 ? e?.$D : `0${e?.$D}`;
    let month = e?.$M + 1 > 9 ? e?.$M + 1 : `0${e?.$M + 1}`;
    let data = `${e?.$y}-${month}-${day}`;
    return data;
  }
};
export const getTimeForm = (e) => {
  if (e) {
    let hours = e?.$H > 9 ? e?.$H : `0${e?.$H}`;
    let minut = e?.$m > 9 ? e?.$m : `0${e?.$m}`;
    let data = `${hours}:${minut}`;
    return data;
  }
};
export const getTimeFormSekund = (e) => {
  if (e) {
    let hours = e?.$H > 9 ? e?.$H : `0${e?.$H}`;
    let minut = e?.$m > 9 ? e?.$m : `0${e?.$m}`;
    let sikund = e?.$s > 9 ? e?.$s : `0${e?.$s}`;
    let data = `${hours}:${minut}:${sikund}`;
    return data;
  }
};

export const getDateReverse = (e) => {
  if (e?.includes("-")) {
    let date = e?.split("-")?.reverse()?.join(".");
    return date;
  } else {
    let date = e?.split(".")?.reverse()?.join(".");
    return date;
  }
};
