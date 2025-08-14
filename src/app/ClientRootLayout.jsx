"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import PageWrapper from "@/components/PageWrapper";

export default function ClientRootLayout({ children }) {
    return (
        <Provider store={store}>
            <PageWrapper>{children}</PageWrapper>
        </Provider>
    );
}
