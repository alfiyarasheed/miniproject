// "use client";
// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
// import { BarChart, Users, Calendar, Star } from "lucide-react";
// import { useRouter } from "next/navigation";
// import AdminNavbar from "@/components/AdminNavbar";
// import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
// import { db } from "@/firebase"; // Ensure correct import of Firestore

// // Define types
// interface User {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
// }

// interface Booking {
//     id: string;
//     venue: string;
//     date: string;
//     slot: string;
// }

// interface Review {
//     id: string;
//     venue: string;
//     user: string;
//     comment: string;
//     rating: number;
// }

// export default function AdminDashboard() {
//     const [activeTab, setActiveTab] = useState("dashboard");
//     const [users, setUsers] = useState<User[]>([]);
//     const [bookings, setBookings] = useState<Booking[]>([]);
//     const [reviews, setReviews] = useState<Review[]>([]);
//     const [setLoading] = useState<boolean>(true);
//     const router = useRouter();

//     // Handle Logout
//     const handleLogout = () => {
//         localStorage.removeItem("authToken"); // Clear token if stored
//         router.push("/"); // Redirect to Home
//     };

//     // Fetch Users
//     const fetchUsers = async () => {
//         try {
//             const querySnapshot = await getDocs(collection(db, "users"));
//             const userList = querySnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             })) as User[];
//             setUsers(userList);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };

//     // Fetch Bookings
//     const fetchBookings = async () => {
//         try {
//             const querySnapshot = await getDocs(collection(db, "bookings"));
//             const bookingList = querySnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             })) as Booking[];
//             setBookings(bookingList);
//         } catch (error) {
//             console.error("Error fetching bookings:", error);
//         }
//     };

//     // Fetch Reviews
//     const fetchReviews = async () => {
//         try {
//             const querySnapshot = await getDocs(collection(db, "reviews"));
//             const reviewList = querySnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             })) as Review[];
//             setReviews(reviewList);
//         } catch (error) {
//             console.error("Error fetching reviews:", error);
//         }
//     };

//     // Fetch all data on load
//     useEffect(() => {
//         fetchUsers();
//         fetchBookings();
//         fetchReviews();
//         setLoading(false);
//     }, []);

//     return (
//         <div className="admin-dashboard">
//             {/* Admin Navbar */}
//             <AdminNavbar />

//             {/* Sidebar Navigation */}
//             <aside className="sidebar">
//                 <Button onClick={() => setActiveTab("dashboard")} className={activeTab === "dashboard" ? "active" : ""}>
//                     <BarChart /> Dashboard
//                 </Button>
//                 <Button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>
//                     <Users /> Users
//                 </Button>
//                 <Button onClick={() => setActiveTab("bookings")} className={activeTab === "bookings" ? "active" : ""}>
//                     <Calendar /> Bookings
//                 </Button>
//                 <Button onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "active" : ""}>
//                     <Star /> Reviews
//                 </Button>

//                 {/* Logout Button */}
//                 <Button onClick={handleLogout} className="logout-button">
//                     Logout
//                 </Button>
//             </aside>

//             {/* Main Content Area */}
//             <main className="content">
//                 {/* Dashboard Overview */}
//                 {activeTab === "dashboard" && (
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Admin Dashboard</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <p>Welcome to the admin panel! Manage venues, bookings, and users.</p>
//                         </CardContent>
//                     </Card>
//                 )}

//                 {/* Users Management */}
//                 {activeTab === "users" && (
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Users</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableCell>Name</TableCell>
//                                         <TableCell>Email</TableCell>
//                                         <TableCell>Role</TableCell>
//                                         <TableCell>Action</TableCell>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {users.length > 0 ? (
//                                         users.map((user) => (
//                                             <TableRow key={user.id}>
//                                                 <TableCell>{user.name}</TableCell>
//                                                 <TableCell>{user.email}</TableCell>
//                                                 <TableCell>{user.role}</TableCell>
//                                                 <TableCell>
//                                                     <Button
//                                                         onClick={() => {
//                                                             if (confirm(`Are you sure to delete ${user.name}?`)) {
//                                                                 deleteDoc(doc(db, "users", user.id));
//                                                                 fetchUsers(); // Refresh after delete
//                                                             }
//                                                         }}
//                                                         className="bg-red-500 text-white px-2 py-1 rounded"
//                                                     >
//                                                         Delete
//                                                     </Button>
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))
//                                     ) : (
//                                         <TableRow>
//                                             <TableCell colSpan={4} className="text-center">
//                                                 No users found.
//                                             </TableCell>
//                                         </TableRow>
//                                     )}
//                                 </TableBody>
//                             </Table>
//                         </CardContent>
//                     </Card>
//                 )}

