const apps = [
  {name:'Jellyfin (8096)',url:'http://192.168.1.0:8096',icon:'🎬'},
  {name:'Prometheus (9090)',url:'http://192.168.1.0:9090',icon:'🛰️'},
  {name:'Grafana (3000)',url:'http://192.168.1.0:3000',icon:'📊'},
  {name:'Spoolman (7912)',url:'http://192.168.1.0:7912',icon:'🖨️'},
  {name:'Klipper - 3D Printer',url:'http://192.168.1.0/',icon:'🖨️'},
  {name:'Octoprint',url:'http://192.168.1.0:5000',icon:'🖨️'},
];

const webs = [
  {name:'Google',url:'https://google.com/',icon:'🔍'},
  {name:'Gmail',url:'https://mail.google.com/',icon:'📧'},
  {name:'Youtube',url:'https://youtube.com/',icon:'📺'},
];

const games = [
  {name:'PhpMyAdmin',url:'https://192.168.1.0:8080/',icon:'🎮'},
  {name:'Minecraft DynMap',url:'http://192.168.1.0:8123/',icon:'⛏️'},
]

let tiles = [];

function render(list, element){
  const grid = document.getElementById(element);
  grid.innerHTML = '';
  tiles = list.map((a,i)=>{
    const el = document.createElement('button');
    el.className = 'tile';
    el.type = 'button';
    el.setAttribute('role','listitem');
    el.tabIndex = 0;
    el.innerHTML = `<span class="icon">${a.icon}</span><span class="label"><span class="name">${a.name}</span><span class="url">${a.url}</span></span>`;
    el.onclick = ()=>openApp(a.url);
    el.onkeydown = (e)=>{
      if(e.key==='Enter') openApp(a.url);
    };
    grid.appendChild(el);
    return el;
  });
}

function openApp(url){
  window.open(url,'_blank');
}

// search
const input = document.getElementById('search');
input.addEventListener('input', ()=>{
  const q = input.value.trim().toLowerCase();
  const filteredapps = apps.filter(a=> (a.name + ' ' + a.url).toLowerCase().includes(q));
  const filteredwebs = webs.filter(a=> (a.name + ' ' + a.url).toLowerCase().includes(q));
  const filteredgames = games.filter(a=> (a.name + ' ' + a.url).toLowerCase().includes(q));

  render(filteredapps, 'app-grid');
  render(filteredwebs, 'web-grid');
  render(filteredgames, 'game-grid');
});

// keyboard navigation across tiles
document.addEventListener('keydown', (e)=>{
  const focused = document.activeElement;
  const idx = tiles.indexOf(focused);
  if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
    const next = tiles[(idx+1) % tiles.length]; if(next) next.focus();
  } else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
    const prev = tiles[(idx-1+tiles.length) % tiles.length]; if(prev) prev.focus();
  }
});

function focusFirst(){ if(tiles[0]) tiles[0].focus(); }

// initial render
render(apps, 'app-grid');
render(webs, 'web-grid');
render(games, 'game-grid');
focusFirst();
