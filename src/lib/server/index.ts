// import { pb } from "$lib/pocketbase";
import { loadCompany } from "./base";
import { loadPersonnel } from "./artist";
import { createArt, loadArts, updateArt, loadSingleArt } from "./art";
import { createAlbum, loadAlbums, loadArtistAlbums, loadSingleAlbum, updateAlbum } from "./albums";

export {
    loadCompany,
    loadPersonnel,
    createArt,
    loadArts,
    updateArt,
    loadSingleArt,
    loadAlbums, 
    loadSingleAlbum,
    createAlbum, 
    loadArtistAlbums,
    updateAlbum,
}