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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto text-[#111111]"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#ffffff] border border-[rgba(17,17,17,0.12)] rounded-[12px] shadow-[rgba(17,17,17,0.16)_0px_24px_64px_0px] overflow-hidden my-6 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#f6f5f3] border-b border-[rgba(17,17,17,0.08)] flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] text-[10px] font-mono bg-[#ffffff] text-[#e8400d] border border-[rgba(17,17,17,0.08)] uppercase tracking-wider mb-2">
              <Zap className="w-3 h-3 text-[#e8400d]" />
              <span>Business Launchpad</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#111111] tracking-[-0.03em]">
              Launch & Register AI Innovation
            </h2>
            <p className="text-xs text-[#6d6c6b] mt-1 font-normal">
              Register your AI on <strong className="text-[#111111]">AI space</strong> to enable instant user comparison and recommendations.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-[8px] bg-[#ffffff] border border-[rgba(17,17,17,0.1)] text-[#6d6c6b] hover:text-[#111111] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto text-xs">
          {registeredTool ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-12 h-12 rounded-full bg-[#b7efb2] flex items-center justify-center mx-auto text-[#111111]">
                <CheckCircle2 className="w-6 h-6 text-[#111111]" />
              </div>

              <div>
                <h3 className="text-2xl font-normal text-[#111111] tracking-tight">
                  {registeredTool.name} is Registered
                </h3>
                <p className="text-xs text-[#6d6c6b] mt-1.5 max-w-md mx-auto">
                  Your AI model is now available across the directory, recommender, and 3-way matrix.
                </p>
              </div>

              <div className="p-5 rounded-[12px] bg-[#f6f5f3] border border-[rgba(17,17,17,0.08)] max-w-sm mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6d6c6b]">Tool Name:</span>
                  <span className="font-semibold text-[#111111]">{registeredTool.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6d6c6b]">Category:</span>
                  <span className="text-[#e8400d] font-mono">{registeredTool.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6d6c6b]">Pricing Model:</span>
                  <span className="text-[#111111] font-mono">{registeredTool.pricing.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6d6c6b]">Link:</span>
                  <span className="text-[#e8400d] truncate max-w-[180px] font-mono">{registeredTool.url}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    openToolModal(registeredTool);
                  }}
                  className="px-5 py-2.5 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal text-xs transition-colors"
                >
                  View Profile
                </button>
                <button
                  onClick={() => {
                    setCompareSlot(0, registeredTool);
                    handleClose();
                    scrollToSection('compare');
                  }}
                  className="px-5 py-2.5 rounded-[8px] bg-[#ffffff] text-[#111111] hover:bg-[#ecebea] border border-[rgba(17,17,17,0.12)] text-xs font-normal flex items-center gap-1.5 transition-colors"
                >
                  <Scale className="w-3.5 h-3.5 text-[#e8400d]" />
                  <span>Compare in Matrix</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              {/* Basic Info */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#e8400d] mb-3 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#e8400d]" /> 1. Identity & Details
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">AI Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. AgriVision Pro"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. TerraTech BioSystems"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as AICategory })}
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs font-medium transition-colors"
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
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Official URL *</label>
                    <input
                      type="url"
                      required
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://your-ai-domain.com"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Tagline & Work description */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#e8400d] mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#e8400d]" /> 2. Scope & Capabilities
                </h4>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Tagline *</label>
                    <input
                      type="text"
                      required
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      placeholder="e.g. Multi-spectral agricultural yield forecaster"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Full Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the model's core purpose and audience..."
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">
                      Key Capabilities (1 per line) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formData.workItDoes}
                      onChange={(e) => setFormData({ ...formData, workItDoes: e.target.value })}
                      placeholder="Identifies crop pests in 2 seconds&#10;Generates automated fertilizer schedules"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#e8400d] mb-3 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-[#e8400d]" /> 3. Pricing
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Model *</label>
                    <select
                      value={formData.pricingModel}
                      onChange={(e) => setFormData({ ...formData, pricingModel: e.target.value as any })}
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs font-medium transition-colors"
                    >
                      <option value="Free">100% Free</option>
                      <option value="Freemium">Freemium</option>
                      <option value="Subscription">Subscription</option>
                      <option value="Usage-based">Usage-based / API</option>
                      <option value="Commercial">Commercial Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Free Tier</label>
                    <input
                      type="text"
                      value={formData.freeTier}
                      onChange={(e) => setFormData({ ...formData, freeTier: e.target.value })}
                      placeholder="e.g. 50 queries/day free"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Starting Price</label>
                    <input
                      type="text"
                      value={formData.startingPrice}
                      onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                      placeholder="e.g. $19 / month"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Strengths & Best For */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#e8400d] mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#e8400d]" /> 4. Strengths & Target
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Strengths (1 per line)</label>
                    <textarea
                      rows={2}
                      value={formData.strengths}
                      onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                      placeholder="Zero hallucination&#10;Sub-second real-time inference"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Best Suited For</label>
                    <input
                      type="text"
                      value={formData.bestFor}
                      onChange={(e) => setFormData({ ...formData, bestFor: e.target.value })}
                      placeholder="e.g. Agronomy consultants"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#e8400d] mb-3 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#e8400d]" /> 5. Contact
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="founder@your-ai-domain.com"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d6c6b] mb-1.5 text-xs">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[#ffffff] text-[#111111] p-2.5 rounded-[8px] border border-[rgba(17,17,17,0.12)] hover:border-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[rgba(17,17,17,0.08)] flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#6d6c6b]">
                  Instant registration in AI space
                </span>
                
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-[8px] bg-transparent text-[#6d6c6b] hover:text-[#111111] border border-[rgba(17,17,17,0.14)] text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-[8px] bg-[#111111] hover:bg-[#272625] text-[#ffffff] font-normal text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#ffffff]" />
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
