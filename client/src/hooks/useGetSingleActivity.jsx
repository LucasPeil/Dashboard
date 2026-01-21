import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleAtividadeCasa } from '../features/casa/casaSlice';
import { getSingleAtividadeEducacao } from '../features/educacao/educacaoSlice';
import { getSingleAtividadeLazer } from '../features/lazer/lazerSlice';
import { resetGetSingleAtividadeEducacao } from '../features/educacao/educacaoSlice';
import { resetGetSingleAtividadeLazer } from '../features/lazer/lazerSlice';
import { resetGetSingleAtividadeCasa } from '../features/casa/casaSlice';

export default function useGetSingleActivity(dashboardName, id) {
  const dispatch = useDispatch();

  const atividadeEducacao = useSelector(
    (state) => state.atividadesEducacao.atividadeEducacao,
  );
  const loadingEducacao = useSelector(
    (state) => state.atividadesEducacao.singleAtividadeEducacao.isLoading,
  );

  const atividadeCasa = useSelector(
    (state) => state.atividadesCasa.atividadeCasa,
  );
  const loadingCasa = useSelector(
    (state) => state.atividadesCasa.singleAtividadeCasa.isLoading,
  );

  const atividadeLazer = useSelector(
    (state) => state.atividadesLazer.atividadeLazer,
  );
  const loadingLazer = useSelector(
    (state) => state.atividadesLazer.singleAtividadeLazer.isLoading,
  );

  useEffect(() => {
    if (id) {
      switch (dashboardName) {
        case 'casa':
          dispatch(getSingleAtividadeCasa(id));
          break;
        case 'educacao':
          dispatch(getSingleAtividadeEducacao(id));
          break;
        case 'lazer':
          dispatch(getSingleAtividadeLazer(id));
          break;
        default:
          break;
      }
    }
    return () => {
      switch (dashboardName) {
        case 'casa':
          dispatch(resetGetSingleAtividadeCasa());
          break;
        case 'educacao':
          dispatch(resetGetSingleAtividadeEducacao());
          break;
        case 'lazer':
          dispatch(resetGetSingleAtividadeLazer());
          break;
        default:
          break;
      }
    };
  }, [dispatch, dashboardName, id]);

  switch (dashboardName) {
    case 'casa':
      return { data: atividadeCasa, isLoading: loadingCasa };
    case 'educacao':
      return { data: atividadeEducacao, isLoading: loadingEducacao };
    case 'lazer':
      return { data: atividadeLazer, isLoading: loadingLazer };
    default:
      return { data: null, isLoading: false };
  }
}
