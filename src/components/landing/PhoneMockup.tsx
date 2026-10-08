import React, { useState } from 'react';
import {
  RotateCw,
  Bell,
  Settings,
  Edit2,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  ArrowUp,
  Search,
  Calendar,
  SlidersHorizontal,
  Plus,
  Sparkles,
  Info,
  ShoppingCart,
  Calculator,
  Share2,
  UserPlus,
  Utensils,
  LayoutGrid,
  Receipt,
  TrendingUp,
  Users,
  Shapes,
  ShoppingBag,
  Car,
  Tv,
  Briefcase,
  Coffee,
  Building2,
  Check,
} from 'lucide-react';

export const PhoneMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'analytics' | 'splits' | 'tools'>('dashboard');
  const [historyFilter, setHistoryFilter] = useState<'all' | 'income' | 'expenses'>('all');
  const [splitsSubTab, setSplitsSubTab] = useState<'expenses' | 'settle' | 'members'>('expenses');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', textAlign: 'left' }}>
      {/* Screen Selector Tabs (Outside Phone) */}
      <div
        className="screen-selector-tabs"
        style={{
          display: 'flex',
          gap: '8px',
          padding: '6px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '28px',
          overflowX: 'auto',
          maxWidth: '100%',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            backgroundColor: activeTab === 'dashboard' ? '#5CF3B6' : 'transparent',
            color: activeTab === 'dashboard' ? '#003822' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          📊 Dashboard
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            backgroundColor: activeTab === 'history' ? '#5CF3B6' : 'transparent',
            color: activeTab === 'history' ? '#003822' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          📝 History
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            backgroundColor: activeTab === 'analytics' ? '#5CF3B6' : 'transparent',
            color: activeTab === 'analytics' ? '#003822' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          📈 Analytics
        </button>
        <button
          onClick={() => setActiveTab('splits')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            backgroundColor: activeTab === 'splits' ? '#5CF3B6' : 'transparent',
            color: activeTab === 'splits' ? '#003822' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          👥 Splits
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-full)',
            border: 'none',
            backgroundColor: activeTab === 'tools' ? '#5CF3B6' : 'transparent',
            color: activeTab === 'tools' ? '#003822' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          🧰 Tools
        </button>
      </div>

      {/* Realistic Smartphone Frame (Matches Exact Real App Design, Sized 385px x 810px) */}
      <div
        style={{
          position: 'relative',
          width: '385px',
          maxWidth: 'calc(100vw - 32px)',
          height: '810px',
          backgroundColor: '#000000',
          borderRadius: '44px',
          border: '8px solid #1e293b',
          boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 0 50px rgba(103, 198, 248, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
        }}
      >
        {/* Android Status Bar (Sky Blue Gradient background) */}
        <div
          style={{
            height: '32px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#0B132B',
            background: '#67c6f8',
            flexShrink: 0,
            zIndex: 10,
            textAlign: 'left',
          }}
        >
          <span>4:29</span>
          {/* Camera hole */}
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#000000',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem' }}>
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Scrollable Screen Content with Exact Vertical Gradient from Color.kt */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            background: 'linear-gradient(180deg, #67c6f8 0%, #90d5fb 16%, #bae6fd 32%, #e0f2fe 52%, #f8f9fb 75%, #f8f9fb 100%)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            scrollbarWidth: 'none',
            textAlign: 'left',
          }}
        >
          {/* ========================================================================= */}
          {/* 1. DASHBOARD SCREEN (Matches User Screenshot 1 with Varied Transactions) */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div style={{ padding: '12px 16px 95px 16px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              {/* App Top Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* User circular avatar */}
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: '#0B132B',
                      border: '2px solid #ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    DG
                  </div>
                  <span
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      color: '#0B132B',
                      whiteSpace: 'nowrap',
                      letterSpacing: '-0.02em',
                      textAlign: 'left',
                    }}
                  >
                    Pocket Advisor
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', color: '#0B132B', flexShrink: 0 }}>
                  <RotateCw size={17} style={{ cursor: 'pointer' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer' }}>PDF</span>
                  <Bell size={17} style={{ cursor: 'pointer' }} />
                  <Settings size={17} style={{ cursor: 'pointer' }} />
                </div>
              </div>

              {/* Total Balance Card */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '22px',
                  padding: '16px 18px',
                  border: '1px solid rgba(226, 232, 240, 0.7)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textAlign: 'left' }}>Total Balance</span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: '#f1f5f9',
                      padding: '3px 9px',
                      borderRadius: '10px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#0B132B',
                    }}
                  >
                    <ChevronLeft size={13} />
                    <span>Sep 2026</span>
                    <ChevronRight size={13} />
                  </div>
                </div>

                {/* Total Balance Amount (Strictly left aligned) */}
                <div
                  style={{
                    fontSize: '2.1rem',
                    fontWeight: 900,
                    color: '#0B132B',
                    margin: '8px 0 14px 0',
                    letterSpacing: '-0.03em',
                    textAlign: 'left',
                    width: '100%',
                    display: 'block',
                  }}
                >
                  ₹15,951.00
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', textAlign: 'left' }}>
                  {/* Income Stat */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#DCFCE7',
                        color: '#16A34A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ArrowDown size={16} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>Income</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B', textAlign: 'left' }}>₹18,500</div>
                    </div>
                  </div>

                  {/* Expenses Stat */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                    <div
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: '#FEE2E2',
                        color: '#DC2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ArrowUp size={16} />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>Expenses</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B', textAlign: 'left' }}>₹2,549</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Budget Card */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '22px',
                  padding: '16px 18px',
                  border: '1px solid rgba(226, 232, 240, 0.7)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0B132B', textAlign: 'left' }}>Monthly Budget</span>
                    <Edit2 size={14} color="#94a3b8" style={{ cursor: 'pointer' }} />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: 'rgba(11, 19, 43, 0.05)',
                      border: '1px solid rgba(11, 19, 43, 0.15)',
                      padding: '4px 10px',
                      borderRadius: '10px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#0B132B',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <SlidersHorizontal size={12} />
                    <span>By Category</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.76rem', color: '#64748b', margin: '0 0 10px 0', whiteSpace: 'nowrap', textAlign: 'left' }}>
                  You have spent 25% of your monthly budget.
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#0B132B', marginBottom: '6px', width: '100%' }}>
                  <span>₹2,549 spent</span>
                  <span>₹10,000 limit</span>
                </div>

                {/* Progress bar with dot indicator */}
                <div style={{ height: '5px', backgroundColor: '#f1f5f9', borderRadius: '3px', position: 'relative' }}>
                  <div style={{ width: '25%', height: '100%', backgroundColor: '#0B132B', borderRadius: '3px' }} />
                  <div
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: '#0B132B',
                    }}
                  />
                </div>
              </div>

              {/* Recent Transactions Section (Varied Categories & Dates) */}
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 2px', width: '100%' }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0B132B', textAlign: 'left' }}>Recent Transactions</span>
                  <span
                    onClick={() => setActiveTab('history')}
                    style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', cursor: 'pointer' }}
                  >
                    See All
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Transaction 1: Groceries */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '11px',
                          backgroundColor: '#FFE4E6',
                          color: '#E11D48',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <ShoppingBag size={16} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B132B', whiteSpace: 'nowrap', textAlign: 'left' }}>
                          Whole Foods Market
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', whiteSpace: 'nowrap', textAlign: 'left' }}>
                          Groceries & Shopping • Today
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>-₹840.00</span>
                      <Edit2 size={12} color="#94a3b8" />
                    </div>
                  </div>

                  {/* Transaction 2: Food & Coffee */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '11px',
                          backgroundColor: '#F3E8FF',
                          color: '#9333EA',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Coffee size={16} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B132B', whiteSpace: 'nowrap', textAlign: 'left' }}>
                          Blue Tokai Coffee
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', whiteSpace: 'nowrap', textAlign: 'left' }}>
                          Food & Dining • Today
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>-₹240.00</span>
                      <Edit2 size={12} color="#94a3b8" />
                    </div>
                  </div>

                  {/* Transaction 3: Transit */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '11px',
                          backgroundColor: '#E0F2FE',
                          color: '#0284C7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Car size={16} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B132B', whiteSpace: 'nowrap', textAlign: 'left' }}>
                          Uber Premier Ride
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', whiteSpace: 'nowrap', textAlign: 'left' }}>
                          Transportation • Sep 10
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>-₹320.00</span>
                      <Edit2 size={12} color="#94a3b8" />
                    </div>
                  </div>

                  {/* Transaction 4: Entertainment */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '11px',
                          backgroundColor: '#FEF3C7',
                          color: '#D97706',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Tv size={16} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B132B', whiteSpace: 'nowrap', textAlign: 'left' }}>
                          Netflix 4K Premium
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', whiteSpace: 'nowrap', textAlign: 'left' }}>
                          Entertainment • Sep 08
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>-₹649.00</span>
                      <Edit2 size={12} color="#94a3b8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. HISTORY SCREEN (Different Categories, Dates & Filter Support) */}
          {/* ========================================================================= */}
          {activeTab === 'history' && (
            <div style={{ padding: '12px 16px 95px 16px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#0B132B', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                    DG
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0B132B' }}>History</span>
                </div>
                <Bell size={17} color="#0B132B" />
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0B132B', margin: '2px 0 0 0', textAlign: 'left' }}>
                Transactions
              </h2>

              {/* Search Bar */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                  <Search size={15} />
                  <span style={{ fontSize: '0.82rem' }}>Search transactions...</span>
                </div>
                <Calendar size={15} color="#64748b" />
              </div>

              {/* Filter Chips (Interactive) */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setHistoryFilter('all')}
                  style={{
                    padding: '6px 18px',
                    borderRadius: '20px',
                    backgroundColor: historyFilter === 'all' ? '#0B132B' : '#ffffff',
                    color: historyFilter === 'all' ? '#ffffff' : '#0B132B',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setHistoryFilter('income')}
                  style={{
                    padding: '6px 18px',
                    borderRadius: '20px',
                    backgroundColor: historyFilter === 'income' ? '#0B132B' : '#ffffff',
                    color: historyFilter === 'income' ? '#ffffff' : '#0B132B',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Income
                </button>
                <button
                  onClick={() => setHistoryFilter('expenses')}
                  style={{
                    padding: '6px 18px',
                    borderRadius: '20px',
                    backgroundColor: historyFilter === 'expenses' ? '#0B132B' : '#ffffff',
                    color: historyFilter === 'expenses' ? '#ffffff' : '#0B132B',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Expenses
                </button>
              </div>

              {/* Transactions List with Date Headers */}
              {/* GROUP 1: TODAY, SEP 11 */}
              {(historyFilter === 'all' || historyFilter === 'expenses') && (
                <>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.04em', marginTop: '2px', textAlign: 'left' }}>
                    TODAY, SEP 11
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid rgba(226, 232, 240, 0.7)',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '11px', backgroundColor: '#FFE4E6', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ShoppingBag size={16} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B132B', textAlign: 'left' }}>Whole Foods Market</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>Shopping • 2:15 PM</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>-₹840.00</span>
                        <Edit2 size={12} color="#94a3b8" />
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid rgba(226, 232, 240, 0.7)',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '11px', backgroundColor: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Coffee size={16} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B132B', textAlign: 'left' }}>Blue Tokai Coffee</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>Food & Dining • 9:30 AM</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>-₹240.00</span>
                        <Edit2 size={12} color="#94a3b8" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* GROUP 2: YESTERDAY, SEP 10 */}
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.04em', marginTop: '6px', textAlign: 'left' }}>
                YESTERDAY, SEP 10
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(historyFilter === 'all' || historyFilter === 'expenses') && (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '11px', backgroundColor: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Car size={16} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B132B', textAlign: 'left' }}>Uber Premier Ride</div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>Transportation • 8:40 PM</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>-₹320.00</span>
                      <Edit2 size={12} color="#94a3b8" />
                    </div>
                  </div>
                )}

                {/* Income item */}
                {(historyFilter === 'all' || historyFilter === 'income') && (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(187, 247, 208, 0.8)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '11px', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Briefcase size={16} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B132B', textAlign: 'left' }}>Freelance UI Project</div>
                        <div style={{ fontSize: '0.68rem', color: '#16A34A', fontWeight: 600, textAlign: 'left' }}>Income • 3:15 PM</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#16A34A' }}>+₹18,500.00</span>
                      <Check size={14} color="#16A34A" />
                    </div>
                  </div>
                )}
              </div>

              {/* GROUP 3: SEP 08 */}
              {(historyFilter === 'all' || historyFilter === 'expenses') && (
                <>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.04em', marginTop: '6px', textAlign: 'left' }}>
                    SEP 08
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid rgba(226, 232, 240, 0.7)',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '11px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Tv size={16} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B132B', textAlign: 'left' }}>Netflix 4K Premium</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>Entertainment • 11:00 AM</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>-₹649.00</span>
                        <Edit2 size={12} color="#94a3b8" />
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '16px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        border: '1px solid rgba(226, 232, 240, 0.7)',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '11px', backgroundColor: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Utensils size={16} />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B132B', textAlign: 'left' }}>Subway Fresh Meals</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>Food & Dining • 1:30 PM</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>-₹500.00</span>
                        <Edit2 size={12} color="#94a3b8" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. ANALYTICS SCREEN (Matches User Screenshot 3 with AI & Spending Insights) */}
          {/* ========================================================================= */}
          {activeTab === 'analytics' && (
            <div style={{ padding: '12px 16px 95px 16px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#0B132B', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                    DG
                  </div>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0B132B' }}>Analytics</span>
                </div>
                <Bell size={17} color="#0B132B" />
              </div>

              {/* Signature Mint Green Spending Advisor Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #5CF3B6 0%, #05D686 100%)',
                  borderRadius: '20px',
                  padding: '16px 18px',
                  color: '#003822',
                  boxShadow: '0 6px 20px rgba(92, 243, 182, 0.35)',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '0.88rem', marginBottom: '8px' }}>
                  <Sparkles size={16} /> AI Budget Advisor
                </div>
                <p style={{ fontSize: '0.76rem', lineHeight: 1.45, margin: 0, fontWeight: 500, textAlign: 'left' }}>
                  You have spent ₹2,549.00 out of your ₹10,000.00 budget this month. Your top expense is Groceries & Shopping (33%), followed by Entertainment (25%). You are pacing well to save 74% of your income target.
                </p>
              </div>

              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0B132B', textAlign: 'left' }}>
                Budget & Pattern Analysis
              </div>

              {/* Top Expense Category Card */}
              <div
                style={{
                  backgroundColor: '#DBEAFE',
                  borderRadius: '16px',
                  padding: '13px 16px',
                  border: '1px solid #bfdbfe',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284C7', fontWeight: 700, fontSize: '0.82rem', marginBottom: '5px' }}>
                  <Info size={15} /> Top Expense Category
                </div>
                <p style={{ margin: 0, fontSize: '0.74rem', color: '#1e3a5f', lineHeight: 1.4, textAlign: 'left' }}>
                  GROCERIES accounts for 33% of your spending. Keep an eye on weekly pantry orders to optimize monthly savings.
                </p>
              </div>

              {/* Monthly Trend Line Chart Card */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '16px',
                  border: '1px solid rgba(226, 232, 240, 0.7)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>Monthly Trend</span>
                  <span style={{ fontSize: '0.7rem', backgroundColor: '#f1f5f9', padding: '3px 8px', borderRadius: '8px', color: '#64748b', fontWeight: 600 }}>This Month</span>
                </div>

                {/* SVG Chart */}
                <svg viewBox="0 0 280 120" style={{ width: '100%', height: '100px' }}>
                  <line x1="25" y1="20" x2="270" y2="20" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="25" y1="45" x2="270" y2="45" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="25" y1="70" x2="270" y2="70" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="25" y1="95" x2="270" y2="95" stroke="#0B132B" strokeWidth="1.5" />

                  <text x="5" y="24" fontSize="8" fill="#94a3b8">840</text>
                  <text x="5" y="49" fontSize="8" fill="#94a3b8">600</text>
                  <text x="5" y="74" fontSize="8" fill="#94a3b8">300</text>
                  <text x="5" y="99" fontSize="8" fill="#94a3b8">0</text>

                  {/* Line graph points */}
                  <polyline
                    fill="none"
                    stroke="#0B132B"
                    strokeWidth="2"
                    points="30,95 70,85 105,25 120,60 160,95 200,95 240,95 265,95"
                  />
                  <circle cx="30" cy="95" r="3" fill="#ffffff" stroke="#0B132B" strokeWidth="1.5" />
                  <circle cx="70" cy="85" r="3" fill="#ffffff" stroke="#0B132B" strokeWidth="1.5" />
                  <circle cx="105" cy="25" r="3.5" fill="#ffffff" stroke="#0B132B" strokeWidth="2" />
                  <circle cx="120" cy="60" r="3" fill="#ffffff" stroke="#0B132B" strokeWidth="1.5" />
                  <circle cx="160" cy="95" r="3" fill="#ffffff" stroke="#0B132B" strokeWidth="1.5" />
                  <circle cx="200" cy="95" r="3" fill="#ffffff" stroke="#0B132B" strokeWidth="1.5" />
                  <circle cx="240" cy="95" r="3" fill="#ffffff" stroke="#0B132B" strokeWidth="1.5" />
                  <circle cx="265" cy="95" r="3" fill="#ffffff" stroke="#0B132B" strokeWidth="1.5" />

                  <text x="28" y="110" fontSize="8" fill="#64748b">1</text>
                  <text x="68" y="110" fontSize="8" fill="#64748b">5</text>
                  <text x="100" y="110" fontSize="8" fill="#64748b">10</text>
                  <text x="155" y="110" fontSize="8" fill="#64748b">15</text>
                  <text x="195" y="110" fontSize="8" fill="#64748b">20</text>
                  <text x="235" y="110" fontSize="8" fill="#64748b">25</text>
                  <text x="260" y="110" fontSize="8" fill="#64748b">30</text>
                </svg>
              </div>

              {/* Category Breakdown Card */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '16px',
                  border: '1px solid rgba(226, 232, 240, 0.7)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B132B' }}>
                  Category Breakdown
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', margin: '2px 0 10px 0' }}>
                  Where your money went this period.
                </div>
                <div style={{ backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: '14px' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Total Spent</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0B132B', marginTop: '2px' }}>₹2,549.00</div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. TOOLS SCREEN (Matches User Screenshot 4) */}
          {/* ========================================================================= */}
          {activeTab === 'tools' && (
            <div style={{ padding: '12px 16px 95px 16px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0B132B' }}>Tools</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Bell size={17} color="#0B132B" />
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0B132B', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.78rem', fontWeight: 700 }}>
                    DG
                  </div>
                </div>
              </div>

              {/* Top Banner Card: Spending Tools */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '22px',
                  padding: '16px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  border: '1px solid rgba(226, 232, 240, 0.7)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '13px',
                    backgroundColor: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0B132B',
                    flexShrink: 0,
                  }}
                >
                  <LayoutGrid size={20} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0B132B', margin: '0 0 2px 0', textAlign: 'left' }}>
                    Spending Tools
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0, textAlign: 'left' }}>
                    Calculators and utilities for your daily needs
                  </p>
                </div>
              </div>

              {/* 2-Column Grid: Shopping List & Calculators */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
                {/* Shopping List Card */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    padding: '15px',
                    border: '1px solid rgba(226, 232, 240, 0.7)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '135px',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '11px',
                        backgroundColor: '#eff6ff',
                        color: '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ShoppingCart size={17} />
                    </div>
                    <ChevronRight size={15} color="#94a3b8" />
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0B132B', margin: '8px 0 3px 0', textAlign: 'left' }}>
                      Shopping List
                    </h4>
                    <p style={{ fontSize: '0.67rem', color: '#64748b', margin: 0, lineHeight: 1.3, textAlign: 'left' }}>
                      Plan purchases and check your budget
                    </p>
                  </div>
                </div>

                {/* Calculators Card */}
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    padding: '15px',
                    border: '1px solid rgba(226, 232, 240, 0.7)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '135px',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '11px',
                        backgroundColor: '#faf5ff',
                        color: '#9333ea',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Calculator size={17} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        backgroundColor: '#dcfce7',
                        color: '#16a34a',
                        padding: '2px 6px',
                        borderRadius: '6px',
                      }}
                    >
                      3-in-1
                    </span>
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0B132B', margin: '8px 0 3px 0', textAlign: 'left' }}>
                      Calculators
                    </h4>
                    <p style={{ fontSize: '0.67rem', color: '#64748b', margin: 0, lineHeight: 1.3, textAlign: 'left' }}>
                      EMI, SIP & Compound Interest calculators
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. SPLITS SCREEN (Legitimate Group Name: Goa Trip 2026 + Real Transactions) */}
          {/* ========================================================================= */}
          {activeTab === 'splits' && (
            <div style={{ padding: '12px 16px 95px 16px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              {/* Group Header with Legitimate Name */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ChevronLeft size={20} color="#0B132B" style={{ cursor: 'pointer' }} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0B132B', textAlign: 'left' }}>
                      Goa Vacation 🌴
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', color: '#0B132B', fontWeight: 700 }}>
                      <span style={{ backgroundColor: '#a7f3d0', padding: '1px 7px', borderRadius: '4px' }}>Code: GOA2026</span>
                      <span>• 4 Members</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', color: '#0B132B' }}>
                  <RotateCw size={17} style={{ cursor: 'pointer' }} />
                  <Share2 size={17} style={{ cursor: 'pointer' }} />
                  <UserPlus size={17} style={{ cursor: 'pointer' }} />
                </div>
              </div>

              {/* Group Spend Overview Card */}
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '20px',
                  padding: '16px 18px',
                  border: '1px solid rgba(226, 232, 240, 0.7)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textAlign: 'left' }}>Total Group Spending</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0B132B', marginTop: '2px', textAlign: 'left' }}>₹24,800.00</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Your Balance</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#16A34A', marginTop: '2px' }}>+₹4,200.00</div>
                  <span style={{ fontSize: '0.65rem', color: '#16A34A', fontWeight: 700 }}>You are owed</span>
                </div>
              </div>

              {/* Subtabs: Expenses, Settle Up, Members (Interactive) */}
              <div style={{ display: 'flex', borderBottom: '1.5px solid #e2e8f0', paddingBottom: '2px' }}>
                <div
                  onClick={() => setSplitsSubTab('expenses')}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '8px 0',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    color: splitsSubTab === 'expenses' ? '#0B132B' : '#64748b',
                    borderBottom: splitsSubTab === 'expenses' ? '2.5px solid #0B132B' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  Expenses
                </div>
                <div
                  onClick={() => setSplitsSubTab('settle')}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '8px 0',
                    fontSize: '0.84rem',
                    fontWeight: splitsSubTab === 'settle' ? 800 : 600,
                    color: splitsSubTab === 'settle' ? '#0B132B' : '#64748b',
                    borderBottom: splitsSubTab === 'settle' ? '2.5px solid #0B132B' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  Settle Up
                </div>
                <div
                  onClick={() => setSplitsSubTab('members')}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '8px 0',
                    fontSize: '0.84rem',
                    fontWeight: splitsSubTab === 'members' ? 800 : 600,
                    color: splitsSubTab === 'members' ? '#0B132B' : '#64748b',
                    borderBottom: splitsSubTab === 'members' ? '2.5px solid #0B132B' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  Members
                </div>
              </div>

              {/* SUBTAB 1: EXPENSES LIST (Real group transactions) */}
              {splitsSubTab === 'expenses' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Expense 1: Villa Booking */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#F1F5F9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Building2 size={18} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0B132B', textAlign: 'left' }}>
                          Beachfront Villa Stay
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>
                          You paid • Today, 2:30 PM
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0B132B' }}>₹14,000.00</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#16A34A' }}>you lent ₹10,500</div>
                    </div>
                  </div>

                  {/* Expense 2: Seafood Dinner */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Utensils size={18} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0B132B', textAlign: 'left' }}>
                          Fisherman's Wharf Dinner
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>
                          Rahul paid • Yesterday, 9:15 PM
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0B132B' }}>₹4,800.00</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#DC2626' }}>you owe ₹1,200</div>
                    </div>
                  </div>

                  {/* Expense 3: Scooter Rentals */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Car size={18} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0B132B', textAlign: 'left' }}>
                          Scooter Rentals & Fuel
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>
                          Sneha paid • Sep 09, 11:00 AM
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0B132B' }}>₹2,600.00</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#DC2626' }}>you owe ₹650</div>
                    </div>
                  </div>

                  {/* Expense 4: Beach Snacks */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#FFE4E6', color: '#E11D48', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingBag size={18} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0B132B', textAlign: 'left' }}>
                          Beach Snacks & Groceries
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'left' }}>
                          You paid • Sep 08, 5:45 PM
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0B132B' }}>₹3,400.00</div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#16A34A' }}>you lent ₹2,550</div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 2: SETTLE UP PREVIEW */}
              {splitsSubTab === 'settle' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '14px 16px',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0B132B' }}>Rahul Verma</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>owes you for dinner & villa</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#16A34A' }}>₹2,250.00</div>
                      <span style={{ fontSize: '0.65rem', backgroundColor: '#dcfce7', color: '#16a34a', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>owes you</span>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      padding: '14px 16px',
                      border: '1px solid rgba(226, 232, 240, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0B132B' }}>Sneha Patel</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>owes you for villa stay</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#16A34A' }}>₹1,950.00</div>
                      <span style={{ fontSize: '0.65rem', backgroundColor: '#dcfce7', color: '#16a34a', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>owes you</span>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: '#0B132B',
                      color: '#ffffff',
                      borderRadius: '14px',
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '4px',
                    }}
                  >
                    Record a Payment
                  </div>
                </div>
              )}

              {/* SUBTAB 3: MEMBERS LIST */}
              {splitsSubTab === 'members' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                  {[
                    { name: 'Deep Garg (You)', role: 'Admin', balance: '+₹4,200.00', positive: true },
                    { name: 'Rahul Verma', role: 'Member', balance: '-₹2,250.00', positive: false },
                    { name: 'Sneha Patel', role: 'Member', balance: '-₹1,950.00', positive: false },
                    { name: 'Aman Gupta', role: 'Member', balance: 'Settled up', positive: null },
                  ].map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '14px',
                        padding: '12px 14px',
                        border: '1px solid rgba(226, 232, 240, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#0B132B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                          {m.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0B132B' }}>{m.name}</div>
                          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>{m.role}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: m.positive === true ? '#16A34A' : m.positive === false ? '#DC2626' : '#64748b' }}>
                        {m.balance}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* PINNED FLOATING BUTTONS (Positioned outside scrollable view so they NEVER scroll) */}
        {/* ========================================================================= */}
        {/* 1. Dashboard & History Floating Add Button (Black Circle FAB) */}
        {(activeTab === 'dashboard' || activeTab === 'history') && (
          <div
            style={{
              position: 'absolute',
              right: '16px',
              bottom: '92px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#0B132B',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(11, 19, 43, 0.4)',
              cursor: 'pointer',
              zIndex: 30,
              transition: 'transform 0.15s ease',
            }}
          >
            <Plus size={24} />
          </div>
        )}

        {/* 2. Splits Floating Add Button (Mint Green Rounded FAB) */}
        {activeTab === 'splits' && (
          <div
            style={{
              position: 'absolute',
              right: '16px',
              bottom: '92px',
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              backgroundColor: '#5CF3B6',
              color: '#003822',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(92, 243, 182, 0.45)',
              cursor: 'pointer',
              zIndex: 30,
              transition: 'transform 0.15s ease',
            }}
          >
            <Plus size={24} />
          </div>
        )}

        {/* 3. Analytics Floating AI Advisor Pill (Fixed right above Bottom Nav) */}
        {activeTab === 'analytics' && (
          <div
            style={{
              position: 'absolute',
              right: '16px',
              bottom: '92px',
              backgroundColor: '#0B132B',
              color: '#ffffff',
              borderRadius: '24px',
              padding: '9px 16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '0.82rem',
              fontWeight: 700,
              boxShadow: '0 8px 24px rgba(11, 19, 43, 0.4)',
              cursor: 'pointer',
              zIndex: 30,
            }}
          >
            <Sparkles size={15} /> AI Advisor
          </div>
        )}

        {/* ========================================================================= */}
        {/* EXACT REAL ANDROID BOTTOM NAVIGATION BAR (Matches All 5 Screenshots) */}
        {/* ========================================================================= */}
        <div
          style={{
            height: '64px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 6px',
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          {/* Tab 1: Dashboard */}
          <div
            onClick={() => setActiveTab('dashboard')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer',
              padding: activeTab === 'dashboard' ? '6px 14px' : '6px',
              borderRadius: '20px',
              backgroundColor: activeTab === 'dashboard' ? '#5CF3B6' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <LayoutGrid size={18} color={activeTab === 'dashboard' ? '#003822' : '#475569'} />
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: activeTab === 'dashboard' ? 800 : 600,
                color: activeTab === 'dashboard' ? '#003822' : '#475569',
              }}
            >
              Dashboard
            </span>
          </div>

          {/* Tab 2: History */}
          <div
            onClick={() => setActiveTab('history')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer',
              padding: activeTab === 'history' ? '6px 14px' : '6px',
              borderRadius: '20px',
              backgroundColor: activeTab === 'history' ? '#5CF3B6' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <Receipt size={18} color={activeTab === 'history' ? '#003822' : '#475569'} />
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: activeTab === 'history' ? 800 : 600,
                color: activeTab === 'history' ? '#003822' : '#475569',
              }}
            >
              History
            </span>
          </div>

          {/* Tab 3: Analytics */}
          <div
            onClick={() => setActiveTab('analytics')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer',
              padding: activeTab === 'analytics' ? '6px 14px' : '6px',
              borderRadius: '20px',
              backgroundColor: activeTab === 'analytics' ? '#5CF3B6' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <TrendingUp size={18} color={activeTab === 'analytics' ? '#003822' : '#475569'} />
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: activeTab === 'analytics' ? 800 : 600,
                color: activeTab === 'analytics' ? '#003822' : '#475569',
              }}
            >
              Analytics
            </span>
          </div>

          {/* Tab 4: Splits */}
          <div
            onClick={() => setActiveTab('splits')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer',
              padding: activeTab === 'splits' ? '6px 14px' : '6px',
              borderRadius: '20px',
              backgroundColor: activeTab === 'splits' ? '#5CF3B6' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <Users size={18} color={activeTab === 'splits' ? '#003822' : '#475569'} />
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: activeTab === 'splits' ? 800 : 600,
                color: activeTab === 'splits' ? '#003822' : '#475569',
              }}
            >
              Splits
            </span>
          </div>

          {/* Tab 5: Tools */}
          <div
            onClick={() => setActiveTab('tools')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              cursor: 'pointer',
              padding: activeTab === 'tools' ? '6px 14px' : '6px',
              borderRadius: '20px',
              backgroundColor: activeTab === 'tools' ? '#5CF3B6' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <Shapes size={18} color={activeTab === 'tools' ? '#003822' : '#475569'} />
            <span
              style={{
                fontSize: '0.66rem',
                fontWeight: activeTab === 'tools' ? 800 : 600,
                color: activeTab === 'tools' ? '#003822' : '#475569',
              }}
            >
              Tools
            </span>
          </div>
        </div>

        {/* Android Bottom Gesture Bar */}
        <div
          style={{
            height: '16px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '84px',
              height: '4px',
              borderRadius: '2px',
              backgroundColor: '#0B132B',
            }}
          />
        </div>
      </div>
    </div>
  );
};
