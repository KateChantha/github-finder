import React from 'react';
/**
 * conditon if there is no alert object, do not display Alert
 * type and msg pass up from Search to parent-App, then props down to Alert
 */
const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    )
  )
}

export default Alert;