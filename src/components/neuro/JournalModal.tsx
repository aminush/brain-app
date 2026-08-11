type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function JournalModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <section className="result-modal">
        <p className="eyebrow">Дневник состояний</p>
        <h2>Заземление на 30 секунд</h2>
        <p>Назови 5 предметов вокруг, 4 звука, 3 ощущения в теле и один следующий шаг.</p>
        <button className="primary-action" onClick={onClose} type="button">
          Записал состояние
        </button>
      </section>
    </div>
  );
}
