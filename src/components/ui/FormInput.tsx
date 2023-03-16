import { FC } from "react";

type FormInputProps = {
  placeholder: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput: FC<FormInputProps> = ({
  placeholder,
  name,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="p-2 w-full border border-gray-400 rounded-md focus:outline-none"
        type={type}
      />
    </div>
  );
};

export default FormInput;
