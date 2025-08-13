import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRouter from './hooks/PublicRoutes';
import PrivateRouter from './hooks/PrivateRouter';
import Dashboard from './screens/dashboard/dashboard';
import Login from './screens/login/login';
import { IntlProvider, ReactIntlErrorCode } from 'react-intl';
import { useSelector } from 'react-redux';
import textoEs from './idioms/es'
import textoEn from './idioms/en';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProviderContextComponent } from './contexts/PerfilContext';

const App = () => {

  const local = useSelector(
    (state: any) => state?.app?.idioma || 'mx'
  );

  const loadLocaleData = (locale: string) => {
    if (locale === 'en') {
      return textoEn;
    }
    return textoEs;
  };

  const onError = (e: any) => {
    if (e.code === ReactIntlErrorCode.MISSING_DATA) {
      return;
    }
  };

  return (
    <IntlProvider onError={onError} locale={local} messages={loadLocaleData(local)}>
      <Routes>
        <Route element={<PublicRouter />}>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Login />} />
        </Route>
        <Route element={<PrivateRouter path="/login" />}>
          <Route path='/dashboard' element={<ProviderContextComponent><Dashboard /></ProviderContextComponent>} />
        </Route>
      </Routes>
    </IntlProvider>
  );
}

export default App;
