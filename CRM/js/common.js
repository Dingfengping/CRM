// ==================== 全局状态管理 ====================
const CUSTOMER_DATA = [
  { id: 'BH20240101001', name: '陈霞', gender: '女', age: 32, phone: '159****6376', level: '优选五星会员', levelTag: 'tag-blue', tenant: '好享购物外呼', hasWechat: true, regDate: '2024-01-15', product: '金典有机纯牛奶 250ml*12盒', price: '¥299.00', source: '线上注册', follower: '张经理', lastContact: '2024-03-15 14:30' },
  { id: 'BH20240101002', name: '张伟英', gender: '女', age: 45, phone: '136****2849', level: '优选SVIP会员', levelTag: 'tag-gold', tenant: '贵州民族酒业', hasWechat: true, regDate: '2024-01-18', product: '茅台53度飞天 500ml', price: '¥1,499.00', source: '外呼导入', follower: '李组长', lastContact: '2024-03-14 10:15' },
  { id: 'BH20240101003', name: '李明', gender: '男', age: 28, phone: '185****9012', level: '优选六星会员', levelTag: 'tag-purple', tenant: '高德博思', hasWechat: false, regDate: '2024-02-01', product: '华为Mate 60 Pro', price: '¥6,999.00', source: '线上注册', follower: '王销售', lastContact: '2024-03-13 16:45' },
  { id: 'BH20240101004', name: '王芳', gender: '女', age: 38, phone: '177****3456', level: '优选七星会员', levelTag: 'tag-red', tenant: '好享购物外呼', hasWechat: true, regDate: '2024-02-05', product: 'SK-II神仙水 230ml', price: '¥1,370.00', source: '转介绍', follower: '张经理', lastContact: '2024-03-12 09:20' },
  { id: 'BH20240101005', name: '赵强', gender: '男', age: 52, phone: '139****7890', level: '纯注册类会员', levelTag: 'tag-gray', tenant: '家有', hasWechat: false, regDate: '2024-02-10', product: '-', price: '-', source: '门店录入', follower: '-', lastContact: '-' },
  { id: 'BH20240101006', name: '刘丽华', gender: '女', age: 41, phone: '152****1122', level: '优选四星会员', levelTag: 'tag-default', tenant: '贵州民族酒业', hasWechat: true, regDate: '2024-02-15', product: '燕窝礼盒装', price: '¥588.00', source: '线上注册', follower: '李组长', lastContact: '2024-03-11 11:30' },
  { id: 'BH20240101007', name: '孙文斌', gender: '男', age: 35, phone: '186****3344', level: '优选三星会员', levelTag: 'tag-default', tenant: '高德博思', hasWechat: false, regDate: '2024-02-20', product: '戴森吸尘器 V15', price: '¥3,990.00', source: '外呼导入', follower: '王销售', lastContact: '2024-03-10 15:00' },
  { id: 'BH20240101008', name: '周敏', gender: '女', age: 29, phone: '158****5566', level: '优选五星会员', levelTag: 'tag-blue', tenant: '好享购物外呼', hasWechat: true, regDate: '2024-03-01', product: '兰蔻小黑瓶 50ml', price: '¥760.00', source: '门店录入', follower: '张经理', lastContact: '2024-03-09 08:45' },
  { id: 'BH20240101009', name: '吴建国', gender: '男', age: 48, phone: '131****7788', level: '优选二星会员', levelTag: 'tag-default', tenant: '家有', hasWechat: false, regDate: '2024-03-05', product: '五粮液 52度 500ml', price: '¥1,280.00', source: '转介绍', follower: '-', lastContact: '-' },
  { id: 'BH20240101010', name: '郑小雪', gender: '女', age: 26, phone: '189****9900', level: '优选一星会员', levelTag: 'tag-default', tenant: '贵州民族酒业', hasWechat: true, regDate: '2024-03-10', product: '周大福金项链', price: '¥2,399.00', source: '线上注册', follower: '李组长', lastContact: '2024-03-08 17:20' }
];

let selectedRows = new Set();
let currentFilterTab = 'all';

// ==================== 登录 ====================
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorEl = document.getElementById('loginError');
  if (!username || !password) {
    errorEl.textContent = '请输入用户名和密码';
    return;
  }
  if (username !== 'admin' || password !== 'admin123') {
    errorEl.textContent = '用户名或密码错误，请重试';
    return;
  }
  window.location.href = 'pages/sea-pool.html';
}

// ==================== Toast 提示 ====================
function showToast(msg, type) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = msg;
  container.appendChild(toast);
  requestAnimationFrame(function() {
    toast.classList.add('show');
  });
  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { toast.remove(); }, 300);
  }, type === 'error' ? 5000 : 3000);
}

