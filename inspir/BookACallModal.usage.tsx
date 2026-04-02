// Example: How to wire up BookACallModal on your landing page
// Place this in your Hero section or wherever your CTA lives.

"use client";

import { useState } from "react";
import BookACallModal from "./BookACallModal";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section>
      {/* ...your hero content... */}

      <button onClick={() => setModalOpen(true)}>
        Book a Call
      </button>

      <BookACallModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
