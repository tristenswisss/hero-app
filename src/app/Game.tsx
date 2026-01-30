"use client";

import { useEffect, useRef, useState } from "react";

interface Bullet {
  x: number;
  y: number;
  speed: number;
}

interface Enemy {
  x: number;
  y: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;2474
  color: string;
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Game state ref to avoid re-renders during game loop
  const gameState = useRef({
    player: { x: 0, y: 0, width: 40, height: 30, speed: 5 },
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    keys: {} as Record<string, boolean>,
    enemySpeed: 1,
    lastShot: 0,
    shotCooldown: 300,
    lastEnemySpawn: 0,
    enemySpawnInterval: 1500,
  });

  // Reset game function
  const resetGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    gameState.current = {
      player: {
        x: canvas.width / 2 - 20,
        y: canvas.height - 50,
        width: 40,
        height: 30,
        speed: 5,
      },
      bullets: [],
      enemies: [],
      particles: [],
      keys: {},
      enemySpeed: 1,
      lastShot: 0,
      shotCooldown: 300,
      lastEnemySpawn: 0,
      enemySpawnInterval: 1500,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      gameState.current.player.x = canvas.width / 2 - gameState.current.player.width / 2;
      gameState.current.player.y = canvas.height - gameState.current.player.height - 20;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isZoomed) {
        setIsZoomed(false);
        return;
      }
      
      gameState.current.keys[e.key.toLowerCase()] = true;
      if (e.key === " " && !gameStarted) {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        resetGame();
      }
      if (e.key === "p" || e.key === "P") {
        setIsPaused(!isPaused);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameState.current.keys[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Touch controls
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      
      if (!gameStarted) {
        setGameStarted(true);
        setGameOver(false);
        setScore(0);
        resetGame();
        return;
      }

      const centerX = canvas.width / 2;
      if (x < centerX) {
        gameState.current.keys["arrowleft"] = true;
      } else {
        gameState.current.keys["arrowright"] = true;
      }
    };

    const handleTouchEnd = () => {
      gameState.current.keys["arrowleft"] = false;
      gameState.current.keys["arrowright"] = false;
    };

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);


