"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { ChangeEvent, use, useState } from "react";
import { faker } from "@faker-js/faker";
import { Header } from "@/components/Header";
import { Label } from "@/components/Label";

export default function Home() {
  //Estado para controlar a cor do label do input e do select, caso eles estejam selecionados
  const [inputFocus, setInputFocus] = useState(false);
  const [selectFocus, setSelectFocus] = useState(false);

  //Criei um estado para controla a habilitação e desabilitação do botão de acordo com o input ter ou não um valor e com o select ter uma cotação
  const [inputValue, setInputValue] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //Estado para salvar as 10 últimas cotações
  const [recentConversions, setRecentConversions] = useState<number[]>([]);

  //Estado para controlar a exibição da div
  const [showResult, setShowResult] = useState(false);

  //Para remover as bordas arredondadas debaixo quando clica no botão
  const [inputContainerClassName, setInputContainerClassName] = useState(
    "w-[480px] h-96 border boder rounded-3xl flex flex-col items-center justify-center"
  );

  const [error, setError] = useState("");

  // Estado para armazenar as opções do select
  const [options, setOptions] = useState<Options[]>([]);

  interface Options {
    value: string;
    name: string;
  }

   //Por enquanto que não tem a api, ele só vai mostrar a div e um resultado simulado
   const handleButtonClick = () => {
    // Simular uma requisição à API
    const simulatedResponse = simulateApiRequest(inputValue, selectedCurrency);
    console.log(simulatedResponse);

    setShowResult(true);
    setInputContainerClassName(
      "w-[480px] h-96 border boder-t rounded-t-3xl flex flex-col items-center justify-center"
    );
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Verificar se o valor inserido contém apenas números
    if (/^\d*$/.test(inputValue)) {
      setInputValue(inputValue);
      setShowResult(false);
      setInputContainerClassName(
        "w-[480px] h-96 border boder rounded-3xl flex flex-col items-center justify-center"
      );
      setButtonDisabled(inputValue === "" || selectedCurrency === "");
    }
  };

  // Handlers para atualizar os estados
  const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
    setShowResult(false);
    setInputContainerClassName(
      "w-[480px] h-96 border boder rounded-3xl flex flex-col items-center justify-center"
    );
    setButtonDisabled(event.target.value === "" || inputValue === "");
  };

  const [currentValue, setCurrentValue] = useState(0);
  const [total, setTotal] = useState(0);
  // Função para simular uma requisição à API
  const simulateApiRequest = (valor: string, moeda: string) => {
    // Simular a resposta da API
    const response = {
      code: moeda, // Corrigido para passar apenas a string da moeda
      name: faker.finance.currencyName(),
      value: Number(
        faker.finance.amount({ min: 1, max: 8, dec: 2 }).toString()
      ), // Convertido para string antes de chamar parseFloat
      date: faker.date.recent().toISOString(),
      total: 0,
    };

    setCurrentValue(response.value);
    // Calcular o total
    setTotal((response.total = response.value * parseFloat(valor)));
    return response;
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Verificar se a tecla pressionada é uma letra
    if (!/^\d$/.test(event.key)) {
      setError("Insira apenas números");
      setTimeout(() => {
        setError("");
      }, 2000);
      // Se for uma letra, cancelar o evento para impedir que a letra seja inserida
      event.preventDefault();
    }
  };

 

  return (
    <main
      className=" min-h-screen bg-cover bg-center bg-no-repeat flex items-start justify-center"
      style={{ backgroundImage: "url(/background.svg)" }}
    >
      <div className="flex-col items-center justify-center">
        {/* "Header" */}
        <Header title="CONVERT" />
        {/* Input e select */}
        <div
          className={inputContainerClassName}
          style={{
            backgroundColor: "var(--color-blue-300)",
            border: "1px solid var(--color-blue-500)",
          }}
        >
          <div className="gap-5 flex flex-col ">
            <div className="flex flex-col w-[352px] h-[76px] gap-2">
              <Label focus={inputFocus} title="VALOR" for="coinValue" />
              <input
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                className="body"
                type="text"
                id="coinValue"
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <span className="span error ">{error}</span>
            </div>
            <div className="flex flex-col w-[352px] h-[76px] gap-2">
              <Label focus={selectFocus} title="MOEDA" for="coin" />
              <select
                onFocus={() => setSelectFocus(true)}
                onBlur={() => setSelectFocus(false)}
                className="body"
                name="coin"
                id="coin"
                onChange={handleCurrencyChange}
              >
                <option value="USD">Dólar americano</option>
                <option value="EUR">Euro</option>
                <option value="JPY">Iene</option>
                <option value="ARS">Peso Argentino</option>
                <option value="CNY">Yuan Chinês</option>
              </select>
            </div>
            <button
              className="button"
              disabled={buttonDisabled}
              onClick={handleButtonClick}
            >
              Converter em reais
            </button>
          </div>
        </div>
        {/* Resultado */}
        {showResult && (
          <div
            className="flex flex-col items-center justify-center w-[480px] h-[156px] gap-2 mb-56 rounded-b-3xl"
            style={{ backgroundColor: "var(--color-blue-400)" }}
          >
            <span className="span" style={{ color: "var(--color-blue-800)" }}>
              {selectedCurrency} 1 = {currentValue}
            </span>
            <span className="heading" style={{ color: "var(--color-white)" }}>
              {total},00 Reais
            </span>
          </div>
        )}
      </div>
    </main>
  );
}