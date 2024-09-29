import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { useIonViewWillEnter } from '@ionic/react';

import { API } from '../../constants';
import { useStageStore } from '../../store/useStageStore';

export const useStageAABC = () => {
  const isAbcLoading = useStageStore((store) => store.isAbcLoading);
  const setIsAbcLoading = useStageStore((store) => store.setIsAbcLoading);
  const abc = useStageStore((store) => store.abc);
  const setABC = useStageStore((store) => store.setABC);

  const getABC = async () => {
    if (abc.length > 0) {
      return abc;
    }

    setIsAbcLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/stages/stagea/abc`,
      });

      const data = (await res.data) || {};

      if (!data || !data[0].stage_a) {
        throw new Error('Invalid response format');
      }

      return data[0].stage_a;
    } catch (error) {
      console.error('Fetch error: ', error);
    } finally {
      setIsAbcLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    const loadABC = async () => {
      if (!abc.length) {
        setIsAbcLoading(true);
        const { alphabet } = await getABC();
        setABC(alphabet);
        setIsAbcLoading(false);
      }
    };
    loadABC();
  });

  return { abc, setABC, getABC, isAbcLoading };
};
