// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center">
      <p>© {new Date().getFullYear()} VenueEase. All rights reserved.</p>
    </footer>
  );
}
