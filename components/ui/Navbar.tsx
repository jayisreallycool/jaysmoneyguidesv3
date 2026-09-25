'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp, Search, Bookmark, Shield, FileText, Mail, Lock, X, Sparkles,
  ChevronDown, ChevronRight, BookOpen, ShoppingBag, Layers, Calculator,
  Database, ExternalLink, Tag, LogIn, LogOut, User as UserIcon, Check,
  Flame, Zap, Award, Share2, Compass, ArrowRight, CheckCircle2, Cookie,
  AlertTriangle, HelpCircle,
} from 'lucide-react';
import { Category, ModalView, User, Product } from '@/lib/types';
import { PRODUCTS } from '@/lib/products';
import { GoogleAdSenseBanner } from './GoogleAdSenseBanner';

const ADMIN_EMAIL = 'jayisreallycool@gmail.com';

interface NavbarProps {
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  openModal: (view: ModalView) => void;
  bookmarkedCount: number;
  onToggleBookmarksOnly: () => void;
  showBookmarksOnly: boolean;
  currentUser: User | null;
  onLogout: () => void;
  postCounts?: Record<string, number>;
  totalPostsCount?: number;
  onOpenFreeEbookOrOwned?: (product: Product) => void;
  onPreviewProduct?: (product: Product) => void;
  onSubscribeSuccess?: (email: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  openModal,
  bookmarkedCount,
  onToggleBookmarksOnly,
  showBookmarksOnly,
  currentUser,
  onLogout,
  postCounts = {},
  totalPostsCount = 8,
  onOpenFreeEbookOrOwned,
  onPreviewProduct,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const menuSearchRef = useRef<HTMLInputElement>(null);

  const categories: { name: Category; description: string; icon: React.FC<{ className?: string }>; color: string }[] = [
    { name: 'Affiliate Marketing', description: 'High-ticket programs, SaaS recurring & funnels', icon: TrendingUp, color: 'emerald' },
    { name: 'SEO', description: 'Topical authority, programmatic SEO & rankings', icon: Zap, color: 'teal' },
    { name: 'Blogging', description: 'Editorial calendars, writing frameworks & traffic', icon: BookOpen, color: 'indigo' },
    { name: 'Tech', description: 'No-code automation, dev tools & analytics', icon: Database, color: 'blue' },
    { name: 'Entrepreneurship', description: 'Solopreneur OS, pricing & leverage assets', icon: Award, color: 'amber' },
    { name: 'SoFi Bank', description: 'Loans, refinancing & smart money moves', icon: Award, color: 'emerald' },
  ];

  const isAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL;
  const freeProduct = PRODUCTS.find((p) => p.isFree) || PRODUCTS[0];
  const paidProduct = PRODUCTS.find((p) => !p.isFree) || PRODUCTS[1];
  const quickSearchTags = ['Affiliate Marketing', 'Programmatic SEO', 'Free eBook', 'Newsletter Funnels', 'Tech Stack', 'Cash Flow'];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => menuSearchRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = '';
      setMenuSearch('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const close = () => setIsMenuOpen(false);

  const scrollTo = (id: string) => {
    close();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const handleSelectCategory = (cat: Category | 'All') => {
    onSelectCategory(cat);
    if (showBookmarksOnly) onToggleBookmarksOnly();
    close();
    setTimeout(() => document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const handleSearch = (q: string) => {
    onSearchChange(q);
    close();
    setTimeout(() => document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="relative z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      {/* ── Top bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* Logo */}
          <button
            onClick={() => { onSelectCategory('All'); if (showBookmarksOnly) onToggleBookmarksOnly(); }}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer shrink-0"
            aria-label="JaysMoneyGuides home"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/40 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/jay-character-small.webp"
                alt="Jay — JaysMoneyGuides mascot"
                width={36}
                height={36}
                className="w-full h-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
                Jays<span className="text-emerald-400">Money</span>Guides
              </span>
              <span className="block text-[9px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5">
                Actionable Business Blueprints
              </span>
            </div>
          </button>

          {/* Desktop search */}
          <div className="hidden md:flex items-center w-full max-w-[220px] lg:max-w-[250px]">
            <div className="relative w-full">
              <label htmlFor="desktop-search-input" className="sr-only">Search guides</label>
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                id="desktop-search-input"
                type="text"
                placeholder="Search blueprints..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700/80 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              {searchQuery && (
                <button onClick={() => onSearchChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer" aria-label="Clear search">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium" aria-label="Main navigation">
            <button
              onClick={() => { onSelectCategory('All'); if (showBookmarksOnly) onToggleBookmarksOnly(); }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${selectedCategory === 'All' && !showBookmarksOnly ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
            >
              All Guides
            </button>

            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${selectedCategory !== 'All' && !showBookmarksOnly ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
              >
                Categories <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-2 z-50 animate-fadeIn" onMouseLeave={() => setIsCategoryDropdownOpen(false)}>
                  {categories.map((cat) => (
                    <button key={cat.name} onClick={() => { onSelectCategory(cat.name); if (showBookmarksOnly) onToggleBookmarksOnly(); setIsCategoryDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between cursor-pointer ${selectedCategory === cat.name && !showBookmarksOnly ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-300 hover:bg-slate-700/60 hover:text-white'}`}>
                      <span>{cat.name}</span>
                      {postCounts[cat.name] !== undefined && <span className="text-[11px] text-slate-400">({postCounts[cat.name]})</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => scrollTo('ebooks')} className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer">
              <ShoppingBag className="w-4 h-4 text-emerald-400" aria-hidden="true" /> eBooks
            </button>
            <a href="/tools" className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">Tools</a>
            <button onClick={() => { openModal('contact'); }} className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer">
              <Mail className="w-4 h-4 text-emerald-400" aria-hidden="true" /> Contact
            </button>
            {isAdmin && (
              <button onClick={() => openModal('admin')} className="hidden sm:flex bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs items-center gap-1.5 transition-all active:scale-95 cursor-pointer">
                <Lock className="w-3.5 h-3.5" /> Admin
              </button>
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onToggleBookmarksOnly}
              className={`relative p-2 rounded-xl border transition-all cursor-pointer ${showBookmarksOnly ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white hover:border-slate-600'}`}
              title="Saved Reading List"
              aria-label="Saved Reading List"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{bookmarkedCount}</span>
              )}
            </button>

            {!currentUser ? (
              <button onClick={() => openModal('auth')} className="flex bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-extrabold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm items-center gap-2 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer">
                <LogIn className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Login</span>
                <span className="sm:hidden">Sign In</span>
              </button>
            ) : (
              <div className="relative">
                <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold p-1 pr-3 rounded-xl text-xs flex items-center gap-2 border border-slate-700 transition-all cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">{currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}</div>
                  <span className="hidden sm:inline-block max-w-[80px] truncate">{currentUser.name || 'User'}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-2 z-50 animate-fadeIn" onMouseLeave={() => setIsUserDropdownOpen(false)}>
                    <div className="px-3 py-1.5 border-b border-slate-700/60 mb-1">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                    <button onClick={() => { openModal('profile'); setIsUserDropdownOpen(false); }} className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2 cursor-pointer">
                      <UserIcon className="w-3.5 h-3.5 text-emerald-400" /> My Purchases & Profile
                    </button>
                    {isAdmin && (
                      <button onClick={() => { openModal('admin'); setIsUserDropdownOpen(false); }} className="w-full text-left px-3.5 py-2 text-xs text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2 cursor-pointer">
                        <Lock className="w-3.5 h-3.5 text-emerald-400" /> Admin Console
                      </button>
                    )}
                    <div className="border-t border-slate-700/80 my-1" />
                    <button onClick={() => { onLogout(); setIsUserDropdownOpen(false); }} className="w-full text-left px-3.5 py-2 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 font-semibold cursor-pointer">
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── Hamburger button ── */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="slide-menu"
              className={`relative group px-2.5 sm:px-3 py-2 rounded-xl border-2 transition-all duration-300 flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                isMenuOpen
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-800 text-slate-100 border-slate-600 hover:border-emerald-400 hover:bg-slate-700'
              }`}
            >
              <div className="relative w-5 h-5 flex flex-col justify-center items-center" aria-hidden="true">
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-slate-950 w-5 rotate-45 translate-y-1.5' : 'bg-slate-100 w-4 -translate-y-1'}`} />
                <span className={`block h-0.5 rounded-full transition-all duration-200 ${isMenuOpen ? 'opacity-0 scale-x-0' : 'bg-slate-100 w-3 self-start'}`} />
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${isMenuOpen ? 'bg-slate-950 w-5 -rotate-45 -translate-y-1.5' : 'bg-slate-100 w-4 translate-y-1'}`} />
              </div>
              <span className="text-xs font-extrabold tracking-wide hidden sm:inline">{isMenuOpen ? 'Close' : 'Menu'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Slide-down mega menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
              onClick={close}
              aria-hidden="true"
            />

            {/* Menu panel */}
            <motion.div
              id="slide-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 z-50 bg-slate-950 border-b border-emerald-500/20 shadow-2xl overflow-hidden"
              style={{ maxHeight: 'calc(100vh - 98px)', overflowY: 'auto' }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">

                {/* ── Character + Brand Hero Banner ── */}
                <div className="relative w-full overflow-hidden rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900" style={{ minHeight: '90px' }}>
                  {/* Background banner image */}
                  <img
                    src="/jay-character-banner.webp"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-slate-950/80" />

                  {/* Content row */}
                  <div className="relative z-10 flex items-center gap-4 px-4 py-3">
                    {/* Character avatar */}
                    <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-xl shadow-emerald-950/50 bg-slate-900">
                      <img
                        src="/jay-character-small.webp"
                        alt="Jay — JaysMoneyGuides mascot with green cap and shirt"
                        width={80}
                        height={80}
                        loading="eager"
                        decoding="async"
                        className="w-full h-full object-cover object-top scale-110"
                      />
                    </div>

                    {/* Brand text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base sm:text-lg font-black text-white tracking-tight leading-none">
                          Jays<span className="text-emerald-400">Money</span>Guides
                        </h2>
                        <span className="inline-flex items-center gap-1 bg-emerald-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                          <Sparkles className="w-2.5 h-2.5" aria-hidden="true" /> Official
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-snug">
                        By Jay Lopez — Affiliate Marketing, SEO & Online Business Blueprints
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          <BookOpen className="w-3 h-3" aria-hidden="true" /> 57 Free Guides
                        </span>
                        <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                          <ShoppingBag className="w-3 h-3" aria-hidden="true" /> eBook Store
                        </span>
                        <span className="text-[10px] text-teal-400 font-bold flex items-center gap-1">
                          <Zap className="w-3 h-3" aria-hidden="true" /> 30+ Tools
                        </span>
                      </div>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={close}
                      className="shrink-0 w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ── AdSense banner ── */}
                <div className="w-full">
                  <GoogleAdSenseBanner
                    slot="top-slide-menu-ad"
                    variant="menu-top"
                    onOpenPolicy={(view) => { openModal(view); close(); }}
                  />
                </div>

                {/* ── Search bar ── */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:px-4">
                  <div className="relative w-full md:w-80">
                    <label htmlFor="menu-search" className="sr-only">Search guides</label>
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    <input
                      ref={menuSearchRef}
                      id="menu-search"
                      type="search"
                      placeholder="Search guides, strategies, handbooks..."
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && menuSearch.trim()) handleSearch(menuSearch.trim()); }}
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-8 pr-10 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                    />
                    {menuSearch && (
                      <button onClick={() => setMenuSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer" aria-label="Clear search">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full md:w-auto text-[11px]">
                    <span className="text-slate-500 font-bold flex items-center gap-1 shrink-0 text-[10px] uppercase tracking-wider">
                      <Tag className="w-3 h-3 text-emerald-400" aria-hidden="true" /> Quick:
                    </span>
                    {quickSearchTags.map((tag) => (
                      <button key={tag} onClick={() => handleSearch(tag)}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 text-[11px] font-medium border border-slate-800 hover:border-emerald-500/30 cursor-pointer whitespace-nowrap shrink-0 transition-colors">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Mega grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  {/* Col 1: Destinations */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" aria-hidden="true" /> Destinations
                    </span>
                    <div className="space-y-1">
                      {[
                        { icon: BookOpen, label: 'All Blueprints', badge: String(totalPostsCount), action: () => handleSelectCategory('All'), iconColor: 'text-emerald-400' },
                        { icon: ShoppingBag, label: 'eBook Store', badge: 'STORE', badgeClass: 'text-amber-300 bg-amber-500/10 border-amber-500/20', action: () => scrollTo('ebooks'), iconColor: 'text-amber-400' },
                        { icon: Zap, label: 'Tools & Programs', badge: '30+', action: () => { close(); }, href: '/tools', iconColor: 'text-yellow-400' },
                        { icon: Award, label: 'SoFi Bank Guides', badge: 'NEW', badgeClass: 'text-blue-300 bg-blue-500/10 border-blue-500/20', action: close, href: '/sofi-bank', iconColor: 'text-blue-400' },
                        { icon: Calculator, label: 'ROI Calculator', action: () => scrollTo('affiliate-calculator-section'), iconColor: 'text-emerald-400' },
                        { icon: FileText, label: 'Blog', href: '/blog', action: close, iconColor: 'text-blue-400' },
                        { icon: Mail, label: 'Contact Us', action: () => { openModal('contact'); close(); }, iconColor: 'text-emerald-400' },
                        ...(isAdmin ? [{ icon: Database, label: 'Media Database', action: () => { openModal('media-database'); close(); }, iconColor: 'text-blue-400' }] : []),
                      ].map(({ icon: Icon, label, badge, badgeClass, action, href, iconColor }) => (
                        href ? (
                          <a key={label} href={href} onClick={action}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 hover:text-white flex items-center justify-between group transition-colors">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 ${iconColor}`} aria-hidden="true" />
                              <span className="font-semibold">{label}</span>
                            </div>
                            {badge && <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${badgeClass || 'text-slate-500 bg-slate-950 border-slate-800'}`}>{badge}</span>}
                          </a>
                        ) : (
                          <button key={label} onClick={action}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 hover:text-white flex items-center justify-between group transition-colors cursor-pointer">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 ${iconColor}`} aria-hidden="true" />
                              <span className="font-semibold">{label}</span>
                            </div>
                            {badge ? <span className={`text-[10px] px-1.5 py-0.5 rounded border font-bold ${badgeClass || 'text-slate-500 bg-slate-950 border-slate-800'}`}>{badge}</span>
                              : <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white" aria-hidden="true" />}
                          </button>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Col 2: Categories */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" aria-hidden="true" /> Topic Categories
                    </span>
                    <div className="space-y-1">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = selectedCategory === cat.name && !showBookmarksOnly;
                        return (
                          <button key={cat.name} onClick={() => handleSelectCategory(cat.name)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between group transition-all cursor-pointer ${isSelected ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                              <span>{cat.name}</span>
                            </div>
                            {postCounts[cat.name] !== undefined && <span className="text-[10px] text-slate-400">{postCounts[cat.name]}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Col 3: Digital Handbooks */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> Digital Handbooks
                    </span>
                    <div className="space-y-2.5">
                      <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">100% Free</span>
                          <span className="text-[10px] text-slate-400">{freeProduct.pageCount} Pages</span>
                        </div>
                        <p className="text-xs font-bold text-white line-clamp-2 leading-snug">{freeProduct.title}</p>
                        <button onClick={() => { if (onOpenFreeEbookOrOwned) onOpenFreeEbookOrOwned(freeProduct); close(); }}
                          className="w-full py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-[11px] transition-colors cursor-pointer">
                          Read Free Handbook
                        </button>
                      </div>
                      <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black uppercase text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">Master Edition</span>
                          <span className="text-[11px] text-emerald-400 font-bold">$9.99</span>
                        </div>
                        <p className="text-xs font-bold text-white line-clamp-2 leading-snug">{paidProduct.title}</p>
                        <button onClick={() => { if (onPreviewProduct) onPreviewProduct(paidProduct); close(); }}
                          className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-[11px] transition-colors border border-slate-700 cursor-pointer">
                          Preview Handbook
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Col 4: Legal & Policy */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" aria-hidden="true" /> Legal & Policy
                    </span>
                    <div className="space-y-1">
                      {[
                        { icon: Shield, label: 'Privacy Policy', action: () => { openModal('privacy'); close(); } },
                        { icon: FileText, label: 'Terms of Service', action: () => { openModal('terms'); close(); } },
                        { icon: AlertTriangle, label: 'Disclaimer & FTC', action: () => { openModal('disclaimer'); close(); }, iconColor: 'text-amber-400' },
                        { icon: UserIcon, label: 'About Jay Lopez', action: close, href: '/about', iconColor: 'text-slate-400' },
                        { icon: Mail, label: 'Contact Us', action: () => { openModal('contact'); close(); } },
                        { icon: Cookie, label: 'Cookie Policy & AdChoices', action: () => { openModal('cookie-policy'); close(); } },
                      ].map(({ icon: Icon, label, action, iconColor, href }) => (
                        href ? (
                          <a key={label} href={href} onClick={action}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-emerald-300 flex items-center gap-2 transition-colors">
                            <Icon className={`w-3.5 h-3.5 ${iconColor || 'text-emerald-400'} shrink-0`} aria-hidden="true" />
                            <span>{label}</span>
                          </a>
                        ) : (
                          <button key={label} onClick={action}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 hover:text-emerald-300 flex items-center gap-2 transition-colors cursor-pointer">
                            <Icon className={`w-3.5 h-3.5 ${iconColor || 'text-emerald-400'} shrink-0`} aria-hidden="true" />
                            <span>{label}</span>
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Footer status bar ── */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                    <button onClick={handleCopyLink} className="flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 cursor-pointer transition-colors">
                      {copiedLink ? <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /><span className="text-emerald-300 font-bold">Copied!</span></> : <><Share2 className="w-3.5 h-3.5" /><span>Share</span></>}
                    </button>
                    <span className="text-slate-500 hidden sm:inline">•</span>
                    <span className="text-slate-500">Google AdSense & FTC Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!currentUser ? (
                      <button onClick={() => { openModal('auth'); close(); }} className="text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1 cursor-pointer">
                        <LogIn className="w-3.5 h-3.5" /> Sign In with Google
                      </button>
                    ) : (
                      <span className="text-slate-400">Logged in as <strong className="text-white">{currentUser.name}</strong></span>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
