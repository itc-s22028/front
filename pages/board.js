import { useState, useEffect } from 'react';
import styles from '../styles/board.module.css';

const Boards = ({ messageData }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [boardData, setBoardData] = useState([]);

    useEffect(() => {
        // 仮の実装。実際には認証情報の確認が必要
        const userIsLoggedIn = true;

        if (!userIsLoggedIn) {
            console.log("login error");
        } else {
            // ログインしている場合は一覧データを取得
            fetchBoardData();
            setIsLoggedIn(true);
        }
    }, []);

    const formatDateTime = (datetimeString) => {
        return new Intl.DateTimeFormat('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            // hour: '2-digit',
            // minute: '2-digit',
            timeZone: 'Asia/Tokyo'
        }).format(new Date(datetimeString));
    };


    const fetchBoardData = async () => {
        try {
            const response = await fetch('http://localhost:3002/board', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // 認証情報を含める
            });

            const data = await response.json();
            setBoardData(data.messages); // messages プロパティにアクセス

        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    };

    return (
        <div>
            {isLoggedIn && (
                <div>
                    <h1>メッセージ一覧</h1>
                    <div>
                        <div>
                            {boardData && boardData.length > 0 ? (
                                <ul>
                                    {boardData.map((message, index) => (
                                        <li key={index} className={styles.boardli}>
                                            <div className={styles.userdates}>
                                                <h1 className={styles.userName}>{message.account.name}</h1>
                                                <p　style={{ opacity: 0.5 }}>accountId : {message.accountId}</p>
                                            </div>
                                            <div className={styles.content}>
                                                <p style={{borderRight: '1px solid black'}}>メッセージ作成日時: {formatDateTime(message.createdAt)}</p>
                                                <p style={{borderRight: '1px solid black'}}>メッセージ更新日時: {formatDateTime(message.updatedAt)}</p>
                                                <p style={{borderRight: '1px solid black'}}>アカウント作成日時: {formatDateTime(message.account.createdAt)}</p>
                                                <p>アカウント更新日時: {formatDateTime(message.account.updatedAt)}</p>
                                            </div>
                                            <p className={styles.text}>{message.text}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <h2>データがありません</h2>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Boards;
