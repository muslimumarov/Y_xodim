import { Modal } from "antd";
import { useState } from "react";
import { api, imgUrl } from "service";
import { errorMasseg } from "utils/toastify";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export const DownlandModal = ({ text, link }) => {
  //   modal
  const [openModal, setOpenModal] = useState(false);
  const [pdfLink, setpdfLink] = useState(null);
  const getData = () => {
    api
      .get(link)
      .then((res) => {
        // window.open(imgUrl + res?.data?.data?.url);
        setpdfLink(imgUrl + res?.data?.data?.url);
        showModal();
      })
      .catch(() => {
        errorMasseg("Xatolik ?");
      });
  };

  const docs = [
    { uri: pdfLink, fileType: `${pdfLink?.split(".")?.pop() || "docx"}` },
  ];
  // modalni ochish
  const showModal = () => {
    setOpenModal(true);
  };
  // modalni yopish
  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div
        className="w-full"
        onClick={() => {
          getData();
        }}
      >
        {text}
      </div>
      <Modal
        title="Ma'lumotlarni yuklash"
        open={openModal}
        onOk={showModal}
        onCancel={handleCancel}
        zIndex={1080}
        footer={""}
        width={960}
        height={900}
      >
        <div className="w-full overflow-auto">
          <a
            href={pdfLink}
            download
            className="w-max mt-1 p-2 px-4 text-white hover:text-white bg-[var(--text-color)] rounded flex gap-2 items-center justify-center  text-sm"
          >
            Yuklash
          </a>
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            style={{ width: "900px", height: "600px" }}
          />
        </div>
      </Modal>
    </>
  );
};
