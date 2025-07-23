export default function EducationSection({ data }) {
  return (
    <div className="text-sm text-gray-700">
      <p className="font-semibold">{data.school}</p>
      <p>{data.degree}</p>
      <p className="text-gray-500">{data.date}</p>
      {data.note && <p>{data.note}</p>}
    </div>
  );
}
