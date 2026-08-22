import React, { useState } from 'react';
import { useAIApp } from '../context/AIAppContext';
import {
  X,
  Zap,
  CheckCircle2,
  Sparkles,
  Building,
  Globe,
  Tag,
  Briefcase,
  DollarSign,
  Mail,
  Phone,
  ShieldCheck,
  Scale,
  ArrowRight
} from 'lucide-react';
import { AICategory, NewAIRegistrationInput, AITool } from '../types';

export const AIRegistrationModal: React.FC = () => {
  const { isRegisterModalOpen, closeRegisterModal, registerNewAI, openToolModal, setCompareSlot, scrollToSection } = useAIApp();

  const [formData, setFormData] = useState<NewAIRegistrationInput>({
    name: '',
    companyName: '',
    category: 'Education',
    tagline: '',
    description: '',
    workItDoes: '',
    url: '',
    pricingModel: 'Freemium',
    freeTier: 'Free trial / community access tier available',
    startingPrice: '$15 / month base tier',
    proTier: '$49 / month pro enterprise',
    strengths: '',
    weaknesses: '',
    bestFor: '',
    platforms: 'Web Browser, API, Cloud Portal',
    contactEmail: '',
    contactPhone: ''
  });

  const [registeredTool, setRegisteredTool] = useState<AITool | null>(null);

  if (!isRegisterModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.companyName || !formData.url || !formData.description) {
      return;
    }

    const res = registerNewAI(formData);
    if (res.success) {
      setRegisteredTool(res.tool);
    }
  };

  const handleClose = () => {
    setRegisteredTool(null);
    closeRegisterModal();
  };

  return (
    <div
      id="ai-registration-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#070e1c] border border-white/10 rounded-xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-900/60 border-b border-white/5 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider mb-1.5">
              <Zap className="w-3 h-3" />
              <span>Business Launchpad</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Launch & Register AI Innovation
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Register your AI on <strong>AI space</strong> to enable instant user comparison and recommendations.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-slate-800 border border-white/5 text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto text-xs">
          {registeredTool ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto text-green-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  {registeredTool.name} is Registered
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Your AI model is now available across the directory, recommender, and 3-way matrix.
                </p>
              </div>

              <div className="p-3.5 rounded bg-slate-900/60 border border-white/5 max-w-sm mx-auto text-left space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tool Name:</span>
                  <span className="font-semibold text-white">{registeredTool.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-blue-400">{registeredTool.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pricing Model:</span>
                  <span className="text-green-400">{registeredTool.pricing.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Link:</span>
                  <span className="text-blue-400 truncate max-w-[180px]">{registeredTool.url}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    openToolModal(registeredTool);
                  }}
                  className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    setCompareSlot(0, registeredTool);
                    handleClose();
                    scrollToSection('compare');
                  }}
                  className="px-4 py-1.5 rounded bg-slate-800 text-slate-300 hover:text-white border border-white/5 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare in Matrix</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Basic Info */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> 1. Identity & Details
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">AI Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. AgriVision Pro"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. TerraTech BioSystems"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as AICategory })}
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs font-medium"
                    >
                      <option value="Education">Education</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Image Generator">Image Generator</option>
                      <option value="Video Generation">Video Generation</option>
                      <option value="Chat Bot">Chat Bot</option>
                      <option value="Registered Innovation">Registered Innovation (Other)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Official URL *</label>
                    <input
                      type="url"
                      required
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://your-ai-domain.com"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Tagline & Work description */}
              <div className="pt-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> 2. Scope & Capabilities
                </h4>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Tagline *</label>
                    <input
                      type="text"
                      required
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="e.g. Multi-spectral agricultural yield forecaster"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Full Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the model's core purpose and audience..."
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">
                      Key Capabilities (1 per line) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formData.workItDoes}
                      onChange={(e) => setFormData({ ...formData, workItDoes: e.target.value })}
                      placeholder="Identifies crop pests in 2 seconds&#10;Generates automated fertilizer schedules"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="pt-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-green-400 mb-2 flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" /> 3. Pricing
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Model *</label>
                    <select
                      value={formData.pricingModel}
                      onChange={(e) => setFormData({ ...formData, pricingModel: e.target.value as any })}
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs font-medium"
                    >
                      <option value="Free">100% Free</option>
                      <option value="Freemium">Freemium</option>
                      <option value="Subscription">Subscription</option>
                      <option value="Usage-based">Usage-based / API</option>
                      <option value="Commercial">Commercial Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Free Tier</label>
                    <input
                      type="text"
                      value={formData.freeTier}
                      onChange={(e) => setFormData({ ...formData, freeTier: e.target.value })}
                      placeholder="e.g. 50 queries/day free"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Starting Price</label>
                    <input
                      type="text"
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                      placeholder="e.g. $19 / month"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Strengths & Best For */}
              <div className="pt-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 4. Strengths & Target
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Strengths (1 per line)</label>
                    <textarea
                      rows={2}
                      value={formData.strengths}
                      onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                      placeholder="Zero hallucination&#10;Sub-second real-time inference"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Best Suited For</label>
                    <input
                      type="text"
                      value={formData.bestFor}
                      onChange={(e) => setFormData({ ...formData, bestFor: e.target.value })}
                      placeholder="e.g. Agronomy consultants"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-1">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> 5. Contact
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="founder@your-ai-domain.com"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 text-[11px]">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-slate-950 text-slate-200 p-2 rounded border border-white/10 focus:outline-none focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  Instant registration in AI space
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:text-white border border-white/5 text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Register Innovation</span>
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
