import Image from "next/image";
import Container from "./ui/container";
import Link from "next/link";
import heroImg from "@/../public/images/website/hero.svg";
import reactLogo from "@/../public/images/brands/react.svg";
import nextjsLogo from "@/../public/images/brands/nextjs.svg";
import redisLogo from "@/../public/images/brands/redis.svg";
import tailwindLogo from "@/../public/images/brands/tailwind.png";
import tsLogo from "@/../public/images/brands/ts.svg";
import vercelLogo from "@/../public/images/brands/vercel.svg";
import { Button } from "./ui/button";

const Hero = () => {
	return (
		<>
			<Container className="flex flex-wrap p-10">
				<div className="flex items-center justify-center w-full lg:w-1/2">
					<div className="w-full flex justify-center">
						<Image
							src={heroImg}
							width="616"
							height="617"
							object-fit="cover"
							alt="Hero Illustration"
							loading="eager"
						/>
					</div>
				</div>
				<div className="flex items-center justify-center w-full lg:w-1/2 lg:pl-16 mt-5 lg:mt-0">
					<div className="max-w-xl my-6 lg:flex lg:flex-col lg:justify-end h-full">
						<h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
							<span className="text-accent">Meet</span> the World{" "}
							<br className="hidden lg:block" />
							Here!!
						</h1>
						<p className="py-5 text-md leading-normal text-gray-500 lg:text-lg dark:text-gray-300">
							Transforming everyday conversations into
							unforgettable experiences. Join Chit Chat today and
							discover a world of limitless connections, laughter,
							and shared moments.
						</p>

						<div className="flex flex-wrap mt-2 gap-3 h-12 justify-start">
							<Link
								href="/login"
								rel="noopener"
								tabIndex={-1}
								className=""
							>
								<Button
									className="h-full px-10"
									variant="secondary"
								>
									Get Started Today
								</Button>
							</Link>
							<Link
								tabIndex={-1}
								href="https://github.com/singhmeharjeet"
								target="_blank"
								rel="noopener"
							>
								<Button
									className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 px-4 py-2 h-full hover:bg-transparent hover:ring-2 hover:dark:ring-gray-300 dark:hover:text-grey-300"
									variant="ghost"
								>
									<span> View on Github</span>
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</Container>
			<Container className="">
				<div className="flex flex-col justify-center">
					<div className="text-xl text-center dark:text-white ">
						Technology Made
						<span className="text-white lg:text-secondary font-semibold mx-2">
							Possible
						</span>
						By
					</div>

					<div className="flex flex-wrap justify-center items-center gap-5 mt-10 md:justify-around">
						<div className="pt-2 text-gray-400 dark:text-gray-400">
							<Image
								src={reactLogo}
								alt="react logo"
								width={40}
								height={40}
							></Image>
						</div>
						<div className="text-gray-400 dark:text-gray-400">
							<Image
								src={nextjsLogo}
								alt="react logo"
								width={70}
								height={70}
							></Image>
						</div>
						<div className="text-gray-400 dark:text-gray-400">
							<Image
								src={tsLogo}
								alt="react logo"
								width={40}
								height={40}
							></Image>
						</div>
						<div className="pt-2 text-gray-400 dark:text-gray-400">
							<Image
								src={tailwindLogo}
								alt="react logo"
								width={40}
								height={40}
							></Image>
						</div>
						<div className="pt-1 text-gray-400 dark:text-gray-400">
							<Image
								src={redisLogo}
								alt="react logo"
								width={40}
								height={40}
							></Image>
						</div>

						<div className="p-2 text-gray-400 dark:text-gray-400 h-full flex items-center">
							<Image
								src={vercelLogo}
								alt="react logo"
								width={40}
								height={40}
								className="h-auto w-4/5"
							></Image>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Hero;
