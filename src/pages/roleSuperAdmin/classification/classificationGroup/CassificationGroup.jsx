import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { Popover } from "antd";
import { Input } from "antd";
import { Space } from "antd";
import { List } from "antd";
import { Popconfirm } from "antd";
import { Breadcrumb, Loading } from "components";
import { useGet, usePost } from "hooks";
import { useState } from "react";
import { errorMasseg, successMasseg } from "utils/toastify";

export const CassificationGroup = () => {
  const [group, setgroup] = useState([]);
  const [editId, seteditId] = useState(-1);
  const [editGroupId, seteditGroupId] = useState(-1);
  const [valueInput, setvalueInput] = useState("");
  //   backend bilan aloqa
  const {
    data: { data },
    isLoading,
    refetch,
  } = useGet({
    url: `classification/list?lang=uz`,
  });
  const { mutate, isLoading: loadingName } = usePost();
  //   modal
  const [openModal, setOpenModal] = useState(false);
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
    resInput();
    seteditId(-1);
  };
  //malumotni yuborish
  const onSubmit = () => {
    if (editId != -1) {
      mutate({
        url: "classification/update-group",
        method: "PUT",
        data: {
          group_id: editId,
          names: group,
          names_ru: [],
          names_uzc: [],
        },
        onSuccess: () => {
          refetch();
          handleCancel();
          successMasseg("Ma'lumot yangilandi!");
          resInput();
          seteditId(-1);
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    } else {
      mutate({
        url: "classification/create-group",
        method: "POST",
        data: {
          names: group,
          names_ru: [],
          names_uzc: [],
        },
        onSuccess: () => {
          refetch();
          resInput();
          handleCancel();
          successMasseg("Ma'lumot yangilandi!");
        },
        onError: () => {
          errorMasseg("Xatolik?");
        },
      });
    }
  };
  // malumotni uchirish
  const deleteConfirm = (id) => {
    mutate({
      url: `classification/delete-group/${id}`,
      method: "DELETE",
      onSuccess: () => {
        refetch();
        successMasseg("Ma'lumot o'chirildi!");
      },
      onError: () => {
        errorMasseg("Xatolik?");
      },
    });
  };
  //inputlani bushatish
  const resInput = () => {
    setgroup([]);
    setvalueInput("");
  };
  // malumotni uzgartirish
  const updateOrganizations = (item) => {
    seteditId(item?.id);
    setgroup(item?.names);
    showModal();
  };
  const addInputOne = () => {
    let allGoup = group;
    if (editGroupId > -1) {
      allGoup[editGroupId] = valueInput;
      seteditGroupId(-1);
    } else {
      allGoup.push(valueInput);
    }
    setgroup(allGoup);
    setvalueInput("");
  };
  const deleteGroup = (id) => {
    let allGoup = group || [];
    setgroup(allGoup.filter((item, index) => index !== id));
  };
  const editGroup = (item, index) => {
    setvalueInput(item);
    seteditGroupId(index);
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <Breadcrumb
        link={"Klassfikator guruh yaratish"}
        link1={"Klassfikator"}
        link2={"Klassfikator guruh yaratish"}
      />
      <div className="p-6 rounded-lg bg-[var(--bgWhite-color)]">
        <div className="w-full flex justify-end  mb-6">
          <button
            onClick={showModal}
            type="button"
            className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          >
            Klassifikator guruh yaratish
          </button>
        </div>
        <div className="w-full h-max my-5 overflow-x-auto">
          <table className="table w-full min-w-[1100px] border-collapse border-spacing-0 border border-solid border-[var(--borderWhite-color)]">
            <thead className="table-header-group">
              <tr className="text-inherit table-row align-middle outline-0">
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  T/r
                </th>
                <th className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Klassifikator guruh nomi
                </th>
                <th className="w-24 tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="table-row-group align-middle border-inherit">
              {data?.map((e, i) => {
                return (
                  <tr
                    className="ease-linear duration-300 hover:bg-[var(--borderOpasity-color)]"
                    key={i}
                  >
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {i + 1}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      {e?.names?.map((e, i) => (
                        <p className="mt-2" key={i}>
                          {e}
                        </p>
                      ))}
                    </td>
                    <td className="tracking-normal leading-[130%] text-[var(--textBlack-color)] text-sm table-cell align-middle border border-solid border-[var(--borderWhite-color)] p-2 text-start border-l-0 border-r-0">
                      <Popover
                        placement="bottomRight"
                        content={
                          <div className="flex flex-col items-start justify-center">
                            <p
                              onClick={() => updateOrganizations(e)}
                              className="text-sm cursor-pointer text-center p-2 hover:bg-[var(--textOpasity-color)] rounded-md w-full ease-linear duration-300 text-[var(--textBlack-color)] hover:text-[var(--textBlack-color)] flex items-center justify-center gap-2"
                            >
                              <EditOutlined />
                              Tahrirlash
                            </p>
                            <Popconfirm
                              title="Ma'lumotni o'chirish"
                              description="Haqiqatdan ham o'chirishni hohlaysizmi?"
                              placement="topRight"
                              onConfirm={() => deleteConfirm(e?.id)}
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
        <Modal
          title="Klassifikator guruh yaratish"
          open={openModal}
          onOk={showModal}
          onCancel={handleCancel}
          zIndex={1050}
          footer={""}
        >
          <div className="flex flex-col items-center gap-5 mt-5">
            <div className="w-full">
              <label className="text-sm font-normal text-[var(--textBlack-color)] px-3 mb-2">
                Guruh nomini kiriting{" "}
                <sup className="text-red-600 text-lg relative top-[0px] opacity-0">
                  *
                </sup>
              </label>
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input
                  value={valueInput}
                  onChange={(e) => setvalueInput(e.target.value)}
                  placeholder="Guruh nomini kiriting"
                />
                <Button
                  onClick={addInputOne}
                  className="bg-[var(--text-color)] !text-white"
                >
                  Qo'shish
                </Button>
              </Space.Compact>
            </div>
            <div className="w-full">
              <List
                itemLayout="horizontal"
                dataSource={group}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <div className="flex items-start justify-start gap-3">
                          <p
                            onClick={() => deleteGroup(index)}
                            className="text-sm cursor-pointer w-max text-center p-2 bg-red-500 rounded-md ease-linear duration-300 text-white flex items-center justify-center gap-2"
                          >
                            <DeleteOutlined />
                          </p>
                          <p
                            onClick={() => editGroup(item, index)}
                            className="text-sm cursor-pointer w-max text-center p-2 bg-[var(--text-color)] rounded-md ease-linear duration-300 text-white flex items-center justify-center gap-2"
                          >
                            <EditOutlined />
                          </p>
                          <p className="text-[var(--textBlack-color)] text-sm">
                            {item}
                          </p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
            <div className="w-full">
              <button
                disabled={loadingName}
                onClick={onSubmit}
                type="submit"
                className="w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
              >
                Saqlash
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
