export function StatContainer({ children }: { children: React.ReactNode }) {
  return <div className="stats shadow w-full my-10">{children}</div>;
}

export function Stat({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="stat place-items-center">
      <div className="stat-title">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-desc">{description}</div>
    </div>
  );
}
