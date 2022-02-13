import React from 'react'
import Router from 'next/router'


 const HigherOrderComponent = WrappedComponent => {
  class HOC extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          buttons: []
        };
      }

      componentDidMount() {
        if(typeof window !== 'undefined' && !localStorage.getItem('token')){
            Router.push('/')
        }
      }

     
    render() {
      return typeof window !== 'undefined' && localStorage && localStorage.getItem('token') ?  <WrappedComponent {...this.props} /> : ''
    }
  }
  return HOC

}

export default HigherOrderComponent

