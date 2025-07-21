import ClientLayout from "@/layout/ClientLayout";
import "@/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/img/client-fav.png" />
      </head>
      <body data-scrolling-animations="true">
        <div className="sp-body ">
          <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
