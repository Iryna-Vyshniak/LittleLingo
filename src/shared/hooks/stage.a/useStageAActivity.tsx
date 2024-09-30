import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { useIonViewWillEnter } from '@ionic/react';

import { API } from '../../constants';
import { useStageStore } from '../../store/useStageStore';

export const useStageAactivity = () => {
  const isActivityLoading = useStageStore((store) => store.isActivityLoading);
  const setIsActivityLoading = useStageStore(
    (store) => store.setIsActivityLoading
  );
  const activity = useStageStore((store) => store.activity);
  const setActivity = useStageStore((store) => store.setActivity);

  const getActivity = async () => {
    if (activity.length > 0) {
      return activity;
    }

    setIsActivityLoading(true);

    try {
      const res: HttpResponse = await CapacitorHttp.get({
        url: `${API}/stages/stagea/activity`,
      });

      const data = (await res.data) || {};

      if (!data || !data[0].stage_a) {
        throw new Error('Invalid response format');
      }
      return data[0].stage_a;
    } catch (error) {
      console.error('Fetch error: ', error);
    } finally {
      setIsActivityLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    const loadActivity = async () => {
      if (!activity.length) {
        setIsActivityLoading(true);
        const { activity } = await getActivity();
        setActivity(activity);
        setIsActivityLoading(false);
      }
    };
    loadActivity();
  });

  return { activity, setActivity, getActivity, isActivityLoading };
};
