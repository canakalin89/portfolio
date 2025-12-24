import React, { useState, useEffect, useCallback } from 'react';
import { 
    iconMap,
    GithubIcon, 
    ExternalLinkIcon, 
    EmailIcon,
    InstagramIcon,
    EditIcon,
    TrashIcon,
    PlusIcon,
    SpeakerIcon,
    MicIcon,
    StarIcon,
    DeskIcon,
    SheetIcon,
    ClockIcon
} from './components/Icons';

// --- Type Definitions ---
type IconName = keyof typeof iconMap;

interface Project {
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    iconName: IconName;
    iconBgColor: string;
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
}

// --- Initial Data ---
const initialProjects: Project[] = [
    {
        iconName: 'MicIcon',
        iconBgColor: 'bg-indigo-600',
        title: 'ChitIQ',
        subtitle: 'İngilizce Konuşma Asistanı',
        description: 'Lise öğrencilerinin konuşma sınavları için tasarlanmış AI tabanlı bir asistan. Telaffuz ve akıcılık analizleri sunarak kaygıyı azaltır.',
        tags: ["Eğitim", "AI", "English"],
        liveUrl: 'https://chitiq-v2-185961838379.us-west1.run.app',
        featured: true
    },
    {
        iconName: 'SpeakerIcon',
        iconBgColor: 'bg-sky-600',
        title: 'KulAQ',
        subtitle: 'AI Ses Materyalleri',
        description: 'Gemini 2.5 Native Audio teknolojisiyle dinleme sınavları için profesyonel TTS çözümü.',
        tags: ["Eğitim", "TTS", "Gemini"],
        githubUrl: 'https://github.com/canakalin89/kulAQ',
        liveUrl: 'https://kulaq-185961838379.us-west1.run.app',
        featured: true
    },
    {
        iconName: 'SheetIcon',
        iconBgColor: 'bg-emerald-600',
        title: 'OKULREHBER',
        subtitle: 'Dijital Bilgilendirme',
        description: 'Okul içi ekranlar için merkezi yönetimli duyuru ve rehberlik sistemi.',
        tags: ["Yönetim", "Digital Pano"],
        liveUrl: 'https://okulrehber-185961838379.us-west1.run.app',
    },
    {
        iconName: 'DeskIcon',
        iconBgColor: 'bg-orange-500',
        title: 'Classmate Creator',
        subtitle: 'İnteraktif Tanışma',
        description: '9. sınıflar için İngilizce derslerinde avatar oluşturup tanışmayı sağlayan web uygulaması.',
        tags: ["9. Sınıf", "Oyunlaştırma"],
        liveUrl: 'https://classmate-creator-9th-grade-english-185961838379.us-west1.run.app',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'bg-rose-600',
        title: 'Atatürk: Hikayeler',
        subtitle: 'Dijital Anlatı',
        description: 'Cumhuriyet değerlerini modern teknolojiyle anlatan görsel kütüphane.',
        tags: ["Tarih", "Eğitim"],
        liveUrl: 'https://atat-rk-k-esi-hikayeler-185961838379.us-west1.run.app',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'bg-red-600',
        title: "Atatürk'ün Hayatı",
        subtitle: 'Kronolojik Yolculuk',
        description: "Gazi Mustafa Kemal Atatürk'ün fikir dünyasına odaklanan interaktif bir yaşam öyküsü.",
        tags: ["Arşiv", "Tarih"],
        githubUrl: 'https://github.com/canakalin89/atam-dijital-iz',
        liveUrl: 'https://atam-dijital-iz.lovable.app/',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'bg-red-700',
        title: 'İnkılap Tarihi Panosu',
        subtitle: 'İnteraktif Öğrenme',
        description: 'LGS ve YKS hazırlık sürecinde İnkılap Tarihi derslerini somutlaştıran dijital pano.',
        tags: ["LGS", "YKS", "Tarih"],
        githubUrl: 'https://github.com/canakalin89/ata_pano',
        liveUrl: 'https://atam1923.netlify.app/',
    },
    {
        iconName: 'ClockIcon',
        iconBgColor: 'bg-purple-500',
        title: 'YKS Geri Sayım',
        subtitle: 'Fokus ve Motivasyon',
        description: 'Sınava kalan süreyi gösteren, motivasyon odaklı çalışma sayacı.',
        tags: ["Verimlilik", "YKS"],
        githubUrl: 'https://github.com/canakalin89/sayac_web',
        liveUrl: 'https://asalyks.netlify.app/',
    }
];

