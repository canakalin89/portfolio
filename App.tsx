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
    StarIcon
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
        subtitle: 'İngilizce Konuşma Sınavı Hazırlık Asistanı',
        description: 'ChitIQ, Türkiye Yüzyılı Maarif Modeli’ne tam uyumlu olarak geliştirilmiş bir yapay zeka asistanıdır. Lise düzeyindeki öğrencilerin İngilizce konuşma sınavlarında karşılaştıkları kaygıyı azaltmayı ve performanslarını objektif kriterlerle ölçmeyi hedefler. Uygulama, kullanıcının sesini gerçek zamanlı analiz ederek dil bilgisi, telaffuz ve akıcılık üzerinden detaylı bir gelişim karnesi sunar.',
        tags: ["Eğitim", "AI", "İngilizce", "Maarif Modeli"],
        liveUrl: 'https://chitiq-v2-185961838379.us-west1.run.app',
        featured: true
    },
    {
        iconName: 'SheetIcon',
        iconBgColor: 'bg-emerald-600',
        title: 'OKULREHBER',
        subtitle: 'Dijital Bilgilendirme ve Pano Sistemi',
        description: 'Okul ortamındaki dijital ekranların (akıllı tahtalar, koridor ekranları) verimli kullanılmasını sağlayan profesyonel bir yönetim panelidir. MEB yönetmeliğiyle uyumlu rehberlik metinlerini, okul duyurularını ve güncel eğitim haberlerini interaktif bir arayüzle sunar. Öğrencilerin teneffüslerde veya boş zamanlarında bilgilendirici içeriklere kolayca ulaşmasını sağlayarak dijital okuryazarlığı destekler.',
        tags: ["Yönetim", "Rehberlik", "Digital Signage"],
        liveUrl: 'https://okulrehber-185961838379.us-west1.run.app',
    },
    {
        iconName: 'DeskIcon',
        iconBgColor: 'bg-orange-500',
        title: 'Classmate Creator',
        subtitle: '9. Sınıf İnteraktif Tanışma Aracı',
        description: '9. Sınıf İngilizce müfredatının ilk ünitelerinde yer alan "tanışma ve kişisel bilgiler" konularını eğlenceli hale getiren bir dijital materyaldir. Öğrencilerin kendi dijital avatarlarını oluşturup arkadaşlarıyla İngilizce soru-cevap pratikleri yapmalarına olanak tanır. Sınıf içi etkileşimi artırarak buzları eritir ve dil öğrenimini oyunlaştırılmış bir deneyime dönüştürür.',
        tags: ["9. Sınıf", "Oyunlaştırma", "İngilizce"],
        liveUrl: 'https://classmate-creator-9th-grade-english-185961838379.us-west1.run.app',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'bg-rose-600',
        title: 'Atatürk Köşesi: Hikayeler',
        subtitle: 'Çok Kanallı Dijital Hikaye Anlatımı',
        description: 'Atatürk’ün hayatından kesitleri, insani yönlerini ve inkılap tarihini görsel-işitsel öğelerle birleştiren zengin bir kütüphanedir. Her hikaye, öğrencilerin dikkatini çekecek şekilde yapay zeka tarafından desteklenen görseller ve seslendirmelerle harmanlanmıştır. Milli bilinci modern teknolojilerle genç kuşaklara aktarmayı hedefleyen bir projedir.',
        tags: ["Tarih", "Eğitim", "Atatürk"],
        liveUrl: 'https://atat-rk-k-esi-hikayeler-185961838379.us-west1.run.app',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'bg-red-600',
        title: "Atatürk'ün Hayatı",
        subtitle: 'Dijital İz ve Kronolojik Yolculuk',
        description: "Gazi Mustafa Kemal Atatürk'ün askeri ve siyasi dehasının ötesinde, fikir dünyasına odaklanan interaktif bir yaşam öyküsüdür. Kullanıcılar, kronolojik bir zaman çizelgesi üzerinden önemli dönüm noktalarına dokunarak belgeler, anılar ve nadir görseller eşliğinde bir tarih yolculuğuna çıkarlar. Eğitimciler için sınıf içi sunumlarda eşsiz bir kaynak teşkil eder.",
        tags: ["Dijital Arşiv", "Tarih", "Eğitim"],
        githubUrl: 'https://github.com/canakalin89/atam-dijital-iz',
        liveUrl: 'https://atam-dijital-iz.lovable.app/',
    },
    {
        iconName: 'StarIcon',
        iconBgColor: 'bg-red-700',
        title: 'İnkılap Tarihi Panosu',
        subtitle: 'Sınıf İçi İnteraktif Öğrenme Duvarı',
        description: 'LGS ve YKS hazırlık sürecinde İnkılap Tarihi derslerini daha somut hale getiren bir dijital pano sistemidir. Haritalar, kavram haritaları ve soru çözümleriyle zenginleştirilmiş içeriği sayesinde öğrencilerin karmaşık tarihi olayları neden-sonuç ilişkisi içerisinde kavramasına yardımcı olur. Akıllı tahtalarda tam ekran deneyimi için optimize edilmiştir.',
        tags: ["Sınav Hazırlık", "LGS", "YKS"],
        githubUrl: 'https://github.com/canakalin89/ata_pano',
        liveUrl: 'https://atam1923.netlify.app/',
    },
    {
        iconName: 'ClockIcon',
        iconBgColor: 'bg-purple-500',
        title: 'YKS Geri Sayım',
        subtitle: 'Sınav Kaygı Yönetimi ve Fokus',
        description: 'Sadece bir geri sayım aracı değil, aynı zamanda öğrencilerin günlük çalışma rutinlerini düzenlemelerine yardımcı olan bir motivasyon merkezidir. Sınava kalan süreyi saniye bazında gösterirken, her gün için yeni bir başarı sözü ve verimli ders çalışma teknikleri sunar. Basit, odak dağıtmayan ve tamamen öğrenci psikolojisine hitap eden bir arayüzle tasarlanmıştır.',
        tags: ["Motivasyon", "Verimlilik", "YKS"],
        githubUrl: 'https://github.com/canakalin89/sayac_web',
        liveUrl: 'https://asalyks.netlify.app/',
    },
];

