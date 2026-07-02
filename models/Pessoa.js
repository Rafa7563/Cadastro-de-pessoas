class Pessoa {
  constructor(nome, dataNascimento) {
    this.nome = nome;
    this.dataNascimento = new Date(dataNascimento);
  }

  get idade() {
    const hoje = new Date();
    let idade = hoje.getFullYear() - this.dataNascimento.getFullYear();
    const diferencaMes = hoje.getMonth() - this.dataNascimento.getMonth();

    if (diferencaMes < 0 || (diferencaMes === 0 && hoje.getDate() < this.dataNascimento.getDate())) {
      idade -= 1;
    }

    return idade;
  }

  toJSON() {
    return {
      nome: this.nome,
      dataNascimento: this.dataNascimento.toISOString().split('T')[0],
      idade: this.idade,
    };
  }
}

module.exports = Pessoa;
