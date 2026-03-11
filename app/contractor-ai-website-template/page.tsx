'use client';

export default function ContractorPage() {
  return (
    <iframe
      src="https://contractor.oneupai.com"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      title="Contractor"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      loading="eager"
    />
  );
}
