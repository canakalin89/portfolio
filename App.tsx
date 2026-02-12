import React, { useState, useEffect, useMemo } from 'react';
import { 
    GithubIcon, 
    ExternalLinkIcon, 
    EmailIcon,
    InstagramIcon,
    EditIcon,
    TrashIcon,
    SpeakerIcon,
    MicIcon,
    StarIcon,
    DeskIcon,
    SheetIcon,
    ClockIcon,
    SnowflakeIcon
} from './components/Icons';

interface Project {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    iconName: string;
    iconBgColor: string;
    githubUrl?: string;
    liveUrl?: string;
}

const initialProjects: Project[] = [
    {
        iconName: 'MicIcon',
        iconBgColor: 'from-indigo-500/20 to-indigo-500/0',
        title: 'ChitIQ',
        subtitle: 'İngilizce Konuşma Asistanı',
        description: 'Lise öğrencilerinin konuşma sınavları için tasarlanmış AI tabanlı bir asistan. Telaffuz ve akıcılık analizleri sunarak kaygıyı azaltır.',
        tags: ["AI", "EduTech", "English"],
        liveUrl: 'https://chitiq-v2-185961838379.us-west1.run.app',
    },
    {
        iconName: 'SpeakerIcon',
        iconBgColor: 'from-blue-500/20 to-blue-500/0',
        title: 'KulAQ',
        subtitle: 'AI Ses Materyalleri',
        description: 'Gemini 2.5 Native Audio teknolojisiyle dinleme sınavları için profesyonel TTS çözümü.',
        tags: ["TTS", "Gemini", "Audio"],
        githubUrl: 'https://github.com/canakalin89/kulAQ',
        liveUrl: 'https://kulaq-185961838379.us-west1.run.app',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'from-amber-500/20 to-amber-500/0',
        title: 'Lingodrill',
        subtitle: 'Aksan ve Tekrar Pratiği',
        description: 'İngilizce telaffuz ve aksan becerilerini geliştirmek için tasarlanmış, derin öğrenme destekli interaktif tekrar aracı.',
        tags: ["Accent", "Fluency", "English"],
        liveUrl: 'https://lingodrill-accent-repetition-mastery-185961838379.us-west1.run.app',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'from-emerald-500/20 to-emerald-500/0',
        title: 'Family Career Quest',
        subtitle: '9. Sınıf 4. Ünite',
        description: '9. sınıf İngilizce dersi "Family" ünitesi konularını pekiştiren interaktif bir dijital oyunlaştırma.',
        tags: ["Game", "Family", "Level 9"],
        liveUrl: 'https://family-career-quest-waymark-9-s-n-f-185961838379.us-west1.run.app',
    },
    {
        iconName: 'SheetIcon',
        iconBgColor: 'from-cyan-500/20 to-cyan-500/0',
        title: 'OKULREHBER',
        subtitle: 'Dijital Bilgilendirme',
        description: 'Okul içi ekranlar için merkezi yönetimli duyuru ve rehberlik sistemi.',
        tags: ["SaaS", "Management"],
        liveUrl: 'https://okulrehber-185961838379.us-west1.run.app',
    },
    {
        iconName: 'DeskIcon',
        iconBgColor: 'from-orange-500/20 to-orange-500/0',
        title: 'Classmate Creator',
        subtitle: 'İnteraktif Tanışma',
        description: 'İngilizce derslerinde avatar oluşturup tanışmayı sağlayan web uygulaması.',
        tags: ["Creative", "Interactions"],
        liveUrl: 'https://classmate-creator-9th-grade-english-185961838379.us-west1.run.app',
    },
    {
        iconName: 'ClockIcon',
        iconBgColor: 'from-purple-500/20 to-purple-500/0',
        title: 'YKS Geri Sayım',
        subtitle: 'Fokus ve Motivasyon',
        description: 'Sınava kalan süreyi gösteren, motivasyon odaklı çalışma sayacı.',
        tags: ["Tools", "Productivity"],
        githubUrl: 'https://github.com/canakalin89/sayac_web',
        liveUrl: 'https://asalyks.netlify.app/',
    }
];

const Snowfall = () => {
    const flakes = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            duration: `${5 + Math.random() * 10}s`,
            delay: `${Math.random() * 5}s`,
            size: `${2 + Math.random() * 4}px`,
            swingDuration: `${2 + Math.random() * 2}s`,
            opacity: 0.3 + Math.random() * 0.5
        }));
    }, []);

    return (
        <div className="snow-container">
            {flakes.map((f) => (
                <div 
                    key={f.id} 
                    className="snowflake"
                    style={{
                        left: f.left,
                        animationDuration: `${f.duration}, ${f.swingDuration}`,
                        animationDelay: `${f.delay}, 0s`,
                        width: f.size,
                        height: f.size,
                        opacity: f.opacity
                    }}
                />
            ))}
        </div>
    );
};

const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
    switch(name) {
        case 'MicIcon': return <MicIcon className={className} />;
        case 'SpeakerIcon': return <SpeakerIcon className={className} />;
        case 'DeskIcon': return <DeskIcon className={className} />;
        case 'SheetIcon': return <SheetIcon className={className} />;
        case 'ClockIcon': return <ClockIcon className={className} />;
        case 'StarIcon': return <StarIcon className={className} />;
        default: return <StarIcon className={className} />;
    }
};

