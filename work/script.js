document.addEventListener('DOMContentLoaded', function() {
    // 初始化深色模式
    initThemeSwitch();
    
    // 初始化角色选择
    initRoleSelector();
    
    // 初始化模块导航
    initModuleNavigation();
    
    // 初始化事件上报表单
    initReportForm();
    
    // 初始化解决方案匹配功能
    initSolutionFinder();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化语音搜索
    initVoiceSearch();
    
    // 初始化新闻过滤
    initNewsFilter();
    
    // 初始化交流社区
    initCommunityTabs();
    
    // 初始化自我评估
    initAssessment();
    
    // 初始化视频按钮
    initVideoButton();
    
    // 初始化浮动求助按钮
    initHelpButton();
    
    // 初始化滑块
    initTestimonialSlider();
    
    // 初始化数字动画
    initStatisticsAnimation();
    
    // 初始化个性化推荐
    initPersonalizedRecommendations();
    
    // 初始化颜色主题选择
    initColorThemeSelector();
    
    // 初始化字体大小调整
    initFontSizeAdjuster();
    
    // 初始化通知系统
    initNotifications();
    
    // 显示欢迎引导
    showWelcomeTour();
});

// 深色模式切换
function initThemeSwitch() {
    const themeToggle = document.getElementById('checkbox');
    
    // 检查本地存储中的主题设置
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
        // 如果用户系统设置为深色模式且用户没有手动设置过主题，则自动使用深色模式
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
        localStorage.setItem('theme', 'dark');
    }
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            
            // 通知用户
            showToast('已切换至深色模式');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            
            // 通知用户
            showToast('已切换至浅色模式');
        }
    });
}

// 角色选择初始化
function initRoleSelector() {
    const roleButtons = document.querySelectorAll('.role-btn');
    const userWelcome = document.getElementById('userWelcome');
    const welcomeText = document.getElementById('welcomeText');
    const recommendedResources = document.getElementById('recommendedResources');
    const closeWelcome = document.querySelector('.close-welcome');
    
    // 角色对应的资源推荐
    const roleResources = {
        student: [
            { name: '校园暴力自我保护', target: '#self-protection' },
            { name: '如何寻求帮助', target: '#resources' },
            { name: '同伴支持', target: '#community' },
            { name: '应对网络暴力', target: '#violence-info' }
        ],
        teacher: [
            { name: '暴力行为识别指南', target: '#violence-info' },
            { name: '课堂干预策略', target: '#solutions' },
            { name: '教师法律责任', target: '#resources' },
            { name: '学生心理辅导', target: '#community' }
        ],
        parent: [
            { name: '与孩子沟通指南', target: '#resources' },
            { name: '识别孩子受欺凌信号', target: '#violence-info' },
            { name: '家校合作方案', target: '#solutions' },
            { name: '法律维权知识', target: '#resources' }
        ]
    };
    
    // 角色友好名称
    const roleFriendlyNames = {
        student: '同学',
        teacher: '老师',
        parent: '家长'
    };
    
    // 检查本地存储中的角色设置
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
        showRoleWelcome(savedRole);
        
        // 高亮选中的角色按钮
        roleButtons.forEach(btn => {
            if (btn.getAttribute('data-role') === savedRole) {
                btn.classList.add('active');
            }
        });
    }
    
    roleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const role = this.getAttribute('data-role');
            
            // 移除所有按钮的active类
            roleButtons.forEach(btn => btn.classList.remove('active'));
            
            // 给当前按钮添加active类
            this.classList.add('active');
            
            // 保存用户角色到本地存储
            localStorage.setItem('userRole', role);
            
            // 显示欢迎信息和推荐资源
            showRoleWelcome(role);
            
            // 更新个性化设置
            updatePersonalization(role);
            
            // 通知用户
            showToast(`已切换身份为：${roleFriendlyNames[role]}`);
        });
    });
    
    // 关闭欢迎信息
    if (closeWelcome) {
        closeWelcome.addEventListener('click', function() {
            userWelcome.classList.add('hidden');
        });
    }
    
    // 显示角色欢迎信息和推荐资源
    function showRoleWelcome(role) {
        welcomeText.textContent = `欢迎您，${roleFriendlyNames[role]}`;
        
        // 生成推荐资源
        let resourcesHTML = '';
        roleResources[role].forEach(resource => {
            resourcesHTML += `<a href="${resource.target}" class="resource-tag">${resource.name}</a>`;
        });
        
        recommendedResources.innerHTML = resourcesHTML;
        userWelcome.classList.remove('hidden');
        
        // 给资源标签添加点击事件
        document.querySelectorAll('.resource-tag').forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                // 隐藏所有内容区域
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.add('hidden');
                });
                
                // 显示目标内容区域
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.remove('hidden');
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // 根据角色更新个性化设置
    function updatePersonalization(role) {
        // 根据角色调整界面元素展示顺序和优先级
        const moduleCards = document.querySelectorAll('.module-card');
        const modulesGrid = document.querySelector('.modules-grid');
        
        if (modulesGrid && moduleCards.length > 0) {
            const roleModulePriority = {
                student: ['self-protection', 'violence-info', 'report-system', 'resources', 'community', 'solutions'],
                teacher: ['violence-info', 'solutions', 'resources', 'report-system', 'community', 'self-protection'],
                parent: ['violence-info', 'resources', 'report-system', 'solutions', 'self-protection', 'community']
            };
            
            // 根据角色优先级重新排序模块
            if (roleModulePriority[role]) {
                roleModulePriority[role].forEach(moduleId => {
                    const moduleCard = Array.from(moduleCards).find(card => card.getAttribute('data-target') === moduleId);
                    if (moduleCard) {
                        modulesGrid.appendChild(moduleCard);
                    }
                });
            }
        }
    }
}

