type Props = {
  title: string;
  color: "gold" | "red";
  onClick: (event: any) => void;
};

export default function TextButton({ title, color, onClick }: Props) {
  return (
    <button
      type="button"
      className={`${
        color == "gold" ? "text-primary" : "text-red-500"
      } transition-all hover:opacity-50 active:tracking-wider`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
