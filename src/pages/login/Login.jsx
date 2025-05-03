import { LoadingOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Spin } from "antd";
import { EIMZO, LOGO3, ONEID } from "assets/icon";
import { BRIDGE } from "assets/imgs";
import Eimzoo from "eImzo/eimzoo";
import { usePost } from "hooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "stores";
import { setRole, setToken } from "utils/storages";
import { errorMasseg, successMasseg } from "utils/toastify";

export const Login = () => {
  //   modal e-imzo
  const [openModal, setOpenModal] = useState(false);
  const { handleSubmit, control } = useForm();
  const { signIn } = useLoginStore();
  const { mutate, isLoading } = usePost();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    mutate({
      url: "auth/login",
      data,
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
        successMasseg("Tizimga kirish muvaffaqiyatli amalga oshirildi!");
      },
      onError: () => {
        errorMasseg("Login yoki Parolingiz xato?");
      },
    });
  };
  const getAllkeys = () => {
    setOpenModal(true);
  };
  return (
    <>
      <div className="w-full min-h-screen h-max flex items-center justify-center ">
        <video
          src={BRIDGE}
          className="absolute top-0 left-0 z-10 w-full h-full object-cover object-center"
          muted
          loop
          autoPlay
        ></video>
        <div className="w-full h-full bg-[#00000037] absolute top-0 left-0 z-[15]"></div>
        <div className="relative z-20 max-w-[475px] w-full backdrop-blur-[2px] shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] bg-[#00000011] p-6 rounded flex flex-col items-center justify-center max-sm:w-[90%] max-sm:p-4 border border-[var(--textOpasity-color)]">
          <img
            className="w-64 object-cover object-center"
            src={LOGO3}
            alt="logo"
          />
          <h3 className="mt-5 text-2xl font-medium text-[#fff] text-center max-sm:text-xl max-sm:mt-8 max-sm:mb-3">{`"HRM" veb platformasi`}</h3>
          <h4 className="text-base text-[#ffffff] text-center">
            Davom etish uchun ma’lumotlaringizni kiriting
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Loginni kiriting"
                  className="mt-6 max-sm:mt-4 px-3 py-2 rounded-md border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] !bg-white"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  placeholder="Parolni kiriting"
                  className="mt-6 max-sm:mt-3 px-3 py-2 rounded-md border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] bg-white"
                />
              )}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="w-full mt-6 p-2 text-white font-semibold bg-[#0000003b] shadow-[0_0_5px_5px_rgba(0,0,0,0.1)] border border-[#ffffff8d] rounded text-center"
            >
              {isLoading ? (
                <Spin
                  indicator={<LoadingOutlined style={{ color: "#fff" }} />}
                />
              ) : (
                "Kirish"
              )}
            </button>
          </form>
          <div className="flex items-center justify-center w-full mt-7">
            <div className="flex-1 h-[0.5px] bg-white"></div>
            <p className="text-sm text-white bg-transparent px-1 w-max">
              YOKI QUYDAGILAR ORQALI KIRISH
            </p>
            <div className="flex-1 h-[0.5px] bg-white"></div>
          </div>
          <div className="flex items-stretch justify-center gap-3 w-full mt-2">
            <div className="border border-white rounded-md p-1 w-max cursor-pointer bg-transparent flex items-center justify-center hover:scale-105 transition duration-300">
              <div className="w-max h-max rounded-md bg-white">
                <img
                  className="w-24 object-cover object-center max-sm:w-20"
                  src={ONEID}
                  alt=""
                />
              </div>
            </div>
            <div
              onClick={getAllkeys}
              className="border border-white rounded-md p-1 w-max cursor-pointer bg-transparent flex items-center justify-center hover:scale-105 transition duration-300"
            >
              <img
                className="w-24 object-cover object-center max-sm:w-20"
                src={EIMZO}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <Eimzoo openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </>
  );
};
