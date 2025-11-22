interface InputTitleProps {
  title: string;
  onChange: (value: string) => void;
}

const InputTitle = ({ title, onChange }: InputTitleProps) => {
  return (
    <input
      type="text"
      placeholder="Untitled"
      className="w-full text-4xl font-bold text-slate-800 placeholder-slate-300 border-none focus:ring-0 p-0 bg-transparent mb-8 leading-tight"
      value={title}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default InputTitle;
