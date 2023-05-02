// Author: Adriel Luiz Santana dos Santos

export default interface HealthCalculator {
  date: Date
  result: number
  description: string

  calculate(): void
  printResultDescription(): string
}
