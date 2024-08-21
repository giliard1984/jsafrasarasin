export type useFetchState<T> = {
  data: T | undefined
  error: Error | null
  loading: boolean
};

export type Credential = {
  email: string
  password: string
};

export type Session = {
  email: string
  firstName: string
  lastName: string
  createdAt: string
  loggedIn: string
} & undefined
