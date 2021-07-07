const $video = document.getElementById('video');
const $play = document.getElementById('play')
const $pause = document.getElementById('pause')
const $backward = document.getElementById('backward')
const $forward = document.getElementById('forward')
const $title = document.getElementById('video-player__title')
const $input = document.getElementById('input')
const $song = document.getElementById('input-song')
const $loadBar = document.getElementById('load-bar')

console.log($video.title)
$video.addEventListener('loadedmetadata', (e) =>{
    console.log(e)
    $song.max = $video.duration
    // $song.setAttribute('max', Number.parseInt($video.duration))
})
$video.addEventListener('timeupdate', () =>{
    $song.value = $video.currentTime
    
})

$play.addEventListener('click', () =>{
    $video.play();
    $play.hidden = true;
    $pause.hidden = false;
    $song.max = $video.duration
    
})
$pause.addEventListener('click', () =>{
    $video.pause();
    $play.hidden = false;
    $pause.hidden = true;
})
$backward.addEventListener('click', () =>{
    $video.currentTime -= 10
})

$forward.addEventListener('click', () =>{
    $video.currentTime += 10
})

const root = document.documentElement



$song.addEventListener('change', () =>{
    $video.currentTime = $song.value
})

$input.addEventListener('change', (e) =>{
    $loadBar.style.visibility = "visible"
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.addEventListener('load', (e) =>{
        
        $video.setAttribute('src', e.target.result)
    })

    fileReader.addEventListener('progress', (e) => {
        root.style.setProperty('--load-width', Number.parseInt((e.loaded * 100) / e.total) + '%')
    })

    fileReader.addEventListener('loadend', () => { 
        root.style.setProperty('--load-width', '100%')
    })
    
})