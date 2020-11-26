import React from "react";


export default function Loading(props) {
  switch(props.size){
      case 'sm':
          return <div className="dot-windmill" style={{fontSize: '10px'}} />
          break;
      case 'md':
          return <div className="dot-windmill" style={{fontSize: '20px'}} />
          break;
      case 'large':
          return <div className="dot-windmill" style={{fontSize: '20px'}} />
          break;
      default:
          return <div className="dot-windmill" />
          break;            
  }  
}
