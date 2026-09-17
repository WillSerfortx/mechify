import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SUPPLIER_DEMO_ACCOUNTS } from '../data/supplierAccounts';

export default function SupplierDashboard() {
  const navigate = useNavigate();

  // Current logged in supplier account
  const [selectedAccountId, setSelectedAccountId] = useState(() => {
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const u = JSON.parse(stored);
        const match = SUPPLIER_DEMO_ACCOUNTS.find(
          a => a.email.toLowerCase() === (u.email || '').toLowerCase() ||
               a.alternateEmail?.toLowerCase() === (u.email || '').toLowerCase()
        );
        if (match) return match.id;
      }
    } catch (e) {
      console.error(e);
    }
    return 'supp-1';
  });

  const currentSupplier = useMemo(() => {
    return SUPPLIER_DEMO_ACCOUNTS.find(a => a.id === selectedAccountId) || SUPPLIER_DEMO_ACCOUNTS[0];
  }, [selectedAccountId]);

  // UI States
  const [activeMenu, setActiveMenu] = useState('vendors');
  const [searchOrderQuery, setSearchOrderQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [themeMode, setThemeMode] = useState('tandem'); // 'tandem' (exact reference light) or 'mechifyDark'
  const [salesTimeframe, setSalesTimeframe] = useState('LAST YEAR');
  const [spendTimeframe, setSpendTimeframe] = useState('LAST MONTH');

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Performance',
    price: '',
    stock: '',
    sku: ''
  });

  const [ordersList, setOrdersList] = useState(currentSupplier.orders);
  const [productsList, setProductsList] = useState(currentSupplier.products);

  // Switch demo account
  const handleSwitchAccount = (accId) => {
    setSelectedAccountId(accId);
    const target = SUPPLIER_DEMO_ACCOUNTS.find(a => a.id === accId);
    if (target) {
      localStorage.setItem('currentUser', JSON.stringify({
        email: target.email,
        name: target.vendorName,
        role: 'supplier',
        companyName: target.companyName
      }));
      localStorage.setItem('userRole', 'supplier');
      setOrdersList(target.orders);
      setProductsList(target.products);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    navigate('/auth');
  };

  const filteredOrders = useMemo(() => {
    return ordersList.filter(o => {
      const q = searchOrderQuery.toLowerCase();
      return o.id.toLowerCase().includes(q) ||
             o.status.toLowerCase().includes(q) ||
             (o.customer && o.customer.toLowerCase().includes(q)) ||
             (o.product && o.product.toLowerCase().includes(q));
    });
  }, [ordersList, searchOrderQuery]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const created = {
      id: `P-${Date.now().toString().slice(-4)}`,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock) || 10,
      sku: newProduct.sku || `MECH-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setProductsList([created, ...productsList]);
    setShowAddProductModal(false);
    setNewProduct({ name: '', category: 'Performance', price: '', stock: '', sku: '' });
    alert(`Product "${created.name}" successfully added to Mechify Marketplace!`);
  };

  const isDark = themeMode === 'mechifyDark';

  return (
    <div className={`min-h-screen flex flex-col md:flex-row font-['Outfit',sans-serif] ${
      isDark ? 'bg-[#0a0b10] text-gray-100' : 'bg-[#f4f5f8] text-[#1e2029]'
    }`}>
      
      {/* ─── 1. LEFT SIDEBAR NAVIGATION (Matching Screenshot) ─── */}
      <aside className={`w-full md:w-64 shrink-0 flex flex-col justify-between py-6 px-5 border-r transition-colors ${
        isDark ? 'bg-[#0f1118] border-white/10' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div>
          {/* Brand: Tandem / Mechify Supplier Hub */}
          <div className="flex items-center justify-between px-3 mb-8">
            <Link to="/home" className="flex items-center gap-2.5">
              <span className="text-2xl font-black tracking-tight text-black dark:text-white">
                Tandem
              </span>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-red-600 text-white tracking-widest">
                MECHIFY
              </span>
            </Link>
          </div>

          {/* Navigation Links List */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              )},
              { id: 'order_summary', label: 'Order Summary', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              )},
              { id: 'create_po', label: 'Create PO / Add Product', action: () => setShowAddProductModal(true), icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              )},
              { id: 'add_vendor', label: 'Add New Vendor', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              )},
              { id: 'account_payable', label: 'Account Payable', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              )},
              { id: 'vendors', label: 'Vendors', isCurrentActive: true, icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              )},
              { id: 'sales_orders', label: 'Sales Orders', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              )},
              { id: 'account_receivable', label: 'Account Receivable', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )},
              { id: 'clients', label: 'Clients', icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              )},
            ].map(item => {
              const isActive = activeMenu === item.id || item.isCurrentActive;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) item.action();
                    else setActiveMenu(item.id);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left ${
                    isActive
                      ? isDark
                        ? 'bg-white/10 text-white font-bold'
                        : 'bg-[#e8ebf3] text-[#1e2029] font-bold'
                      : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className={isActive ? (isDark ? 'text-white' : 'text-gray-900') : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Menu: Settings, Support & Sign Out */}
        <div className="pt-6 border-t border-gray-200 dark:border-white/10 space-y-1">
          <button
            onClick={() => alert("Supplier Settings & Tax Profile: BIN-990812401")}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>Settings</span>
          </button>

          <button
            onClick={() => alert("Mechify Supplier Hotline: +880 1304-098448")}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span>Support</span>
          </button>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors text-red-500 hover:bg-red-500/10`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─── 2. MAIN CONTENT AREA (Matching Screenshot) ─── */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-[1600px] mx-auto w-full">
        
        {/* ── Top Header Breadcrumb & Profile ── */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
              <span>Vendors</span>
              <span>/</span>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Vendors Profile
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">
              {currentSupplier.companyName}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme switcher */}
            <button
              onClick={() => setThemeMode(isDark ? 'tandem' : 'mechifyDark')}
              className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-300 text-gray-700'
              }`}
              title="Toggle Theme"
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>

            {/* Quick Demo Switcher */}
            <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-300 shadow-sm'
            }`}>
              <span className="text-xs text-gray-400 font-bold hidden sm:inline">Demo:</span>
              <select
                value={selectedAccountId}
                onChange={(e) => handleSwitchAccount(e.target.value)}
                className="bg-transparent text-xs font-bold cursor-pointer focus:outline-none"
              >
                {SUPPLIER_DEMO_ACCOUNTS.map(acc => (
                  <option key={acc.id} value={acc.id} className={isDark ? 'bg-[#12141c] text-white' : 'bg-white text-black'}>
                    {acc.vendorName} ({acc.email} - pass: 123)
                  </option>
                ))}
              </select>
            </div>

            {/* Search Icon */}
            <button className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-gray-200 text-gray-600'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>

            {/* More / 3 Dots */}
            <button className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-gray-200 text-gray-600'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>

            {/* Notification Bell */}
            <button className={`p-2.5 rounded-xl border relative ${
              isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-gray-200 text-gray-600'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2" />
            </button>

            {/* User Avatar */}
            <img
              src={currentSupplier.avatar}
              alt={currentSupplier.vendorName}
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-500 shadow-sm"
            />
          </div>
        </header>

        {/* ── Top 4 KPI Metric Cards (From Screenshot) ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          
          {/* Card 1: Day of credit */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-[#10121a] border-white/10' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-start justify-between">
              <span className="text-xs text-gray-500 font-semibold">Day of credit</span>
              <div className="w-6 h-6 rounded-full border border-gray-400/40 flex items-center justify-center text-[10px] text-gray-400">
                $
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black mt-2">
              {currentSupplier.kpis.dayOfCredit}
            </div>
            <div className="text-[11px] font-bold text-emerald-500 mt-2">
              {currentSupplier.kpis.dayOfCreditChange}
            </div>
          </div>

          {/* Card 2: Total Credit Amount */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-[#10121a] border-white/10' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-start justify-between">
              <span className="text-xs text-gray-500 font-semibold">Total Credit Amount</span>
              <div className="w-6 h-6 rounded-full border border-gray-400/40 flex items-center justify-center text-[10px] text-gray-400">
                %
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black mt-2">
              {currentSupplier.kpis.totalCreditAmount}
            </div>
            <div className="text-[11px] font-bold text-emerald-500 mt-2">
              {currentSupplier.kpis.totalCreditChange}
            </div>
          </div>

          {/* Card 3: Total Amount PO */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-[#10121a] border-white/10' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-start justify-between">
              <span className="text-xs text-gray-500 font-semibold">Total Amount PO</span>
              <div className="text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black mt-2">
              {currentSupplier.kpis.totalAmountPO}
            </div>
            <div className="text-[11px] font-bold text-red-500 mt-2">
              {currentSupplier.kpis.totalAmountPOChange}
            </div>
          </div>

          {/* Card 4: Total Invoice */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isDark ? 'bg-[#10121a] border-white/10' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-start justify-between">
              <span className="text-xs text-gray-500 font-semibold">Total Invoice</span>
              <div className="w-6 h-6 rounded-full border border-gray-400/40 flex items-center justify-center text-[10px] text-gray-400">
                $
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black mt-2">
              {currentSupplier.kpis.totalInvoice}
            </div>
            <div className="text-[11px] font-bold text-emerald-500 mt-2">
              {currentSupplier.kpis.totalInvoiceChange}
            </div>
          </div>

        </section>

        {/* ── Middle Row: 2 Charts Side-by-Side (Matching Screenshot) ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Chart 1: Total Sales (Curved Area Wave Chart with Tooltip) */}
          <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            isDark ? 'bg-[#10121a] border-white/10' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs text-gray-500 font-semibold block">Total Sales</span>
                <div className="text-2xl sm:text-3xl font-black mt-1">
                  {currentSupplier.kpis.totalSales}
                </div>
                <span className="text-xs font-bold text-emerald-500">
                  {currentSupplier.kpis.totalSalesChange}
                </span>
              </div>

              <select
                value={salesTimeframe}
                onChange={(e) => setSalesTimeframe(e.target.value)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${
                  isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-700'
                }`}
              >
                <option value="LAST YEAR">LAST YEAR</option>
                <option value="THIS YEAR">THIS YEAR</option>
                <option value="ALL TIME">ALL TIME</option>
              </select>
            </div>

            {/* SVG Interactive Wave Chart */}
            <div className="relative h-64 mt-6">
              <svg viewBox="0 0 600 220" className="w-full h-full overflow-visible" fill="none">
                <defs>
                  <linearGradient id="salesGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="currentColor" strokeDasharray="3 3" opacity="0.08" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="currentColor" strokeDasharray="3 3" opacity="0.08" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="currentColor" strokeDasharray="3 3" opacity="0.08" />
                <line x1="0" y1="190" x2="600" y2="190" stroke="currentColor" strokeDasharray="3 3" opacity="0.08" />

                {/* Smooth Area Path */}
                <path
                  d="M 0,160 Q 50,150 100,140 T 200,130 T 260,90 T 320,135 T 380,100 T 450,70 T 520,85 T 600,120 L 600,210 L 0,210 Z"
                  fill="url(#salesGrad)"
                />

                {/* Curve Line */}
                <path
                  d="M 0,160 Q 50,150 100,140 T 200,130 T 260,90 T 320,135 T 380,100 T 450,70 T 520,85 T 600,120"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Interactive Active Highlight Node at April Peak */}
                <circle cx="235" cy="115" r="7" fill="#ffffff" stroke="#3b82f6" strokeWidth="3" />
                <circle cx="235" cy="115" r="2.5" fill="#3b82f6" />
              </svg>

              {/* Tooltip Card Matching Screenshot: "IN TOTAL $749,735.00 / 08 April GMT + 6" */}
              <div className="absolute left-[28%] top-[18%] -translate-x-1/2 bg-[#121629] text-white px-4 py-2.5 rounded-xl shadow-2xl border border-white/15 text-center pointer-events-none z-10 animate-fadeIn">
                <div className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">IN TOTAL</div>
                <div className="text-sm sm:text-base font-black text-white">{currentSupplier.kpis.inTotalHighlight}</div>
                <div className="text-[9px] text-gray-400 mt-0.5">{currentSupplier.kpis.inTotalDate}</div>
              </div>

              {/* Month Labels */}
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium px-1">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Chart 2: Total Spend (Bar Chart) */}
          <div className={`p-6 sm:p-7 rounded-2xl border transition-all ${
            isDark ? 'bg-[#10121a] border-white/10' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs text-gray-500 font-semibold block">Total Spend</span>
                <div className="text-2xl sm:text-3xl font-black mt-1">
                  {currentSupplier.kpis.totalSpend}
                </div>
                <span className="text-xs font-bold text-red-500">
                  {currentSupplier.kpis.totalSpendChange}
                </span>
              </div>

              <select
                value={spendTimeframe}
                onChange={(e) => setSpendTimeframe(e.target.value)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${
                  isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-700'
                }`}
              >
                <option value="LAST MONTH">LAST MONTH</option>
                <option value="THIS MONTH">THIS MONTH</option>
                <option value="LAST 30 DAYS">LAST 30 DAYS</option>
              </select>
            </div>

            {/* Vertical Bar Chart matching Screenshot */}
            <div className="h-64 flex flex-col justify-end pt-4">
              <div className="flex items-end justify-between gap-2 h-48 px-2">
                {[
                  { m: 'Jan', h: 45, color: '#3b82f6' },
                  { m: 'Feb', h: 65, color: '#3b82f6' },
                  { m: 'Mar', h: 92, color: '#3b82f6' },
                  { m: 'Apr', h: 74, color: '#3b82f6' },
                  { m: 'May', h: 86, color: '#3b82f6' },
                  { m: 'Jun', h: 58, color: '#3b82f6' },
                  { m: 'Jul', h: 52, color: '#3b82f6' },
                  { m: 'Aug', h: 76, color: '#3b82f6' },
                  { m: 'Sep', h: 90, color: '#3b82f6' },
                  { m: 'Oct', h: 62, color: '#3b82f6' },
                  { m: 'Nov', h: 40, color: '#3b82f6' },
                  { m: 'Dec', h: 32, color: '#3b82f6' },
                ].map(bar => (
                  <div key={bar.m} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer">
                    <div
                      className="w-full max-w-[18px] rounded-t-md transition-all duration-300 group-hover:brightness-125"
                      style={{
                        height: `${bar.h}%`,
                        backgroundColor: bar.color
                      }}
                      title={`${bar.m}: ${bar.h}% volume`}
                    />
                  </div>
                ))}
              </div>

              {/* Month Labels */}
              <div className="flex justify-between text-[10px] text-gray-400 mt-3 font-medium px-2 border-t border-gray-100 dark:border-white/5 pt-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

          </div>

        </section>

        {/* ── Bottom Section: Recent Purchase Orders (Matching Screenshot Table) ── */}
        <section className={`p-6 sm:p-7 rounded-2xl border transition-all ${
          isDark ? 'bg-[#10121a] border-white/10' : 'bg-white border-gray-200 shadow-xs'
        }`}>
          
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg sm:text-xl font-bold">
              Recent Purchase Orders
            </h3>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchOrderQuery}
                  onChange={(e) => setSearchOrderQuery(e.target.value)}
                  placeholder="Search your orders"
                  className={`w-full text-xs sm:text-sm pl-8 pr-4 py-2 rounded-xl border focus:outline-none focus:border-blue-500 transition-colors ${
                    isDark ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'
                  }`}
                />
                <svg className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold whitespace-nowrap shadow-sm transition-colors"
              >
                + Add Product
              </button>
            </div>
          </div>

          {/* Orders Table matching Screenshot Columns */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className={`border-b text-gray-400 font-semibold ${
                  isDark ? 'border-white/10' : 'border-gray-200'
                }`}>
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Order Date</th>
                  <th className="pb-3 font-semibold">Delivery Date</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredOrders.map((order) => {
                  return (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      {/* Order ID in Blue Hyperlink */}
                      <td className="py-4 font-bold text-blue-600 dark:text-blue-400 hover:underline">
                        {order.id}
                      </td>
                      <td className="py-4 text-gray-500 dark:text-gray-400">
                        {order.orderDate}
                      </td>
                      <td className="py-4 text-gray-500 dark:text-gray-400">
                        {order.deliveryDate}
                      </td>
                      {/* Status matching Screenshot Badges */}
                      <td className="py-4">
                        <span className="flex items-center gap-1.5 text-xs font-medium">
                          {order.status === 'Accepted' && (
                            <>
                              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                              <span>Accepted</span>
                            </>
                          )}
                          {order.status === 'Pending' && (
                            <>
                              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              <span>Pending</span>
                            </>
                          )}
                          {order.status === 'Cancel' && (
                            <>
                              <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                              <span>Cancel</span>
                            </>
                          )}
                          {order.status === 'Closed' && (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                              </span>
                              <span>Closed</span>
                            </>
                          )}
                          {order.status === 'Pending Approval' && (
                            <>
                              <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-500" />
                              <span>Pending Approval</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-4 text-right font-bold text-gray-900 dark:text-white">
                        {order.total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </section>

      </main>

      {/* ─── MODAL: Order Details Inspection ─── */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`p-6 sm:p-8 rounded-2xl max-w-md w-full shadow-2xl relative ${
            isDark ? 'bg-[#141622] text-white border border-white/20' : 'bg-white text-gray-900'
          }`}>
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 text-lg font-bold"
            >
              ✕
            </button>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Purchase Order Detail</span>
            <h3 className="text-xl font-black mt-1">{selectedOrder.id}</h3>
            
            <div className="my-4 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-white/10">
                <span className="text-gray-400">Buyer:</span>
                <span className="font-bold">{selectedOrder.customer}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-white/10">
                <span className="text-gray-400">Product:</span>
                <span className="font-bold text-right">{selectedOrder.product}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-white/10">
                <span className="text-gray-400">Order Date:</span>
                <span>{selectedOrder.orderDate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-white/10">
                <span className="text-gray-400">Delivery Est:</span>
                <span>{selectedOrder.deliveryDate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-200 dark:border-white/10">
                <span className="text-gray-400">Status:</span>
                <span className="font-bold text-blue-500">{selectedOrder.status}</span>
              </div>
              <div className="flex justify-between py-2 text-base font-black">
                <span>Total Amount:</span>
                <span className="text-emerald-500">{selectedOrder.total}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Invoice for Order ${selectedOrder.id} generated!`);
                  setSelectedOrder(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: Add Product to Marketplace ─── */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`p-6 sm:p-8 rounded-2xl max-w-md w-full shadow-2xl relative ${
            isDark ? 'bg-[#141622] text-white border border-white/20' : 'bg-white text-gray-900'
          }`}>
            <button
              onClick={() => setShowAddProductModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 text-lg font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-black mb-1">List Product on Marketplace</h3>
            <p className="text-xs text-gray-400 mb-4">Sell high-performance spare parts and accessories to Mechify customers.</p>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Brembo Carbon Ceramic Caliper"
                  className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-blue-500 ${
                    isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border focus:outline-none ${
                    isDark ? 'bg-[#1a1d2e] border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Performance">Engine & Performance</option>
                  <option value="Braking">Braking Systems</option>
                  <option value="Suspension">Suspension & Dampers</option>
                  <option value="Lubricants">Fluids & Lubricants</option>
                  <option value="Fuel Systems">Fuel & Induction</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Unit Price ($)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="120.00"
                    className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-blue-500 ${
                      isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="25"
                    className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-blue-500 ${
                      isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">SKU / Part Number</label>
                <input
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  placeholder="BRM-9902"
                  className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-blue-500 ${
                    isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl font-bold text-xs bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                >
                  Publish to Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