// --- Sub-components ---

const BackgroundBlobs: React.FC = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 -left-10 w-72 md:w-96 h-72 md:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-10 -right-10 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-10 w-72 md:w-96 h-72 md:h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
    </div>
);

const Header: React.FC = () => (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 accent-gradient rounded-lg md:rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 text-sm md:text-base">
                    CA
                </div>
                <span className="font-bold text-lg md:text-xl tracking-tight text-white">Can Akalın</span>
            </div>
            <nav className="flex gap-4 md:gap-10">
                <a href="#projects" className="text-xs md:text-sm font-semibold text-slate-300 hover:text-white transition-colors">Çalışmalarım</a>
                <a href="#contact" className="text-xs md:text-sm font-semibold text-slate-300 hover:text-white transition-colors">İletişim</a>
            </nav>
        </div>
    </header>
);

const Hero: React.FC = () => (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 pt-20 text-center">
        <div className="max-w-4xl w-full space-y-6 md:space-y-10">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] md:leading-none">
                Eğitimi <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Yapay Zeka</span> ile Şekillendiriyorum
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium px-2">
                Sınıf içerisindeki zorluklara yapay zeka desteğiyle yenilikçi çözümler üretiyor, meslektaşlarım ve öğrencilerim için etkileşimli dijital materyaller tasarlıyorum.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 md:pt-8 w-full max-w-md mx-auto">
                <a href="#projects" className="px-8 py-4 md:px-10 md:py-5 bg-white text-slate-950 font-extrabold rounded-2xl hover:scale-105 transition shadow-2xl shadow-white/10 w-full sm:w-auto text-sm md:text-base">
                    Projelerimi Gör
                </a>
                <a href="#contact" className="px-8 py-4 md:px-10 md:py-5 bg-slate-800 text-white font-extrabold rounded-2xl border border-white/5 hover:bg-slate-700 transition w-full sm:w-auto text-sm md:text-base">
                    Bana Ulaşın
                </a>
            </div>
        </div>
    </section>
);

