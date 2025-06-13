import type React from "react"

export interface YearWiseQuestionCount {
  [year: string]: number
}

export interface Chapter {
  subject: string
  chapter: string
  class: string
  unit: string
  yearWiseQuestionCount: YearWiseQuestionCount
  questionSolved: number
  status: "Completed" | "In Progress" | "Not Started"
  isWeakChapter: boolean
  icon?: React.ReactNode
}

export interface Filter {
  classes: string[]
  units: string[]
  notStarted: boolean
  weakChapters: boolean
}
