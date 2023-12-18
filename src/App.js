import React, { useState } from 'react';
import PriceModal from './PriceModal';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  return (
    <div className="App p-10 flex justify-center">
      <button
        className="text-lg bg-blue-500 rounded-lg border-b-4 border-blue-600 focus:border-t-4 focus:border-b-0 focus:shadow-inner mx-auto p-4 font-bold text-white hover:bg-blue-400"
        onClick={toggleModal}
      >
        Open Price Modal
      </button>
      <PriceModal isOpen={modalIsOpen} toggleModal={toggleModal} />
    </div>
  );
}

export default App;
