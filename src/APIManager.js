const Database = Object.create({}, {
  
    getAllDrinks: {
        value: () => {
            return fetch("http://localhost:5002/drinks")
            .then(e => e.json())
        }
    }

})

export default Database