// 模块导航初始化
function initModuleNavigation() {
    const moduleCards = document.querySelectorAll('.module-card');
    const contentSections = document.querySelectorAll('.content-section');
    
    // 为每个模块卡片添加点击事件
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // 添加点击动画
            this.classList.add('card-clicked');
            setTimeout(() => {
                this.classList.remove('card-clicked');
            }, 300);
            
            // 隐藏所有内容区域
            contentSections.forEach(section => {
                section.classList.add('hidden');
            });
            
            // 显示目标内容区域
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                
                // 使用滚动动画
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // 添加展示动画
                targetSection.classList.add('section-fade-in');
                setTimeout(() => {
                    targetSection.classList.remove('section-fade-in');
                }, 500);
                
                // 更新访问历史
                updateVisitHistory(targetId);
            }
        });
    });
    
    // 更新访问历史
    function updateVisitHistory(sectionId) {
        let visitHistory = JSON.parse(localStorage.getItem('visitHistory') || '[]');
        
        // 如果历史记录中已存在该部分，则将其移至最前
        visitHistory = visitHistory.filter(id => id !== sectionId);
        
        // 添加到历史记录开头
        visitHistory.unshift(sectionId);
        
        // 限制历史记录数量
        if (visitHistory.length > 10) {
            visitHistory = visitHistory.slice(0, 10);
        }
        
        localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
    }
}

// 事件上报表单初始化
function initReportForm() {
    const reportForm = document.getElementById('reportForm');
    const reportResult = document.getElementById('reportResult');
    const incidentNumberSpan = document.getElementById('incidentNumber');
    
    if (reportForm) {
        reportForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 表单验证
            const incidentType = document.getElementById('incidentType').value;
            const incidentDate = document.getElementById('incidentDate').value;
            const incidentDescription = document.getElementById('incidentDescription').value;
            
            if (!incidentType || !incidentDate || !incidentDescription) {
                showFormError('请填写所有必填字段');
                return;
            }
            
            // 生成随机事件编号
            const incidentNumber = generateIncidentNumber();
            
            // 显示上报成功消息
            incidentNumberSpan.textContent = incidentNumber;
            reportResult.classList.remove('hidden');
            
            // 隐藏表单
            reportForm.style.display = 'none';
            
            // 将事件保存到本地存储
            saveIncident({
                type: incidentType,
                date: incidentDate,
                description: incidentDescription,
                contactInfo: document.getElementById('contactInfo').value,
                number: incidentNumber,
                timestamp: new Date().getTime()
            });
            
            // 这里可以添加发送表单数据到服务器的代码
        });
    }
    
    // 显示表单错误消息
    function showFormError(message) {
        let errorDiv = document.querySelector('.form-error');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.style.color = 'var(--danger-color)';
            errorDiv.style.marginBottom = '15px';
            errorDiv.style.fontWeight = '600';
            reportForm.insertBefore(errorDiv, reportForm.firstChild);
        }
        
        errorDiv.textContent = message;
        
        // 3秒后移除错误消息
        setTimeout(() => {
            errorDiv.textContent = '';
        }, 3000);
    }
    
    // 将事件保存到本地存储
    function saveIncident(incident) {
        let incidents = JSON.parse(localStorage.getItem('incidents') || '[]');
        incidents.push(incident);
        localStorage.setItem('incidents', JSON.stringify(incidents));
    }
}

// 生成随机事件编号
function generateIncidentNumber() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `IV-${dateStr}-${timestamp.toString().slice(-6)}-${random}`;
}

