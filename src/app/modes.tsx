export const MODES = {
  DEV: "dev",
  WRITER: "writer",
  ABOUT: "about",
} as const;

export type Mode = (typeof MODES)[keyof typeof MODES];

export function isValidMode(value: unknown): value is Mode {
  return value === MODES.DEV || value === MODES.WRITER;
}

export type Theme = "dark" | "light";
