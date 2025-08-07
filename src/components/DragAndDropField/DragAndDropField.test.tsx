import { render, screen } from '@testing-library/react';
import DragAndDropField from './index';
import { IntlProvider, ReactIntlErrorCode } from 'react-intl';
import textoEn from '../../idioms/en';
import textoEs from '../../idioms/es';

test('renderiza el componente para agregar archivos', () => {

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
            <DragAndDropField acepted={{
                "image/jpeg": [],
                "image/jpg": [],
                "image/png": [],
                "video/*": [],
            }} multiple={false} muestraBoton={false} onAction={(files: any) => console.log(files)} />
        </IntlProvider>
    );
    expect(container).toBeTruthy();
    expect(screen.getByTestId('drag-and-drop-field')).toBeInTheDocument();
});