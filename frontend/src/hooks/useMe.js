import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_ME } from '../graphql/mutations';

const useMe = () => {
  const [me, setMe] = useState(null);
  const { loading, data } = useQuery(GET_ME);

  useEffect(() => {
    if (!loading) {
      if (data?.getMe) {
        setMe(data.getMe);
      } else {
        setMe(undefined);
      }
    }
  }, [loading, data]);
  return me;
};

export default useMe;
