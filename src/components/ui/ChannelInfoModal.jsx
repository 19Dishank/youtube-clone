import React from 'react';
import { X, Mail, Globe, Info, Calendar, Users, PlaySquare, TrendingUp, Share2, Flag } from 'lucide-react';
import { formatNumber } from '../../helper/helperfunctions';
import { InfoRow, LinkItem, SectionTitle } from './Uicomponents';

//  Main Modal Component 
const ChannelInfoModal = ({ isOpen, onClose, data }) => {
    const localDate = new Date(
        data?.info?.snippet?.publishedAt
    ).toDateString();
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-135 max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">

                {/* chanel name */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                    <h2 className="text-lg font-bold text-zinc-900">{data?.info?.snippet?.title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-zinc-600" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">

                    {/* description */}
                    <section className="mb-8">
                        <SectionTitle>Description</SectionTitle>
                        <div className="text-sm text-zinc-700 whitespace-pre-wrap leading-relaxed">
                            {data?.info?.snippet?.description}
                        </div>
                    </section>

                    {/* Links */}
                    {/* <section className="mb-8">
                        <SectionTitle>Links</SectionTitle>
                        {data.links.map((link, idx) => (
                            <LinkItem key={idx} {...link} />
                        ))}
                    </section> */}

                    {/* More info */}
                    <section className="mb-8">
                        <SectionTitle>More Info</SectionTitle>
                        <div className="space-y-1">
                            <InfoRow icon={Mail} text={data.channelUrl || '-'} />
                            <InfoRow icon={Globe} text={data?.info?.brandingSettings?.channel?.country || '-'} />
                            <InfoRow icon={Info} text={`Joined ${localDate}`} />
                            <InfoRow icon={Users} text={`${data?.info?.statistics?.subscriberCount} subscribers`} />
                            <InfoRow icon={PlaySquare} text={`${data?.info?.statistics?.videoCount} videos`} />
                            <InfoRow icon={TrendingUp} text={`${data?.info?.statistics?.viewCount} views`} />
                        </div>
                    </section>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                            <Share2 className="w-4 h-4" /> Share channel
                        </button>
                        <button className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                            <Flag className="w-4 h-4" /> Report user
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelInfoModal;