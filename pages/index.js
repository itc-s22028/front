const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3030');
    if (!response.ok) {
      throw new Error('データの取得に失敗しました');
    }

    return await response.json();
  } catch (error) {
    console.error('データの取得エラー:', error);
    throw error; // エラーを再スローして呼び出し元で処理できるようにする
  }
};

const Home = ({ frontData }) => {
  if (frontData && frontData.messages && frontData.messages.length > 0) {
    return (
        <div>
          {frontData.messages.map((message) => (
              <h1 key={message.id}>{message.text}</h1>
          ))}
        </div>
    );
  } else {
    return <h1>データがありません</h1>;
  }
};


export async function getServerSideProps() {
  try {
    const response = await fetch('http://localhost:3030');
    if (!response.ok) {
      throw new Error('データの取得に失敗しました');
    }

    const frontData = await response.json();

    return {
      props: { frontData },
    };
  } catch (error) {
    console.error('エラーが発生しました:', error);
    return {
      props: { frontData: null },
    };
  }
}

export default Home;