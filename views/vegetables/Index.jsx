const React = require('react')

class Index extends React.Component {
    render (){
        const { veggies }= this.props;      
        return (
            <div>
                <h1>Vegetable Index Page</h1>
                <ul>
                    {veggies.map((veggie,i) => {
                        return (
                            <li>
                                The {' '} 
                                <a href={`/vegetables/${i}`}>
                                    {veggie.name}
                                </a> {' '} is {veggie.color} <br></br> {veggie.readyToEat? `It\'s ready to eat` : `It\'s not ready to eat`}
                                <br />
                            </li>
                        )
                    })} 
                </ul>
            </div>
        )
    }
}

module.exports = Index;