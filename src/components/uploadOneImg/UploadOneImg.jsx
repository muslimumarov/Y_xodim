import { useState } from "react";
import { FileInput } from "./FileInput";
import { ImageCropper } from "./ImageCropper";
import { Modal } from "antd";
import { baseUrl } from "service";
import { getToken } from "utils/storages";

export function UploadOneImg({ imgs, setimgs }) {
  // Define state variables
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageType, setImageType] = useState("");
  const [isloading, setisloading] = useState(false);

  // Callback function when an image is selected
  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    showModal();
  };

  // Callback function when cropping is done
  const onCropDone = (imgCroppedArea) => {
    // Create a canvas element to crop the image
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    // Load the selected image
    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      // Draw the cropped portion of the image onto the canvas
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      // Convert the canvas content to a data URL (JPEG format)
      // const dataURL = canvasEle.toDataURL("image/jpeg");
      const dataURL = canvasEle.toDataURL(imageType);

      imgUploading(dataURL);
    };
  };

  // Callback function when cropping is canceled
  const onCropCancel = () => {
    handleCancel();
    setImage("");
  };
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    // return new File([u8arr], filename, { type: mime });
    return new File([u8arr], filename, { type: imageType });
  }

  //Usage example:
  const imgUploading = (file) => {
    let file2 = dataURLtoFile(file, imageName);
    setisloading(true);
    var data = new FormData();
    data.append("file", file2);
    fetch(`${baseUrl}file-storage/upload`, {
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
        setisloading(false);
        setimgs({
          id: resJson.data.id,
          url: resJson.data.url_1,
        });
        handleCancel();
      })
      .catch(() => {
        setisloading(false);
      });
  };
  //   modal
  const [openModal, setOpenModal] = useState(false);
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
      <FileInput
        imgs={imgs}
        onImageSelected={onImageSelected}
        setImageName={setImageName}
        setImageType={setImageType}
      />
      <Modal
        open={openModal}
        onOk={showModal}
        // onCancel={handleCancel}
        width={500}
        zIndex={1550}
        footer={""}
      >
        <ImageCropper
          isloading={isloading}
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      </Modal>
    </>
  );
}
