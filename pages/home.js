import React from 'react';
import { useRouter } from 'next/router';
import { useUser } from './UserContext';

const HomePage = () => {
    const router = useRouter();
    const { user, logout } = useUser();

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
        <div>
            {user ? (
                <div>
                    <p>ログイン中: {user.name}</p>
                    <button onClick={handleLogout}>ログアウト</button>
                </div>
            ) : (
                <p>ログインしていません</p>
            )}
        </div>
    );
};

export default HomePage;
