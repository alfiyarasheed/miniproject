// // src/components/Navbar.js
// import Link from "next/link";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <Link href="/" className="logo">
//           VenueEase
//         </Link>
//         <div className="nav-links">
//           <Link href="/" className="nav-item">
//             HOME
//           </Link>
//           <Link href="/search" className="nav-item">
//             SEARCH
//           </Link>
//           <div className="register-container">
//             <Link href="/register" className="register-btn">
//               Register
//             </Link>
//             <Link href="/login" className="register-btn">
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// src/components/Navbar.js
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          VenueEase
        </Link>
        <div className="nav-links">
          <Link href="/" className="nav-item">
            HOME
          </Link>
          <Link href="/search" className="nav-item">
            SEARCH
          </Link>
          <div className="register-button">
            <Link href="/register" className="register-link">
              Register
            </Link>
            <span className="divider">|</span>
            <Link href="/login" className="register-link">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
