"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { ChangeEvent, use, useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Header } from "@/components/Header";
import { CustomSelect } from "@/components/CustomSelect";
import { Label } from "@/components/Label";
import { ChevronDown } from "lucide-react";

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

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
    setShowResult(false);
    setInputContainerClassName(
      "w-[480px] h-96 border boder rounded-3xl flex flex-col items-center justify-center"
    );
    setButtonDisabled(value === "" || inputValue === "");
  };


  const handleButtonClick = async () => {
    if (inputValue && selectedCurrency) {
      await fetchData(Number(inputValue), selectedCurrency);
    }
  };


  const [currentValue, setCurrentValue] = useState(0);
  const [total, setTotal] = useState(0);
  const fetchData = async (valor: number, moeda: string): Promise<void> => {
    const url = "http://localhost:3000/cotacao";
    const response: any = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        valor,
        moeda,
      }),
    });

    try {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setTotal(data.total);
      setCurrentValue(data.value);
      setShowResult(true);
      setInputContainerClassName(
        "w-[480px] h-96 border boder-t rounded-t-3xl flex flex-col items-center justify-center"
      );
    } catch (error: any) {
      console.log(error.message);
    }
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
            <Label focus={selectFocus} title="MOEDA" for="coinValue" />
            <CustomSelect
              id="coinValue"
              onFocus={() => setSelectFocus(true)}
              onBlur={() => setSelectFocus(false)}
              options={[
                { value: "USD", label: "Dólar americano" },
                { value: "EUR", label: "Euro" },
                { value: "JPY", label: "Iene" },
                { value: "ARS", label: "Peso Argentino" },
                { value: "CNY", label: "Yuan Chinês" },
              ]}
              selected={selectedCurrency}
              onChange={(value) => handleCurrencyChange(value)}
            />
            {/* <div className="flex flex-col w-[352px] h-[76px] gap-2">
              <Label focus={selectFocus} title="MOEDA" for="coin" />
              <select
                onFocus={() => setSelectFocus(true)}
                onBlur={() => setSelectFocus(false)}
                className="body custom-select"
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
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700" />
            </div> */}
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
              {total.toFixed(2)} Reais
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
