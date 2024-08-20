export type useFetchState<T> = {
  data: T | undefined
  error: Error | null
  loading: boolean
};