// 解决方案匹配功能初始化
function initSolutionFinder() {
    const findSolutionBtn = document.getElementById('findSolutionBtn');
    const solutionResults = document.getElementById('solutionResults');
    
    if (findSolutionBtn) {
        findSolutionBtn.addEventListener('click', function() {
            const violenceType = document.getElementById('solutionType').value;
            const severity = document.getElementById('solutionSeverity').value;
            
            if (!violenceType || !severity) {
                alert('请选择暴力类型和严重程度');
                return;
            }
            
            // 根据选择显示匹配的解决方案
            const matchedSolutions = findMatchedSolutions(violenceType, severity);
            renderSolutions(matchedSolutions);
            
            solutionResults.classList.remove('hidden');
            
            // 滚动到结果区域
            solutionResults.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// 根据选择的暴力类型和严重程度查找匹配的解决方案
function findMatchedSolutions(violenceType, severity) {
    // 预设的解决方案数据，实际应用中可能来自API或数据库
    const solutionsData = {
        physical: {
            mild: [
                {
                    title: "沟通调解方案",
                    description: "通过老师或专业人员引导的沟通调解，化解轻微肢体冲突。",
                    steps: ["向老师或辅导员报告情况", "参与由专业人员组织的调解会谈", "达成和解共识并签订协议"],
                    resources: ["校园心理咨询中心", "班主任/年级主任", "学生处"],
                    success_rate: "85%"
                },
                {
                    title: "朋辈支持计划",
                    description: "由经过培训的学生调解员协助解决轻微肢体冲突。",
                    steps: ["联系校内朋辈调解员", "参与小组调解活动", "制定预防未来冲突的计划"],
                    resources: ["学生会调解小组", "校园心理健康俱乐部", "班级心理委员"],
                    success_rate: "78%"
                }
            ],
            moderate: [
                {
                    title: "校园安全干预",
                    description: "由学校安全部门介入，处理中度肢体暴力事件。",
                    steps: ["向校园安全部门报告", "提供详细的事件描述和证据", "接受学校的处理决定", "参与后续心理辅导"],
                    resources: ["学校保卫处", "年级主任办公室", "校园心理咨询中心"],
                    success_rate: "92%"
                },
                {
                    title: "家校合作干预",
                    description: "学校与家长共同介入，处理并预防肢体暴力再次发生。",
                    steps: ["学校通知家长", "举行家长、学生和老师三方会议", "制定行为矫正计划", "定期跟进评估"],
                    resources: ["年级组长", "家长委员会", "校园心理辅导中心"],
                    success_rate: "88%"
                }
            ],
            severe: [
                {
                    title: "法律维权方案",
                    description: "对严重肢体暴力，通过法律途径维护权益并寻求赔偿。",
                    steps: ["保存伤情证据（照片、医疗记录）", "报警并提供证据", "寻求法律援助", "可能需要进行司法鉴定"],
                    resources: ["校园法律顾问", "未成年人保护中心", "公安机关", "法律援助中心"],
                    success_rate: "95%"
                },
                {
                    title: "转校保护方案",
                    description: "为严重受害者提供转学或特殊保护措施。",
                    steps: ["联系学校心理辅导中心", "申请特殊保护措施", "考虑临时或永久转校", "持续接受心理康复治疗"],
                    resources: ["教育局学生安置中心", "心理创伤康复中心", "校园安全部门"],
                    success_rate: "82%"
                }
            ]
        },
        verbal: {
            mild: [
                {
                    title: "情绪管理训练",
                    description: "学习应对言语冲突的情绪控制技巧。",
                    steps: ["参加校内情绪管理课程", "学习沟通和冲突解决技巧", "练习积极应对策略"],
                    resources: ["校园心理咨询中心", "情绪管理工作坊", "冲突解决培训课程"],
                    success_rate: "75%"
                }
            ],
            moderate: [
                {
                    title: "心理咨询支持",
                    description: "通过专业心理咨询缓解言语暴力造成的伤害。",
                    steps: ["预约校内心理咨询师", "参与个人或小组心理辅导", "学习自我保护和应对技巧"],
                    resources: ["校园心理咨询中心", "心理健康热线", "青少年心理支持平台"],
                    success_rate: "83%"
                }
            ],
            severe: [
                {
                    title: "校规处理方案",
                    description: "根据校规对言语暴力进行正式处理。",
                    steps: ["收集言语暴力证据（聊天记录、证人证言）", "向学校纪律委员会提交投诉", "配合调查程序", "接受处理结果"],
                    resources: ["班主任", "年级组长", "学生处", "校规执行委员会"],
                    success_rate: "90%"
                }
            ]
        },
        cyber: {
            mild: [
                {
                    title: "网络素养教育",
                    description: "学习如何安全使用互联网并保护个人信息。",
                    steps: ["参加网络安全课程", "学习隐私保护设置", "了解网络欺凌的应对方法"],
                    resources: ["信息技术教师", "网络安全课程", "数字公民培训"],
                    success_rate: "70%"
                }
            ],
            moderate: [
                {
                    title: "网络证据收集",
                    description: "系统收集网络暴力证据，为进一步处理做准备。",
                    steps: ["截图保存所有相关内容", "记录事件发生时间", "备份所有相关聊天记录", "向平台举报不当内容"],
                    resources: ["信息技术教师", "校园网络安全小组", "社交媒体平台举报机制"],
                    success_rate: "85%"
                }
            ],
            severe: [
                {
                    title: "网络执法干预",
                    description: "对严重网络暴力，通过网络监管部门介入处理。",
                    steps: ["向公安机关网安部门报案", "提供完整的证据资料", "配合调查", "必要时寻求法律援助"],
                    resources: ["网络警察", "未成年人网络保护中心", "网络安全举报平台", "法律援助中心"],
                    success_rate: "92%"
                }
            ]
        },
        relational: {
            mild: [
                {
                    title: "社交技能培训",
                    description: "学习如何建立健康的社交关系和应对排挤。",
                    steps: ["参加社交技能工作坊", "加入兴趣小组扩展社交圈", "学习积极的社交策略"],
                    resources: ["校园社交技能培训", "兴趣社团", "同伴支持小组"],
                    success_rate: "72%"
                }
            ],
            moderate: [
                {
                    title: "小组融合活动",
                    description: "通过团体活动改善群体关系，减少关系暴力。",
                    steps: ["参与教师组织的班级融合活动", "在安全环境中表达感受", "建立新的班级互动模式"],
                    resources: ["班主任", "班级活动", "团体心理辅导"],
                    success_rate: "80%"
                }
            ],
            severe: [
                {
                    title: "心理重建方案",
                    description: "通过专业心理干预，帮助严重关系暴力受害者恢复。",
                    steps: ["接受专业心理健康评估", "参与长期心理治疗计划", "学习建立边界和自我保护", "逐步重建社交信任"],
                    resources: ["专业心理咨询师", "社交恐惧症治疗小组", "心理康复中心"],
                    success_rate: "87%"
                }
            ]
        }
    };
    
    // 返回匹配的解决方案
    if (solutionsData[violenceType] && solutionsData[violenceType][severity]) {
        return solutionsData[violenceType][severity];
    }
    
    return []; // 如果没有匹配的解决方案，返回空数组
}

// 渲染解决方案
function renderSolutions(solutions) {
    const solutionResults = document.getElementById('solutionResults');
    
    if (solutions.length === 0) {
        solutionResults.innerHTML = '<p>未找到匹配的解决方案，请联系专业人员获取帮助。</p>';
        return;
    }
    
    let html = '';
    
    solutions.forEach(solution => {
        let stepsHtml = '';
        solution.steps.forEach(step => {
            stepsHtml += `<li>${step}</li>`;
        });
        
        let resourcesHtml = '';
        if (solution.resources) {
            solution.resources.forEach(resource => {
                resourcesHtml += `<span class="resource-badge">${resource}</span>`;
            });
        }
        
        html += `
            <div class="solution-card">
                <h3>${solution.title}</h3>
                <div class="solution-success-rate">成功率: <span>${solution.success_rate || '未知'}</span></div>
                <p>${solution.description}</p>
                <h4>处理步骤：</h4>
                <ol class="solution-steps">${stepsHtml}</ol>
                <div class="solution-resources">
                    <h4>推荐资源：</h4>
                    <div class="resource-badges">${resourcesHtml}</div>
                </div>
                <button class="solution-save-btn">保存此方案</button>
            </div>
        `;
    });
    
    solutionResults.innerHTML = html;
    
    // 添加保存方案的功能
    document.querySelectorAll('.solution-save-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const solutionCard = this.closest('.solution-card');
            const solutionTitle = solutionCard.querySelector('h3').textContent;
            
            // 保存到本地存储
            saveSolution(solutionTitle);
            
            // 显示保存成功提示
            this.textContent = '已保存';
            this.disabled = true;
            this.style.backgroundColor = 'var(--success-color)';
        });
    });
}

// 保存解决方案到本地存储
function saveSolution(solutionTitle) {
    let savedSolutions = JSON.parse(localStorage.getItem('savedSolutions') || '[]');
    
    // 检查是否已经保存
    if (!savedSolutions.includes(solutionTitle)) {
        savedSolutions.push(solutionTitle);
        localStorage.setItem('savedSolutions', JSON.stringify(savedSolutions));
    }
}

// 搜索功能初始化
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        // 回车键触发搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const keyword = searchInput.value.trim();
        
        if (!keyword) {
            alert('请输入搜索关键词');
            return;
        }
        
        // 执行搜索
        const results = searchKeyword(keyword);
        renderSearchResults(results);
        
        // 记录搜索历史
        saveSearchHistory(keyword);
    }
}

