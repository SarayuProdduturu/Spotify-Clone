console.log("hello");
const music = new Audio("audio/1.mp3");
let songitem = Array.from(document.getElementsByClassName("music_list"));

const songs = [
    {
        id:'1',
        songName: 'Excuses',
        artistName: 'AP Dhillon',
        poster: "img/1.jpg"


    },
    {
        id: '2',
        songName:'Rim Vs Jhanjar',
        artistName: 'Karan Aujla',
        poster: "img/2.jpg"


    },
    {
        id: '3',
        songName:'Thodi Der',
        artistName: 'Farhan Saeed',
        poster: "img/3.jpg"


    },
    {
        id: '4',
        songName:'Lost Love ',
        artistName: 'Prem Dhillon',
        poster: "img/4.jpg"


    },
    {
        id: '5',
        songName:'Tenu Na Bol Pawaan',
        artistName: 'Yasser, Jyotica',
        poster: "img/5.jpg"


    }
    ,
    {
        id: '6',
        songName:'Guitar Sikhda ',
        artistName: 'Jassie Gill',
        poster: "img/6.jpg"


    },
    {
        id: '7',
        songName:'Gaddi Pichhe...',
        artistName: 'Khan Bhaini, Shipra',
        poster: "img/7.jpg"


    },
    {
        id: '8',
        songName:'Ghungroo ',
        artistName: 'Vishal-Shekhar',
        poster: "img/8.jpg"


    },
    {
        id: '9',
        songName:'Hukam',
        artistName: 'Karan Aujla',
        poster: "img/9.jpg"


    },
    {
        id: '10',
        songName:"Don't look" ,  
        artistName: 'Karan Aujla',
        poster: "img/10.jpg"


    },
    {
        id: '11',
        songName:'Brown Munde',
        artistName: 'AP Dhillon',
        poster: "img/11.jpg"


    },
    {
        id: '12',
        songName:'Adhiya',
        artistName: 'Karan Aujla',
        poster: "img/12.jpg"


    },
    {
        id: '13',
        songName:'Raule',
        artistName: 'Jassa Dhillon',
        poster: "img/13.jpg"


    },
    {
        id: '14',
        songName:'Mere Sohneya',
        artistName: 'Sachet Tandon',
        poster: "img/14.jpg"


    },
    {
        id: '15',
        songName:'How You Like That',
        artistName: 'Blackpink',
        poster: "img/15.jpg"


    },
    {
        id: '16',
        songName:'Darasal',
        artistName: 'Atif Aslam',
        poster: "img/16.jpg"


    }
]
//Music Box

let music_list = Array.from(document.getElementsByClassName("music_list"));

music_list.forEach((element, i) => {
    element.getElementsByTagName('h4')[0].innerHTML = songs[i].songName;
    element.getElementsByTagName('h6')[0].innerHTML = songs[i].artistName;
})
/*
Array.from(document.getElementsByClassName('music_list')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h4')[0].innerHTML = songs[i].songName;
    element.getElementsByTagName('h6')[0].innerHTML = songs[i].artistName;
})*/

//Popular songs
Array.from(document.getElementsByClassName('songitem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
    element.getElementsByTagName('h6')[0].innerHTML = songs[i].artistName;
})

//Master Play
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];


masterPlay.addEventListener('click', ()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
        
    }
} )

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
            
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `audio/${index}.mp3`;
        poster_master_play.src =`img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        })
    })
})
//Time update//
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})
//volume
let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})
//Volume ends//
//back and next buttons//

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songitem')).length;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src =`img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    
})
next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songitem')).length) {
        index = 1;
        }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src =`img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    
    
})
//left and right scrolling//
let leftscroll = document.getElementById('leftscroll');
let rightscroll = document.getElementById('rightscroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

leftscroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})
rightscroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})

//pause and play//
let play_song = false;
let obj = {
    temp: 0
};

Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
    const play_music = (e, index, obj) => {
        play_song = true;
        obj.temp = index;
        makeallplays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `${index}.mp3`;
        music.play();
        console.log("play_music");

    }

    const control_music = (e, index, obj) => {
        play_song = true;
        obj.temp = index;
        music.pause();
        makeallplays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `${index}.mp3`;
        music.play();
        console.log("control_music");
        

    }

    const pause_music = (e) => {
        music.pause();
        play_song = false;
        e.target.classList.add('bi-play-circle-fill');
        e.target.classList.remove('bi-pause-circle-fill');
        console.log("pause_music");
       

    }

    element.addEventListener('click', (e) => {

        index = e.target.id;
        if (play_song == false && index != obj.temp) {
            play_music(e, index, obj);
            

        }
        else if (play_song == true && index == obj.temp) {
            pause_music(e);
            

        }
        else if (play_song == true && index != obj.temp) {
            control_music(e, index, obj);
           
        }
        else{
            play_music(e, index, obj);

        }
    })
})


