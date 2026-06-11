type Props = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: Props) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}
