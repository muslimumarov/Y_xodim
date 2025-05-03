import { Loading } from "components/loading";
import { useState } from "react";
import Cropper from "react-easy-crop";

export function ImageCropper({ isloading, image, onCropDone, onCropCancel }) {
  // Define state variables
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState(null);

  // Callback when cropping is completed
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    // Store the cropped area in pixels
    setCroppedArea(croppedAreaPixels);
  };
  if (isloading)
    return (
      <div className="w-full h-[500px] flex items-center justify-center flex-col">
        <Loading />
      </div>
    );
  return (
    <div className="w-full h-[500px] flex items-center justify-center flex-col mt-7 gap-5">
      <div>
        <div className="w-[500px] h-[450px] relative">
          <Cropper
            image={image}
            aspect={3 / 4}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: "500px",
                height: "450px",
                backgroundColor: "#1c1c1c",
              },
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div
          className="cursor-pointer w-max p-2 px-4 text-white bg-red-500 rounded text-center text-sm"
          onClick={onCropCancel}
        >
          Orqaga
        </div>
        <div
          className="cursor-pointer w-max p-2 px-4 text-white bg-[var(--text-color)] rounded text-center text-sm"
          onClick={() => {
            onCropDone(croppedArea);
          }}
        >
          Yuborish
        </div>
      </div>
    </div>
  );
}
