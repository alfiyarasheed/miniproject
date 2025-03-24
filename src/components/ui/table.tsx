import React from "react";

export function Table({ children }: { children: React.ReactNode }) {
    return <table className="table">{children}</table>;
}

export function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead className="table-header">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody className="table-body">{children}</tbody>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
    return <tr className="table-row">{children}</tr>;
}

export function TableCell({ children }: { children: React.ReactNode }) {
    return <td className="table-cell">{children}</td>;
}