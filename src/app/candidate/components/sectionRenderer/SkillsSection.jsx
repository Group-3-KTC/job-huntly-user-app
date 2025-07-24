"use client";
import { Edit, Trash2 } from "lucide-react";

export default function SkillsSection({ data, onEdit, onDelete }) {
    if (!data || data.length === 0) {
        return (
            <p className="text-sm text-gray-800 ">
                Showcase your skills and proficiencies
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {data.map((skill, index) => (
                <div
                    key={index}
                    className="flex items-start justify-between py-3 my-2 border-t-4 border-blue-600"
                >
                    <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900 ">
                            {skill.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                            Level: {skill.level}
                        </p>
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
