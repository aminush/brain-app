type Option<T extends string> = {
  id: T;
  label: string;
};

type Props<T extends string> = {
  limit: number;
  onChange: (items: T[]) => void;
  options: Option<T>[];
  selected: T[];
};

export function MultiSelect<T extends string>({ limit, onChange, options, selected }: Props<T>) {
  return (
    <div className="choice-grid">
      {options.map((option) => {
        const isActive = selected.includes(option.id);
        return (
          <button
            className={isActive ? 'choice-pill active' : 'choice-pill'}
            key={option.id}
            onClick={() => toggle(option.id, selected, onChange, limit)}
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function toggle<T extends string>(
  id: T,
  selected: T[],
  onChange: (items: T[]) => void,
  limit: number,
) {
  if (selected.includes(id)) {
    onChange(selected.filter((item) => item !== id));
    return;
  }
  if (selected.length < limit) onChange([...selected, id]);
}
