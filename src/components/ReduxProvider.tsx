'use client';

import { Provider } from 'react-redux';
import { wrapper } from '@/store';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const { store } = wrapper.useWrappedStore();
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;