import Housedle from "./Housedle";
function App() {
  const gradientBackgroundStyle = {
    backgroundImage: `
      radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%),
      radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%),
      radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%),
      radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%),
      radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%),
      radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%),
      radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%)`,
    filter: "blur(100px) saturate(150%)",
    opacity: 0.3,
  };

  return (
    <>
      <div className="fixed inset-0 z-[-1] overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0" style={gradientBackgroundStyle}></div>
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(229, 231, 235, 0.5)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="pt-20">
        <Housedle />
      </div>
    </>
  );
}

export default App;