    const createExplosion = (x: number, y: number, color: string) => {
      for (let i = 0; i < 15; i++) {
        gameState.current.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 1,
          color,
        });
      }
    };

    const gameLoop = (timestamp: number) => {
      if (!gameStarted) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#3aa6b9";
        ctx.font = "bold 24px var(--font-sans)";
        ctx.textAlign = "center";
        ctx.fillText("SPACE INVADERS", canvas.width / 2, canvas.height / 2 - 50);
        
        ctx.font = "16px var(--font-sans)";
        ctx.fillStyle = "#aab0b7";
        ctx.fillText("Use arrow keys or touch to move", canvas.width / 2, canvas.height / 2);
        ctx.fillText("Space or click to shoot", canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText("Press SPACE or tap to start", canvas.width / 2, canvas.height / 2 + 60);
        
        requestAnimationFrame(gameLoop);
        return;
      }

      if (isPaused) {
        // Draw pause screen
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#4cc9f0";
        ctx.font = "bold 28px var(--font-sans)";
        ctx.textAlign = "center";
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.font = "16px var(--font-sans)";
        ctx.fillStyle = "#aab0b7";
        ctx.fillText("Press P or click resume to continue", canvas.width / 2, canvas.height / 2 + 30);
        
        requestAnimationFrame(gameLoop);
        return;
      }

      // Clear canvas with trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars background
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      for (let i = 0; i < 50; i++) {
        const x = (i * 137) % canvas.width;
        const y = (i * 271) % canvas.height;
        const size = (i % 3) + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Player movement
      const player = gameState.current.player;
      if (gameState.current.keys["arrowleft"] || gameState.current.keys["a"]) {
        player.x = Math.max(0, player.x - player.speed);
      }
      if (gameState.current.keys["arrowright"] || gameState.current.keys["d"]) {
        player.x = Math.min(canvas.width - player.width, player.x + player.speed);
      }

      // Shooting
      if ((gameState.current.keys[" "] || gameState.current.keys["space"]) && 
          timestamp - gameState.current.lastShot > gameState.current.shotCooldown) {
        gameState.current.bullets.push({
          x: player.x + player.width / 2 - 2,
          y: player.y - 10,
          speed: 8,
        });
        gameState.current.lastShot = timestamp;
      }

      // Spawn enemies
      if (timestamp - gameState.current.lastEnemySpawn > gameState.current.enemySpawnInterval) {
        gameState.current.enemies.push({
          x: Math.random() * (canvas.width - 30),
          y: -30,
          speed: gameState.current.enemySpeed,
        });
        gameState.current.lastEnemySpawn = timestamp;
        // Increase difficulty
        if (gameState.current.enemySpawnInterval > 500) {
          gameState.current.enemySpawnInterval -= 50;
        }
        if (gameState.current.enemySpeed < 3) {
          gameState.current.enemySpeed += 0.1;
        }
      }

      // Update and draw bullets
      gameState.current.bullets = gameState.current.bullets.filter(bullet => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) return false;

        ctx.fillStyle = "#4cc9f0";
        ctx.fillRect(bullet.x, bullet.y, 4, 10);
        return true;
      });

      // Update and draw enemies
      let enemiesHit = 0;
      gameState.current.enemies = gameState.current.enemies.filter(enemy => {
        enemy.y += enemy.speed;
        if (enemy.y > canvas.height) {
          setGameOver(true);
          setGameStarted(false);
        }

        // Check collisions
        const hitBullet = gameState.current.bullets.find(bullet => 
          bullet.x < enemy.x + 30 &&
          bullet.x + 4 > enemy.x &&
          bullet.y < enemy.y + 25 &&
          bullet.y + 10 > enemy.y
        );

        if (hitBullet) {
          createExplosion(enemy.x + 15, enemy.y + 12, "#e34b4b");
          gameState.current.bullets = gameState.current.bullets.filter(b => b !== hitBullet);
          enemiesHit++;
          return false;
        }

        // Draw enemy
        const gradient = ctx.createLinearGradient(enemy.x, enemy.y, enemy.x + 30, enemy.y + 25);
        gradient.addColorStop(0, "#e34b4b");
        gradient.addColorStop(1, "#f56565");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(enemy.x + 15, enemy.y + 12, 15, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // Update score
      if (enemiesHit > 0) {
        setScore(prev => prev + enemiesHit * 100);
      }

      // Update particles
      gameState.current.particles = gameState.current.particles.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.02;
        if (particle.life <= 0) return false;

        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      ctx.globalAlpha = 1;

      // Draw player
      const playerGradient = ctx.createLinearGradient(
        player.x, 
        player.y, 
        player.x + player.width, 
        player.y + player.height
      );
      playerGradient.addColorStop(0, "#3aa6b9");
      playerGradient.addColorStop(1, "#2f8a98");
      ctx.fillStyle = playerGradient;
      ctx.beginPath();
      ctx.moveTo(player.x + player.width / 2, player.y);
      ctx.lineTo(player.x + player.width, player.y + player.height);
      ctx.lineTo(player.x, player.y + player.height);
      ctx.closePath();
      ctx.fill();

      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [gameStarted]);

  return (
    <div 
      className={`relative w-full max-w-2xl mx-auto transition-all duration-300 cursor-pointer ${isZoomed ? 'fixed inset-0 z-50 m-0 max-w-none' : ''}`}
      onClick={() => setIsZoomed(true)}
    >
      {isZoomed && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
              className="btn btn-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Close
            </button>
          </div>
          
          <div className="glass-strong rounded-[18px] p-6 overflow-hidden relative z-20 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Space Invaders</h3>
              <div className="flex items-center gap-4">
                <div className="text-white font-semibold">
                  Score: <span style={{ color: "#4cc9f0" }}>{score}</span>
                </div>
                {gameStarted && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPaused(!isPaused);
                      }}
                      className="btn btn-outline"
                      style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                    >
                      {isPaused ? "Resume" : "Pause"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setGameStarted(false);
                        setGameOver(false);
                        setScore(0);
                        setIsPaused(false);
                        resetGame();
                      }}
                      className="btn btn-outline"
                      style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                    >
                      Stop
                    </button>
                  </>
                )}
              </div>
            </div>

            <canvas
              ref={canvasRef}
              className="w-full game-canvas-lg rounded-[12px] bg-black/30 cursor-crosshair border border-white/10"
              style={{
                background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.9) 100%)",
              }}
            />

            <div className="mt-4 text-center text-sm text-[var(--muted)]">
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Arrow keys to move</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Space to shoot</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span>Tap or click to play</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span>P to pause/resume</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span>Click Stop to quit</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span>ESC to exit zoom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Default small view */}
      {!isZoomed && (
        <div className="glass-strong rounded-[18px] p-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(58,166,185,0.05),rgba(0,0,0,0.5))]" />
          
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h3 className="text-xl font-bold text-white">Space Invaders</h3>
            <div className="flex items-center gap-4">
              <div className="text-white font-semibold">
                Score: <span style={{ color: "#4cc9f0" }}>{score}</span>
              </div>
              {gameStarted && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPaused(!isPaused);
                    }}
                    className="btn btn-outline"
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                  >
                    {isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setGameStarted(false);
                      setGameOver(false);
                      setScore(0);
                      setIsPaused(false);
                      resetGame();
                    }}
                    className="btn btn-outline"
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                  >
                    Stop
                  </button>
                </>
              )}
            </div>
          </div>

          <canvas
            ref={canvasRef}
            className="w-full game-canvas-sm rounded-[12px] bg-black/30 cursor-crosshair border border-white/10"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.9) 100%)",
            }}
          />

          <div className="mt-4 text-center text-sm text-[var(--muted)] relative z-10">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Arrow keys to move</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Space to shoot</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>Tap or click to play</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>P to pause/resume</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>Click Stop to quit</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span>Click to zoom in</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}