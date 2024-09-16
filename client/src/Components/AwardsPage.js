
import React from 'react';
import './awards.css';
import pic1 from './pic1.jpeg';  
import pic2 from './pic2.jpeg'; 
import pic3 from './pic3.jpeg'; 

function AwardsPage() {
  const awardsList = [
    { id: 1, title: "Best Real Estate Company", year: 2023, imgSrc: pic1 }, 
    { id: 2, title: "User Choice Award", year: 2022, imgSrc: pic2},
    { id: 3, title: "Top Innovator", year: 2021, imgSrc: pic3},
  ];

  

  return (
    <div className="awards-page">
      <h1 className="heading">Why You Should Choose Us</h1>
      <div className="awards-container">
        {awardsList.map((award) => (
          <div key={award.id} className="award-item">
            <img src={award.imgSrc} alt={award.title} className="award-image" />
            <h2>{award.title}</h2>
            <p>{award.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AwardsPage;