//                 {/* Bookings Management */}
//                 {activeTab === "bookings" && (
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Bookings</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableCell>Venue</TableCell>
//                                         <TableCell>Date</TableCell>
//                                         <TableCell>Slot</TableCell>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {bookings.length > 0 ? (
//                                         bookings.map((booking) => (
//                                             <TableRow key={booking.id}>
//                                                 <TableCell>{booking.venue}</TableCell>
//                                                 <TableCell>{booking.date}</TableCell>
//                                                 <TableCell>{booking.slot}</TableCell>
//                                             </TableRow>
//                                         ))
//                                     ) : (
//                                         <TableRow>
//                                             <TableCell colSpan={3} className="text-center">
//                                                 No bookings found.
//                                             </TableCell>
//                                         </TableRow>
//                                     )}
//                                 </TableBody>
//                             </Table>
//                         </CardContent>
//                     </Card>
//                 )}

//                 {/* User Reviews Section */}
//                 {activeTab === "reviews" && (
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>User Reviews</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <Table>
//                                 <TableHeader>
//                                     <TableRow>
//                                         <TableCell>Venue</TableCell>
//                                         <TableCell>User</TableCell>
//                                         <TableCell>Review</TableCell>
//                                         <TableCell>Rating</TableCell>
//                                     </TableRow>
//                                 </TableHeader>
//                                 <TableBody>
//                                     {reviews.length > 0 ? (
//                                         reviews.map((review) => (
//                                             <TableRow key={review.id}>
//                                                 <TableCell>{review.venue}</TableCell>
//                                                 <TableCell>{review.user}</TableCell>
//                                                 <TableCell>{review.comment}</TableCell>
//                                                 <TableCell>{`⭐ ${review.rating}`}</TableCell>
//                                             </TableRow>
//                                         ))
//                                     ) : (
//                                         <TableRow>
//                                             <TableCell colSpan={4} className="text-center">
//                                                 No reviews found.
//                                             </TableCell>
//                                         </TableRow>
//                                     )}
//                                 </TableBody>
//                             </Table>
//                         </CardContent>
//                     </Card>
//                 )}
//             </main>
//         </div>
//     );
// }

"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { BarChart, Users, Calendar, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Ensure correct import of Firestore

// Define types
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface Booking {
    id: string;
    venue: string;
    date: string;
    slot: string;
}

interface Review {
    id: string;
    venue: string;
    user: string;
    comment: string;
    rating: number;
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [users, setUsers] = useState<User[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Clear token if stored
        router.push("/"); // Redirect to Home
    };

    // Fetch Users
    const fetchUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const userList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as User[];
            setUsers(userList);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch Bookings
    const fetchBookings = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "bookings"));
            const bookingList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Booking[];
            setBookings(bookingList);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    // Fetch Reviews
    const fetchReviews = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "reviews"));
            const reviewList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Review[];
            setReviews(reviewList);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    // Fetch all data on load
    useEffect(() => {
        fetchUsers();
        fetchBookings();
        fetchReviews();
        setLoading(false);
    }, []);

    return (
        <div className="admin-dashboard">
            {/* Admin Navbar */}
            <AdminNavbar />

            {/* Sidebar Navigation */}
            <aside className="sidebar">
                <Button onClick={() => setActiveTab("dashboard")} className={activeTab === "dashboard" ? "active" : ""}>
                    <BarChart /> Dashboard
                </Button>
                <Button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>
                    <Users /> Users
                </Button>
                <Button onClick={() => setActiveTab("bookings")} className={activeTab === "bookings" ? "active" : ""}>
                    <Calendar /> Bookings
                </Button>
                <Button onClick={() => setActiveTab("reviews")} className={activeTab === "reviews" ? "active" : ""}>
                    <Star /> Reviews
                </Button>

                {/* Logout Button */}
                <Button onClick={handleLogout} className="logout-button">
                    Logout
                </Button>
            </aside>

            {/* Main Content Area */}
            <main className="content">
                {/* Dashboard Overview */}
                {activeTab === "dashboard" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Dashboard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Welcome to the admin panel! Manage venues, bookings, and users.</p>
                        </CardContent>
                    </Card>
                )}

                {/* Users Management */}
                {activeTab === "users" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.role}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={() => {
                                                            if (confirm(`Are you sure to delete ${user.name}?`)) {
                                                                deleteDoc(doc(db, "users", user.id));
                                                                fetchUsers(); // Refresh after delete
                                                            }
                                                        }}
                                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* Bookings Management */}
                {activeTab === "bookings" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Venue</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Slot</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookings.length > 0 ? (
                                        bookings.map((booking) => (
                                            <TableRow key={booking.id}>
                                                <TableCell>{booking.venue}</TableCell>
                                                <TableCell>{booking.date}</TableCell>
                                                <TableCell>{booking.slot}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center">
                                                No bookings found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* User Reviews Section */}
                {activeTab === "reviews" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>User Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Venue</TableCell>
                                        <TableCell>User</TableCell>
                                        <TableCell>Review</TableCell>
                                        <TableCell>Rating</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reviews.length > 0 ? (
                                        reviews.map((review) => (
                                            <TableRow key={review.id}>
                                                <TableCell>{review.venue}</TableCell>
                                                <TableCell>{review.user}</TableCell>
                                                <TableCell>{review.comment}</TableCell>
                                                <TableCell>{`⭐ ${review.rating}`}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center">
                                                No reviews found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
