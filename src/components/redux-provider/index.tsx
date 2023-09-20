'use client';

import store from '@/redux/store';
import React, { ReactElement } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

const Prodiver = ({ children }: { children: ReactElement }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Prodiver;
