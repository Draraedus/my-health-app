import HealthCalculator from './HealthCalculators'

export default class IMCCalculator implements HealthCalculator {
  height: number
  weight: number

  date: Date
  result: number
  description: string

  constructor() {
    this.height = 0
    this.weight = 0
    this.date = new Date()
    this.result = 0
    this.description =
      'O cálculo do IMC(Índice de Massa Corporal) é uma medida que avalia a relação entre o peso e a altura de uma pessoa.É calculado dividindo - se o peso da pessoa(em quilogramas) pela sua altura ao quadrado(em metros).O resultado obtido é comparado com uma tabela de referência, que define diferentes faixas de IMC e o seu respectivo significado em termos de estado nutricional, tais como baixo peso, peso normal, sobrepeso e obesidade.O IMC é uma ferramenta útil para avaliar o risco de diversas doenças relacionadas ao peso, como diabetes, hipertensão e doenças cardíacas.No entanto, deve ser usado com cuidado, pois não leva em consideração outros fatores importantes, como a composição corporal(massa muscular versus massa gorda) e a distribuição de gordura no corpo.'
  }

  public setHeight(height: number): void {
    this.height = height
  }
  public setWeight(weight: number): void {
    this.weight = weight
  }
  public setDate(date: Date): void {
    this.date = date
  }

  calculate() {
    this.result = this.weight / Math.pow(this.height, 2)
  }
  saveResult(): void {}
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
