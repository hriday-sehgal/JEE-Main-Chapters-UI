"use client";

import { Compass, Atom, Beaker, Calculator } from "lucide-react";
import Link from "next/link";

interface SubjectSidebarProps {
  activeSubject: string;
  onSubjectChange: (subject: string) => void;
}

export default function SubjectSidebar({
  activeSubject,
  onSubjectChange,
}: SubjectSidebarProps) {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Compass className="h-6 w-6 text-orange-500" />
        <h2 className="text-xl font-bold">JEE Main</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-8">
        2025 - 2009 | 173 Papers | 15825 Qs
      </p>

      <nav className="space-y-2">
        <Link
          href="#"
          className={`flex items-center gap-3 p-3 rounded-lg ${
            activeSubject === "Physics"
              ? "bg-muted/50 text-primary font-medium"
              : "hover:bg-muted/50 text-foreground font-medium"
          }`}
          onClick={() => onSubjectChange("Physics")}
        >
          <span className="bg-orange-500 p-1.5 rounded text-white">
            <Atom className="h-4 w-4" />
          </span>
          Physics PYQs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="ml-auto"
          >
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        </Link>

        <Link
          href="#"
          className={`flex items-center gap-3 p-3 rounded-lg ${
            activeSubject === "Chemistry"
              ? "bg-muted/50 text-primary font-medium"
              : "hover:bg-muted/50 text-foreground font-medium"
          }`}
          onClick={() => onSubjectChange("Chemistry")}
        >
          <span className="bg-green-500 p-1.5 rounded text-white">
            <Beaker className="h-4 w-4" />
          </span>
          Chemistry PYQs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="ml-auto"
          >
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        </Link>

        <Link
          href="#"
          className={`flex items-center gap-3 p-3 rounded-lg ${
            activeSubject === "Mathematics"
              ? "bg-muted/50 text-primary font-medium"
              : "hover:bg-muted/50 text-foreground font-medium"
          }`}
          onClick={() => onSubjectChange("Mathematics")}
        >
          <span className="bg-blue-500 p-1.5 rounded text-white">
            <Calculator className="h-4 w-4" />
          </span>
          Mathematics PYQs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="ml-auto"
          >
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        </Link>
      </nav>
    </div>
  );
}
