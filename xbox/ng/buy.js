let url = $request.url;

let urlObj = new URL(url);

if (urlObj.searchParams.has('locale')) {
    urlObj.searchParams.set('locale', 'en-ng');
}

let newUrl = urlObj.toString();

$done({url: newUrl});
