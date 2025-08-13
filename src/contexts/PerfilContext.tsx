import React from 'react';
import { useSelector } from 'react-redux';

export const perfilContext = React.createContext(null);

export const ProviderContextComponent: any = ({ children }: any) => {
    const token = useSelector((state: any) => (state?.app?.user?.token || null));
    return (
        <perfilContext.Provider value={token}>
            {children}
        </perfilContext.Provider>
    );
}