import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'underline' | 'outline';
}

export default function CustomDropdown({ label, options, value, onChange, variant = 'underline' }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <label className="custom-dropdown__label">{label}</label>
      <div 
        className={`custom-dropdown__selector custom-dropdown__selector--${variant} ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption.label}</span>
        <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line`}></i>
      </div>
      
      {isOpen && (
        <ul className="custom-dropdown__menu animate-fade-in">
          {options.map((opt) => (
            <li 
              key={opt.value} 
              className={`custom-dropdown__item ${opt.value === value ? 'selected' : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
