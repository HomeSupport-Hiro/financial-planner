/* ============================================
   Our Financial Planner - App Controller
   ============================================ */

(function() {
  'use strict';

  // ===== DOM REFS =====
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const Dom = {
    splash: '#splash-screen',
    app: '#app',
    sidebar: '#sidebar',
    overlay: '#overlay',
    menuBtn: '#menuBtn',
    sidebarClose: '#sidebarClose',
    navLinks: '.sidebar-menu a',
    bottomNav: '#bottomNav',
    bottomLinks: '#bottomNav a',
    pages: '.page',
    refreshBtn: '#refreshBtn',

    // Dashboard
    totalKas: '#totalKas',
    totalIncome: '#totalIncome',
    totalExpense: '#totalExpense',
    totalSisa: '#totalSisa',
    fundsGrid: '#fundsGrid',
    dashboardBudgetBody: '#dashboardBudgetBody',

    // Transactions
    transBody: '#transBody',
    transSearch: '#transSearch',
    transFilterJenis: '#transFilterJenis',
    transFilterKategori: '#transFilterKategori',
    transFooter: '#transFooter',
    addTransBtn: '#addTransBtn',

    // Budget
    budgetIncomeBody: '#budgetIncomeBody',
    budgetExpenseBody: '#budgetExpenseBody',

    // Report
    reportSummary: '#reportSummary',
    reportOverBudgetBody: '#reportOverBudgetBody',

    // Funds
    fundsBody: '#fundsBody',

    // Guide
    guideFormat: '#guideFormat',
    guideIncomeKategori: '#guideIncomeKategori',
    guideExpenseKategori: '#guideExpenseKategori',

    // Modal transaksi
    transModal: '#transModal',
    modalTitle: '#modalTitle',
    modalClose: '#modalClose',
    modalCancel: '#modalCancel',
    modalSave: '#modalSave',
    formTanggal: '#formTanggal',
    formJenis: '#formJenis',
    formKategori: '#formKategori',
    formKeterangan: '#formKeterangan',
    formNominal: '#formNominal',
    formPosAsal: '#formPosAsal',
    formPosTujuan: '#formPosTujuan',
    formPosTujuanGroup: '#formPosTujuanGroup',
    formInput: '#formInput',
    formOleh: '#formOleh',

    // Modal kategori
    catModal: '#catModal',
    catModalTitle: '#catModalTitle',
    catModalClose: '#catModalClose',
    catModalCancel: '#catModalCancel',
    catModalSave: '#catModalSave',
    catType: '#catType',
    catName: '#catName',
    catPic: '#catPic',
    catPicGroup: '#catPicGroup',
    catPrio: '#catPrio',
    catPrioGroup: '#catPrioGroup',

    // Modal pos uang
    fundModal: '#fundModal',
    fundModalTitle: '#fundModalTitle',
    fundModalClose: '#fundModalClose',
    fundModalCancel: '#fundModalCancel',
    fundModalSave: '#fundModalSave',
    fundId: '#fundId',
    fundName: '#fundName',
    fundDesc: '#fundDesc',
    fundTarget: '#fundTarget',

    // Buttons for add
    addCatBtn: '#addCatBtn',
    addFundBtn: '#addFundBtn',
  };

  // ===== STATE =====
  let state = {
    currentPage: 'dashboard',
    editId: null,
    filteredTransactions: []
  };

  // ===== INIT =====
  function init() {
    setTimeout(() => {
      $(Dom.splash).classList.add('hidden');
      $(Dom.app).classList.add('visible');
    }, 800);

    setupNavigation();
    setupEventListeners();
    setupForm();
    renderAll();
    registerSW();
  }

  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(() => {})
        .catch(() => {});
    }
  }

  // ===== NAVIGATION =====
  function setupNavigation() {
    $(Dom.navLinks).forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
        closeSidebar();
      });
    });
    $(Dom.bottomLinks).forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
      });
    });
  }

  function navigateTo(page) {
    state.currentPage = page;
    $(Dom.pages).forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`page-${page}`);
    if (target) target.classList.add('active');

    $(Dom.navLinks).forEach(l => {
      l.classList.toggle('active', l.dataset.page === page);
    });
    $(Dom.bottomLinks).forEach(l => {
      l.classList.toggle('active', l.dataset.page === page);
    });
  }

  function openSidebar() {
    $(Dom.sidebar).classList.add('open');
    $(Dom.overlay).classList.add('open');
  }

  function closeSidebar() {
    $(Dom.sidebar).classList.remove('open');
    $(Dom.overlay).classList.remove('open');
  }

  // ===== EVENT LISTENERS =====
  function setupEventListeners() {
    $(Dom.menuBtn).addEventListener('click', openSidebar);
    $(Dom.sidebarClose).addEventListener('click', closeSidebar);
    $(Dom.overlay).addEventListener('click', closeSidebar);

    $(Dom.refreshBtn).addEventListener('click', () => {
      renderAll();
      $(Dom.refreshBtn).classList.add('fa-spin');
      setTimeout(() => $(Dom.refreshBtn).classList.remove('fa-spin'), 600);
    });

    $(Dom.transSearch).addEventListener('input', renderTransactions);
    $(Dom.transFilterJenis).addEventListener('change', renderTransactions);
    $(Dom.transFilterKategori).addEventListener('change', renderTransactions);

    $(Dom.addTransBtn).addEventListener('click', () => openModal());

    $(Dom.modalClose).addEventListener('click', closeModal);
    $(Dom.modalCancel).addEventListener('click', closeModal);
    $(Dom.modalSave).addEventListener('click', saveTransaction);

    $(Dom.formJenis).addEventListener('change', () => {
      const jenis = $(Dom.formJenis).value;
      $(Dom.formPosTujuanGroup).style.display = jenis === 'Pindah' ? 'block' : 'none';
      updateKategoriOptions();
    });

    // Add category button
    $(Dom.addCatBtn).addEventListener('click', () => openCatModal());
    $(Dom.catModalClose).addEventListener('click', closeCatModal);
    $(Dom.catModalCancel).addEventListener('click', closeCatModal);
    $(Dom.catModalSave).addEventListener('click', saveCategory);

    // Category type toggle
    $(Dom.catType).addEventListener('change', toggleCatType);

    // Add fund button
    $(Dom.addFundBtn).addEventListener('click', () => openFundModal());
    $(Dom.fundModalClose).addEventListener('click', closeFundModal);
    $(Dom.fundModalCancel).addEventListener('click', closeFundModal);
    $(Dom.fundModalSave).addEventListener('click', saveFund);
  }

  function toggleCatType() {
    const type = $(Dom.catType).value;
    const isExpense = type === 'expense';
    $(Dom.catPicGroup).style.display = isExpense ? 'block' : 'none';
    $(Dom.catPrioGroup).style.display = isExpense ? 'block' : 'none';
  }

  // ===== FORM SETUP =====
  function setupForm() {
    const today = new Date().toISOString().split('T')[0];
    $(Dom.formTanggal).value = today;
    updateKategoriOptions();
    refreshFormPosOptions();

    // Populate kategori filter
    const filter = $(Dom.transFilterKategori);
    filter.innerHTML = '<option value="">Semua Kategori</option>';
    AppData.getExpenseCategories().forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      filter.appendChild(opt);
    });
  }

  function updateKategoriOptions() {
    const jenis = $(Dom.formJenis).value;
    const sel = $(Dom.formKategori);
    sel.innerHTML = '';
    let cats = [];
    if (jenis === 'Masuk') cats = AppData.getIncomeCategories();
    else if (jenis === 'Keluar') cats = AppData.getExpenseCategories();
    else cats = ['Transfer Dana', 'Nabung', 'Pindah Dana'];
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c || '(pilih)';
      sel.appendChild(opt);
    });
    if (jenis !== 'Pindah') {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = '— Lainnya —';
      sel.appendChild(opt);
    }
  }

  function refreshFormPosOptions() {
    const funds = AppData.getFunds();
    [Dom.formPosAsal, Dom.formPosTujuan].forEach(selId => {
      const el = $(selId);
      if (!el) return;
      el.innerHTML = '';
      funds.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.id;
        opt.textContent = f.id;
        el.appendChild(opt);
      });
    });
  }

  // ===== TRANSACTION MODAL =====
  function openModal(trans) {
    const isEditing = !!trans;
    $(Dom.modalTitle).textContent = isEditing ? 'Edit Transaksi' : 'Tambah Transaksi';

    if (isEditing) {
      state.editId = trans.id;
      $(Dom.formTanggal).value = trans.tanggal;
      $(Dom.formJenis).value = trans.jenis;
      $(Dom.formKeterangan).value = trans.keterangan;
      $(Dom.formNominal).value = trans.nominal;
      $(Dom.formPosAsal).value = trans.posAsal;
      $(Dom.formPosTujuan).value = trans.posTujuan || AppData.getFunds()[1]?.id || '';
      $(Dom.formInput).value = trans.input;
      $(Dom.formOleh).value = trans.oleh;
      updateKategoriOptions();
      $(Dom.formKategori).value = trans.kategori || '';
      $(Dom.formPosTujuanGroup).style.display = trans.jenis === 'Pindah' ? 'block' : 'none';
    } else {
      state.editId = null;
      $(Dom.formTanggal).value = new Date().toISOString().split('T')[0];
      $(Dom.formJenis).value = 'Keluar';
      $(Dom.formKeterangan).value = '';
      $(Dom.formNominal).value = '';
      $(Dom.formPosAsal).value = 'Blu';
      $(Dom.formPosTujuan).value = 'Comfort Life';
      $(Dom.formInput).value = 'Manual';
      $(Dom.formOleh).value = 'Vina';
      updateKategoriOptions();
      $(Dom.formPosTujuanGroup).style.display = 'none';
    }
    $(Dom.transModal).classList.add('open');
  }

  function closeModal() {
    $(Dom.transModal).classList.remove('open');
    state.editId = null;
  }

  function saveTransaction() {
    const tanggal = $(Dom.formTanggal).value;
    const jenis = $(Dom.formJenis).value;
    const kategori = $(Dom.formKategori).value;
    const keterangan = $(Dom.formKeterangan).value.trim();
    const nominal = parseFloat($(Dom.formNominal).value) || 0;
    const posAsal = $(Dom.formPosAsal).value;
    const posTujuan = $(Dom.formPosTujuan).value;
    const input = $(Dom.formInput).value;
    const oleh = $(Dom.formOleh).value;

    if (!tanggal) { alert('Tanggal harus diisi!'); return; }
    if (nominal <= 0) { alert('Nominal harus lebih dari 0!'); return; }

    const transData = { tanggal, jenis, kategori, keterangan, nominal, posAsal, posTujuan, input, oleh };

    if (state.editId) {
      AppData.updateTransaction(state.editId, transData);
    } else {
      AppData.addTransaction(transData);
    }

    closeModal();
    renderAll();
  }

  // ===== CATEGORY MODAL =====
  function openCatModal() {
    $(Dom.catModalTitle).textContent = 'Tambah Kategori Baru';
    $(Dom.catType).value = 'expense';
    $(Dom.catName).value = '';
    $(Dom.catPic).value = 'Vina/Henry';
    $(Dom.catPrio).value = 'Boleh';
    toggleCatType();
    $(Dom.catModal).classList.add('open');
  }

  function closeCatModal() {
    $(Dom.catModal).classList.remove('open');
  }

  function saveCategory() {
    const type = $(Dom.catType).value;
    const name = $(Dom.catName).value.trim();
    if (!name) { alert('Nama kategori harus diisi!'); return; }

    if (type === 'income') {
      if (AppData.getIncomeCategories().includes(name)) {
        alert('Kategori sudah ada!');
        return;
      }
      AppData.addIncomeCategory(name);
    } else {
      if (AppData.getExpenseCategories().includes(name)) {
        alert('Kategori sudah ada!');
        return;
      }
      const pic = $(Dom.catPic).value;
      const prio = $(Dom.catPrio).value;
      AppData.addExpenseCategory(name, pic, prio);
    }

    closeCatModal();
    setupForm();
    renderAll();
    alert('Kategori "' + name + '" berhasil ditambahkan!');
  }

  // ===== FUND MODAL =====
  function openFundModal() {
    $(Dom.fundModalTitle).textContent = 'Tambah Pos Uang Baru';
    $(Dom.fundId).value = '';
    $(Dom.fundName).value = '';
    $(Dom.fundDesc).value = '';
    $(Dom.fundTarget).value = '';
    $(Dom.fundModal).classList.add('open');
  }

  function closeFundModal() {
    $(Dom.fundModal).classList.remove('open');
  }

  function saveFund() {
    const id = $(Dom.fundId).value.trim();
    const name = $(Dom.fundName).value.trim() || id;
    const desc = $(Dom.fundDesc).value.trim();
    const target = $(Dom.fundTarget).value.trim();

    if (!id) { alert('Nama pos uang harus diisi!'); return; }

    if (AppData.getFunds().some(f => f.id === id)) {
      alert('Pos uang "' + id + '" sudah ada!');
      return;
    }

    AppData.addFund(id, name, desc, target);
    closeFundModal();
    refreshFormPosOptions();
    renderAll();
    alert('Pos uang "' + id + '" berhasil ditambahkan!');
  }

  // ===== RENDER =====
  function renderAll() {
    AppData.updateFundsFromTransactions();
    renderDashboard();
    renderTransactions();
    renderBudget();
    renderReport();
    renderFunds();
    renderGuide();
  }

  // --- DASHBOARD ---
  function renderDashboard() {
    const funds = AppData.getFunds();
    const totals = AppData.getCurrentMonthTotals();
    const totalKas = funds.reduce((s, f) => s + f.balance, 0);

    $(Dom.totalKas).textContent = AppData.formatRp(totalKas);
    $(Dom.totalIncome).textContent = AppData.formatRp(totals.totalIncome);
    $(Dom.totalExpense).textContent = AppData.formatRp(totals.totalExpense);
    $(Dom.totalSisa).textContent = AppData.formatRp(totals.sisa);

    const grid = $(Dom.fundsGrid);
    grid.innerHTML = '';
    funds.forEach(f => {
      const item = document.createElement('div');
      item.className = 'fund-item';
      item.innerHTML = `
        <div class="fund-name">${f.name}</div>
        <div class="fund-desc">${f.desc}</div>
        <div class="fund-balance">${AppData.formatRp(f.balance)}</div>
      `;
      grid.appendChild(item);
    });

    const body = $(Dom.dashboardBudgetBody);
    body.innerHTML = '';
    const expenseByCat = AppData.getExpenseByCategory();
    const budgetExpense = AppData.getBudgetExpense();

    AppData.getExpenseCategories().forEach(cat => {
      const budget = budgetExpense[cat] || 0;
      const real = expenseByCat[cat] || 0;
      const sisa = budget - real;
      let status = sisa < 0 ? 'OVER' : 'OK';
      let cls = sisa < 0 ? 'status-over' : 'status-aman';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cat}</td>
        <td>${AppData.formatRp(budget)}</td>
        <td>${AppData.formatRp(real)}</td>
        <td>${AppData.formatRp(Math.abs(sisa))} ${sisa < 0 ? '(lebih)' : ''}</td>
        <td class="${cls}">${status}</td>
      `;
      body.appendChild(tr);
    });
  }

  // --- TRANSACTIONS ---
  function renderTransactions() {
    const all = AppData.getTransactions();
    const search = ($(Dom.transSearch).value || '').toLowerCase();
    const filterJenis = $(Dom.transFilterJenis).value;
    const filterKategori = $(Dom.transFilterKategori).value;

    let filtered = all.filter(t => {
      if (search) {
        const match = t.keterangan?.toLowerCase().includes(search) ||
                      t.kategori?.toLowerCase().includes(search) ||
                      t.nominal.toString().includes(search) ||
                      t.posAsal?.toLowerCase().includes(search);
        if (!match) return false;
      }
      if (filterJenis && t.jenis !== filterJenis) return false;
      if (filterKategori && t.kategori !== filterKategori) return false;
      return true;
    });

    filtered.sort((a, b) => b.tanggal.localeCompare(a.tanggal) || b.id - a.id);
    state.filteredTransactions = filtered;

    const body = $(Dom.transBody);
    body.innerHTML = '';

    if (filtered.length === 0) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td colspan="7" class="text-center text-muted" style="padding:30px;">Belum ada transaksi. Klik + untuk menambah.</td>`;
      body.appendChild(tr);
      $(Dom.transFooter).textContent = 'Tidak ada transaksi';
      return;
    }

    filtered.forEach(t => {
      const nominal = parseFloat(t.nominal) || 0;
      const posDisplay = t.jenis === 'Pindah' ? `${t.posAsal} → ${t.posTujuan}` : t.posAsal;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${t.id}</strong></td>
        <td>${AppData.formatDateDisplay(t.tanggal)}</td>
        <td><span class="jenis-badge jenis-${t.jenis.toLowerCase()}">${t.jenis}</span></td>
        <td>${t.kategori || '-'}</td>
        <td>${t.keterangan || '-'}</td>
        <td class="text-right" style="font-weight:600;white-space:nowrap">${AppData.formatRp(nominal)}</td>
        <td>${posDisplay}</td>
      `;
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', () => openModal(t));
      body.appendChild(tr);
    });

    $(Dom.transFooter).textContent = `Menampilkan ${filtered.length} dari ${all.length} transaksi`;
  }

  // --- BUDGET (editable!) ---
  function renderBudget() {
    const budgetIncome = AppData.getBudgetIncome();
    const budgetExpense = AppData.getBudgetExpense();

    // Income budget table
    const incomeBody = $(Dom.budgetIncomeBody);
    incomeBody.innerHTML = '';
    const incomeByCat = AppData.getIncomeByCategory();
    let totalTarget = 0, totalActual = 0;

    AppData.getIncomeCategories().forEach(cat => {
      const target = budgetIncome[cat] || 0;
      const actual = incomeByCat[cat] || 0;
      totalTarget += target;
      totalActual += actual;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cat}</td>
        <td class="editable-cell" contenteditable="true" data-type="income" data-cat="${cat}">${target.toLocaleString('id-ID', {minimumFractionDigits:2})}</td>
        <td>${AppData.formatRp(actual)}</td>
        <td>${AppData.formatRp(target - actual)}</td>
        <td>${target > 0 ? Math.round((actual/target)*100) + '%' : '-'}</td>
      `;
      incomeBody.appendChild(tr);
    });

    const trTotal = document.createElement('tr');
    trTotal.style.fontWeight = '700';
    trTotal.style.background = 'var(--bg-elevated)';
    trTotal.innerHTML = `
      <td>TOTAL</td>
      <td>${AppData.formatRp(totalTarget)}</td>
      <td>${AppData.formatRp(totalActual)}</td>
      <td>${AppData.formatRp(totalTarget - totalActual)}</td>
      <td>${totalTarget > 0 ? Math.round((totalActual/totalTarget)*100) + '%' : '-'}</td>
    `;
    incomeBody.appendChild(trTotal);

    // Expense budget table
    const expenseBody = $(Dom.budgetExpenseBody);
    expenseBody.innerHTML = '';

    AppData.getExpenseCategories().forEach(cat => {
      const budget = budgetExpense[cat] || 0;
      const pic = AppData.getPIC(cat);
      const prio = AppData.getPrioritas(cat);

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cat}</td>
        <td class="editable-cell" contenteditable="true" data-type="expense" data-cat="${cat}">${budget.toLocaleString('id-ID', {minimumFractionDigits:2})}</td>
        <td>${pic}</td>
        <td><span class="prio-${prio === 'Wajib' ? 'wajib' : 'boleh'}">${prio}</span></td>
      `;
      expenseBody.appendChild(tr);
    });

    // Make budget cells editable
    $$('.editable-cell').forEach(cell => {
      cell.addEventListener('blur', onBudgetEdit);
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); cell.blur(); }
      });
    });
  }

  function onBudgetEdit(e) {
    const cell = e.target;
    const raw = cell.textContent.replace(/[^0-9,]/g, '').replace(',', '.');
    const val = parseFloat(raw) || 0;
    const type = cell.dataset.type;
    const cat = cell.dataset.cat;

    if (type === 'income') {
      const budget = AppData.getBudgetIncome();
      budget[cat] = val;
      AppData.setBudgetIncome(budget);
    } else {
      const budget = AppData.getBudgetExpense();
      budget[cat] = val;
      AppData.setBudgetExpense(budget);
    }

    // Re-render
    renderAll();
  }

  // --- REPORT ---
  function renderReport() {
    const totals = AppData.getCurrentMonthTotals();
    const expenseByCat = AppData.getExpenseByCategory();
    const budgetExpense = AppData.getBudgetExpense();

    $(Dom.reportSummary).innerHTML = `
      <div class="report-item rp-income">
        <div class="report-label">Total Pemasukan</div>
        <div class="report-value">${AppData.formatRp(totals.totalIncome)}</div>
      </div>
      <div class="report-item rp-expense">
        <div class="report-label">Total Pengeluaran</div>
        <div class="report-value">${AppData.formatRp(totals.totalExpense)}</div>
      </div>
      <div class="report-item rp-transfer">
        <div class="report-label">Total Pindah Pos</div>
        <div class="report-value">${AppData.formatRp(totals.totalTransfer)}</div>
      </div>
      <div class="report-item rp-sisa">
        <div class="report-label">Sisa / Nabung</div>
        <div class="report-value">${AppData.formatRp(totals.sisa)}</div>
      </div>
    `;

    const body = $(Dom.reportOverBudgetBody);
    body.innerHTML = '';

    AppData.getExpenseCategories().forEach(cat => {
      const budget = budgetExpense[cat] || 0;
      const real = expenseByCat[cat] || 0;
      const selisih = budget - real;
      const pct = budget > 0 ? Math.round((real / budget) * 100) : 0;
      let status, cls;

      if (budget === 0 && real > 0) {
        status = 'NO BUDGET';
        cls = 'status-over';
      } else if (real > budget) {
        status = 'OVER';
        cls = 'status-over';
      } else if (budget > 0) {
        status = 'OK';
        cls = 'status-aman';
      } else {
        status = '—';
        cls = '';
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${cat}</td>
        <td>${AppData.formatRp(budget)}</td>
        <td>${AppData.formatRp(real)}</td>
        <td>${AppData.formatRp(Math.abs(selisih))} ${selisih < 0 ? '(lebih)' : ''}</td>
        <td>${budget > 0 ? pct + '%' : '-'}</td>
        <td class="${cls}">${status}</td>
      `;
      body.appendChild(tr);
    });
  }

  // --- FUNDS ---
  function renderFunds() {
    const funds = AppData.getFunds();
    const body = $(Dom.fundsBody);
    body.innerHTML = '';

    funds.forEach(f => {
      const mutasi = f.balance - f.startBalance;
      const mutasiCls = mutasi >= 0 ? 'mutasi-plus' : 'mutasi-minus';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${f.name}</strong></td>
        <td class="text-right mono">${AppData.formatRp(f.balance)}</td>
        <td class="text-right mono">${AppData.formatRp(f.startBalance)}</td>
        <td class="text-right mono ${mutasiCls}">${mutasi >= 0 ? '+' : ''}${AppData.formatRp(mutasi)}</td>
        <td>${f.target || '-'}</td>
        <td class="text-muted">${f.desc}</td>
      `;
      body.appendChild(tr);
    });

    const totalBal = funds.reduce((s, f) => s + f.balance, 0);
    const totalStart = funds.reduce((s, f) => s + f.startBalance, 0);
    const totalMutasi = totalBal - totalStart;
    const tr = document.createElement('tr');
    tr.style.fontWeight = '700';
    tr.style.background = 'var(--bg-elevated)';
    tr.innerHTML = `
      <td>TOTAL KAS</td>
      <td class="text-right mono">${AppData.formatRp(totalBal)}</td>
      <td class="text-right mono">${AppData.formatRp(totalStart)}</td>
      <td class="text-right mono ${totalMutasi >= 0 ? 'mutasi-plus' : 'mutasi-minus'}">${totalMutasi >= 0 ? '+' : ''}${AppData.formatRp(totalMutasi)}</td>
      <td></td>
      <td></td>
    `;
    body.appendChild(tr);
  }

  // --- GUIDE ---
  function renderGuide() {
    const formatContainer = $(Dom.guideFormat);
    formatContainer.innerHTML = [
      { icon: '◇', title: 'Pemasukan',
        text: '<strong>tgl | masuk | kategori | keterangan | nominal | pos</strong>',
        ex: '25/6 | masuk | Paycheck | Gaji Juni | 5200000 | Blu' },
      { icon: '◇', title: 'Pengeluaran',
        text: '<strong>tgl | keluar | kategori | keterangan | nominal | pos</strong>',
        ex: '25/6 | keluar | Food | Makan siang | 35000 | Cash' },
      { icon: '◇', title: 'Pindah Pos',
        text: '<strong>tgl | pindah | - | keterangan | nominal | asal → tujuan</strong>',
        ex: '25/6 | pindah | - | Nabung darurat | 500000 | Blu → Comfort Life' },
      { icon: '◇', title: 'Tambah Kategori',
        text: 'Klik tombol <strong>+ Kategori</strong> di halaman Transaksi',
        ex: 'Langsung isi nama, PIC & prioritas' },
      { icon: '◇', title: 'Tambah Pos Uang',
        text: 'Klik tombol <strong>+ Pos Uang</strong> di halaman Pos Uang',
        ex: 'Isi nama & deskripsi' },
    ].map(item => `
      <div class="guide-item">
        <div class="guide-icon">${item.icon}</div>
        <div class="guide-text">
          <strong>${item.title}</strong><br>
          ${item.text}
          <span class="guide-example">${item.ex}</span>
        </div>
      </div>
    `).join('');

    // Income categories
    const incomeContainer = $(Dom.guideIncomeKategori);
    incomeContainer.innerHTML = AppData.getIncomeCategories().map(c => `
      <div class="kategori-item">
        <span class="kategori-nama">${c}</span>
      </div>
    `).join('');

    // Expense categories
    const expenseContainer = $(Dom.guideExpenseKategori);
    expenseContainer.innerHTML = AppData.getExpenseCategories().map(c => {
      const pic = AppData.getPIC(c);
      const prio = AppData.getPrioritas(c);
      return `<div class="kategori-item">
        <span class="kategori-nama">${c}</span>
        <span class="kategori-desc">PIC: ${pic} — ${prio}</span>
      </div>`;
    }).join('');
  }

  // ===== START =====
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
