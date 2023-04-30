import HealthCalculator from './HealthCalculators'

export default class PAMCalculator implements HealthCalculator {
  protected pas: number
  protected pad: number

  public date: Date
  public result: number
  public description: string

  constructor() {
    this.pas = 0
    this.pad = 0
    this.date = new Date()
    this.result = 0
    this.description =
      'A Pressão Arterial Média (PAM) é definida como a pressão arterial média durante um único ciclo cardíaco, deve ser calculada quando o cenário clínico exige um ajuste da pressão arterial com base na PAM, bem como para o manejo de pacientes com condições agudas onde há uma preocupação com a perfusão de órgãos adequada, ou seja, para garantir a situação do paciente em algum tipo de cirurgia de catarata ou transplante de córnea. Ele é calculado utilizando a Pressão Arterial Sistólica (PAS) e Pressão Arterial Diastólica (PAD)'
  }

  public setPas(pas: number): void {
    this.pas = pas
  }
  public setPad(pad: number): void {
    this.pad = pad
  }

  public calculate() {
    this.result = (1 / 3) * this.pas + (2 / 3) * this.pad
  }

  printResultDescription(): string {
    if (this.result < 70) {
      return 'O valor resultante do PAM menor que 70 mmHg, é considerado um PAM abaixo do normal, nessas situações há uma hipoperfusão tecidual, o que pode provocar sérios prejuízos nos órgãos alvo como cérebro, por déficit de oxigênio e nutrientes.'
    } else if (this.result >= 70 && this.result <= 100) {
      return 'O valor resultante do PAM está entre 70 e 100 mmHg que é considerado um valor normal.'
    } else if (this.result > 100) {
      return 'O valor resultante do PAM está maior que 100 mmHg, pode provocar lesão em orgãos alvo, como nos rins, por exemplo, causando insuficiência renal.'
    } else {
      return ''
    }
  }
}
