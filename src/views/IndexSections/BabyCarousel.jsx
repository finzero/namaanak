import React from "react";

import { UncontrolledCarousel } from "reactstrap";

const items = [
  
];

class BabyCarousel extends React.Component {

  componentDidMount(){
    for(var c=1; c<=12; c++){
      items.push(
        {
          src: require(`assets/img/baby-pict/baby${c}.jpg`),
          altText: '',
          caption: '',
          header: ''
        }
      )
    }
  }

  render() {
    return (
      <>
        <UncontrolledCarousel items={items} />
      </>
    );
  }
}

export default BabyCarousel;