import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import SingleLogEntry from './SingleLogEntry';

test('<Singlelog /> renders', () => {
  const loki = {
    date: '1.1.1900',
    process: 'Test-process',
    type: 'Test',
    message: 'This works',
  };

  const komponentti = render(
    <SingleLogEntry log={loki} />,
  );
  expect(komponentti.container).toHaveTextContent('Test-process');
});
