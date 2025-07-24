"use client";
import { Edit, Trash2 } from "lucide-react";

export default function HighlightProjectSection({ data, onEdit, onDelete }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-gray-800 ">Showcase your highlight project</p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((project, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-3 my-2 border-t-4 border-blue-600"
        >
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{project.title}</h4>
            <p className="mt-1 text-sm text-gray-700">{project.description}</p>
            <p className="text-xs text-gray-500">{project.date}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                View Project
              </a>
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
