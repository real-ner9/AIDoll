export enum ComplaintType {
  // Неприемлемый контент
  UNACCEPTABLE_CONTENT = 'UNACCEPTABLE_CONTENT',
  // Оскорбительное поведение
  OFFENSIVE_BEHAVIOR = 'OFFENSIVE_BEHAVIOR',
  // Возрастное нарушение
  AGE_VIOLATION = 'AGE_VIOLATION',
}

export const ComplaintTypeMap: Record<ComplaintType, string> = {
  [ComplaintType.UNACCEPTABLE_CONTENT]: 'Неприемлемый контент',
  [ComplaintType.OFFENSIVE_BEHAVIOR]: 'Оскорбительное поведение',
  [ComplaintType.AGE_VIOLATION]: 'Возрастное нарушение',
}
