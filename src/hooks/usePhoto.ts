import { useEffect, useRef, useState } from 'react';
export function usePhoto() {
  const [photoUrl, setPhotoUrl] = useState('');
  const url = useRef('');
  useEffect(
    () => () => {
      if (url.current) URL.revokeObjectURL(url.current);
    },
    [],
  );
  function select(file?: File) {
    if (!file || !file.type.startsWith('image/')) return;
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = URL.createObjectURL(file);
    setPhotoUrl(url.current);
  }
  return { photoUrl, select };
}
