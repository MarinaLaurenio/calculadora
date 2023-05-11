import React, { Component } from "react";
import "./Calculator.css";
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false, //se precia ou não limpar o display, inicialmente começa como falso porque não precisa
  operation: null,
  values: [0, 0],
  current: 0,
};

/*
variavel é criada pq a funcao clearMemory vai restaurar o estado inicial.

*/

export default class Calculator extends Component {
  //começa o estado aqui
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  //o display da calculadora vai apontar para um estado, e não para o value fixo.
  setOperation(operation) {
    // qual colocar uma operação, o valor do current muda para o armazenar no segundo elemento do array(elem de indice 1) ou seja, limpando o display para o proximo numero ser digitado
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      //da proxima vez que clicar em outro operador, ele vai processar os dois valores, gerar um resultado e armazenar no primeiro elemento do array(elem de indice 0)
      const equals = operation === "="; //clicando no "="
      const currentOperation = this.state.operation; //caso faça duas operaçoes seguidas (não apertando no botao de igual para gerar o resultado), vai pegar a operaçao que ja tinha sito setada
      const values = [...this.state.values]; //o valor atual vai ser a operação anterior
      
      //calculo do valor, cada caso vai mudar o valor do primeiro elemento do array values
      switch (currentOperation) {
        case "+":
          values[0] = values[0] + values[1];
          break;
        case "-":
          values[0] = values[0] - values[1];
          break;
        case "*":
          values[0] = values[0] * values[1];
          break;
        case "/":
          values[0] = values[0] / values[1];
          break;
      }
      values[1] = 0; 

      this.setState({                                     
        displayValue: values[0],                          // o resultado da operacao vai ser armazenado no display para ser exibido  
        operation: equals ? null : operation,             // se for um igual, a operação é finalizada, se for outra, vai ser setado como operação atual
        current: equals ? 0 : 1,                          // se colocou o igual, vai constinuar mexendo no valor 0, se colocou qualquer outra operação, vai pro valor 1, tambem não precisa limpar o display 
        clearDisplay: !equals,                            // limpar o display só se for diferente de igual, que ai vc vai continuar mexendo no valor que retornou da operação 
        values,                                           // valores 
      });
      console.log(values);
    }
  }

  addDigit(n) {
    //se recebe um digito que é um ponto (mas já tem um ponto no display = nao faça nada, sai da função) adicione.
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    const clearDisplay =
      this.state.displayValue === "0" || //quando tem um numero no display que seja 0, ele vai limpar a tela
      this.state.clearDisplay; //quando o clearDisplay for true, evita o 0 a esqueda (ver isso melhor)

    const currentValue = clearDisplay ? "" : this.state.displayValue; //se precisar limpar o display, o valor corrente vai ser vazio, e se não precisar, vai ser o valor no display
    const displayValue = currentValue + n; //o valor do display vai ser o valor atual + numero digitado (não chega nesse ponto caso o usuário quiser colocar dois pontos)
    this.setState({ displayValue, clearDisplay: false }); //mudar de fato o estado da aplicaçao, passa o displayValue e uma vez que digita o valor, automaticamente a flag do clearDisplay é falsa

    //para salvar o numero no primeiro elemento do array values
    if (n != ".") {
      //se for digitado um elemento diferente de . faça:
      const i = this.state.current; //cria uma variavel para armazenar o primeiro valor
      const newValue = parseFloat(displayValue); //cria uma variavel que vai pegar o numero do display e tornar um parseFloat
      const values = [...this.state.values]; //cria uma variavel que é um segundo array, com os valores do array value
      values[i] = newValue; //o value na posicao i é o do primeiro valor digitado
      this.setState({ values }); //vai de fato mudar o estado, armazernando o primeiro valor no array values
      console.log(values);
    }
  }

  render() {
    return (
      <div className="calculador">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}

/**
 render() é para renderizar a calculadora 
 */
