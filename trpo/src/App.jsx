/* eslint-disable react/prop-types */
import { useState } from 'react';
import './WaterDispenser.css';

const WaterDispenser = () => {
  const [bottleInstalled, setBottleInstalled] = useState(false);
  const [cardInserted, setCardInserted] = useState(false);
  const [waterSelected, setWaterSelected] = useState(false);
  const [isPouring, setIsPouring] = useState(false);
  const [waterFilled, setWaterFilled] = useState(false);
  const [waterLevel, setWaterLevel] = useState(0); // Уровень воды (0-100)
  const [message, setMessage] = useState('Пожалуйста, установите бутыль.');

  const handleInstallBottle = () => {
    setBottleInstalled(true);
    
    setMessage('Бутыль установлена. Вставьте карту.');
  };

  const handleInsertCard = () => {
    if (bottleInstalled) {
      setCardInserted(true);
      setMessage('Карта вставлена. Выберите воду.');
    } else {
      setMessage('Сначала установите бутыль!');
    }
  };

  const handleSelectWater = () => {
    if (cardInserted) {
      setWaterSelected(true);
      setMessage('Вода выбрана. Начинаем заливку.');
      handleStartPouring();
    } else {
      setMessage('Пожалуйста, вставьте карту.');
    }
  };

  const handleStartPouring = () => {
    setIsPouring(true);
    let currentLevel = 0;
    
    const pouringInterval = setInterval(() => {
      currentLevel += 10; // Увеличиваем уровень воды на 10% каждые 500мс
      setWaterLevel(currentLevel);
      
      if (currentLevel >= 100) {
        clearInterval(pouringInterval);
        setIsPouring(false);
        setWaterFilled(true);
        setMessage('Вода залита! Заберите бутыль.');
      }
    }, 500);
  };

  const handleReset = () => {
    setBottleInstalled(false);
    setCardInserted(false);
    setWaterSelected(false);
    setIsPouring(false);
    setWaterFilled(false);
    setWaterLevel(0); // Сбрасываем уровень воды
    setMessage('Пожалуйста, установите бутыль.');
  };

  return (
    <div className="dispenser">
      <h1>Терминал розлива воды</h1>
      <div className="dispenser-body">
        <DisplayScreen message={message} />
        <InteractiveElements 
          bottleInstalled={bottleInstalled} 
          cardInserted={cardInserted} 
          waterSelected={waterSelected}
          isPouring={isPouring}
          waterFilled={waterFilled}
          waterLevel={waterLevel} // Передаем уровень воды
          onInstallBottle={handleInstallBottle} 
          onInsertCard={handleInsertCard}
          onSelectWater={handleSelectWater}
          onReset={handleReset}
        />
      </div>
    </div>
  );
};

const DisplayScreen = ({ message }) => {
  return (
    <div className="display-screen">
      <p>{message}</p>
    </div>
  );
};

const InteractiveElements = ({ 
  bottleInstalled, cardInserted, waterSelected, isPouring, waterFilled, waterLevel, 
  onInstallBottle, onInsertCard, onSelectWater, onReset 
}) => {
  return (
    <div className="interactive-elements">
      <div className="bottle-area" onClick={onInstallBottle}>
          {
            bottleInstalled ? (
              <div className={`bottle-area-div ${bottleInstalled ? 'show' : ''}`}>
                <div className="neck"></div>
                <div className='bottle'>
                  <div className="water" style={{ height: `${waterLevel}%` }}></div>
                </div>
              </div>
            ) : (
              null
            )
          }
        
      </div>
      <div className="card-slot">
        <div className={`card ${cardInserted ? 'inserted' : ''}`} onClick={onInsertCard}></div>
      </div>
      <div className="water-selection">
        {!waterSelected && cardInserted && (
          <button className="select-water-btn" onClick={onSelectWater}>Выбрать воду</button>
        )}
      </div>
      <div className="pouring-area">
        {isPouring && <div className="pouring-animation">Заливается вода...</div>}
        {waterFilled && <button className="reset-btn" onClick={onReset}>Забрать бутыль и сбросить</button>}
      </div>
    </div>
  );
};

export default WaterDispenser;
