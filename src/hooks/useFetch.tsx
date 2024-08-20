import { useEffect, useState } from "react";
import { type useFetchState } from "@definitions/global";

export default function useFetch <T,>(url: string, method = "GET"/* , body?: any */ ): useFetchState<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(url, {
      method,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(json => {
      setData(json);
    })
    .catch((e: Error) => {
      setError(e);
    })
    .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
};
