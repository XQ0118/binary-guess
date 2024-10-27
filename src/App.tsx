import { useCallback, useEffect, useState } from 'react'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { getRandomHappyEmoji, getRandomTargetNumber } from './utils/random';
import { RainbowButton } from "@/components/ui/rainbow-button";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from './utils/cn';
import { HeroHighlight, Highlight } from './components/ui/hero-highlight';



function Game() {


  const [step, setStep] = useState<1 | 2>(1);

  const [targetNumber, setTargetNumber] = useState(75);

  const [guess, setGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);


  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    console.log('targetNumber', targetNumber)
  }, [targetNumber])

  useEffect(() => {
    if (step === 1) {
      setTargetNumber(75);
    } else {
      setTargetNumber(getRandomTargetNumber());
    }
  }, [step])

  const reset = useCallback(() => {
    if (step === 1) {
      setTargetNumber(75);
    } else {
      setTargetNumber(getRandomTargetNumber());
    }
    setGuess('');
    setGameOver(false);
    setMessage('');
    setAttempts(0);
  }, [step]);

  const handleGuess = useCallback(() => {
    if (!guess || gameOver) return;
    const guessNumber = parseInt(guess);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (guessNumber === targetNumber) {
      setMessage(`恭喜你猜对了 🎉 只用了 ${newAttempts} 次就猜中了！`)
      setGameOver(true)
      triggerConfetti()
    } else if (guessNumber < targetNumber) {
      setMessage(`${getRandomHappyEmoji()} 太小了！继续猜！`)
    } else {
      setMessage(`${getRandomHappyEmoji()} 太大啦！继续猜！`)
    }
  }, [guess, targetNumber, attempts, gameOver]);

  const triggerConfetti = useCallback(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

  }, [])

  const nextLevel = useCallback(() => {
    setStep(2);
    reset();
  }, [reset]);

  const previousLevel = useCallback(() => {
    setStep(1);
    reset();
  }, [reset]);

  return (
    <>
      <AuroraBackground className='min-h-dvh max-h-dvh'>
        <div className='min-w-96 max-w-lg  relative p-10 overflow-hidden rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-300 flex flex-col gap-5'>
          <h1 className='text-2xl font-bold '>{step === 1 ? '第一关' : '第二关: 目标数随机'}</h1>
          <HeroHighlight>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              目标数字就藏在{" "}
              <Highlight className="text-black dark:text-white">
                0 到 100
              </Highlight>
              {" "}之间，等待着被你发现！

            </motion.div>
          </HeroHighlight>
          <div className='relative'>
            <input
              className='pl-5 pr-9 py-5 border text-2xl border-zinc-200 rounded-lg w-full outline-none'
              type="number"
              min={0}
              max={100}
              value={guess}
              placeholder="输入你猜测的数字..."
              onChange={(e) => {
                const value = e.target.value;
                const numValue = parseInt(value);
                if (value === '' || (numValue >= 0 && numValue <= 100)) {
                  setGuess(value);
                }
              }}

              disabled={gameOver}
            />
            <button disabled={gameOver} className='absolute right-1 top-1/2 -translate-y-1/2 text-xs rounded bg-zinc-200 px-0.5 py-1 disabled:cursor-not-allowed'
              onClick={() => { (!gameOver) && setGuess('') }}>清空</button>
          </div>


          <AnimatePresence mode="wait">
            <motion.div
              key={attempts}
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              exit={{ opacity: 0, }}
              transition={{
                duration: 0.35,
                ease: 'easeOut',
              }}
            >
              <div className={cn('h-8 bg-zinc-100 px-2 py-1 rounded', gameOver ? 'text-purple-600 bg-purple-100' : message ? 'opacity-100' : 'opacity-0')}>{message}</div>
            </motion.div>
          </AnimatePresence>

          <div className='flex items-center gap-5'>
            <RainbowButton className='text-white disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none'
              disabled={!guess || gameOver}
              onClick={handleGuess}  >
              揭晓真相！
            </RainbowButton>

            <button className='bg-zinc-200 rounded-xl h-10 px-5' onClick={reset}>重置</button>

            {
              step === 1 && gameOver && <button className='text-white bg-indigo-600 rounded-xl h-10 px-5' onClick={nextLevel}>挑战下一关</button>
            }

            {step === 2 && gameOver && (
              <button
                className='text-white bg-yellow-600 rounded-xl h-10 px-5'
                onClick={previousLevel}
              >
                返回上一关
              </button>
            )}
          </div>

        </div>

      </AuroraBackground>

    </>
  )
}


function App() {
  return <Game />
}

export default App
