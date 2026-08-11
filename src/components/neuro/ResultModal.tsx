import type { AnalysisResult } from './types';

type Props = {
  isLoading: boolean;
  result: AnalysisResult | null;
  onClose: () => void;
};

export function ResultModal({ isLoading, result, onClose }: Props) {
  if (!isLoading && !result) return null;

  return (
    <div className="modal-backdrop">
      <section className="result-modal">
        {isLoading ? (
          <>
            <div className="loader-ring" />
            <h2>ИИ анализирует экранное время...</h2>
          </>
        ) : (
          <>
            <p className="eyebrow">AI Vision report</p>
            <h2>Здоровье ПФК: {result?.health}%</h2>
            <p>{result?.note}</p>
            <button className="primary-action" onClick={onClose} type="button">
              Принять результат
            </button>
          </>
        )}
      </section>
    </div>
  );
}
