import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { CreateAccountForm } from './CreateAccount';

test('<CreateAccount /> renders and form works', async () => {
  const create = jest.fn();
  const komp = render(<CreateAccountForm handleCreation={create} />);

  const tunnus = komp.getByPlaceholderText('Tunnus...');
  const passu = komp.getByPlaceholderText('Salasana...');
  const vahvistaPassu = komp.getByPlaceholderText('Vahvista salasana');
  const form = komp.container.querySelector('form');

  fireEvent.change(tunnus, { target: { value: 'tunnus' } });

  /* Vahvista salasanakenttä eroaa salasanakentästä */
  fireEvent.change(passu, { target: { value: 'salasana123' } });
  fireEvent.change(vahvistaPassu, { target: { value: 'salasana456' } });

  await waitFor(() => {
    fireEvent.submit(form);
  });

  /* Koska salasanat eroaa, ei handleCreatonin tulisi laueta */
  expect(create.mock.calls).toHaveLength(0);

  /* Muutetaan salasanat täsmäämään toisiaan */
  fireEvent.change(vahvistaPassu, { target: { value: 'salasana123' } });
  await waitFor(() => {
    fireEvent.submit(form);
  });

  /* Tapahtumakäsittelijän tulisi tehdä jotain */
  expect(create.mock.calls).toHaveLength(1);

  /* Tunnus, salasana ja email välittyvät niin kuin pitää */
  expect(create.mock.calls[0][0]).toEqual({
    tunnus: 'tunnus',
    password: 'salasana123',
    password2: 'salasana123',
    email: '',
  });
});
