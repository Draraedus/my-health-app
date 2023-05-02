import HealthCalculator from './HealthCalculators'

// Author: Victor Hugo Santos Sá

export default class AlcoholCalculator implements HealthCalculator {
  protected volume: number
  protected percentual: number
  protected weight: number

  public date: Date
  public result: number
  public description: string

  constructor() {
    this.volume = 0
    this.weight = 0
    this.percentual = 0
    this.date = new Date()
    this.result = 0
    this.description =
      'O Teor Álcoolico Sanguíneo (TAS) é uma medida que avalia a concentração de álcool circulado no sangue, bem como a determinação e avaliação dos seus efeitos. O cálculo obtido é pelo volume de álcool ingerido (em ml) vezes o percentual de teor álcoolico da bebida ingerida (em %) vezes a taxa fixa de 0.8, e dividido pelo seu peso (em kg) vezes 0.6. Esse resultado trará a concentração de álcool estimada circulando em seu sangue, trazendo informações medicinais sobre o atual estado em que um indivíduo analisado se encontra, seus possíveis sintomas, os níveis do seu consumo, e o seu tipo de intoxicação (sendo leve, moderado, grave e até fatal). Por ser uma calculadora simplificada, ela não dita necessariamente alguns dos fatores importantes que podem ser levados em conta no resultado final, como o número de horas passadas após o consumo, o sexo, entre outros.'
  }

  public setVolume(volume: number): void {
    this.volume = volume
  }
  public setPercentual(percentual: number): void {
    this.percentual = percentual
  }
  public setWeight(weight: number): void {
    this.weight = weight
  }

  public calculate() {
    this.result = (this.volume * this.percentual * 0.8) / (this.weight * 0.6)
  }

  printResultDescription(): string {
    if (this.result === 0.0) {
      return 'O valor resultante está igual ou menor que 0mg/dl, ou seja, é estimado que não houve nenhum consumo alcoolico e assim não há intoxicação.'
    } else if (this.result > 0 && this.result <= 100) {
      return 'O valor resultante está abaixo dos 100 mg/dl, o que indica uma Intoxicação/Consumo leve. Alguns dos sintomas possíveis são o déficit de atenção e memória, vermelhidão na pele e batimentos cardíacos acelerados.'
    } else if (this.result > 100 && this.result <= 250) {
      return 'O valor resultante está entre 100 e 250mg/dl, o que indica uma Intoxicação/Consumo moderado. Alguns dos sintomas possíveis são a instabilidade física e do humor, tontura, náuseas e vômitos, amnésia.'
    } else if (this.result > 250 && this.result <= 400) {
      return 'O valor resultante está entre 250 e 400mg/dl, o que indica uma Intoxicação/Consumo grave. Alguns dos sintomas possíveis são a hipotermia, tontura severa, dificuldade na fala, além de delírios e alucinações.'
    } else if (this.result > 400) {
      return 'O valor resultante está acima de 400mg/dl, o que indica uma Intoxicação/Consumo potencialmente fatal. Nesse estado, o paciente pode apresentar um coma potencial, convulsão, perda de consciência e habilidades motoras, insuficiência respiratória, e até mesmo lesões fatais.'
    } else {
      return ''
    }
  }
}
