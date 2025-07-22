import { PlusCircle } from "lucide-react";

export default function SectionCard({
  title,
  description,
  imageSrc,
  imageAlt,
}) {
  return (
    <div className="flex items-start justify-between p-4 transition-shadow bg-white rounded-lg shadow-sm cursor-pointer hover:shadow-md">
      <div>
        <h3 className="text-lg font-bold text-black">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <PlusCircle
          size={24}
          className="text-[var(--color-primary-main)] hover:scale-105 transition-transform"
        />
        {imageSrc && (
          <img src={imageSrc} alt={imageAlt} className="w-20 h-20 opacity-75" />
        )}
      </div>
    </div>
  );
}
