import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import SimpleCourseStats from './SimpleCourseStats';

test('<SimpleCourseStats /> renders', () => {
  const singleStats = {
    rata: 'Testilampi',
    layout: 'Superduper',
    par: '69',
    games: '10',
    min: '60',
    avg: '65',
    hc: '3',
    tenLatestRounds: [55, 54, 56, 50],
  };

  const komponentti = render(
    <SimpleCourseStats data={singleStats} />,
  );

  // Radan nimi löytyy MuiCardin titlestä
  expect(komponentti.container.querySelector('.MuiCardHeader-title')).toHaveTextContent(singleStats.rata);

  // Layout on kortin subheaderissä
  expect(komponentti.container.querySelector('.MuiCardHeader-subheader')).toHaveTextContent(singleStats.layout);

  // 10 viimeisintä kierrosta ei mountata ennen kuin collapse avataan
  expect(komponentti.container).not.toHaveTextContent('-14-15-13-19');

  // Etsitään nappi joka avaa collapse-säiliön (joka sisältää 10 viim. kierrosta)
  const nappi = komponentti.container.querySelector('button');
  nappi.click();

  // Nyt 10 viim. kierrosta pitäisi näkyä.
  expect(komponentti.container).toHaveTextContent('-14-15-13-19');
});
