/* ==========
  Background Video Controls 1.0.0
  Video Elements For Sqaurespace
  Copyright Will-Myers
========== */
(function(){
  function checkIfWebKit() {
    var ua = navigator.userAgent.toLowerCase();

    var isWebKit = false;

    if ((ua.indexOf("chrome") === ua.indexOf("android")) && ua.indexOf("safari") !== -1) {
      // accessed via a WebKit-based browser
      isWebKit = true;
    } else {
      // check if accessed via a WebKit-based webview
      if ((ua.indexOf("ipad") !== -1) || (ua.indexOf("iphone") !== -1) || (ua.indexOf("ipod") !== -1)) {
        isWebKit = true;
      } else {
        isWebKit = false;
      }
    }

    return isWebKit;
  }
  
  function buildHTML(section, params) {
    let vid,
        n = 0;
    /*Cycle Until Video is Loaded*/
    let cycleCheck = setInterval(checkVideoLoad, 100);

    function checkVideoLoad() {
      vid = section.querySelector('.sqs-video-background-native video');

      if (vid) { 
        clearInterval(cycleCheck)
        vid.addEventListener('canplay', buildVideoEl);
        if(checkIfWebKit()){
          vid.load();
        }
      }
      n++
      if (n > 20) {
        clearInterval(cycleCheck);
      };
    }


    function buildVideoEl() {
      let el = section.querySelector('[data-wm-plugin="background-video"]'),
          volumeControl = document.createElement('button'),
          playPauseControl = document.createElement('button'),
          volume = parseFloat(params.volumeState) / 100,
          volumeOnWhenPlaying = JSON.parse(params.volumeOnWhenPlaying),
          userPaused,
          volumeBtn,
          playBtn, 
          pauseBtn,
          replayBtn,
          volumeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="title" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> 
          <title>Background Video Mute Button</title> 
          <path data-name="low-volume" d="M40.2 21.8a12 12 0 0 1 0 20.5" fill="none" stroke="var(--icon-color)" stroke-miterlimit="10" stroke-width="var(--icon-stroke-width)" stroke-linejoin="round" stroke-linecap="round"></path> 
           <path data-name="medium-volume" d="M46 16a20 20 0 0 1 0 32" fill="none" stroke="var(--icon-color)" stroke-miterlimit="10" stroke-width="var(--icon-stroke-width)" stroke-linejoin="round" stroke-linecap="round"></path> 
           <path data-name="high-volume" d="M51.8 10.2a28 28 0 0 1 .1 43.5" fill="none" stroke="var(--icon-color)" stroke-miterlimit="10" stroke-width="var(--icon-stroke-width)" stroke-linejoin="round" stroke-linecap="round"></path> 
          <path data-name="main-layer" d="M34 6L16 24H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12l18 18z" fill="var(--icon-fill)" stroke="var(--icon-color)" stroke-miterlimit="10" stroke-width="var(--icon-stroke-width)" stroke-linejoin="round" stroke-linecap="round"></path> 
          <path data-name="mute-layer" d="M6 6L58 58" fill="none" stroke="var(--icon-color)" stroke-miterlimit="10" stroke-width="var(--icon-stroke-width)" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>`,
          playSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="title" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Play Background Video</title> <path data-name="layer1" fill="var(--icon-fill)" stroke="var(--icon-color)" stroke-miterlimit="10" stroke-width="var(--icon-stroke-width)" d="M16 6 L58 32 L16 58V6z" stroke-linejoin="round" stroke-linecap="round"></path> </svg>`,
          pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="title" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Pause Background Video</title> <path data-name="layer2" fill="var(--icon-fill)" stroke="var(--icon-color)" stroke-miterlimit="10" stroke-width="var(--icon-stroke-width)" d="M13 8h12V56H13z" stroke-linejoin="round" stroke-linecap="round"></path> <path data-name="layer1" fill="var(--icon-fill)" stroke="var(--icon-color)" stroke-miterlimit="10" stroke-width="var(--icon-stroke-width)" d="M41 8h12V56H41z" stroke-linejoin="round" stroke-linecap="round"></path> </svg>`,
          replaySVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title" aria-describedby="title" role="img" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>Replay Background Video</title> <path data-name="layer2" d="M53.832 34.947a26.016 26.016 0 1 0-7.45 15.432" fill="none" stroke="var(--icon-color)" stroke-miterlimit="10" stroke-width="var(--icon-stroke-width)" stroke-linejoin="round" stroke-linecap="round"></path> <path data-name="layer1" fill="none" stroke="var(--icon-color)" stroke-miterlimit="10" stroke-width="var(--icon-stroke-width)" d="M62 23l-8.168 11.947L43.014 25" stroke-linejoin="round" stroke-linecap="round"></path> </svg>`;

      volumeControl.classList.add('wm-background-video-control', 'volume-control');
      playPauseControl.classList.add('wm-background-video-control', 'play-pause-control');

      volumeControl.style.opacity = 0;
      volumeControl.style.transform = 'translateY(10px)';
      playPauseControl.style.opacity = 0;
      playPauseControl.style.transform = 'translateY(10px)';

      volumeControl.innerHTML = `${volumeSVG}`;
      playPauseControl.innerHTML = `${playSVG}
    ${pauseSVG}
    ${replaySVG}`;

      volumeBtn = volumeControl.querySelector(':scope > :nth-child(1)');
      playBtn = playPauseControl.querySelector(':scope > :nth-child(1)');
      pauseBtn = playPauseControl.querySelector(':scope > :nth-child(2)');
      replayBtn = playPauseControl.querySelector(':scope > :nth-child(3)');

      volumeBtn.classList.add('volume-svg');
      playBtn.classList.add('play-svg');
      pauseBtn.classList.add('pause-svg');
      replayBtn.classList.add('replay-svg');

      section.append(volumeControl);
      section.append(playPauseControl);

      /*Display Buttons?*/
      if (params.volumeBtn == 'false') {
        volumeControl.style.display = 'none'
      }
      if (params.playPauseBtn == 'false') {
        playPauseControl.style.display = 'none'
      }
      if (params.onlyPlayInView == 'false'){
        params.onlyPlayInView = false;
      }
      
      /*Animate In Icons*/
      if (document.body.classList.contains('wm-background-video-css-loaded')) {
        setTimeout(fadeIn, 300)
      } else {
        window.addEventListener('wmBackgroundVideoCSSLoaded', function(){
          setTimeout(fadeIn, 300)
        });
      }
      function fadeIn() {
        volumeControl.style.opacity = null;
        playPauseControl.style.opacity = null;
        volumeControl.style.transform = null;
        playPauseControl.style.transform = null;
        volumeControl.classList.add('loaded');
        playPauseControl.classList.add('loaded');
      }

      /*Set Only-Play-In-View*/
      if(!!window.IntersectionObserver && params.onlyPlayInView){
        let observer = new IntersectionObserver((entries, observer) => { 
          entries.forEach(entry => {
            if(entry.intersectionRatio > .3 && !userPaused) {
              playVideo(); 
            } else if (!userPaused) {
              pauseVideo();
            }
          });
        }, {threshold: .3});
        observer.observe(vid) ;
      }
      
      /*Set Loop*/
      if (params.loop == 'false') {
        vid.loop = false;
      }

      el.classList.add('loaded');

      /*Create Functions*/
      /*Init User Interaction Functions*/
      if (vid.paused) {
        vid.play();
        pauseVideo();
      } else if (!vid.paused) {
        playVideo();
      }
      
      section.dataset.backgroundVideoVolume = '0';
      volumeControl.addEventListener('click',toggleMute);
      vid.addEventListener('ended', videoEnded);
      playPauseControl.addEventListener('click', togglePlayPause);
      vid.addEventListener('pause', function() {
        section.dataset.backgroundVideoState = 'paused'
      });
      vid.addEventListener('play', function() {
        section.dataset.backgroundVideoState = 'playing'
      });

      /*Set Initial State*/
      if (params.initialState == 'playing') {
        section.dataset.backgroundVideoState = 'playing';
        userPaused = false; 
      }
      if (params.initialState == 'paused') {
        vid.removeAttribute('autoplay');
        section.dataset.backgroundVideoState = 'paused';
        vid.pause;
        userPaused = true; 
      }

      function togglePlayPause() {
        if (vid.paused) {
          userPaused = false;
          playVideo();
        } else if (!vid.paused) {
          userPaused = true;
          pauseVideo();
        }
      }
      
      function videoEnded() {
        if (vid.loop == false) {
          section.dataset.backgroundVideoState = 'ended'
        }
      }

      function toggleMute() {
        if (vid.muted) {
          unMuteVideo();
        } else {
          muteVideo();
        }
      }

      function muteVideo(){
        volume = vid.volume;
        vid.muted = true;
        vid.volume = 0;
        section.dataset.backgroundVideoVolume = vid.volume;
      }

      function unMuteVideo(){
        vid.muted = false;
        vid.volume = volume;
        section.dataset.backgroundVideoVolume = vid.volume;
      }

      function playVideo() {
        vid.play();
        section.dataset.backgroundVideoState = 'playing';
        if (volumeOnWhenPlaying) unMuteVideo();
      }
      function pauseVideo() {
        vid.pause();
        section.dataset.backgroundVideoState = 'paused';
        if (volumeOnWhenPlaying) muteVideo();
      }
    }
  }

  function init(){
    let vids = document.querySelectorAll('[data-wm-plugin="background-video"]:not(.loaded)');
    if (vids.length !== 0){
      vids.forEach(vid => {
        let section = vid.closest('.page-section'),
            params = {
              initialState: vid.dataset.initialState || 'playing',
              loop: vid.dataset.loop || 'true',
              volumeBtn: vid.dataset.volumeControl || 'true',
              volumeOnWhenPlaying: vid.dataset.volumeOnWhenPlaying || 'false',
              volumeState: vid.dataset.initialVolume || '50%',
              playPauseBtn: vid.dataset.playPauseControl || 'true',
              onlyPlayInView: vid.dataset.playInView || 'false'
            };
        //console.log(params.onlyPlayInView)
        buildHTML(section, params);
      });
    }

    let cssURL = 'https://cdn.jsdelivr.net/gh/willmyethewebsiteguy/backgroundVideoControls@1/styles.min.css';
    if(!document.querySelector('#wm-background-video-css')){
      addCSSFileToHeader(cssURL);
      function addCSSFileToHeader(url) {
        let head = document.getElementsByTagName('head')[0],
            link = document.createElement('link');
        link.id = 'wm-background-video-css'
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        link.onload = function(){
          document.querySelector('body').classList.add('wm-background-video-css-loaded');
          window.dispatchEvent(new Event('wmBackgroundVideoCSSLoaded'));
        }
        head.prepend(link);
      };
    } else {
      document.querySelector('body').classList.add('wm-background-video-css-loaded');
      window.dispatchEvent(new Event('wmBackgroundVideoCSSLoaded'));
    }
  }
  ['load', 'wMPopupBuilt'].forEach(event => {
    window.addEventListener(event, function(){
      init();
    })
  })
}());
