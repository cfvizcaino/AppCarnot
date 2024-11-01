import React from 'react';

function CaseStudy({ caseStudy }) {
  return (
    <div className="case-study">
      <h3>{caseStudy.title}</h3>
      <p>{caseStudy.description}</p>
      <h4>Ejemplo del Mundo Real:</h4>
      <p>{caseStudy.realWorldExample}</p>
      <h4>Limitaciones Prácticas:</h4>
      <ul>
        {caseStudy.limitations.map((limitation, index) => (
          <li key={index}>{limitation}</li>
        ))}
      </ul>
    </div>
  );
}

export default CaseStudy;