// --- Windows 98 Components ---

const Window: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    onClose?: () => void; 
    isAdmin?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    className?: string;
    id?: string;
    compact?: boolean;
}> = ({ title, children, onClose, isAdmin, onEdit, onDelete, className = "", id, compact }) => (
    <div id={id} className={`win-outset w-full overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col ${className}`}>
        <div className="win-titlebar shrink-0">
            <div className="flex items-center gap-2 truncate">
                <div className="w-4 h-4 bg-gray-300 flex items-center justify-center border border-gray-500 shrink-0">
                    <StarIcon className="w-3 h-3 text-black" />
                </div>
                <span className="truncate">{title}</span>
            </div>
            <div className="flex gap-1 shrink-0">
                {isAdmin && onEdit && (
                    <button onClick={onEdit} className="win-btn text-[10px]"><EditIcon className="w-2 h-2"/></button>
                )}
                {isAdmin && onDelete && (
                    <button onClick={onDelete} className="win-btn text-[10px]"><TrashIcon className="w-2 h-2"/></button>
                )}
                {!compact && (
                    <>
                        <button className="win-btn">_</button>
                        <button className="win-btn">□</button>
                    </>
                )}
                <button onClick={onClose} className="win-btn">X</button>
            </div>
        </div>
        <div className="p-1 bg-[#c0c0c0] grow overflow-hidden">
            <div className="win-inset p-3 md:p-4 text-black h-full overflow-auto">
                {children}
            </div>
        </div>
    </div>
);

