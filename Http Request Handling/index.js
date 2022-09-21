"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getAllEpisodesBaseUrl = "https://rickandmortyapi.com/api/episode";
const getAllCharactersBaseUrl = "https://rickandmortyapi.com/api/character";
var allEpisodes = [];
var allCharacters = [];
function getAllRickAndMortyEpisodes(page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${getAllEpisodesBaseUrl}/?page=${page}`);
        if (res.ok) {
            yield res.json()
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                allEpisodes.push(...res.results);
                if (res.info.next) {
                    yield getAllRickAndMortyEpisodes(page + 1);
                }
            }));
        }
    });
}
function getAllRickAndMortyCharacters(page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${getAllCharactersBaseUrl}/?page=${page}`);
        if (res.ok) {
            yield res.json()
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                allCharacters.push(...res.results);
                if (res.info.next) {
                    yield getAllRickAndMortyCharacters(page + 1);
                }
            }));
        }
    });
}
function replaceCharacterUrlFromCharacterObjInAllEpisodes() {
    allEpisodes.forEach(episode => {
        let characterUrls = episode.characters;
        episode.characters = [];
        characterUrls.forEach(characterUrl => {
            var characterObj = allCharacters.find(a => a.url == characterUrl);
            episode.characters.push(characterObj);
        });
    });
}
function initiate() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getAllRickAndMortyEpisodes();
        yield getAllRickAndMortyCharacters();
        replaceCharacterUrlFromCharacterObjInAllEpisodes();
        console.info(allEpisodes);
    });
}
initiate();
