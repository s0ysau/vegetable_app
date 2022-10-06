const React = require('react')

class New extends React.Component {
    render () {
        return (
            <>
            <h1>Create A New Vegetable</h1>
            <form method='POST' action='/fruits'>
                Name: <input type='text' name='name' placeholder='Vegetable Name'></input><br />
                Color: <input type='text' name='color' placeholder='Color of Vegetable'></input><br/>
                Is Ready To Eat: <input type="checkbox" name="readyToEat"></input><br/>
                <input type='submit' value='Submit Vegetable'></input>
            </form>
            </>
        )
    } 
}