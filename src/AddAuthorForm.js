import React from 'react';
import'./AddAuthorForm.css';

class AuthorForm extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            name: '',
            imageUrl: ''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
    }
    onFieldChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render () {
       return <form>
                <div className='AddAuthorForm_input'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={this.state.name} onChange={this.onFieldChange}/>
                </div>
                <div className='AddAuthorForm_input'>
                    <label htmlFor='imageUrl'>Image Url</label>
                    <input type='text' name='imageUrl' value={this.state.imageUrl} onChange={this.onFieldChange}/>
                </div>
            </form>
    }
}


function AddAuthorForm({match}) {
    return <div className='AddAuthorForm'>
        <h1>Add Author</h1>
        <AuthorForm/>
    </div>;
}

export default AddAuthorForm;