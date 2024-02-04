import { useState } from 'react';
import styles from '../styles/login.module.css';


const Home = ({ frontData }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const sendData = async () => {
        try {
            const response = await fetch('http://localhost:3002/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, password }),
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    };

    return (
        <div>
            <h2>{frontData.data.title}</h2>
            <div className={styles.container}>
                <h2 className={styles.LogTitle}>{frontData.data.content}</h2>
                <div className={styles.form}>
                    <div className={styles.input_group}>
                        <label className={styles.label} >Name:</label>
                        <input type="text" value={name} className={styles.input} onChange={handleNameChange}/>
                    </div>
                    <div>
                        <label className={styles.label} >Password:</label>
                        <input type="password" value={password} className={styles.input} onChange={handlePasswordChange}/>
                    </div>
                    <button onClick={sendData} className={styles.button}>{frontData.data.content}</button>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps() {
    try {
        const response = await fetch('http://localhost:3002/users/signup');
        const frontData = await response.json();

        return {
            props: {frontData},
        };
    } catch (error) {
        console.error('エラーが発生しました:', error);
        return {
            props: {frontData: null},
        };
    }
}

export default Home;
