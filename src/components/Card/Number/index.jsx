import React, { useState, useEffect } from 'react'
import './Number.scss'

function CardNumber({ title, desc }) {
    
    return (
        <>
        <div className='card__container'>
            <div className='card_left'>
                <p className='card__title'>{title}</p>
                <p className='card__desc'>
                    Number of {desc}
                </p>
            </div>
            <div className='card__right'>
                <button className='card__btn'>
                    <img src='icons/navigate_next.svg' alt='icons' />
                </button>
            </div>
        </div>
        </>
    )
}

export default CardNumber