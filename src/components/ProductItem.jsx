import React from 'react';

function ProductItem(props) {
  function handleClick() {
    alert(props.name + ' has been added to your cart!');
  }

  return <button onClick={handleClick} name={props.extra}>{props.name}</button>;
}

export default ProductItem;