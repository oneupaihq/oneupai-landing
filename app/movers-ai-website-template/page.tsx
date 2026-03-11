'use client';

export default function MovingPage() {
  return (
    <iframe
      src="https://moving.oneupai.com"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 'none',
      }}
      title="Moving"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      loading="eager"
    />
  );
}
