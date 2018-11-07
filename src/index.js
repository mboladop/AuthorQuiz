import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';


const authors=[
    {
        name:'Mark Twain',
        imageUrl:'images/authors/marktwain.jpg',
        imageSource:'Wkimedia Commons',
        books: [
            'The Adventures of Huckleberry Finn',
            'Life on the Mississippi',
            'Roughing'
        ]
    },
    
    {
        name:'JK Rowling',
        imageUrl:'images/authors/jk.jpg',
        imageSource:'Wkimedia Commons',
        books: [
            'Harry Potter and the Philosophers Stone',
            'The Tales of Beedle the Bard',
            'Fantastic Beasts and Where to Find Them'
        ]
    },

    {
        name:'William Shakespeare',
        imageUrl:'images/authors/ws.jpg',
        imageSource:'Wkimedia Commons',
        books: [
            'Romeo and Juliette',
            'Macbeth',
            'The Merry Wives of Windsor'
        ]
    },
    {
        name:'Gloria Fuertes',
        imageUrl:'images/authors/gf.jpg',
        imageSource:'Wkimedia Commons',
        books: [
            'Songs for kids',
            'The months',
            'Ponytail the poet'
        ]
    },
    {
        name:'Ernest Hemingway',
        imageUrl:'images/authors/eh.jpg',
        imageSource:'Wkimedia Commons',
        books: [
            'The Torrents of Spring',
            'Islands in the Stream',
            'The Garden of Eden'
        ]
    },
    {
        name:'León Tolstói',
        imageUrl:'images/authors/lt.jpg',
        imageSource:'Wkimedia Commons',
        books: [
            'War & Peace',
            'Anna Karenina',
            'Resurrection'
        ]
    }
    
];

function getTurnData(authors){
    const allBooks = authors.reduce(function (p,c,i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
                author.books.some ((title) => 
                    title === answer)),
    }
}

function resetState() {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

let state = resetState();

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct': 'wrong';
    render();
}

// ----------wrappers---------

function App() {
    return <AuthorQuiz {...state} 
    onAnswerSelected={onAnswerSelected}
    onContinue = {() =>{
        state = resetState();
        render();
    }}/>;
}

const AuthorWrapper = withRouter( ({history}) =>
    <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
}}/>
);

function render() {
    ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App}/>
            <Route exact path="/add" component={AuthorWrapper}/>
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}
render();
registerServiceWorker();
