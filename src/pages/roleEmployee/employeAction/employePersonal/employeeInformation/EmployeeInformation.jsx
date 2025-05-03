import { Select } from "antd";
import { useGet, usePost } from "hooks";
import { Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { errorMasseg, successMasseg } from "utils/toastify";
import {
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Modal } from "antd";
import { DatePicker } from "antd";
import { Popover } from "antd";
import { Popconfirm } from "antd";
import dayjs from "dayjs";
import { getDateForm, getDateReverse } from "utils/idCreate";
import { Loading, MilitaryAccount, UploadMoreFile } from "components";
import { imgUrl } from "service";

export const EmployeeInformation = () => {
  const { id } = useParams();
  const [editId1, seteditId1] = useState(-1);
  const [editId2, seteditId2] = useState(-1);
  const [editId3, seteditId3] = useState(-1);
  const [editId4, seteditId4] = useState(-1);
  const [editId5, seteditId5] = useState(-1);
  const { control, handleSubmit, reset } = useForm();
  const {
    control: control1,
    handleSubmit: handleSubmit1,
    reset: reset1,
    setValue: setValue1,
  } = useForm();
  const {
    control: control2,
    handleSubmit: handleSubmit2,
    reset: reset2,
  } = useForm();
  const {
    control: control3,
    handleSubmit: handleSubmit3,
    reset: reset3,
  } = useForm();
  const {
    control: control4,
    handleSubmit: handleSubmit4,
    reset: reset4,
  } = useForm();
  const {
    control: control5,
    handleSubmit: handleSubmit5,
    reset: reset5,
  } = useForm();
  // -------------------- form
  const { mutate } = usePost();
  //   Malumotlarni olib kelish
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `employee-edit/information/${id}`,
  });
  useEffect(() => {
    if (data) {
      reset({
        educations_id: data?.employee?.user_education_id,
        language_id: data?.employee?.languages?.map((e) => e.id),
        militar_rank: data?.employee?.militar_rank,
        elected_body: data?.employee?.elected_body,
        academicdegree_id: data?.employee?.user_academic_degree_id,
        parties_id: data?.employee?.user_parties_id,
        academictitlies_id: data?.employee?.user_academictitlies_id,
        // nationality_id: data?.cardy?.nationality_id?.id,
      });
    }
  }, [data]);
  //  Oliygoh Malumotlarni olib kelish
  const {
    data: { data: data1 },
    refetch: refetch1,
  } = useGet({
    url: `university-information/find-all/${id}`,
  });
  //  Oliygoh Malumotlarni olib kelish
  const {
    data: { data: educationTypes },
  } = useGet({
    url: `education-types/find-all`,
  });
  // talim darajasini olish
  const [educationLavel, seteducationLavel] = useState(null);
  const {
    data: { data: educationLaveldata },
    isLoading: educationLoading,
  } = useGet({
    url: `education-lavel/find-all?type_id=${educationLavel}`,
    enabled: educationLavel,
  });
  const onSubmit = (form) => {
    mutate({
      url: `employee-edit/information-save/${id}`,
      method: "PUT",
      data: {
        // nationality_id: form?.nationality_id,
        educations_id: form?.educations_id,
        language_id: form?.language_id,
        academicdegree_id: form?.academicdegree_id,
        academictitlies_id: form?.academictitlies_id,
        parties_id: form?.parties_id,
        military_rank: form?.militar_rank,
        elected_body: form?.elected_body,
      },
      onSuccess: () => {
        successMasseg("Ma'lumot yangilandi !");
        refetch();
      },
      onError: () => {
        errorMasseg("Xatolik ?");
      },
    });
  };
  const [files1, setfiles1] = useState([]);
  // oliygoh
  const onSubmit1 = (form) => {
    if (editId1 != -1) {
      mutate({
        url: `university-information/update`,
        method: "PUT",
        data: {
          university_id: editId1,
          education_form: form?.education_form,
          user_id: id,
          education_type_id: form?.education_type_id,
          education_lavel_id: form?.education_lavel_id,
          start_date: getDateForm(form?.start_date),
          end_date: getDateForm(form?.end_date),
          education_name: form?.education_name,
          specialty: form?.specialty,
          seria_number: form?.seria_number,
          files: files1?.map((e) => e.id),
        },
        onSuccess: () => {
          handleCancel1();
          resInput1();
          refetch1();
          successMasseg("Ma'lumot yangilandi !");
          seteditId1(-1);
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    } else {
      mutate({
        url: `university-information/create`,
        method: "POST",
        data: {
          education_form: form?.education_form,
          user_id: id,
          education_type_id: form?.education_type_id,
          education_lavel_id: form?.education_lavel_id,
          start_date: getDateForm(form?.start_date),
          end_date: getDateForm(form?.end_date),
          education_name: form?.education_name,
          specialty: form?.specialty,
          seria_number: form?.seria_number,
          files: files1?.map((e) => e.id),
        },
        onSuccess: () => {
          handleCancel1();
          resInput1();
          refetch1();
          successMasseg("Ma'lumot yangilandi !");
        },
        onError: () => {
          errorMasseg("Xatolik ?");
        },
      });
    }
  };
  // malumotni uzgartirish oliygoh
  const updateOrganizations1 = (item) => {
    seteditId1(item?.id);
    reset1({
      education_type_id: item?.education_type_id,
      education_lavel_id: item?.education_lavel_id,
      education_form: item?.education_form,
      start_date: item?.start_date ? dayjs(item?.start_date) : "",
      end_date: item?.end_date ? dayjs(item?.end_date) : "",
      education_name: item?.education_name,
      seria_number: item?.seria_number,
      specialty: item?.specialty,
    });
    seteducationLavel(item?.education_type_id);
    setfiles1(
      item?.files?.map((e) => {
        return {
          id: e.id,
          url: e.url_1,
          name: e.name_1,
        };
      })
    );
    showModal1();
  };
  // malumotni uchirish oliygoh
  const deleteConfirm1 = (id) => {
    mutate({
      url: `university-information/delete/${id}`,
      method: "DELETE",
      onSuccess: () => {
        refetch1();
        successMasseg("Ma'lumot o'chirildi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  //   modal
  const [openModal1, setOpenModal1] = useState(false);
  // modalni ochish
  const showModal1 = () => {
    setOpenModal1(true);
  };
  // modalni yopish
  const handleCancel1 = () => {
    setOpenModal1(false);
    resInput1();
    setfiles1([]);
  };
  //inputlani bushatish
  const resInput1 = () => {
    reset1({
      start_date: null,
      end_date: null,
      education_name: null,
      specialty: null,
    });
  };
  // input selectlani filterlash
  const filterOption = (input, option) => {
    return (option?.children ?? "").toLowerCase().includes(input.toLowerCase());
  };

  //Xorijda o'qish ma'lumotlarini olib kelish ------------------------
  const {
    data: { data: data2 },
    refetch: refetch2,
  } = useGet({
    url: `studied-abroad/find-all/${id}`,
  });
  const {
    data: { data: funding },
  } = useGet({
    url: `studied-abroad/find-all-fundings`,
  });
  // xorijda o'qiganligi yuborish
  const onSubmit2 = (form) => {
    if (editId2 != -1) {
      mutate({
        url: `studied-abroad/update`,
        method: "PUT",
        data: {
          id: editId2,
          user_id: id,
          start_date: getDateForm(form?.start_date),
          end_date: getDateForm(form?.end_date),
          education_name: form?.education_name,
          specialty: form?.specialty,
          funding_edu_id: form?.funding_edu_id,
        },
        onSuccess: () => {
          handleCancel2();
          resInput2();
          refetch2();
          successMasseg("Ma'lumot yangilandi !");
          seteditId2(-1);
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    } else {
      mutate({
        url: `studied-abroad/create`,
        method: "POST",
        data: {
          user_id: id,
          start_date: getDateForm(form?.start_date),
          end_date: getDateForm(form?.end_date),
          education_name: form?.education_name,
          specialty: form?.specialty,
          funding_edu_id: form?.funding_edu_id,
        },
        onSuccess: () => {
          handleCancel2();
          resInput2();
          refetch2();
          successMasseg("Ma'lumot yangilandi !");
        },
        onError: () => {
          errorMasseg("Xatolik ?");
        },
      });
    }
  };

  // malumotni uzgartirish xorijda o'qiganligi
  const updateOrganizations2 = (item) => {
    seteditId2(item?.id);
    reset2({
      start_date: item?.start_date ? dayjs(item?.start_date) : "",
      end_date: item?.end_date ? dayjs(item?.end_date) : "",
      education_name: item?.education_name,
      specialty: item?.specialty,
      funding_edu_id: item?.funding?.id,
    });
    showModal2();
  };
  // malumotni uchirish xorijda o'qiganligi
  const deleteConfirm2 = (id) => {
    mutate({
      url: `studied-abroad/delete/${id}`,
      method: "DELETE",
      onSuccess: () => {
        refetch2();
        successMasseg("Ma'lumot o'chirildi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  //   modal
  const [openModal2, setOpenModal2] = useState(false);
  // modalni ochish
  const showModal2 = () => {
    setOpenModal2(true);
  };
  // modalni yopish
  const handleCancel2 = () => {
    setOpenModal2(false);
    resInput2();
  };
  //inputlani bushatish
  const resInput2 = () => {
    reset2({
      start_date: null,
      end_date: null,
      education_name: null,
      specialty: null,
      funding_edu_id: null,
    });
  };

  //Akademik ma'lumotlarini olib kelish ------------------------
  const {
    data: { data: data3 },
    refetch: refetch3,
  } = useGet({
    url: `educated-academy/find-all/${id}`,
  });
  const {
    data: { data: academic },
  } = useGet({
    url: `educated-academy/find-all-academic`,
  });
  // Akademik o'qiganligini yuborish
  const onSubmit3 = (form) => {
    if (editId3 != -1) {
      mutate({
        url: `educated-academy/update`,
        method: "PUT",
        data: {
          id: editId3,
          user_id: id,
          start_date: getDateForm(form?.start_date),
          end_date: getDateForm(form?.end_date),
          employee_academic_id: form?.employee_academic_id,
        },
        onSuccess: () => {
          handleCancel3();
          resInput3();
          refetch3();
          successMasseg("Ma'lumot yangilandi !");
          seteditId3(-1);
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    } else {
      mutate({
        url: `educated-academy/create`,
        method: "POST",
        data: {
          user_id: id,
          start_date: getDateForm(form?.start_date),
          end_date: getDateForm(form?.end_date),
          employee_academic_id: form?.employee_academic_id,
        },
        onSuccess: () => {
          handleCancel3();
          resInput3();
          refetch3();
          successMasseg("Ma'lumot yangilandi !");
        },
        onError: () => {
          errorMasseg("Xatolik ?");
        },
      });
    }
  };
  // malumotni uzgartirish xorijda o'qiganligi
  const updateOrganizations3 = (item) => {
    seteditId3(item?.id);
    reset3({
      start_date: item?.start_date ? dayjs(item?.start_date) : "",
      end_date: item?.end_date ? dayjs(item?.end_date) : "",
      employee_academic_id: item?.academic?.id,
    });
    showModal3();
  };
  // malumotni uchirish xorijda o'qiganligi
  const deleteConfirm3 = (id) => {
    mutate({
      url: `educated-academy/delete/${id}`,
      method: "DELETE",
      onSuccess: () => {
        refetch3();
        successMasseg("Ma'lumot o'chirildi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  //   modal
  const [openModal3, setOpenModal3] = useState(false);
  // modalni ochish
  const showModal3 = () => {
    setOpenModal3(true);
  };
  // modalni yopish
  const handleCancel3 = () => {
    setOpenModal3(false);
    resInput3();
  };
  //inputlani bushatish
  const resInput3 = () => {
    reset3({
      start_date: null,
      end_date: null,
      employee_academic_id: null,
    });
  };

  //Sertifikat qo'shish olib kelish ------------------------
  const {
    data: { data: data4 },
    refetch: refetch4,
  } = useGet({
    url: `certificate/find-all/${id}`,
  });
  const {
    data: { data: certificate },
  } = useGet({
    url: `certificate/find-all-types`,
  });
  const [files, setfiles] = useState([]);
  // Akademik o'qiganligini yuborish
  const onSubmit4 = (form) => {
    if (editId4 != -1) {
      mutate({
        url: `certificate/update`,
        method: "PUT",
        data: {
          id: editId4,
          user_id: id,
          start_date: getDateForm(form?.start_date),
          end_date: getDateForm(form?.end_date),
          certificate_degree: form?.certificate_degree,
          certificate_bal: form?.certificate_bal,
          certificate_type_id: form?.certificate_type_id,
          files: files?.map((e) => e.id),
        },
        onSuccess: () => {
          handleCancel4();
          resInput4();
          refetch4();
          successMasseg("Ma'lumot yangilandi !");
          seteditId4(-1);
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    } else {
      mutate({
        url: `certificate/create`,
        method: "POST",
        data: {
          user_id: id,
          start_date: getDateForm(form?.start_date),
          end_date: getDateForm(form?.end_date),
          certificate_degree: form?.certificate_degree,
          certificate_bal: form?.certificate_bal,
          certificate_type_id: form?.certificate_type_id,
          files: files?.map((e) => e.id),
        },
        onSuccess: () => {
          handleCancel4();
          resInput4();
          refetch4();
          successMasseg("Ma'lumot yangilandi !");
        },
        onError: () => {
          errorMasseg("Xatolik ?");
        },
      });
    }
  };
  // malumotni uzgartirish xorijda o'qiganligi
  const updateOrganizations4 = (item) => {
    seteditId4(item?.id);
    reset4({
      start_date: item?.start_date ? dayjs(item?.start_date) : "",
      end_date: item?.end_date ? dayjs(item?.end_date) : "",
      certificate_degree: item?.certificate_degree,
      certificate_bal: item?.certificate_bal,
      certificate_type_id: item?.certificate_type?.id,
    });
    setfiles(
      item?.files?.map((e) => {
        return {
          id: e.id,
          url: e.url_1,
          name: e.name_1,
        };
      })
    );
    showModal4();
  };
  // malumotni uchirish xorijda o'qiganligi
  const deleteConfirm4 = (id) => {
    mutate({
      url: `certificate/delete/${id}`,
      method: "DELETE",
      onSuccess: () => {
        refetch4();
        successMasseg("Ma'lumot o'chirildi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  //   modal
  const [openModal4, setOpenModal4] = useState(false);
  // modalni ochish
  const showModal4 = () => {
    setOpenModal4(true);
  };
  // modalni yopish
  const handleCancel4 = () => {
    setOpenModal4(false);
    resInput4();
  };
  //inputlani bushatish
  const resInput4 = () => {
    reset4({
      start_date: null,
      end_date: null,
      certificate_degree: null,
      certificate_bal: null,
      certificate_type_id: null,
    });
    setfiles([]);
  };
  // guvahnoma qo'shish
  //  guvahnoma olib kelish
  const {
    data: { data: data5 },
    refetch: refetch5,
  } = useGet({
    url: `qualification-certificate/find-all/${id}`,
  });
  //  guvahnoma turini olib kelish
  const {
    data: { data: qualification },
  } = useGet({
    url: `qualification-certificate/find-all-types`,
  });

  const [files5, setfiles5] = useState([]);
  // oliygoh
  const onSubmit5 = (form) => {
    if (editId5 != -1) {
      mutate({
        url: `qualification-certificate/update`,
        method: "PUT",
        data: {
          id: editId5,
          user_id: id,
          time_taken: getDateForm(form?.time_taken),
          qualification_certificate_type_id:
            form?.qualification_certificate_type_id,
          org_name: form?.org_name,
          education_name: form?.education_name,
          direction_name: form?.direction_name,
          number: form?.number,
          specialty: form?.specialty,
          files: files5?.map((e) => e.id),
        },
        onSuccess: () => {
          handleCancel5();
          resInput5();
          refetch5();
          successMasseg("Ma'lumot yangilandi !");
          seteditId5(-1);
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    } else {
      mutate({
        url: `qualification-certificate/create`,
        method: "POST",
        data: {
          user_id: id,
          time_taken: getDateForm(form?.time_taken),
          qualification_certificate_type_id:
            form?.qualification_certificate_type_id,
          org_name: form?.org_name,
          education_name: form?.education_name,
          direction_name: form?.direction_name,
          number: form?.number,
          specialty: form?.specialty,
          files: files5?.map((e) => e.id),
        },
        onSuccess: () => {
          handleCancel5();
          resInput5();
          refetch5();
          successMasseg("Ma'lumot qo'shildi !");
        },
        onError: () => {
          errorMasseg("Xatolik ?");
        },
      });
    }
  };
  // malumotni uzgartirish oliygoh
  const updateOrganizations5 = (item) => {
    seteditId5(item?.id);
    reset5({
      time_taken: item?.time_taken ? dayjs(item?.time_taken) : "",
      qualification_certificate_type_id:
        item?.qualification_certificate_type_id,
      org_name: item?.org_name,
      education_name: item?.education_name,
      direction_name: item?.direction_name,
      specialty: item?.specialty,
      number: item?.number,
    });
    setfiles5(
      item?.files?.map((e) => {
        return {
          id: e.id,
          url: e.url_1,
          name: e.name_1,
        };
      })
    );
    showModal5();
  };
  // malumotni uchirish oliygoh
  const deleteConfirm5 = (id) => {
    mutate({
      url: `qualification-certificate/delete/${id}`,
      method: "DELETE",
      onSuccess: () => {
        refetch5();
        successMasseg("Ma'lumot o'chirildi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  //   modal
  const [openModal5, setOpenModal5] = useState(false);
  // modalni ochish
  const showModal5 = () => {
    setOpenModal5(true);
  };
  // modalni yopish
  const handleCancel5 = () => {
    setOpenModal5(false);
    resInput5();
    setfiles5([]);
  };
  //inputlani bushatish
  const resInput5 = () => {
    reset5({
      time_taken: null,
      qualification_certificate_type_id: null,
      org_name: null,
      education_name: null,
      specialty: null,
      direction_name: null,
      number: null,
    });
  };

  //   backend bilan aloqa
  const {
    data: { data: militaryRank },
  } = useGet({
    url: `military-titles/find/all`,
  });

  const [openModal, setOpenModal] = useState(false);
  const [fileSee, setfileSee] = useState(null);
  const showFdf = (url) => {
    window.open(url);
    // setfileSee(url);
    // showModal();
  };
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
  };
  if (isLoading) return <Loading />;
  return (
    <>
      {/* MA'LUMOTLARI */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
          <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5">
            <p className="text-sm text-[var(--textBlack-color)]">
              Ma'lumotlari
            </p>
          </div>
          <div className="p-5 grid grid-cols-4 gap-5 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
            {/* Ma'lumoti*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ma'lumoti{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="educations_id"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Ma'lumotini tanlang"
                  >
                    {data?.educations?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Chet tillari*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Chet tillari{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="language_id"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    mode="multiple"
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Chet tillarini tanlang"
                  >
                    {data?.languages?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Harbiy unvoni */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Harbiy unvoni
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="militar_rank"
                defaultValue={"Yo'q"}
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Ma'lumotini tanlang"
                  >
                    {militaryRank?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Saylangan organlarga a'zoligi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Saylangan organlarga a'zoligi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="elected_body"
                control={control}
                defaultValue={"Yo'q"}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Saylangan organlarga a'zoligini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Ilmiy darajasi*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ilmiy darajasi{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="academicdegree_id"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Ilmiy darajasini tanlang"
                  >
                    {data?.academicdegree?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Partiyaviyligi*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Partiyaviyligi{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="parties_id"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Partiyaviyligini tanlang"
                  >
                    {data?.parties?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Ilmiy unvoni*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ilmiy unvoni{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="academictitlies_id"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Ilmiy unvonini tanlang"
                  >
                    {data?.academictitlies?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div></div>
            {/* Millati
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Millati{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">*</sup>
              </label>
              <Controller
                name="nationality_id"
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Millatini tanlang"
                  >
                    {data?.nationalities?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div> */}
            <div className="w-full mt-6">
              <button
                type="submit"
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Harbiy xisob */}
      <MilitaryAccount
        data={data}
        militaryRank={militaryRank}
        refetch={refetch}
      />

      {/* oliygoh qo'shish */}
      <div className="mt-7">
        {data1?.length > 0 ? (
          <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
            <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5 flex items-center justify-between">
              <p className="text-sm text-[var(--textBlack-color)]">
                Oliygoh ma'lumotlari
              </p>
              <button
                onClick={showModal1}
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                <PlusOutlined /> Oliygoh ma'lumotlarini qo'shish
              </button>
            </div>
            <div className="w-full h-max p-5 overflow-x-auto">
              <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
                <thead className="table-header-group">
                  <tr className="text-inherit table-row align-middle outline-0">
                    <th className="w-11 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      T/r
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Yuklangan fayllar
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Ta'lim turi
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Ta'lim darajasi
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Ta'lim shakli
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Qachondan
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Qachongacha
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Bilim yurti nomi
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Mutaxassisligi
                    </th>
                    <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="table-row-group align-middle border-inherit">
                  {data1?.map((e, i) => {
                    return (
                      <tr
                        className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                        key={i}
                      >
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {i + 1}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <div className="flex gap-2 flex-wrap items-center justify-start">
                            {e?.files?.map((file) => (
                              <span
                                onClick={() => showFdf(imgUrl + file?.url_1)}
                                key={file?.id}
                                className="text-xl w-8 h-8 rounded flex items-center justify-center text-[var(--textBlack-color)] cursor-pointer border border-solid border-[var(--borderWhite-color)]"
                              >
                                <FileSearchOutlined />
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.education_type?.name}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.education_lavel?.name}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.education_form}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {getDateReverse(e?.start_date)}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {getDateReverse(e?.end_date)}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.education_name}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.specialty}
                        </td>
                        <td className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <Popover
                            placement="bottomRight"
                            content={
                              <div className="flex flex-col items-start justify-center">
                                <p
                                  onClick={() => updateOrganizations1(e)}
                                  className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2"
                                >
                                  <EditOutlined />
                                  Tahrirlash
                                </p>
                                <Popconfirm
                                  title="Ma'lumotni o'chirish"
                                  description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                                  placement="topRight"
                                  onConfirm={() => deleteConfirm1(e?.id)}
                                  onCancel={() => {}}
                                  okText="Ha"
                                  cancelText="Yo'q"
                                >
                                  <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2">
                                    <DeleteOutlined />
                                    O'chirish
                                  </p>
                                </Popconfirm>
                              </div>
                            }
                            trigger="click"
                          >
                            <div className="text-xl w-max flex items-center justify-center bg-[var(--textOpasity-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300 p-1  rounded-lg">
                              <MoreOutlined />
                            </div>
                          </Popover>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full h-20 flex items-center justify-center border border-[var(--text-color)] border-dashed">
            <button
              onClick={showModal1}
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              <PlusOutlined /> Oliygoh ma'lumotlarni qo'shish
            </button>
          </div>
        )}
        <Modal
          title="Oliygoh ma'lumotlarni qo'shish"
          open={openModal1}
          onOk={showModal1}
          onCancel={handleCancel1}
          zIndex={1050}
          footer={""}
        >
          <form
            onSubmit={handleSubmit1(onSubmit1)}
            className="flex flex-col items-center gap-5 mt-5"
          >
            {/* Ta'lim turi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ta'lim turi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="education_type_id"
                control={control1}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    onChange={(e) => {
                      field.onChange(e);
                      seteducationLavel(e);
                      setValue1("education_lavel_id", null, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Ta'lim turini tanlang"
                  >
                    {educationTypes?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Ta'lim darajasi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ta'lim darajasi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="education_lavel_id"
                control={control1}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    loading={educationLoading}
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Ta'lim darajasini tanlang"
                  >
                    {educationLaveldata?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Ta'lim shakli */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Ta'lim shakli
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="education_form"
                control={control1}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    // loading={staffLoading}
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Ta'lim shaklini tanlang"
                  >
                    <Select.Option value={"kunduzgi"}>Kunduzgi</Select.Option>
                    <Select.Option value={"kechki"}>Kechki</Select.Option>
                    <Select.Option value={"sirtqi"}>Sirtqi</Select.Option>
                    <Select.Option value={"maxsus"}>Maxsus</Select.Option>
                  </Select>
                )}
              />
            </div>
            {/* Qachondan (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qachondan (kun-oy-yil){" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="start_date"
                control={control1}
                rules={{ required: false }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format={"DD.MM.YYYY"}
                    placeholder="KK.OO.YYYY"
                    type="date"
                    className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Qachongacha (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qachongacha (kun-oy-yil){" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="end_date"
                control={control1}
                rules={{ required: false }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format={"DD.MM.YYYY"}
                    placeholder="KK.OO.YYYY"
                    type="date"
                    className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Tamomlagan bilim yurti */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tamomlagan bilim yurti{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="education_name"
                control={control1}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tamomlagan bilim yurtini nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Tamomlagan bilim yurti yo'nalishi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tamomlagan bilim yurti yo'nalishi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="specialty"
                control={control1}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tamomlagan bilim yurti yo'nalishini nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Diplom seriya va raqami */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Diplom seriya va raqami
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="seria_number"
                control={control1}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Diplom seriya va raqamini nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            <UploadMoreFile files={files1} setfiles={setfiles1} />
            <div className="w-full">
              <button
                type="submit"
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                Saqlash
              </button>
            </div>
          </form>
        </Modal>
      </div>

      {/* Guvohnoma qo'shish */}
      <div className="mt-7">
        {data5?.length > 0 ? (
          <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
            <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5 flex items-center justify-between">
              <p className="text-sm text-[var(--textBlack-color)]">
                Guvohnoma ma'lumotlari
              </p>
              <button
                onClick={showModal5}
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                <PlusOutlined /> Guvohnoma ma'lumotlarini qo'shish
              </button>
            </div>
            <div className="w-full h-max p-5 overflow-x-auto">
              <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
                <thead className="table-header-group">
                  <tr className="text-inherit table-row align-middle outline-0">
                    <th className="w-11 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      T/r
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Yuklangan fayllar
                    </th>
                    <th className="w-36 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Olgan vaqti
                    </th>
                    <th className="w-36 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Guvohnoma turi
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Muassasa nomi
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Yunalishi
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Raqami
                    </th>
                    <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="table-row-group align-middle border-inherit">
                  {data5?.map((e, i) => {
                    return (
                      <tr
                        className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                        key={i}
                      >
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {i + 1}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <div className="flex gap-2 flex-wrap items-center justify-start">
                            {e?.files?.map((file) => (
                              <span
                                onClick={() => showFdf(imgUrl + file?.url_1)}
                                key={file?.id}
                                className="text-xl w-8 h-8 rounded flex items-center justify-center text-[var(--textBlack-color)] cursor-pointer border border-solid border-[var(--borderWhite-color)]"
                              >
                                <FileSearchOutlined />
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {getDateReverse(e?.time_taken)}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.qualification_certificate_type?.name}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.org_name}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.direction_name}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.number}
                        </td>
                        <td className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <Popover
                            placement="bottomRight"
                            content={
                              <div className="flex flex-col items-start justify-center">
                                <p
                                  onClick={() => updateOrganizations5(e)}
                                  className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2"
                                >
                                  <EditOutlined />
                                  Tahrirlash
                                </p>
                                <Popconfirm
                                  title="Ma'lumotni o'chirish"
                                  description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                                  placement="topRight"
                                  onConfirm={() => deleteConfirm5(e?.id)}
                                  onCancel={() => {}}
                                  okText="Ha"
                                  cancelText="Yo'q"
                                >
                                  <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2">
                                    <DeleteOutlined />
                                    O'chirish
                                  </p>
                                </Popconfirm>
                              </div>
                            }
                            trigger="click"
                          >
                            <div className="text-xl w-max flex items-center justify-center bg-[var(--textOpasity-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300 p-1  rounded-lg">
                              <MoreOutlined />
                            </div>
                          </Popover>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full h-20 flex items-center justify-center border border-[var(--text-color)] border-dashed">
            <button
              onClick={showModal5}
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              <PlusOutlined /> Guvohnoma ma'lumotlarini qo'shish
            </button>
          </div>
        )}
        <Modal
          title="Guvohnoma ma'lumotlarini qo'shish"
          open={openModal5}
          onOk={showModal5}
          onCancel={handleCancel5}
          zIndex={1050}
          footer={""}
        >
          <form
            onSubmit={handleSubmit5(onSubmit5)}
            className="flex flex-col items-center gap-5 mt-5"
          >
            {/* Olgan vaqti (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Olgan vaqti (kun-oy-yil){" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="time_taken"
                control={control5}
                rules={{ required: false }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format={"DD.MM.YYYY"}
                    placeholder="KK.OO.YYYY"
                    type="date"
                    className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Guvohnoma turi*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Guvohnoma turi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="qualification_certificate_type_id"
                control={control5}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Guvohnoma turini tanlang"
                  >
                    {qualification?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Muassasa nomi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Muassasa nomi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="org_name"
                control={control5}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Muassasa nomini nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Yunalishi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Yunalishi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="direction_name"
                control={control5}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Yunalishini nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Diplom seriya va raqami */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Diplom seriya va raqami
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="number"
                control={control5}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Diplom seriya va raqamini nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            <UploadMoreFile files={files5} setfiles={setfiles5} />
            <div className="w-full">
              <button
                type="submit"
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                Saqlash
              </button>
            </div>
          </form>
        </Modal>
      </div>

      {/* xorijda ta'lim olganligini qo'shish */}
      <div className="mt-7">
        {data2?.length > 0 ? (
          <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
            <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5 flex items-center justify-between">
              <p className="text-sm text-[var(--textBlack-color)]">
                Xorijda ta'lim olganligi ma'lumotlari
              </p>
              <button
                onClick={showModal2}
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                <PlusOutlined /> Xorijda ta'lim olganligi qo'shish
              </button>
            </div>
            <div className="w-full h-max p-5 overflow-x-auto">
              <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
                <thead className="table-header-group">
                  <tr className="text-inherit table-row align-middle outline-0">
                    <th className="w-11 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      T/r
                    </th>
                    <th className="w-36 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Qachondan
                    </th>
                    <th className="w-36 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Qachongacha
                    </th>
                    <th className="min-w-[400px] tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Bilim yurti nomi
                    </th>
                    <th className="min-w-[400px] tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Mutaxassisligi
                    </th>
                    <th className="min-w-[400px] tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Mablag'lashtirish manbai
                    </th>
                    <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="table-row-group align-middle border-inherit">
                  {data2?.map((e, i) => {
                    return (
                      <tr
                        className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                        key={i}
                      >
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {i + 1}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {getDateReverse(e?.start_date)}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {getDateReverse(e?.end_date)}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.education_name}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.specialty}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.funding?.name}
                        </td>
                        <td className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <Popover
                            placement="bottomRight"
                            content={
                              <div className="flex flex-col items-start justify-center">
                                <p
                                  onClick={() => updateOrganizations2(e)}
                                  className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2"
                                >
                                  <EditOutlined />
                                  Tahrirlash
                                </p>
                                <Popconfirm
                                  title="Ma'lumotni o'chirish"
                                  description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                                  placement="topRight"
                                  onConfirm={() => deleteConfirm2(e?.id)}
                                  onCancel={() => {}}
                                  okText="Ha"
                                  cancelText="Yo'q"
                                >
                                  <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2">
                                    <DeleteOutlined />
                                    O'chirish
                                  </p>
                                </Popconfirm>
                              </div>
                            }
                            trigger="click"
                          >
                            <div className="text-xl w-max flex items-center justify-center bg-[var(--textOpasity-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300 p-1  rounded-lg">
                              <MoreOutlined />
                            </div>
                          </Popover>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full h-20 flex items-center justify-center border border-[var(--text-color)] border-dashed">
            <button
              onClick={showModal2}
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              <PlusOutlined /> Xorijda ta'lim olganligini qo'shish
            </button>
          </div>
        )}
        <Modal
          title="Xorijda ta'lim olganligini qo'shish"
          open={openModal2}
          onOk={showModal2}
          onCancel={handleCancel2}
          zIndex={1050}
          footer={""}
        >
          <form
            onSubmit={handleSubmit2(onSubmit2)}
            className="flex flex-col items-center gap-5 mt-5"
          >
            {/* Qachondan (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qachondan (kun-oy-yil){" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="start_date"
                control={control2}
                rules={{ required: false }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format={"DD.MM.YYYY"}
                    placeholder="KK.OO.YYYY"
                    type="date"
                    className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Qachongacha (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qachongacha (kun-oy-yil){" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="end_date"
                control={control2}
                rules={{ required: false }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format={"DD.MM.YYYY"}
                    placeholder="KK.OO.YYYY"
                    type="date"
                    className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Tamomlagan bilim yurti */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tamomlagan bilim yurti{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="education_name"
                control={control2}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tamomlagan bilim yurtini nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Tamomlagan bilim yurti yo'nalishi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tamomlagan bilim yurti yo'nalishi
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="specialty"
                control={control2}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Tamomlagan bilim yurti yo'nalishini nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Mablag'lantirish manbai*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Mablag'lantirish manbai:{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="funding_edu_id"
                control={control2}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Mablag'lantirish manbaini tanlang"
                  >
                    {funding?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                Saqlash
              </button>
            </div>
          </form>
        </Modal>
      </div>

      {/* Akademik qo'shish */}
      <div className="mt-7">
        {data3?.length > 0 ? (
          <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
            <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5 flex items-center justify-between">
              <p className="text-sm text-[var(--textBlack-color)]">
                Akademiya ma'lumotlari
              </p>
              <button
                onClick={showModal3}
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                <PlusOutlined /> Akademiyada ta'lim olganligini qo'shish
              </button>
            </div>
            <div className="w-full h-max p-5 overflow-x-auto">
              <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
                <thead className="table-header-group">
                  <tr className="text-inherit table-row align-middle outline-0">
                    <th className="w-11 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      T/r
                    </th>
                    <th className="w-36 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Qachondan
                    </th>
                    <th className="w-36 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Qachongacha
                    </th>
                    <th className="min-w-[400px] tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Akademiya ma'lumoti
                    </th>
                    <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="table-row-group align-middle border-inherit">
                  {data3?.map((e, i) => {
                    return (
                      <tr
                        className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                        key={i}
                      >
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {i + 1}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {getDateReverse(e?.start_date)}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {getDateReverse(e?.end_date)}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.academic?.name}
                        </td>
                        <td className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <Popover
                            placement="bottomRight"
                            content={
                              <div className="flex flex-col items-start justify-center">
                                <p
                                  onClick={() => updateOrganizations3(e)}
                                  className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2"
                                >
                                  <EditOutlined />
                                  Tahrirlash
                                </p>
                                <Popconfirm
                                  title="Ma'lumotni o'chirish"
                                  description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                                  placement="topRight"
                                  onConfirm={() => deleteConfirm3(e?.id)}
                                  onCancel={() => {}}
                                  okText="Ha"
                                  cancelText="Yo'q"
                                >
                                  <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2">
                                    <DeleteOutlined />
                                    O'chirish
                                  </p>
                                </Popconfirm>
                              </div>
                            }
                            trigger="click"
                          >
                            <div className="text-xl w-max flex items-center justify-center bg-[var(--textOpasity-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300 p-1  rounded-lg">
                              <MoreOutlined />
                            </div>
                          </Popover>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full h-20 flex items-center justify-center border border-[var(--text-color)] border-dashed">
            <button
              onClick={showModal3}
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              <PlusOutlined /> Akademiyada ta'lim olganligini qo'shish
            </button>
          </div>
        )}
        <Modal
          title=" Akademiyada ta'lim olganligini qo'shish"
          open={openModal3}
          onOk={showModal3}
          onCancel={handleCancel3}
          zIndex={1050}
          footer={""}
        >
          <form
            onSubmit={handleSubmit3(onSubmit3)}
            className="flex flex-col items-center gap-5 mt-5"
          >
            {/* Qachondan (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qachondan (kun-oy-yil){" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="start_date"
                control={control3}
                rules={{ required: false }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format={"DD.MM.YYYY"}
                    placeholder="KK.OO.YYYY"
                    type="date"
                    className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Qachongacha (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Qachongacha (kun-oy-yil){" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="end_date"
                control={control3}
                rules={{ required: false }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format={"DD.MM.YYYY"}
                    placeholder="KK.OO.YYYY"
                    type="date"
                    className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Akademiya nomi*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Akademiya nomi:{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="employee_academic_id"
                control={control3}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Akademiya nomini tanlang"
                  >
                    {academic?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                Saqlash
              </button>
            </div>
          </form>
        </Modal>
      </div>

      {/* Sertifikat qo'shish */}
      <div className="mt-7">
        {data4?.length > 0 ? (
          <div className="border rounded-md border-solid border-[var(--borderWhite-color)] mt-10">
            <div className="border-b border-solid border-[var(--borderWhite-color)] rounded-none p-5 flex items-center justify-between">
              <p className="text-sm text-[var(--textBlack-color)]">
                Sertifikat ma'lumotlari
              </p>
              <button
                onClick={showModal4}
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                <PlusOutlined /> Sertifikat qo'shish
              </button>
            </div>
            <div className="w-full h-max p-5 overflow-x-auto">
              <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
                <thead className="table-header-group">
                  <tr className="text-inherit table-row align-middle outline-0">
                    <th className="w-11 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      T/r
                    </th>
                    <th className="w-36 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Yuklangan fayllar
                    </th>
                    <th className="w-36 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Qachondan
                    </th>
                    <th className="w-36 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Qachongacha
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Sertifikat turi
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Sertifikat darajasi
                    </th>
                    <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Sertifikat bali
                    </th>
                    <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="table-row-group align-middle border-inherit">
                  {data4?.map((e, i) => {
                    return (
                      <tr
                        className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                        key={i}
                      >
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {i + 1}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <div className="flex gap-2 flex-wrap items-center justify-start">
                            {e?.files?.map((file) => (
                              <span
                                onClick={() => showFdf(imgUrl + file?.url_1)}
                                key={file?.id}
                                className="text-xl w-8 h-8 rounded flex items-center justify-center text-[var(--textBlack-color)] cursor-pointer border border-solid border-[var(--borderWhite-color)]"
                              >
                                <FileSearchOutlined />
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {getDateReverse(e?.start_date)}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {getDateReverse(e?.end_date)}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.certificate_type?.name}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.certificate_degree}
                        </td>
                        <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          {e?.certificate_bal}
                        </td>
                        <td className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                          <Popover
                            placement="bottomRight"
                            content={
                              <div className="flex flex-col items-start justify-center">
                                <p
                                  onClick={() => updateOrganizations4(e)}
                                  className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2"
                                >
                                  <EditOutlined />
                                  Tahrirlash
                                </p>
                                <Popconfirm
                                  title="Ma'lumotni o'chirish"
                                  description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                                  placement="topRight"
                                  onConfirm={() => deleteConfirm4(e?.id)}
                                  onCancel={() => {}}
                                  okText="Ha"
                                  cancelText="Yo'q"
                                >
                                  <p className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2">
                                    <DeleteOutlined />
                                    O'chirish
                                  </p>
                                </Popconfirm>
                              </div>
                            }
                            trigger="click"
                          >
                            <div className="text-xl w-max flex items-center justify-center bg-[var(--textOpasity-color)] text-[var(--text-color)] hover:bg-[var(--text-color)] hover:text-white ease-linear duration-300 p-1  rounded-lg">
                              <MoreOutlined />
                            </div>
                          </Popover>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="w-full h-20 flex items-center justify-center border border-[var(--text-color)] border-dashed">
            <button
              onClick={showModal4}
              className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
            >
              <PlusOutlined /> Sertifikat qo'shish
            </button>
          </div>
        )}
        <Modal
          title=" Sertifikat qo'shish"
          open={openModal4}
          onOk={showModal4}
          onCancel={handleCancel4}
          zIndex={1050}
          footer={""}
        >
          <form
            onSubmit={handleSubmit4(onSubmit4)}
            className="flex flex-col items-center gap-5 mt-5"
          >
            {/* Olgan sanasi (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Olgan sanasi (kun-oy-yil){" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="start_date"
                control={control4}
                rules={{ required: false }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format={"DD.MM.YYYY"}
                    placeholder="KK.OO.YYYY"
                    type="date"
                    className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Tugaydigan sanasi (kun-oy-yil) */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Tugaydigan sanasi (kun-oy-yil)
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="end_date"
                control={control4}
                rules={{ required: false }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format={"DD.MM.YYYY"}
                    placeholder="KK.OO.YYYY"
                    type="date"
                    className="p-2 w-full border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Sertifikat turi*/}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Sertifikat turi{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="certificate_type_id"
                control={control4}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={filterOption}
                    className="border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)] w-full"
                    size="large"
                    placeholder="Sertifikat turini tanlang"
                  >
                    {certificate?.map((e) => (
                      <Select.Option key={e?.id} value={e?.id}>
                        {e?.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {/* Sertifikat darajasi */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Sertifikat darajasi{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="certificate_degree"
                control={control4}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Sertifikat darajasini nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            {/* Sertifikat bali */}
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-1">
                Sertifikat bali{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Controller
                name="certificate_bal"
                control={control4}
                rules={{ required: false }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Sertifikat balini nomini kiriting"
                    size="large"
                    className="p-2 border-[var(--border-color)] hover:border-[var(--text-color)] focus:border-[var(--text-color)]"
                  />
                )}
              />
            </div>
            <UploadMoreFile files={files} setfiles={setfiles} />
            <div className="w-full">
              <button
                type="submit"
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                Saqlash
              </button>
            </div>
          </form>
        </Modal>
        <Modal
          title="Faylni ko'rish"
          open={openModal}
          onOk={showModal}
          width={1000}
          onCancel={handleCancel}
          zIndex={1050}
          footer={""}
        >
          <iframe src={fileSee} className="w-full h-[600px]" />
        </Modal>
      </div>
    </>
  );
};
