import { useState } from 'react';

import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { useIonViewWillEnter } from '@ionic/react';

import { API } from '../../constants';
import { Color } from '../../types';

export const useStageAColors = () => {
  const [isColorsLoading, setIsColorsLoading] = useState<boolean>(false);
  const [colors, setColors] = useState<Color[]>([]);

  const getColors = async () => {
    setIsColorsLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/stages/stagea/colors`,
      });

      const data = (await res.data) || {};

      if (!data || !data[0].stage_a) {
        throw new Error('Invalid response format');
      }

      return data[0].stage_a;
    } catch (error) {
      console.error('Fetch error: ', error);
    } finally {
      setIsColorsLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    const loadColors = async () => {
      const { colors } = await getColors();
      setColors(colors);
      setIsColorsLoading(false);
    };
    loadColors();
  });

  return { colors, setColors, getColors, isColorsLoading };
};
