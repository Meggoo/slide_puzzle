import { useRef, useEffect, useState } from "react";
import { IconPhotoPlus, IconX } from "@tabler/icons-react";
import { ReactCrop } from "react-image-crop";
import useTheme from "../../hooks/useTheme.js";
import "react-image-crop/dist/ReactCrop.css";
import SCForm from "./Form.styled.jsx";

export default function Form({ save_image }) {
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState(null);
  const [initialCrop, setInitialCrop] = useState(null);
  const inputRef = useRef(null);
  const imgRef = useRef(null);
  const theme = useTheme();

  function set_up_crop(event) {
    const { width, height } = event.target;
    const ratio = width / height;
    const cropW = ratio > 1 ? height : width;
    const cropH = cropW;
    const length = (ratio > 1 ? 1 : -1) * (0.5 * (width - height));
    const x = ratio > 1 ? length : 0;
    const y = ratio > 1 ? 0 : length;
    const crop = { x, y, width: cropW, height: cropH, unit: "px" };

    setCrop(crop);
    setInitialCrop(crop);
  }

  function open_files() {
    inputRef.current.click();
  }

  function crop_image(event) {
    event.preventDefault();

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = imgRef.current;
    const {
      width: cWidth,
      height: cHeight,
      naturalWidth: nWidth,
      naturalHeight: nHeight,
    } = img;
    const ratio = nWidth / nHeight;
    const scale = ratio > 1 ? nWidth / cWidth : nHeight / cHeight;
    const localCrop = crop.width && crop.height ? crop : initialCrop;

    canvas.width = 1000;
    canvas.height = 1000;

    context.drawImage(
      img,
      localCrop.x * scale,
      localCrop.y * scale,
      localCrop.width * scale,
      localCrop.height * scale,
      0,
      0,
      1000,
      1000
    );

    canvas.toBlob((b) => {
      const url = URL.createObjectURL(b);

      setImage({ file: b, url });
    }, "image/webp");
  }

  function submit_image(event) {
    event.preventDefault();

    save_image(image.file);
    URL.revokeObjectURL(image.url);
  }

  function set_file(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);

    setSrc(url);
  }

  function remove_file() {
    setSrc(null);
    setImage(null);
  }

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(src);
      URL.revokeObjectURL(image && image.url);
    };
  }, [src, image]);

  useEffect(() => {
    function clear_selection(event) {
      if (event.key === "Escape") setCrop({ x: 0, y: 0, w: 0, unit: "px" });
    }

    window.addEventListener("keydown", clear_selection);

    return () => window.removeEventListener("keydown", clear_selection);
  }, []);

  return (
    <SCForm
      className={theme.value}
      onSubmit={image ? submit_image : crop_image}
    >
      {src ? (
        <div className="crop-section">
          {image ? (
            <img src={image.url} alt="cropped image" />
          ) : (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={1}
              ruleOfThirds={true}
            >
              <img ref={imgRef} src={src} onLoad={set_up_crop} />
            </ReactCrop>
          )}
          <button className="control" type="button" onClick={remove_file}>
            <IconX />
          </button>
        </div>
      ) : (
        <label className="input-section">
          <IconPhotoPlus stroke={0.15} />
          <input type="file" onChange={set_file} ref={inputRef} />
        </label>
      )}
      <button
        className={`submit-button fs-hs ft-s`}
        type={src || image ? "submit" : "button"}
        onClick={src ? null : open_files}
      >
        {image ? "Save" : src ? "Crop" : "Load File"}
      </button>
    </SCForm>
  );
}
