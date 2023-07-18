import React, { useState } from 'react'
import './Navbar.scss'

function Navbar() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false)

  return (
    <div className="container__navbar">
        {
            !isBurgerOpen ? (
                <>
                <div className="left__navbar">
                    <div className="left__navbar__logo">
                        <h1>Your Game</h1>
                    </div>
                    <div className="left__navbar__search">
                        <form onSubmit={e => e.preventDefault()}>
                            <input type="search" placeholder="Search..." />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                    <div className="left__navbar__menu">
                        <ul>
                            <li>Home</li>
                            <li>Profile</li>
                            <li>Setting</li>
                        </ul>
                    </div>
                </div>
                <div className="right__navbar">
                    <div className="right__navbar__user__avatar">
                        <img src="icons/account_circle.svg" alt="avatar" />
                        <p className='right__navbar__user__name'>John Doe</p>
                    </div>
                    <div className="right__navbar__settings">
                        <img src="icons/settings_FILL.svg" alt="settings" />                
                    </div>
                </div>
                {/* <div className={"right__navbar__burger" + isBurgerOpen ? "close" : ""} onClick={() => setIsBurgerOpen(!isBurgerOpen)} >
                    <img src="icons/n" alt="burger" />
                </div> */}
                </>
            ) : (
                <>
                    <div className="burger__navbar">
                        <div className="burger__navbar__logo">
                            <h1>Text Emotion</h1>
                        </div>
                        <div className="burger__navbar__menu">
                            <ul>
                                <li>Home</li>
                                <li>Profile</li>
                                <li>Setting</li>
                            </ul>
                        </div>
                        <div className="burger__navbar__user__avatar">
                            <img src="https://i.pinimg.com/originals/0f/6d/8a/0f6d8a5b6b5b5b0b0b0b0b0b0b0b0b0b.jpg" alt="avatar" />
                            <p className='burger__navbar__user__name'>John Doe</p>
                        </div>
                        <div className="burger__navbar">
                            <img src="https://image.flaticon.com/icons/png/512/25/25694.png" alt="settings" />                
                        </div>
                        <div  onClick={() => setIsBurgerOpen(!isBurgerOpen)} >
                            <h1>Burger Close</h1>
                        </div>

                    </div>
                </>
            )
        }
    </div>
  )
}

export default Navbar