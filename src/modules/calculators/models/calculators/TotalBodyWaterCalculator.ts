import HealthCalculator from './HealthCalculators'

export default class TotalBodyWaterCalculator implements HealthCalculator {
  protected height: number
  protected weight: number
  protected age: number
  protected sex: string

  public date: Date
  public result: number
  public description: string

  constructor() {
    this.height = 0
    this.weight = 0
    this.age = 0
    this.sex = ''
    this.date = new Date()
    this.result = 0
    this.description =
      'Corresponde a uma estimativa da massa total de água no corpo, incluindo o total de água intracelular e extracelular. É possível identificar retenção de líquidos ou desidratação.'
  }

  public setHeight(height: number): void {
    this.height = height
  }
  public setWeight(weight: number): void {
    this.weight = weight
  }
  public setAge(age: number): void {
    this.age = age
  }
  public setSex(sex: string): void {
    this.sex = sex
  }

  public calculate(): void {
    if (this.sex === 'Masculino') {
      this.result =
        (2.447 -
          0.09145 * this.age +
          0.1074 * this.height +
          0.3362 * this.weight) *
        0.6
    } else {
      this.result =
        (2.097 -
          0.1069 * this.age +
          0.2466 * this.height +
          0.3315 * this.weight) *
        0.6
    }
  }

  printResultDescription(): string {
    return 'Essa é uma estimativa do valor de água corpórea do seu corpo em litros pela fórmula de Watson'
  }
}
