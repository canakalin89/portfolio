import React from 'react';
import { ExternalLinkIcon, EmailIcon, InstagramIcon, MicIcon, PuzzleIcon } from './components/Icons';

const App: React.FC = () => {
    return (
        <div className="min-h-screen" style={{ background: '#f8fafc' }}>
            {/* Nav */}
            <nav className="max-w-3xl mx-auto px-6 pt-10 pb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-400 tracking-wide">can akalın</span>
                <div className="flex items-center gap-3">
                    <a
                        href="mailto:canakalin59@gmail.com"
                        className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-indigo-500"
                        title="E-posta"
                    >
                        <EmailIcon className="w-4 h-4" />
                    </a>
                    <a
                        href="https://www.instagram.com/can_akalin"
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-indigo-500"
                        title="Instagram"
                    >
                        <InstagramIcon className="w-4 h-4" />
                    </a>
                </div>
            </nav>

            {/* Hero */}
            <header className="max-w-3xl mx-auto px-6 pt-16 pb-20">
                <div className="mb-4">
                    <span className="tag">Öğretmen &amp; Geliştirici</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
                    Eğitim teknolojileri için<br />
                    <span className="accent-text">AI destekli araçlar</span> üretiyorum.
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
                    Lise İngilizce öğretmeni olarak sınıfın içindeki gerçek ihtiyaçları görüyorum
                    ve bunları çözmek için yazılım geliştiriyorum.
                </p>
            </header>

            <div className="divider max-w-3xl mx-auto px-6"></div>

            {/* Project */}
            <main className="max-w-3xl mx-auto px-6 py-16">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">Projeler</h2>

                <div className="card p-8">
                    <div className="flex items-start gap-5 mb-6">
                        <div className="icon-wrap">
                            <MicIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">ChitIQ</h3>
                            <p className="text-sm font-medium accent-text">İngilizce Konuşma Asistanı</p>
                        </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        Lise öğrencilerinin konuşma sınavlarına hazırlanmasını kolaylaştıran AI tabanlı
                        bir asistan. Telaffuz ve akıcılık analizleri sunarak sınav kaygısını azaltır,
                        öğrencilere güvenli bir pratik ortamı sağlar.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {['AI', 'EduTech', 'English', 'Speaking'].map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <a
                            href="https://chitiq.netlify.app"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary"
                        >
                            <ExternalLinkIcon className="w-4 h-4" />
                            Uygulamayı Aç
                        </a>
                    </div>
                </div>

                {/* Gelişim Raporu Asistanı */}
                <div className="card p-8 mt-6">
                    <div className="flex items-start gap-5 mb-6">
                        <div className="icon-wrap">
                            <PuzzleIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">Gelişim Raporu Asistanı</h3>
                            <p className="text-sm font-medium accent-text">Chrome Uzantısı</p>
                        </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                        Gelişim raporu formlarını not tabanlı veya manuel olarak otomatik doldurur ve temizler.
                        Öğretmenler için zaman kazandıran bir Chrome uzantısı. Giriş gerektirmez.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {['Chrome', 'EduTech', 'Otomasyon'].map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <a
                            href="https://chromewebstore.google.com/detail/geli%C5%9Fim-raporu-asistan%C4%B1/ljcjidfmpfnilniagebhccolaidkpogb"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary"
                        >
                            <ExternalLinkIcon className="w-4 h-4" />
                            Chrome'a Ekle
                        </a>
                        <a
                            href="https://github.com/canakalin89/gelisim-raporu-asistani"
                            target="_blank"
                            rel="noreferrer"
                            className="btn-ghost"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </main>

            <div className="divider max-w-3xl mx-auto px-6"></div>

            {/* Footer */}
            <footer className="max-w-3xl mx-auto px-6 py-10 text-center">
                <p className="text-xs text-slate-400">
                    &copy; 2026 Can Akalın
                </p>
            </footer>
        </div>
    );
};

export default App;
