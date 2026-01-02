import { Link } from "react-router-dom"

export default function HeroSection() {
    return (
        <section className="relative h-[480px] w-full overflow-hidden">
            {/* Background Image */}
            <img
                src="./src/assets/hero-background.jpg"
                alt="Concert background"
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl space-y-5 text-white">
                        {/* Badge */}
                        <span className="inline-block rounded-full bg-[#F6339A] px-4 py-1 text-sm font-semibold">
                            진행 중인 공연
                        </span>

                        {/* Title */}
                        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                            K-POP 공연의
                            <br />
                            모든 것을 한곳에서
                        </h1>

                        {/* Description */}
                        <p className="text-base text-gray-200 md:text-lg">
                            최신 공연부터 팬들의 생생한 후기까지, StageLog에서 만나보세요
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex gap-4 pt-2">
                            <Link
                                to="/concerts"
                                className="inline-flex items-center justify-center rounded-full bg-[#F6339A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#F6339A]/80"
                            >
                                공연 둘러보기
                            </Link>

                            <Link
                                to="/community"
                                className="inline-flex items-center justify-center rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/30"
                            >
                                커뮤니티 둘러보기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
