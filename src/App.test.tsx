import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import App from './App';
import { newProgress, STORAGE_KEY } from './state/progress';
it('switches language without losing quiz feedback or progress', () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...newProgress(), stage: 'quiz', animal: 'toucan' }),
  );
  history.replaceState(null, '', '/#quest');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'B sikwanga' }));
  fireEvent.click(screen.getByRole('button', { name: 'ES' }));
  expect(screen.getByText('Muy bien — es correcto.')).toBeInTheDocument();
  expect(document.documentElement.lang).toBe('es');
  expect(screen.getByRole('button', { name: 'B sikwanga' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: /Siguiente reto/ }));
  expect(screen.getByText('Dilo en voz alta.')).toBeInTheDocument();
});
it('renders profile totals from legacy completion', () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...newProgress(), stage: 'ending', animal: 'turtle', complete: true }),
  );
  history.replaceState(null, '', '/#profile');
  render(<App />);
  expect(screen.getByText('Hi Helen!')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
});
it('labels user-written words, retains them in Spanish, and accepts any selected parts', () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...newProgress(), stage: 'translation', animal: 'toucan' }),
  );
  history.replaceState(null, '', '/#quest');
  render(<App />);
  expect(screen.getByText('“The toucan eats fruit.”')).toBeInTheDocument();
  expect(screen.queryByText('Sikwanga muyuta mikun.')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Label my words/ })).toBeDisabled();
  fireEvent.change(screen.getByLabelText('Your Kichwa translation'), {
    target: { value: '  Ñuka,  muyuta\nÑuka.  ' },
  });
  fireEvent.click(screen.getByRole('button', { name: /Label my words/ }));
  const selects = screen.getAllByRole('combobox');
  expect(selects).toHaveLength(3);
  expect(screen.getByRole('button', { name: /Continue/ })).toBeDisabled();
  fireEvent.change(selects[0], { target: { value: 'verb' } });
  fireEvent.click(screen.getByRole('button', { name: 'ES' }));
  expect(screen.getByText('“El tucán come fruta.”')).toBeInTheDocument();
  expect(screen.getAllByRole('combobox')[0]).toHaveValue('verb');
  fireEvent.change(screen.getAllByRole('combobox')[1], { target: { value: 'unsure' } });
  fireEvent.change(screen.getAllByRole('combobox')[2], { target: { value: 'other' } });
  fireEvent.click(screen.getByRole('button', { name: /Continuar/ }));
  expect(screen.getByText('Encuéntralo cerca.')).toBeInTheDocument();
});
it('rebuilds word labels after the user edits their translation', () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...newProgress(),
      stage: 'translation',
      animal: 'snail',
      translationDraft: { text: 'one two', parts: ['noun', 'verb'], labeling: true },
    }),
  );
  history.replaceState(null, '', '/#quest');
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Edit my translation' }));
  fireEvent.change(screen.getByLabelText('Your Kichwa translation'), {
    target: { value: 'three' },
  });
  fireEvent.click(screen.getByRole('button', { name: /Label my words/ }));
  expect(screen.getAllByRole('combobox')).toHaveLength(1);
  expect(screen.getByRole('combobox')).toHaveValue('');
  expect(screen.getByRole('button', { name: /Continue/ })).toBeDisabled();
});
it('normalizes an unknown route', () => {
  history.replaceState(null, '', '/#unknown');
  render(<App />);
  expect(location.hash).toBe('#learn');
  expect(screen.getByRole('button', { name: /Start learning/ })).toBeInTheDocument();
});
