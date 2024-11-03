import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formErrors = (array) => {
  return array.map((error, index) => (
    <p key={index}>
      <i className='text-red-500'>{error}</i>
    </p>
  ));
};
