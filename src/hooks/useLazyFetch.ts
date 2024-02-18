import { AxiosResponse } from 'axios';
import { useState } from 'react';

type ApiFunction<T, K extends any[]> = (...params: K) => Promise<AxiosResponse<T>>;

interface UseLazyFetchProps<T, K extends any[]> {
  apiFunction: ApiFunction<T, K>;
  successfullyCallback?: () => Promise<void>;
  waitForSuccessfullyCallback?: boolean;
  finallyCallback?: () => void;
  failedCallback?: () => void;
}

type LazyFetchResult<T, K extends any[]> = [
  (...params: K) => Promise<T | undefined>,
  {
    data?: T;
    loading: boolean;
    error: Error | null;
    status: number | undefined;
  },
];

export const useLazyFetch = <T, K extends any[]>({
  apiFunction,
  successfullyCallback,
  waitForSuccessfullyCallback = true,
  finallyCallback,
  failedCallback
}: UseLazyFetchProps<T, K>): LazyFetchResult<T, K> => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<number>();

  const trigger = async (...params: K): Promise<T | undefined> => {
    let failedRequest = false;
  
    try {
      setLoading(true);
      setError(null);

      const { data, status } = await apiFunction(...params);

      setData(data);
      setStatus(status);

      return data;
    } catch (error) {
      failedRequest = true;
      setError(error as Error);
      failedCallback?.();
    } finally {
      if (failedRequest) {
        setLoading(false);
        finallyCallback?.();

        return;
      }

      if (waitForSuccessfullyCallback) {
        await successfullyCallback?.();
      } else {
        successfullyCallback?.();
      }

      finallyCallback?.();

      setLoading(false);
    }
  };

  return [trigger, { data, loading, error, status }];
};
