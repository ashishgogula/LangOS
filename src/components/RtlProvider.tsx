'use client';

import { useEffect } from 'react';

export default function RtlProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const locale = localStorage.getItem('lingo-locale') || 'en';
        if (locale === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }
        document.documentElement.lang = locale;
    }, []);

    return <>{children}</>;
}
