// SWAMI KARUPPASWAMI THUNNAI

import React, { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import {Image} from "react-native";
import FluidCache from './FluidCache';

const FluidImage = (props) => 
{
    let thumbnail = props.thumbnail_url;
    let full_size = props.url;
    const [image, setImage] = useState(null);
    const [blur_radius, setBlurRadius] = useState(0);

    useEffect(() => {
        downloader();
    }, []);

    const name_gen = () => {
        let seconds = new Date().getTime() / 1000;
        seconds = seconds.toString();
        return seconds;
    }

    const downloader = async() => {
        let cache = new FluidCache();
        // If the thumbnail file is not there in cache download it
        let thumbnail_cache = await cache.check_cache(thumbnail);
        if(!thumbnail_cache.exists)
        {
            FileSystem.downloadAsync(thumbnail, thumbnail_cache.name).then(thumbnail_result  => {
                if(thumbnail_result.status == 200)
                {
                    setBlurRadius(1);
                    setImage(thumbnail_result.uri);
                }
            });
        }
        else
        {
            setBlurRadius(1);
            setImage(thumbnail_cache.name);
        }
        // If the actual image is not there then download it
        let image_cache = await cache.check_cache(full_size);
        if(!image_cache.exists)
        {
            FileSystem.downloadAsync(full_size, image_cache.name).then(full_result => {
                if(full_result.status == 200)
                {
                    setImage(full_result.uri);
                    setBlurRadius(0);
                }
            }); 
        }
        else
        {
            setImage(image_cache.name);
            setBlurRadius(0);
        }
        
    }

    return (
        <Image
            source={{uri: image}}
            style={props.style}
            blurRadius={blur_radius}
        />
    );
}

export default FluidImage;