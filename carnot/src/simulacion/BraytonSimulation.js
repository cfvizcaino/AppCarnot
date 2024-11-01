import React, { useState } from 'react';
import './SimulationStyles.css'; // Asumiendo que usamos un archivo CSS común para todas las simulaciones

const BraytonSimulation = () => {
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const videoId = "cOcu7szPKmQ"; // Reemplaza con el ID correcto del video de YouTube
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const description = (
    <>
      <p>
        El ciclo Brayton, también conocido como ciclo de turbina de gas, es un ciclo termodinámico 
        utilizado principalmente en turbinas de gas.
      </p>
      <p>Consta de cuatro procesos principales:</p>
      <ol className="process-list">
        <li><strong>Compresión isentrópica:</strong> El aire se comprime en el compresor.</li>
        <li><strong>Adición de calor a presión constante:</strong> Se añade combustible y se quema en la cámara de combustión.</li>
        <li><strong>Expansión isentrópica:</strong> Los gases calientes se expanden en la turbina, generando trabajo.</li>
        <li><strong>Rechazo de calor a presión constante:</strong> Los gases de escape se enfrían en la atmósfera.</li>
      </ol>
      <p>Características del ciclo Brayton:</p>
      <ul className="feature-list">
        <li>Es el ciclo utilizado en motores de turbina de gas y en algunos motores de avión.</li>
        <li>Utiliza aire como fluido de trabajo principal.</li>
        <li>Puede operar como ciclo abierto (más común) o cerrado.</li>
        <li>La eficiencia aumenta con mayores relaciones de compresión y temperaturas de entrada de la turbina.</li>
      </ul>
    </>
  );

  const questions = [
    {
      question: "¿Cuál es el fluido de trabajo principal en el ciclo Brayton?",
      options: ["Agua", "Aire", "Vapor", "Refrigerante"],
      correctAnswer: "Aire"
    },
    {
      question: "¿En qué componente del ciclo Brayton se añade calor al fluido de trabajo?",
      options: ["Compresor", "Cámara de combustión", "Turbina", "Intercambiador de calor"],
      correctAnswer: "Cámara de combustión"
    },
    {
      question: "¿Qué tipo de proceso es la expansión en la turbina en un ciclo Brayton ideal?",
      options: ["Isotérmico", "Isobárico", "Isocórico", "Isentrópico"],
      correctAnswer: "Isentrópico"
    },
    {
      question: "¿Cómo se puede aumentar la eficiencia del ciclo Brayton?",
      options: ["Disminuyendo la relación de compresión", "Disminuyendo la temperatura de entrada de la turbina", "Aumentando la relación de compresión", "Enfriando el aire antes de la compresión"],
      correctAnswer: "Aumentando la relación de compresión"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let newScore = 0;
    questions.forEach((q, i) => {
      if (e.target[`question${i}`].value === q.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  return (
    <div className="simulation-container">
      <div className="simulation-content">
        <h2>Simulación del Ciclo Brayton</h2>
        <div className="video-container">
          <a 
            href={videoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="video-thumbnail-link"
          >
            <div className="video-thumbnail">
              <img 
                src={thumbnailUrl} 
                alt="Ciclo Brayton Explicado" 
                className="video-thumbnail-image"
              />
              <div className="video-play-button">
                <span>▶</span>
              </div>
            </div>
            <div className="video-caption">
              Haz clic para ver el video en YouTube
            </div>
          </a>
        </div>
        <div className="description">
          <h3>Descripción del Ciclo Brayton</h3>
          {description}
        </div>
        <div className="quiz-container">
          <h3>Quiz sobre el Ciclo Brayton</h3>
          <form onSubmit={handleSubmit}>
            {questions.map((q, i) => (
              <div key={i} className="question">
                <p>{q.question}</p>
                {q.options.map((option, j) => (
                  <div key={j}>
                    <input
                      type="radio"
                      id={`question${i}option${j}`}
                      name={`question${i}`}
                      value={option}
                      required
                    />
                    <label htmlFor={`question${i}option${j}`}>{option}</label>
                  </div>
                ))}
              </div>
            ))}
            <button type="submit">Enviar respuestas</button>
          </form>
          {showResults && (
            <div className="results">
              <p>Tu puntuación: {score} de {questions.length}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BraytonSimulation;
