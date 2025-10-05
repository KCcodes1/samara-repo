"use client";
import { useEffect, useState } from "react";

export default function SearchInput({
  defaultValue = "",
  onChange,
  placeholder = "Search products…",
}: {
  defaultValue?: string;
  onChange: (value: string) => void; // eslint-disable-line no-unused-vars
  placeholder?: string;
}) {
  const [val, setVal] = useState(defaultValue);
  
  // Debounce 250ms
  useEffect(() => {
    const id = setTimeout(() => onChange(val), 250);
    return () => clearTimeout(id);
  }, [val, onChange]);

  return (
    <input
      type="search"
      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(e) => setVal(e.target.value)}
      aria-label="Search catalogue"
    />
  );
}
