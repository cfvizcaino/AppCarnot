import React, { useState } from 'react';
import './SimulationStyles.css';

const DieselSimulation = () => {
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const videoId = "qQopuo60SuI"; // Reemplaza con el ID correcto del video de YouTube
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const description = (
    <>
      <p>
        El ciclo Diesel es un ciclo termodinámico que describe el funcionamiento de un motor 
        de combustión interna de encendido por compresión.
      </p>
      <p>Consiste en cuatro fases principales:</p>
      <ol className="process-list">
        <li><strong>Admisión:</strong> El pistón baja y aspira aire puro (sin combustible) hacia el cilindro.</li>
        <li><strong>Compresión:</strong> El pistón sube y comprime el aire, elevando su temperatura por encima del punto de autoignición del combustible.</li>
        <li><strong>Combustión y Expansión:</strong> Se inyecta el combustible en el aire caliente comprimido, provocando su autoignición. La combustión ocurre a presión constante mientras el pistón baja.</li>
        <li><strong>Escape:</strong> El pistón sube nuevamente, expulsando los gases de la combustión.</li>
      </ol>
      <p>Características del motor Diesel:</p>
      <ul className="feature-list">
        <li>Fue inventado por Rudolf Diesel en 1893.</li>
        <li>No utiliza bujías, ya que el combustible se autoenciende debido a la alta temperatura del aire comprimido.</li>
        <li>Generalmente es más eficiente que un motor de gasolina debido a su mayor relación de compresión.</li>
        <li>Suele ser más robusto y duradero, lo que lo hace ideal para vehículos pesados y aplicaciones industriales.</li>
      </ul>
    </>
  );

  const questions = [
    {
      question: "¿Qué se aspira hacia el cilindro durante la fase de admisión en un ciclo Diesel?",
      options: ["Mezcla de aire y combustible", "Solo aire", "Solo combustible", "Gases de escape"],
      correctAnswer: "Solo aire"
    },
    {
      question: "¿Cómo se inicia la combustión en un motor Diesel?",
      options: ["Con una bujía", "Por autoignición", "Con un carburador", "Por chispa eléctrica"],
      correctAnswer: "Por autoignición"
    },
    {
      question: "¿En qué fase del ciclo Diesel se inyecta el combustible?",
      options: ["Admisión", "Compresión", "Combustión y Expansión", "Escape"],
      correctAnswer: "Combustión y Expansión"
    },
    {
      question: "¿Cuál es una característica distintiva del motor Diesel en comparación con un motor de gasolina?",
      options: [
        "Usa bujías para la ignición",
        "Tiene una menor relación de compresión",
        "Es generalmente más eficiente",
        "Requiere combustible más volátil"
      ],
      correctAnswer: "Es generalmente más eficiente"
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
        <h2>Simulación del Ciclo Diesel</h2>
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
                alt="Ciclo Diesel Explicado" 
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
          <h3>Descripción del Ciclo Diesel</h3>
          {description}
        </div>
        <div className="quiz-container">
          <h3>Quiz sobre el Ciclo Diesel</h3>
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

export default DieselSimulation;

