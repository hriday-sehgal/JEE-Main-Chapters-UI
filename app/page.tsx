"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChapterList from "@/components/chapter-list";
import SubjectSidebar from "@/components/subject-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Atom, Beaker, Calculator } from "lucide-react";

export default function Home() {
  const [activeSubject, setActiveSubject] = useState("Physics");

  const handleSubjectChange = (subject: string) => {
    setActiveSubject(subject);
  };

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case "Physics":
        return <Atom className="h-6 w-6" />;
      case "Chemistry":
        return <Beaker className="h-6 w-6" />;
      case "Mathematics":
        return <Calculator className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "bg-orange-500";
      case "Chemistry":
        return "bg-green-500";
      case "Mathematics":
        return "bg-blue-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar for larger screens */}
      <div className="hidden md:block w-[350px] border-r">
        <SubjectSidebar
          activeSubject={activeSubject}
          onSubjectChange={handleSubjectChange}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-1 md:p-2">
        <div className="flex justify-end">
          <ModeToggle />
        </div>

        <div className="flex flex-col items-center text-center mb-4">
          <div className="flex items-center gap-3">
            <span
              className={`${getSubjectColor(
                activeSubject
              )} p-2 rounded-full text-white`}
            >
              {getSubjectIcon(activeSubject)}
            </span>
            <h1 className="text-2xl font-bold">{activeSubject} PYQs</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1 mb-3">
            Chapter-wise Collection of {activeSubject} PYQs
          </p>
        </div>

        {/* Mobile tabs - visible only on mobile */}
        <div className="md:hidden mb-4">
          <Tabs
            defaultValue={activeSubject.toLowerCase()}
            onValueChange={(value) =>
              handleSubjectChange(
                value.charAt(0).toUpperCase() + value.slice(1)
              )
            }
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="physics" className="flex items-center gap-2">
                <span className="bg-orange-500 p-1 rounded text-white">
                  <Atom className="h-4 w-4" />
                </span>
                Phy
              </TabsTrigger>
              <TabsTrigger
                value="chemistry"
                className="flex items-center gap-2"
              >
                <span className="bg-green-500 p-1 rounded text-white">
                  <Beaker className="h-4 w-4" />
                </span>
                Chem
              </TabsTrigger>
              <TabsTrigger
                value="mathematics"
                className="flex items-center gap-2"
              >
                <span className="bg-blue-500 p-1 rounded text-white">
                  <Calculator className="h-4 w-4" />
                </span>
                Math
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ChapterList activeSubject={activeSubject} />
      </div>
    </div>
  );
}