// 搜索关键词
function searchKeyword(keyword) {
    // 预设的搜索数据，实际应用中可能来自API或数据库
    const searchData = [
        {
            title: "什么是校园暴力？",
            content: "校园暴力是指在校园内或与学校相关的环境中发生的包括身体暴力、语言暴力、关系暴力和网络暴力在内的伤害行为。这些行为可能导致受害者产生身体伤害、心理伤害或社交困难。",
            type: "定义",
            url: "#violence-info"
        },
        {
            title: "如何识别校园暴力？",
            content: "校园暴力的表现形式多样，常见的包括打架斗殴、言语恐吓、社交排挤、网络霸凌等。受害者可能出现情绪低落、学习成绩下降、不愿上学、身体不明伤痕等症状。",
            type: "指南",
            url: "#violence-info"
        },
        {
            title: "遭遇校园暴力应该怎么办？",
            content: "首先保证自身安全，保留相关证据，如受伤照片、聊天记录等。及时向老师、家长或学校心理咨询师寻求帮助。必要时可以拨打校园暴力举报热线或向警方报案。",
            type: "指南",
            url: "#solutions"
        },
        {
            title: "我如何帮助遭受校园暴力的朋友？",
            content: "保持倾听和支持的态度，不要责备受害者。鼓励他们寻求成年人或专业人士的帮助。提供情感支持和陪伴，但不要私自介入解决冲突，以免情况恶化。",
            type: "指南",
            url: "#resources"
        },
        {
            title: "校园暴力的法律责任",
            content: "根据不同国家和地区的法律，校园暴力可能涉及刑事责任和民事赔偿责任。对于未成年人，可能适用少年司法程序。学校也可能面临管理不当的法律责任。",
            type: "法律",
            url: "#resources"
        }
    ];
    
    // 简单的关键词匹配搜索
    return searchData.filter(item => 
        item.title.includes(keyword) || 
        item.content.includes(keyword) || 
        item.type.includes(keyword)
    );
}

// 渲染搜索结果
function renderSearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>未找到相关结果，请尝试其他关键词。</p>';
        return;
    }
    
    let html = `<h3>搜索结果（${results.length}条）</h3>`;
    
    results.forEach(result => {
        html += `
            <div class="search-result-item">
                <h4><a href="${result.url}">${result.title}</a></h4>
                <p>${result.content}</p>
                <span class="result-type">${result.type}</span>
            </div>
        `;
    });
    
    searchResults.innerHTML = html;
    
    // 给搜索结果链接添加点击事件
    document.querySelectorAll('.search-result-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // 隐藏所有内容区域
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.add('hidden');
            });
            
            // 显示目标内容区域
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 保存搜索历史
function saveSearchHistory(keyword) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    
    // 如果已经存在相同的关键词，则移除旧的
    searchHistory = searchHistory.filter(item => item !== keyword);
    
    // 添加到历史记录开头
    searchHistory.unshift(keyword);
    
    // 限制历史记录数量
    if (searchHistory.length > 10) {
        searchHistory = searchHistory.slice(0, 10);
    }
    
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// 语音搜索初始化
function initVoiceSearch() {
    const voiceSearchBtn = document.getElementById('voiceSearchBtn');
    
    if (voiceSearchBtn && 'webkitSpeechRecognition' in window) {
        voiceSearchBtn.addEventListener('click', function() {
            startVoiceRecognition();
        });
    } else if (voiceSearchBtn) {
        voiceSearchBtn.style.display = 'none';
    }
}

