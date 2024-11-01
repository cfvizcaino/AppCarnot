import React, { useState } from 'react';
import './SimulationStyles.css'; // Asumiendo que usamos un archivo CSS común para todas las simulaciones

const RankineSimulation = () => {
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const videoId = "NVi7i1mXJ1w"; // Reemplaza con el ID correcto del video de YouTube
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const description = (
    <>
      <p>
        El ciclo Rankine es un ciclo termodinámico que convierte el calor en trabajo mecánico, 
        comúnmente utilizado en centrales térmicas de vapor.
      </p>
      <p>Consta de cuatro procesos principales:</p>
      <ol className="process-list">
        <li><strong>Compresión isentrópica (bomba):</strong> El agua se bombea a alta presión hacia la caldera.</li>
        <li><strong>Adición de calor a presión constante (caldera):</strong> El agua se convierte en vapor sobrecalentado.</li>
        <li><strong>Expansión isentrópica (turbina):</strong> El vapor se expande en la turbina, generando trabajo.</li>
        <li><strong>Rechazo de calor a presión constante (condensador):</strong> El vapor se condensa de nuevo a agua líquida.</li>
      </ol>
      <p>Características del ciclo Rankine:</p>
      <ul className="feature-list">
        <li>Es el ciclo más común en centrales eléctricas de vapor.</li>
        <li>Utiliza agua como fluido de trabajo, que es barata y abundante.</li>
        <li>Puede alcanzar eficiencias del 30-40% en plantas modernas.</li>
        <li>Se pueden implementar mejoras como el recalentamiento y la regeneración para aumentar la eficiencia.</li>
      </ul>
    </>
  );

  const questions = [
    {
      question: "¿Cuál es el fluido de trabajo típico en el ciclo Rankine?",
      options: ["Aire", "Agua", "Refrigerante", "Aceite"],
      correctAnswer: "Agua"
    },
    {
      question: "¿En qué componente del ciclo Rankine se genera la mayor parte del trabajo útil?",
      options: ["Bomba", "Caldera", "Turbina", "Condensador"],
      correctAnswer: "Turbina"
    },
    {
      question: "¿Qué proceso ocurre en la caldera del ciclo Rankine?",
      options: ["Compresión", "Adición de calor", "Expansión", "Condensación"],
      correctAnswer: "Adición de calor"
    },
    {
      question: "¿Cuál es una técnica común para mejorar la eficiencia del ciclo Rankine?",
      options: ["Aumentar la presión del condensador", "Disminuir la temperatura de la caldera", "Recalentamiento", "Usar aire como fluido de trabajo"],
      correctAnswer: "Recalentamiento"
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
        <h2>Simulación del Ciclo Rankine</h2>
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
                alt="Ciclo Rankine Explicado" 
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
          <h3>Descripción del Ciclo Rankine</h3>
          {description}
        </div>
        <div className="quiz-container">
          <h3>Quiz sobre el Ciclo Rankine</h3>
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

export default RankineSimulation;
