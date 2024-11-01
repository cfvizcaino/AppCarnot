import React from "react";

const SimulationContainer = ({ children }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}>
    {children}
  </div>
);

const Title = ({ children }) => (
  <h1 style={{
    color: '#333',
    marginBottom: '20px'
  }}>
    {children}
  </h1>
);

const VideoContainer = () => (
  <div style={{
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px'
  }}>
    <iframe
      width="100%"
      height="450"
      src="https://www.youtube.com/embed/sRMBq--LVjk"
      title="Ciclo Otto Explicado"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

const ExplanationText = () => (
  <div style={{
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
    textAlign: 'justify',
    lineHeight: '1.6'
  }}>
    <h2>Explicación del Ciclo Otto</h2>
    <p>
      El ciclo Otto es el ciclo termodinámico ideal que describe el funcionamiento de un motor de combustión interna de encendido por chispa. Este ciclo consta de cuatro etapas principales:
    </p>
    <ol>
      <li><strong>Admisión:</strong> El pistón baja, creando un vacío que permite la entrada de la mezcla aire-combustible.</li>
      <li><strong>Compresión:</strong> El pistón sube, comprimiendo la mezcla y aumentando su temperatura.</li>
      <li><strong>Combustión y Expansión:</strong> La bujía produce una chispa que inicia la combustión, aumentando la presión y empujando el pistón hacia abajo.</li>
      <li><strong>Escape:</strong> El pistón sube nuevamente, expulsando los gases quemados.</li>
    </ol>
    <p>
      Este ciclo se repite continuamente, convirtiendo la energía química del combustible en energía mecánica.
    </p>
  </div>
);

const QuizContainer = () => (
  <div style={{
    width: '100%',
    maxWidth: '800px',
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#e6f7ff',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  }}>
    <QuizSection />
  </div>
);

const QuizSection = () => {
  const [score, setScore] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);

  const questions = [
    {
      question: "¿Cuántas etapas principales tiene el ciclo Otto?",
      options: ["2", "4", "6", "8"],
      correctAnswer: "4"
    },
    {
      question: "¿En qué etapa se comprime la mezcla aire-combustible?",
      options: ["Admisión", "Compresión", "Expansión", "Escape"],
      correctAnswer: "Compresión"
    },
    {
      question: "¿Qué dispositivo inicia la combustión en un motor de ciclo Otto?",
      options: ["Pistón", "Válvula", "Bujía", "Carburador"],
      correctAnswer: "Bujía"
    },
    {
      question: "¿En qué etapa del ciclo Otto se produce la mayor presión?",
      options: ["Admisión", "Compresión", "Combustión", "Escape"],
      correctAnswer: "Combustión"
    },
    {
      question: "¿Qué tipo de motor utiliza el ciclo Otto?",
      options: ["Diésel", "Eléctrico", "De encendido por chispa", "De turbina"],
      correctAnswer: "De encendido por chispa"
    }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    let newScore = 0;
    questions.forEach((q, index) => {
      if (event.target[`question${index}`].value === q.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  return (
    <div>
      <h2>Quiz sobre el Ciclo Otto</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p>{q.question}</p>
            {q.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  id={`question${index}option${optionIndex}`}
                  name={`question${index}`}
                  value={option}
                  required
                />
                <label htmlFor={`question${index}option${optionIndex}`}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Enviar respuestas
        </button>
      </form>
      {showResults && (
        <div style={{ marginTop: '20px' }}>
          <h3>Resultados:</h3>
          <p>Has acertado {score} de {questions.length} preguntas.</p>
        </div>
      )}
    </div>
  );
};

const OttoSimulation = () => {
  return (
    <SimulationContainer>
      <Title>Simulación del Ciclo Otto</Title>
      <VideoContainer />
      <ExplanationText />
      <QuizContainer />
    </SimulationContainer>
  );
};

export default OttoSimulation;
