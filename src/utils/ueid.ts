export const generateUEID = () => {
  const now = new Date().getTime();
  const UEID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    (char: string) => {
      const replacement = (now + Math.random() * 16) % 16 | 0;
      return (char === 'x' ? replacement : (replacement & 0x3) | 0x8).toString(
        16
      );
    }
  );

  return UEID;
};
