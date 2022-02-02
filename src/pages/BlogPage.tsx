import React, {Component} from 'react';
import NavbarC from "../components/NavBarC";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const allPosts = [
    require("../blogposts/python-sem-varzea-2.md"),
    require("../blogposts/python-sem-varzea-1.md"),
    require("../blogposts/loveletter-to-rust.md"),
    require("../blogposts/react-p5-lessons.md"),
    require("../blogposts/hello.md"),
];

interface IProps {
}

interface IState {
    posts: string[];
}

export default class BlogPage extends Component<IProps,IState> {
    constructor(props: object) {
        super(props)
    
        this.state = { posts: [""] }
    }

    componentDidMount() {
        const fetchedPosts = allPosts.map(y => fetch(y.default).then((response) => response.text()));
        Promise.all(fetchedPosts).then((text) => {
            this.setState({ posts: text })
        });
    }

    render(){        
        const {posts} = this.state;
        console.log(posts);
        const renderedPosts = posts.map(p => {
            return <div className="container mx-auto prose max-w-max border">
                            <ReactMarkdown children={p} className="container mx-auto max-w-none" remarkPlugins={[remarkGfm]}/>
                        </div>
        });
        return (
            <div>
            <NavbarC/>
                <div className="container mx-auto space-y-8">
                    
                    {renderedPosts}
                </div>
            </div>
        );
    }
}