const ProjectCard: React.FC<{ project: Project; isAdmin: boolean; onEdit: any; onDelete: any }> = ({ project, isAdmin, onEdit, onDelete }) => {
    const MainIcon = iconMap[project.iconName] || iconMap.StarIcon;
    const isFeatured = project.featured;
    
    return (
        <div className={`glass-card group rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col relative transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 ${isFeatured ? 'md:col-span-2' : ''}`}>
             {isAdmin && (
                <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-2 z-20">
                    <button onClick={() => onEdit(project)} className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
                        <EditIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button onClick={() => onDelete(project.title)} className="p-2 bg-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                        <TrashIcon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            )}
            
            <div className={`p-6 md:p-10 flex flex-col h-full ${isFeatured ? 'lg:flex-row lg:gap-12 lg:items-center' : ''}`}>
                <div className={`${isFeatured ? 'lg:w-1/3' : 'mb-6 md:mb-8'}`}>
                    <div className={`w-14 h-14 md:w-20 md:h-20 ${project.iconBgColor} rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                        <MainIcon className="w-7 h-7 md:w-10 md:h-10 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">{project.title}</h3>
                    <p className="text-indigo-400 font-bold text-sm md:text-base mb-4 md:mb-6">{project.subtitle}</p>
                    
                    {isFeatured && (
                         <div className="flex flex-col gap-3 mb-6 lg:mb-0">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center accent-gradient text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all hover:opacity-90 shadow-xl shadow-indigo-500/20 text-sm md:text-base">
                                    <ExternalLinkIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" /> Uygulamayı Başlat
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-white/5 border border-white/10 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all hover:bg-white/10 text-sm md:text-base">
                                    <GithubIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" /> İncele
                                </a>
                            )}
                         </div>
                    )}
                </div>

                <div className={`${isFeatured ? 'lg:w-2/3' : 'flex-grow flex flex-col'}`}>
                    <p className="text-slate-400 mb-6 md:mb-8 leading-relaxed text-sm md:text-lg font-medium">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-white/5 border border-white/10 text-slate-300 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-sm font-semibold">
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    {!isFeatured && (
                        <div className="flex gap-3 md:gap-4 mt-8 md:mt-10">
                             {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 accent-gradient text-white px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl font-bold text-center text-sm md:text-base transition-all hover:opacity-90 shadow-lg shadow-indigo-500/10">
                                    Dene
                                </a>
                            )}
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 md:p-4 bg-white/5 border border-white/10 text-white rounded-xl md:rounded-2xl transition-all hover:bg-white/10">
                                    <GithubIcon className="w-5 h-5 md:w-6 md:h-6" />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Projects: React.FC<{ projects: Project[]; isAdmin: boolean; onEdit: any; onDelete: any; onAdd: any }> = ({ projects, isAdmin, onEdit, onDelete, onAdd }) => (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Fikirlerim ve Ürettiklerim</h2>
                    <p className="text-slate-400 max-w-2xl text-base md:text-xl font-medium">
                        Eğitimi daha verimli, modern ve keyifli hale getirmek için paylaştığım çalışmalarım.
                    </p>
                </div>
                {isAdmin && (
                    <button onClick={onAdd} className="flex items-center gap-2 bg-indigo-500 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl hover:bg-indigo-600 transition shadow-2xl shadow-indigo-500/30 text-sm md:text-base">
                        <PlusIcon className="w-5 h-5 md:w-6 md:h-6" /> Yeni İçerik Ekle
                    </button>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
                {projects.map((p, idx) => <ProjectCard key={p.title + idx} project={p} isAdmin={isAdmin} onEdit={onEdit} onDelete={onDelete} />)}
            </div>
        </div>
    </section>
);

const Contact: React.FC = () => (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-8 relative">
        <div className="max-w-5xl mx-auto glass-card rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 md:w-80 h-64 md:h-80 accent-gradient rounded-full filter blur-[80px] md:blur-[120px] opacity-10"></div>
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">İletişimde Kalalım</h2>
            <p className="text-base md:text-2xl text-slate-400 mb-10 md:mb-16 max-w-3xl mx-auto font-medium leading-relaxed px-2">
                Eğitim teknolojileri veya yeni fikirler üzerine konuşmak isterseniz bana her zaman ulaşabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 w-full max-w-xl mx-auto">
                <a href="mailto:canakalin59@gmail.com" className="flex items-center justify-center w-full bg-white text-slate-950 px-6 py-4 md:px-10 md:py-5 rounded-2xl md:rounded-3xl font-black text-sm md:text-lg transition-transform hover:scale-105 shadow-xl shadow-white/5">
                    <EmailIcon className="w-5 h-5 md:w-7 md:h-7 mr-3 md:mr-4" /> E-posta Gönder
                </a>
                <a href="https://www.instagram.com/can_akalin" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-slate-800 text-white px-6 py-4 md:px-10 md:py-5 rounded-2xl md:rounded-3xl font-black text-sm md:text-lg transition-transform hover:scale-105 border border-white/10">
                    <InstagramIcon className="w-5 h-5 md:w-7 md:h-7 mr-3 md:mr-4" /> Instagram
                </a>
            </div>
        </div>
    </section>
);

const Footer: React.FC = () => (
    <footer className="py-12 md:py-16 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-10 h-10 accent-gradient rounded-xl flex items-center justify-center font-black text-white text-sm">CA</div>
                <div className="flex flex-col">
                    <span className="text-white font-bold text-base">Can Akalın</span>
                    <span className="text-slate-500 text-xs md:text-sm font-semibold">© 2025 Tüm Hakları Saklıdır.</span>
                </div>
            </div>
            <div className="flex gap-6 md:gap-8">
                <a href="https://github.com/canakalin89" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-all transform hover:scale-110">
                    <GithubIcon className="w-6 h-6 md:w-8 md:h-8" />
                </a>
                <a href="https://www.instagram.com/can_akalin" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-all transform hover:scale-110">
                    <InstagramIcon className="w-6 h-6 md:w-8 md:h-8" />
                </a>
            </div>
        </div>
    </footer>
);

// --- Admin Form ---
const ProjectForm: React.FC<{ project: Project | null; onSave: any; onClose: any }> = ({ project, onSave, onClose }) => {
    const [formData, setFormData] = useState<Omit<Project, 'tags'> & { tags: string }>({
        title: '', subtitle: '', description: '', tags: '',
        iconName: 'StarIcon', iconBgColor: 'bg-indigo-600', githubUrl: '', liveUrl: '',
        featured: false
    });

    useEffect(() => {
        if (project) setFormData({ ...project, tags: project.tags.join(', ') });
    }, [project]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) });
    };

    return (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[100] flex justify-center items-center p-4">
            <div className="glass-card rounded-[2rem] md:rounded-[3rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border-white/20">
                <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-6 md:space-y-8">
                    <h2 className="text-3xl md:text-4xl font-black text-white">{project ? 'Düzenle' : 'Yeni İçerik'}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Başlık</label>
                            <input name="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Kısa Açıklama</label>
                            <input name="subtitle" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Detaylı Bilgi</label>
                            <textarea name="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all h-32 md:h-40" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Uygulama Linki (URL)</label>
                            <input name="liveUrl" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded-lg border-white/10 accent-indigo-500" id="feat" />
                        <label htmlFor="feat" className="text-white font-bold text-base md:text-lg">Öne Çıkar (Vurgulu görünür)</label>
                    </div>
                    <div className="flex justify-end gap-4 md:gap-6 pt-6">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-slate-400 font-black hover:text-white transition">Vazgeç</button>
                        <button type="submit" className="px-8 py-3 md:px-12 md:py-4 accent-gradient text-white rounded-xl md:rounded-3xl font-black shadow-2xl shadow-indigo-500/30 hover:scale-105 transition">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- App Root ---

const App: React.FC = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

    const STORAGE_KEY = 'can_portfolio_responsive_v2';

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setProjects(JSON.parse(stored));
        } else {
            setProjects(initialProjects);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
        }
    }, []);

    useEffect(() => {
        if (projects.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }, [projects]);
    
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.altKey && e.key === 'p') {
                e.preventDefault();
                setIsAdmin(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, []);

    const handleSave = (projectData: Project) => {
        if (projectToEdit) {
            setProjects(prev => prev.map(p => p.title === projectToEdit.title ? projectData : p));
        } else {
            setProjects(prev => [...prev, projectData]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen text-slate-100 selection:bg-indigo-500/30 overflow-x-hidden">
            <BackgroundBlobs />
            <Header />
            <main>
                <Hero />
                <Projects 
                    projects={projects} 
                    isAdmin={isAdmin} 
                    onAdd={() => { setProjectToEdit(null); setIsModalOpen(true); }} 
                    onEdit={(p: Project) => { setProjectToEdit(p); setIsModalOpen(true); }} 
                    onDelete={(title: string) => window.confirm('Silmek istediğine emin misin?') && setProjects(prev => prev.filter(p => p.title !== title))} 
                />
                <Contact />
            </main>
            <Footer />
            {isModalOpen && <ProjectForm project={projectToEdit} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default App;