interface FormRowProps {
  label: string;
  children: React.ReactNode;
}

const FormRow: React.FC<FormRowProps> = ({ label, children }) => {
  return (
    <div className="flex items-center py-1.5 group">
      <div className="w-40 flex items-center gap-2 text-slate-500 text-sm">
        <span>{label}</span>
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default FormRow;
