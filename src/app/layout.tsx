// global styles
import '@/assets/css/styles.scss'; // Assuming assets is at src/assets or root assets
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';

import { Poppins } from 'next/font/google';
import Script from 'next/script';

import ReduxProvider from '@/components/ReduxProvider';
import GAInitializer from '@/components/GAInitializer';
import { GA_TRACKING_ID } from '@/utils/gtag'; // Assuming gtag is at src/utils/gtag or root utils/gtag.ts/js
import Layout from "../layouts/Main";

const isProduction = process.env.NODE_ENV === 'production';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--main-font',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ReduxProvider>
          <GAInitializer>
            <Layout>
              {children}
            </Layout>
          </GAInitializer>
        </ReduxProvider>

        {/* Google Analytics Scripts */}
        {isProduction && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}