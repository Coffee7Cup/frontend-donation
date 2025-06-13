import React, {forwardRef} from 'react'
import { motion } from 'framer-motion'
import book from "../img/don/book.png"
import clothing from "../img/don/clothing.png"
import gadgets from "../img/don/gadgets.png"
import salary from "../img/don/salary.png"
import celeb from '../assets/projectImgs/celeb.jpeg'
import bday from '../assets/projectImgs/bday.jpeg'

const Donations = forwardRef((props, ref) => {

    const Card = ({ title, description, image, index }) => {
        return (
            <motion.div
                className="bg-white shadow rounded-lg p-4 transition-transform transform hover:scale-105 flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
            >
                <img src={image} alt={title} className="w-full h-48 object-contain rounded-t-lg rounded-3xl" />
                <h2 className="text-xl font-bold mt-2">{title}</h2>
                <p className="text-gray-700">{description}</p>
                
            </motion.div>
        );
    }
    
    const donations = [
        {
            title: "Books for Children",
            description: "Donate books to children.",
            image: book
        },
        {
            title: "Clothing Drive",
            description: "Provide clothing for those in need.",
            image: clothing
        },
        {
            title: "Gadgets for Education",
            description: "Support students with essential gadgets.",
            image: gadgets
        },
        {
            title: "Support",
            description: "donate monthly",
            image: salary
        },
        {
            title: "Celeberate birthdays",
            description: "Celebrate birthdays with a cause.",
            image: bday
        },
        {
            title: "Celeberate with us",
            description: "celebrate any occasion with us.",
            image: celeb
        },
        // Add more donation items as needed
    ];

    return (
        <>
            <div ref={ref} className="p-4 md:p-20 mx-10 ">
                <h1 className="text-3xl md:text-6xl font-bold mb-10 text-center">Donations</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {donations.map((donation, index) => (
                        <Card key={index} {...donation} index={index} />
                    ))}
                </div>
            </div>
        </>
    )
})

export default Donations
