import React, {Component} from 'react';

const asyncComp = (importComp) => {
    return class extends Component{
        state = {
            comp: null
        };

        componentDidMount(){
            importComp().then(cmp => {
                this.setState({comp: cmp.default})
            });
        }

        render(){
            const C = this.state.comp;
            return C ? <C {...this.props}/> : null;
        };
    }
};

export default asyncComp;