// --- Mini Game: Minesweeper Lite ---
const Minesweeper: React.FC = () => {
    const size = 8;
    const [mines, setMines] = useState<number[]>([]);
    const [revealed, setRevealed] = useState<boolean[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);

    const initGame = useCallback(() => {
        const newMines: number[] = [];
        while (newMines.length < 10) {
            const r = Math.floor(Math.random() * (size * size));
            if (!newMines.includes(r)) newMines.push(r);
        }
        setMines(newMines);
        setRevealed(new Array(size * size).fill(false));
        setGameOver(false);
    }, []);

    useEffect(() => { initGame(); }, [initGame]);

    const handleClick = (idx: number) => {
        if (gameOver || revealed[idx]) return;
        const newRevealed = [...revealed];
        newRevealed[idx] = true;
        setRevealed(newRevealed);
        if (mines.includes(idx)) {
            setGameOver(true);
            alert("BOM! Kaybettiniz.");
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="win-inset p-1 bg-black grid grid-cols-8 gap-px">
                {new Array(size * size).fill(null).map((_, i) => (
                    <div 
                        key={i} 
                        onClick={() => handleClick(i)}
                        className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center cursor-pointer select-none
                        ${revealed[i] ? 'bg-gray-300' : 'win-outset hover:bg-gray-200'}
                        `}
                    >
                        {revealed[i] && (mines.includes(i) ? '💣' : '')}
                    </div>
                ))}
            </div>
            <button onClick={initGame} className="win-outset px-4 py-1 text-xs font-bold">Yeniden Başlat</button>
        </div>
    );
};

const Taskbar: React.FC<{ onStartClick: () => void }> = ({ onStartClick }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="taskbar">
            <button onClick={onStartClick} className="start-btn win-outset flex items-center gap-1 active:shadow-none">
                <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="logo" className="w-4 h-4" />
                Başlat
            </button>
            <div className="flex-1 flex gap-1 overflow-x-hidden px-2">
                <div className="win-inset px-3 py-0.5 text-xs flex items-center gap-2 bg-[#d1d1d1] min-w-[100px] truncate">
                    <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-5.png" alt="pc" className="w-4 h-4" />
                    Portfolio OS
                </div>
            </div>
            <div className="win-inset px-3 py-0.5 text-xs flex items-center gap-2 bg-[#d1d1d1] shrink-0">
                <img src="https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-0.png" alt="audio" className="w-4 h-4" />
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

const DesktopIcon: React.FC<{ icon: string; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
    <div className="desktop-icon" onClick={onClick}>
        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
            <img src={icon.startsWith('http') ? icon : `https://win98icons.alexmeub.com/icons/png/${icon}.png`} alt={label} className="w-full h-full object-contain" />
        </div>
        <span>{label}</span>
    </div>
);

const StartMenu: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed bottom-[30px] left-0 w-64 win-outset z-[1001] shadow-2xl flex">
        <div className="w-8 bg-gray-500 [writing-mode:vertical-lr] rotate-180 flex items-center justify-end p-2 text-white font-bold text-lg select-none">
            Windows <span className="text-gray-300">98</span>
        </div>
        <div className="flex-1 bg-white py-1">
            <a href="mailto:canakalin59@gmail.com" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-800 hover:text-white group">
                <EmailIcon className="w-4 h-4 text-gray-600 group-hover:text-white" />
                <span className="text-sm">E-posta Gönder</span>
            </a>
            <a href="https://www.instagram.com/can_akalin" target="_blank" className="flex items-center gap-3 px-4 py-2 hover:bg-blue-800 hover:text-white group">
                <InstagramIcon className="w-4 h-4 text-gray-600 group-hover:text-white" />
                <span className="text-sm">Instagram</span>
            </a>
            <div className="h-[1px] bg-gray-300 my-1"></div>
            <button onClick={onClose} className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-blue-800 hover:text-white group">
                <img src="https://win98icons.alexmeub.com/icons/png/shut_down_normal-2.png" alt="shut" className="w-4 h-4" />
                <span className="text-sm">Kapat</span>
            </button>
        </div>
    </div>
);

// --- Main App ---

const App: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [isGameOpen, setIsGameOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(true);

    const STORAGE_KEY = 'can_portfolio_retro_v3';

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setProjects(JSON.parse(stored));
        
        const handleKey = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.altKey && e.key === 'p') setIsAdmin(prev => !prev);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }, [projects]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen relative pb-10">
            {/* Desktop Layer */}
            <div className="fixed top-0 left-0 p-4 grid grid-cols-1 w-20 gap-4 z-0">
                <DesktopIcon icon="directory_open_file_mydocs-4" label="Projelerim" onClick={() => scrollToSection('projects')} />
                <DesktopIcon icon="game_freecell-0" label="Mayın Tarlası" onClick={() => setIsGameOpen(true)} />
                <DesktopIcon icon="computer_explorer-5" label="Hakkımda" onClick={() => setIsInfoOpen(true)} />
                <DesktopIcon icon="envelope_closed-0" label="İletişim" onClick={() => setIsStartOpen(true)} />
            </div>

            {/* Content Layer */}
            <div className="max-w-6xl mx-auto px-4 md:pl-32 mt-8 space-y-16 relative z-10">
                {/* Projects Section */}
                <section id="projects" className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" alt="dir" className="w-8 h-8" />
                            <h2 className="text-xl font-bold text-white shadow-sm">C:\Projeler</h2>
                        </div>
                        {isAdmin && (
                            <button onClick={() => { setEditingProject(null); setIsEditModalOpen(true); }} className="win-outset px-3 py-1 text-xs font-bold">Yeni Ekle</button>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
                        {projects.map((p, i) => (
                            <Window 
                                key={p.title + i} 
                                title={`${p.title}.exe`} 
                                isAdmin={isAdmin}
                                onEdit={() => { setEditingProject(p); setIsEditModalOpen(true); }}
                                onDelete={() => window.confirm('Silinsin mi?') && setProjects(projects.filter(pr => pr.title !== p.title))}
                                className="h-full"
                            >
                                <div className="flex flex-col h-full gap-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold truncate">{p.title}</h3>
                                            <p className="text-blue-800 text-xs font-bold">{p.subtitle}</p>
                                        </div>
                                        <div className="bg-gray-200 p-1 win-outset shrink-0">
                                            {p.iconName === 'MicIcon' && <MicIcon className="w-5 h-5"/>}
                                            {p.iconName === 'SpeakerIcon' && <SpeakerIcon className="w-5 h-5"/>}
                                            {p.iconName === 'StarIcon' && <StarIcon className="w-5 h-5"/>}
                                            {p.iconName === 'SheetIcon' && <SheetIcon className="w-5 h-5"/>}
                                            {p.iconName === 'DeskIcon' && <DeskIcon className="w-5 h-5"/>}
                                            {p.iconName === 'ClockIcon' && <ClockIcon className="w-5 h-5"/>}
                                        </div>
                                    </div>
                                    <p className="text-xs md:text-sm leading-relaxed border-l-2 border-gray-300 pl-3 py-0.5 italic text-gray-600 line-clamp-3">
                                        {p.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {p.tags.map(tag => (
                                            <span key={tag} className="bg-gray-100 border border-gray-400 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-tighter text-gray-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 pt-2 mt-auto">
                                        {p.liveUrl && (
                                            <a href={p.liveUrl} target="_blank" className="win-outset px-4 py-1 text-xs font-bold flex items-center gap-2 hover:bg-gray-300">
                                                <ExternalLinkIcon className="w-3 h-3"/> Başlat
                                            </a>
                                        )}
                                        {p.githubUrl && (
                                            <a href={p.githubUrl} target="_blank" className="win-outset px-4 py-1 text-xs font-bold flex items-center gap-2 hover:bg-gray-300">
                                                <GithubIcon className="w-3 h-3"/> Kodlar
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Window>
                        ))}
                    </div>
                </section>
            </div>

            {/* Minimized Info Window (Status Widget style) */}
            {isInfoOpen && (
                <div className="fixed bottom-[35px] right-2 z-[900] w-64 md:w-72">
                    <Window title="Sistem Durumu" onClose={() => setIsInfoOpen(false)} compact>
                        <div className="flex items-center gap-3">
                            <div className="win-inset p-1 bg-white shrink-0">
                                <img src="https://win98icons.alexmeub.com/icons/png/channels-0.png" alt="can" className="w-10 h-10 grayscale" />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="text-sm font-bold truncate">Can Akalın</h3>
                                <p className="text-[10px] leading-tight text-gray-600">İngilizce Öğretmeni</p>
                                <p className="text-[9px] text-blue-700 italic mt-1 truncate">Online & Hazır</p>
                            </div>
                        </div>
                    </Window>
                </div>
            )}

            {/* Game Window */}
            {isGameOpen && (
                <div className="fixed inset-0 z-[1500] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/20" onClick={() => setIsGameOpen(false)}></div>
                    <Window title="Mayın Tarlası v1.0" onClose={() => setIsGameOpen(false)} className="max-w-xs relative">
                        <Minesweeper />
                    </Window>
                </div>
            )}

            {/* System Bars */}
            <Taskbar onStartClick={() => setIsStartOpen(!isStartOpen)} />
            {isStartOpen && <StartMenu onClose={() => setIsStartOpen(false)} />}

            {/* Admin Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4">
                    <Window title="Proje Düzenleyici" onClose={() => setIsEditModalOpen(false)} className="max-w-lg">
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-red-600">Sistem yöneticisi girişi yapıldı.</p>
                            <input className="win-inset w-full p-2 text-sm outline-none" placeholder="Başlık" value={editingProject?.title || ''} onChange={e => setEditingProject({...editingProject!, title: e.target.value} as Project)} />
                            <input className="win-inset w-full p-2 text-sm outline-none" placeholder="Alt Başlık" value={editingProject?.subtitle || ''} onChange={e => setEditingProject({...editingProject!, subtitle: e.target.value} as Project)} />
                            <textarea className="win-inset w-full p-2 text-sm outline-none h-24" placeholder="Açıklama" value={editingProject?.description || ''} onChange={e => setEditingProject({...editingProject!, description: e.target.value} as Project)} />
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setIsEditModalOpen(false)} className="win-outset px-4 py-2 text-sm">Vazgeç</button>
                                <button onClick={() => {
                                    if(editingProject) {
                                        setProjects(prev => prev.some(p => p.title === editingProject.title) 
                                            ? prev.map(p => p.title === editingProject.title ? editingProject : p)
                                            : [...prev, editingProject]);
                                    }
                                    setIsEditModalOpen(false);
                                }} className="win-outset px-6 py-2 text-sm font-bold">Kaydet</button>
                            </div>
                        </div>
                    </Window>
                </div>
            )}
        </div>
    );
}

export default App;