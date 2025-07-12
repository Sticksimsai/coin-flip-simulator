export function Card({ children }) {
  return <div className="bg-gray-800 rounded-2xl shadow-lg">{children}</div>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
