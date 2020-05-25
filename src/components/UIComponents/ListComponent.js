import React from 'react';

const ListComponent = (props) => {
  return (
    <div className="list-container">
      { props.data.map(item => (
          <span>{item.data}</span>
      ))}
    </div>
  )
}

export default ListComponent;
