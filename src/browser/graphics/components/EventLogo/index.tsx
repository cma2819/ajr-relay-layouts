import React from 'react'
import Logo from '../../resources/logo_rect.png';

export const EventLogo = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${Logo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    />
  )
}