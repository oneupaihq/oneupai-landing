'use client';

export default function HvacPage() {
  return (
    <iframe
      src="https://hvac.oneupai.com"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      title="HVAC"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      loading="eager"
    />
  );
}
