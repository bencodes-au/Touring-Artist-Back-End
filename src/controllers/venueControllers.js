// name address phone price (PK, genre id, location id)
// const venueRouter = require("../routes/venueRoutes")

const venues = [
    {
        name: "venue 1",
        address: "address 1",
        contact: "phone 1",
        price: "price 1",
    },
    {
        name: "venue 2",
        phone: "phone 2",
        contact: "price 2",
        price: "price 2"
    }
]

function getvenues() {
    return venues
}

module.exports = {
    getvenues
}