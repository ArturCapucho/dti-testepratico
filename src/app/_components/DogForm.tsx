'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { calculateBestPriceByDay } from '../utils/priceUtils'

interface FormData {
    date: string;
    smallDogs: number;
    bigDogs: number;
}
const formatDate = (date: string) => {
    return date.replace(/-/g, '/');
};

const DogForm = () => {
    const [formData, setFormData] = useState<FormData>({
        date: '',
        smallDogs: 0,
        bigDogs: 0
    });
    const [bestPrice, setBestPrice] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseInt(value) || 0 : value
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        let formattedDate = formatDate(formData.date);
        const newDate = new Date(formattedDate);
        console.log(formData.date)
        setBestPrice(calculateBestPriceByDay(newDate.getDay(), formData.smallDogs, formData.bigDogs));
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Data:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="smallDogs" className="block text-gray-700 text-sm font-bold mb-2">Cachorros pequenos:</label>
                    <input
                        type="number"
                        id="smallDogs"
                        name="smallDogs"
                        value={formData.smallDogs}
                        min="0"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="bigDogs" className="block text-gray-700 text-sm font-bold mb-2">Cachorros grandes:</label>
                    <input
                        type="number"
                        id="bigDogs"
                        name="bigDogs"
                        value={formData.bigDogs}
                        min="0"
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
            </form>
            {bestPrice && (
                <div className="mt-6 p-4 bg-blue-100 text-blue-800 text-sm font-bold rounded-lg shadow-lg max-w-lg mx-auto text-center">
                    {bestPrice}
                </div>
            )}
        </>
    );
};

export default DogForm;