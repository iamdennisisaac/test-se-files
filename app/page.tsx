"use client";
import { useState, useEffect, useRef } from "react";
import * as flubber from "flubber";

export default function Home() {
  //generate 4 random circles in the middle of the screen

  const facePaths: { [key: string]: { paths: { [key: string]: string } } } = {
    ugh: {
      paths: {
        lefteye:
          "M33 55.5C33 60.1944 36.8056 64 41.5 64C46.1944 64 50 60.1944 50 55.5C50 50.8056 46.1944 47 41.5 47C46 53.5 41.5 60 33 55.5Z",
        righteye:
          "M92 55.5C92 60.1944 88.1944 64 83.5 64C78.8056 64 75 60.1944 75 55.5C75 50.8056 78.8056 47 83.5 47C79 53.5 83.5 60 92 55.5Z",
        mouth:
          "M46.9475 89.3371C46.3998 90.1654 46 91.3077 46 93H38C38 89.9584 38.7475 87.2338 40.2745 84.9245C41.7882 82.6353 43.9015 81.0048 46.2452 79.8572C50.8008 77.6265 56.6832 77 62.5 77H83V85H62.5C56.995 85 52.6274 85.6397 49.7634 87.042C48.3974 87.7109 47.5085 88.4887 46.9475 89.3371Z",
      },
    },
    angry: {
      paths: {
        lefteye:
          "M50 55.5C50 58.0969 48.8354 60.4218 47 61.981C45.5176 63.2403 43.5975 64 41.5 64C38.8925 64 36.5592 62.8259 35 60.9775C33.7521 59.4982 33 57.5869 33 55.5C33 53.4131 33.7521 51.5018 35 50.0225C36.5592 48.1741 38.8925 47 41.5 47C41.5 49.3697 42.5108 51.4024 44 52.8853C45.6531 54.5314 47.8957 55.5 50 55.5Z",
        righteye:
          "M75 55.5C75 58.0969 76.1646 60.4218 78 61.981C79.4824 63.2403 81.4025 64 83.5 64C86.1075 64 88.4408 62.8259 90 60.9775C91.2479 59.4982 92 57.5869 92 55.5C92 53.4131 91.2479 51.5018 90 50.0225C88.4408 48.1741 86.1075 47 83.5 47C83.5 49.3697 82.4892 51.4024 81 52.8853C79.3469 54.5314 77.1043 55.5 75 55.5Z",
        mouth:
          "M62.5 83C58.0591 83 54.1139 84.2932 51.2093 86.2941C47.778 88.6578 46 91.8231 46 95H38C38 88.6193 41.5905 83.2058 46.671 79.7059C50.994 76.7279 56.5428 75 62.5 75C67.6164 75 72.4226 76.2739 76.4107 78.5116C82.4978 81.9271 87 87.8368 87 95H79C79 91.453 76.7607 87.8813 72.496 85.4884C69.7543 83.95 66.3048 83 62.5 83Z",
      },
    },
    ok: {
      paths: {
        lefteye:
          "M50 55.5C50 57.8409 49.0537 59.9608 47.5228 61.498C45.9836 63.0435 43.8535 64 41.5 64C38.8925 64 36.5592 62.8259 35 60.9775C33.7521 59.4982 33 57.5869 33 55.5C33 53.4462 33.7284 51.754 34.9409 50.5C36.5 48.8877 38.8594 48 41.5 48C43.8535 48 45.9836 48.7052 47.5228 50C49.0537 51.2879 50 53.1591 50 55.5Z",
        righteye:
          "M92 55.5C92 57.8409 91.0537 59.9608 89.5228 61.498C87.9836 63.0435 85.8535 64 83.5 64C80.8925 64 78.5592 62.8259 77 60.9775C75.7521 59.4982 75 57.5869 75 55.5C75 53.4462 75.7284 51.754 76.9409 50.5C78.5 48.8877 80.8594 48 83.5 48C85.8535 48 87.9836 48.7052 89.5228 50C91.0537 51.2879 92 53.1591 92 55.5Z",
        mouth:
          "M81.625 78.9995L75.25 79.0995L68.875 78.9995L62.5 79.0995L56.125 78.9995L49.7186 79.1H43.4064L37.0627 79.0005L36.9373 86.9995L43.3436 87.1H49.7814L56.125 87.0005L62.5 87.1005L68.875 87.0005L75.25 87.1005L81.625 87.0005L87.9373 87.0995L88.0627 79.1005L81.625 78.9995Z",
      },
    },
    happy: {
      paths: {
        lefteye:
          "M50 55.5C50 60.1944 46.1944 64 41.5 64C36.8056 64 33 60.1944 33 55.5C33 50.8056 36.8056 48 41.5 48C46.1944 48 50 50.8056 50 55.5Z",
        righteye:
          "M92 55.5C92 60.1944 88.1944 64 83.5 64C78.8056 64 75 60.1944 75 55.5C75 50.8056 78.8056 48 83.5 48C88.1944 48 92 50.8056 92 55.5Z",
        mouth:
          "M62.5 101C47.1672 101 33 91.1055 33 77H41C41 84.9859 49.6662 93 62.5 93C75.3338 93 84 84.9859 84 77H92C92 91.1055 77.8328 101 62.5 101Z",
      },
    },
  };

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [leftEyePath, setLeftEyePath] = useState(facePaths.ugh.paths.lefteye);
  const [rightEyePath, setRightEyePath] = useState(
    facePaths.ugh.paths.righteye
  );
  const [mouthPath, setMouthPath] = useState(facePaths.ugh.paths.mouth);
  const [selectedFace, setSelectedFace] = useState("ugh");
  const [nextFace, setNextFace] = useState("ugh");
  const [direction, setDirection] = useState("left");
  const navRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState(0);
  const [emotions, setEmotions] = useState(["ok", "ugh", "happy"]);

  const faceMap: { [key: number]: string } = {
    0: "ugh",
    90: "ok",
    180: "angry",
    270: "happy",
  };
  const buttonColorMap: { [key: string]: string } = {
    happy: "bg-gradient-to-r from-teal-400 to-emerald-500",
    angry: "bg-gradient-to-r from-red-500 to-red-300",
    ugh: "bg-gradient-to-r from-yellow-400 to-amber-500",
    ok: "bg-gradient-to-r from-sky-400 to-blue-500",
  };
  const [prevX, setPrevX] = useState(0);
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true);
      setStartX(event.clientX);
      setPrevX(event.clientX); // Initialize prevX
      if (dragRef.current) {
        navRef.current.style.transition = "none"; // Disable transition during drag
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - prevX; // Calculate delta based on prevX
        setDirection(deltaX > 0 ? "right" : "left");
        const newRotation = rotation + deltaX / 4; // Adjust the divisor to control sensitivity
        setRotation(newRotation);
        setPrevX(event.clientX); // Update prevX
        setPosition(rotation * 4); // Update position

        // Determine next face based on rotation direction
        const nextFace = determineNextFace(deltaX, selectedFace);
        setNextFace(nextFace);

        // Throttle updates using requestAnimationFrame
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(() => {
            morphPaths(nextFace, newRotation);
            animationFrameId = null;
          });
        }
      }
    };
    const ROTATION_THRESHOLD = 10; // Define a threshold value
    const handleMouseUp = (event: MouseEvent) => {
      setIsDragging(false);
      const direction = event.clientX > startX ? "right" : "left";
      setEmotions((prevEmotions) => {
        const newEmotions = [...prevEmotions];
        return rotateArray(newEmotions, direction);
      });
      finalizeRotation();

      setPosition(0); // Reset position
    };

    const determineNextFace = (deltaX: number, currentFace: string) => {
      if (deltaX > 0) {
        if (currentFace === "ugh") return "ok";
        if (currentFace === "ok") return "angry";
        if (currentFace === "happy") return "ugh";
        if (currentFace === "angry") return "happy";
      } else {
        if (currentFace === "ugh") return "happy";
        if (currentFace === "ok") return "ugh";
        if (currentFace === "happy") return "angry";
        if (currentFace === "angry") return "ok";
      }
      return currentFace;
    };

    const morphPaths = (nextFace: string, newRotation: number) => {
      const leftEyeInterpolator = flubber.interpolate(
        leftEyePath,
        facePaths[nextFace].paths.lefteye
      );
      const rightEyeInterpolator = flubber.interpolate(
        rightEyePath,
        facePaths[nextFace].paths.righteye
      );
      const mouthInterpolator = flubber.interpolate(
        mouthPath,
        facePaths[nextFace].paths.mouth
      );

      const t = Math.min(Math.abs(newRotation % 90) / 90, 1); // Normalize time to range [0, 1]
      setLeftEyePath(leftEyeInterpolator(t));
      setRightEyePath(rightEyeInterpolator(t));
      setMouthPath(mouthInterpolator(t));
    };

    const finalizeRotation = () => {
      setRotation((prev) => {
        const roundedRotation = Math.round(prev / 90) * 90;
        const normalizedRotation = ((roundedRotation % 360) + 360) % 360; // Normalize to 0-359 range
        const selectedFace = faceMap[normalizedRotation];
        setSelectedFace(selectedFace);

        if (navRef.current) {
          navRef.current.style.transition = "transform 0.5s ease-in-out"; // Enable transition for smooth animation
        }

        // Smoothly morph back to the original face
        const leftEyeInterpolator = flubber.interpolate(
          leftEyePath,
          facePaths[selectedFace].paths.lefteye
        );
        const rightEyeInterpolator = flubber.interpolate(
          rightEyePath,
          facePaths[selectedFace].paths.righteye
        );
        const mouthInterpolator = flubber.interpolate(
          mouthPath,
          facePaths[selectedFace].paths.mouth
        );

        let t = 0;
        const duration = 500; // Duration of the transition in milliseconds
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          t = Math.min((currentTime - startTime) / duration, 1); // Calculate the interpolation factor
          setLeftEyePath(leftEyeInterpolator(t));
          setRightEyePath(rightEyeInterpolator(t));
          setMouthPath(mouthInterpolator(t));

          if (t < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);

        return roundedRotation;
      });
    };

    const navElement = dragRef.current;
    if (navElement) {
      navElement.addEventListener("mousedown", handleMouseDown);
    }
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      if (navElement) {
        navElement.removeEventListener("mousedown", handleMouseDown);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [
    isDragging,
    startX,
    rotation,
    selectedFace,
    leftEyePath,
    rightEyePath,
    mouthPath,
    emotions,
    rotation,
  ]);

  const rotateArray = (array: any[], direction: "left" | "right"): any[] => {
    if (direction === "right") {
      if (array[1] === "ugh") {
        return ["sad", "ok", "urg"];
      } else if (array[1] === "ok") {
        return ["happy", "sad", "ok"];
      } else if (array[1] === "sad") {
        return ["urg", "happy", "sad"];
      } else {
        return ["ok", "urg", "happy"];
      }
    } else if (direction === "left") {
      if (array[1] === "ugh") {
        return ["urg", "happy", "sad"];
      } else if (array[1] === "ok") {
        return ["ok", "urg", "happy"];
      } else if (array[1] === "sad") {
        return ["sad", "ok", "urg"];
      } else {
        return ["happy", "sad", "ok"];
      }
    }
    return array;
  };
  const [circles, setCircles] = useState<
    { top: number; left: number; color: string; size: number }[]
  >([]);

  useEffect(() => {
    const generateRandomCircles = () => {
      const colors = [
        "bg-red-300/50",
        "bg-emerald-300/50",
        "bg-blue-300/50",
        "bg-yellow-300/50",
      ];
      const newCircles = [];
      for (let i = 0; i < 6; i++) {
        const top = Math.random() * 50 + 25; // Random position between 25% and 75% vertically
        const left = Math.random() * 50 + 25; // Random position between 25% and 75% horizontally
        const size = Math.random() * 240 + 120; // Random size between 120px and 240px
        newCircles.push({ top, left, color: colors[i % 4], size });
      }
      setCircles(newCircles);
    };

    generateRandomCircles();
  }, []);
  return (
    <main className="flex min-h-screen h-auto flex-col items-center justify-between p-24">
      {circles.map((circle, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${circle.color}`}
          style={{
            top: `${circle.top}%`,
            left: `${circle.left}%`,
            width: `${circle.size}px`,
            height: `${circle.size}px`,
          }}
        ></div>
      ))}
      <div className="relative w-[360px] h-[720px] bg-white border border-black overflow-hidden flex-flex-col items-center justify-center">
        <div className="flex justify-between p-2">
          <div className="text-sm ">{currentTime}</div>
          <svg
            width="79"
            height="13"
            viewBox="0 0 79 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.35"
              x="51.5"
              y="0.5"
              width="24"
              height="12"
              rx="3.8"
              stroke="black"
            />
            <path
              opacity="0.4"
              d="M77 4.78113V8.8566C77.8047 8.51143 78.328 7.70847 78.328 6.81886C78.328 5.92926 77.8047 5.1263 77 4.78113"
              fill="black"
            />
            <rect x="53" y="2" width="21" height="9" rx="2.5" fill="black" />
            <path
              d="M35.2705 3.10404C37.7576 3.10414 40.1496 4.02623 41.9521 5.67971C42.0879 5.80736 42.3048 5.80575 42.4385 5.6761L43.736 4.41263C43.8037 4.34687 43.8414 4.25779 43.8409 4.16511C43.8403 4.07243 43.8015 3.98379 43.733 3.91879C39.002 -0.455923 31.5383 -0.455923 26.8073 3.91879C26.7387 3.98374 26.6999 4.07235 26.6992 4.16504C26.6986 4.25772 26.7363 4.34682 26.8039 4.41263L28.1018 5.6761C28.2354 5.80595 28.4525 5.80756 28.5881 5.67971C30.3909 4.02612 32.7832 3.10403 35.2705 3.10404ZM35.2672 7.32431C36.6245 7.32423 37.9334 7.83597 38.9395 8.7601C39.0756 8.89125 39.2899 8.88841 39.4226 8.75369L40.7099 7.43438C40.7777 7.36518 40.8153 7.2713 40.8143 7.17375C40.8133 7.0762 40.7738 6.98312 40.7047 6.91533C37.6408 4.02448 32.8961 4.02448 29.8323 6.91533C29.7631 6.98312 29.7236 7.07625 29.7227 7.17383C29.7218 7.27141 29.7595 7.36528 29.8274 7.43438L31.1143 8.75369C31.247 8.88841 31.4614 8.89125 31.5974 8.7601C32.6029 7.83658 33.9107 7.32488 35.2672 7.32431ZM37.7916 10.1179C37.7935 10.2232 37.7565 10.3248 37.6892 10.3986L35.5125 12.8533C35.4487 12.9255 35.3617 12.9661 35.2709 12.9661C35.1802 12.9661 35.0932 12.9255 35.0294 12.8533L32.8523 10.3986C32.7851 10.3247 32.7481 10.2231 32.7501 10.1178C32.7521 10.0124 32.7929 9.91267 32.8629 9.84205C34.253 8.52816 36.2889 8.52816 37.679 9.84205C37.7489 9.91272 37.7897 10.0125 37.7916 10.1179Z"
              fill="black"
            />
            <path
              d="M19.2 1.68205C19.2 1.04901 18.7224 0.535828 18.1333 0.535828H17.0667C16.4776 0.535828 16 1.04901 16 1.68205V11.616C16 12.2491 16.4776 12.7622 17.0667 12.7622H18.1333C18.7224 12.7622 19.2 12.2491 19.2 11.616V1.68205ZM11.7659 2.98111H12.8326C13.4217 2.98111 13.8992 3.50661 13.8992 4.15485V11.5885C13.8992 12.2367 13.4217 12.7622 12.8326 12.7622H11.7659C11.1768 12.7622 10.6992 12.2367 10.6992 11.5885V4.15485C10.6992 3.50661 11.1768 2.98111 11.7659 2.98111ZM7.43411 5.63016H6.36745C5.77834 5.63016 5.30078 6.16235 5.30078 6.81884V11.5736C5.30078 12.23 5.77834 12.7622 6.36745 12.7622H7.43411C8.02322 12.7622 8.50078 12.23 8.50078 11.5736V6.81884C8.50078 6.16235 8.02322 5.63016 7.43411 5.63016ZM2.13333 8.07545H1.06667C0.477563 8.07545 0 8.60004 0 9.24715V11.5905C0 12.2377 0.477563 12.7622 1.06667 12.7622H2.13333C2.72244 12.7622 3.2 12.2377 3.2 11.5905V9.24715C3.2 8.60004 2.72244 8.07545 2.13333 8.07545Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="text-center p-12">
          <h3>How was your experience with us?</h3>
        </div>
        <div className="flex flex-col morph section justify-center items-center m-24 mt-0">
          <svg width="240" height="240" viewBox="10 20 100 100">
            <path
              d={leftEyePath}
              fill={
                selectedFace === "ugh"
                  ? "#eab308"
                  : selectedFace === "ok"
                  ? "blue"
                  : selectedFace === "angry"
                  ? "red"
                  : "#10b981"
              }
            />
            <path
              d={rightEyePath}
              fill={
                selectedFace === "ugh"
                  ? "#eab308"
                  : selectedFace === "ok"
                  ? "blue"
                  : selectedFace === "angry"
                  ? "red"
                  : "#10b981"
              }
            />
            <path
              d={mouthPath}
              fill={
                selectedFace === "ugh"
                  ? "#eab308"
                  : selectedFace === "ok"
                  ? "blue"
                  : selectedFace === "angry"
                  ? "red"
                  : "#10b981"
              }
            />
          </svg>

          <div className="uppercase text-xl slide-in font-bold">
            <div
              className="flex justify-center text-center "
              style={{
                transform: `translateX(${position % 360}px)`,
              }}
            >
              {emotions.map((emotion, index) => (
                <p key={index} className="text-2xl w-[360px] font-bold">
                  {emotion}
                </p>
              ))}
            </div>
          </div>
        </div>
        <nav
          ref={navRef}
          className="absolute circle-menu w-[400px] h-[400px] bottom-[-200px] m-auto left-[-40px] right-[-40px]"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="absolute flex items-center justify-center rounded-full left-[100px] top-[100px] w-[200px] h-[200px] bg-white z-10"></div>
          <ul className="absolute rounded-full bg-green-300 w-[400px] h-[400px] overflow-hidden">
            <li className="absolute w-[200px] h-[200px] origin-bottom-right overflow-hidden bg-gradient-to-r from-yellow-400 to-amber-500 rotate-[45deg]">
              <a href="#" className="icon-hubot"></a>
            </li>
            <li className="absolute w-[200px] h-[200px] origin-bottom-right overflow-hidden bg-gradient-to-r from-teal-300 to-emerald-400 rotate-[135deg]">
              <a href="#" className="icon-hourglass"></a>
            </li>
            <li className="absolute w-[200px] h-[200px] origin-bottom-right overflow-hidden bg-gradient-to-r from-red-500 to-red-300 rotate-[225deg]">
              <a href="#" className="icon-gist-secret">
                <span className="segment"></span>
              </a>
            </li>

            <li className="absolute w-[200px] h-[200px] origin-bottom-right overflow-hidden bg-gradient-to-r from-sky-400 to-blue-500 bg-purple-200 rotate-[-45deg]">
              <a href="#" className="icon-light-bulb"></a>
            </li>
          </ul>
        </nav>
        <button
          className={`absolute mx-auto left-0 right-0 w-32 bottom-0 text-white px-4 py-2 mb-4 rounded-full ${buttonColorMap[selectedFace]} uppercase font-bold`}
        >
          Submit
        </button>
      </div>
      <div ref={dragRef} className="w-[600px] h-48 bottom-48 absolute "></div>
    </main>
  );
}
function setPath(arg0: any) {
  throw new Error("Function not implemented.");
}
