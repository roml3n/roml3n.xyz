"use client";

import React, { useRef, useState } from "react";
import SpaceShooter404, {
  SpaceShooter404Handle,
  GameEndData,
} from "@/components/SpaceShooter404";
import Button from "@/app/components/Button";

export default function NotFound() {
  const gameRef = useRef<SpaceShooter404Handle | null>(null);
  const [gameState, setGameState] = useState<
    "initial" | "playing" | "gameOver" | "victory"
  >("initial");
  const [finalScore, setFinalScore] = useState(0);
  const [finalLevel, setFinalLevel] = useState(1);

  const handleStartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    gameRef.current?.start();
    setGameState("playing");
  };

  const handleRetryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    gameRef.current?.restart(true, false);
    setGameState("playing");
  };

  const handleNextLevelClick = (e: React.MouseEvent) => {
    e.preventDefault();
    gameRef.current?.restart(false, true);
    setGameState("playing");
  };

  const handleGameStart = React.useCallback(() => {
    setGameState("playing");
  }, []);

  const handleGameOver = React.useCallback((data: GameEndData) => {
    setFinalScore(data.score);
    setFinalLevel(data.level);
    setGameState("gameOver");
  }, []);

  const handleVictory = React.useCallback((data: GameEndData) => {
    setFinalScore(data.score);
    setFinalLevel(data.level);
    setGameState("victory");
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden">
      <div className="absolute top-[20px] left-0 right-0 mx-2 md:mx-4 h-[calc(100vh-100px-180px)]">
        <SpaceShooter404
          ref={gameRef}
          className="h-full w-full"
          onGameStart={handleGameStart}
          onGameOver={handleGameOver}
          onVictory={handleVictory}
        />
      </div>

      {gameState !== "playing" && (
        <>
          {/* Dimmed background overlay for victory and game over screens */}
          {(gameState === "victory" || gameState === "gameOver") && (
            <div className="absolute top-[20px] left-0 right-0 mx-2 md:mx-4 h-[calc(100vh-100px-180px)] z-10" />
          )}

          <section className="pointer-events-none w-full absolute top-[40%] z-20 flex flex-col items-start gap-6 text-center">
            <div className="w-full">
              {gameState === "gameOver" ? (
                <div className="w-full flex flex-col gap-4">
                  <div className="inline-flex flex-col justify-start items-center gap-3">
                    <div className="flex flex-col justify-start items-center">
                      <h1 className="h1 text-center text-fullgrey">
                        Game over!
                      </h1>
                      <div className="opacity-60 text-center justify-end text-fullgrey text-3xl font-sans flex items-center gap-4">
                        <span>Level: {finalLevel}</span>
                        <span>Score: {finalScore}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-center gap-2">
                      <div className="inline-flex justify-center items-center gap-1">
                        <p className="opacity-60 text-center justify-start text-fullgrey h4">
                          Your ship got destroyed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-auto flex items-center justify-center gap-4">
                    <button
                      onClick={handleRetryClick}
                      className="flex z-10 gap-1 w-fit items-center justify-end sm:justify-start py-2 px-4 box-border border border-solid border-midgrey !bg-fullwhite rounded-full hover:bg-midgrey/5 transition-colors"
                    >
                      <p className="h4">Retry</p>
                    </button>
                    <Button url="/">
                      <p className="h4">Go Home</p>
                    </Button>
                  </div>
                </div>
              ) : gameState === "victory" ? (
                <div className="w-full flex flex-col gap-4">
                  <div className="inline-flex flex-col justify-start items-center gap-3">
                    <div className="flex flex-col justify-start items-center">
                      <h1 className="h1 text-center text-fullgrey">
                        Enemy fleet destroyed!
                      </h1>
                      <div className="opacity-60 text-center justify-end text-fullgrey text-3xl font-sans flex items-center gap-4">
                        <span>Level: {finalLevel}</span>
                        <span>Score: {finalScore}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-center gap-2">
                      <div className="inline-flex justify-center items-center gap-1">
                        <p className="opacity-60 text-center justify-start text-fullgrey h4">
                          Good work obliterating the enemy fleet.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-auto flex items-center justify-center gap-4">
                    <button
                      onClick={handleNextLevelClick}
                      className="flex z-10 gap-1 w-fit items-center justify-end sm:justify-start py-2 px-4 box-border border border-solid border-midgrey !bg-fullwhite rounded-full hover:bg-midgrey/5 transition-colors"
                    >
                      <p className="h4">Next Level</p>
                    </button>
                    <Button url="/">
                      <p className="h4">Go Home</p>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <h1 className="h1 text-center text-fullgrey">
                      Are you lost there, bud?
                    </h1>
                    <p className="opacity-60 text-center justify-start text-fullgrey h4">
                      Defeat the enemies to get back home.
                    </p>
                  </div>
                  <div className="pointer-events-auto flex items-center gap-4">
                    <button
                      onClick={handleStartClick}
                      className="flex z-10 gap-1 w-fit items-center justify-end sm:justify-start py-2 px-4 box-border border border-solid border-midgrey !bg-fullwhite rounded-full hover:bg-midgrey/5 transition-colors"
                    >
                      <p className="h4">Start</p>
                    </button>
                    <Button url="/">
                      <p className="h4">Go Home</p>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {gameState === "initial" && (
        <div className="absolute bottom-[220px] w-full pointer-events-auto mt-2 flex flex-col text-fullgrey/80 items-center gap-2">
          <p className="hidden md:block h4">
            Press{" "}
            <kbd className="mx-1 border border-b-2 border-midgrey px-1 py-[1px] bg-midgrey/10 rounded-sm border-offset-[-1px] outline-midgrey/60 inline-flex justify-center items-center gap-2.5 overflow-hidden text-sm font-medium font-sans text-fullgrey">
              SPACE
            </kbd>{" "}
            to shoot. Hold for more power.
          </p>
          <p className="hidden md:block h4">
            Use
            <span className="mx-1 border border-b-2 border-midgrey w-5 h-5 bg-midgrey/10 rounded-sm border-offset-[-1px] outline-midgrey/60 inline-flex justify-center items-center overflow-hidden text-sm">
              ←
            </span>
            and
            <span className="mx-1 border border-b-2 border-midgrey w-5 h-5 bg-midgrey/10 rounded-sm border-offset-[-1px] outline-midgrey/60 inline-flex justify-center items-center overflow-hidden text-sm">
              →
            </span>
            to move.
          </p>

          <p className="md:hidden h4">
            Press{" "}
            <span className="mx-1 border border-b-2 border-midgrey w-6 h-6 p-1 bg-midgrey/10 rounded-sm border-offset-[-1px] outline-midgrey/60 inline-flex justify-center items-center overflow-hidden text-sm">
              ✕
            </span>{" "}
            to shoot. Hold for more power.
          </p>
          <p className="md:hidden h4">
            Use
            <span className="mx-1 border border-b-2 border-midgrey w-5 h-5 bg-midgrey/10 rounded-sm border-offset-[-1px] outline-midgrey/60 inline-flex justify-center items-center overflow-hidden text-sm">
              ←
            </span>
            and
            <span className="mx-1 border border-b-2 border-midgrey w-5 h-5 bg-midgrey/10 rounded-sm border-offset-[-1px] outline-midgrey/60 inline-flex justify-center items-center overflow-hidden text-sm">
              →
            </span>
            to move.
          </p>
        </div>
      )}

      {gameState === "playing" && (
        <div className="md:hidden absolute bottom-4 left-0 right-0 w-full px-4 pointer-events-auto text-fullgrey/80">
          <div className="w-full flex justify-center items-end gap-6">
            <button
              type="button"
              aria-label="Move left"
              className="flex-1 h-14 bg-midgrey/20 rounded-2xl outline outline-offset-[-1px] outline-midgrey flex justify-center items-center overflow-hidden active:bg-midgrey/30 focus:outline-none focus:ring-2 focus:ring-midgrey/60"
              onPointerDown={(e) => {
                e.preventDefault();
                gameRef.current?.pressLeft();
              }}
              onPointerUp={() => gameRef.current?.releaseLeft()}
              onPointerCancel={() => gameRef.current?.releaseLeft()}
              onPointerLeave={() => gameRef.current?.releaseLeft()}
            >
              <span className="sr-only">Left</span>
              <span className="text-2xl text-fullgrey">←</span>
            </button>
            <button
              type="button"
              aria-label="Shoot"
              className="!w-20 !h-20 relative bg-fullgrey rounded-3xl outline outline-offset-[-1px] outline-midgrey/20 overflow-hidden flex items-center justify-center active:bg-fullgrey/90 focus:outline-none focus:ring-2 focus:ring-midgrey/60"
              onPointerDown={(e) => {
                e.preventDefault();
                gameRef.current?.pressShoot();
              }}
              onPointerUp={() => gameRef.current?.releaseShoot()}
              onPointerCancel={() => gameRef.current?.releaseShoot()}
              onPointerLeave={() => gameRef.current?.releaseShoot()}
            >
              <span className="sr-only">Shoot</span>
              <span
                aria-hidden
                className="block !w-10 !h-10 text-fullwhite"
                style={{
                  fontSize: "24px",
                }}
              >
                ✕
              </span>
            </button>
            <button
              type="button"
              aria-label="Move right"
              className="flex-1 h-14 bg-midgrey/20 rounded-2xl outline outline-offset-[-1px] outline-midgrey flex justify-center items-center overflow-hidden active:bg-midgrey/30 focus:outline-none focus:ring-2 focus:ring-midgrey/60"
              onPointerDown={(e) => {
                e.preventDefault();
                gameRef.current?.pressRight();
              }}
              onPointerUp={() => gameRef.current?.releaseRight()}
              onPointerCancel={() => gameRef.current?.releaseRight()}
              onPointerLeave={() => gameRef.current?.releaseRight()}
            >
              <span className="sr-only">Right</span>
              <span className="text-2xl text-fullgrey">→</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
