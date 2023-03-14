<?php

namespace App\Facade;

use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Img extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'img';
    }

    /**
     * @param $img
     * @return string|null
     */
    public static function uploadToS3($img): ?string
    {
        if (!is_null($img)) {
            $nameFileForAmazon = '/' . config('app.key') . "/images/user/" . \Auth::user()->id . '/'
                . md5($img->getClientOriginalName()) . "."
                . $img->getClientOriginalExtension();
            Storage::disk('s3')->put($nameFileForAmazon, file_get_contents($img));

            return config('filesystems.disks.s3.url') . $nameFileForAmazon;
        }

        return null;
    }
}
