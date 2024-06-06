import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  selected: string;
  onChange: (option: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="relative custom-select flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <ChevronDown className="text-[var(--color-blue-900)]" />
      </button>
      {isOpen && (
        <ul className="ul">
          {options.map((option) => (
            <li
              key={option.value}
              className={`li ${
                option.value === selected
                  ? "flex justify-between text-[var(--color-white)]"
                  : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              {option.value === selected && (
                <Check className="text-[var(--color-white)]" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
