import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import { GET_SIMPLE_COURSE_STATS } from '../../graphql/mutations';
import SimpleCourseStats from './SimpleCourseStats';

const Stats = () => {
  const rataData = useQuery(GET_SIMPLE_COURSE_STATS);
  const [filter, setFilter] = useState('');

  if (rataData.loading) {
    return <LoadingPage />;
  }
  if (!rataData.data) {
    return (
      <div className="div-error">
        Ei dataa, olethan kirjautunut?
      </div>
    );
  }
  return (
    <div className="wideContainer wideContainerTop wideContainerSmallPadding">
      <Typography variant="h2">Ratadataa</Typography>
      {(rataData.data.getCourseStats.length > 0) ? <p>&nbsp;</p>
        : (
          <Typography paragraph>
            Ei näytettävää dataa!? Tarkista, että olet lisännyt&nbsp;
            <Link to="/settings/#alias">aliaksia</Link>
          </Typography>
        )}
      <Grid container spacing={5} alignItems="center">
        <Grid item>Suodata</Grid>
        <Grid item>
          <TextField label="Radan nimi" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </Grid>
      </Grid>
      <Divider />
      {rataData.data.getCourseStats
        .filter((c) => c.rata.includes(filter))
        .map((s) => (
          <SimpleCourseStats key={s.rata + s.layout} data={s} />
        ))}
    </div>
  );
};

export default Stats;
