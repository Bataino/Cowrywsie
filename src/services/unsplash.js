{
var accessKey = await import.meta.env.VITE_UNSPLASH_KEY;
console.log("ACCESS", accessKey) // Replace with your Unsplash API Access Key
var randomUrl = `https://api.unsplash.com/photos?client_id=${accessKey}&count=10`; // Fetch 10 random photos
var searchUrl = `https://api.unsplash.com/search/photos?client_id=${accessKey}&count=10&query=`; //

}

export { randomUrl, searchUrl, accessKey }