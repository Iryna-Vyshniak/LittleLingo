import { useState } from 'react';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { useIonViewWillEnter } from '@ionic/react';

import { API } from '../../constants';
import { Number } from '../../types';

export const useStageANumbers = () => {
  const [isNumbersLoading, setIsNumbersLoading] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<Number[]>([]);

  const getNumbers = async () => {
    setIsNumbersLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/stages/stagea/numbers`,
      });

      const data = (await res.data) || {};

      if (!data || !data[0].stage_a) {
        throw new Error('Invalid response format');
      }

      return data[0].stage_a;
    } catch (error) {
      console.error('Fetch error: ', error);
    } finally {
      setIsNumbersLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    const loadNumbers = async () => {
      const { numbers } = await getNumbers();
      setNumbers(numbers);
      setIsNumbersLoading(false);
    };
    loadNumbers();
  });

  return { numbers, setNumbers, getNumbers, isNumbersLoading };
};
