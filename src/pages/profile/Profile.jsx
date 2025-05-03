import { Input } from "antd";
import { Tabs } from "antd";
import { BARIMG } from "assets/imgs";
import { Breadcrumb, Loading, UploadOneImg } from "components";
import { useGet, usePost } from "hooks";
import { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { imgUrl } from "service";
import { useLoginStore } from "stores";
import { roleReturnText } from "utils/role";
import { errorMasseg, successMasseg } from "utils/toastify";

export const Profile = () => {
  const { control, handleSubmit, reset } = useForm();
  const { control: control2, handleSubmit: handleSubmit2 } = useForm();
  const [imgs, setimgs] = useState();

  const {
    data: { data: personal },
    isLoading,
    refetch,
  } = useGet({ url: "profile/view" });
  const { mutate, isLoading: loadingName } = usePost();
  const { mutate: passMutate, isLoading: loadingPass } = usePost();
  const { role } = useLoginStore();
  useEffect(() => {
    reset({
      full_name: personal?.full_name,
      username: personal?.username,
      phone_number: personal?.phone_number,
    });
    setimgs({
      id: personal?.file?.file_id,
      url: personal?.file?.url_1,
    });
  }, [personal]);

  const onSubmit = (form) => {
    mutate({
      url: "profile/update",
      method: "PUT",
      data: { ...form, file_id: imgs?.id },
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot yangilandi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  const onSubmitPassword = (form) => {
    passMutate({
      url: "profile/update-password",
      method: "PUT",
      data: form,
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot yangilandi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb link={"Profile"} link1={"Profile"} link2={""} />
      <div className="p-3 rounded-lg bg-[var(--bgWhite-color)]">
        <div
          style={{ "--image-url": `url(${BARIMG})` }}
          className="bg-[image:var(--image-url)] w-full h-80 rounded-lg bg-no-repeat bg-cover bg-center"
        ></div>
        <div className="flex items-center justify-start gap-6 translate-y-[-40px] ml-[15%] max-sm:ml-0 max-sm:justify-center max-sm:flex-col max-sm:gap-4">
          <img
            src={
              personal?.file?.url_1
                ? imgUrl + personal?.file?.url_1
                : "https://www.w3schools.com/howto/img_avatar.png"
            }
            className="w-40 h-40 rounded-lg object-cover object-center border-2 border-[var(--bgWhite-color)]"
            alt="profile-img"
          />
          <div className="flex items-start justify-center flex-col max-sm:items-center">
            <h4 className="text-base font-medium text-[var(--textBlack-color)]">
              {personal?.full_name}
            </h4>
            <h5 className="text-sm font-normal text-[var(--textGray-color)]">
              {roleReturnText(role)}
            </h5>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 mt-6">
        <div>
          <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Shaxsiy ma'lumotlar",
                  children: (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col items-center gap-5"
                    >
                      <UploadOneImg imgs={imgs} setimgs={setimgs} />
                      <Controller
                        name="full_name"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder=".F.I.O"
                            size="large"
                            className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                          />
                        )}
                      />
                      <Controller
                        name="username"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Foydalanuvchi nomi"
                            size="large"
                            className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                          />
                        )}
                      />
                      <Controller
                        name="phone_number"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Telefon raqam"
                            size="large"
                            className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                          />
                        )}
                      />
                      <div className="w-full">
                        <button
                          disabled={loadingName}
                          type="submit"
                          className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
                        >
                          Saqlash
                        </button>
                      </div>
                    </form>
                  ),
                },
                {
                  key: "2",
                  label: "Parolni o'zgartirish",
                  children: (
                    <form
                      onSubmit={handleSubmit2(onSubmitPassword)}
                      className="flex flex-col items-center gap-5"
                    >
                      <Controller
                        name="old_password"
                        control={control2}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Eski parol"
                            size="large"
                            className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                          />
                        )}
                      />
                      <Controller
                        name="new_password"
                        control={control2}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Yangi parol"
                            size="large"
                            className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                          />
                        )}
                      />
                      <Controller
                        name="confirm_password"
                        control={control2}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Yangi parolni takrorlang"
                            size="large"
                            className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                          />
                        )}
                      />
                      <div className="w-full">
                        <button
                          disabled={loadingPass}
                          type="submit"
                          className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
                        >
                          Saqlash
                        </button>
                      </div>
                    </form>
                  ),
                },
              ]}
            />
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
            <section className="py-10 bg-white h-max rounded-2xl flex items-center justify-center flex-col">
              <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] w-full bg-no-repeat h-[400px] bg-center">
                <h1 className="text-center text-4xl font-bold">Tez orada</h1>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
