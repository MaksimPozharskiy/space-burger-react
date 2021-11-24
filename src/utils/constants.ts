export const mainApiUrl: string = 'https://norma.nomoreparties.space/api';
export const keyCodeEsc: number = 27;
export const emailRegxep: RegExp =
  /^(([^<>()[\]\\.,;:\s@ "]+(\.[^<>()[\]\\.,;:\s@ "]+)*)|( ".+ "))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const optionsDate = {
  weekday: "long" as const,
  hour: "2-digit" as const,
  minute: "2-digit" as const,
  timeZoneName: "short" as const,
};