const App: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isSnowing, setIsSnowing] = useState(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.altKey && e.key === 'p') setIsAdmin(prev => !prev);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <div className="relative min-h-screen max-w-7xl mx-auto px-6 py-20 lg:py-32">
            {isSnowing && <Snowfall />}

            {/* Header */}
            <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-[1px] bg-indigo-500/50"></div>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-indigo-400">Can Akalın // Portfolio</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        Dijital <span className="project-title italic">Laboratuvar.</span>
                    </h1>
                </div>
                
                <div className="flex gap-4">
                    <button 
                        onClick={() => setIsSnowing(!isSnowing)}
                        className={`w-14 h-14 glass-card flex items-center justify-center transition-all border-white/10 ${isSnowing ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400' : 'hover:bg-white/10 text-white/70'}`}
                        title="Kar Yağdır"
                    >
                        <SnowflakeIcon className="w-6 h-6" />
                    </button>
                    <a href="mailto:canakalin59@gmail.com" className="w-14 h-14 glass-card flex items-center justify-center hover:bg-white/10 transition-all border-white/10">
                        <EmailIcon className="w-6 h-6 text-white/70" />
                    </a>
                    <a href="https://www.instagram.com/can_akalin" target="_blank" className="w-14 h-14 glass-card flex items-center justify-center hover:bg-white/10 transition-all border-white/10">
                        <InstagramIcon className="w-6 h-6 text-white/70" />
                    </a>
                </div>
            </header>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                {projects.map((p, i) => (
                    <div key={p.title + i} className="glass-card p-10 flex flex-col relative group overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${p.iconBgColor} opacity-50`}></div>
                        
                        <div className="flex justify-between items-start mb-12">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-indigo-400">
                                <IconRenderer name={p.iconName} className="w-8 h-8" />
                            </div>
                            {isAdmin && (
                                <div className="flex gap-2">
                                    <button onClick={() => {setEditingProject(p); setIsEditModalOpen(true);}} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl"><EditIcon className="w-4 h-4"/></button>
                                    <button onClick={() => setProjects(projects.filter(pr => pr.title !== p.title))} className="p-2 bg-white/5 hover:bg-red-500/20 rounded-xl"><TrashIcon className="w-4 h-4 text-red-400"/></button>
                                </div>
                            )}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2 project-title">{p.title}</h3>
                            <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-4">{p.subtitle}</p>
                            <p className="text-white/40 text-sm leading-relaxed line-clamp-3 italic">"{p.description}"</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-10">
                            {p.tags.map(tag => (
                                <span key={tag} className="text-[9px] px-3 py-1 bg-white/5 border border-white/5 rounded-full text-white/30 uppercase font-bold tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto flex gap-4">
                            {p.liveUrl && (
                                <a href={p.liveUrl} target="_blank" className="flex-1 py-4 bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all group-hover:bg-indigo-500/10">
                                    <ExternalLinkIcon className="w-4 h-4"/> Başlat
                                </a>
                            )}
                            {p.githubUrl && (
                                <a href={p.githubUrl} target="_blank" className="w-14 h-14 glass-card flex items-center justify-center hover:bg-white/10 transition-all border-white/10">
                                    <GithubIcon className="w-5 h-5 text-white/50" />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
                
                {isAdmin && (
                    <div 
                        onClick={() => {setEditingProject(null); setIsEditModalOpen(true);}}
                        className="glass-card p-10 flex flex-col items-center justify-center border-dashed border-white/10 cursor-pointer hover:border-indigo-500/50 group transition-all"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-3xl font-light text-white/20">+</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Yeni Deney Ekle</span>
                    </div>
                )}
            </div>

            {/* Editor Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center px-6">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="glass-card w-full max-w-xl p-10 relative z-[1001] border-white/10">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-xl font-bold tracking-tight">Proje Konfigürasyonu</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-white/40 hover:text-white transition-colors">Kapat</button>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Başlık</label>
                                <input className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 outline-none focus:border-indigo-500/50 transition-colors" value={editingProject?.title || ''} onChange={e => setEditingProject({...editingProject!, title: e.target.value} as Project)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Açıklama</label>
                                <textarea className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 outline-none focus:border-indigo-500/50 transition-colors h-32" value={editingProject?.description || ''} onChange={e => setEditingProject({...editingProject!, description: e.target.value} as Project)} />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button onClick={() => {
                                    if(editingProject) {
                                        setProjects(prev => prev.some(p => p.title === editingProject.title) 
                                            ? prev.map(p => p.title === editingProject.title ? editingProject : p)
                                            : [...prev, { ...editingProject, iconName: 'StarIcon', iconBgColor: 'from-blue-500/20 to-blue-500/0', tags: [] }]);
                                    }
                                    setIsEditModalOpen(false);
                                }} className="flex-1 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all">Sisteme Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <footer className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/10">
                    &copy; Can Akalın // Portfolio
                </p>
            </footer>
        </div>
    );
}

export default App;