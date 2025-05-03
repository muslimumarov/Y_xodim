import { EditOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { imgUrl } from "service";
import { idCreate } from "utils/idCreate";
import { errorMasseg } from "utils/toastify";

export function FileInput({
  imgs,
  onImageSelected,
  setImageName,
  setImageType,
}) {
  const inputRef = useRef();
  const id = idCreate();

  // Handle the change event when a file is selected
  const handleOnChange = (event) => {
    setImageName(event?.target?.files[0]?.name?.toLowerCase());
    setImageType(event?.target?.files[0]?.type);
    if (event?.target?.files[0]?.size < 200000) {
      if (event?.target?.files && event?.target?.files?.length > 0) {
        const reader = new FileReader();
        reader?.readAsDataURL(event?.target?.files[0]);
        reader.onload = function (e) {
          onImageSelected(reader?.result);
        };
      }
    } else
      errorMasseg(
        `Yuklanayotgan rasmning hajmi 200 Kbdan oshmasligi zarur. Siz yuklagan rasmning hajmi: ${Math.round(
          event?.target?.files[0]?.size / 1000
        )} Kb`
      );
  };

  return (
    <div className="w-40 h-48 relative rounded-lg overflow-hidden">
      {/* Hidden file input element */}
      <input
        id={id}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
      {/* Button to trigger the file input dialog */}
      <label htmlFor={id}>
        <img
          className="w-full h-full object-cover object-center"
          src={
            imgs?.url
              ? imgUrl + imgs?.url
              : "https://www.w3schools.com/howto/img_avatar.png"
          }
          alt="one-img"
          accept=".jpg,.gif,.png,.gif"
          onClick={handleOnChange}
        />
        <div className="bg-black/[.6] absolute z-10 w-full h-full top-0 left-0 text-white text-3xl flex items-center justify-center opacity-0 hover:opacity-100  ease-in-out duration-300">
          <EditOutlined />
        </div>
      </label>
    </div>
  );
}
