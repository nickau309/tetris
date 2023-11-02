import type { TextDescriptionProps } from "./TextDescription.types";

export default function TextDescription({ text }: TextDescriptionProps) {
  return <p className="text-center text-lg text-gray-100">{text}</p>;
}