// 开始语音识别
function startVoiceRecognition() {
    const searchInput = document.getElementById('searchInput');
    const voiceSearchBtn = document.getElementById('voiceSearchBtn');
    
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'zh-CN';
        
        recognition.onstart = function() {
            // 显示正在录音的视觉反馈
            voiceSearchBtn.innerHTML = '<i class="mic-icon">🎤</i> 正在聆听...';
            voiceSearchBtn.classList.add('recording');
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
            
            // 自动触发搜索
            document.getElementById('searchBtn').click();
        };
        
        recognition.onerror = function(event) {
            console.error('语音识别错误:', event.error);
            
            // 恢复按钮状态
            voiceSearchBtn.innerHTML = '<i class="mic-icon">🎤</i> 语音搜索';
            voiceSearchBtn.classList.remove('recording');
        };
        
        recognition.onend = function() {
            // 恢复按钮状态
            voiceSearchBtn.innerHTML = '<i class="mic-icon">🎤</i> 语音搜索';
            voiceSearchBtn.classList.remove('recording');
        };
        
        recognition.start();
    }
}

// 新闻过滤初始化
function initNewsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // 移除所有按钮的active类
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // 给当前按钮添加active类
                this.classList.add('active');
                
                // 过滤新闻
                filterNews(filter);
            });
        });
    }
    
    // 过滤新闻
    function filterNews(filter) {
        newsCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// 交流社区标签页切换初始化
function initCommunityTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // 移除所有按钮的active类
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // 给当前按钮添加active类
                this.classList.add('active');
                
                // 切换内容
                switchTab(tabName);
            });
        });
        
        // 支持按钮点击事件
        document.querySelectorAll('.support-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const currentText = this.textContent;
                const count = parseInt(currentText.match(/\d+/)[0]) + 1;
                this.textContent = `支持 (${count})`;
            });
        });
        
        // 回复按钮点击事件
        document.querySelectorAll('.reply-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const postCard = this.closest('.post-card');
                const replyForm = postCard.querySelector('.reply-form');
                
                if (replyForm) {
                    replyForm.classList.toggle('hidden');
                } else {
                    const newReplyForm = document.createElement('div');
                    newReplyForm.className = 'reply-form';
                    newReplyForm.innerHTML = `
                        <textarea placeholder="写下你的回复..."></textarea>
                        <button class="submit-btn">回复</button>
                    `;
                    postCard.appendChild(newReplyForm);
                    
                    newReplyForm.querySelector('.submit-btn').addEventListener('click', function() {
                        const replyText = newReplyForm.querySelector('textarea').value.trim();
                        if (replyText) {
                            alert('回复已提交，等待审核');
                            newReplyForm.classList.add('hidden');
                        }
                    });
                }
            });
        });
    }
    
    // 切换标签页
    function switchTab(tabName) {
        // 隐藏所有标签内容
        tabContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // 显示选中的标签内容
        const selectedContent = document.getElementById(tabName);
        if (selectedContent) {
            selectedContent.style.display = 'block';
        }
    }
}

