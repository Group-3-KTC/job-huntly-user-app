// components/sectionRenderer/LanguageSection.jsx
export default function LanguageSection({ data }) {
  return (
    <p className="text-sm text-gray-700">
      <strong>{data.name}</strong> ({data.level})
    </p>
  );
}
