import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Link,  } from "react-router-dom";

export function StartUp() {
  
  return (<CardContainer className="inter-var">
    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
      <CardItem
        translateZ="50"
        className="text-xl font-bold text-neutral-600 dark:text-white"
      >
        猜数字游戏体验馆
      </CardItem>
      <CardItem
        as="p"
        translateZ="60"
        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
      >
        亲爱的数字侦探，准备好挑战你的直觉了吗？
      </CardItem>
      <CardItem
        as="p"
        translateZ="60"
        className="text-neutral-700 text-sm max-w-sm mt-2 dark:text-neutral-300"
      >
        <HeroHighlight>
          <motion.h1
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
          </motion.h1>
        </HeroHighlight>
      </CardItem>

      

     

      <CardItem
        as="p"
        translateZ="60"
        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
      >
        准备好开始这场惊心动魄的数字追踪了吗？点击下方按钮，让我们一起揭开数字之谜！
      </CardItem>

      <CardItem translateZ="100" className="w-full mt-4">
        <img src="/binary-guess.jpg" alt="start-up"
          height="1000"
          width="1000"
          className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          loading="lazy"
        />
      </CardItem>
      <div className="flex justify-end items-center mt-10">

        <Link to="/game">
          <CardItem
            translateZ={20}
            as="button"
            className="text-white"
          >
            <RainbowButton  >
              开始游戏
            </RainbowButton>
          </CardItem>
        </Link>
      </div>
    </CardBody>
  </CardContainer>)
}
