import {
  CloudUploadOutlined,
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import { useState } from "react";
import { baseUrl, imgUrl } from "service";
import { idCreate } from "utils/idCreate";
import { getToken } from "utils/storages";

export const UploadMoreFile = ({ files, setfiles }) => {
  const [isLoading, setisLoading] = useState(false);

  const [state, setstate] = useState({ numPages: null, pageNumber: 1 });

  const id = idCreate();
  const filesUploading = (file) => {
    setisLoading(true);
    var data = new FormData();
    data.append("file", file.target.files[0]);
    fetch(`${baseUrl}file-storage/upload-all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      redirect: "follow",
      body: data,
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        setisLoading(false);
        setfiles((data) => {
          return [
            ...data,
            {
              id: resJson.data.id,
              url: resJson.data.url_1,
              name: resJson.data.name_1,
            },
          ];
        });
      })
      .catch((err) => {
        setisLoading(false);
      });
  };
  const fileDelete = (id) => {
    setfiles((data) => {
      return data?.filter((e) => e.id != id);
    });
  };
  // const [openModal, setOpenModal] = useState(false);
  // const [fileSee, setfileSee] = useState(null);
  const showFdf = (url) => {
    window.open(url);
    // setfileSee(url);
    // showModal();
  };
  // modalni ochish
  // const showModal = () => {
  //   setOpenModal(true);
  // };
  // modalni yopish
  // const handleCancel = () => {
  //   setOpenModal(false);
  // };
  return (
    <>
      <div className="w-full flex items-center justify-center flex-col">
        {isLoading ? (
          <div className="border text-4xl border-dashed border-[var(--border-color)] p-5 h-28 w-full rounded-md text-[var(--text-color)]  text-center flex items-center justify-center">
            <LoadingOutlined />
          </div>
        ) : (
          <label htmlFor={id} className="w-full">
            <div className="border text-4xl border-dashed border-[var(--border-color)] p-5 h-28 w-full rounded-md text-[var(--text-color)]  text-center flex items-center justify-center flex-col">
              <CloudUploadOutlined />
              <p className="text-sm font-semibold">Fayl yuklash</p>
            </div>
          </label>
        )}
        <input
          className="hidden"
          onChange={filesUploading}
          type="file"
          accept="application/pdf,image/png, image/jpeg"
          id={id}
          disabled={isLoading}
        />
        {files?.map((e) => (
          <p
            key={e?.id}
            className="mt-2 px-2 py-1 w-full border border-[var(--border-color)] rounded-md flex items-center justify-start gap-2 text text-[var(--textBlack-color)] border-dashed"
          >
            <span
              onClick={() => fileDelete(e?.id)}
              className="text-white py-1 px-2 rounded bg-red-500 cursor-pointer"
            >
              <DeleteOutlined />
            </span>
            <span
              onClick={() => showFdf(imgUrl + e?.url)}
              className="text-white py-1 px-2 rounded bg-gray-500 hover:text-white"
            >
              <EyeOutlined />
            </span>
            {e?.name}
          </p>
        ))}
      </div>
      {/* <Modal
        title="Faylni ko'rish"
        open={openModal}
        onOk={showModal}
        width={1000}
        onCancel={handleCancel}
        footer={""}
      >
        <iframe src={fileSee} className="w-full h-[600px]" />
      </Modal> */}
    </>
  );
};
