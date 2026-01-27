import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllAtividadesEducacao,
  getCursosQty,
  getLivrosQty,
  getSeminariosQty,
  removeSingleAtividadeEducacao,
  resetRegisterEducacao,
  resetRemoveEducacao,
} from '../features/educacao/educacaoSlice';

export default function useEducacao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Redux State
  const {
    atividadesEducacao,
    isLoading,
    register,
    remove,
    update,
    quantidadeCursos,
    quantidadeLivros,
    quantidadeSeminarios,
  } = useSelector((state) => state.atividadesEducacao);

  // Local State
  const [openSingleAtividade, setOpenSingleAtividade] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortDirection, setSortDirection] = useState(1);
  const [prop, setProp] = useState('_id');
  const [filter, setFilter] = useState('');
  const [selectedRowId, setSelectedRowId] = useState();
  const [categorySelected, setCategorySelected] = useState('');
  const [categoryCardSelected, setCategoryCardSelected] = useState([
    false,
    false,
    false,
  ]);

  // Actions
  const cleanFilters = useCallback(() => {
    setCategorySelected('');
    setCategoryCardSelected([false, false, false]);
  }, []);

  const handleCloseSingleAtividade = useCallback(
    () => setOpenSingleAtividade(false),
    [],
  );

  const handleCardClick = useCallback(
    (idx, title) => {
      setCategorySelected(title);
      setCategoryCardSelected((prev) => {
        const arrayCopy = [...prev].fill(false);
        arrayCopy[idx] = !prev[idx];
        if (arrayCopy[idx] === false) {
          cleanFilters();
        }
        return arrayCopy;
      });
    },
    [cleanFilters],
  );

  const handleRowClick = useCallback((id) => {
    setSelectedRowId(id);
    setOpenSingleAtividade(true);
  }, []);

  const handleDelete = useCallback(
    (id, userId) => {
      dispatch(
        removeSingleAtividadeEducacao({
          id,
          userId,
        }),
      );
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (id) => {
      navigate(`/educacao/nova-atividade/educacao/${id}`);
    },
    [navigate],
  );

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((newLimit) => {
    setLimit(newLimit);
  }, []);

  // Unmount Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetRegisterEducacao());
      dispatch(resetRemoveEducacao());
    };
  }, [dispatch]);

  // Side Effects
  useEffect(() => {
    if (register.isSuccess) {
      toast.success(register.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(resetRegisterEducacao());
    }
    if (remove.isSuccess) {
      toast.success(remove.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(resetRemoveEducacao());
    }

    dispatch(getCursosQty());
    dispatch(getLivrosQty());
    dispatch(getSeminariosQty());
  }, [
    register.isSuccess,
    remove.isSuccess,
    register.message,
    remove.message,
    dispatch,
  ]);

  useEffect(() => {
    dispatch(
      getAllAtividadesEducacao({
        page: page,
        limit: limit,
        prop: prop,
        sortDirection: sortDirection,
        filter: filter,
        categorySelected: categorySelected,
        userId: user._id,
      }),
    );
  }, [
    register.isSuccess,
    remove.isSuccess,
    filter,
    categorySelected,
    page,
    limit,
    prop,
    sortDirection,
    dispatch,
    user._id,
  ]);

  return {
    data: {
      atividadesEducacao,
      isLoading,
      removeIsLoading: remove.isLoading,
      registerIsLoading: register.isLoading,
      updateIsLoading: update.isLoading,
      quantidadeCursos,
      quantidadeLivros,
      quantidadeSeminarios,
      limit,
    },
    uiStates: {
      openSingleAtividade,
      selectedRowId,
      categoryCardSelected,
      categorySelected,
      filter,
    },
    actions: {
      setFilter,
      handleCloseSingleAtividade,
      handleCardClick,
      cleanFilters,
      handleRowClick,
      handleEdit,
      handleDelete,
      handlePageChange,
      handleRowsPerPageChange,
    },
  };
}
