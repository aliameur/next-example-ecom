'use client';

import { Provider } from 'react-redux';
import { wrapper } from '@/store'; // Assuming store is at src/store or root store.ts/js

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const { store } = wrapper.useWrappedStore();
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;