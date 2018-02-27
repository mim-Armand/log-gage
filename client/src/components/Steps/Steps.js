//@flow
import React, { Component } from 'react';
import './Steps.css';
import Btn01 from "../Btn_01/Btn_01";

type Props = {
    foo: number,
};
type State = {
    bar: number,
};

class Steps extends Component<Props, State> {
    constructor(props){
        super(props);
        this.stepClick = this.stepClick.bind(this);
    }
    stepClick(newRoute){
        console.log('Step Click ... <<<', newRoute)
        console.log('this.props', this)
        this.props.history.push(newRoute)
    }
  render() {
      const steps = [
          {icon:"cog", route:"setup"},
          {icon:"bolt", route:"search"},
          {icon:"info", route:"info"}
          ];
    return (
      <div className="steps-container">
          {
              steps.map((item)=>{
                  return(
                      <div className="steps-step" key={item.route}>
                          <Btn01 icon={item.icon} route={item.route} click={this.stepClick}/>
                      </div>
                  )
              })
          }
      </div>
    );
  }
}

export default Steps;
