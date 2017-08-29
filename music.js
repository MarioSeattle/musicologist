const musicInfo = [];
const playlist = [];

function findTerm(term){
    let url = "https://itunes.apple.com/search?media=music&entity=musicTrack&term=" + term

    //ajax call
    $.getJSON(
        url,
        function(data, status){
            if (status === "success"){
                let results = data["results"];
                let count = 0;
                for(let i=0; i<results.length; i++){
                    let artist = results[i]["artistName"]
                    let track = results[i]["trackName"]
                    let url = results[i]["trackViewUrl"]

                    playlist.push({
                        "artist": artist,
                        "track": track,
                        "url": url
                    })

                    count ++;
                    if(count >= 5){
                        break;
                    }
                }
            }
        }
    )
}

function addSongFromField(event) {
    event.preventDefault();

    const info = $('#musicField').eq(0).val();

    // find therm in itunes
    findTerm(info);
    musicInfo.push(info);
    renderList();
    $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
    if (event.which == 13) { // User presses Enter
        addSongFromField(event);
    }
});

function renderList() {
    const $list = $('.info').eq(0);

    $list.empty();

    for (const info of musicInfo) {
        const $item = $('<li class="list-group-item">').text(info);

        $list.append($item)
    }
}

$('#getPlaylistBtn').click(function (event) {
    // TODO: Display a list of music.
    // You may use anything from musicInfo.
    console.log('Testing Music Call');

    const $results = $('.results').eq(0);

    $results.empty();

    for (const track of playlist) {
        let $item = $('<li class="list-group-item">').text(track.track);

        $results.append($item)
    }
});
