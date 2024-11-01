import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import OttoSimulation from "./simulacion/OttoSimulation";
import DieselSimulation from "./simulacion/DieselSimulation";
import RankineSimulation from "./simulacion/RankineSimulation";
import BraytonSimulation from "./simulacion/BraytonSimulation";
import "./App.css";
import CaseStudy from './components/CaseStudy';

import carnotImage from './images/carnot.jpg';
import ottoImage from './images/Otto.png';
import dieselImage from './images/diesel.webp';
import rankineImage from './images/rankine.jpg';
import braytonImage from './images/brayton.webp';


// Importa Chart desde 'chart.js'
import Chart from 'chart.js/auto';

// Importa y registra las escalas necesarias
import { CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, plugins } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [selectedCycle, setSelectedCycle] = useState("Otto");
  const [comparisonCycle, setComparisonCycle] = useState("Carnot");
  const [tempHot, setTempHot] = useState(600);
  const [tempCold, setTempCold] = useState(300);
  const [compressionRatio, setCompressionRatio] = useState(8);
  const [gamma, setGamma] = useState(1.4);
  const [workDone, setWorkDone] = useState(0);
  const [pressure, setPressure] = useState(101.325); // Presión en kPa
  const [showInfo, setShowInfo] = useState(false);
  const [chartType, setChartType] = useState("TV");
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  const calculateCarnotEfficiency = (T_h, T_c) => {
    return 1 - T_c / T_h;
  };

  const calculateOttoEfficiency = (r, gamma) => {
    return 1 - 1 / Math.pow(r, gamma - 1);
  };

  const calculateDieselEfficiency = (r, cutoff) => {
    return 1 - (1 / (r ** (gamma - 1))) * ((cutoff ** gamma - 1) / (gamma * (cutoff - 1)));
  };

  const calculateRankineEfficiency = (T_h, T_c) => {
    // Simplificación del ciclo Rankine
    return 1 - Math.sqrt(T_c / T_h);
  };

  const calculateBraytonEfficiency = (r, gamma) => {
    return 1 - 1 / Math.pow(r, (gamma - 1) / gamma);
  };

  const carnotEfficiency = calculateCarnotEfficiency(tempHot, tempCold);
  const ottoEfficiency = calculateOttoEfficiency(compressionRatio, gamma);
  const dieselEfficiency = calculateDieselEfficiency(compressionRatio, 2);
  const rankineEfficiency = calculateRankineEfficiency(tempHot, tempCold);
  const braytonEfficiency = calculateBraytonEfficiency(compressionRatio, gamma);

  useEffect(() => {
    console.log("App component mounted");
    const simulateWork = () => {
      const baseWork = 1000; // Trabajo base en Joules
      let actualWork;

      switch (selectedCycle) {
        case "Carnot":
          actualWork = baseWork * carnotEfficiency;
          break;
        case "Otto":
          actualWork = baseWork * ottoEfficiency;
          break;
        case "Diesel":
          actualWork = baseWork * dieselEfficiency;
          break;
        case "Rankine":
          actualWork = baseWork * rankineEfficiency;
          break;
        case "Brayton":
          actualWork = baseWork * braytonEfficiency;
          break;
        default:
          actualWork = 0;
      }

      setWorkDone(actualWork.toFixed(2));
    };

    simulateWork();
  }, [selectedCycle, carnotEfficiency, ottoEfficiency, dieselEfficiency, rankineEfficiency, braytonEfficiency]);

  const cycles = {
    Carnot: {
      label: "Ciclo de Carnot",
      efficiency: carnotEfficiency,
      data: [
        { x: 1, y: tempCold },
        { x: 2, y: tempHot },
        { x: 3, y: tempHot },
        { x: 4, y: tempCold },
        { x: 1, y: tempCold },
      ],
      description: "El ciclo de Carnot es el ciclo termodinámico ideal más eficiente posible. Aunque no es práctico de implementar en máquinas reales, sirve como estándar de comparación para todos los demás ciclos. Fue propuesto por Sadi Carnot en 1824 y es fundamental en el estudio de la termodinámica. El ciclo consta de dos procesos isotérmicos y dos adiabáticos, todos reversibles.",
      image: carnotImage,
      caseStudy: {
        title: "Caso Ideal: El Ciclo de Carnot",
        description: "El ciclo de Carnot es un ciclo termodinámico ideal que no puede ser alcanzado en la práctica. Sin embargo, sirve como un estándar de comparación para todos los demás ciclos.",
        realWorldExample: "Aunque no existe una máquina real que opere en un ciclo de Carnot perfecto, todos los demás ciclos se comparan con él para medir su eficiencia relativa.",
        limitations: [
          "Requiere procesos reversibles, que son imposibles en la práctica debido a la fricción y otras irreversibilidades.",
          "Necesita transferencia de calor infinitamente lenta para mantener el equilibrio térmico, lo que resulta en una potencia de salida nula.",
          "Los materiales reales no pueden soportar las temperaturas extremas requeridas para maximizar la eficiencia."
        ]
      }
    },
    Otto: {
      label: "Ciclo Otto",
      efficiency: ottoEfficiency,
      data: [
        { x: 1, y: tempCold },
        { x: 1 / compressionRatio, y: tempCold * Math.pow(compressionRatio, gamma - 1) },
        { x: 1 / compressionRatio, y: tempHot },
        { x: 1, y: tempHot / Math.pow(compressionRatio, gamma - 1) },
        { x: 1, y: tempCold },
      ],
      description: "El ciclo Otto es utilizado en motores de combustión interna de encendido por chispa. Es común en automóviles de gasolina. Fue propuesto por Nikolaus Otto en 1876 y consta de cuatro tiempos: admisión, compresión, explosión y escape. La eficiencia del ciclo Otto depende principalmente de la relación de compresión y el coeficiente adiabático del gas.",
      image: ottoImage,
      caseStudy: {
        title: "Motor de Automóvil de Gasolina",
        description: "El ciclo Otto es la base de los motores de combustión interna de encendido por chispa, comúnmente usados en automóviles de gasolina.",
        realWorldExample: "Un Toyota Corolla 2021 con motor de 1.8 litros tiene una eficiencia térmica de alrededor del 40%, comparado con una eficiencia de Carnot teórica del 70% en condiciones similares.",
        limitations: [
          "Pérdidas por fricción en las partes móviles del motor.",
          "Transferencia de calor a las paredes del cilindro.",
          "Combustión incompleta del combustible.",
          "Limitaciones en la relación de compresión para evitar el golpeteo del motor."
        ]
      }
    },
    Diesel: {
      label: "Ciclo Diesel",
      efficiency: dieselEfficiency,
      data: [
        { x: 1, y: tempCold },
        { x: 1 / compressionRatio, y: tempCold * Math.pow(compressionRatio, gamma) },
        { x: 1.5 / compressionRatio, y: tempHot },
        { x: 1, y: tempHot / Math.pow(1.5, gamma - 1) },
        { x: 1, y: tempCold },
      ],
      description: "El ciclo Diesel se usa en motores de combustión interna de encendido por compresión. Es común en camiones y algunos automóviles. Fue desarrollado por Rudolf Diesel en la década de 1890 como una alternativa más eficiente al ciclo Otto. En el ciclo Diesel, el aire se comprime hasta una temperatura superior a la de autoignición del combustible, que se inyecta al final de la compresión. Esto permite mayores relaciones de compresión y, por lo tanto, mayor eficiencia térmica que el ciclo Otto. Sin embargo, debido a las altas presiones, los motores Diesel tienden a ser más pesados y costosos.",
      image: dieselImage,
      caseStudy: {
        title: "Motor de Camión Diesel",
        description: "El ciclo Diesel se utiliza en motores de combustión interna de encendido por compresión, comunes en camiones y algunos automóviles.",
        realWorldExample: "Un motor diesel Cummins X15, usado en camiones pesados, puede alcanzar una eficiencia térmica de hasta 46%, comparado con una eficiencia de Carnot teórica del 75% en condiciones similares.",
        limitations: [
          "Pérdidas por fricción debido a las altas presiones de operación.",
          "Transferencia de calor a las paredes del cilindro.",
          "Limitaciones en la velocidad de combustión del combustible.",
          "Emisiones de partículas y NOx que requieren sistemas de postratamiento."
        ]
      }
    },
    Rankine: {
      label: "Ciclo Rankine",
      efficiency: rankineEfficiency,
      data: [
        { x: 1, y: tempCold },
        { x: 1, y: tempHot },
        { x: 4, y: tempHot },
        { x: 4, y: tempCold },
        { x: 1, y: tempCold },
      ],
      description: "El ciclo Rankine es la base para las centrales térmicas de vapor y nucleares. Es crucial en la generación de energía eléctrica a gran escala. Desarrollado en el siglo XIX, lleva el nombre del ingeniero escocés William John Macquorn Rankine. El ciclo utiliza agua como fluido de trabajo, que se convierte en vapor a alta presión, se expande en una turbina para generar electricidad, y luego se condensa de vuelta a líquido. Las mejoras modernas incluyen el recalentamiento y la regeneración para aumentar la eficiencia. A pesar de su amplio uso, el ciclo Rankine está limitado por las propiedades termodinámicas del agua y las temperaturas máximas que pueden soportar los materiales de la caldera.",
      image: rankineImage,
      caseStudy: {
        title: "Central Térmica de Carbón",
        description: "El ciclo Rankine es la base de las centrales térmicas de vapor, incluyendo las plantas de carbón y nucleares.",
        realWorldExample: "La central térmica de carbón de Neurath en Alemania, una de las más eficientes del mundo, alcanza una eficiencia del 45.1%, comparado con una eficiencia de Carnot teórica del 65% en condiciones similares.",
        limitations: [
          "Limitaciones en las temperaturas máximas debido a los materiales de la caldera y la turbina.",
          "Pérdidas en la bomba y la turbina.",
          "Irreversibilidades en el condensador y el generador de vapor.",
          "Pérdidas por transferencia de calor en las tuberías y componentes."
        ]
      }
    },
    Brayton: {
      label: "Ciclo Brayton",
      efficiency: braytonEfficiency,
      data: [
        { x: 1, y: tempCold },
        { x: 2, y: tempCold * Math.pow(compressionRatio, (gamma - 1) / gamma) },
        { x: 2, y: tempHot },
        { x: 1, y: tempHot / Math.pow(compressionRatio, (gamma - 1) / gamma) },
        { x: 1, y: tempCold },
      ],
      description: "El ciclo Brayton, también conocido como ciclo Joule, se utiliza en turbinas de gas para la propulsión de aviones y la generación de electricidad. Fue desarrollado por George Brayton en el siglo XIX, aunque inicialmente para motores de pistón. En su forma más simple, consiste en una compresión adiabática, una adición de calor a presión constante, y una expansión adiabática. Las turbinas de gas modernas operan en ciclo abierto, tomando aire del ambiente, pero el análisis termodinámico se realiza como si fuera un ciclo cerrado. La eficiencia del ciclo Brayton aumenta con la relación de presiones y la temperatura máxima del ciclo, lo que ha llevado a significativas mejoras en el diseño de turbinas y materiales resistentes a altas temperaturas.",
      image: braytonImage,
      caseStudy: {
        title: "Turbina de Gas para Generación Eléctrica",
        description: "El ciclo Brayton se utiliza en turbinas de gas para la generación de electricidad y la propulsión de aviones.",
        realWorldExample: "La turbina de gas GE 9HA.02, una de las más eficientes del mundo, alcanza una eficiencia del 64% en ciclo combinado, comparado con una eficiencia de Carnot teórica del 80% en condiciones similares.",
        limitations: [
          "Pérdidas en el compresor y la turbina.",
          "Limitaciones en las temperaturas máximas debido a los materiales de la cámara de combustión y la turbina.",
          "Pérdidas por transferencia de calor en los componentes.",
          "Irreversibilidades en el proceso de combustión."
        ]
      }
    },
  };

  const generateChartData = (cycle, type) => {
    let xLabel, yLabel;
    let data = cycles[cycle]?.data || [];

    switch (type) {
      case "TV":
        xLabel = "Volumen (V)";
        yLabel = "Temperatura (T)";
        break;
      case "PV":
        xLabel = "Volumen (V)";
        yLabel = "Presión (P)";
        data = data.map(point => ({
          x: point.x,
          y: pressure * (point.y / tempCold)
        }));
        break;
      case "TS":
        xLabel = "Entropía (S)";
        yLabel = "Temperatura (T)";
        data = calculateTSData(cycle);
        return {
          labels: data.map(point => point.x),
          datasets: [{
            label: cycles[cycle]?.label || '',
            data: data,
            borderColor: "blue",
            fill: false,
          }]
        };
      default:
        xLabel = "Volumen (V)";
        yLabel = "Temperatura (T)";
    }

    return {
      labels: data.map(point => point.x),
      datasets: [{
        label: cycles[cycle]?.label || '',
        data: data,
        borderColor: "blue",
        fill: false,
      }],
      xLabel,
      yLabel
    };
  };

  const calculateTSData = (cycle) => {
    const R = 8.314; // Constante de gas universal
    let data = [];

    switch (cycle) {
      case "Carnot":
        // El ciclo Carnot ya está correctamente representado
        data = [
          { x: 0, y: tempCold },
          { x: R * Math.log(compressionRatio), y: tempCold },
          { x: R * Math.log(compressionRatio), y: tempHot },
          { x: 0, y: tempHot },
          { x: 0, y: tempCold },
        ];
        break;
      case "Otto":
        // El ciclo Otto ya está correctamente representado
        const s1_otto = 0;
        const s2_otto = s1_otto + R * Math.log(1 / compressionRatio);
        const s3_otto = s2_otto + R * gamma * Math.log(tempHot / (tempCold * Math.pow(compressionRatio, gamma - 1)));
        const s4_otto = s3_otto + R * Math.log(compressionRatio);
        data = [
          { x: s1_otto, y: tempCold },
          { x: s2_otto, y: tempCold * Math.pow(compressionRatio, gamma - 1) },
          { x: s3_otto, y: tempHot },
          { x: s4_otto, y: tempHot / Math.pow(compressionRatio, gamma - 1) },
          { x: s1_otto, y: tempCold },
        ];
        break;
      case "Diesel":
        // Ciclo Diesel
        const cutOffRatio = 2; // Relación de corte, ajusta según sea necesario
        const s1_diesel = 0;
        const s2_diesel = s1_diesel + R * Math.log(1 / compressionRatio);
        const s3_diesel = s2_diesel + R * gamma * Math.log(cutOffRatio);
        const s4_diesel = s3_diesel + R * Math.log(compressionRatio * cutOffRatio);
        data = [
          { x: s1_diesel, y: tempCold },
          { x: s2_diesel, y: tempCold * Math.pow(compressionRatio, gamma) },
          { x: s3_diesel, y: tempHot },
          { x: s4_diesel, y: tempHot / Math.pow(cutOffRatio, gamma - 1) },
          { x: s1_diesel, y: tempCold },
        ];
        break;
      case "Rankine":
        // Ciclo Rankine simplificado
        const s1_rankine = 0;
        const s2_rankine = s1_rankine + R * Math.log(tempHot / tempCold);
        const s3_rankine = s2_rankine + R * Math.log(2); // Suponiendo una expansión en la turbina
        const s4_rankine = s3_rankine - R * Math.log(tempHot / tempCold);
        data = [
          { x: s1_rankine, y: tempCold },
          { x: s2_rankine, y: tempHot },
          { x: s3_rankine, y: tempHot },
          { x: s4_rankine, y: tempCold },
          { x: s1_rankine, y: tempCold },
        ];
        break;
      case "Brayton":
        // Ciclo Brayton
        const s1_brayton = 0;
        const s2_brayton = s1_brayton + R * Math.log(Math.pow(compressionRatio, (gamma - 1) / gamma));
        const s3_brayton = s2_brayton + R * gamma * Math.log(tempHot / (tempCold * Math.pow(compressionRatio, (gamma - 1) / gamma)));
        const s4_brayton = s3_brayton + R * Math.log(1 / Math.pow(compressionRatio, (gamma - 1) / gamma));
        data = [
          { x: s1_brayton, y: tempCold },
          { x: s2_brayton, y: tempCold * Math.pow(compressionRatio, (gamma - 1) / gamma) },
          { x: s3_brayton, y: tempHot },
          { x: s4_brayton, y: tempHot / Math.pow(compressionRatio, (gamma - 1) / gamma) },
          { x: s1_brayton, y: tempCold },
        ];
        break;
      default:
        // Caso por defecto
        data = [
          { x: 0, y: tempCold },
          { x: 1, y: tempHot },
          { x: 2, y: tempCold },
          { x: 0, y: tempCold },
        ];
    }

    return data;
  };

  const resetValues = () => {
    setTempHot(600);
    setTempCold(300);
    setCompressionRatio(8);
    setGamma(1.4);
  };

  const data = {
    labels: cycles[selectedCycle].data.map((point) => point.x),
    datasets: [
      {
        label: cycles[selectedCycle].label,
        data: cycles[selectedCycle].data,
        borderColor: "red",
        fill: false,
      },
      {
        label: cycles[comparisonCycle].label,
        data: cycles[comparisonCycle].data,
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: 'bottom',
        title: {
          display: true,
          text: "Volumen (V)",
        },
      },
      y: {
        type: "linear",
        position: 'left',
        title: {
          display: true,
          text: "Temperatura (T)",
        },
      },
    },
  };

  const efficiencyChartData = {
    labels: ["Carnot", "Otto", "Diesel", "Rankine", "Brayton"],
    datasets: [{
      label: 'Eficiencia',
      data: [carnotEfficiency, ottoEfficiency, dieselEfficiency, rankineEfficiency, braytonEfficiency],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
      borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)'],
      borderWidth: 1
    }]
  };

  const efficiencyChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Eficiencia'
        }
      }
    }
  };

  const generateCarnotReferenceCurve = (type) => {
    let data;
    switch (type) {
      case "TS":
        // Aquí puedes definir cómo se ve la curva de Carnot en el gráfico T-S
        data = [
          { x: 0, y: tempCold },
          { x: 1, y: tempHot },
          { x: 2, y: tempHot },
          { x: 3, y: tempCold },
          { x: 0, y: tempCold },
        ];
        break;
      // Otros tipos de gráficos pueden ser manejados aquí si es necesario
      default:
        data = [];
    }
    return {
      label: "Carnot (Referencia)",
      data: data,
      borderColor: "red",
      borderDash: [5, 5],
      fill: false,
    };
  };

  const chartOptions = (xLabel, yLabel) => ({
    responsive: true,
    maintainAspectRatio: false, // Permite que el gráfico se ajuste al contenedor
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: xLabel,
        },
        ticks: {
          callback: function(value, index, values) {
            return value.toFixed(2);
          }
        }
      },
      y: {
        type: "linear",
        position: 'left',
        title: {
          display: true,
          text: yLabel,
          font: {
            size: 14,
            weight: 'bold'
          }
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `(${context.parsed.x.toFixed(2)}, ${context.parsed.y.toFixed(2)})`;
            }
            return label;
          }
        }
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: tempCold,
            yMax: tempCold,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            label: {
              content: 'Temperatura fría',
              enabled: true
            }
          },
          line2: {
            type: 'line',
            yMin: tempHot,
            yMax: tempHot,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            label: {
              content: 'Temperatura caliente',
              enabled: true
            }
          }
        }
      }
    }
  });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <div className="cycle-selector">
                  {Object.keys(cycles).map((cycle) => (
                    <button
                      key={cycle}
                      onClick={() => setSelectedCycle(cycle)}
                      className={selectedCycle === cycle ? "active" : ""}
                    >
                      Ciclo {cycle}
                    </button>
                  ))}
                </div>
                <div className="Comparador">
                  <div className="controls">
                    <div className="inputs">
                      <div className="input-group">
                        <div className="ind-input">
                          <label>Temperatura caliente (K): </label>
                          <input
                            type="number"
                            value={tempHot}
                            onChange={(e) => setTempHot(Number(e.target.value))}
                          />
                        </div>
                        <div className="ind-input">
                          <label>Temperatura fría (K): </label>
                          <input
                            type="number"
                            value={tempCold}
                            onChange={(e) => setTempCold(Number(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <div className="ind-input">
                          <label>Relación de compresión: </label>
                          <input
                            type="number"
                            value={compressionRatio}
                            onChange={(e) => setCompressionRatio(Number(e.target.value))}
                          />
                        </div>
                        <div className="ind-input">
                          <label>Gamma (exponente adiabático): </label>
                          <input
                            type="number"
                            value={gamma}
                            onChange={(e) => setGamma(Number(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="input-group">
                        <div className="ind-input">
                          <label>Presión (kPa): </label>
                          <input
                            type="number"
                            value={pressure}
                            onChange={(e) => setPressure(Number(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                    <button onClick={resetValues} className="reset-button">Restablecer valores</button>
                  </div>    
                </div>
                <div className="results">
                  <p>Eficiencia del ciclo {selectedCycle}: {cycles[selectedCycle].efficiency.toFixed(4)}</p>
                  <p>Trabajo realizado: {workDone} J</p>
                  <button onClick={() => setShowInfo(!showInfo)} className="info-button">
                    {showInfo ? "Ocultar información" : "Mostrar información"}
                  </button>
                </div>
                {showInfo && (
                  <div className="info-overlay">
                    <div className="info-content">
                      <h3>{cycles[selectedCycle].label}</h3>
                      <img src={cycles[selectedCycle].image} 
                      alt={`Diagrama del ${cycles[selectedCycle].label}`} 
                      className={`cycle-image ${isImageEnlarged ? 'enlarged' : ''}`} 
                      onClick={() => setIsImageEnlarged(!isImageEnlarged)}
                      />
                      <p>{cycles[selectedCycle].description}</p>
                      <CaseStudy caseStudy={cycles[selectedCycle].caseStudy} />
                      <button onClick={() => setShowInfo(false)} className="close-button">Cerrar</button>
                    </div>
                  </div>
                )}
                <div className="chart-container">
                  <h2>Diagrama del Ciclo</h2>
                  <div className="chart-type-selector">
                    <button onClick={() => setChartType("TV")}>T-V</button>
                    <button onClick={() => setChartType("PV")}>P-V</button>
                    <button onClick={() => setChartType("TS")}>T-S</button>
                  </div>
                  <div className="chart" style={{ height: '500px', width: '100%' }}>
                    <Line 
                      data={{
                        datasets: [
                          ...generateChartData(selectedCycle, chartType).datasets,
                          ...(chartType === "TS" ? [generateCarnotReferenceCurve(chartType)] : [])
                        ]
                      }}
                      options={chartOptions(
                        generateChartData(selectedCycle, chartType).xLabel,
                        generateChartData(selectedCycle, chartType).yLabel
                      )} 
                    />
                  </div>
                  {chartType === "TS" && (
                    <p className="ts-explanation">
                      El diagrama T-S muestra cómo cambia la temperatura con respecto a la entropía durante el ciclo. 
                      Las áreas bajo las curvas representan el calor transferido. La diferencia entre el calor añadido 
                      (área superior) y el calor rechazado (área inferior) es el trabajo neto realizado por el ciclo.
                    </p>
                  )}
                </div>
                <div className="chart-container">
                  <h2>Comparación de Eficiencias</h2>
                  <Bar data={efficiencyChartData} options={efficiencyChartOptions} />
                </div>

                <div className="simulation-links">
                  <Link to="/simulacion/otto" className="sim-button">
                    Simulación Ciclo Otto
                  </Link>
                  <Link to="/simulacion/diesel" className="sim-button">
                    Simulación Ciclo Diesel
                  </Link>
                  <Link to="/simulacion/brayton" className="sim-button">
                    Simulación Ciclo Brayton
                  </Link>
                  <Link to="/simulacion/rankine" className="sim-button">
                    Simulación Ciclo Rankine
                  </Link>
                </div>
              </div>
            }
          />

          <Route path="/simulacion/otto" element={<OttoSimulation />} />
          <Route path="/simulacion/diesel" element={<DieselSimulation />} />
          <Route path="/simulacion/brayton" element={<BraytonSimulation />} />
          <Route path="/simulacion/rankine" element={<RankineSimulation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;