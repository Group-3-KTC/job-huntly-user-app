
export default function WorkExperienceSection({ data }) {
  return (
    <div className="text-sm text-gray-700">
      <p className="font-semibold">{data.position}</p>
      <p className="text-gray-500">{data.time}</p>
      {data.description && <p>{data.description}</p>}
      {data.project && (
        <>
          <p className="mt-1 font-semibold">Project:</p>
          <p>{data.project}</p>
        </>
      )}
    </div>
  );
}
