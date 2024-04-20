export function getRandomEnum<T>(enumType: T): T[keyof T] {
  const enumValues = Object.values(enumType!).filter(
    (value) => typeof value === "number"
  ) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}
