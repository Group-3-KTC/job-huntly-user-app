// "use client";
// import Image from "next/image";
// import { PlusCircle, Edit, Trash2 } from "lucide-react";

// export default function SectionCard({
//   id,
//   title,
//   description,
//   imageSrc,
//   imageAlt,
//   content,
//   onAdd,
//   onEdit,
//   onDelete,
// }) {
//   const hasContent = !!content;

//   const handleClick = () => {
//     if (hasContent && onEdit) {
//       onEdit();
//     } else if (!hasContent && onAdd) {
//       onAdd();
//     }
//   };

//   return (
//     <div className="flex items-start justify-between p-4 transition-shadow bg-white shadow-sm cursor-pointer rounded-xl hover:shadow-md">
//       <div className="flex-1">
//         <h3 className="text-lg font-bold text-black">{title}</h3>

//         {/* Chỉ hiện description nếu không có content */}
//         {!hasContent && (
//           <p className="mb-2 text-sm text-gray-500">{description}</p>
//         )}

//         {/* Nếu có content thì hiển thị */}
//         {hasContent && (
//           <div className="p-3 mt-2 rounded-md bg-gray-50">{content}</div>
//         )}
//       </div>

//       <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
//         <div className="flex items-center gap-2">
//           {hasContent ? (
//             <Edit
//               size={20}
//               className="text-blue-600 transition-transform hover:scale-105"
//               onClick={handleClick}
//             />
//           ) : (
//             <PlusCircle
//               size={24}
//               className="text-blue-800 transition-transform hover:scale-105"
//               onClick={handleClick}
//             />
//           )}

//           {onDelete && (
//             <Trash2
//               size={18}
//               className="text-red-500 transition-transform hover:scale-105"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onDelete();
//               }}
//             />
//           )}
//         </div>

//         {imageSrc && (
//           <div className="relative w-16 h-16 opacity-80">
//             <Image
//               src={imageSrc}
//               alt={imageAlt || title}
//               fill
//               className="object-contain"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// components/SectionCard.jsx
"use client";
import Image from "next/image";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function SectionCard({
  id,
  title,
  description,
  imageSrc,
  imageAlt,
  content,
  onAdd,
  onEdit,
  onDelete,
}) {
  const hasContent = !!content;

  const handleClick = () => {
    if (hasContent && onEdit) {
      onEdit();
    } else if (!hasContent && onAdd) {
      onAdd();
    }
  };

  return (
    <div
      className="flex items-start justify-between p-4 transition-shadow bg-white shadow-sm cursor-pointer rounded-xl hover:shadow-md"
      onClick={handleClick}
    >
      <div className="flex-1">
        <h3 className="text-lg font-bold text-black">{title}</h3>
        {!hasContent && <p className="mb-2 text-sm text-gray-500">{description}</p>}
        {hasContent && <div className="p-3 mt-2 rounded-md bg-gray-50">{content}</div>}
      </div>
      <div className="flex flex-col items-end gap-2 ml-4 shrink-0">
        <div className="flex items-center gap-2">
          {hasContent ? (
            <Edit
              size={20}
              className="text-blue-600 transition-transform hover:scale-105"
            />
          ) : (
            <PlusCircle
              size={24}
              className="text-blue-800 transition-transform hover:scale-105"
            />
          )}
          {onDelete && (
            <Trash2
              size={18}
              className="text-red-500 transition-transform hover:scale-105"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            />
          )}
        </div>
        {imageSrc && (
          <div className="relative w-16 h-16 opacity-80">
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}