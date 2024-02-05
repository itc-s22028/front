import React, { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch('http://localhost:3002/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                mode: 'cors',
                body: JSON.stringify({ name, password }),
            });

            if (!response.ok) {
                throw new Error('ログインに失敗しました');
            }

            // ログイン成功時の処理
            const data = await response.json();
            console.log('ログイン成功', data);


            // ここで適切なページへのリダイレクトや状態の更新を行う

        } catch (error) {
            console.error('ログインエラー:', error);
            // ログイン失敗時の処理をここに追加
        }
    };

    return (
        <>
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default LoginPage;
