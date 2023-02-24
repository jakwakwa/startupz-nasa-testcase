export function validateName(value: string): string {
  let error = "";
  if (!value) {
    error = "Name is required";
  } else if (value.length < 3) {
    error = "Name must be at least 3 characters";
  }
  return error;
}

export function arrayRange(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  ).reverse();
}
