// components/sectionRenderer/AwardsSection.jsx
export default function AwardsSection({ data }) {
  return (
    <ul className="text-sm text-gray-700 list-disc list-inside">
      {data.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
