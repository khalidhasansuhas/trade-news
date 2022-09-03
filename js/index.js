const loadCategory = ()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => setAllCategories(data.data.news_category))
}

const setAllCategories = categories =>{
    
    // console.log(categories);
    
    const allCategory = document.getElementById('all-category');
    for (const category of categories){
        const li = document.createElement('li');
        li.innerHTML=`
        <a onclick="loadNewsByCategoryId('${category.category_id}')"
        class="block py-2 pr-4 pl-3 font-bold text-gray-700 rounded hover:bg-gray-100 hover:cursor-auto md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">${category.category_name}</a>
        `;
        allCategory.appendChild(li);
    }
}
 const loadNewsByCategoryId = (id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then (data => displayNewsByCategoryId(data.data))
 }

const displayNewsByCategoryId = data =>{
    // console.log(data);
    const allCategoryNewsDetails = document.getElementById('news-container');
    allCategoryNewsDetails.textContent=``;
    data.forEach(news => {
        console.log(news);
        const {image_url,title,total_view,_id,details,author} = news;
        const {img,name,published_date} = author;
        const newsDiv = document.createElement('div')
        newsDiv.innerHTML=`
        <div
                class="flex flex-col items-center w-full bg-white rounded-lg border md:flex-row m-auto mb-5">
                <img class="object-cover w-96 h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src="${image_url}" alt="">
                <div class="flex flex-col justify-between p-4  leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${details.length > 200 ? details.slice(0,200)+ '...':details}</p>

                        <div class="flex flex-row w-full justify-between items-center">
                            <div class="flex flex-row items-center">
                                <div>
                                    <img class="w-8 h-8 rounded-full" src="${img}" alt="Author Image">
                                </div>
                                <div class="pl-3">
                                    <h3 class="font-semibold">${name}</h3>
                                    <h3>${published_date}</h3>
                                </div>
                            </div>
                            <div>
                                <span><i class="fa-regular fa-eye"></i></span> 
                                <span class="font-semibold">${total_view}</span>
                            </div>
                            <div class="flex items-center mt-2.5 mb-5">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">4.5</span>
                            </div>
                            <div>
                                <button type="button"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">View Details</button>
                            </div>
                        </div>
                 </div>
                </div>
        
        `;
        allCategoryNewsDetails.appendChild(newsDiv);
    });
}


loadCategory();
