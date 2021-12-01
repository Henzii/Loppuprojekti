import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { LoginForm } from './LoginForm';

test('<LoginForm /> renders and form works', () => {
  const login = jest.fn();
  const komponentti = render(
    <LoginForm handleLogin={login} loading={false} />,
  );
  const tunnus = komponentti.container.querySelector('input');
  const passu = komponentti.getByPlaceholderText('Salasana...');
  const form = komponentti.container.querySelector('form');
  fireEvent.change(tunnus, {
    target: { value: 'Tunnukseni' },
  });
  fireEvent.change(passu, {
    target: { value: 'Passuni' },
  });
  fireEvent.submit(form);

  // LoginFormi nappia painettaessa jotain tapahtuu...
  expect(login.mock.calls).toHaveLength(1);

  // Formi päivittää isukkia tunnuksella ja salasanalla
  expect(login.mock.calls[0]).toEqual(['Tunnukseni', 'Passuni']);
});
