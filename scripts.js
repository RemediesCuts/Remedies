// =====================================================================
// ระบบจัดการข้อมูลวิดีโอ (หลังบ้าน) - แสดงเฉพาะ Vertical (9:16)
// ระบบจะนำค่าจากช่อง desc มาสร้างเป็นปุ่มหมวดหมู่ให้กดเลือกดูได้อัตโนมัติ
// =====================================================================
var portfolioVideos = [
    {
        url: 'https://www.tiktok.com/@sowareen/video/7670926629291724053',
        category: 'TikTok Clip',
        title: 'อาร์ทดารา',
        desc: 'Live Highlight'
    },
    {
        url: 'https://www.tiktok.com/@sowareen/video/7638002905403952385',
        category: 'TikTok Clip',
        title: 'ไม่มีชมหรอก',
        desc: 'Valorant'
    },
    {
        url: 'https://www.tiktok.com/@sowareen/video/7411643060897025288',
        category: 'TikTok Clip',
        title: 'เมื่อพี่อั้มโชว์ภาษาอังกฤษเกรด 4',
        desc: 'Valorant'
    },
    {
        url: 'https://www.tiktok.com/@jinlovin/video/7706089809093102849',
        category: 'TikTok Clip',
        title: 'Masterpiece',
        desc: 'Meccha Chameleon'
    },
    {
        url: 'https://www.tiktok.com/@jinlovin/video/7703934964303269141',
        category: 'TikTok Clip',
        title: 'พระคุ้มครอง',
        desc: 'Roblox'
    },
    {
        url: 'https://www.tiktok.com/@jinlovin/video/7696798880733695253',
        category: 'TikTok Clip',
        title: 'ผมเล่นเกมจับผิดภาพทุกวัน',
        desc: 'Meccha Chameleon'
    },
    {
        url: 'https://www.tiktok.com/@jinlovin/video/7679254023987301652',
        category: 'TikTok Clip',
        title: 'ตาตี่เป็นฝีไก่',
        desc: 'Valorant'
    },
    {
        url: 'https://www.tiktok.com/@jinlovin/video/7678557638015208711',
        category: 'TikTok Clip',
        title: 'แมสเต๊ด',
        desc: 'จับผิดภาพ'
    },
    {
        url: 'https://www.tiktok.com/@cookiesandcreamiscat/video/7494013567075634440',
        category: 'TikTok Clip',
        title: 'ชีสหน้าที่กู',
        desc: 'Live Highlight'
    },
    {
        url: 'https://www.tiktok.com/@cookiesandcreamiscat/video/7595038970757549330',
        category: 'TikTok Clip',
        title: 'ถ้าขับรถจะยากขนาดนี้ ลงเดินเองตั้งแต่แรก ป่านนี้ถึงบ้านไปละมั้ง',
        desc: 'Backseatdriver'
    },
    {
        url: 'https://www.tiktok.com/@cookiesandcreamiscat/video/7593178659079343368',
        category: 'TikTok Clip',
        title: 'พวกเราอยู่นี่ แล้วร่างอยู่ไหน!??',
        desc: 'Beaversbedammed'
    },
    {
        url: 'https://www.tiktok.com/@cookiesandcreamiscat/video/7481601310144367892',
        category: 'TikTok Clip',
        title: 'เมื่อเราอยากเป็นผอ.โรงเรียน| "ตัวไรอ๊า~~~"',
        desc: 'LetsSchool'
    },
    {
        url: 'https://www.tiktok.com/@jinlovin/video/7670250830519438609',
        category: 'TikTok Clip',
        title: 'อยากมีแฟนถึงขั้นดูหมอ',
        desc: 'Live Highlight'
    },
    {
        url: 'https://www.tiktok.com/@jinlovin/video/7646340231435685138',
        category: 'TikTok Clip',
        title: 'เองมีตัวตนรึไม่?',
        desc: 'Cs2'
    },
    {
        url: 'https://www.tiktok.com/@jinlovin/video/7641272337957981460',
        category: 'TikTok Clip',
        title: 'แชมเปอร์หิวน้ำ',
        desc: 'Valorant'
    }

];
// =====================================================================

var currentFilter = 'All';

