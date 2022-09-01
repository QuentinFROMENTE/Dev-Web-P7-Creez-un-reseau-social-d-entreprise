import Quote from './Quote';

function Thread (props) {
    const thread = props.thread;
    return (thread.map((quote) => <Quote quote={quote} key={quote._id}/> ));
}

export default Thread