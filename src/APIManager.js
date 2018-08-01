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
    updateOneDrink: {
        value: (drinkId, drinkToEdit) => {
            return fetch(`http://localhost:5002/drinks/${drinkId}`, {
               method: "PUT",
               body: JSON.stringify(drinkToEdit),
               headers: { "Content-Type": "application/json" }
            })
            .then(e => e.json())
        }
    },
    // handleEdit: {
    //     value: (drinkToEdit) => {
    //         return fetch(`http://localhost:5002/drinks/${drinkToEdit.id}`, {
    //             method: "PUT",
    //             body: JSON.stringify(drinkToEdit),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         }).then(() => { return fetch("http://localhost:5002/drinks") })
    //             .then(a => a.json())
    //     }
    // },
    
    

    addDrink: {
        value: (newObject) => {
            // Here I am adding a drink to my database or POSTING
            return fetch("http://localhost:5002/drinks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newObject)
            })
            // Then I need to return this fetch after my new drink is added
            .then(() => {
                return fetch("http://localhost:5002/drinks")
            })
            // Here, I am setting the new state with my new drink
            .then(a => a.json())
        }
    },

    deleteDrink: {
        value: (drinkId) => {
            // This code actually deletes the drink you want to delete
            return fetch(`http://localhost:5002/drinks/${drinkId}`, {
                method: "DELETE"
            })
            // When the delete is finished, return this fetch 
            .then(() => {
                return fetch("http://localhost:5002/drinks")
            })
            // Once the new list of drinks is retrieved, set the new state
            .then(a => a.json())
        }
    }

   

})

export default Database