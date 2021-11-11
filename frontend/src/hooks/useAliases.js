import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_ALIASES, ADD_ALIAS, DELETE_ALIAS } from '../graphql/mutations';

const useAliases = () => {
  const [aliakset, setAliakset] = useState([]);
  const [addAliasMutation] = useMutation(ADD_ALIAS, { refetchQueries: [GET_ALIASES] });
  const [deleteAliasMutationb] = useMutation(DELETE_ALIAS, { refetchQueries: [GET_ALIASES] });
  const aliasQuery = useQuery(GET_ALIASES);

  useEffect(() => {
    if (!aliasQuery.loading && aliasQuery && aliasQuery.data) {
      setAliakset(aliasQuery.data.getAliases);
    }
  });
  const addAlias = async (alias, callBack) => {
    const res = await addAliasMutation({ variables: { alias } });
    callBack(res.data.addAlias);
  };
  const deleteAlias = async (aliasId, callBack) => {
    const res = await deleteAliasMutationb({ variables: { aliasId } });
    callBack(res.data.deleteAlias);
  };

  return { aliakset, addAlias, deleteAlias };
};
export default useAliases;
