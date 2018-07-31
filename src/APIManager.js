const Database = Object.create({}, {
    getUserByUserName: {
        value: (userName) => {
            return fetch(`http://localhost:5002/users?userName=${userName}`)
            .then(e => e.json())
        }
    },

    getIdOfCurrentUser: {
        value: () => {
            const databaseString = localStorage.getItem("credentials")
            const currentUserObject = JSON.parse(databaseString)
            console.log("user", currentUserObject)
            return currentUserObject.currentUserId
        }
    },
    getAllDrinks: {
        value: () => {
            return fetch("http://localhost:5002/drinks")
            .then(e => e.json())
        }
    },

    addDrink: {
        value: (newObject) => {
            return fetch("http://localhost:5002/drinks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            })
            .then(() => {
                return fetch("http://localhost:5002/drinks")
            })
            .then(a => a.json())
        }
    }

   

})

export default Database