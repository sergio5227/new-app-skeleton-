import { render, screen } from '@testing-library/react';
import SmartLocationInput from './SmartLocationInput';

test('renderiza el componente de busqueda', () => {

  const { container } = render(
    <SmartLocationInput apiKey={'AIzaSyANkBT5FmnbJhZPrPHYYhGHuS4KocaL3x8'} enAccion={(d) => {
      console.log(d?.address);
    }} />
  );
  expect(container).toBeTruthy();
  expect(screen.getByTestId('smart-location-input')).toBeInTheDocument();
});