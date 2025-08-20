import { render, screen } from '@testing-library/react';
import DinamicTableMejorada from './DinamicTableMejorada';
import { IntlProvider, ReactIntlErrorCode } from 'react-intl';
import textoEn from '../../idioms/en';
import textoEs from '../../idioms/es';

test('renderiza la tabla con un registro', () => {
    const onError = (e: any) => {
        if (e.code === ReactIntlErrorCode.MISSING_DATA) {
            return;
        }
    };
    const loadLocaleData = (locale: string) => {
        if (locale === 'en') {
            return textoEn;
        }
        return textoEs;
    };
    const { container } = render(
        <IntlProvider onError={onError} locale={'mx'} messages={loadLocaleData('mx')}>
            <DinamicTableMejorada data={[{ id: 1, nombre: 'Hello, sergio!' }]} />
        </IntlProvider>);
    
    expect(container).toBeTruthy();
    expect(screen.getByTestId('dinamic-tabla-mejorada')).toBeInTheDocument();
});