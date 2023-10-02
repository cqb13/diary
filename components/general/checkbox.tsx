import { useState } from "react";

type Props = {
  label: string;
  checked: boolean;
  updateChecked: (checked: boolean) => void;
};

export default function Checkbox({ label, checked, updateChecked }: Props) {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <label className="container relative flex cursor-pointer select-none items-center gap-2">
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
          updateChecked(!isChecked);
        }}
      />
      <div
        className={`custom-checkbox h-6 w-6 rounded bg-light-background transition-all hover:bg-dark-text 
            ${isChecked ? "bg-primary hover:bg-primary hover:opacity-50" : ""}`}
      ></div>
      <span className="label text-xl">{label}</span>
    </label>
  );
}
