import { createContext, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dataContext = createContext<any>({});
export default function Context({
  children,
  data,
}: {
  children: ReactNode;
  data: object;
}): JSX.Element {
  return <dataContext.Provider value={data}>{children}</dataContext.Provider>;
}
