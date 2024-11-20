import React, { useContext, useEffect, useState } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import './Statistics.css';
import axios from 'axios';
import { Usercontext } from './UserContextProvider';

// Register all necessary elements for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Statistics() {
  const [statsData, setStatsData] = useState({
    total_properties: 0,
    total_rent_payments: 0,
    total_property_payments: 0,
    average_rent_price: 0,
    total_rent_collected: 0,
    total_property_sales: 0,
    top_properties: [],
    total_utilities: 0,
    total_clients: 0,
    total_owners: 0,
  });

  const[user]=useContext(Usercontext);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/statistics/');
        setStatsData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchStatistics();
  }, []);
  

  const barData = {
    labels: ['Total Properties', 'Rent Payments', 'Property Payments'],
    datasets: [
      {
        label: 'Statistics',
        data: [
          statsData.total_properties,
          statsData.total_rent_payments,
          statsData.total_property_payments,
        ],
        backgroundColor: ['#4BC0C0', '#9966FF', '#FF9F40'],
        borderColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true, suggestedMax: Math.max(statsData.total_properties, statsData.total_rent_payments, statsData.total_property_payments) + 1 },
    },
  };

  const pieData = {
    labels: ['Clients', 'Owners'],
    datasets: [
      {
        data: [statsData.total_clients, statsData.total_owners],
        backgroundColor: ['#4BC0C0', '#9966FF'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
  };

  const doughnutData = {
    labels: ['Water', 'Power', 'Security','Garbage Collection'],
    datasets: [
      {
        label: 'Utility Usage Distribution',
        data: [40, 35, 25,55],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56','green'],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Disables animations completely
  };

  return (
    <div className="statistics-container">
      <h2>Statistics Overview</h2>
      
      <div className="chart-section">
        {user.role==='owner' &&(
          <div className="chart-card">
            <h3>Total Properties, Rent, and Property Payments</h3>
            <Bar data={barData} options={barOptions} />
          </div>
        )}

        <div className="chart-card">
          <h3>Clients vs Owners</h3>
          <Pie data={pieData} options={pieOptions} />
        </div>
        {user.role==='client' &&(
        <div className="chart-card">
          <h3>Utility Usage Distribution</h3>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
        )}
      </div>
      {user.role==='client' &&(
      <div className="property-list">
        <h2 style={{display:'flex',alignItems:'center', justifyContent:'center', font:"bold",marginBottom:"20px" ,textDecoration:"underline"}}>Top Properties with Most Views</h2>
        <ul> {statsData.top_properties.map((property) => { 
          console.log('Property Image:', property.image); 
          return ( <div key={property.id} className="property-item"> 
          <img src={`http://127.0.0.1:8000/media/${property.image}`} alt={property.description} className="property-image" />
           <span className="property-description">{property.description}</span><br></br>
           <p className='property-description'>{property.views}Views 👀</p>
           </div> ); })}
            </ul>
      </div>
      )}
      <h2 style={{display:'flex',alignItems:"center",textAlign:"center",marginLeft:'500px'}}>Info Cards</h2>
      <div className="info-cards">
        {user.role==='owner'&&(
          <>
            <div className="info-card">
              <h3>Total Rent Collected</h3>
              <p>{statsData.total_rent_collected || 0}ksh</p>
            </div>
            <div className="info-card">
              <h3>Total Property Sales</h3>
              <p>{statsData.total_property_sales || 0}ksh</p>
            </div>
          </>
        )}
        <div className="info-card">
          <h3>Average Rent Price</h3>
          <p>{Math.round((statsData.average_rent_price || 0) / 10000) * 10000} Ksh</p>
        </div>
        <div className="info-card">
          <h3>Total Utilities</h3>
          <p>{statsData.total_utilities || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
