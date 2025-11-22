import React from "react";
import Textarea from "./Textarea";
interface DescriptionSectionProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  minHeight?: number;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  value,
  onChange,
  title = "Description",
  minHeight = 300,
}) => {
  return (
    <div className={`relative min-h-[${minHeight}px]`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>

      <Textarea
        value={value}
        onChange={onChange}
        placeholder="Write description..."
      />
    </div>
  );
};

export default DescriptionSection;
