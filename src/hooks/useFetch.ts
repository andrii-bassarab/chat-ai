
import { create } from 'zustand';
import { AxiosResponse } from 'axios';
import { useEffect, useRef } from 'react';

type ApiFunction<T> = (...params: any[]) => Promise<AxiosResponse<T>>;

interface UseFetchStore<T> {
  data?: T;
  loading: boolean;
  error: Error | null;
  fetchData: (...params: any[]) => Promise<void>;
}

const useFetchStore = create<UseFetchStore<any>>((set) => ({
  data: undefined,
  loading: true,
  error: null,
  fetchData: async (apiFunction: ApiFunction<any>, ...params: any[]) => {
    try {
      set({ loading: true, error: null });
      const { data } = await apiFunction(...params);
      set({ data });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ loading: false });
    }
  },
}));

interface UseFetchProps<T> {
  apiFunction: ApiFunction<T>;
  params: any[];
}

export const useFetch = <T>({ apiFunction, params }: UseFetchProps<T>) => {
  const { data, loading, error, fetchData } = useFetchStore();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current && !data) {
      fetchData(apiFunction, ...params);
      hasFetchedRef.current = true;
    }
  }, [apiFunction, params, fetchData, data]);

  return { data: (data as T), loading, error, refetch: fetchData };
};
