import React, { useEffect } from 'react';

import StarRules from '../../assets/sounds/star-rules.mp3';
import { useAudioPlayer } from '../../shared/hooks/audio/useAudioPlayer';
import CircleAnimation from './CircleAnimation';

interface Example {
  text: string;
}

interface Substep {
  prefix?: string;
  strongText?: string;
  suffix?: string;
  spanText?: string;
  examples?: Array<string | Example>;
}

interface ActionItem {
  title: string;
  description: string;
  codeText?: string;
  suffix?: string;
}

interface Step {
  text: string;
  substeps: Substep[];
}

interface GameRules {
  gameType: string;
  title: string;
  steps?: Step[];
  actions?: ActionItem[];
}

interface RulesProps {
  rulesData: GameRules;
}

const Rules: React.FC<RulesProps> = ({ rulesData }) => {
  const { playAudio } = useAudioPlayer();

  useEffect(() => {
    playAudio(StarRules);
  }, []);

  return (
    <article className='rules-inner-wrapper p-4'>
      <section className='rules-title'>
        <p className='special-font custom tracking-wide text-orange-600'>
          {rulesData.title}
        </p>
      </section>
      <section className='rules'>
        {rulesData.steps && (
          <ul
            className='rules-description mb-4 p-2'
            contentEditable={false}
            spellCheck={false}
          >
            {rulesData.steps.map((step, index) => (
              <li key={index}>
                {step.text}
                <ul>
                  {step.substeps.map((substep, subindex) => (
                    <li key={subindex}>
                      {substep.prefix && <span>{substep.prefix}</span>}
                      {substep.strongText && (
                        <strong className='special-font custom mb-4 ml-2 mr-2 tracking-wide text-red-700'>
                          {substep.strongText}
                        </strong>
                      )}
                      {substep.examples && (
                        <>
                          <span>{substep.suffix}</span>
                          {substep.examples.map((example, exampleIndex) =>
                            typeof example === 'string' ? (
                              <span key={exampleIndex}>{example}</span>
                            ) : (
                              <span
                                key={exampleIndex}
                                className='ml-2 mr-2 font-bold text-red-700'
                              >
                                {example.text}
                              </span>
                            )
                          )}
                        </>
                      )}
                      {substep.suffix && !substep.examples && (
                        <span>{substep.suffix}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        {rulesData.actions && (
          <ul
            className='rules-actions mb-4 p-2'
            contentEditable={false}
            spellCheck={false}
          >
            {rulesData.actions.map((action, index) => (
              <li key={index} className='mb-4'>
                <h3 className='font-bold tracking-wide text-orange-600'>
                  {action.title}
                </h3>
                <p className='text-white'>
                  {action.description}
                  {action.codeText && (
                    <code className='special-font custom mb-4 ml-2 mr-2 tracking-wide text-red-700'>
                      {action.codeText}
                    </code>
                  )}
                  {action.suffix}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <CircleAnimation />
    </article>
  );
};

export default Rules;
