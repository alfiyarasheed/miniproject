"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { BarChart, Users, Calendar, Building2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminNavbar from "@/components/AdminNavbar"; // Import the Admin Navbar

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const router = useRouter();

    const handleLogout = () => {
        // Clear authentication token (if stored)
        localStorage.removeItem("authToken"); // Modify this based on how you're handling authentication
        router.push("/"); // Redirect to Home
    };

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
                <Button onClick={() => setActiveTab("venues")} className={activeTab === "venues" ? "active" : ""}>
                    <Building2 /> Venues
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
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>John Doe</TableCell>
                                        <TableCell>johndoe@example.com</TableCell>
                                        <TableCell>Admin</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Jane Smith</TableCell>
                                        <TableCell>janesmith@example.com</TableCell>
                                        <TableCell>Manager</TableCell>
                                    </TableRow>
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
                                    <TableRow>
                                        <TableCell>Grand Hall</TableCell>
                                        <TableCell>2025-03-15</TableCell>
                                        <TableCell>10 am to 2pm</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Banquet Room</TableCell>
                                        <TableCell>2025-04-01</TableCell>
                                        <TableCell>2pm to 8 pm</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}

                {/* Venues Management */}
                {activeTab === "venues" && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Venues</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Manage all venues available for booking.</p>
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
                                    <TableRow>
                                        <TableCell>Sunset Ballroom</TableCell>
                                        <TableCell>John Doe</TableCell>
                                        <TableCell>{"Amazing experience! Highly recommended."}</TableCell>
                                        <TableCell>⭐⭐⭐⭐⭐</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Grand Hall</TableCell>
                                        <TableCell>Jane Smith</TableCell>
                                        <TableCell>{"Good venue, but a bit pricey."}</TableCell>
                                        <TableCell>⭐⭐⭐⭐</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}


            </main>
        </div>
    );
}