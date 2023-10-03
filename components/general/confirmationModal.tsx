import Input from "@components/general/input";
import TextButton from "@components/general/textButton";
import { useState } from "react";

type props = {
  title: string;
  message: string;
  inputVisible: boolean;
  inputIsPassword: boolean;
  expectedInput: string;
  confirmText: string;
  cancelText: string;
  confirmAction: () => void;
  cancelAction: () => void;
};

export default function ConfirmationModal({
  title,
  message,
  inputVisible,
  inputIsPassword,
  expectedInput,
  confirmText,
  cancelText,
  confirmAction,
  cancelAction,
}: props) {
  const [inputValue, setInputValue] = useState("");

  const confirm = () => {
    if (inputValue === expectedInput) {
      confirmAction();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="rounded-md bg-dark-background p-5">
        <h3 className="text-lg font-medium text-primary">{title}</h3>
        <p>{message}</p>
        {inputVisible ? (
          <Input
            type={inputIsPassword ? "password" : "text"}
            placeholder=""
            value={inputValue}
            updateValue={setInputValue}
          />
        ) : null}
        <div className="mt-4 flex justify-end gap-2">
          <TextButton title={cancelText} color="gold" onClick={cancelAction} />
          <TextButton title={confirmText} color="red" onClick={confirm} />
        </div>
      </div>
    </div>
  );
}
