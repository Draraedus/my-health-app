import HealthCalculator from './HealthCalculators'

export default class TotalBodyWaterCalculator implements HealthCalculator {
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
      'Corresponde a massa total de água no corpo, incluindo o total de água intracelular e extracelular. É possível identificar retenção de líquidos ou desidratação.'
  }

  public setHeight(height: number): void {
    this.height = height
  }
  public setWeight(weight: number): void {
    this.weight = weight
  }

  public calculate() {
    this.result = this.weight / Math.pow(this.height, 2)
  }

  printResultDescription(): string {
    if (this.result < 18.5) {
      return 'O valor resultante foi abaixo de 18,5, o que indica pela tabela de IMC estar abaixo da massa corporal ideal'
    } else if (this.result >= 18.5 && this.result < 25) {
      return 'O valor resultante está entre 18,5 e 24,99, o que indica pela tabela de IMC estar na massa corporal ideal'
    } else if (this.result >= 25 && this.result < 30) {
      return 'O valor resultante está entre 25 e 29,99, o que indica pela tabela de IMC estar acima da massa corporal ideal'
    } else if (this.result >= 30 && this.result < 35) {
      return 'O valor resultante está entre 30 e 34,99, o que indica pela tabela de IMC estar na classe de obesidade classe 1'
    } else if (this.result >= 35 && this.result < 40) {
      return 'O valor resultante está entre 35 e 39,99, o que indica pela tabela de IMC estar na classe de obesidade classe 2'
    } else if (this.result >= 40) {
      return 'O valor resultante está acima de 40, o que indica pela tabela de IMC estar na classe de obesidade classe 3'
    } else {
      return ''
    }
  }
}
