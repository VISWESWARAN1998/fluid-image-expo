// SWAMI KARUPPASWAMI THUNNAI

import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';


export default class FluidCache
{
    async check_cache(url)
    {
        const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.MD5, url);
        let thumbnail_file_name =  FileSystem.cacheDirectory + digest + ".fluid";
        let thumbnail_exists = await FileSystem.getInfoAsync(thumbnail_file_name);
        return {
            exists: thumbnail_exists.exists,
            name: thumbnail_file_name
        };
    }
}