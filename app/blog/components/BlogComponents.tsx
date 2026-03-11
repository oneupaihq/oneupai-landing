import Link from 'next/link';

// Section Number Component
export function SectionNumber({ number }: { number: number }) {
  return (
    <div className="inline-flex items-center gap-3 mb-2">
      <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
        {number}
      </span>
    </div>
  );
}

// Template Placeholder Component
export function TemplatePlaceholder({ 
  templateName, 
  badge = "Template Preview" 
}: { 
  templateName: string;
  badge?: string;
}) {
  return (
    <div className="w-full rounded-xl border-2 border-dashed border-[#c3d9f0] bg-gradient-to-br from-[#f0f8ff] to-[#e8faf5] flex flex-col items-center justify-center gap-3 p-10 my-8 text-[#64748b] text-sm relative overflow-hidden cursor-pointer hover:border-[#1a80e7] hover:bg-gradient-to-br hover:from-[#e8f4fd] hover:to-[#d4f7ed] transition-all">
      <span className="absolute top-3 right-3 bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] text-white text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full">
        {badge}
      </span>
      <div className="w-13 h-13 rounded-lg bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] opacity-85 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      <strong className="text-[#00244c] text-base">{templateName}</strong>
      <span className="text-xs">Replace with your OneUpAI template image · Ideal size: 960 × 540 px</span>
    </div>
  );
}

// CTA Box Component
export function CTABox({ 
  title, 
  description, 
  buttonText = "Start Free → Browse Templates",
  buttonLink = "https://dashboard.oneupai.com/onboard"
}: {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}) {
  return (
    <div className="rounded-2xl bg-[#00244c] p-10 text-white my-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(65,230,191,0.25)] via-transparent to-transparent" />
      <h3 className="text-2xl font-bold mb-3 relative">{title}</h3>
      <p className="text-[rgba(255,255,255,0.75)] mb-5 relative leading-relaxed">
        {description}
      </p>
      <Link
        href={buttonLink}
        className="inline-block bg-gradient-to-r from-[#41e6bf] to-[#1a80e7] text-white px-7 py-3 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity relative"
      >
        {buttonText}
      </Link>
    </div>
  );
}

// Comparison Table Component
export function ComparisonTable({ 
  headers, 
  rows 
}: { 
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="w-full my-8 border border-[#e4eaf2] rounded-xl overflow-hidden">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="bg-[#00244c] text-white p-4 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 1 ? 'bg-[#f8fafc]' : 'bg-white'}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-4 text-[#374151] border-b border-[#e4eaf2] last:border-b-0">
                  {cellIndex === 0 ? <strong>{cell}</strong> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Blockquote Component
export function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-[#41e6bf] pl-5 py-4 bg-[rgba(65,230,191,0.06)] rounded-r-lg my-6 text-[#00244c] italic">
      {children}
    </blockquote>
  );
}