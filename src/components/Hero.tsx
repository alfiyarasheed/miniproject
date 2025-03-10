import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="hero">
      {/* Hero Image */}
      <Image
        src="/assets/images/aa.jpg"  // Ensure image is inside `public/assets/`
        alt="VenueEase Hero"
        layout="fill"
        objectFit="cover"
        priority // Ensures the image loads fast
        className="hero-image"
      />

      {/* Overlay for readability */}
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>WELCOME TO VENUEEASE</h1>
        <p>Find your perfect venue with us!</p>

        {/* Search for Venues Button */}
        <Link href="/search" className="search-button">
          Search for Venues
        </Link>
      </div>
    </div>
  );
}
