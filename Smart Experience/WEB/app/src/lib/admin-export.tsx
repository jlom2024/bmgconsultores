// CSV export utility for admin modules
export function exportToCSV(data: any[], filename: string, columns: { key: string; label: string }[]) {
  const headers = columns.map(c => c.label).join(",");
  const rows = data.map(row =>
    columns.map(c => {
      const val = String(row[c.key] ?? "");
      return val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
    }).join(",")
  );
  const csv = [headers, ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function AdminExportButton({ data, filename, columns, label = "Exportar CSV" }: {
  data: any[]; filename: string; columns: { key: string; label: string }[]; label?: string;
}) {
  return (
    <button
      onClick={() => exportToCSV(data, filename, columns)}
      className="rounded-lg border border-border-light px-3 py-1.5 text-xs text-text-secondary hover:border-amber/30 hover:text-amber"
    >
      {label}
    </button>
  );
}