function getVideoEmbedHTML(url) {
    try {
        url = (url || '').trim();
        var lowerUrl = url.toLowerCase();

        if (!url) {
            return '<div class="video-wrapper ratio-9-16"><div class="tiktok-fallback"><span>No URL Provided</span></div></div>';
        }

        // รองรับ Google Drive
        if (lowerUrl.indexOf('drive.google.com') !== -1) {
            var driveId = '';
            var matchFile = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            var matchIdParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);

            if (matchFile && matchFile[1]) {
                driveId = matchFile[1];
            } else if (matchIdParam && matchIdParam[1]) {
                driveId = matchIdParam[1];
            }

            if (driveId) {
                var drivePreviewUrl = 'https://drive.google.com/file/d/' + driveId + '/preview';
                return '<div class="video-wrapper ratio-9-16">' +
                       '<iframe src="' + drivePreviewUrl + '" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>' +
                       '</div>';
            }
        }

        // รองรับไฟล์วิดีโอจากคอมพิวเตอร์ (.mp4, .mov, .webm)
        var cleanPath = lowerUrl.split('?')[0];
        if (cleanPath.endsWith('.mp4') || cleanPath.endsWith('.mov') || cleanPath.endsWith('.webm') || cleanPath.endsWith('.m4v') || cleanPath.endsWith('.mkv')) {
            return '<div class="video-wrapper ratio-9-16">' +
                   '<video src="' + url + '" controls playsinline preload="metadata"></video>' +
                   '</div>';
        }

        // รองรับ TikTok
        if (lowerUrl.indexOf('tiktok.com') !== -1) {
            var match = url.match(/\/video\/(\d+)/);
            if (match && match[1]) {
                var tiktokId = match[1];
                return '<div class="tiktok-scale-box">' +
                       '<iframe src="https://www.tiktok.com/embed/v2/' + tiktokId + '?lang=en-US" allowfullscreen loading="lazy" scrolling="no"></iframe>' +
                       '</div>';
            } else {
                return '<div class="tiktok-scale-box">' +
                       '<div class="tiktok-fallback">' +
                       '<span>TikTok Video</span>' +
                       '<a href="' + url + '" target="_blank" rel="noopener" class="tiktok-btn">Watch on TikTok</a>' +
                       '</div>' +
                       '</div>';
            }
        }

        // รองรับ YouTube Shorts / YouTube / Vimeo
        var embedUrl = url;
        if (url.indexOf('youtube.com/shorts/') !== -1) {
            var id = url.split('youtube.com/shorts/')[1].split('?')[0];
            embedUrl = 'https://www.youtube.com/embed/' + id;
        } else if (url.indexOf('youtube.com/watch?v=') !== -1) {
            var id = url.split('v=')[1].split('&')[0];
            embedUrl = 'https://www.youtube.com/embed/' + id;
        } else if (url.indexOf('youtu.be/') !== -1) {
            var id = url.split('youtu.be/')[1].split('?')[0];
            embedUrl = 'https://www.youtube.com/embed/' + id;
        } else if (url.indexOf('vimeo.com/') !== -1 && url.indexOf('player.vimeo.com') === -1) {
            var id = url.split('vimeo.com/')[1].split('?')[0];
            embedUrl = 'https://player.vimeo.com/video/' + id;
        }

        return '<div class="video-wrapper ratio-9-16"><iframe src="' + embedUrl + '" allowfullscreen loading="lazy"></iframe></div>';
    } catch (err) {
        console.error("Error embedding video:", err);
        return '<div class="video-wrapper ratio-9-16"><div class="tiktok-fallback"><span>Error Loading Video</span></div></div>';
    }
}

// สร้างปุ่มกรองหมวดหมู่จาก desc อัตโนมัติ (All + หมวดหมู่ที่ไม่ซ้ำกัน)
function buildFilterButtons() {
    var filterBar = document.getElementById('dynamic-filter-bar');
    if (!filterBar) return;

    var categories = ['All'];
    for (var i = 0; i < portfolioVideos.length; i++) {
        var descVal = (portfolioVideos[i].desc || '').trim();
        if (descVal && categories.indexOf(descVal) === -1) {
            categories.push(descVal);
        }
    }

    filterBar.innerHTML = '';
    for (var j = 0; j < categories.length; j++) {
        var cat = categories[j];
        var isActive = (cat === currentFilter) ? ' active' : '';
        var btn = document.createElement('button');
        btn.className = 'filter-btn' + isActive;
        btn.textContent = cat;
        btn.setAttribute('data-filter', cat);
        btn.addEventListener('click', (function(selectedCat) {
            return function() {
                filterByDesc(selectedCat);
            };
        })(cat));
        filterBar.appendChild(btn);
    }
}