// 自我评估初始化
function initAssessment() {
    const assessmentBtn = document.querySelector('.assessment-btn');
    
    if (assessmentBtn) {
        assessmentBtn.addEventListener('click', function() {
            showAssessmentModal();
        });
    }
    
    // 显示自我评估模态框
    function showAssessmentModal() {
        // 创建模态框
        const modal = document.createElement('div');
        modal.className = 'assessment-modal';
        modal.innerHTML = `
            <div class="assessment-content">
                <span class="close-modal">&times;</span>
                <h3>校园暴力风险评估</h3>
                <p>请回答以下问题，以评估您可能面临的校园暴力风险。</p>
                <div class="assessment-questions">
                    <div class="question">
                        <p>1. 您是否曾在校园内感到不安全？</p>
                        <div class="options">
                            <label><input type="radio" name="q1" value="1"> 从不</label>
                            <label><input type="radio" name="q1" value="2"> 偶尔</label>
                            <label><input type="radio" name="q1" value="3"> 经常</label>
                            <label><input type="radio" name="q1" value="4"> 总是</label>
                        </div>
                    </div>
                    <div class="question">
                        <p>2. 您是否曾被他人故意排挤或孤立？</p>
                        <div class="options">
                            <label><input type="radio" name="q2" value="1"> 从不</label>
                            <label><input type="radio" name="q2" value="2"> 偶尔</label>
                            <label><input type="radio" name="q2" value="3"> 经常</label>
                            <label><input type="radio" name="q2" value="4"> 总是</label>
                        </div>
                    </div>
                    <div class="question">
                        <p>3. 您是否曾收到恶意的言语攻击或辱骂？</p>
                        <div class="options">
                            <label><input type="radio" name="q3" value="1"> 从不</label>
                            <label><input type="radio" name="q3" value="2"> 偶尔</label>
                            <label><input type="radio" name="q3" value="3"> 经常</label>
                            <label><input type="radio" name="q3" value="4"> 总是</label>
                        </div>
                    </div>
                </div>
                <button class="submit-assessment">提交评估</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 关闭模态框
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // 提交评估
        modal.querySelector('.submit-assessment').addEventListener('click', function() {
            const q1 = document.querySelector('input[name="q1"]:checked');
            const q2 = document.querySelector('input[name="q2"]:checked');
            const q3 = document.querySelector('input[name="q3"]:checked');
            
            if (!q1 || !q2 || !q3) {
                alert('请回答所有问题');
                return;
            }
            
            // 计算风险等级
            const score = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value);
            let riskLevel = '低风险';
            let advice = '您面临的校园暴力风险较低，但仍建议保持警惕，学习相关防护知识。';
            
            if (score >= 9) {
                riskLevel = '高风险';
                advice = '您面临较高的校园暴力风险，建议立即联系老师、家长或专业人士获取帮助。';
            } else if (score >= 6) {
                riskLevel = '中风险';
                advice = '您面临一定的校园暴力风险，建议学习自我保护知识，必要时寻求帮助。';
            }
            
            // 显示评估结果
            modal.querySelector('.assessment-content').innerHTML = `
                <span class="close-modal">&times;</span>
                <h3>评估结果</h3>
                <div class="assessment-result">
                    <p>风险等级：<span class="risk-level">${riskLevel}</span></p>
                    <p>${advice}</p>
                    <div class="result-actions">
                        <a href="#self-protection" class="action-btn">查看自我保护指南</a>
                        <a href="#resources" class="action-btn">获取专业帮助</a>
                    </div>
                </div>
            `;
            
            // 关闭结果模态框
            modal.querySelector('.close-modal').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // 结果页面按钮点击事件
            modal.querySelectorAll('.action-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    
                    // 关闭模态框
                    document.body.removeChild(modal);
                    
                    // 隐藏所有内容区域
                    document.querySelectorAll('.content-section').forEach(section => {
                        section.classList.add('hidden');
                    });
                    
                    // 显示目标内容区域
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.classList.remove('hidden');
                        targetSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });
    }
}

// 视频按钮初始化
function initVideoButton() {
    const videoBtn = document.querySelector('.video-btn');
    
    if (videoBtn) {
        videoBtn.addEventListener('click', function() {
            showVideoModal();
        });
    }
    
    // 显示视频模态框
    function showVideoModal() {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <span class="close-modal">&times;</span>
                <h3>自卫技巧教学视频</h3>
                <div class="video-container">
                    <div class="video-placeholder">
                        <p>视频加载中...</p>
                        <p>（实际应用中，这里会嵌入真实的教学视频）</p>
                    </div>
                </div>
                <div class="video-description">
                    <p>本视频教授基本的自卫技巧，包括如何保持安全距离、如何摆脱控制、如何寻求帮助等内容。</p>
                    <p>请注意：这些技巧仅用于紧急自卫，首要原则始终是保证自身安全。</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 关闭模态框
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }
}

// 浮动求助按钮初始化
function initHelpButton() {
    const helpBtn = document.querySelector('.help-btn');
    
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            showHelpModal();
        });
    }
    
    // 显示求助模态框
    function showHelpModal() {
        const modal = document.createElement('div');
        modal.className = 'help-modal';
        modal.innerHTML = `
            <div class="help-modal-content">
                <span class="close-modal">&times;</span>
                <h3>紧急求助</h3>
                <div class="help-options">
                    <div class="help-option">
                        <h4>紧急电话</h4>
                        <p>校园暴力举报热线：12345</p>
                        <p>心理援助热线：67890</p>
                        <p>全国青少年保护热线：12355</p>
                        <button class="call-btn">拨打电话</button>
                    </div>
                    <div class="help-option">
                        <h4>在线咨询</h4>
                        <p>与专业咨询师即时交流</p>
                        <button class="chat-btn">开始咨询</button>
                    </div>
                    <div class="help-option">
                        <h4>紧急上报</h4>
                        <p>向学校管理人员快速上报事件</p>
                        <button class="report-btn">立即上报</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 关闭模态框
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // 按钮点击事件
        modal.querySelector('.call-btn').addEventListener('click', function() {
            alert('即将拨打电话：12345');
        });
        
        modal.querySelector('.chat-btn').addEventListener('click', function() {
            alert('正在连接咨询师，请稍候...');
        });
        
        modal.querySelector('.report-btn').addEventListener('click', function() {
            // 关闭当前模态框
            document.body.removeChild(modal);
            
            // 转到事件上报页面
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.add('hidden');
            });
            
            const reportSection = document.getElementById('report-system');
            if (reportSection) {
                reportSection.classList.remove('hidden');
                reportSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
}

// 滑块初始化
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // 隐藏所有幻灯片，显示当前幻灯片
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // 初始显示第一张幻灯片
    showSlide(currentSlide);
    
    // 上一张按钮点击事件
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    // 下一张按钮点击事件
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }
    
    // 点击指示点切换幻灯片
    dots.forEach((dot, i) => {
        dot.addEventListener('click', function() {
            currentSlide = i;
            showSlide(currentSlide);
        });
    });
    
    // 自动切换幻灯片
    setInterval(function() {
        if (document.hasFocus()) { // 只有在页面获得焦点时才自动切换
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    }, 5000);
}

// 数字动画初始化
function initStatisticsAnimation() {
    const statisticNumbers = document.querySelectorAll('.statistic-number');
    
    // 检查元素是否在视图中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 动画数字
    function animateNumber(element, target) {
        const duration = 2000; // 动画持续时间（毫秒）
        const frameDuration = 16; // 每帧持续时间（毫秒）
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;
        const startValue = 0;
        const step = (target - startValue) / totalFrames;
        
        const timer = setInterval(() => {
            frame++;
            const currentValue = Math.round(startValue + step * frame);
            element.textContent = currentValue;
            
            if (frame === totalFrames) {
                clearInterval(timer);
                element.textContent = target;
            }
        }, frameDuration);
    }
    
    // 处理滚动事件，检查统计数字是否在视图中
    function handleScroll() {
        statisticNumbers.forEach(number => {
            if (isInViewport(number) && !number.classList.contains('animated')) {
                const target = parseInt(number.getAttribute('data-target'));
                animateNumber(number, target);
                number.classList.add('animated');
            }
        });
    }
    
    // 初始检查
    handleScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', handleScroll);
}

// 个性化推荐初始化
function initPersonalizedRecommendations() {
    // 检查是否有用户角色
    const userRole = localStorage.getItem('userRole');
    if (!userRole) return;
    
    // 获取访问历史
    const visitHistory = JSON.parse(localStorage.getItem('visitHistory') || '[]');
    
    // 获取搜索历史
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    
    // 根据角色、访问历史和搜索历史生成个性化推荐
    generateRecommendations(userRole, visitHistory, searchHistory);
}

// 生成个性化推荐
function generateRecommendations(role, visitHistory, searchHistory) {
    // 这里可以添加复杂的推荐算法
    // 简单实现：在首页底部创建一个推荐区域
    
    // 检查是否已存在推荐区域
    let recommendationsSection = document.querySelector('.personalized-recommendations');
    
    if (!recommendationsSection) {
        // 创建推荐区域
        recommendationsSection = document.createElement('section');
        recommendationsSection.className = 'personalized-recommendations';
        recommendationsSection.innerHTML = `
            <div class="container">
                <h2>为您推荐</h2>
                <div class="recommendations-grid"></div>
            </div>
        `;
        
        // 添加到页面，放在统计部分之前
        const statisticsSection = document.querySelector('.statistics-section');
        if (statisticsSection) {
            statisticsSection.parentNode.insertBefore(recommendationsSection, statisticsSection);
        } else {
            // 如果找不到统计部分，则添加到页脚之前
            const footer = document.querySelector('footer');
            if (footer) {
                footer.parentNode.insertBefore(recommendationsSection, footer);
            }
        }
    }
    
    // 角色特定推荐
    const roleRecommendations = {
        student: [
            { title: '如何识别潜在的校园暴力', target: '#violence-info', icon: '🔍' },
            { title: '校园暴力自我保护实用技巧', target: '#self-protection', icon: '🛡️' },
            { title: '寻求同伴支持的方法', target: '#community', icon: '👥' }
        ],
        teacher: [
            { title: '教师干预校园暴力指南', target: '#solutions', icon: '📚' },
            { title: '课堂冲突解决技巧', target: '#resources', icon: '🧩' },
            { title: '识别学生情绪变化的方法', target: '#violence-info', icon: '😊' }
        ],
        parent: [
            { title: '与孩子沟通校园暴力问题', target: '#resources', icon: '💬' },
            { title: '发现孩子遭受欺凌的迹象', target: '#violence-info', icon: '👁️' },
            { title: '如何与学校合作解决问题', target: '#solutions', icon: '🤝' }
        ]
    };
    
    // 根据访问历史和搜索历史增强推荐
    let recommendations = [...(roleRecommendations[role] || [])];
    
    // 添加基于访问历史的推荐
    if (visitHistory.length > 0) {
        // 添加最常访问的内容相关推荐
        const mostVisited = visitHistory[0];
        switch (mostVisited) {
            case 'violence-info':
                recommendations.push({ title: '深入了解校园暴力类型及特征', target: '#violence-info', icon: '📊' });
                break;
            case 'self-protection':
                recommendations.push({ title: '进阶自我保护技巧', target: '#self-protection', icon: '🥋' });
                break;
            case 'resources':
                recommendations.push({ title: '专业资源进阶指南', target: '#resources', icon: '📂' });
                break;
            case 'solutions':
                recommendations.push({ title: '定制化解决方案', target: '#solutions', icon: '🧩' });
                break;
            case 'community':
                recommendations.push({ title: '参与更多社区讨论', target: '#community', icon: '💭' });
                break;
        }
    }
    
    // 渲染推荐
    const recommendationsGrid = recommendationsSection.querySelector('.recommendations-grid');
    if (recommendationsGrid) {
        recommendationsGrid.innerHTML = '';
        
        recommendations.forEach(recommendation => {
            const recommendationCard = document.createElement('div');
            recommendationCard.className = 'recommendation-card';
            recommendationCard.innerHTML = `
                <div class="recommendation-icon">${recommendation.icon}</div>
                <h3>${recommendation.title}</h3>
                <a href="${recommendation.target}" class="recommendation-link">查看详情</a>
            `;
            recommendationsGrid.appendChild(recommendationCard);
        });
        
        // 添加点击事件
        recommendationsGrid.querySelectorAll('.recommendation-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                
                // 隐藏所有内容区域
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.add('hidden');
                });
                
                // 显示目标内容区域
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.remove('hidden');
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// 颜色主题选择器初始化
function initColorThemeSelector() {
    // 创建主题选择器按钮
    const themeSelector = document.createElement('div');
    themeSelector.className = 'theme-selector';
    themeSelector.innerHTML = `
        <button class="theme-selector-btn">🎨</button>
        <div class="theme-options hidden">
            <div class="theme-option" data-theme="default">默认</div>
            <div class="theme-option" data-theme="blue">蓝色</div>
            <div class="theme-option" data-theme="purple">紫色</div>
            <div class="theme-option" data-theme="green">绿色</div>
        </div>
    `;
    
    document.body.appendChild(themeSelector);
    
    // 主题按钮点击事件
    const themeSelectorBtn = themeSelector.querySelector('.theme-selector-btn');
    const themeOptions = themeSelector.querySelector('.theme-options');
    
    themeSelectorBtn.addEventListener('click', function() {
        themeOptions.classList.toggle('hidden');
    });
    
    // 点击其他区域关闭主题选择器
    document.addEventListener('click', function(e) {
        if (!themeSelector.contains(e.target)) {
            themeOptions.classList.add('hidden');
        }
    });
    
    // 主题选项点击事件
    const themeOptionBtns = themeSelector.querySelectorAll('.theme-option');
    themeOptionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const themeName = this.getAttribute('data-theme');
            
            // 移除所有主题类
            document.body.classList.remove('blue-theme', 'purple-theme', 'green-theme');
            
            // 添加选中的主题类
            if (themeName !== 'default') {
                document.body.classList.add(`${themeName}-theme`);
            }
            
            // 保存主题设置
            localStorage.setItem('colorTheme', themeName);
            
            // 隐藏选项
            themeOptions.classList.add('hidden');
            
            // 通知用户
            showToast(`已切换至${this.textContent}主题`);
        });
    });
    
    // 加载保存的主题
    const savedTheme = localStorage.getItem('colorTheme');
    if (savedTheme && savedTheme !== 'default') {
        document.body.classList.add(`${savedTheme}-theme`);
    }
}

