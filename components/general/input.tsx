type Props = {
  value: string;
  placeholder: string;
  type: "text" | "number" | "date" | "time" | "password" | "email";
  textColor?: "gold" | "red" | "white";
  vModel?: "email" | "password" | "text";
  updateValue: (value: any) => void;
};

export default function Input({
  value,
  placeholder,
  type,
  textColor,
  vModel,
  updateValue,
}: Props) {
  const findTextColor = () => {
    switch (textColor) {
      case "gold":
        return "text-primary";
      case "red":
        return "text-red-500";
      case "white":
        return "";
    }
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      v-model={vModel ? vModel : ""}
      className={`rounded-lg border-none w-full bg-light-background placeholder:text-primary placeholder:opacity-40 focus:ring-primary p-2 ${textColor ? findTextColor() : ""}`}
      onChange={(event) => updateValue(event.target.value)}
    />
  );
}
