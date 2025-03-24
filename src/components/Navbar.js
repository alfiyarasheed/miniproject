// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";

// const Navbar = () => {
//   const pathname = usePathname(); // Get the current path
//   const router = useRouter();
//   const isDashboard = pathname.startsWith("/dashboard"); // Check if user is on dashboard pages

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

//           {/* Show MY BOOKINGS and PROFILE only when in Dashboard */}
//           {isDashboard && (
//             <>
//               <Link href="/dashboard/my-bookings" className="nav-item">
//                 MY BOOKINGS
//               </Link>
//               <Link href="/dashboard/profile" className="nav-item">
//                 PROFILE
//               </Link>
//               <div className="register-button">
//                 <button
//                   onClick={() => router.push("/")}
//                   className="register-link"
//                 >
//                   LOGOUT
//                 </button>
//               </div>
//             </>
//           )}

//           {/* Always show Register/Login buttons */}
//           {!isDashboard && (
//             <div className="register-button">
//               <button
//                 onClick={() => router.push("/auth/register")}
//                 className="register-link"
//               >
//                 Register
//               </button>
//               <span className="divider">|</span>
//               <button
//                 onClick={() => router.push("/auth/login")}
//                 className="register-link"
//               >
//                 Login
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname(); // Get the current path
  const router = useRouter();
  const isDashboard = pathname.startsWith("/dashboard"); // Check if user is on dashboard pages

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          VenueEase
        </Link>
        <div className="nav-links">
          <Link href={isDashboard ? "/dashboard" : "/"} className="nav-item">
            HOME
          </Link>

          {/* Check if user is in dashboard, use dashboard search */}
          <Link
            href={isDashboard ? "/dashboard/search" : "/search"} // ✅ Fixed
            className="nav-item"
          >
            SEARCH
          </Link>
          {/* Show MY BOOKINGS and PROFILE only when in Dashboard */}
          {isDashboard && (
            <>
              <Link href="/dashboard/my-bookings" className="nav-item">
                MY BOOKINGS
              </Link>
              <Link href="/dashboard/profile" className="nav-item">
                PROFILE
              </Link>
              <div className="register-button">
                <button
                  onClick={() => router.push("/")}
                  className="register-link"
                >
                  LOGOUT
                </button>
              </div>
            </>
          )}
          {/* Always show Register/Login buttons */}
          {!isDashboard && (
            <div className="register-button">
              <button
                onClick={() => router.push("/auth/register")}
                className="register-link"
              >
                Register
              </button>
              <span className="divider">|</span>
              <button
                onClick={() => router.push("/auth/login")}
                className="register-link"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
