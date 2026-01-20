import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllAtividadesLazer,
  getCulturaQty,
  getEmGrupoQty,
  getJogosQty,
  getOutrosQty,
  removeSingleAtividadeLazer,
  resetRegisterLazer,
  resetRemoveLazer,
} from '../../features/lazer/lazerSlice';

export default function useLazer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const {
    atividadesLazer,
    isLoading,
    register,
    remove,
    quantidadeJogos,
    quantidadeOutros,
    quantidadeCultura,
    quantidadeEmGrupo,
  } = useSelector((state) => state.atividadesLazer);
  const [openSingleAtividade, setOpenSingleAtividade] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [selectedRow, setSelectedRow] = useState();
  const [categoryCardSelected, setCategoryCardSelected] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [categorySelected, setCategorySelected] = useState('');

  const handleCloseSingleAtividade = useCallback(
    () => setOpenSingleAtividade(false),
    [],
  );
  const cleanFilters = useCallback(() => {
    setCategorySelected('');
    setCategoryCardSelected([false, false, false, false]);
  }, []);

  const handleCardClick = useCallback((idx, title) => {
    setCategorySelected(title);
    setCategoryCardSelected((prev) => {
      const arrayCopy = [...prev].fill(false);
      arrayCopy[idx] = !prev[idx];
      if (arrayCopy[idx] === false) {
        cleanFilters();
      }
      return arrayCopy;
    });
  }, []);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setOpenSingleAtividade(true);
  };
  const handleDelete = (id, userId) => {
    dispatch(
      removeSingleAtividadeLazer({
        id,
        userId,
      }),
    );
  };
  const handleEdit = (id) => {
    navigate(`/lazer/nova-atividade/lazer/${id}`);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
  };
  //Side Effects
  useEffect(() => {
    if (register.isSuccess) {
      toast.success(register.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    if (remove.isSuccess) {
      toast.success(remove.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
    dispatch(getCulturaQty());
    dispatch(getEmGrupoQty());
    dispatch(getJogosQty());
    dispatch(getOutrosQty());
    return () => {
      dispatch(resetRemoveLazer());
      dispatch(resetRegisterLazer());
    };
  }, [register, remove, dispatch]);

  useEffect(() => {
    dispatch(
      getAllAtividadesLazer({
        page: page,
        limit: limit,
        filter: filter,
        categorySelected: categorySelected,
        userId: user._id,
      }),
    );
  }, [register, remove, filter, categorySelected, page, limit, dispatch]);

  return {
    data: {
      atividadesLazer,
      isLoading,
      quantities: {
        quantidadeJogos,
        quantidadeOutros,
        quantidadeCultura,
        quantidadeEmGrupo,
      },
    },
    uiStates: {
      openSingleAtividade,
      selectedRow,
      categoryCardSelected,
      categorySelected,
      filter,
      limit,
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
