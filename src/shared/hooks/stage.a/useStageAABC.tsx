import { useState } from 'react';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { useIonViewWillEnter } from '@ionic/react';

import { API } from '../../constants';
import { Letter } from '../../types';

export const useStageAABC = () => {
  const [isAbcLoading, setIsAbcLoading] = useState<boolean>(false);
  const [abc, setABC] = useState<Letter[]>([]);

  const getABC = async () => {
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
      const { alphabet } = await getABC();
      setABC(alphabet);
      setIsAbcLoading(false);
    };
    loadABC();
  });

  return { abc, setABC, getABC, isAbcLoading };
};
