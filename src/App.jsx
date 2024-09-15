import { useState, useEffect } from 'react'

import './App.css'
import Description from './components/Description/Description'
import Options from './components/Options/Options'
import Feedback from './components/Feedback/Feedback'
import Notification from './components/Notification/Notification'

function App() {
  const [feedback, setFeedback] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("feedback")) ?? {
        good: 0,
        neutral: 0,
        bad: 0,
      }
    );
  });

useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

const updateFeedback = (feedbackType) => {
    setFeedback(prev => ({
        ...prev, [feedbackType]: prev[feedbackType] + 1
    }));
}

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    })
  };

  const positivePercent = Math.round((feedback.good / totalFeedback) * 100)

  return (
    <>
      
        <Description/>
      <Options updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
      resetFeedback={resetFeedback}/>
      {totalFeedback > 0 ?
        (<Feedback feedback={feedback}
          totalFeedback={totalFeedback}
          positivePercent={positivePercent } />) : 
        (<Notification />)
}
    </>
  )
}

export default App
