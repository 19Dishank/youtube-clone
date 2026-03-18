import { MdStars } from "react-icons/md";

export const JoinButton = () => {
    return (
        <button className="group
      flex items-center justify-center gap-1.5 
      bg-zinc-100 text-zinc-900 
      px-4 py-2 md:px-3 
      rounded-full font-semibold text-sm md:text-[15px]
      border border-zinc-200
      hover:bg-zinc-200 hover:border-zinc-300
      active:scale-95 active:bg-zinc-300
      transition-all duration-200 
    ">
            <MdStars
                size={22}
            />
            <span>Join</span>
        </button>
    );
}

export const SubscribeButton = () => (
    <button className="bg-black text-white px-5 md:px-6 py-2 rounded-full font-medium text-sm md:text-base hover:bg-zinc-800 active:scale-95 transition-all duration-200">
        Subscribe
    </button>
);

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