"use client";
import { Edit, Trash2 } from "lucide-react";

export default function AwardsSection({ data, onEdit, onDelete }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-gray-800 ">
        Highlight your awards or recognitions
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((award, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-3 border-t-4 border-blue-600"
        >
          <div className="flex-1">
            <h4 className="text-xl font-medium text-gray-900">{award.name}</h4>
            <p className="text-sm text-gray-600">{award.organization}</p>
            <p className="text-xs text-gray-500">
              {award.issueDate}
            </p>
            {award.description && (
              <p className="mt-1 text-sm text-gray-700">{award.description}</p>
            )}
          </div>
          <div className="flex gap-2 ml-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(index);
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(index);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
