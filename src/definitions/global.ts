export type Role = "admin" | "user";
export type ComponentType = "radio" | "checkbox";

export type Credential = {
  email: string | null
  password: string | null
};

export type SignUp = {
  firstName: string | null
  lastName: string | null
  role?: "admin" | "user"
} & Credential;

export type Account = {
  id: string
  createdAt: string
} & SignUp & Credential

export type Session = {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
  loggedIn: string
};

export type PossibleAnswer = {
  value: string
  label: string
}

export type Question = {
  id: number
  type: ComponentType
  question: string
  possibleAnswers: PossibleAnswer[]
  correctAnswers: string[]
  usersAnswers?: string[]
};

export type QuizStatistics = {
  totalQuestions: number
  correct: number
  score: number
}


export type Quiz = {
  id: string
  reference: number
  questions: Question[]
  createdAt: string
  userId: string
  submittedAt?: string
  statistics?: QuizStatistics
}