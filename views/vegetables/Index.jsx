const React = require('react')

class Index extends React.Component {
    render (){
        const { veggies }= this.props;      
        return (
            <div>
                <h1>Vegetable Index Page</h1>
                <nav>
                    <a href='/vegetables/new'>Create a New Vegetable</a>
                </nav>
                <ul>
                    {veggies.map((veggie) => {
                        const {name, color, readyToEat, _id} = veggie
                        return (
                            <li key={_id}>
                                <a href={`/vegetables/${_id}`}>
                                {name}</a> is {color}
                                <br/>
                                {
                                    readyToEat?
                                    'It\'s ready to eat':
                                    'It\'s not ready to eat'
                                }
                                <br/>
                                <form method='POST' action={`/vegetables/${_id}?_method=DELETE`}>
                                    <input type='submit' value={`Delete ${color} ${name}`}/>
                                </form>
                            </li>
                        )
                    })} 
                </ul>
            </div>
        )
    }
}

module.exports = Index;