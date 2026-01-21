import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllAtividadesCasa,
  getComprasQty,
  getLimpezaQty,
  getRefeicoesQty,
  removeSingleAtividadeCasa,
  resetRegisterCasa,
  resetRemoveCasa,
} from '../features/casa/casaSlice';

export default function useCasa() {
  const user = useSelector((state) => state.auth.user);
  // States
  const [openSingleAtividade, setOpenSingleAtividade] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState();
  const [categorySelected, setCategorySelected] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [categoryCardSelected, setCategoryCardSelected] = useState([
    false,
    false,
    false,
  ]);

  // Data
  const atividadesCasa = useSelector(
    (state) => state.atividadesCasa.atividadesCasa,
  );
  const isLoading = useSelector((state) => state.atividadesCasa.isLoading);
  const register = useSelector((state) => state.atividadesCasa.register);
  const remove = useSelector((state) => state.atividadesCasa.remove);
  const quantidadeLimpeza = useSelector(
    (state) => state.atividadesCasa.quantidadeLimpeza,
  );
  const quantidadeCompras = useSelector(
    (state) => state.atividadesCasa.quantidadeCompras,
  );
  const quantidadeRefeicoes = useSelector(
    (state) => state.atividadesCasa.quantidadeRefeicoes,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Actions
  const cleanFilters = useCallback(() => {
    setCategorySelected('');
    setCategoryCardSelected([false, false, false]);
  }, []);

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

  const handleCloseSingleAtividade = useCallback(
    () => setOpenSingleAtividade(false),
    [],
  );

  const handleEdit = useCallback(
    (id) => {
      navigate(`/casa/nova-atividade/casa/${id}`);
    },
    [navigate],
  );

  const handleDelete = useCallback(
    (id, userId) => {
      dispatch(removeSingleAtividadeCasa({ id, userId }));
    },
    [dispatch],
  );

  const handleRowClick = useCallback((id) => {
    setSelectedRowId(id);
    setOpenSingleAtividade(true);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleRowsPerPageChange = useCallback((newLimit) => {
    setLimit(newLimit);
  }, []);

  // SideEffects

  // Toasts
  useEffect(() => {
    if (register.isSuccess) {
      toast.success(register.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (remove.isSuccess) {
      toast.success(remove.message, { position: toast.POSITION.BOTTOM_RIGHT });
    }
    dispatch(getComprasQty());
    dispatch(getLimpezaQty());
    dispatch(getRefeicoesQty());
    return () => {
      dispatch(resetRemoveCasa());
      dispatch(resetRegisterCasa());
    };
  }, [register, remove, dispatch]);

  // Data Fetching
  useEffect(() => {
    dispatch(
      getAllAtividadesCasa({
        page: page,
        limit: limit,
        filter: filter,
        categorySelected: categorySelected,
        userId: user._id,
      }),
    );
  }, [
    remove,
    register,
    filter,
    categorySelected,
    limit,
    page,
    dispatch,
    user._id,
  ]);

  return {
    data: {
      atividadesCasa,
      isLoading,
      quantidadeLimpeza,
      quantidadeCompras,
      quantidadeRefeicoes,
      limit,
    },
    uiStates: {
      openSingleAtividade,
      selectedRowId,
      categorySelected,
      categoryCardSelected,
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
