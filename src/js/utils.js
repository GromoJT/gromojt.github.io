export function slugify(text){
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g,'-')
        .replace(/[^\w-]+/g,'')
        .replace(/--+/g,'-')
        .replace(/^-+/,'')
        .replace(/-+$/,'');
}

export function formatDate(date){
    return new Date(date).toLocaleDateString('pl-PL',{
        timeZone: "UTC",
        
    });
}

export function formatBlogPosts(posts, {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
} ={}){
    const filteredPosts = posts.reduce((acc,post) => {
        const {date,draft} = post.data;
        //filterOutDrafts is true
        if(filterOutDrafts && draft) return acc;
        //filterOutFuturePosts if true
        if(filterOutFuturePosts && new Date(date) > new Date()) return acc;

        //add post to acc
        acc.push(post)

        return acc;
    },[])

    // sort by date or randomize
    if(sortByDate){
        filteredPosts.sort((a,b) => new Date(b.data.date) - new Date(a.data.date));
    } else {
        filteredPosts.sort(() => Math.random() - 0.5 )
    }

    if(typeof limit === "number"){
        return filteredPosts.slice(0,limit);
    }
    return filteredPosts;
}