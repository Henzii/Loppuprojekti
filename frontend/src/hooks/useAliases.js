/*
    Hookki käyttäjän aliaksien lisäämiseen ja poistamiseen
*/
import { useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_ALIASES, ADD_ALIAS, DELETE_ALIAS } from '../graphql/mutations';

const useAliases = (userId) => {
  const [aliakset, setAliakset] = useState([]);

  const [addAliasMutation] = useMutation(ADD_ALIAS, {
    refetchQueries: [GET_ALIASES, { variables: { userId } }],
  });

  const [deleteAliasMutationb] = useMutation(DELETE_ALIAS, {
    refetchQueries: [GET_ALIASES, { variables: { userId } }],
  });

  const aliasQuery = useQuery(GET_ALIASES, { variables: { userId } });

  useEffect(() => {
    if (!aliasQuery.loading && aliasQuery && aliasQuery.data) {
      setAliakset(aliasQuery.data.getAliases);
    }
  }, [aliasQuery.data]);

  /* Aliaksen poistaminen ja lisäämisen metodit. Toisena argumenttina callback-funktio */
  const addAlias = async (alias, callBack) => {
    const res = await addAliasMutation({ variables: { alias, userId } });
    callBack(res.data.addAlias);
  };
  const deleteAlias = async (aliasId, callBack) => {
    const res = await deleteAliasMutationb({ variables: { aliasId } });
    callBack(res.data.deleteAlias);
  };

  return { aliakset, addAlias, deleteAlias };
};
export default useAliases;