// 字体大小调整初始化
function initFontSizeAdjuster() {
    // 创建字体大小调整器
    const fontSizeAdjuster = document.createElement('div');
    fontSizeAdjuster.className = 'font-size-adjuster';
    fontSizeAdjuster.innerHTML = `
        <button class="font-size-btn">文字大小</button>
        <div class="font-size-options hidden">
            <div class="font-size-option" data-size="small">小</div>
            <div class="font-size-option" data-size="normal">中</div>
            <div class="font-size-option" data-size="large">大</div>
        </div>
    `;
    
    document.body.appendChild(fontSizeAdjuster);
    
    // 按钮点击事件
    const fontSizeBtn = fontSizeAdjuster.querySelector('.font-size-btn');
    const fontSizeOptions = fontSizeAdjuster.querySelector('.font-size-options');
    
    fontSizeBtn.addEventListener('click', function() {
        fontSizeOptions.classList.toggle('hidden');
    });
    
    // 点击其他区域关闭选项
    document.addEventListener('click', function(e) {
        if (!fontSizeAdjuster.contains(e.target)) {
            fontSizeOptions.classList.add('hidden');
        }
    });
    
    // 字体大小选项点击事件
    const fontSizeOptionBtns = fontSizeAdjuster.querySelectorAll('.font-size-option');
    fontSizeOptionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const fontSize = this.getAttribute('data-size');
            
            // 移除所有字体大小类
            document.body.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
            
            // 添加选中的字体大小类
            document.body.classList.add(`font-size-${fontSize}`);
            
            // 保存字体大小设置
            localStorage.setItem('fontSize', fontSize);
            
            // 隐藏选项
            fontSizeOptions.classList.add('hidden');
            
            // 通知用户
            showToast(`已调整文字大小为${this.textContent}`);
        });
    });
    
    // 加载保存的字体大小
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.body.classList.add(`font-size-${savedFontSize}`);
    } else {
        // 默认中等字体
        document.body.classList.add('font-size-normal');
    }
}

