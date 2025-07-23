export function SectionModal({ section, onClose, onSave }) {
  const [formData, setFormData] = useState(section.data);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg p-6 bg-white rounded-xl">
        <h2 className="mb-4 text-xl font-semibold">{section.title}</h2>
        <form className="space-y-4">
          {section.fields.map((field) => (
            <div key={field.key}>
              <label className="block font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  className="w-full p-2 border rounded"
                  value={formData[field.key]}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  className="w-full p-2 border rounded"
                  value={formData[field.key]}
                  placeholder={field.placeholder}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </form>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 text-white bg-blue-600 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
