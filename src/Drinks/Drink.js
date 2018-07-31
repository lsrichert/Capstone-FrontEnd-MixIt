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
                <a href="#" onClick={() => props.EditDrink(props.drink.id)}>Edit</a>

            </Card>

        </div>
    )
}