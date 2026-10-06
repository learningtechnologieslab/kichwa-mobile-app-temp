import { act, renderHook } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import { usePhoto } from './usePhoto';
beforeEach(() => {
  Object.defineProperty(URL, 'createObjectURL', {
    configurable: true,
    value: vi.fn().mockReturnValue('blob:preview'),
  });
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() });
});
it('keeps photo on cancel, replaces and releases it', () => {
  const { result, unmount } = renderHook(usePhoto);
  act(() => result.current.select(new File(['one'], 'one.png', { type: 'image/png' })));
  act(() => result.current.select());
  expect(result.current.photoUrl).toBe('blob:preview');
  expect(URL.revokeObjectURL).not.toHaveBeenCalled();
  act(() => result.current.select(new File(['two'], 'two.png', { type: 'image/png' })));
  expect(URL.revokeObjectURL).toHaveBeenCalledOnce();
  unmount();
  expect(URL.revokeObjectURL).toHaveBeenCalledTimes(2);
});
