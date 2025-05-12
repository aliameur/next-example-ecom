import React from 'react';

type CheckboxType = {
  type?: string;
  label: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  value?: string;
};

const Checkbox = ({ type = "", label, name, onChange, checked, value }: CheckboxType) => (
  <label
    htmlFor={`${name}-${label.replace(/\s+/g, '-')}`}
    className={`checkbox ${type ? `checkbox--${type}` : ""}`}
  >
    <input
      name={name}
      onChange={onChange}
      type="checkbox"
      id={`${name}-${label.replace(/\s+/g, '-')}`}
      checked={checked}
      value={value}
    />
    <span className="checkbox__check" />
    <p>{label}</p>
  </label>
);

export default Checkbox;