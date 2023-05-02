import HealthCalculator from './HealthCalculators'

// Author: Gabriel Marques Costa

export default class BodySurfaceCalculator implements HealthCalculator {
  protected height: number
  protected weight: number

  public date: Date
  public result: number
  public description: string

  constructor() {
    this.height = 0
    this.weight = 0
    this.date = new Date()
    this.result = 0
    this.description =
      'O cálculo de superfície corporal (SC) pode ser útil no manejo de pacientes internados na UTI pediátrica (UTIP), incluindo regulação do balanço hídrico, adequação da diurese e dosagem de medicamentos.'
  }

  public setHeight(height: number): void {
    this.height = height
  }
  public setWeight(weight: number): void {
    this.weight = weight
  }

  public calculate() {
    this.result =
      0.007184 * Math.pow(this.height, 0.725) * Math.pow(this.weight, 0.425)
  }

  printResultDescription(): string {
    return 'É sua superfície corporal em metros quadrados.'
  }
}
