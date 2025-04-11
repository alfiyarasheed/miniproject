import React from "react";
import LoginForm from "../../../src/components/auth/LoginForm";

export default function LoginPage() {
    return (
        < div >
            <LoginForm />
            <p className="p">Are you an admin? <a href="/auth/admin">Login as Admin</a></p>
        </div >
    );
}

