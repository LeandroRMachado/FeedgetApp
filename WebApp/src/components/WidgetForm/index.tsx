import { useState } from "react";

import bugImg from '../../assets/bug.svg';
import ideaImg from '../../assets/idea.svg';
import thoughtImg from '../../assets/thought.svg';
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes= {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImg,
      alt: 'Imagem de uma minhoca'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImg,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImg,
      alt: 'Imagem de um balão de pensamento'
    }
  }
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      { feedbackSent ? (
        <FeedbackSuccessStep
        onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito pelo <a className="underline underline-offset-2" target={"_blank"} href="https://github.com/LeandroRMachado?tab=repositories">LeandroRMachado 📱🍉</a>
      </footer>
    </div>
  );
}