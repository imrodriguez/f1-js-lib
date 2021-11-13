const fetchHTML = async (url:string):Promise<string> => {
    try {
        return await fetch(url).then(res => res.text());
    } catch {
        return 'error';
    }
};

export { fetchHTML };