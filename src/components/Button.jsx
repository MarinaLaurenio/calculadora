import React from "react";
import "./Button.css";

export default (props) => (
  <button
    onClick={e => props.click && props.click(props.label)}
    className={`
        button 
        ${props.operation ? "operation" : ""}
        ${props.double ? "double" : ""}
        ${props.triple ? "triple" : ""}
    `}
  >
    {props.label}
  </button>
);

/*
nesse caso, como é uma função curta e simples que retorna um unico elemento JSX, ele é implicitamente retornado, portanto, não é
necessario colocar dentro de um bloco return. Como não tem o return, tb não coloca dentro de chaves.
Em funções mais complexas, é recomendado usar explicitamente o return. 

definir uma expressao que vai ser delimitada por uma template string, para que possa compor as classes do botao com a necessidade. 
    ${props.operation ? "operation" : ""} se essa classe tiver definida, vai add a classe operartion, se não, fica vazio.
    é uma exibicao condicional de classes, a classe vai ser aplicada ou não no botao de acordo com as propriedades recebidas. 

onClick vai disparar uma arrow function que recebe um evento, ele vai chamar o props.click, que espera receber nas propriedades uma funçao, que é
diretamente o conteudo do label por props. 

*/