// 通知系统初始化
function initNotifications() {
    // 创建通知容器
    const notificationsContainer = document.createElement('div');
    notificationsContainer.className = 'notifications-container';
    document.body.appendChild(notificationsContainer);
}

// 显示提示消息
function showToast(message, duration = 3000) {
    const notificationsContainer = document.querySelector('.notifications-container');
    if (!notificationsContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    
    notificationsContainer.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 设置自动消失
    setTimeout(() => {
        toast.classList.remove('show');
        
        // 移除元素
        toast.addEventListener('transitionend', function() {
            if (notificationsContainer.contains(toast)) {
                notificationsContainer.removeChild(toast);
            }
        });
    }, duration);
}

// 显示引导提示
function showWelcomeTour() {
    // 检查是否是首次访问
    if (localStorage.getItem('welcomeTourShown')) return;
    
    // 创建引导层
    const welcomeTour = document.createElement('div');
    welcomeTour.className = 'welcome-tour';
    welcomeTour.innerHTML = `
        <div class="tour-overlay"></div>
        <div class="tour-content">
            <h3>欢迎使用校园暴力防治信息平台</h3>
            <p>通过这个平台，您可以:</p>
            <ul>
                <li>了解校园暴力的各种形式及预防方法</li>
                <li>寻找适合的解决方案和资源</li>
                <li>与他人分享经验并获得支持</li>
                <li>学习自我保护技巧</li>
            </ul>
            <p>请先选择您的身份，我们将为您提供个性化的内容。</p>
            <button class="tour-next-btn">开始使用</button>
        </div>
    `;
    
    document.body.appendChild(welcomeTour);
    
    // 点击下一步按钮
    welcomeTour.querySelector('.tour-next-btn').addEventListener('click', function() {
        document.body.removeChild(welcomeTour);
        localStorage.setItem('welcomeTourShown', 'true');
        
        // 引导用户选择身份
        highlightElement('.role-selector', '请选择您的身份');
    });
}

// 高亮元素引导
function highlightElement(selector, text) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const highlight = document.createElement('div');
    highlight.className = 'element-highlight';
    
    const elementRect = element.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    
    highlight.style.top = `${elementRect.top + scrollY - 10}px`;
    highlight.style.left = `${elementRect.left - 10}px`;
    highlight.style.width = `${elementRect.width + 20}px`;
    highlight.style.height = `${elementRect.height + 20}px`;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'highlight-tooltip';
    tooltip.textContent = text;
    
    highlight.appendChild(tooltip);
    document.body.appendChild(highlight);
    
    // 点击任意位置移除高亮
    document.addEventListener('click', function removeHighlight() {
        if (document.body.contains(highlight)) {
            document.body.removeChild(highlight);
        }
        document.removeEventListener('click', removeHighlight);
    });
    
    // 滚动到元素位置
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
} 