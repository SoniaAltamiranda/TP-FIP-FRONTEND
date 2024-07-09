import React, { useEffect, useState, useContext } from 'react';
import API_URL from '../../configAPIclever/Url_apiClever';
import { propertiesContext } from '../../context/propertiesContext';

function Payments() {
    const properties = useContext(propertiesContext);
    const [paymentData, setPaymentData] = useState({});
    const [bookingData, setBookingData] = useState(null);
    const [statusBooking, setStatusBooking] = useState(null);
    const [statusProperty, setStatusProperty] = useState(null);
    const [idProperty, setIdProperty] = useState(null);
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const paymentData = {};
        urlSearchParams.forEach((value, key) => {
            paymentData[key] = value;
        });
        setPaymentData(paymentData);
        console.log(paymentData);

        const fetchPaymentData = async () => {
           // const data = {...paymentData, paymentData.payment_id,}
            try {
                const response = await fetch(`${API_URL}/payment`,  {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(paymentData),
                });
            } catch(error) {
                console.log(`Error al cargar los datos`);
            }
        }
        
        const fetchBookingData = async () => {
            try {
                const preferenceId = paymentData['preference_id'];
                if (!preferenceId) return;
                
                const response = await fetch(`${API_URL}/booking/byPreference/${preferenceId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch booking data');
                }
                
                const data = await response.json();
                setBookingData(data);
                
                if (data && data.id_property) {
                    setIdProperty(data.id_property);
                    const foundProperty = properties.find(property => property.id_property === data.id_property);
                    setProperty(foundProperty);
                }
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };
        fetchPaymentData();
        fetchBookingData();
    }, [properties]);
    
    useEffect(() => {
        const updateBookingStatus = async (bookingId) => {
            const token = localStorage.getItem("token");
            try {
                const updatedBookingData = { ...bookingData, status: statusBooking };
                const response = await fetch(`${API_URL}/booking/${bookingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(updatedBookingData),
                });
                if (!response.ok) {
                    throw new Error('Error updating booking status', error);
                }
            } catch (error) {
                console.error('Error updating booking status:', error);
            }
        };

        const updatePropertyStatus = async (propertyId) => {
            try {
                console.log(propertyId);
                const token = localStorage.getItem("token");

                if (!property) {
                    console.error('Property is null or undefined');
                    return;
                }
                console.log(property);
                console.log(statusProperty);
                const updatedPropertyData = { ...property, status: statusProperty, price: Number(property.price), rooms: Number(property.rooms) };
                const response = await fetch(`${API_URL}/property/${propertyId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedPropertyData),
                });
                if (!response.ok) {
                    throw new Error('Error updating property status');
                }
            } catch (error) {
                console.error('Error updating property status:', error);
            }
        };

        if (paymentData.status === "approved") {
            setStatusBooking(true);
            setStatusProperty("reserved");

            if (bookingData?.id_booking) {
                updateBookingStatus(bookingData.id_booking);
            }

            if (idProperty) {
                updatePropertyStatus(idProperty);
            }
        }
    }, [paymentData.status, bookingData, idProperty, property, statusBooking, statusProperty]);

    return (
        <div>
            <br /><br /><br /><br />
            <h4>dfghfhsftghdfgh</h4>
        </div>
    );
}

export default Payments;

