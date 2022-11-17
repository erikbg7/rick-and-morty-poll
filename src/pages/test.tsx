import React from 'react';

const TestPage = () => {
  const getNum = async () => {
    const res = await fetch('/api/test');
    const data = await res.json();
    console.log({ data });
  };

  const postNum = async () => {
    const res = await fetch('/api/test', {
      method: 'POST',
    });
    const data = await res.json();
    console.log({ data });
  };

  return (
    <div>
      <div>
        <button onClick={() => getNum()}>Get</button>
      </div>
      <div>
        <button onClick={() => postNum()}>Post</button>
      </div>
    </div>
  );
};

export default TestPage;
