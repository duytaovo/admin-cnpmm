import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
type Props = {
  label?: string;
  id: string;
  placeholder?: string;
  children?: any;
  register: any;
  check?: boolean;
  requirementField?: boolean;
  setValue: any;
  defaultValue: string;
  textAlign: any;
  isUpdate: boolean;
};
const Textarea = ({
  label,
  id,
  placeholder,
  children = null,
  register,
  check = false,
  requirementField = true,
  setValue,
  defaultValue,
  textAlign,
  isUpdate = false,
}: Props) => {
  useEffect(() => {
    register(id);
  }, [register]);

  useEffect(() => {
    if (isUpdate) {
      setValue(id, defaultValue);
    }
  }, []);

  const [showError1, setShowError1] = useState(false);
  const [showError2, setShowError2] = useState(true);

  let errorMessage = " * Bạn phải nhập thông tin sản phẩm...";

  const handleOnChange = (
    content: any,
    delta: any,
    source: any,
    editor: any
  ) => {
    if (editor.getText()?.length <= 1) {
      setShowError1(true);
      setShowError2(true);
    } else {
      setShowError1(false);
      setShowError2(false);
    }
    setValue(id, content);
  };
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"], // Thêm tùy chọn "image" vào toolbar
        ["clean"],
      ],
    },
  };
  return (
    <>
      <div
        style={{
          textAlign: textAlign ? textAlign : "",
          // hover: hover ? hover : "",
        }}
        className="custom-textarea"
      >
        <label htmlFor={id} className="text-sm font-bold text-black ">
          {/* {label} */}
          {/* {requirementField && <span className="field-requirment">*</span>} */}
        </label>
        <div id={id} className={check ? "" : ""}>
          <ReactQuill
            modules={modules}
            theme="snow"
            onChange={handleOnChange}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />

          {check ? null : (
            <p className="w-full text-left">
              {(children === null
                ? showError1
                  ? errorMessage
                  : ""
                : showError2
                ? children
                : "") || (
                <span
                  style={{
                    marginTop: "2px",
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "#999",
                  }}
                >
                  (Tối đa 1500 ký tự)
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Textarea;
