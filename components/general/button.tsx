type Props = {
  title: string;
  onClick: (event: any) => void;
};

export default function Button({ title, onClick }: Props) {
  return (
    <button
      type="button"
      className={`w-2/6 rounded-lg bg-black p-3 text-lg tracking-wide transition-all hover:text-primary active:tracking-widest max-sm:w-full`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
