import { HttpResponse, CapacitorHttp } from '@capacitor/core';
import { useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';
import { Letter } from '../../types';
import { API } from '../../constants';

export const useStageAABC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [abc, setABC] = useState<Letter[]>([]);

  const getABC = async () => {
    setIsLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({ url: `${API}/stages/stagea/abc` });

      const data = (await res.data) || {};

      if (!data || !data[0].stage_a) {
        throw new Error('Invalid response format');
      }

      return data[0].stage_a;
    } catch (error) {
      console.error('Fetch error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    const loadABC = async () => {
      const { alphabet } = await getABC();
      setABC(alphabet);
      setIsLoading(false);
    };
    loadABC();
  });

  return { abc, setABC, getABC, isLoading };
};
