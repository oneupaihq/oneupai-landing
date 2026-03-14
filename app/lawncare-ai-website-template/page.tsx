'use client';

export default function LawncarePage() {
  return (
    <iframe
      src="https://lawn.oneupai.com"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      title="Lawncare"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      loading="eager"
    />
  );
}
