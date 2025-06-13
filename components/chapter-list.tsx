"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Ruler,
  ActivityIcon as Function,
  MoveHorizontal,
  MoveVertical,
  CircleDot,
  CircleDashed,
  Atom,
  Compass,
  Lightbulb,
  Zap,
  Waves,
  Magnet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { chaptersData } from "@/lib/data";
import type { Chapter, Filter } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface ChapterListProps {
  activeSubject: string;
}

export default function ChapterList({ activeSubject }: ChapterListProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([]);
  const [filters, setFilters] = useState<Filter>({
    classes: [],
    units: [],
    notStarted: false,
    weakChapters: false,
  });
  const [sortAsc, setSortAsc] = useState(true);
  const [uniqueClasses, setUniqueClasses] = useState<string[]>([]);
  const [uniqueUnits, setUniqueUnits] = useState<string[]>([]);

  // Icons for chapters
  const chapterIcons = [
    <Ruler key="ruler" className="h-5 w-5" />,
    <Function key="function" className="h-5 w-5" />,
    <MoveHorizontal key="moveH" className="h-5 w-5" />,
    <MoveVertical key="moveV" className="h-5 w-5" />,
    <CircleDot key="circleDot" className="h-5 w-5" />,
    <CircleDashed key="circleDashed" className="h-5 w-5" />,
    <Atom key="atom" className="h-5 w-5" />,
    <Compass key="compass" className="h-5 w-5" />,
    <Lightbulb key="lightbulb" className="h-5 w-5" />,
    <Zap key="zap" className="h-5 w-5" />,
    <Waves key="waves" className="h-5 w-5" />,
    <Magnet key="magnet" className="h-5 w-5" />,
  ];

  // Load data when activeSubject changes
  useEffect(() => {
    // Filter chapters by active subject
    const subjectChapters = chaptersData.filter(
      (chapter) => chapter.subject === activeSubject
    );

    // Add random icons to chapters
    const chaptersWithIcons = subjectChapters.map((chapter, index) => ({
      ...chapter,
      icon: chapterIcons[index % chapterIcons.length],
    }));

    setChapters(chaptersWithIcons);
    setFilteredChapters(chaptersWithIcons);

    // Extract unique classes and units for the active subject
    const classes = [...new Set(subjectChapters.map((c) => c.class))].sort();
    const units = [...new Set(subjectChapters.map((c) => c.unit))].sort();

    setUniqueClasses(classes);
    setUniqueUnits(units);

    // Reset filters when changing subjects
    setFilters({
      classes: [],
      units: [],
      notStarted: false,
      weakChapters: false,
    });
  }, [activeSubject]); // Add activeSubject to dependency array

  // Apply filters
  useEffect(() => {
    let result = [...chapters];

    // Apply class filter
    if (filters.classes.length > 0) {
      result = result.filter((chapter) =>
        filters.classes.includes(chapter.class)
      );
    }

    // Apply unit filter
    if (filters.units.length > 0) {
      result = result.filter((chapter) => filters.units.includes(chapter.unit));
    }

    // Apply not started filter
    if (filters.notStarted) {
      result = result.filter((chapter) => chapter.status === "Not Started");
    }

    // Apply weak chapters filter
    if (filters.weakChapters) {
      result = result.filter((chapter) => chapter.isWeakChapter);
    }

    // Apply sorting
    result = result.sort((a, b) => {
      return sortAsc
        ? a.chapter.localeCompare(b.chapter)
        : b.chapter.localeCompare(a.chapter);
    });

    setFilteredChapters(result);
  }, [chapters, filters, sortAsc]);

  // Toggle class filter
  const toggleClass = (className: string) => {
    setFilters((prev) => {
      const classes = prev.classes.includes(className)
        ? prev.classes.filter((c) => c !== className)
        : [...prev.classes, className];

      return { ...prev, classes };
    });
  };

  // Toggle unit filter
  const toggleUnit = (unit: string) => {
    setFilters((prev) => {
      const units = prev.units.includes(unit)
        ? prev.units.filter((u) => u !== unit)
        : [...prev.units, unit];

      return { ...prev, units };
    });
  };

  // Toggle not started filter
  const toggleNotStarted = () => {
    setFilters((prev) => ({ ...prev, notStarted: !prev.notStarted }));
  };

  // Toggle weak chapters filter
  const toggleWeakChapters = () => {
    setFilters((prev) => ({ ...prev, weakChapters: !prev.weakChapters }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      classes: [],
      units: [],
      notStarted: false,
      weakChapters: false,
    });
  };

  // Toggle sort order
  const toggleSort = () => {
    setSortAsc((prev) => !prev);
  };

  // Calculate trend (up, down, stable) by comparing 2025 and 2024 question counts
  const getTrend = (chapter: Chapter) => {
    const count2025 = chapter.yearWiseQuestionCount["2025"] || 0;
    const count2024 = chapter.yearWiseQuestionCount["2024"] || 0;

    if (count2025 > count2024) return "up";
    if (count2025 < count2024) return "down";
    return "stable";
  };

  // Calculate total questions for a chapter
  const getTotalQuestions = (chapter: Chapter) => {
    return Object.values(chapter.yearWiseQuestionCount).reduce(
      (sum, count) => sum + count,
      0
    );
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Not Started":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Class Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Class
              <ChevronDown className="h-4 w-4" />
              {filters.classes.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 rounded-sm px-1 font-normal"
                >
                  {filters.classes.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Classes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {uniqueClasses.map((className) => (
                <DropdownMenuCheckboxItem
                  key={className}
                  checked={filters.classes.includes(className)}
                  onCheckedChange={() => toggleClass(className)}
                >
                  {className}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Units Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Units
              <ChevronDown className="h-4 w-4" />
              {filters.units.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 rounded-sm px-1 font-normal"
                >
                  {filters.units.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Units</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {uniqueUnits.map((unit) => (
                <DropdownMenuCheckboxItem
                  key={unit}
                  checked={filters.units.includes(unit)}
                  onCheckedChange={() => toggleUnit(unit)}
                >
                  {unit}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Not Started Toggle */}
        <Toggle
          pressed={filters.notStarted}
          onPressedChange={toggleNotStarted}
          variant="outline"
        >
          Not Started
        </Toggle>

        {/* Weak Chapters Toggle */}
        <Toggle
          pressed={filters.weakChapters}
          onPressedChange={toggleWeakChapters}
          variant="outline"
        >
          Weak Chapters
        </Toggle>

        {/* Clear All Button */}
        {(filters.classes.length > 0 ||
          filters.units.length > 0 ||
          filters.notStarted ||
          filters.weakChapters) && (
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="ml-auto"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          Showing all chapters ({filteredChapters.length})
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSort}
          className="flex items-center gap-1"
        >
          <ArrowUpDown className="h-4 w-4" />
          Sort
        </Button>
      </div>

      <div className="space-y-3">
        {filteredChapters.map((chapter) => {
          const trend = getTrend(chapter);
          const totalQuestions = getTotalQuestions(chapter);
          const statusColor = getStatusColor(chapter.status);

          return (
            <div
              key={chapter.chapter}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="bg-orange-100 dark:bg-orange-950/50 p-2 rounded-md text-orange-500">
                  {chapter.icon}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-medium">{chapter.chapter}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {chapter.class}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {chapter.unit}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}
                    >
                      {chapter.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">
                    2025: {chapter.yearWiseQuestionCount["2025"] || 0}Qs
                  </span>
                  {trend === "up" && (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  )}
                  {trend === "down" && (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  | 2024: {chapter.yearWiseQuestionCount["2024"] || 0}Qs
                </div>

                <div className="text-sm text-muted-foreground ml-0 md:ml-4">
                  | {chapter.questionSolved}/{totalQuestions} Qs
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
