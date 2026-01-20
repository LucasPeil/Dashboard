import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../../index.css';
export default function useVisaoGeral() {
  const registerLazer = useSelector((state) => state.atividadesLazer.register);
  const registerEducacao = useSelector(
    (state) => state.atividadesEducacao.register
  );
  const [ano, setAno] = useState(new Date().getFullYear());
  const registerCasa = useSelector((state) => state.atividadesCasa.register);

  useEffect(() => {
    if (registerCasa.isSuccess) {
      toast.success(registerCasa.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (registerEducacao.isSuccess) {
      toast.success(registerEducacao.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (registerLazer.isSuccess) {
      toast.success(registerLazer.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, [
    registerCasa.isSuccess,
    registerEducacao.isSuccess,
    registerLazer.isSuccess,
  ]);

  return { uiState: { ano }, actions: { setAno } };
}
