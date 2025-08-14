"use client";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import PageWrapper from "@/components/PageWrapper";
import { ToastContainer } from "react-toastify";
import store from "@/lib/store";

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
                    <Provider store={store}>
                        <PageWrapper>{children}</PageWrapper>
                        <ToastContainer
                            position="top-center"
                            autoClose={4000}
                        />
                    </Provider>
                </div>
            </body>
        </html>
    );
}
