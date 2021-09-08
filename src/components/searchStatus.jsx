import React from 'react';

const SearchStatus = (length) => {
    let number = length;
    if (number === 0) {
      return (
        <h1 className="badge bg-danger" style={{ fontSize: "20px" }}>
          Никто с тобою не тусанет
        </h1>
      );
    } else if (number <= 4 && number >= 2) {
      return (
        <h1 className="badge bg-primary" style={{ fontSize: "20px" }}>
          {number} человека тусанут с тобою сегодня
        </h1>
      );
    } else {
      return (
        <h1 className="badge bg-primary" style={{ fontSize: "20px" }}>
          {number} человек тусанет с тобою сегодня
        </h1>
      );
    } 
}
 
export default SearchStatus;