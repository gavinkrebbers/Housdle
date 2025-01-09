export default function PopUp({ onClose, draw, winner }) {
  if (draw) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            You drew the Game
          </h2>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  //the player lost

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Congratulationgs
        </h2>
        <p className="mb-6 text-xl text-gray-700">{winner} won the game!</p>
        <button
          onClick={onClose}
          className="w-full px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
