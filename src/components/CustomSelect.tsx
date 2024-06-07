import { ComponentProps, useEffect, useState, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

// interface CustomSelectProps {
//   options: Option[];
//   selected: string;
//   onChange: (option: string) => void;
//   id: string;
// }

//Para estudar, como eu modifiquei o select e ele é um botão que mostra uma lista, eu não consigo usar o extends ComponenteProps
interface CustomSelectProps {
  options: Option[];
  selected: string;
  onChange: (option: string) => void;
  id: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

//Se a pessoa clicar fora da lista ela vai fechar

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selected,
  onChange,
  onFocus,
  onBlur,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        className="relative custom-select flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        onFocus={onFocus}
        onBlur={onBlur}
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