// ==================== 弹窗管理 ====================
function openModal(html) {
  const container = document.getElementById('modalContainer');
  container.innerHTML = html;
  const overlay = container.querySelector('.modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  }
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

function closeModal() {
  document.getElementById('modalContainer').innerHTML = '';
}

// ==================== 弹窗模板 ====================
function openCreateCustomerModal() {
  const html = [
    '<div class="modal-overlay">',
      '<div class="modal modal-lg">',
        '<div class="modal-header">',
          '<h3>新建客户</h3>',
          '<button class="modal-close" onclick="closeModal()">✕</button>',
        '</div>',
        '<div class="modal-body">',
          '<div class="form-section-title">基础信息</div>',
          '<div class="form-row">',
            '<div class="form-group">',
              '<label><span class="required">*</span>姓名</label>',
              '<input type="text" placeholder="请输入姓名" maxlength="20">',
            '</div>',
            '<div class="form-group">',
              '<label><span class="required">*</span>手机号</label>',
              '<input type="text" placeholder="请输入11位手机号" maxlength="11">',
            '</div>',
          '</div>',
          '<div class="form-row">',
            '<div class="form-group">',
              '<label>性别</label>',
              '<div class="radio-group">',
                '<label><input type="radio" name="ngender" checked> 男</label>',
                '<label><input type="radio" name="ngender"> 女</label>',
              '</div>',
            '</div>',
            '<div class="form-group">',
              '<label>年龄</label>',
              '<input type="number" placeholder="0-150" min="0" max="150">',
            '</div>',
          '</div>',
          '<div class="form-group"><label>备注</label><textarea placeholder="最多500字" style="height:80px;"></textarea></div>',
        '</div>',
        '<div class="modal-footer">',
          '<button class="btn btn-secondary" onclick="closeModal()">取消</button>',
          '<button class="btn btn-primary" onclick="closeModal();showToast(\'客户创建成功\',\'success\')">确定</button>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');
  openModal(html);
}

function openAssignModal(id) {
  const count = selectedRows.size;
  const info = id ? ('客户编号 ' + id) : (count + ' 位客户');
  const html = [
    '<div class="modal-overlay">',
      '<div class="modal modal-sm">',
        '<div class="modal-header">',
          '<h3>分配客户</h3>',
          '<button class="modal-close" onclick="closeModal()">✕</button>',
        '</div>',
        '<div class="modal-body">',
          '<div class="form-group">',
            '<label>已选客户</label>',
            '<div style="height:32px;line-height:32px;font-size:14px;color:#1D2129;">' + info + '</div>',
          '</div>',
          '<div class="form-group">',
            '<label><span class="required">*</span>分配给</label>',
            '<select style="width:100%;"><option>请选择人员</option><option>张经理</option><option>李组长</option><option>王销售</option></select>',
          '</div>',
        '</div>',
        '<div class="modal-footer">',
          '<button class="btn btn-secondary" onclick="closeModal()">取消</button>',
          '<button class="btn btn-primary" onclick="closeModal();showToast(\'分配成功\',\'success\')">确定分配</button>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');
  openModal(html);
}

function openImportModal() {
  const html = [
    '<div class="modal-overlay">',
      '<div class="modal modal-md">',
        '<div class="modal-header">',
          '<h3>导入客户</h3>',
          '<button class="modal-close" onclick="closeModal()">✕</button>',
        '</div>',
        '<div class="modal-body">',
          '<div class="import-steps">',
            '<div class="import-step active"><span class="step-num">1</span><span class="step-label">上传文件</span></div>',
            '<span class="import-arrow">→</span>',
            '<div class="import-step"><span class="step-num">2</span><span class="step-label">数据预览</span></div>',
            '<span class="import-arrow">→</span>',
            '<div class="import-step"><span class="step-num">3</span><span class="step-label">导入结果</span></div>',
          '</div>',
          '<div class="upload-zone" onclick="showToast(\'请选择文件\',\'info\')">',
            '<div class="upload-icon">📁</div>',
            '<div>点击或拖拽文件到此区域上传</div>',
            '<div style="font-size:12px;">支持 .xlsx, .xls, .csv 格式</div>',
          '</div>',
        '</div>',
        '<div class="modal-footer">',
          '<button class="btn btn-secondary" onclick="closeModal()">取消</button>',
          '<button class="btn btn-primary" onclick="closeModal();showToast(\'文件上传成功\',\'success\')">下一步</button>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');
  openModal(html);
}

function openDeleteModal(id) {
  const html = [
    '<div class="modal-overlay">',
      '<div class="modal modal-xs">',
        '<div class="modal-header">',
          '<h3>确认删除</h3>',
          '<button class="modal-close" onclick="closeModal()">✕</button>',
        '</div>',
        '<div class="modal-body" style="text-align:center;padding:32px 24px;">',
          '<div style="font-size:48px;margin-bottom:16px;">⚠️</div>',
          '<p style="font-size:14px;color:#1D2129;line-height:1.6;">确定删除该客户吗？<br>删除后数据将无法恢复。</p>',
        '</div>',
        '<div class="modal-footer" style="justify-content:center;">',
          '<button class="btn btn-secondary" onclick="closeModal()">取消</button>',
          '<button class="btn btn-danger" onclick="closeModal();clearSelection();showToast(\'删除成功\',\'success\')">确定删除</button>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');
  openModal(html);
}

// ==================== 抽屉 ====================
function openCustomerDetail(id) {
  const cust = CUSTOMER_DATA.find(function(c) { return c.id === id; });
  if (!cust) return;
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';
  overlay.onclick = function(e) {
    if (e.target === this) closeDrawer();
  };
  const drawer = document.createElement('div');
  drawer.className = 'drawer';
  drawer.innerHTML = [
    '<div class="drawer-header">',
      '<div class="drawer-avatar">' + cust.name.charAt(0) + '</div>',
      '<div class="drawer-info">',
        '<h3>' + cust.name + '</h3>',
        '<div class="drawer-id">' + cust.id + '</div>',
      '</div>',
      '<button class="modal-close" style="margin-left:auto;" onclick="closeDrawer()">✕</button>',
    '</div>',
    '<div class="drawer-body">',
      '<div class="info-section">',
        '<h4>基础信息</h4>',
        '<div class="info-row"><span class="info-label">手机号</span><span class="info-value">' + cust.phone + '</span></div>',
        '<div class="info-row"><span class="info-label">会员等级</span><span class="info-value"><span class="tag ' + cust.levelTag + '">' + cust.level + '</span></span></div>',
        '<div class="info-row"><span class="info-label">所属租户</span><span class="info-value">' + cust.tenant + '</span></div>',
        '<div class="info-row"><span class="info-label">注册日期</span><span class="info-value">' + cust.regDate + '</span></div>',
        '<div class="info-row"><span class="info-label">客户来源</span><span class="info-value">' + cust.source + '</span></div>',
      '</div>',
    '</div>'
  ].join('');
  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
}

function closeDrawer() {
  document.querySelectorAll('.drawer-overlay, .drawer').forEach(function(el) {
    el.remove();
  });
}

// ==================== 表格交互 ====================
function toggleSelectAll(el) {
  const rows = document.querySelectorAll('#seaTableBody tr');
  if (el.checked) {
    rows.forEach(function(tr) {
      tr.classList.add('selected');
      const cb = tr.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = true;
      const rid = tr.getAttribute('data-id');
      if (rid) selectedRows.add(rid);
    });
  } else {
    rows.forEach(function(tr) {
      tr.classList.remove('selected');
      const cb = tr.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = false;
    });
    selectedRows.clear();
  }
  updateBatchBar();
}

function toggleRowSelect(id, el) {
  if (el.checked) selectedRows.add(id);
  else selectedRows.delete(id);
  const tr = el.closest('tr');
  if (tr) tr.classList.toggle('selected', el.checked);
  updateBatchBar();
}

function selectAllRows() {
  const rows = document.querySelectorAll('#seaTableBody tr');
  rows.forEach(function(tr) {
    tr.classList.add('selected');
    const cb = tr.querySelector('input[type="checkbox"]');
    if (cb) cb.checked = true;
    const rid = tr.getAttribute('data-id');
    if (rid) selectedRows.add(rid);
  });
  const allCb = document.getElementById('selectAllCheckbox');
  if (allCb) allCb.checked = true;
  updateBatchBar();
}

function clearSelection() {
  selectedRows.clear();
  document.querySelectorAll('#seaTableBody tr').forEach(function(tr) {
    tr.classList.remove('selected');
    const cb = tr.querySelector('input[type="checkbox"]');
    if (cb) cb.checked = false;
  });
  const allCb = document.getElementById('selectAllCheckbox');
  if (allCb) allCb.checked = false;
  updateBatchBar();
}

function updateBatchBar() {
  const bar = document.getElementById('batchBar');
  const count = document.getElementById('batchCount');
  if (bar) {
    if (selectedRows.size > 0) {
      bar.classList.remove('hidden');
      count.textContent = selectedRows.size;
    } else {
      bar.classList.add('hidden');
    }
  }
}

function switchSubTab(tab, el) {
  document.querySelectorAll('.sub-tab').forEach(function(t) {
    t.classList.remove('active');
  });
  el.classList.add('active');
  showToast('已切换视图', 'info');
}

function selectRange(el) {
  el.parentElement.querySelectorAll('.range-option').forEach(function(o) {
    o.classList.remove('active');
  });
  el.classList.add('active');
}

// ==================== 工具 ====================
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      showToast('已复制: ' + text, 'success');
    }).catch(function() {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('已复制: ' + text, 'success');
}

function dialNumber(num) {
  const display = document.getElementById('dialDisplay');
  if (display) {
    if (display.textContent === '13800138000') {
      display.textContent = num;
    } else {
      display.textContent += num;
    }
  }
}
