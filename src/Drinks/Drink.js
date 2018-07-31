import React from "react"
import { Card, Button, CardTitle, CardText } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default props => {
    console.log("props", props)
    return (
        <div>
            <Card body outline color="warning">

                <CardTitle>{props.drink.DrinkName}</CardTitle>
                <CardText>{props.drink.DrinkLiquor}</CardText>
                <CardText>{props.drink.DrinkMixer}</CardText>
                <CardText>{props.drink.DrinkInstructions}</CardText>
                {/* <a href="#" onClick={() => props.EditDrink(props.drink.id)}>Edit Drink</a> */}
                {/* <a href="#" onClick={() => props.deleteDrink(props.drink.id)}>Delete Drink</a> */}
                <button onClick={() => props.EditDrink(props.drink.id)}>Edit Drink</button>
                <button onClick={() => props.deleteDrink(props.drink.id)}>Delete Drink</button>
            </Card>

        </div>
    )
}