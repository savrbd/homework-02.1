import React from "react";
const Qualitie = ({color, name,id}) => {
    let classes = `badge bg-${color} m-1`;
            return (
              <span className={classes} key={id}>
                {name}
              </span>
            );
          
};

export default Qualitie;
