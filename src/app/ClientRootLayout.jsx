"use client";

import { Provider } from "react-redux";
import { appStore } from "@/store/appStore";
import PageWrapper from "@/components/PageWrapper";

export default function ClientRootLayout({ children }) {
    return (
        <Provider store={appStore}>
            <PageWrapper>{children}</PageWrapper>
        </Provider>
    );
}
