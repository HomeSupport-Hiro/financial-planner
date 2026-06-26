/* ============================================
   Our Financial Planner - Data Layer
   ============================================ */

const AppData = (() => {
  'use strict';

  // ===== POS UANG =====
  const defaultFunds = [
    { id: 'Blu', name: 'Blu', desc: 'Rekening transaksi harian', balance: 0, startBalance: 0, target: '' },
    { id: 'Comfort Life', name: 'Comfort Life', desc: 'Dana darurat', balance: 0, startBalance: 0, target: '' },
    { id: 'Hiroshi', name: 'Hiroshi', desc: 'Tabungan Hiro', balance: 0, startBalance: 0, target: '' },
    { id: 'Education', name: 'Education', desc: 'Tabungan pendidikan', balance: 0, startBalance: 0, target: '' },
    { id: "Hiro's Room", name: "Hiro's Room", desc: 'Tabungan kamar/ruang Hiro', balance: 0, startBalance: 0, target: '' },
    { id: 'Fidyah', name: 'Fidyah', desc: 'Dana sosial/amal', balance: 0, startBalance: 0, target: '' },
    { id: 'Cash', name: 'Cash', desc: 'Uang tunai fisik', balance: 0, startBalance: 0, target: '' },
    { id: 'E-money', name: 'E-money', desc: 'GoPay/OVO/dll', balance: 0, startBalance: 0, target: '' }
  ];

  // ===== KATEGORI DEFAULT =====
  const defaultIncomeCategories = ['Paycheck', 'Interest', 'Repayment', 'Gifts', 'Other'];
  const defaultExpenseCategories = [
    'Food', 'Groceries', 'Health & Medical', 'Home', 'Travel Expenses',
    'Utilities', 'Phone Credit', 'Entertainment', 'Skin & Body Care',
    "Hiroshi's", "Mpi's", "Henry's", 'Gifts', 'Public Transportation',
    'Event', 'Loan', 'Debt', 'Zakat', 'Admin Fee', 'Other'
  ];

  // PIC mapping
  const defaultPic = {
    'Food': 'Vina/Henry', 'Groceries': 'Vina', 'Health & Medical': 'Vina',
    'Home': 'Henry', 'Travel Expenses': 'Henry', 'Utilities': 'Henry',
    'Phone Credit': 'Vina/Henry', 'Entertainment': 'Vina/Henry',
    'Skin & Body Care': 'Vina', "Hiroshi's": 'Vina', "Mpi's": 'Vina',
    "Henry's": 'Henry', 'Gifts': 'Vina/Henry', 'Public Transportation': 'Henry',
    'Event': 'Vina/Henry', 'Loan': 'Henry', 'Debt': 'Henry',
    'Zakat': 'Henry', 'Admin Fee': 'Henry', 'Other': 'Vina/Henry'
  };

  // Prioritas mapping
  const defaultPrioritas = {
    'Food': 'Wajib', 'Groceries': 'Wajib', 'Health & Medical': 'Wajib',
    'Home': 'Wajib', 'Travel Expenses': 'Wajib', 'Utilities': 'Wajib',
    'Phone Credit': 'Wajib', 'Entertainment': 'Boleh', 'Skin & Body Care': 'Boleh',
    "Hiroshi's": 'Wajib', "Mpi's": 'Wajib', "Henry's": 'Wajib',
    'Gifts': 'Boleh', 'Public Transportation': 'Wajib', 'Event': 'Boleh',
    'Loan': 'Wajib', 'Debt': 'Wajib', 'Zakat': 'Wajib', 'Admin Fee': 'Wajib', 'Other': 'Boleh'
  };

  // ===== SAMPLE DATA =====
  const sampleTransactions = [
    { id: 1,  tanggal: '2026-06-01', jenis: 'Masuk',  kategori: 'Paycheck',      keterangan: 'Gaji Mei 2026',           nominal: 5200000,  posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Vina' },
    { id: 2,  tanggal: '2026-06-01', jenis: 'Keluar', kategori: 'Food',          keterangan: 'Paketan Vina',           nominal: 38000,    posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Vina' },
    { id: 3,  tanggal: '2026-06-01', jenis: 'Keluar', kategori: 'Phone Credit',  keterangan: 'Pulsa Henry',            nominal: 50000,    posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Henry' },
    { id: 4,  tanggal: '2026-06-01', jenis: 'Keluar', kategori: 'Utilities',     keterangan: 'Admin pulsa',            nominal: 2500,     posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Henry' },
    { id: 5,  tanggal: '2026-06-01', jenis: 'Keluar', kategori: 'Groceries',     keterangan: 'Minyak Goreng 1L',       nominal: 22990,    posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Vina' },
    { id: 6,  tanggal: '2026-06-01', jenis: 'Keluar', kategori: 'Groceries',     keterangan: 'Saus Tiram',             nominal: 19990,    posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Vina' },
    { id: 7,  tanggal: '2026-06-01', jenis: 'Keluar', kategori: 'Home',          keterangan: 'Tisu kecil 4pcs molang', nominal: 16590,    posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Vina' },
    { id: 8,  tanggal: '2026-06-02', jenis: 'Keluar', kategori: "Hiroshi's",     keterangan: 'Mamy Poko M56 4pcs',      nominal: 439200,   posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Vina' },
    { id: 9,  tanggal: '2026-06-02', jenis: 'Keluar', kategori: 'Food',          keterangan: 'Gacoan Time',            nominal: 70810,    posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Vina' },
    { id: 10, tanggal: '2026-06-02', jenis: 'Pindah', kategori: '',              keterangan: 'Transfer Dana Darurat',   nominal: 500000,   posAsal: 'Blu', posTujuan: 'Comfort Life', input: 'Chat', oleh: 'Henry' },
    { id: 11, tanggal: '2026-06-02', jenis: 'Pindah', kategori: '',              keterangan: 'Nabung Hiro',            nominal: 450000,   posAsal: 'Blu', posTujuan: 'Hiroshi',    input: 'Chat', oleh: 'Henry' },
    { id: 12, tanggal: '2026-06-02', jenis: 'Pindah', kategori: '',              keterangan: 'Nabung Education',       nominal: 200000,   posAsal: 'Blu', posTujuan: 'Education',  input: 'Chat', oleh: 'Henry' },
    { id: 13, tanggal: '2026-06-02', jenis: 'Pindah', kategori: '',              keterangan: "Nabung Hiro's Room",     nominal: 200000,   posAsal: 'Blu', posTujuan: "Hiro's Room", input: 'Chat', oleh: 'Henry' },
    { id: 14, tanggal: '2026-06-02', jenis: 'Pindah', kategori: '',              keterangan: 'Nabung Fidyah',          nominal: 150000,   posAsal: 'Blu', posTujuan: 'Fidyah',     input: 'Chat', oleh: 'Henry' },
    { id: 15, tanggal: '2026-06-02', jenis: 'Keluar', kategori: 'Entertainment', keterangan: 'Netflix Juni',           nominal: 40000,    posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Vina' },
    { id: 16, tanggal: '2026-06-02', jenis: 'Keluar', kategori: 'Entertainment', keterangan: 'Spotify Juni',           nominal: 37000,    posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Vina' },
    { id: 17, tanggal: '2026-06-02', jenis: 'Keluar', kategori: 'Zakat',         keterangan: 'Zakat Juni',             nominal: 50000,    posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Henry' },
    { id: 18, tanggal: '2026-06-10', jenis: 'Masuk',  kategori: 'Repayment',     keterangan: 'Netflix bayar Evelyn',   nominal: 37000,    posAsal: 'Blu', posTujuan: '',      input: 'Chat', oleh: 'Vina' },
    { id: 19, tanggal: '2026-06-14', jenis: 'Keluar', kategori: 'Travel Expenses', keterangan: 'Tol Pakis-Pandaan',   nominal: 36000,    posAsal: 'E-money', posTujuan: '', input: 'Chat', oleh: 'Henry' },
    { id: 20, tanggal: '2026-06-14', jenis: 'Keluar', kategori: 'Travel Expenses', keterangan: 'Tol Pandaan-Singosari', nominal: 32500,  posAsal: 'E-money', posTujuan: '', input: 'Chat', oleh: 'Henry' },
    { id: 21, tanggal: '2026-06-20', jenis: 'Masuk',  kategori: 'Gifts',          keterangan: 'Dari Mbak Elly',          nominal: 50000,    posAsal: 'Hiroshi', posTujuan: '', input: 'Chat', oleh: 'Vina' }
  ];

  const budgetIncomeTarget = {};
  const budgetExpenseTarget = {};
  defaultIncomeCategories.forEach(c => { budgetIncomeTarget[c] = 0; });
  defaultExpenseCategories.forEach(c => { budgetExpenseTarget[c] = 0; });

  // ===== LOCAL STORAGE KEYS =====
  const STORAGE_KEYS = {
    transactions: 'finplanner_transactions',
    funds: 'finplanner_funds',
    budgetIncome: 'finplanner_budget_income',
    budgetExpense: 'finplanner_budget_expense',
    incomeCats: 'finplanner_income_cats',
    expenseCats: 'finplanner_expense_cats',
    picData: 'finplanner_pic',
    prioritasData: 'finplanner_prioritas'
  };

  // ===== HELPERS =====
  function formatRp(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return 'Rp\u00a00,00';
    // Always show 2 decimal places
    const fixed = amount.toFixed(2);
    const parts = fixed.split('.');
    const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return 'Rp\u00a0' + intPart + ',' + parts[1];
  }

  function parseDate(dateStr) {
    if (!dateStr) return new Date();
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts[0].length === 4) {
        return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      }
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const monthIdx = months.indexOf(parts[1]);
      if (monthIdx >= 0) {
        const year = 2000 + parseInt(parts[2]);
        return new Date(year, monthIdx, parseInt(parts[0]));
      }
    }
    return new Date(dateStr);
  }

  function formatDateDisplay(dateStr) {
    const d = parseDate(dateStr);
    const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function getMonth(dateStr) {
    const d = parseDate(dateStr);
    const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function isCurrentMonth(dateStr) {
    const d = parseDate(dateStr);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }

  function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  // ===== STORAGE =====
  function loadData(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : (typeof fallback === 'function' ? fallback() : fallback);
    } catch { return typeof fallback === 'function' ? fallback() : fallback; }
  }

  function saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch { return false; }
  }

  // ===== PUBLIC API =====
  return {
    // -- Categories (dynamic) --
    getIncomeCategories() {
      return loadData(STORAGE_KEYS.incomeCats, [...defaultIncomeCategories]);
    },
    setIncomeCategories(arr) {
      return saveData(STORAGE_KEYS.incomeCats, arr);
    },
    getExpenseCategories() {
      return loadData(STORAGE_KEYS.expenseCats, [...defaultExpenseCategories]);
    },
    setExpenseCategories(arr) {
      return saveData(STORAGE_KEYS.expenseCats, arr);
    },
    addExpenseCategory(name, pic, prio) {
      const cats = this.getExpenseCategories();
      if (cats.includes(name)) return false;
      cats.push(name);
      this.setExpenseCategories(cats);
      // Save PIC & prioritas
      const pics = this.getPicData();
      pics[name] = pic || 'Vina/Henry';
      this.setPicData(pics);
      const prios = this.getPrioritasData();
      prios[name] = prio || 'Boleh';
      this.setPrioritasData(prios);
      return true;
    },
    removeExpenseCategory(name) {
      let cats = this.getExpenseCategories();
      if (cats.length <= 1) return false;
      cats = cats.filter(c => c !== name);
      this.setExpenseCategories(cats);
      const pics = this.getPicData();
      delete pics[name];
      this.setPicData(pics);
      const prios = this.getPrioritasData();
      delete prios[name];
      this.setPrioritasData(prios);
      return true;
    },
    addIncomeCategory(name) {
      const cats = this.getIncomeCategories();
      if (cats.includes(name)) return false;
      cats.push(name);
      this.setIncomeCategories(cats);
      return true;
    },
    removeIncomeCategory(name) {
      let cats = this.getIncomeCategories();
      if (cats.length <= 1) return false;
      cats = cats.filter(c => c !== name);
      this.setIncomeCategories(cats);
      return true;
    },

    // -- PIC & Prioritas (dynamic) --
    getPicData() {
      return loadData(STORAGE_KEYS.picData, () => ({...defaultPic}));
    },
    setPicData(obj) {
      return saveData(STORAGE_KEYS.picData, obj);
    },
    getPrioritasData() {
      return loadData(STORAGE_KEYS.prioritasData, () => ({...defaultPrioritas}));
    },
    setPrioritasData(obj) {
      return saveData(STORAGE_KEYS.prioritasData, obj);
    },
    getPIC(cat) {
      const pics = this.getPicData();
      return pics[cat] || 'Vina/Henry';
    },
    getPrioritas(cat) {
      const prios = this.getPrioritasData();
      return prios[cat] || 'Boleh';
    },

    // -- Funds (dynamic) --
    getFunds() { return loadData(STORAGE_KEYS.funds, () => JSON.parse(JSON.stringify(defaultFunds))); },
    setFunds(data) { return saveData(STORAGE_KEYS.funds, data); },
    addFund(id, name, desc, target) {
      const funds = this.getFunds();
      if (funds.some(f => f.id === id)) return false;
      funds.push({ id, name, desc: desc || '', balance: 0, startBalance: 0, target: target || '' });
      this.setFunds(funds);
      return true;
    },
    removeFund(id) {
      let funds = this.getFunds();
      if (funds.length <= 1) return false;
      funds = funds.filter(f => f.id !== id);
      this.setFunds(funds);
      return true;
    },

    // -- Transactions --
    getTransactions() { return loadData(STORAGE_KEYS.transactions, () => JSON.parse(JSON.stringify(sampleTransactions))); },
    setTransactions(data) { return saveData(STORAGE_KEYS.transactions, data); },

    // -- Budget --
    getBudgetIncome() {
      const saved = loadData(STORAGE_KEYS.budgetIncome, null);
      if (saved) return saved;
      const cats = this.getIncomeCategories();
      const def = {};
      cats.forEach(c => { def[c] = 0; });
      return def;
    },
    setBudgetIncome(data) { return saveData(STORAGE_KEYS.budgetIncome, data); },
    getBudgetExpense() {
      const saved = loadData(STORAGE_KEYS.budgetExpense, null);
      if (saved) return saved;
      const cats = this.getExpenseCategories();
      const def = {};
      cats.forEach(c => { def[c] = 0; });
      return def;
    },
    setBudgetExpense(data) { return saveData(STORAGE_KEYS.budgetExpense, data); },

    // Reset
    resetData() {
      Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    },

    // -- Helpers --
    formatRp,
    formatDateDisplay,
    getMonth,
    isCurrentMonth,
    defaultIncomeCategories,
    defaultExpenseCategories,

    // -- Transaction CRUD --
    addTransaction(trans) {
      const all = this.getTransactions();
      trans.id = generateId();
      while (all.some(t => t.id === trans.id)) {
        trans.id = generateId();
      }
      all.push(trans);
      this.setTransactions(all);
      this.updateFundsFromTransactions();
      return trans;
    },
    updateTransaction(id, updates) {
      const all = this.getTransactions();
      const idx = all.findIndex(t => t.id === id);
      if (idx === -1) return false;
      all[idx] = { ...all[idx], ...updates };
      this.setTransactions(all);
      this.updateFundsFromTransactions();
      return true;
    },
    deleteTransaction(id) {
      let all = this.getTransactions();
      all = all.filter(t => t.id !== id);
      this.setTransactions(all);
      this.updateFundsFromTransactions();
      return true;
    },

    // -- Fund recalculation --
    updateFundsFromTransactions() {
      const all = this.getTransactions();
      const funds = this.getFunds();
      funds.forEach(f => { f.balance = 0; });
      all.forEach(t => {
        const nominal = parseFloat(t.nominal) || 0;
        if (t.jenis === 'Masuk') {
          const f = funds.find(x => x.id === t.posAsal);
          if (f) f.balance += nominal;
        } else if (t.jenis === 'Keluar') {
          const f = funds.find(x => x.id === t.posAsal);
          if (f) f.balance -= nominal;
        } else if (t.jenis === 'Pindah') {
          const from = funds.find(x => x.id === t.posAsal);
          const to = funds.find(x => x.id === t.posTujuan);
          if (from) from.balance -= nominal;
          if (to) to.balance += nominal;
        }
      });
      this.setFunds(funds);
      return funds;
    },

    // -- Aggregations --
    getCurrentMonthTotals() {
      const all = this.getTransactions();
      const income = all.filter(t => t.jenis === 'Masuk');
      const expense = all.filter(t => t.jenis === 'Keluar');
      const transfer = all.filter(t => t.jenis === 'Pindah');
      const totalIncome = income.reduce((s, t) => s + (parseFloat(t.nominal) || 0), 0);
      const totalExpense = expense.reduce((s, t) => s + (parseFloat(t.nominal) || 0), 0);
      const totalTransfer = transfer.reduce((s, t) => s + (parseFloat(t.nominal) || 0), 0);
      return { totalIncome, totalExpense, totalTransfer, sisa: totalIncome - totalExpense };
    },
    getExpenseByCategory() {
      const all = this.getTransactions();
      const result = {};
      all.filter(t => t.jenis === 'Keluar').forEach(t => {
        const cat = t.kategori;
        result[cat] = (result[cat] || 0) + (parseFloat(t.nominal) || 0);
      });
      return result;
    },
    getIncomeByCategory() {
      const all = this.getTransactions();
      const result = {};
      all.filter(t => t.jenis === 'Masuk').forEach(t => {
        const cat = t.kategori;
        result[cat] = (result[cat] || 0) + (parseFloat(t.nominal) || 0);
      });
      return result;
    }
  };
})();
