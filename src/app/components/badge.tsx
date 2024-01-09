import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeTypes extends HTMLAttributes<HTMLLIElement> {
  type: string;
  value: number | string;
}

const Badge = ({ type, value, className, ...props }: BadgeTypes) => {
  const icons = {
    star: "⭐",
    time: "⌛",
    calendary: "📅",
  };
  return (
    <li
      {...props}
      className={twMerge(`${className} flex items-center justify-start`)}
    >
      <span className="flex w-9 items-center justify-center">
        {icons[type as keyof typeof icons]}
      </span>
      {value}
    </li>
  );
};

export default Badge;
