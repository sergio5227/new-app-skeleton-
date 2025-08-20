import { render, screen } from '@testing-library/react';
import SmartLocationInput from './SmartLocationInput';
import env from "react-dotenv";

test('renderiza el componente de busqueda', () => {

  const { container } = render(
    <SmartLocationInput apiKey={env.GOOGLE_API_KEY} enAccion={(d) => {
      console.log(d?.address);
    }} />
  );
  expect(container).toBeTruthy();
  expect(screen.getByTestId('smart-location-input')).toBeInTheDocument();
});