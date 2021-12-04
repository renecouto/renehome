import React, {Component} from 'react';
import NavbarC from "../components/NavBarC";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const hello = require("../blogposts/hello.md");

interface IProps {
}

interface IState {
  terms: string;
}

export default class BlogPage extends Component<IProps,IState> {
    constructor(props: object) {
        super(props)
    
        this.state = { terms: "" }
    }

    componentDidMount() {
        fetch(hello.default).then((response) => response.text()).then((text) => {
            this.setState({ terms: text })
        })
    }

    render(){        
        const {terms} = this.state;
        console.log(terms);
        return (
            <div>
            <NavbarC/>
                <div className="prose">
                    <ReactMarkdown children={terms} remarkPlugins={[remarkGfm]}/>
                </div>                    
            </div>
        );
    }
}