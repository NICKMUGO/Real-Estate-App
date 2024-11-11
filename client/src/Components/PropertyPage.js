// src/Components/PropertyPage.js
import React, { useEffect, useState } from 'react';

const PropertyPage = ({ match }) => {
    const [property, setProperty] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`/api/properties/${match.params.id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProperty(data);
            } catch (error) {
                setError(error);
            }
        };

        fetchProperty();
    }, [match.params.id]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{property.name}</h1>
            <p>{property.description}</p>
            <p>Price: {property.price}</p>
            {/* Add more property details as needed */}
        </div>
    );
};

export default PropertyPage;