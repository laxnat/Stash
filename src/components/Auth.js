import React, {useState} from 'react';
import {auth} from '../firebase';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIN = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
            console.log('Successfully Signed in');
        } catch (error) {
            console.error('Error Signing In:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            console.log('Signed out successfully');
        } catch (error) {
            console.error('Error Signing Out:', error);
        }
    };

    return (
        <div>
            <h2>Authentication</h2>
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button onClick={handleSignIN}>Sign In</button>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
    );
}

export default Auth;