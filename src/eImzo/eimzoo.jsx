import { useEffect, useState } from "react";
import * as eimzoService from "./services/eimzo";
import { getDateReverse } from "utils/idCreate";
import { usePost } from "hooks";
import { errorMasseg, successMasseg } from "utils/toastify";
import { setRole, setToken } from "utils/storages";
import { useLoginStore } from "stores";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";

const Eimzoo = ({ openModal, setOpenModal }) => {
  const { signIn } = useLoginStore();
  const { mutate, isLoading } = usePost();
  const navigate = useNavigate();
  const [keys, setKeys] = useState([]);
  useEffect(() => {
    eimzoService.startApi();
    eimzoService.getAllCertificates().then((res) => {
      setKeys(res);
    });
  }, []);
  const sign = async (selectedKey) => {
    const keyId = await eimzoService.preLoadKey(
      keys.find((item) => item?.serialNumber === selectedKey)
    );
    fetch("https://hrm.kuprikqurilish.uz/frontend/challenge")
      .then((response) => response.json())
      .then((json) => {
        eimzoService
          .postLoadKey(keyId, json?.challenge)
          .then((res) => {
            mutate({
              url: "auth/e-imzo",
              data: { code: res },
              onSuccess: ({ data }) => {
                setToken(data.access_token);
                setRole(data.role);
                signIn(data);
                if (data.role == "ROLE_EMPLOYEE_SUPER") {
                  navigate("/employe/statistics-seper");
                } else if (data.role == "ROLE_EMPLOYEE") {
                  navigate("/employe/statistics");
                } else {
                  navigate("/");
                }
                successMasseg(
                  "Tizimga kirish muvaffaqiyatli amalga oshirildi!"
                );
              },
              onError: () => {
                errorMasseg("ERI kalit foydalanuvchisi tizimda topilmadi");
              },
            });
          })
          .catch(() => {
            errorMasseg("Kalit uchun maxfiy so'z noto'g'ri kiritildi");
          });
      })
      .catch(() => {
        errorMasseg("Parol xato?");
      });
  };

  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      title="Elektron raqamli imzo bilan kirish"
      open={openModal}
      onOk={showModal}
      onCancel={handleCancel}
      zIndex={1050}
      width={550}
      maskClosable={false}
      footer={""}
    >
      <div className="mt-6">
        <div className="flex items-center justify-center flex-col gap-6 px-5">
          {keys.map((item, i) => (
            <div
              key={i}
              className="w-full flex items-center justify-between gap-1 border-2 border-[var(--borderWhite-color)] bg-[var(--bgWhite-color)] rounded-lg px-8 py-4 transition duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-md:flex-col"
            >
              <div className="">
                <p className="text-[var(--textBlack-color)] text-xs">
                  JSHSHIR : {item?.parsedAlias?.["1.2.860.3.16.1.2"]}
                </p>
                <p className="text-[var(--textBlack-color)] text-base font-semibold">
                  {item?.parsedAlias?.cn?.toUpperCase()}
                </p>
                <p className="text-[var(--textBlack-color)] text-xs mt-4">
                  {item?.parsedAlias?.["1.2.860.3.16.1.1"]
                    ? "Yuridik shaxs"
                    : "Jismoniy shaxs"}
                </p>
                <p className="text-[var(--text-color)] text-xs">
                  ERI ning amal qilish muddati tugash sanasi :{" "}
                  {getDateReverse(item?.parsedAlias?.validto?.split(" ")?.[0])}
                </p>
              </div>
              <button
                className="py-2 px-6 text-sm rounded-3xl border text-[var(--textBlack-color)] border-[var(--border-color)] bg-transparent font-bold hover:bg-[var(--border-color)] transition duration-300 hover:text-white hover:shadow-[0_10px_30px_rgba(8,_112,_184,_0.7)]"
                onClick={() => sign(item?.serialNumber)}
                disabled={isLoading}
              >
                Kirish
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default Eimzoo;
