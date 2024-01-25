import React, { ReactNode } from 'react';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>Common Menu</div>

      {children}
    </>
  );
};

export default AppLayout;
