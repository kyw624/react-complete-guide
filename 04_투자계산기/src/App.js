import React, { useState } from 'react';

import Header from './components/Header';
import InvestForm from './components/InvestForm/InvestForm';
import InvestTable from './components/InvestTable/InvestTable';

function App() {
  const [datas, setDatas] = useState([]);

  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    const yearlyData = []; // per-year results

    let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    // 아래 코드는 연간 결과를 계산합니다 (총 저축액, 이자 등)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    // do something with yearlyData ...
    // yearlyData로 무언가를 하세요...
    setDatas(yearlyData);
  };

  return (
    <div>
      <Header />
      <InvestForm onCalculate={calculateHandler} setDatas={setDatas} />
      {datas.length !== 0 && <InvestTable datas={datas} />}
      {datas.length === 0 && (
        <p style={{ textAlign: 'center' }}>No Investment calculated yet.</p>
      )}
    </div>
  );
}

export default App;
