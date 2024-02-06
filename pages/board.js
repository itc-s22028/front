import { useState, useEffect } from 'react';

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
                    <h1>Boards</h1>
                    <div>
                        <div>
                            {boardData && boardData.length > 0 ? (
                                <ul>
                                    {boardData.map((message, index) => (
                                        <li key={index}>
                                            {message.account.name}
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
