import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useUser } from './UserContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { user, login, logout } = useUser();

    const handleLoginAxios = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:3030/users/login', data, { withCredentials: true });
            console.log(response.data);

            if (response.data.message === 'OK') {
                // ログイン成功時にユーザー情報をコンテキストに保存
                login(response.data.user);
                router.push('/home');
            } else {
                // ログイン失敗時の処理
                console.log("ログイン失敗しました。");
            }
        } catch (error) {
            // エラー処理
            console.error('ログイン時のエラー:', error);
        }
    };

    const handleLogout = async () => {
        try {
            // ログアウト処理
            await axios.get('http://localhost:3030/users/logout');
            // ユーザー情報をクリア
            logout();
            router.push('/');
        } catch (error) {
            // エラー処理
            console.error('ログアウト時のエラー:', error);
        }
    };

    return (
        <>
            {user ? (
                <div>
                    <p>ログイン中: {user.name}</p>
                    <button onClick={handleLogout}>ログアウト</button>
                </div>
            ) : (
                <form onSubmit={handleLoginAxios}>
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
            )}
        </>
    );
};

export default LoginPage;
