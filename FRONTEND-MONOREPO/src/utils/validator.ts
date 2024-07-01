export const isEmptyString = (string: string): boolean =>
  !Boolean(string) && string.replace(" ", "") === "";