function filterByDesc(category) {
    currentFilter = category;
    
    var btns = document.querySelectorAll('#dynamic-filter-bar .filter-btn');
    for (var i = 0; i < btns.length; i++) {
        var btnCat = btns[i].getAttribute('data-filter');
        btns[i].classList.toggle('active', btnCat === category);
    }

    renderVideos();
}

function renderVideos() {
    var listV = document.getElementById('list-vertical');
    var counter = document.getElementById('work-counter');
    if (!listV) return;

    listV.innerHTML = '';
    var shownCount = 0;

    for (var i = 0; i < portfolioVideos.length; i++) {
        var video = portfolioVideos[i];
        var videoDesc = (video.desc || '').trim();

        if (currentFilter !== 'All' && videoDesc !== currentFilter) {
            continue;
        }

        shownCount++;
        var playerHTML = getVideoEmbedHTML(video.url);
        
        var card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = 
            playerHTML +
            '<div class="video-info">' +
                '<span class="video-tag-badge">' + (videoDesc || 'Clip') + '</span>' +
                '<h3 class="video-title">' + (video.title || 'Untitled Work') + '</h3>' +
                '<p class="video-desc-sub">' + (video.category || 'TikTok Clip') + '</p>' +
            '</div>';

        var badge = card.querySelector('.video-tag-badge');
        if (badge) {
            badge.addEventListener('click', (function(selectedDesc) {
                return function() {
                    filterByDesc(selectedDesc);
                };
            })(videoDesc));
        }

        listV.appendChild(card);
    }

    if (counter) {
        counter.textContent = shownCount + (shownCount === 1 ? ' Clip' : ' Clips');
    }

    resizeTikTokEmbeds();
}

function navigateTo(pageName) {
    var pages = document.querySelectorAll('.page-view');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }

    var targetPage = document.getElementById('page-' + pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    var navLinks = document.querySelectorAll('.nav-link');
    for (var j = 0; j < navLinks.length; j++) {
        var btnPage = navLinks[j].getAttribute('data-page');
        navLinks[j].classList.toggle('active', btnPage === pageName);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    if (pageName === 'works') {
        setTimeout(resizeTikTokEmbeds, 50);
    }
}

function resizeTikTokEmbeds() {
    var boxes = document.querySelectorAll('.tiktok-scale-box');
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        var iframe = box.querySelector('iframe');
        if (iframe) {
            var containerWidth = box.offsetWidth;
            if (containerWidth > 0) {
                var scale = containerWidth / 325;
                iframe.style.transform = 'scale(' + scale + ')';
            }
        }
    }
}

// ผูกปุ่มนำทาง (Home / Works / Contact) ใน JS ล้วน
function initNavigation() {
    var logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            navigateTo('home');
        });
    }

    var navButtons = document.querySelectorAll('.nav-link[data-page]');
    navButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var page = btn.getAttribute('data-page');
            navigateTo(page);
        });
    });

    var actionButtons = document.querySelectorAll('[data-target]');
    actionButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var target = btn.getAttribute('data-target');
            navigateTo(target);
        });
    });
}

// เอฟเฟกต์แสงพื้นหลังตามเมาส์หน้า Home
document.addEventListener('mousemove', function(e) {
    var homePage = document.getElementById('page-home');
    if (!homePage) return;

    var x = (e.clientX / window.innerWidth) * 100;
    var y = (e.clientY / window.innerHeight) * 100;

    homePage.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, #181818 0%, #0a0a0a 100%)';
});

// เอฟเฟกต์ปุ่มแม่เหล็กหน้า Home
var magneticButtons = document.querySelectorAll('.home-actions .btn-primary, .home-actions .btn-outline');
magneticButtons.forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
    });

    btn.addEventListener('mouseleave', function() {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

window.addEventListener('load', function() {
    initNavigation();
    buildFilterButtons();
    renderVideos();
});
window.addEventListener('resize', resizeTikTokEmbeds);