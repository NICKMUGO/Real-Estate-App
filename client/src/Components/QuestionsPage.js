import React from 'react';
import './awards.css';

function QuestionsPage() {
  const questionsList = [
    {
      id: 1,
      question: "Do you only deal with buying of houses or leasing as well?",
      answer: "We offer both buying and leasing options for houses. Whether you're looking to own a home or rent, we have multiple listings to suit your needs.",
      link: "/homepage"
    },
    {
      id: 2,
      question: "Do I get a chance to view the houses before any transactions are made?",
      answer: "Yes, we encourage all clients to view the property in person or virtually before making any decisions.",
      link: "/homepage"
    },
    {
      id: 3,
      question: "Can I be assisted by someone to guide me throughout the process?",
      answer: "Absolutely! Our experienced agents are here to guide you through every step, from house viewing to finalizing transactions.",
      link: "/homepage"
    }
  ];

  return (
    <div className="questions-page">
      <h1 className="questions-heading">Frequently Asked Questions</h1>
      <div className="questions-container">
        {questionsList.map((item) => (
          <div key={item.id} className="question-item">
            <h2 className="question-title">{item.question}</h2>
            <p className="question-answer">{item.answer}</p>
            <a href={item.link} className="question-link">Learn More</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionsPage;
