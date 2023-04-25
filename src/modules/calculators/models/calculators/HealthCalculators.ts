export default interface HealthCalculator {
  date: Date
  result: number
  description: string

  calculate(): void
  saveResult(date: Date, result: number): void
  printResultDescription(): string
}
