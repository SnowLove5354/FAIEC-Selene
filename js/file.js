        // 标题池 - 用户切换标签页时显示随机标题
        const titlePool = [
            "火力大喵，正义执行！",
            "枫燃霜碎，万端皆除!",
            "别走那么快啦，等一等香奈美~",
            "大获全胜!怎么样?我早就说过，医疗可是战场中必不可少的要素哦。",
            "学着点，这才叫绘画!",
            "让我们一起学猫叫，一起喵喵喵喵喵",
            "鸣~嗯、稍微有点闲。虽然说是好事、但没事干好无聊啊......",
            "吾辈才不是，才不是很无聊呢！",
            "这儿环绕着鲜花的芬芳...我们可不可以多歇息一会儿？",
            "Excalibur！",
            "以新生的烈阳，撕裂长空！",
            "人有五名，代驾有4个~"
        ];
        
        // 保存原始标题
        const originalTitle = document.title;
        
        // 页面可见性检测：当用户切换标签页时触发
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden') {
                // 用户离开页面时随机选择标题
                const randomIndex = Math.floor(Math.random() * titlePool.length);
                document.title = titlePool[randomIndex];
            } else {
                // 用户返回页面时恢复原始标题
                document.title = originalTitle;
            }
        });
        
        // 轮播图功能实现
        document.addEventListener('DOMContentLoaded', function() {
            // 获取DOM元素
            const slides = document.querySelector('.slides');  // 幻灯片容器
            const dots = document.querySelectorAll('.dot');  // 导航点
            const prevBtn = document.querySelector('.carousel-btn.prev');  // 上一张按钮
            const nextBtn = document.querySelector('.carousel-btn.next');  // 下一张按钮
            const dynamicText = document.querySelector('.dynamic-text');  // 动态文字内容
            const contentLeft = document.querySelector('.content-left .content');  // 轮播文字容器
            const squares = document.querySelectorAll('.square');  // 方块
            let currentIndex = 0;  // 当前幻灯片索引
            
            // 动态文字内容（按幻灯片分组）
            const slideTexts = [
                 // 幻灯片1
                ["中国人民解放军装备的射程最远、威力最大的重型洲际战略核导弹，采用二级液体燃料火箭发动机，具备推力大、比冲力高的特性，射程覆盖全球。",
                 "采用全新设计的分导式多弹头，可携带10个弹头，可在纵深数百千米区域内选择要打击的独立目标，还可调节打击时序和次序，大幅提高突防能力和打击效果。",
                 "“东风-5C”液体洲际战略核导弹是我国战略反击体系中的重要组成，打击范围覆盖全球，全时戒备、有效威慑，以武止戈、砥定乾坤。"],
                 // 幻灯片2
                ["中国人民解放军海军福建舰（英文：CNS Fujian ，简称：福建舰，舷号：18），是中国自主设计建造的首艘弹射型航空母舰，是中国第一艘电磁弹射型航空母舰，也是中国第三艘航空母舰。",
                 "福建舰采用常规动力，满载排水量8万余吨，设置平直通长飞行甲板，配备4道阻拦索、3个弹射起飞位格。直接跨跃了传统蒸汽弹射技术，有效利用了常规动力，同时还具备高效储能和系统稳定的特点。电磁弹射起飞的福建舰可以搭载固定翼舰载无人机，重型舰载战斗机以及固定翼舰载预警机等多种新型舰载机，是中国航母舰载机的跨越。",
                 "福建舰服役后，三航母时代的到来，对于中国维护海洋权益，保障海上通道的安全有着重要意义。"],
                 // 幻灯片3
                ["LY-1舰载激光武器（中文名：燎原-1，外文名：LY-1）是中国自主研制的舰载激光反制武器，2025年9月3日在中国人民抗日战争暨世界反法西斯战争胜利80周年阅兵式首次公开亮相。",
                 "LY-1配备大容量能量单元，可通过舰载火控雷达锁定目标实现“瞄准即锁定，开火即命中”的作战效能，具备单次拦截成本低、拦截精度高等特点。作为定向能武器，其通过加热、破坏目标内部电气系统或致盲光学传感器实施毁伤，主要拦截对象为海上无人装备及反舰导弹。",
                 "该武器由加长军用车辆搭载展示，外观为大型白色装置配深蓝色屏幕，被称作“光之利刃”，目前至少处于高级测试阶段。"]
            ];
            
            // 特色服务方块内容（按方块分组）
            const squareContents = [
                 // 方块1
                ["每年8月5日前，有应征意向的男性大学生（含在校生、应届毕业生）可登录“全国征兵网”（网址：http://www.gfbzb.gov.cn），填写个人基本信息。",
                 "报名成功后，自行下载打印《大学生预征对象登记表》。",
                 "符合国家学费资助条件的，同时还应下载打印《高校学生应征入伍学费补偿国家助学贷款代偿申请表》（以下分别简称《登记表》、《申请表》），分别交所在高校征兵和学生资助管理部门进行审核。"],
                 // 方块2
                ["大学生在毕业离校或放假前，根据学校通知，携带本人身份证（户口簿）、毕业证书（高校在校生持学生证）。",
                 "按规定的时间到指定的地点参加学校所在地县级兵役机关组织的初审初检。",
                 "被确定为预征对象的学生，领取兵役机关和学校有关部门审核盖章后的《登记表》、《申请表》。"],
                 // 方块3
                ["大学生可在学校所在地或者入学前户籍所在地、经常居住地选择一个作为自己参军入伍的应征地。",
                 "征兵开始后，应征地兵役机关会将具体上站体检时间、地点通知大学生本人。",
                 "大学生可根据通知要求，携带本人身份证（户口簿）、毕业证书（高校在校生持学生证）以及审核盖章后的《登记表》、《申请表》直接参加应征地县级征兵办公室组织的体格检查，由当地公安、教育等部门同步展开政治联审工作。"],
                 // 方块4
                ["政治联审和体检初步合格者，将由县级征兵办公室通知大学生所在乡（镇、街道）基层人武部，安排走访调查。",
                 "",
                 ""],
                 // 方块5
                ["县级征兵办公室对体检和政审双合格者进行全面衡量，确定预定批准入伍对象。",
                 "同等条件下，优先确定学历高的应届毕业生为预定新兵。",
                 ""],
                 // 方块6
                ["对预定新兵名单将在县（市、区）、乡（镇、街道）张榜公示，接受群众监督。",
                 "公示时间不少于5天。",
                 ""],
                 // 方块7
                ["体检、政审合格并经公示的，由县级征兵办公室正式批准入伍，发放《入伍通知书》。",
                 "学生凭《入伍通知书》办理户口注销、享受义务兵优待，等待交接起运，统一输送至部队服役。",
                 "申请学费资助的，还要将加盖有县级征兵办公室公章的《申请表》原件和《入伍通知书》复印件，寄送至原就读高校学生资助管理部门。"]
            ];
            
            // 初始化轮播图
            function initCarousel() {
            	// 设置幻灯片初始位置
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;
                updateDots();  // 更新导航点状态
                updateDynamicText();  // 更新动态文字
            }
            
            // 更新导航点状态（激活状态切换）
            function updateDots() {
                dots.forEach(dot => {
                    dot.classList.toggle('active', parseInt(dot.dataset.index) === currentIndex);
                });
            }
            
            // 更新动态文字内容
            function updateDynamicText() {
                dynamicText.innerHTML = '';  // 清空现有内容
                const paragraphs = slideTexts[currentIndex];  // 获取当前幻灯片的文本内容
                paragraphs.forEach(paragraph => {
                    const p = document.createElement('p');  // 创建段落元素
                    p.textContent = paragraph;  // 设置段落文本
                    dynamicText.appendChild(p);  // 添加到动态文字容器
                });
            }
            
            // 更新左侧内容区域（特色服务方块点击时触发）
            function updateContentLeft(index) {
                contentLeft.innerHTML = '';  // 清空现有内容
                const paragraphs = squareContents[index];  // 获取对应方块的文本内容
                paragraphs.forEach(paragraph => {
                    const p = document.createElement('p');  // 创建段落元素
                    p.textContent = paragraph;  // 设置段落文本
                    contentLeft.appendChild(p);  // 添加到左侧内容区域
                });
            }
            
            // 切换到指定幻灯片
            function goToSlide(index) {
                currentIndex = (index + dots.length) % dots.length;  // 循环索引处理
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;  // 切换幻灯片
                updateDots();  // 更新导航点
                updateDynamicText();  // 更新动态文字
            }
            
            // 下一张幻灯片
            function nextSlide() {
                goToSlide(currentIndex + 1);  // 切换到下一张
            }
            
            // 上一张幻灯片
            function prevSlide() {
                goToSlide(currentIndex - 1);  // 切换到上一张
            }
            
            // 自动播放设置
            let autoPlay = setInterval(nextSlide, 5000);  //每5秒切换一次
            
            // 导航点点击事件
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    goToSlide(parseInt(this.dataset.index));  // 切换到对应幻灯片
                    resetAutoPlay();  // 重置自动播放计时器
                });
            });
            
            // 上一张按钮点击事件
            prevBtn.addEventListener('click', function() {
                prevSlide();  // 切换到上一张
                resetAutoPlay();  // 重置自动播放计时器
            });
            
            // 下一张按钮点击事件
            nextBtn.addEventListener('click', function() {
                nextSlide();  // 切换到下一张
                resetAutoPlay();  // 重置自动播放计时器
            });
            
            // 重置自动播放计时器
            function resetAutoPlay() {
                clearInterval(autoPlay);  // 清除现有计时器
                autoPlay = setInterval(nextSlide, 5000);  // 重新启动自动播放
            }
            
            // 特色服务方块点击事件
            squares.forEach(square => {
                square.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);  // 获取方块索引
                    updateContentLeft(index);  //点击方块时更新左侧内容区域文字
                    
                    // 更新方块状态：高亮当前选中方块
                    squares.forEach(s => s.style.opacity = '0.7');  // 其他方块变暗
                    this.style.opacity = '1';  // 当前方块高亮
                });
            });

            // 初始化轮播图
            initCarousel();
        });

        // 搜索功能实现
        function performSearch() {
            const searchTerm = document.getElementById('search-input').value.trim();  // 获取搜索词
            const engineSelect = document.getElementById('search-engine');  // 获取隐藏的搜索引擎选择元素
            const selectedEngine = engineSelect.value;  // 获取选中的搜索引擎值
            
            if (searchTerm) {
                let searchUrl;
                // 根据选择的搜索引擎构建URL
                switch(selectedEngine) {
                    case 'baidu': 
                        searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(searchTerm)}`;
                        break;
                    case 'google': 
                        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
                        break;
                    case 'bing': 
                        searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`;
                        break;
                }
                
                // 打开新标签页执行搜索
                const newTab = window.open(searchUrl, '_blank');
                if (!newTab) {
                    alert('搜索失败，请检查浏览器设置是否允许弹出窗口');  // 弹窗阻止提示
                }
            } else {
                alert('请输入搜索内容');  // 空搜索词提示弹窗
            }
        }

        // 绑定搜索功能事件
        document.querySelector('.search-box button').addEventListener('click', performSearch);  // 点击搜索按钮
        document.getElementById('search-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();  // 支持回车键提交
        });

        // 自定义下拉菜单交互
        const selectSelected = document.querySelector('.select-selected');  // 选中显示区域
        const selectItems = document.querySelector('.select-items');  // 选项列表
        const selectItemsList = document.querySelectorAll('.select-item');  // 具体选项
        const engineSelect = document.getElementById('search-engine');  // 隐藏的搜索引擎选择元素

        // 显示/隐藏下拉菜单
        selectSelected.addEventListener('click', function() {
            selectItems.style.display = selectItems.style.display === 'block' ? 'none' : 'block';
        });

        // 选择选项
        selectItemsList.forEach(item => {
            item.addEventListener('click', function() {
                const value = this.dataset.value;  // 获取选项文本内容（排除图片）
                const text = this.textContent.trim().split('\n').map(line => line.trim()).filter(text => text)[0];  // 获取选项文本
                const imgSrc = this.querySelector('img').src;  // 获取图标地址
                
                // 更新选中状态
                selectSelected.innerHTML = `<img src="${imgSrc}" width="16" height="16"> ${text}`;
                selectItems.style.display = 'none';  // 隐藏下拉菜单
                
                // 更新隐藏的搜索引擎选择元素的值
                engineSelect.value = value;
            });
        });

        // 点击页面其他区域关闭下拉菜单
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.custom-select')) {
                selectItems.style.display = 'none';  // 非下拉菜单区域点击时关闭
            }
        });