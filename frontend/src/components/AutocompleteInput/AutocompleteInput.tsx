// AutocompleteInput: textarea + dropdown de sugerencias filtradas mientras escribe.
// Solución propia sin datalist (datalist no es atributo válido de textarea en TS).
// Las sugerencias complementan el texto libre; el usuario puede escribir cualquier cosa.

import React, { useState, useRef, useCallback } from 'react';
import styles from './AutocompleteInput.module.css';

interface AutocompleteInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  id,
  label,
  value,
  onChange,
  suggestions,
  placeholder,
  error,
  required = false,
  rows = 3,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filtered, setFiltered] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const errorId = `${id}-error`;
  const listId = `${id}-list`;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      onChange(newValue);

      // Filtrar sugerencias por el texto en la última línea del textarea
      const lastLine = newValue.split('\n').pop()?.toLowerCase() ?? '';
      if (lastLine.length >= 1) {
        const matches = suggestions.filter((s) =>
          s.toLowerCase().includes(lastLine),
        );
        setFiltered(matches.slice(0, 6));
        setShowDropdown(matches.length > 0);
      } else {
        setShowDropdown(false);
      }
    },
    [onChange, suggestions],
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      // Reemplaza la última línea del textarea con la sugerencia seleccionada
      const lines = value.split('\n');
      lines[lines.length - 1] = suggestion;
      onChange(lines.join('\n'));
      setShowDropdown(false);
      textareaRef.current?.focus();
    },
    [value, onChange],
  );

  const handleBlur = useCallback(() => {
    // Pequeño delay para permitir el click en las sugerencias
    setTimeout(() => setShowDropdown(false), 150);
  }, []);

  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>

      <div className={styles.wrapper}>
        <textarea
          ref={textareaRef}
          id={id}
          name={id}
          className={`${styles.textarea} ${error ? styles.invalid : ''}`}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={rows}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          aria-autocomplete="list"
          aria-controls={showDropdown ? listId : undefined}
        />

        {showDropdown && filtered.length > 0 && (
          <ul
            id={listId}
            className={styles.dropdown}
            role="listbox"
            aria-label={`Sugerencias para ${label}`}
          >
            {filtered.map((s) => (
              <li
                key={s}
                className={styles.suggestion}
                role="option"
                aria-selected={false}
                onMouseDown={() => handleSuggestionClick(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <span id={errorId} className={styles.errorMsg} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default AutocompleteInput;
