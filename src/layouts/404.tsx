import Header from "@/components/header";

export const metadata = {
  title: 'Page not found',
};

const NotFoundPage = () => {
  return (
    <div className="app-main">
      <Header isErrorPage />
      {/* The original component used children, which is not applicable to app router not-found.tsx.
          The content that was likely passed as children is rendered directly here. */}
      <main className="main-page"> {/* Removed conditional class based on pathname */}
        <div className="container">
          {/* Example content for a 404 page */}
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          {/* You might add a link back home here if desired */}
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;