import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_ME, UPDATE_USER } from '../graphql/mutations';

const useMe = (fetchFromDatabase = undefined) => {
  const [me, setMe] = useState(null);
  const { loading, data } = useQuery(GET_ME, { variables: { fetchFromDatabase } });
  const [updateMe] = useMutation(UPDATE_USER, {
    refetchQueries:
      [GET_ME,
        {
          variables: { fetchFromDatabase },
        },
      ],
  });

  useEffect(() => {
    if (!loading) {
      if (data?.getMe) {
        setMe(data.getMe);
      } else {
        setMe(undefined);
      }
    }
  }, [loading, data]);
  const update = async (variables) => {
    const res = await updateMe({ variables });
    return res;
  };
  const clear = () => {
    setMe(null);
  };

  return { me, update, clear };
};

export default useMe;
