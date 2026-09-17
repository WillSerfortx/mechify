import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SUPPLIER_DEMO_ACCOUNTS } from '../data/supplierAccounts';

export default function SupplierDashboard() {
  const navigate = useNavigate();

  // ─── 1. Authenticated Supplier State ───
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

  // ─── 2. Local State for Supplier Isolation ───
  const [productsList, setProductsList] = useState(() => currentSupplier.products || []);
  const [ordersList, setOrdersList] = useState(() => currentSupplier.orders || []);
  const [messagesList, setMessagesList] = useState(() => currentSupplier.messages || []);
  const [reviewsList, setReviewsList] = useState(() => currentSupplier.reviews || []);
  const [notificationsList, setNotificationsList] = useState(() => currentSupplier.notifications || []);
  const [storeProfile, setStoreProfile] = useState(() => ({
    companyName: currentSupplier.companyName,
    vendorName: currentSupplier.vendorName,
    avatar: currentSupplier.avatar,
    coverImage: currentSupplier.coverImage,
    phone: currentSupplier.phone,
    address: currentSupplier.address,
    tradeBin: currentSupplier.tradeBin,
    storeDescription: currentSupplier.storeDescription,
    businessHours: currentSupplier.businessHours,
    returnPolicy: currentSupplier.returnPolicy,
    warrantyPolicy: currentSupplier.warrantyPolicy,
    socialLinks: { ...currentSupplier.socialLinks }
  }));

  // Sync when demo account switches
  useEffect(() => {
    setProductsList(currentSupplier.products || []);
    setOrdersList(currentSupplier.orders || []);
    setMessagesList(currentSupplier.messages || []);
    setReviewsList(currentSupplier.reviews || []);
    setNotificationsList(currentSupplier.notifications || []);
    setStoreProfile({
      companyName: currentSupplier.companyName,
      vendorName: currentSupplier.vendorName,
      avatar: currentSupplier.avatar,
      coverImage: currentSupplier.coverImage,
      phone: currentSupplier.phone,
      address: currentSupplier.address,
      tradeBin: currentSupplier.tradeBin,
      storeDescription: currentSupplier.storeDescription,
      businessHours: currentSupplier.businessHours,
      returnPolicy: currentSupplier.returnPolicy,
      warrantyPolicy: currentSupplier.warrantyPolicy,
      socialLinks: { ...currentSupplier.socialLinks }
    });
  }, [currentSupplier]);

  // Navigation & UI controls
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [themeMode, setThemeMode] = useState('dark'); // 'dark' | 'light'

  // Sales Analytics filters
  const [salesTimeframe, setSalesTimeframe] = useState('Last 30 Days'); // 'Today' | 'Last 7 Days' | 'Last 30 Days' | 'This Year'

  // Orders Tab filters
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Products Tab filters & controls
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [productStockFilter, setProductStockFilter] = useState('All');
  const [productSortBy, setProductSortBy] = useState('newest');
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [productViewMode, setProductViewMode] = useState('table'); // 'table' | 'grid'
  const [selectedProductPreview, setSelectedProductPreview] = useState(null);

  // Add Product Form State
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    sku: '',
    category: 'Performance',
    subcategory: '',
    brand: '',
    partNumber: '',
    condition: 'New',
    shortDescription: '',
    fullDescription: '',
    price: '',
    msrp: '',
    discount: 0,
    stock: '',
    lowStockAlert: 5,
    minOrderQty: 1,
    weight: '',
    dimensions: '',
    shippingMethod: 'Standard Express (2-3 Days)',
    shippingCost: 8,
    freeShipping: false,
    deliveryTime: '2-3 Days',
    warranty: '1 Year Manufacturer Warranty',
    images: [],
    compatibility: [
      { make: '', model: '', year: '', engine: '', transmission: '' }
    ]
  });
  const [newImageInputUrl, setNewImageInputUrl] = useState('');
  const [publishSuccessModal, setPublishSuccessModal] = useState(null);

  // Messages Chat state
  const [activeChatId, setActiveChatId] = useState('MSG-1');
  const [chatReplyText, setChatReplyText] = useState('');

  // Reviews Reply state
  const [reviewReplyInputs, setReviewReplyInputs] = useState({});

  // Account Switcher
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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    navigate('/auth');
  };

  // ─── Add Product Handlers ───
  const handleAddImage = (url) => {
    if (!url) return;
    setNewProductForm(prev => ({
      ...prev,
      images: [...prev.images, url]
    }));
    setNewImageInputUrl('');
  };

  const handleRemoveImage = (index) => {
    setNewProductForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSetPrimaryImage = (index) => {
    setNewProductForm(prev => {
      const target = prev.images[index];
      const rest = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: [target, ...rest] };
    });
  };

  const handleAddCompatibility = () => {
    setNewProductForm(prev => ({
      ...prev,
      compatibility: [...prev.compatibility, { make: '', model: '', year: '', engine: '', transmission: '' }]
    }));
  };

  const handleRemoveCompatibility = (index) => {
    setNewProductForm(prev => ({
      ...prev,
      compatibility: prev.compatibility.filter((_, i) => i !== index)
    }));
  };

  const handlePriceChange = (price, msrp) => {
    const p = parseFloat(price) || 0;
    const m = parseFloat(msrp) || 0;
    let disc = 0;
    if (m > p && m > 0) {
      disc = Math.round(((m - p) / m) * 100);
    }
    setNewProductForm(prev => ({
      ...prev,
      price,
      msrp,
      discount: disc
    }));
  };

  const handlePublishProduct = (status = 'Active') => {
    if (!newProductForm.name.trim()) {
      alert('Please provide a Product Name.');
      return;
    }
    if (!newProductForm.price || parseFloat(newProductForm.price) <= 0) {
      alert('Please provide a valid Selling Price.');
      return;
    }

    const created = {
      id: `P-${Date.now().toString().slice(-4)}`,
      name: newProductForm.name,
      sku: newProductForm.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      category: newProductForm.category,
      subcategory: newProductForm.subcategory || 'General Parts',
      brand: newProductForm.brand || storeProfile.companyName,
      partNumber: newProductForm.partNumber || `PN-${Math.floor(10000 + Math.random() * 90000)}`,
      condition: newProductForm.condition,
      shortDescription: newProductForm.shortDescription,
      fullDescription: newProductForm.fullDescription,
      price: parseFloat(newProductForm.price),
      msrp: parseFloat(newProductForm.msrp) || parseFloat(newProductForm.price),
      discount: newProductForm.discount,
      stock: parseInt(newProductForm.stock) || 0,
      lowStockAlert: parseInt(newProductForm.lowStockAlert) || 5,
      reservedStock: 0,
      availableStock: parseInt(newProductForm.stock) || 0,
      minOrderQty: parseInt(newProductForm.minOrderQty) || 1,
      weight: newProductForm.weight || '1.0 kg',
      dimensions: newProductForm.dimensions || '20 x 15 x 10 cm',
      unitsSold: 0,
      revenue: '$0.00',
      rating: 5.0,
      reviewsCount: 0,
      status,
      createdDate: 'Just now',
      images: newProductForm.images.length > 0 ? newProductForm.images : ['https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=500&h=400&fit=crop'],
      compatibility: newProductForm.compatibility.filter(c => c.make || c.model),
      shipping: {
        method: newProductForm.shippingMethod,
        cost: newProductForm.freeShipping ? 0 : (parseFloat(newProductForm.shippingCost) || 0),
        freeShipping: newProductForm.freeShipping,
        deliveryTime: newProductForm.deliveryTime,
        warranty: newProductForm.warranty
      }
    };

    setProductsList(prev => [created, ...prev]);
    setPublishSuccessModal(created);
    // Reset form
    setNewProductForm({
      name: '',
      sku: '',
      category: 'Performance',
      subcategory: '',
      brand: '',
      partNumber: '',
      condition: 'New',
      shortDescription: '',
      fullDescription: '',
      price: '',
      msrp: '',
      discount: 0,
      stock: '',
      lowStockAlert: 5,
      minOrderQty: 1,
      weight: '',
      dimensions: '',
      shippingMethod: 'Standard Express (2-3 Days)',
      shippingCost: 8,
      freeShipping: false,
      deliveryTime: '2-3 Days',
      warranty: '1 Year Manufacturer Warranty',
      images: [],
      compatibility: [{ make: '', model: '', year: '', engine: '', transmission: '' }]
    });
  };

  // ─── Inline Inventory Updater ───
  const handleUpdateStock = (productId, delta) => {
    setProductsList(prev => prev.map(p => {
      if (p.id === productId) {
        const newStock = Math.max(0, p.stock + delta);
        return {
          ...p,
          stock: newStock,
          availableStock: Math.max(0, newStock - (p.reservedStock || 0)),
          status: newStock === 0 ? 'Out of Stock' : (newStock <= (p.lowStockAlert || 5) ? 'Low Stock' : 'Active')
        };
      }
      return p;
    }));
  };

  const handleDirectStockChange = (productId, value) => {
    const val = parseInt(value) || 0;
    setProductsList(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          stock: val,
          availableStock: Math.max(0, val - (p.reservedStock || 0)),
          status: val === 0 ? 'Out of Stock' : (val <= (p.lowStockAlert || 5) ? 'Low Stock' : 'Active')
        };
      }
      return p;
    }));
  };

  // ─── Order Status Updater ───
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList(prev => prev.map(o => {
      if (o.id === orderId) {
        const updatedTimeline = [...(o.timeline || [])];
        updatedTimeline.push({
          status: `Status updated to: ${newStatus}`,
          time: 'Just now',
          done: true
        });
        return { ...o, status: newStatus, timeline: updatedTimeline };
      }
      return o;
    }));

    if (selectedOrderDetails && selectedOrderDetails.id === orderId) {
      setSelectedOrderDetails(prev => ({ ...prev, status: newStatus }));
    }
  };

  // ─── Send Message Reply ───
  const handleSendMessage = () => {
    if (!chatReplyText.trim()) return;
    setMessagesList(prev => prev.map(msg => {
      if (msg.id === activeChatId) {
        return {
          ...msg,
          unread: false,
          lastMessage: chatReplyText,
          time: 'Just now',
          history: [
            ...msg.history,
            { sender: 'supplier', text: chatReplyText, time: 'Just now' }
          ]
        };
      }
      return msg;
    }));
    setChatReplyText('');
  };

  // ─── Send Review Reply ───
  const handleReplyReview = (reviewId) => {
    const text = reviewReplyInputs[reviewId];
    if (!text || !text.trim()) return;
    setReviewsList(prev => prev.map(r => {
      if (r.id === reviewId) {
        return { ...r, reply: text };
      }
      return r;
    }));
    setReviewReplyInputs(prev => ({ ...prev, [reviewId]: '' }));
  };

  // ─── Filtered Data ───
  const filteredProducts = useMemo(() => {
    return productsList.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
                            p.sku.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
                            p.brand.toLowerCase().includes(productSearchQuery.toLowerCase());
      const matchesCategory = productCategoryFilter === 'All' || p.category === productCategoryFilter;
      const matchesStock = productStockFilter === 'All' ||
                           (productStockFilter === 'In Stock' && p.stock > (p.lowStockAlert || 5)) ||
                           (productStockFilter === 'Low Stock' && p.stock > 0 && p.stock <= (p.lowStockAlert || 5)) ||
                           (productStockFilter === 'Out of Stock' && p.stock === 0);
      return matchesSearch && matchesCategory && matchesStock;
    }).sort((a, b) => {
      if (productSortBy === 'price_low') return a.price - b.price;
      if (productSortBy === 'price_high') return b.price - a.price;
      if (productSortBy === 'sales') return b.unitsSold - a.unitsSold;
      return 0; // newest
    });
  }, [productsList, productSearchQuery, productCategoryFilter, productStockFilter, productSortBy]);

  const filteredOrders = useMemo(() => {
    return ordersList.filter(o => {
      const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter;
      const matchesQuery = o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                           o.customer.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
                           o.product.toLowerCase().includes(orderSearchQuery.toLowerCase());
      return matchesStatus && matchesQuery;
    });
  }, [ordersList, orderStatusFilter, orderSearchQuery]);

  // Active chat thread
  const activeChat = useMemo(() => {
    return messagesList.find(m => m.id === activeChatId) || messagesList[0];
  }, [messagesList, activeChatId]);

  // Derived KPIs
  const totalProductsCount = productsList.length;
  const activeProductsCount = productsList.filter(p => p.status === 'Active').length;
  const outOfStockCount = productsList.filter(p => p.stock === 0).length;
  const pendingOrdersCount = ordersList.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const totalOrdersCount = ordersList.length;

  const isDark = themeMode === 'dark';

  return (
    <div className={`min-h-screen font-['Outfit',sans-serif] flex flex-col ${
      isDark ? 'bg-[#0a0c14] text-white selection:bg-red-600' : 'bg-[#f4f6fa] text-[#1a1d29]'
    }`}>
      
      {/* ─── A. TOP HEADER NAVIGATION (Matching Amazon / Modern Seller Central) ─── */}
      <header className={`sticky top-0 z-40 px-5 sm:px-8 py-3.5 border-b backdrop-blur-xl flex items-center justify-between gap-4 ${
        isDark ? 'bg-[#0e111a]/95 border-white/10' : 'bg-white/95 border-gray-200 shadow-xs'
      }`}>
        
        {/* Left: Mobile hamburger + Brand Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`hidden md:flex p-2 rounded-xl border transition-colors ${
              isDark ? 'border-white/10 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-600 hover:text-black'
            }`}
            title="Toggle Sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl border ${
              isDark ? 'border-white/10 text-gray-400' : 'border-gray-200 text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link to="/home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-xl text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              M
            </div>
            <div>
              <div className="font-black text-lg tracking-wider text-inherit flex items-center gap-2">
                MECHIFY
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-red-600/20 text-red-500 border border-red-500/30">
                  SELLER CENTRAL
                </span>
              </div>
              <div className="text-[11px] text-gray-400 font-medium">Automotive Supplier Portal</div>
            </div>
          </Link>
        </div>

        {/* Center: Global Seller Search */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products, orders, customers, or SKUs..."
              value={productSearchQuery}
              onChange={(e) => {
                setProductSearchQuery(e.target.value);
                if (activeTab !== 'products') setActiveTab('products');
              }}
              className={`w-full text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border focus:outline-none focus:border-red-500 transition-colors ${
                isDark ? 'bg-white/5 border-white/10 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400'
              }`}
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Right Controls: Quick Switcher, Theme, Notifications, Avatar */}
        <div className="flex items-center gap-3">
          
          {/* Quick Demo Switcher */}
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-xs'
          }`}>
            <span className="text-xs text-gray-400 font-bold hidden sm:inline">Seller:</span>
            <select
              value={selectedAccountId}
              onChange={(e) => handleSwitchAccount(e.target.value)}
              className="bg-transparent text-xs font-bold cursor-pointer focus:outline-none max-w-[150px] sm:max-w-[200px]"
            >
              {SUPPLIER_DEMO_ACCOUNTS.map(acc => (
                <option key={acc.id} value={acc.id} className={isDark ? 'bg-[#12141c] text-white' : 'bg-white text-black'}>
                  {acc.vendorName} ({acc.companyName.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
            className={`p-2 rounded-xl border transition-colors ${
              isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-white border-gray-200 text-gray-700'
            }`}
            title="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Messages shortcut */}
          <button
            onClick={() => setActiveTab('messages')}
            className={`p-2 rounded-xl border relative transition-colors ${
              activeTab === 'messages'
                ? 'bg-red-600 text-white border-red-500'
                : isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:text-white' : 'bg-white border-gray-200 text-gray-700'
            }`}
            title="Customer Inquiries"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1.5 right-1.5" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
              className={`p-2 rounded-xl border relative transition-colors ${
                isDark ? 'bg-white/5 border-white/10 text-gray-300 hover:text-white' : 'bg-white border-gray-200 text-gray-700'
              }`}
              title="Notifications"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 animate-pulse" />
            </button>

            {showNotificationsDropdown && (
              <div className={`absolute right-0 mt-3 w-80 rounded-2xl border shadow-2xl p-4 z-50 animate-scaleUp ${
                isDark ? 'bg-[#121522] border-white/15 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-white/10">
                  <h4 className="font-bold text-sm">Notifications</h4>
                  <span className="text-xs text-red-500 font-bold">Mark all read</span>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-white/5 max-h-72 overflow-y-auto mt-2">
                  {notificationsList.map(n => (
                    <div key={n.id} className="py-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{n.title}</span>
                        <span className="text-[10px] text-gray-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Supplier Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2.5 focus:outline-none"
            >
              <img
                src={storeProfile.avatar}
                alt={storeProfile.vendorName}
                className="w-9 h-9 rounded-full object-cover border-2 border-red-500 shadow-xs"
              />
              <div className="hidden xl:block text-left">
                <div className="text-xs font-bold leading-tight">{storeProfile.vendorName}</div>
                <div className="text-[10px] text-gray-400 truncate max-w-[120px]">{storeProfile.companyName}</div>
              </div>
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showProfileDropdown && (
              <div className={`absolute right-0 mt-3 w-56 rounded-2xl border shadow-2xl p-2.5 z-50 animate-scaleUp ${
                isDark ? 'bg-[#121522] border-white/15 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}>
                <div className="px-3 py-2 border-b border-gray-200 dark:border-white/10 mb-1">
                  <div className="font-bold text-xs">{storeProfile.vendorName}</div>
                  <div className="text-[11px] text-gray-400">{currentSupplier.email}</div>
                  <span className="inline-block mt-1 text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    Verified Seller
                  </span>
                </div>
                <button
                  onClick={() => { setActiveTab('store_profile'); setShowProfileDropdown(false); }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-white/10 rounded-xl transition-colors"
                >
                  🏪 View Store Profile
                </button>
                <button
                  onClick={() => { setActiveTab('settings'); setShowProfileDropdown(false); }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-white/10 rounded-xl transition-colors"
                >
                  ⚙️ Seller Settings
                </button>
                <button
                  onClick={() => { setActiveTab('help'); setShowProfileDropdown(false); }}
                  className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-white/10 rounded-xl transition-colors"
                >
                  💬 Help & Support
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors mt-1"
                >
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>

        </div>

      </header>

      {/* ─── B. MAIN WRAPPER (Collapsible Sidebar + Dynamic View) ─── */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Sidebar Navigation */}
        <aside className={`transition-all duration-300 border-r shrink-0 flex flex-col justify-between py-5 z-30 ${
          isDark ? 'bg-[#0d0f18] border-white/10' : 'bg-white border-gray-200'
        } ${
          sidebarCollapsed ? 'w-20 px-2' : 'w-64 px-4'
        } ${
          mobileMenuOpen ? 'fixed inset-y-0 left-0 shadow-2xl flex w-64' : 'hidden md:flex'
        }`}>
          <div className="space-y-1">
            
            {/* Quick Add Product CTA */}
            {!sidebarCollapsed && (
              <button
                onClick={() => { setActiveTab('add_product'); setMobileMenuOpen(false); }}
                className="w-full mb-4 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
              >
                <span className="text-base leading-none">+</span>
                <span>List New Product</span>
              </button>
            )}

            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'products', label: 'Products', icon: '📦', badge: totalProductsCount },
              { id: 'add_product', label: 'Add Product', icon: '➕' },
              { id: 'inventory', label: 'Inventory', icon: '📋' },
              { id: 'orders', label: 'Orders', icon: '🛒', badge: pendingOrdersCount, badgeColor: 'bg-red-600' },
              { id: 'sales', label: 'Sales & Revenue', icon: '💰' },
              { id: 'customers', label: 'Customers', icon: '👥' },
              { id: 'messages', label: 'Messages', icon: '💬', badge: 1, badgeColor: 'bg-blue-600' },
              { id: 'reviews', label: 'Reviews', icon: '⭐' },
              { id: 'store_profile', label: 'Store Profile', icon: '🏪' },
              { id: 'settings', label: 'Settings', icon: '⚙️' },
              { id: 'help', label: 'Help & Support', icon: '❓' },
            ].map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    active
                      ? isDark
                        ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                        : 'bg-red-600 text-white shadow-sm'
                      : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-black hover:bg-gray-100'
                  } ${sidebarCollapsed ? 'justify-center px-0' : 'justify-between'}`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full text-white ${item.badgeColor || 'bg-white/20'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Store summary */}
          {!sidebarCollapsed && (
            <div className={`p-3 rounded-2xl border mt-4 ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="text-[10px] text-gray-400 uppercase font-bold">Seller Rating</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span className="text-xs font-black">{currentSupplier.rating}</span>
                <span className="text-[10px] text-gray-400">({currentSupplier.totalReviewsCount})</span>
              </div>
            </div>
          )}
        </aside>

        {/* ─── C. MAIN BODY VIEWS ─── */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 max-w-[1600px] mx-auto w-full">
          
          {/* ══════════════════ TAB 1: DASHBOARD OVERVIEW ══════════════════ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Welcome Back Header Banner */}
              <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                isDark ? 'bg-gradient-to-r from-[#161a29] via-[#10131e] to-[#1a111a] border-white/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xs'
              }`}>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-wider mb-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                    Marketplace Live Seller Central
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                    Welcome back, {storeProfile.vendorName}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
                    Here is your automotive marketplace overview for <strong className="text-white font-bold">{storeProfile.companyName}</strong>. You have <span className="text-red-400 font-bold">{pendingOrdersCount} orders</span> waiting to be dispatched.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab('add_product')}
                    className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                  >
                    + Add New Car Part
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-5 py-3 rounded-2xl border font-bold text-xs sm:text-sm transition-colors ${
                      isDark ? 'bg-white/5 border-white/15 text-white hover:bg-white/10' : 'bg-gray-100 border-gray-300 text-gray-800'
                    }`}
                  >
                    Manage Orders ({pendingOrdersCount})
                  </button>
                </div>
              </div>

              {/* 8 Primary Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {[
                  { label: 'Total Products', val: totalProductsCount, sub: `${activeProductsCount} active on store`, icon: '📦', color: 'text-blue-400' },
                  { label: 'Active Products', val: activeProductsCount, sub: 'Visible to buyers', icon: '🟢', color: 'text-emerald-400' },
                  { label: 'Out of Stock', val: outOfStockCount, sub: 'Needs restocking', icon: '⚠️', color: 'text-amber-400' },
                  { label: 'Pending Orders', val: pendingOrdersCount, sub: 'Requires dispatch', icon: '🚨', color: 'text-red-400' },
                  { label: 'Total Orders', val: currentSupplier.kpis.totalOrders, sub: 'All-time volume', icon: '🛒', color: 'text-indigo-400' },
                  { label: 'Total Sales Units', val: currentSupplier.kpis.totalInvoice, sub: currentSupplier.kpis.totalInvoiceChange, icon: '📈', color: 'text-cyan-400' },
                  { label: 'Net Revenue', val: currentSupplier.kpis.revenue, sub: 'Gross pipeline sales', icon: '💰', color: 'text-emerald-400' },
                  { label: 'Average Rating', val: `⭐ ${currentSupplier.rating}`, sub: `Based on ${currentSupplier.totalReviewsCount} reviews`, icon: '🌟', color: 'text-amber-400' },
                ].map((kpi, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border transition-all ${
                      isDark ? 'bg-[#10131d] border-white/10 hover:border-white/20' : 'bg-white border-gray-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
                      <span>{kpi.label}</span>
                      <span className="text-base">{kpi.icon}</span>
                    </div>
                    <div className={`text-2xl sm:text-3xl font-black mt-2 tracking-tight ${kpi.color}`}>
                      {kpi.val}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1 font-medium">{kpi.sub}</div>
                  </div>
                ))}
              </div>

              {/* Sales Analytics Chart Section */}
              <div className={`p-6 sm:p-7 rounded-3xl border ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200 shadow-xs'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black">Sales & Revenue Analytics</h3>
                    <p className="text-xs text-gray-400">Track your daily order volume and marketplace revenue velocity.</p>
                  </div>

                  {/* Timeframe selector */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-bold">
                    {['Today', 'Last 7 Days', 'Last 30 Days', 'This Year'].map(t => (
                      <button
                        key={t}
                        onClick={() => setSalesTimeframe(t)}
                        className={`px-3 py-1.5 rounded-lg transition-all ${
                          salesTimeframe === t
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive SVG Chart */}
                <div className="relative h-64 sm:h-72 w-full pt-4">
                  <svg viewBox="0 0 800 240" className="w-full h-full overflow-visible" fill="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="0" y1="50" x2="800" y2="50" stroke="currentColor" strokeDasharray="4 4" opacity="0.08" />
                    <line x1="0" y1="110" x2="800" y2="110" stroke="currentColor" strokeDasharray="4 4" opacity="0.08" />
                    <line x1="0" y1="170" x2="800" y2="170" stroke="currentColor" strokeDasharray="4 4" opacity="0.08" />

                    {/* Area path */}
                    <path
                      d="M 0,180 Q 70,160 140,150 T 280,120 T 420,90 T 560,110 T 700,60 T 800,80 L 800,230 L 0,230 Z"
                      fill="url(#chartGrad)"
                    />
                    {/* Line path */}
                    <path
                      d="M 0,180 Q 70,160 140,150 T 280,120 T 420,90 T 560,110 T 700,60 T 800,80"
                      stroke="#ef4444"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Peak Dot */}
                    <circle cx="700" cy="60" r="7" fill="#ffffff" stroke="#ef4444" strokeWidth="3.5" />
                    <circle cx="700" cy="60" r="2.5" fill="#ef4444" />
                  </svg>

                  {/* Tooltip callout */}
                  <div className="absolute right-[12%] top-[8%] bg-[#1c1f2e] text-white px-4 py-2 rounded-xl border border-red-500/40 shadow-xl text-center pointer-events-none">
                    <div className="text-[10px] text-red-400 font-black">PEAK REVENUE</div>
                    <div className="text-sm font-black">$64,350.00</div>
                    <div className="text-[9px] text-gray-400">Coilover & Turbo Batches</div>
                  </div>

                  <div className="flex justify-between text-[11px] text-gray-400 mt-3 px-1 font-mono">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4 (Peak)</span>
                  </div>
                </div>
              </div>

              {/* Two Column Grid: Recent Orders & Top Selling Products */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left 8 Columns: Recent Orders Table */}
                <div className={`lg:col-span-8 p-6 sm:p-7 rounded-3xl border ${
                  isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-black">Recent Marketplace Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-red-500 hover:text-red-400"
                    >
                      View All Orders ({ordersList.length}) &gt;
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-white/10 text-gray-400 text-[11px] uppercase tracking-wider">
                          <th className="pb-3">Order ID</th>
                          <th className="pb-3">Product</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Total</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {ordersList.slice(0, 5).map(o => (
                          <tr key={o.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-3.5 font-mono font-bold text-red-500">{o.id}</td>
                            <td className="py-3.5 font-semibold truncate max-w-[180px]">{o.product}</td>
                            <td className="py-3.5 text-gray-400">{o.customer}</td>
                            <td className="py-3.5 font-bold">{o.total}</td>
                            <td className="py-3.5">
                              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                                o.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                                o.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                                o.status === 'Processing' ? 'bg-amber-500/20 text-amber-400' :
                                o.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                                'bg-purple-500/20 text-purple-400'
                              }`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-right">
                              <button
                                onClick={() => setSelectedOrderDetails(o)}
                                className="px-3 py-1 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right 4 Columns: Top Selling Products */}
                <div className={`lg:col-span-4 p-6 sm:p-7 rounded-3xl border ${
                  isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-black">Top Selling Products</h3>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="text-xs font-bold text-red-500 hover:text-red-400"
                    >
                      My Catalog &gt;
                    </button>
                  </div>

                  <div className="space-y-4">
                    {productsList.slice(0, 4).map(p => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProductPreview(p)}
                        className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm truncate">{p.name}</h4>
                          <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                            <span>{p.unitsSold} sold</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-bold">${p.price}</span>
                          </div>
                        </div>
                        <div className="text-right text-xs font-bold text-amber-400 shrink-0">
                          ★ {p.rating}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ══════════════════ TAB 2: MY PRODUCTS (CATALOG MANAGEMENT) ══════════════════ */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header with Search, Filters and Add Product Button */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">My Products Catalog</h2>
                  <p className="text-xs text-gray-400">Manage, edit, update stock, and publish performance parts to the Mechify marketplace.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setActiveTab('add_product')}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-md transition-all whitespace-nowrap"
                  >
                    + Add New Product
                  </button>
                  <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
                    <button
                      onClick={() => setProductViewMode('table')}
                      className={`p-2 rounded-lg text-xs font-bold ${productViewMode === 'table' ? 'bg-white/15 text-white' : 'text-gray-400'}`}
                      title="Table View"
                    >
                      ☰ Table
                    </button>
                    <button
                      onClick={() => setProductViewMode('grid')}
                      className={`p-2 rounded-lg text-xs font-bold ${productViewMode === 'grid' ? 'bg-white/15 text-white' : 'text-gray-400'}`}
                      title="Grid View"
                    >
                      ☷ Grid
                    </button>
                  </div>
                </div>
              </div>

              {/* Filters Bar */}
              <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
              }`}>
                {/* Search */}
                <div className="relative flex-1 min-w-[240px]">
                  <input
                    type="text"
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    placeholder="Search by part name, brand, or SKU..."
                    className={`w-full text-xs pl-8 pr-4 py-2 rounded-xl border focus:outline-none focus:border-red-500 ${
                      isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-black'
                    }`}
                  />
                  <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Category Filter */}
                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none ${
                    isDark ? 'bg-[#161a28] border-white/10 text-white' : 'bg-white border-gray-200 text-black'
                  }`}
                >
                  <option value="All">All Categories</option>
                  <option value="Braking">Braking Systems</option>
                  <option value="Performance">Turbo & Performance</option>
                  <option value="Suspension">Suspension & Dampers</option>
                  <option value="Lubricants">Fluids & Lubricants</option>
                  <option value="Exhaust">Exhaust Systems</option>
                  <option value="Cooling">Radiators & Cooling</option>
                  <option value="Fuel Systems">Fuel & Induction</option>
                </select>

                {/* Stock Filter */}
                <select
                  value={productStockFilter}
                  onChange={(e) => setProductStockFilter(e.target.value)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none ${
                    isDark ? 'bg-[#161a28] border-white/10 text-white' : 'bg-white border-gray-200 text-black'
                  }`}
                >
                  <option value="All">All Stock Status</option>
                  <option value="In Stock">In Stock (&gt;5)</option>
                  <option value="Low Stock">Low Stock (1-5)</option>
                  <option value="Out of Stock">Out of Stock (0)</option>
                </select>

                {/* Sort Filter */}
                <select
                  value={productSortBy}
                  onChange={(e) => setProductSortBy(e.target.value)}
                  className={`text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none ${
                    isDark ? 'bg-[#161a28] border-white/10 text-white' : 'bg-white border-gray-200 text-black'
                  }`}
                >
                  <option value="newest">Sort: Newest Added</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="sales">Top Selling Units</option>
                </select>
              </div>

              {/* TABLE VIEW */}
              {productViewMode === 'table' ? (
                <div className={`rounded-3xl border overflow-hidden ${
                  isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
                }`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-white/10 text-gray-400 text-[11px] uppercase tracking-wider bg-white/5">
                          <th className="p-4">Product Name & SKU</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Price</th>
                          <th className="p-4">Stock</th>
                          <th className="p-4">Sales</th>
                          <th className="p-4">Rating</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {filteredProducts.map(p => (
                          <tr key={p.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.images[0]}
                                  alt={p.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                                />
                                <div>
                                  <div className="font-bold text-inherit hover:text-red-400 cursor-pointer" onClick={() => setSelectedProductPreview(p)}>
                                    {p.name}
                                  </div>
                                  <div className="text-[11px] text-gray-400 font-mono mt-0.5">
                                    SKU: {p.sku} • {p.brand}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-gray-400">{p.category}</td>
                            <td className="p-4">
                              <div className="font-bold text-emerald-400">${p.price.toFixed(2)}</div>
                              {p.msrp > p.price && (
                                <div className="text-[10px] text-gray-400 line-through">${p.msrp.toFixed(2)}</div>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <span className={`font-black ${p.stock === 0 ? 'text-red-400' : p.stock <= 5 ? 'text-amber-400' : 'text-inherit'}`}>
                                  {p.stock} units
                                </span>
                              </div>
                            </td>
                            <td className="p-4 text-gray-400">{p.unitsSold} sold</td>
                            <td className="p-4 font-bold text-amber-400">★ {p.rating}</td>
                            <td className="p-4">
                              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                                p.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
                                p.status === 'Draft' ? 'bg-gray-500/20 text-gray-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedProductPreview(p)}
                                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold"
                                  title="Preview Product"
                                >
                                  👁️
                                </button>
                                <button
                                  onClick={() => {
                                    setNewProductForm({
                                      name: `${p.name} (Copy)`,
                                      sku: `${p.sku}-COPY`,
                                      category: p.category,
                                      subcategory: p.subcategory,
                                      brand: p.brand,
                                      partNumber: p.partNumber,
                                      condition: p.condition,
                                      shortDescription: p.shortDescription,
                                      fullDescription: p.fullDescription,
                                      price: p.price,
                                      msrp: p.msrp,
                                      discount: p.discount,
                                      stock: p.stock,
                                      lowStockAlert: p.lowStockAlert,
                                      minOrderQty: p.minOrderQty,
                                      weight: p.weight,
                                      dimensions: p.dimensions,
                                      shippingMethod: p.shipping?.method || 'Standard',
                                      shippingCost: p.shipping?.cost || 8,
                                      freeShipping: p.shipping?.freeShipping || false,
                                      deliveryTime: p.shipping?.deliveryTime || '2-3 Days',
                                      warranty: p.shipping?.warranty || '1 Year',
                                      images: p.images,
                                      compatibility: p.compatibility || []
                                    });
                                    setActiveTab('add_product');
                                  }}
                                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold"
                                  title="Duplicate"
                                >
                                  📄
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete "${p.name}" from marketplace?`)) {
                                      setProductsList(prev => prev.filter(x => x.id !== p.id));
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold"
                                  title="Delete Product"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* GRID VIEW (Matching E-Commerce Product Card Spec #17) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(p => (
                    <div
                      key={p.id}
                      className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all group hover:border-red-500/40 shadow-xl ${
                        isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div>
                        {/* Product Image Thumbnail with Badges */}
                        <div className="relative h-48 w-full overflow-hidden bg-black/40">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-md">
                            {p.category}
                          </span>
                          {p.discount > 0 && (
                            <span className="absolute top-3 right-3 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-red-600 text-white shadow-md">
                              -{p.discount}% OFF
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{p.brand}</div>
                          <h4 className="text-base font-black mt-1 line-clamp-1 group-hover:text-red-400 transition-colors">
                            {p.name}
                          </h4>
                          
                          {/* Vehicle Compatibility Preview */}
                          {p.compatibility && p.compatibility.length > 0 && (
                            <div className="text-[11px] text-gray-400 mt-2 bg-white/5 p-2 rounded-xl border border-white/5 truncate">
                              🚗 Fits: <strong className="text-inherit">{p.compatibility[0].make} {p.compatibility[0].model}</strong>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-4">
                            <div>
                              <span className="text-xl font-black text-emerald-400">${p.price.toFixed(2)}</span>
                              {p.msrp > p.price && (
                                <span className="text-xs text-gray-400 line-through ml-2">${p.msrp.toFixed(2)}</span>
                              )}
                            </div>
                            <div className="text-right">
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                                p.stock === 0 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                              }`}>
                                {p.stock === 0 ? 'Out of Stock' : `${p.stock} In Stock`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Buttons (View, Edit, Manage Stock) */}
                      <div className="p-5 pt-0 grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
                        <button
                          onClick={() => setSelectedProductPreview(p)}
                          className="py-2 text-xs font-bold rounded-xl bg-white/5 hover:bg-white/10 text-center"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setActiveTab('inventory')}
                          className="py-2 text-xs font-bold rounded-xl bg-white/5 hover:bg-white/10 text-center"
                        >
                          Stock
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${p.name}?`)) {
                              setProductsList(prev => prev.filter(x => x.id !== p.id));
                            }
                          }}
                          className="py-2 text-xs font-bold rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-center"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ══════════════════ TAB 3: ADD PRODUCT PAGE (Enterprise Seller Form) ══════════════════ */}
          {activeTab === 'add_product' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
              
              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">List New Product on Marketplace</h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Upload genuine automotive parts, aftermarket upgrades, and accessories to sell directly to Mechify drivers and workshops.
                </p>
              </div>

              {/* 1. Multi-Image Upload Area (Matching Spec #3) */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-4 ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black">Product Images (JPG, PNG, WEBP)</h3>
                    <p className="text-xs text-gray-400">Add up to 5 clear photos. The first image will be used as the primary thumbnail.</p>
                  </div>
                  <span className="text-xs font-bold text-red-500">{newProductForm.images.length}/5 Uploaded</span>
                </div>

                {/* Previews Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {newProductForm.images.map((imgUrl, i) => (
                    <div key={i} className="relative group rounded-2xl overflow-hidden h-32 border border-white/20 bg-black">
                      <img src={imgUrl} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                      {i === 0 && (
                        <span className="absolute top-2 left-2 text-[9px] font-black uppercase px-2 py-0.5 rounded bg-red-600 text-white">
                          Primary
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {i !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(i)}
                            className="p-1.5 rounded-lg bg-white/20 text-white text-xs font-bold"
                            title="Make Primary"
                          >
                            ⭐
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(i)}
                          className="p-1.5 rounded-lg bg-red-600 text-white text-xs font-bold"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Image Box */}
                  {newProductForm.images.length < 5 && (
                    <div className="border-2 border-dashed border-white/20 rounded-2xl h-32 flex flex-col items-center justify-center p-3 text-center hover:border-red-500 transition-colors">
                      <div className="text-2xl mb-1">📸</div>
                      <span className="text-[11px] font-bold text-gray-400">Add Image URL</span>
                    </div>
                  )}
                </div>

                {/* Direct Image URL input & Samples */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImageInputUrl}
                    onChange={(e) => setNewImageInputUrl(e.target.value)}
                    placeholder="Paste image URL (e.g. https://.../turbo.jpg)"
                    className={`flex-1 text-xs p-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                      isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddImage(newImageInputUrl)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-colors"
                  >
                    Add Image
                  </button>
                </div>
                
                {/* Sample Instant Click Photos */}
                <div className="flex items-center gap-2 text-[11px] text-gray-400">
                  <span>Quick sample presets:</span>
                  {[
                    { label: 'Brakes', url: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=500&h=400&fit=crop' },
                    { label: 'Coilovers', url: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=500&h=400&fit=crop' },
                    { label: 'Turbo', url: 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=500&h=400&fit=crop' },
                    { label: 'Oil', url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&h=400&fit=crop' }
                  ].map(s => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => handleAddImage(s.url)}
                      className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-red-400 font-bold border border-white/5"
                    >
                      + {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Product Basic Information */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-4 ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200 shadow-xs'
              }`}>
                <h3 className="text-base font-black">Product Information</h3>
                
                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-bold mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      value={newProductForm.name}
                      onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                      placeholder="e.g. Brembo GT-R 6-Piston Monobloc Front Big Brake Kit"
                      className={`w-full p-3 rounded-xl border focus:outline-none focus:border-red-500 font-semibold ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold mb-1">Category *</label>
                      <select
                        value={newProductForm.category}
                        onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                        className={`w-full p-2.5 rounded-xl border focus:outline-none ${
                          isDark ? 'bg-[#161a28] border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <option value="Braking">Braking Systems</option>
                        <option value="Performance">Turbo & Forced Induction</option>
                        <option value="Suspension">Suspension & Dampers</option>
                        <option value="Lubricants">Fluids & Oils</option>
                        <option value="Exhaust">Exhaust Systems</option>
                        <option value="Cooling">Radiators & Intercoolers</option>
                        <option value="Fuel Systems">Fuel & Induction</option>
                        <option value="Drivetrain">Clutch & Transmission</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Brand Name *</label>
                      <input
                        type="text"
                        value={newProductForm.brand}
                        onChange={(e) => setNewProductForm({ ...newProductForm, brand: e.target.value })}
                        placeholder="e.g. Brembo / Garrett / Motul"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                          isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Condition *</label>
                      <select
                        value={newProductForm.condition}
                        onChange={(e) => setNewProductForm({ ...newProductForm, condition: e.target.value })}
                        className={`w-full p-2.5 rounded-xl border focus:outline-none ${
                          isDark ? 'bg-[#161a28] border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <option value="New">Brand New (OEM / Sealed)</option>
                        <option value="Used">Used (Inspected)</option>
                        <option value="Refurbished">Refurbished / Remanufactured</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">SKU (Stock Keeping Unit)</label>
                      <input
                        type="text"
                        value={newProductForm.sku}
                        onChange={(e) => setNewProductForm({ ...newProductForm, sku: e.target.value })}
                        placeholder="e.g. BRM-GT6-380MM"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-red-500 font-mono ${
                          isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Manufacturer Part Number (MPN)</label>
                      <input
                        type="text"
                        value={newProductForm.partNumber}
                        onChange={(e) => setNewProductForm({ ...newProductForm, partNumber: e.target.value })}
                        placeholder="e.g. 1N1.9002A"
                        className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-red-500 font-mono ${
                          isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Short Description (Summary)</label>
                    <input
                      type="text"
                      value={newProductForm.shortDescription}
                      onChange={(e) => setNewProductForm({ ...newProductForm, shortDescription: e.target.value })}
                      placeholder="Brief highlight that appears on product cards..."
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Full Product Description & Specs</label>
                    <textarea
                      rows={3}
                      value={newProductForm.fullDescription}
                      onChange={(e) => setNewProductForm({ ...newProductForm, fullDescription: e.target.value })}
                      placeholder="Full technical details, material specifications, tolerances, installation tips..."
                      className={`w-full p-3 rounded-xl border focus:outline-none focus:border-red-500 leading-relaxed ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Vehicle Compatibility Section (Matching Spec #3) */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-4 ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black">Vehicle Compatibility</h3>
                    <p className="text-xs text-gray-400">Specify which car makes, models, and engines this part is guaranteed to fit.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddCompatibility}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-red-400"
                  >
                    + Add Car Model
                  </button>
                </div>

                <div className="space-y-3">
                  {newProductForm.compatibility.map((c, index) => (
                    <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-3 items-center">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold block mb-0.5">Make</span>
                        <input
                          type="text"
                          value={c.make}
                          onChange={(e) => {
                            const updated = [...newProductForm.compatibility];
                            updated[index].make = e.target.value;
                            setNewProductForm({ ...newProductForm, compatibility: updated });
                          }}
                          placeholder="e.g. Toyota"
                          className="w-full text-xs p-2 rounded-lg bg-black/40 border border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold block mb-0.5">Model</span>
                        <input
                          type="text"
                          value={c.model}
                          onChange={(e) => {
                            const updated = [...newProductForm.compatibility];
                            updated[index].model = e.target.value;
                            setNewProductForm({ ...newProductForm, compatibility: updated });
                          }}
                          placeholder="e.g. Supra / GR Yaris"
                          className="w-full text-xs p-2 rounded-lg bg-black/40 border border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold block mb-0.5">Year</span>
                        <input
                          type="text"
                          value={c.year}
                          onChange={(e) => {
                            const updated = [...newProductForm.compatibility];
                            updated[index].year = e.target.value;
                            setNewProductForm({ ...newProductForm, compatibility: updated });
                          }}
                          placeholder="2019 - 2024"
                          className="w-full text-xs p-2 rounded-lg bg-black/40 border border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <span className="text-[10px] text-gray-400 uppercase font-bold block mb-0.5">Engine / Trim</span>
                        <input
                          type="text"
                          value={c.engine}
                          onChange={(e) => {
                            const updated = [...newProductForm.compatibility];
                            updated[index].engine = e.target.value;
                            setNewProductForm({ ...newProductForm, compatibility: updated });
                          }}
                          placeholder="3.0L Turbo / 2JZ"
                          className="w-full text-xs p-2 rounded-lg bg-black/40 border border-white/10 text-white"
                        />
                      </div>

                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <span className="text-[10px] text-gray-400 uppercase font-bold block mb-0.5">Gearbox</span>
                          <input
                            type="text"
                            value={c.transmission}
                            onChange={(e) => {
                              const updated = [...newProductForm.compatibility];
                              updated[index].transmission = e.target.value;
                              setNewProductForm({ ...newProductForm, compatibility: updated });
                            }}
                            placeholder="Manual / Auto"
                            className="w-full text-xs p-2 rounded-lg bg-black/40 border border-white/10 text-white"
                          />
                        </div>
                        {newProductForm.compatibility.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveCompatibility(index)}
                            className="p-2 text-red-400 hover:text-red-300 font-bold text-base"
                            title="Remove"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Pricing & Inventory Management (Matching Spec #4) */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-4 ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200 shadow-xs'
              }`}>
                <h3 className="text-base font-black">Pricing & Inventory</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-bold mb-1">Selling Price ($) *</label>
                    <input
                      type="number"
                      required
                      value={newProductForm.price}
                      onChange={(e) => handlePriceChange(e.target.value, newProductForm.msrp)}
                      placeholder="143.00"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-red-500 font-black text-emerald-400 ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Original MSRP ($)</label>
                    <input
                      type="number"
                      value={newProductForm.msrp}
                      onChange={(e) => handlePriceChange(newProductForm.price, e.target.value)}
                      placeholder="180.00"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Calculated Discount</label>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 font-bold text-red-400">
                      {newProductForm.discount > 0 ? `-${newProductForm.discount}% OFF MSRP` : 'No Discount'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-bold mb-1">Available Stock Units *</label>
                    <input
                      type="number"
                      value={newProductForm.stock}
                      onChange={(e) => setNewProductForm({ ...newProductForm, stock: e.target.value })}
                      placeholder="45"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-red-500 font-bold ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Low Stock Alert Level</label>
                    <input
                      type="number"
                      value={newProductForm.lowStockAlert}
                      onChange={(e) => setNewProductForm({ ...newProductForm, lowStockAlert: e.target.value })}
                      placeholder="5"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Weight (kg)</label>
                    <input
                      type="text"
                      value={newProductForm.weight}
                      onChange={(e) => setNewProductForm({ ...newProductForm, weight: e.target.value })}
                      placeholder="2.5 kg"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Dimensions (LxWxH)</label>
                    <input
                      type="text"
                      value={newProductForm.dimensions}
                      onChange={(e) => setNewProductForm({ ...newProductForm, dimensions: e.target.value })}
                      placeholder="30 x 20 x 15 cm"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* 5. Shipping & Warranty */}
              <div className={`p-6 sm:p-7 rounded-3xl border space-y-4 ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200 shadow-xs'
              }`}>
                <h3 className="text-base font-black">Shipping & Warranty Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-bold mb-1">Shipping Method</label>
                    <select
                      value={newProductForm.shippingMethod}
                      onChange={(e) => setNewProductForm({ ...newProductForm, shippingMethod: e.target.value })}
                      className={`w-full p-2.5 rounded-xl border focus:outline-none ${
                        isDark ? 'bg-[#161a28] border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <option value="Standard Express (2-3 Days)">Standard Express (2-3 Days)</option>
                      <option value="Same-Day Dispatch (Dhaka Hub)">Same-Day Dispatch (Dhaka Hub)</option>
                      <option value="Heavy Freight Secure">Heavy Freight Secure (Over 10kg)</option>
                      <option value="Store Pickup (Tejgaon Warehouse)">Store Pickup (Tejgaon Warehouse)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Shipping Fee ($)</label>
                    <input
                      type="number"
                      disabled={newProductForm.freeShipping}
                      value={newProductForm.shippingCost}
                      onChange={(e) => setNewProductForm({ ...newProductForm, shippingCost: e.target.value })}
                      placeholder="8.00"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none ${
                        newProductForm.freeShipping ? 'opacity-40 cursor-not-allowed' : ''
                      } ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'}`}
                    />
                    <label className="flex items-center gap-2 mt-1.5 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={newProductForm.freeShipping}
                        onChange={(e) => setNewProductForm({ ...newProductForm, freeShipping: e.target.checked })}
                      />
                      <span className="text-emerald-400 font-bold">Offer Free Shipping</span>
                    </label>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Warranty Term</label>
                    <input
                      type="text"
                      value={newProductForm.warranty}
                      onChange={(e) => setNewProductForm({ ...newProductForm, warranty: e.target.value })}
                      placeholder="2 Years Manufacturer Warranty"
                      className={`w-full p-2.5 rounded-xl border focus:outline-none ${
                        isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* 6. Form Actions: Draft / Publish (Matching Spec #6) */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => handlePublishProduct('Draft')}
                  className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-bold transition-colors"
                >
                  💾 Save as Draft
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('products')}
                    className="px-6 py-3 rounded-2xl border border-white/15 text-xs sm:text-sm font-bold hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePublishProduct('Active')}
                    className="px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all"
                  >
                    🚀 Publish Product to Marketplace
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════ TAB 4: INVENTORY MANAGEMENT ══════════════════ */}
          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">Warehouse Inventory Management</h2>
                  <p className="text-xs text-gray-400">Inline real-time stock counters, low-stock alerts, and reserved stock breakdown.</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs bg-amber-500/20 text-amber-400 font-bold px-3 py-1 rounded-full border border-amber-500/30">
                    ⚠️ {productsList.filter(p => p.stock <= (p.lowStockAlert || 5)).length} Low Stock Alerts
                  </span>
                </div>
              </div>

              <div className={`rounded-3xl border overflow-hidden ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 text-gray-400 text-[11px] uppercase tracking-wider bg-white/5">
                        <th className="p-4">Product Details</th>
                        <th className="p-4">SKU</th>
                        <th className="p-4">Reserved Stock</th>
                        <th className="p-4">Available</th>
                        <th className="p-4">Threshold</th>
                        <th className="p-4">Current Stock</th>
                        <th className="p-4 text-center">Quick Stock Adjust</th>
                        <th className="p-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {productsList.map(p => {
                        const isLow = p.stock > 0 && p.stock <= (p.lowStockAlert || 5);
                        const isOut = p.stock === 0;

                        return (
                          <tr key={p.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.images[0]}
                                  alt={p.name}
                                  className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                                />
                                <span className="font-bold">{p.name}</span>
                              </div>
                            </td>
                            <td className="p-4 font-mono text-gray-400">{p.sku}</td>
                            <td className="p-4 text-gray-400">{p.reservedStock || 0}</td>
                            <td className="p-4 font-bold text-emerald-400">{p.availableStock || p.stock}</td>
                            <td className="p-4 text-gray-400">&lt; {p.lowStockAlert || 5}</td>
                            <td className="p-4">
                              <input
                                type="number"
                                value={p.stock}
                                onChange={(e) => handleDirectStockChange(p.id, e.target.value)}
                                className="w-16 p-1.5 rounded-lg border text-center font-black text-xs bg-white/5 border-white/20 text-inherit focus:outline-none focus:border-red-500"
                              />
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => handleUpdateStock(p.id, -1)}
                                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 font-black text-sm flex items-center justify-center transition-colors"
                                  title="Decrease Stock (-1)"
                                >
                                  -
                                </button>
                                <button
                                  onClick={() => handleUpdateStock(p.id, 5)}
                                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-black transition-colors"
                                  title="Add 5 Units"
                                >
                                  +5
                                </button>
                                <button
                                  onClick={() => handleUpdateStock(p.id, 1)}
                                  className="w-7 h-7 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-sm flex items-center justify-center transition-colors"
                                  title="Increase Stock (+1)"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                                isOut ? 'bg-red-500/20 text-red-400' :
                                isLow ? 'bg-amber-500/20 text-amber-400 animate-pulse' :
                                'bg-emerald-500/20 text-emerald-400'
                              }`}>
                                {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'Optimal'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════ TAB 5: ORDERS MANAGEMENT ══════════════════ */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">Marketplace Orders Management</h2>
                  <p className="text-xs text-gray-400">Process, pack, generate waybills, and update shipment progress for customer orders.</p>
                </div>

                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search by Order ID or customer..."
                    className={`w-full text-xs pl-8 pr-4 py-2 rounded-xl border focus:outline-none focus:border-red-500 ${
                      isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200'
                    }`}
                  />
                  <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Order Status Tabs (Matching Spec #9) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['All', 'Pending', 'Accepted', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(st => {
                  const count = st === 'All' ? ordersList.length : ordersList.filter(o => o.status === st).length;
                  return (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                        orderStatusFilter === st
                          ? 'bg-red-600 text-white shadow-md'
                          : isDark ? 'bg-white/5 hover:bg-white/10 text-gray-300' : 'bg-white border border-gray-200 text-gray-700'
                      }`}
                    >
                      <span>{st}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 text-white">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* Orders Table */}
              <div className={`rounded-3xl border overflow-hidden ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 text-gray-400 text-[11px] uppercase tracking-wider bg-white/5">
                        <th className="p-4">Order ID & Date</th>
                        <th className="p-4">Product Purchased</th>
                        <th className="p-4">Customer & Location</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {filteredOrders.map(o => (
                        <tr key={o.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="font-mono font-bold text-red-500">{o.id}</div>
                            <div className="text-[11px] text-gray-400 mt-0.5">{o.orderDate}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold">{o.product}</div>
                            <div className="text-[11px] text-gray-400">Qty: {o.qty} • SKU: {o.sku}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold">{o.customer}</div>
                            <div className="text-[11px] text-gray-400 truncate max-w-[160px]">{o.shippingAddress}</div>
                          </td>
                          <td className="p-4">
                            <span className="text-xs font-bold text-emerald-400 block">{o.paymentStatus}</span>
                            <span className="text-[10px] text-gray-400">{o.paymentMethod}</span>
                          </td>
                          <td className="p-4 font-black text-sm">{o.total}</td>
                          <td className="p-4">
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                              o.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                              o.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                              o.status === 'Processing' ? 'bg-amber-500/20 text-amber-400' :
                              o.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedOrderDetails(o)}
                                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors"
                              >
                                Manage
                              </button>
                              {o.status === 'Pending' && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(o.id, 'Processing')}
                                  className="px-3 py-1.5 rounded-xl text-xs font-black bg-red-600 hover:bg-red-700 text-white shadow-sm"
                                >
                                  Process
                                </button>
                              )}
                              {o.status === 'Processing' && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(o.id, 'Shipped')}
                                  className="px-3 py-1.5 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                >
                                  Ship
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════ TAB 6: SALES & REVENUE ══════════════════ */}
          {activeTab === 'sales' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Seller Financial Dashboard & Earnings</h2>
                <p className="text-xs text-gray-400">Detailed financial summary, completed payouts, platform commission fees, and net earnings.</p>
              </div>

              {/* Financial KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {[
                  { label: 'Total Gross Revenue', val: currentSupplier.kpis.revenue, color: 'text-emerald-400', sub: 'All gross sales' },
                  { label: "Today's Revenue", val: currentSupplier.kpis.todayRevenue, color: 'text-blue-400', sub: '+18% vs yesterday' },
                  { label: 'Monthly Revenue', val: currentSupplier.kpis.monthlyRevenue, color: 'text-indigo-400', sub: 'Current billing month' },
                  { label: 'Platform Fees (8%)', val: currentSupplier.kpis.platformFeesPaid, color: 'text-amber-400', sub: 'Mechify marketplace fee' },
                  { label: 'Completed Payouts', val: currentSupplier.kpis.completedPayments, color: 'text-emerald-400', sub: 'Disbursed to bank' },
                  { label: 'Pending Clearances', val: currentSupplier.kpis.pendingPayments, color: 'text-cyan-400', sub: 'Settling in 24h' },
                  { label: 'Processed Refunds', val: currentSupplier.kpis.refunds, color: 'text-red-400', sub: 'Returns & cancellations' },
                  { label: 'Net Take-Home', val: currentSupplier.kpis.netEarnings, color: 'text-emerald-300 font-black', sub: 'Total profit after fees' },
                ].map((f, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'}`}>
                    <span className="text-xs text-gray-400 font-bold block">{f.label}</span>
                    <div className={`text-2xl sm:text-3xl font-black mt-1 ${f.color}`}>{f.val}</div>
                    <span className="text-[10px] text-gray-400 mt-1 block">{f.sub}</span>
                  </div>
                ))}
              </div>

              {/* Transactions Ledger Table */}
              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-black">Recent Marketplace Payout Transactions</h3>
                  <button
                    onClick={() => alert(`Requesting Payout for ${currentSupplier.kpis.pendingPayments} to Eastern Bank Ltd (Acc #108-291-002)... Payout initiated!`)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                  >
                    Withdraw to Bank ({currentSupplier.kpis.pendingPayments})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-white/10 text-gray-400 text-[11px] uppercase tracking-wider">
                        <th className="pb-3">Transaction ID</th>
                        <th className="pb-3">Related Order</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Gross Amount</th>
                        <th className="pb-3">Platform Fee (8%)</th>
                        <th className="pb-3">Net Earnings</th>
                        <th className="pb-3 text-right">Payout Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                      {ordersList.map((o, idx) => {
                        const gross = parseFloat(o.total.replace('$', '')) || 100;
                        const fee = (gross * 0.08).toFixed(2);
                        const net = (gross - fee).toFixed(2);
                        return (
                          <tr key={idx} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 font-mono text-gray-400">TXN-998{idx + 10}</td>
                            <td className="py-3 font-bold text-red-400">{o.id}</td>
                            <td className="py-3 text-gray-400">{o.orderDate.split(' - ')[0]}</td>
                            <td className="py-3 font-semibold">{o.total}</td>
                            <td className="py-3 text-red-400">-${fee}</td>
                            <td className="py-3 font-bold text-emerald-400">${net}</td>
                            <td className="py-3 text-right">
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                                Settled
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════ TAB 7: CUSTOMERS DIRECTORY ══════════════════ */}
          {activeTab === 'customers' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Marketplace Customers Directory</h2>
                <p className="text-xs text-gray-400">Verified car enthusiasts and workshops who have ordered performance parts from your store.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { name: 'Tanvir Hossain', phone: '+880 1722-114477', city: 'Uttara, Dhaka', orders: 4, spent: '$1,480.00', lastItem: 'Garrett GTX3582R Gen II Turbo' },
                  { name: 'Arman Khan', phone: '+880 1911-332211', city: 'Dhanmondi, Dhaka', orders: 6, spent: '$2,190.00', lastItem: 'Akrapovič Titanium Tips' },
                  { name: 'Sabbir Ahmed', phone: '+880 1622-445566', city: 'Mirpur DOHS, Dhaka', orders: 3, spent: '$1,120.00', lastItem: 'Bilstein B16 Coilovers' },
                  { name: 'Ronald Richards', phone: '+880 1712-345678', city: 'Banani, Dhaka', orders: 5, spent: '$1,950.00', lastItem: 'Brembo Ceramic Pads' },
                  { name: 'Mahi Rahman', phone: '+880 1819-223344', city: 'Gulshan 2, Dhaka', orders: 8, spent: '$890.00', lastItem: 'Motul 300V Synthetic Oil' },
                  { name: 'Tony Stark', phone: '+880 1304-098448', city: 'Gulshan 2, Dhaka', orders: 12, spent: '$4,800.00', lastItem: 'Walbro 450LPH Fuel Pump' }
                ].map((c, i) => (
                  <div key={i} className={`p-5 rounded-3xl border flex flex-col justify-between ${
                    isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
                  }`}>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-black text-white text-base">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{c.name}</h4>
                          <span className="text-[11px] text-gray-400">{c.city}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-gray-400 py-3 border-y border-white/5">
                        <div className="flex justify-between">
                          <span>Phone:</span>
                          <span className="text-inherit font-bold">{c.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Orders:</span>
                          <span className="text-inherit font-bold">{c.orders} Orders</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lifetime Value:</span>
                          <span className="text-emerald-400 font-black">{c.spent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recent Part:</span>
                          <span className="text-inherit font-semibold truncate max-w-[140px]">{c.lastItem}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-2">
                      <button
                        onClick={() => { setActiveTab('messages'); }}
                        className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-center transition-colors"
                      >
                        💬 Message
                      </button>
                      <a
                        href={`tel:${c.phone}`}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold text-center transition-colors"
                      >
                        📞 Call
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ══════════════════ TAB 8: MESSAGES (CUSTOMER CHAT INBOX) ══════════════════ */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Customer Messages & Inquiries</h2>
                <p className="text-xs text-gray-400">Answer buyer questions regarding fitment, installation guides, and delivery times.</p>
              </div>

              <div className={`h-[580px] rounded-3xl border flex overflow-hidden ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
              }`}>
                {/* Left Conversations List */}
                <div className="w-80 border-r border-gray-200 dark:border-white/10 flex flex-col shrink-0">
                  <div className="p-4 border-b border-gray-200 dark:border-white/10">
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="w-full text-xs p-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none"
                    />
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-white/5 overflow-y-auto flex-1">
                    {messagesList.map(m => (
                      <div
                        key={m.id}
                        onClick={() => setActiveChatId(m.id)}
                        className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                          activeChatId === m.id
                            ? 'bg-red-600/10 border-l-4 border-red-600'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <img src={m.customerAvatar} alt={m.customerName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xs truncate">{m.customerName}</h4>
                            <span className="text-[10px] text-gray-400">{m.time}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 truncate mt-0.5">{m.lastMessage}</p>
                          <span className="text-[9px] font-bold text-red-400 truncate block mt-1">
                            📦 {m.relatedProduct}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Chat Pane */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={activeChat.customerAvatar} alt={activeChat.customerName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-sm">{activeChat.customerName}</h4>
                        <span className="text-[11px] text-red-400 font-semibold">Regarding: {activeChat.relatedProduct}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message History */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {activeChat.history.map((h, i) => (
                      <div key={i} className={`flex ${h.sender === 'supplier' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          h.sender === 'supplier'
                            ? 'bg-red-600 text-white rounded-br-none shadow-md'
                            : isDark ? 'bg-white/10 text-gray-200 rounded-bl-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'
                        }`}>
                          <p>{h.text}</p>
                          <span className="text-[9px] opacity-75 block text-right mt-1">{h.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Composer */}
                  <div className="p-4 border-t border-gray-200 dark:border-white/10 flex gap-2">
                    <button
                      onClick={() => alert("Upload schematic or install photo")}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm"
                      title="Attach schematic/photo"
                    >
                      📎
                    </button>
                    <input
                      type="text"
                      value={chatReplyText}
                      onChange={(e) => setChatReplyText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                      placeholder="Type your reply to customer..."
                      className="flex-1 text-xs sm:text-sm p-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-red-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-md"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════ TAB 9: REVIEWS & RATINGS ══════════════════ */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-black">Customer Reviews & Seller Reputation</h2>
                <p className="text-xs text-gray-400">View verified feedback from car builders and respond to customer reviews.</p>
              </div>

              {/* Rating Overview Breakdown */}
              <div className={`p-6 sm:p-7 rounded-3xl border flex flex-col md:flex-row items-center gap-8 ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
              }`}>
                <div className="text-center md:border-r border-white/10 md:pr-8 shrink-0">
                  <div className="text-5xl font-black text-amber-400">{currentSupplier.rating}</div>
                  <div className="text-amber-400 text-lg mt-1">★★★★★</div>
                  <div className="text-xs text-gray-400 mt-1">Based on {currentSupplier.totalReviewsCount} verified reviews</div>
                </div>

                {/* Star percentage bars */}
                <div className="flex-1 w-full space-y-2 text-xs">
                  {[
                    { star: 5, pct: currentSupplier.ratingBreakdown.star5 },
                    { star: 4, pct: currentSupplier.ratingBreakdown.star4 },
                    { star: 3, pct: currentSupplier.ratingBreakdown.star3 },
                    { star: 2, pct: currentSupplier.ratingBreakdown.star2 },
                    { star: 1, pct: currentSupplier.ratingBreakdown.star1 },
                  ].map(b => (
                    <div key={b.star} className="flex items-center gap-3">
                      <span className="w-12 font-bold">{b.star} Star</span>
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${b.pct}%` }} />
                      </div>
                      <span className="w-8 text-right text-gray-400">{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsList.map(r => (
                  <div key={r.id} className={`p-6 rounded-3xl border ${
                    isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm">{r.customerName}</span>
                        {r.verifiedPurchase && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>

                    <div className="text-amber-400 text-xs mb-1">
                      {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                    </div>
                    <div className="text-xs text-red-400 font-bold mb-2">Part: {r.product}</div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{r.comment}</p>

                    {/* Existing Supplier Reply */}
                    {r.reply ? (
                      <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs leading-relaxed">
                        <strong className="text-white block mb-1">Response from {storeProfile.companyName}:</strong>
                        <span className="text-gray-300">{r.reply}</span>
                      </div>
                    ) : (
                      /* Reply composer */
                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          value={reviewReplyInputs[r.id] || ''}
                          onChange={(e) => setReviewReplyInputs({ ...reviewReplyInputs, [r.id]: e.target.value })}
                          placeholder="Reply publicly as seller..."
                          className="flex-1 text-xs p-2.5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-red-500"
                        />
                        <button
                          onClick={() => handleReplyReview(r.id)}
                          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                        >
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ══════════════════ TAB 10: STORE PROFILE (PUBLIC STOREFRONT CONFIG) ══════════════════ */}
          {activeTab === 'store_profile' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
              
              <div>
                <h2 className="text-2xl font-black">Public Store Profile & Branding</h2>
                <p className="text-xs text-gray-400">This profile is visible to customers browsing your parts on the Mechify marketplace.</p>
              </div>

              {/* Live Preview Card */}
              <div className="rounded-3xl border border-white/15 overflow-hidden bg-black/40 shadow-2xl relative">
                {/* Banner Cover */}
                <div className="h-44 sm:h-52 w-full relative">
                  <img src={storeProfile.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Header over banner */}
                <div className="p-6 sm:p-8 pt-0 relative -mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div className="flex items-end gap-4">
                    <img
                      src={storeProfile.avatar}
                      alt="Logo"
                      className="w-24 h-24 rounded-3xl object-cover border-4 border-[#0a0c14] shadow-2xl"
                    />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black">{storeProfile.companyName}</h3>
                      <p className="text-xs text-gray-300">Managed by {storeProfile.vendorName} • {storeProfile.address}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-amber-400 text-xs font-black">★ {currentSupplier.rating}</span>
                        <span className="text-[11px] text-gray-400">({currentSupplier.totalReviewsCount} reviews)</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded">
                          Official Store
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description & Policies */}
                <div className="p-6 sm:p-8 pt-2 space-y-4 border-t border-white/10 text-xs sm:text-sm">
                  <p className="text-gray-300 leading-relaxed">{storeProfile.storeDescription}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-white block mb-1">Return Policy:</strong>
                      <p className="text-gray-400 text-xs">{storeProfile.returnPolicy}</p>
                    </div>
                    <div className="p-3.5 bg-white/5 rounded-2xl border border-white/5">
                      <strong className="text-white block mb-1">Warranty Policy:</strong>
                      <p className="text-gray-400 text-xs">{storeProfile.warrantyPolicy}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Store Information Form */}
              <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
              }`}>
                <h3 className="text-base font-black">Edit Store Information</h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">Store / Business Name</label>
                      <input
                        type="text"
                        value={storeProfile.companyName}
                        onChange={(e) => setStoreProfile({ ...storeProfile, companyName: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-inherit focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Store Hotline / Phone</label>
                      <input
                        type="text"
                        value={storeProfile.phone}
                        onChange={(e) => setStoreProfile({ ...storeProfile, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-inherit focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Warehouse Address & Dispatch Location</label>
                    <input
                      type="text"
                      value={storeProfile.address}
                      onChange={(e) => setStoreProfile({ ...storeProfile, address: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-inherit focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Store Description (Visible to Buyers)</label>
                    <textarea
                      rows={3}
                      value={storeProfile.storeDescription}
                      onChange={(e) => setStoreProfile({ ...storeProfile, storeDescription: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-inherit focus:outline-none focus:border-red-500 leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">Return Policy</label>
                      <textarea
                        rows={2}
                        value={storeProfile.returnPolicy}
                        onChange={(e) => setStoreProfile({ ...storeProfile, returnPolicy: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-inherit focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Warranty Policy</label>
                      <textarea
                        rows={2}
                        value={storeProfile.warrantyPolicy}
                        onChange={(e) => setStoreProfile({ ...storeProfile, warrantyPolicy: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-inherit focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => alert("Store Profile settings saved successfully!")}
                      className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm shadow-md transition-all"
                    >
                      Save Store Changes
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ══════════════════ TAB 11: SETTINGS & HELP ══════════════════ */}
          {(activeTab === 'settings' || activeTab === 'help') && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-black">{activeTab === 'settings' ? 'Seller Settings' : 'Seller Knowledge Base & Support'}</h2>
              
              <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 ${
                isDark ? 'bg-[#10131d] border-white/10' : 'bg-white border-gray-200'
              }`}>
                <h3 className="text-base font-black">Bank Payout Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Bank Name</span>
                    <span className="font-bold text-base">Eastern Bank Limited (EBL)</span>
                    <span className="text-xs text-gray-400 block mt-1">Gulshan Branch, Dhaka</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Account Number & Routing</span>
                    <span className="font-mono font-bold text-base">108-291-002-9901</span>
                    <span className="text-xs text-emerald-400 font-bold block mt-1">✓ Verified for Auto-Disbursement</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-bold text-sm mb-2">Seller Support Hotline & Merchant Manager</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    Need assistance with bulky freight shipments, OEM import clearance, or API catalog synchronization? Reach your dedicated Mechify seller manager 24/7.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="tel:+8801304098448" className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs">
                      📞 Call Merchant Support (+880 1304-098448)
                    </a>
                    <button onClick={() => alert("Ticket #SUP-8891 opened! Support will reply within 30 minutes.")} className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold text-xs">
                      🎫 Open Seller Support Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ─── MODAL: ORDER DETAILS (Matching Spec #9) ─── */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className={`p-6 sm:p-8 rounded-3xl max-w-2xl w-full border shadow-2xl relative max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-[#141724] border-white/20 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}>
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                {selectedOrderDetails.id}
              </span>
              <span className="text-xs text-gray-400">{selectedOrderDetails.orderDate}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black">Order Dispatch & Invoice Details</h3>
            
            {/* Customer info */}
            <div className="my-5 p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Customer Info</span>
                <strong className="text-inherit text-base block">{selectedOrderDetails.customer}</strong>
                <span className="text-gray-400">{selectedOrderDetails.customerPhone}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Shipping Address</span>
                <span className="text-inherit">{selectedOrderDetails.shippingAddress}</span>
              </div>
            </div>

            {/* Product Purchased */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs sm:text-sm mb-5">
              <div className="flex justify-between font-bold">
                <span>{selectedOrderDetails.product} (x{selectedOrderDetails.qty})</span>
                <span>{selectedOrderDetails.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping ({selectedOrderDetails.paymentMethod})</span>
                <span>{selectedOrderDetails.shippingCost}</span>
              </div>
              <div className="flex justify-between text-base font-black pt-2 border-t border-white/10">
                <span>Total Paid:</span>
                <span className="text-emerald-400">{selectedOrderDetails.total}</span>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="mb-6">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">Order Fulfillment Timeline</h4>
              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10 pl-7">
                {selectedOrderDetails.timeline?.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span className={`w-3 h-3 rounded-full absolute -left-7 top-1 ${step.done ? 'bg-emerald-500' : 'bg-gray-600'}`} />
                    <div className="font-bold text-xs">{step.status}</div>
                    <div className="text-[10px] text-gray-400">{step.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Update Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Set Status:</span>
                {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateOrderStatus(selectedOrderDetails.id, st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedOrderDetails.status === st
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-white/10 hover:bg-white/20 text-inherit'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ─── MODAL: PRODUCT PREVIEW DIALOG ─── */}
      {selectedProductPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className={`p-6 sm:p-8 rounded-3xl max-w-xl w-full border shadow-2xl relative ${
            isDark ? 'bg-[#141724] border-white/20 text-white' : 'bg-white border-gray-300 text-gray-900'
          }`}>
            <button
              onClick={() => setSelectedProductPreview(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 text-xl font-bold"
            >
              ✕
            </button>

            <img
              src={selectedProductPreview.images[0]}
              alt={selectedProductPreview.name}
              className="w-full h-56 rounded-2xl object-cover border border-white/10 mb-4"
            />

            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-red-400 font-bold uppercase">{selectedProductPreview.brand} • {selectedProductPreview.category}</span>
              <span className="text-xs text-amber-400 font-black">★ {selectedProductPreview.rating}</span>
            </div>

            <h3 className="text-xl font-black">{selectedProductPreview.name}</h3>
            <p className="text-xs text-gray-400 font-mono mt-0.5">SKU: {selectedProductPreview.sku} • MPN: {selectedProductPreview.partNumber}</p>
            
            <p className="text-xs sm:text-sm text-gray-300 my-4 leading-relaxed">
              {selectedProductPreview.fullDescription || selectedProductPreview.shortDescription}
            </p>

            <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center mb-5">
              <div>
                <span className="text-xs text-gray-400 block">Selling Price</span>
                <span className="text-2xl font-black text-emerald-400">${selectedProductPreview.price}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 block">Current Stock</span>
                <span className="text-base font-black">{selectedProductPreview.stock} Units Available</span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedProductPreview(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: PUBLISH CONFIRMATION ─── */}
      {publishSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`p-8 rounded-3xl max-w-md w-full text-center border shadow-2xl ${
            isDark ? 'bg-[#141724] border-white/20 text-white' : 'bg-white border-gray-300'
          }`}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 text-3xl flex items-center justify-center mx-auto mb-4 animate-bounce">
              ✓
            </div>
            <h3 className="text-2xl font-black">Product Listed!</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              <strong className="text-white">{publishSuccessModal.name}</strong> is now live on the Mechify Marketplace.
            </p>
            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={() => {
                  setSelectedProductPreview(publishSuccessModal);
                  setPublishSuccessModal(null);
                }}
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md"
              >
                View Product Card
              </button>
              <button
                onClick={() => {
                  setPublishSuccessModal(null);
                  setActiveTab('products');
                }}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold"
              >
                Go to My Products
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
