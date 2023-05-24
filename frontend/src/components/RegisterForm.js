import React, { useState } from 'react';

export const RegisterForm = () => {
    return (
        <div>
            <h1>Hej hej hej!</h1>
            <form>
                <label>Enter username
                    <input 
                    type="text"                
                    />
                </label>
                <label>Enter password
                    <input
                    type="text"
                    />
                </label>


            </form>
        </div>
    )
}