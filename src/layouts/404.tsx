import Header from "@/components/header";
import React from 'react';

export const metadata = {
  title: 'Page not found',
};

const NotFoundPage = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="app-main">
      <Header isErrorPage />
      <main className="main-page">
        <div className="container">
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          {children}
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;