import { MdStars } from "react-icons/md";
import React, { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
export const JoinButton = () => {
    return (
        <button className="group
      flex items-center justify-center gap-1.5 
      bg-zinc-100 text-zinc-900 
      px-4 py-1.5 md:px-3 
      rounded-full font-semibold text-sm md:text-[15px]
      border border-zinc-200
      hover:bg-zinc-200 hover:border-zinc-300
      active:scale-95 active:bg-zinc-300
      transition-all duration-200 
    ">
            <MdStars
                size={22}
            />
            <span className="text-sm font-bold">Join</span>
        </button>
    );
}



export const SubscribeButton = () => {
    const [subscribed, setSubscribed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSubscribe = () => {

        if (!subscribed) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 800);
        }
        setSubscribed(!subscribed);
    };


    const colors = ["#ea4335", "#34a853", "#4285f4", "#fbbc04", "#e040fb"];

    return (
        <div className="relative inline-flex items-center justify-center">

            <style>{`
        @keyframes party-burst {
          0% { transform: translate(0, 0) scale(0); opacity: 1; }
          50% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 1; }
          100% { transform: translate(calc(var(--tx) * 1.2), calc(var(--ty) * 1.2)) scale(0); opacity: 0; }
        }
        .animate-party-burst {
          animation: party-burst 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>


            {isAnimating && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
                    {[...Array(16)].map((_, i) => {

                        const isCircle = i % 2 === 0;
                        const distance = isCircle ? 45 : 60;
                        const color = colors[i % colors.length];

                        return (
                            <div
                                key={i}
                                className="absolute flex justify-center"
                                style={{ transform: `rotate(${i * (360 / 16)}deg)` }}
                            >
                                <div
                                    className={`animate-party-burst ${isCircle ? "w-1.5 h-1.5 rounded-full" : "w-1 h-3 rounded-sm"
                                        }`}
                                    style={{
                                        backgroundColor: color,
                                        "--tx": "0px",
                                        "--ty": `-${distance}px`,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            <button
                onClick={handleSubscribe}
                className={`
          relative z-10 flex items-center justify-center
          h-9 px-4 rounded-full font-medium text-sm
          transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
          active:scale-90 outline-none
          focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
          ${subscribed
                        ? "bg-black/[0.05] hover:bg-black/[0.1] text-[#0f0f0f]"
                        : "bg-[#0f0f0f] hover:bg-[#272727] text-white shadow-sm"
                    }
        `}
            >

                <div
                    className={`
            flex items-center overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${subscribed ? "w-4 opacity-100 mr-1.5" : "w-0 opacity-0 mr-0"}
          `}
                >
                    <Bell size={16} strokeWidth={2.5} className="shrink-0" />
                </div>

                <span className="relative inline-block whitespace-nowrap">
                    {subscribed ? "Subscribed" : "Subscribe"}
                </span>

                <div
                    className={`
            flex items-center overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${subscribed ? "w-4 opacity-100 ml-1.5" : "w-0 opacity-0 ml-0"}
          `}
                >
                    <ChevronDown size={16} strokeWidth={2.5} className="shrink-0" />
                </div>
            </button>
        </div>
    );
};

export const VerifiedBadge = () => (
    <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full bg-gray-500 shrink-0">
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
    </div>
);

export const SectionTitle = ({ children }) => (
    <h3 className="text-xl font-bold text-zinc-900 mb-4">{children}</h3>
);

export const LinkItem = ({ icon, label, url, linkText }) => (
    <div className="flex items-start gap-4 mb-5">
        <div className="w-6 h-6 shrink-0 mt-1">
            {icon ? <img src={icon} alt={label} className="w-full h-full object-contain" /> : <Globe className="w-5 h-5 text-zinc-600" />}
        </div>
        <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-900">{label}</span>
            <a href={url} className="text-sm text-blue-600 hover:underline break-all">
                {linkText}
            </a>
        </div>
    </div>
);

export const InfoRow = ({ icon: Icon, text, button }) => (
    <div className="flex items-center gap-4 py-2 text-sm text-zinc-700">
        <Icon className="w-5 h-5 text-zinc-600" />
        {button ? (
            <button className="bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full font-medium text-zinc-900 transition-colors">
                {text}
            </button>
        ) : (
            <span>{text}</span>
        )}
    </div>
);