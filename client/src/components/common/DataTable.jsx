export const DataTable = ({ columns, rows = [] }) => (
  <div className="glass-panel overflow-hidden rounded-[28px] border border-white/60">
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-white/50 text-slate-500">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-5 py-4 font-medium uppercase tracking-[0.2em]">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row._id || rowIndex} className="border-t border-white/60 text-slate-700">
              {columns.map((column) => (
                <td key={column.key} className="px-5 py-4">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
