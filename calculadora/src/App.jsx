import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./App.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const [despesa, setDespesa] = useState("");
  const [valor, setValor] = useState("");
  const [gastos, setGastos] = useState([]);

  const adicionarGasto = () => {
    if (despesa && valor) {
      setGastos([...gastos, { despesa, valor: parseFloat(valor) }]);
      setDespesa("");
      setValor("");
    }
  };

  const total = gastos.reduce((acc, item) => acc + item.valor, 0);

  const data = {
    labels: gastos.map((g) => g.despesa),
    datasets: [
      {
        label: "Despesas",
        data: gastos.map((g) => g.valor),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#ff9f40"
        ]
      }
    ]
  };

  return (
    <div className="app">
      <h1>Calculadora de Orçamento Pessoal</h1>

      <div className="inputs">
        <input
          type="text"
          placeholder="Nome da despesa"
          value={despesa}
          onChange={(e) => setDespesa(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <button onClick={adicionarGasto}>Adicionar</button>
      </div>

      <h2>Total: R$ {total.toFixed(2)}</h2>

      <div className="grafico">
        {gastos.length > 0 ? <Pie data={data} /> : <p>Adicione despesas</p>}
      </div>

      <ul>
        {gastos.map((g, i) => (
          <li key={i}>
            {g.despesa}: R$ {g.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

