"use client";
import clsx from "clsx";

export default function TagPill({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: (isSelected: boolean) => void; // eslint-disable-line no-unused-vars
}) {
  return (
    <button
      type="button"
      className={clsx(
        "rounded-full border px-3 py-1 text-sm transition",
        selected
          ? "border-brand bg-brand text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
      )}
      onClick={() => onToggle(!selected)}
      aria-pressed={selected}
      aria-label={`Filter by ${label}`}
    >
      {label}
    </button>
  );
}
