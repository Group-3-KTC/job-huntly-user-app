"use client";
import { Edit, Trash2 } from "lucide-react";

export default function WorkExperienceSection({ data, onEdit, onDelete }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-gray-800  ">
        Highlight detailed information about your job history
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((work, index) => (
        <div
          key={index}
          className="flex items-start justify-between  py-3 border-t-4 border-blue-600 my-2"
        >
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{work.position}</h4>
            <p className="text-sm text-gray-600">{work.company}</p>
            <p className="text-xs text-gray-500">{work.time}</p>
            {work.description && (
              <p className="mt-1 text-sm text-gray-700">{work.description}</p>
            )}
            {work.project && (
              <p className="mt-1 text-sm text-gray-700">
                <strong>Project:</strong> {work.project}
              </p>
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
