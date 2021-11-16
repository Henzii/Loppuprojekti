import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { SAVE_SETUP } from '../graphql/mutations';
import { GET_SETUP } from '../graphql/queries';

const useSetup = () => {
  const [setup, setSetup] = useState({});
  const setupQuery = useQuery(GET_SETUP);
  const [saveSetupMutation] = useMutation(SAVE_SETUP);

  useEffect(() => {
    if (setupQuery && !setupQuery.loading) {
      setSetup(setupQuery.data.getSetup);
    }
  }, [setupQuery]);
  const saveSetup = () => saveSetupMutation({ variables: setup });

  return { setup, setSetup, saveSetup };
};
export default useSetup;
