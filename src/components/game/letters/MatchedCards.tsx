import React, { useState } from 'react';

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonModal,
  IonRow,
  IonThumbnail,
  IonToolbar,
} from '@ionic/react';

import { useAudioPlayer } from '../../../shared/hooks/audio/useAudioPlayer';
import { Letter } from '../../../shared/types';

const MatchedCards: React.FC<{ matchedCards: Letter[] }> = ({
  matchedCards,
}) => {
  const { playAudio } = useAudioPlayer();
  const [isOpen, setIsOpen] = useState(false);
  const [modalCard, setModalCard] = useState<Letter | null>(null);
  return (
    <section className='flex h-full w-full flex-[3] items-start justify-center'>
      {' '}
      <IonGrid fixed>
        <IonRow className='ion-justify-content-start ion-align-items-center h-full w-full'>
          {matchedCards
            .filter((card) => card && card.label)
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((card) => (
              <IonCol
                size='1.3'
                sizeMd='1'
                sizeLg='0.8'
                key={card._id}
                className='grid-item letter-matched-card flex items-center justify-center'
              >
                <div className='h-full w-full'>
                  <IonCard
                    key={card._id}
                    className='card-transparent ion-no-padding m-0 flex h-full w-full cursor-pointer flex-col items-center justify-center'
                    onClick={() => {
                      setModalCard(card);
                      setIsOpen(true);
                      playAudio(card.soundDescr);
                    }}
                  >
                    <IonThumbnail className='mb-1 h-1/2 w-full'>
                      {' '}
                      <IonImg
                        src={card.imageUrl}
                        alt={`${card.label} letter`}
                        className='object-contain'
                      />
                    </IonThumbnail>
                    <IonCardHeader className='ion-no-padding'>
                      <IonCardTitle className='base-style gentium-font text-shadow-base ion-no-padding py-0 text-[1.5vmin] text-[var(--ion-color-secondary)]'>
                        {card.label.toUpperCase()} {card.label.toLowerCase()}
                      </IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </div>
              </IonCol>
            ))}
        </IonRow>
      </IonGrid>
      {modalCard && (
        <IonModal isOpen={isOpen} className='modal-rules modal-letter'>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot='end'>
                <IonButton
                  onClick={() => setIsOpen(false)}
                  className='special-font custom text-center tracking-wide'
                >
                  {' '}
                  <span className='text-white'>Close</span>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding'>
            <IonCard
              className='card-transparent ion-no-padding m-0 flex h-full w-full cursor-pointer flex-col items-center justify-center'
              onClick={() => playAudio(modalCard.soundDescr)}
            >
              <IonThumbnail className='mb-1 h-1/2 w-full'>
                {' '}
                <IonImg
                  src={modalCard.imageUrl}
                  alt={`${modalCard.label} letter`}
                  className='object-contain'
                />
              </IonThumbnail>
              <IonCardHeader className='ion-no-padding'>
                <IonCardTitle className='base-style gentium-font text-shadow-base ion-no-padding py-0 text-[16vmin] text-[var(--ion-color-secondary)]'>
                  {modalCard.label.toUpperCase()}{' '}
                  {modalCard.label.toLowerCase()}
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonContent>
        </IonModal>
      )}
    </section>
  );
};

export default MatchedCards;
