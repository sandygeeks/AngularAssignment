const getAllEpisodesBaseUrl: string = "https://rickandmortyapi.com/api/episode";
const getAllCharactersBaseUrl: string = "https://rickandmortyapi.com/api/character";

var allEpisodes: any[] = [];
var allCharacters: any[] = [];


async function getAllRickAndMortyEpisodes(page: number = 1) {
    const res = await fetch(`${getAllEpisodesBaseUrl}/?page=${page}`);

    if (res.ok) {
        await res.json()
            .then(async res => {
                allEpisodes.push(...res.results);

                if (res.info.next) {
                    await getAllRickAndMortyEpisodes(page + 1)
                }
            });
    }
}

async function getAllRickAndMortyCharacters(page: number = 1) {
    const res = await fetch(`${getAllCharactersBaseUrl}/?page=${page}`);

    if (res.ok) {
        await res.json()
            .then(async res => {
                allCharacters.push(...res.results);

                if (res.info.next) {
                    await getAllRickAndMortyCharacters(page + 1);
                }
            });
    }
}

function replaceCharacterUrlFromCharacterObjInAllEpisodes() {
    allEpisodes.forEach(episode => {
        
        let characterUrls = episode.characters as any[];
        episode.characters = [];

        characterUrls.forEach(characterUrl => {
            var characterObj = allCharacters.find(a => a.url == characterUrl);
            episode.characters.push(characterObj);
        });

    });
}

async function initiate() {
    await getAllRickAndMortyEpisodes();

    await getAllRickAndMortyCharacters();

    replaceCharacterUrlFromCharacterObjInAllEpisodes();

    console.info(allEpisodes);

}

initiate();

