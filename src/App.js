import React, { useState } from 'react';
import PriceModal from './PriceModal';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  return (
    <div className="App">
      <button onClick={toggleModal}>Open Modal</button>
      <PriceModal isOpen={modalIsOpen} toggleModal={toggleModal} />
    </div>
  );
}

export default App;
