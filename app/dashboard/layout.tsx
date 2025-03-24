"use client";
import React from "react";
import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">{children}</div>
        </div>
    );
};

export default DashboardLayout;
