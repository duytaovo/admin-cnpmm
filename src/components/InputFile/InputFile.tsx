import { Fragment, useRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { toast } from "react-toastify";
import config from "src/constants/configApi";

interface Props {
  onChange?: any;
  register?: any;
  id: string;
  label: string;
}

export default function InputFile({ onChange, id, label }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0];
    const fileFromLocal2 = event.target.files?.[1];
    const fileFromLocal3 = event.target.files?.[2];
    const fileUpload: any = event.target.files;
    fileInputRef.current?.setAttribute("value", "");
    if (
      fileFromLocal &&
      (fileFromLocal.size >= config.maxSizeUploadImage ||
        !fileFromLocal.type.includes("image"))
    ) {
      toast.error(`Dụng lượng file tối đa 2 MB. Định dạng:.JPEG, .PNG`, {});
    } else {
      if (fileUpload && fileUpload?.length > 6) {
        toast.error(`Chỉ được upload tối đa 6 ảnh`, {});
      } else {
        const files = Array.from(fileUpload);
        files.length > 6 ? files.slice(0, 6) : files;
        onChange && onChange(files);
      }
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Fragment>
      <input
        className="hidden"
        type="file"
        accept=".jpg,.jpeg,.png"
        ref={fileInputRef}
        onChange={onFileChange}
        multiple={true}
        // {...register(id)}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (event.target as any).value = null;
        }}
      />
      <button
        className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
        type="button"
        onClick={handleUpload}
      >
        {label}
      </button>
    </Fragment>
  );
}
