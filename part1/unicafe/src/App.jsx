import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
)}

const StatisticsLine = ({text, value}) =>{ 
  return(
    <>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr> 
  </>
  )
}

  
  


const Statistics = ({good, neutral, bad, total, average, positiveComments}) =>{

if (total > 0){
  return (
    <>
      <table>
        <tbody>
         <StatisticsLine text='good' value={good} /> 
         <StatisticsLine text='neutral' value={neutral} /> 
         <StatisticsLine text='bad' value={bad} /> 
         <StatisticsLine text='all' value={total} /> 
         <StatisticsLine text='average' value={average} /> 
         <StatisticsLine text='positive' value={positiveComments * 100 + ' %'} />
         </tbody>
      </table>
    </>

  )
} 
  return (
    <>
    <p>No feedback given</p>
    </>
  )
  
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positiveComments, setPositiveComments] = useState(0);


  const handleGoodButton = ()=> {
    const updatedGood = good+1;
    setGood(updatedGood); 
    
    const updatedTotal = updatedGood + neutral + bad;
    setTotal(updatedTotal);
    
    const updatedAverage = (updatedGood-bad)/updatedTotal;
    setAverage(updatedAverage);

    const updatedPositiveComments = (updatedGood / updatedTotal);
    setPositiveComments(updatedPositiveComments);
  }
  
  const handleNeutralButton = ()=>{
    const updatedNeutral = neutral +1;
    setNeutral(updatedNeutral);
    
    const updatedTotal = good + updatedNeutral + bad;
    setTotal(updatedNeutral);
    
    const updatedAverage = (good-bad)/updatedTotal;
    setAverage(updatedAverage);

    const updatedPositiveComments = (good/ updatedTotal);
    setPositiveComments(updatedPositiveComments);
  }
  
  const handleBadButton = ()=> {
    const updatedBad = bad +1;
    setBad(updatedBad );
    const updatedTotal = good + neutral + updatedBad;
    setTotal(updatedTotal);
    const updatedAverage = (good-updatedBad)/updatedTotal;
    setAverage(updatedAverage);

    const updatedPositiveComments = (good/ updatedTotal);
    setPositiveComments(updatedPositiveComments);
    
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodButton} text='good'  />
      <Button handleClick={handleNeutralButton} text='neutral' />
      <Button handleClick={handleBadButton} text='bad' />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positiveComments={positiveComments}
        />

     
    </div>
  )
}

export default App;