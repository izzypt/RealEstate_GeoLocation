import room1 from "../assets/room1.jpg"
import room2 from "../assets/room2.jfif"
import room3 from "../assets/room3.jfif"
import room4 from "../assets/room4.jfif"
import room5 from "../assets/room5.jfif"

const myListings = [
    {
        id: 1,
        title: "teste",
        listing_type: "Apartment",
        description : "Something to do with the apartment",
        price: 1900,
        rental_frequency: "Month",
        location: {
            type: "Point",
            coordinates: [51.5410, -0.1587]
        },
        image : room1
    },
    {
        id: 2,
        title: "teste2",
        listing_type: "Apartment",
        description : "Something to do with the apartment",
        price: 564,
        rental_frequency: "Month",
        location: {
            type: "Point",
            coordinates: [51.0410, -0.1587]
        },
        image : room2
    },
    {
        id: 3,
        title: "teste3",
        listing_type: "Office",
        description : "Something to do with the office",
        price: 1150,
        rental_frequency: "Month",
        location: {
            type: "Point",
            coordinates: [51.2410, -0.1587]
        },
        image : room3
    },
    {
        id: 4,
        title: "teste4",
        listing_type: "Apartment",
        description : "Something to do with the apartment",
        price: 1234,
        rental_frequency: "Month",
        location: {
            type: "Point",
            coordinates: [51.2450, -0.1287]
        },
        image : room4
    },
    {
        id: 5,
        title: "teste5",
        listing_type: "Apartment",
        description : "Something to do with the apartment",
        price: 1600,
        rental_frequency: "Month",
        location: {
            type: "Point",
            coordinates: [51.2550, -0.1697]
        },
        image : room5
    },
    {
        id: 6,
        title: "teste5",
        listing_type: "Apartment",
        description : "Something to do with the apartment",
        price: 850,
        rental_frequency: "Month",
        location: {
            type: "Point",
            coordinates: [51.2350, -0.1997]
        }
    }
]

export default myListings