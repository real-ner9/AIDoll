export const generateUniqueId = () => {
  const timestamp = Date.now().toString(36); // Текущее время в base36
  const randomChars = Math.random().toString(36).substr(2, 5); // Случайные символы
  return `${timestamp}${randomChars}`.toUpperCase(); // Конкатенация и преобразование в верхний регистр
};