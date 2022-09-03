const loadCategory = ()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => setAllCategories(data.data.news_category))
    .catch(error => console.log(error))
}

const setAllCategories = categories =>{
    
    // console.log(categories);
    
    const allCategory = document.getElementById('all-category');
    for (const category of categories){
        const li = document.createElement('li');
        li.innerHTML=`
        <a onclick="loadNewsByCategoryId('${category.category_id}')"
        class="block py-2 pr-4 pl-3 font-bold text-gray-700 rounded cursor-pointer md:border-0 md:hover:text-blue-700 md:p-0">${category.category_name}</a>
        `;
        allCategory.appendChild(li);
    }
}
 const loadNewsByCategoryId = (id) =>{
    toggleSpinner(true); //spinner start
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
    .then(res => res.json())
    .then (data => displayNewsByCategoryId(data.data))
    .catch(error => console.log(error))
 }
    

const displayNewsByCategoryId = data =>{
    // console.log(data);
    const itemFound = document.getElementById('items-found');
    itemFound.innerHTML=`
    <h1 class="pl-5 py-2">${data.length} News items found for this category </h1>
    `
    //data sorted by view count
    data.sort((a,b)=>{
        return b.total_view - a.total_view;
    })

    const allCategoryNewsDetails = document.getElementById('news-container');
    allCategoryNewsDetails.textContent=``;
    

    const noNews = document.getElementById('no-news-found');
    if (data.length === 0) {
        noNews.classList.remove('hidden'); 
    } else{
        noNews.classList.add('hidden')
    }

    data.forEach(news => {
        // console.log(news);
        const {image_url,title,total_view,_id,details,author,rating} = news;
        const {img,name,published_date} = author;
        const {number}= rating;
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
                            <div class="flex items-center >
                            <span class="font-semibold">View: ${total_view ? total_view : 'N/A' }</span>
                            </div>
                            <div class="flex items-center mt-2.5 mb-5">
                           
                            <span class="bg-blue-100 items-center text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">Rating: ${number}</span>
                        </div>
                            <div>
                            <label for="my-modal-3" onclick="getModalByNewsId('${_id}')" class="btn btn-primary modal-button">View Details</label>
                            </div>
                        </div>
                 </div>
                </div>
        
        `;
        allCategoryNewsDetails.appendChild(newsDiv);
    });
    toggleSpinner(false);//spinner stops
}

const getModalByNewsId = (id) =>{
    // console.log(_id);
const url = `https://openapi.programming-hero.com/api/news/${id}`;
// console.log(url);
fetch(url)
.then(res => res.json())
.then(data => showModal(data.data[0]))
.catch(error => console.log(error))
}

const showModal = data =>{
// data.forEach(id = )
const {title,image_url,author,details} = data;
const {name,published_date} = author;

console.log(data.category_id)
const modalBody = document.getElementById('modal-body');
modalBody.innerHTML=`
<img src="${image_url}">
<h3 class="text-lg font-bold">${title}</h3>
<h3><span class="text-lg text-blue-500 font-bold">Author:</span> ${name ? name : 'N/A' } </h3>
<small><span class="font-bold text-blue-500">Date:</span> ${published_date ? published_date: 'N/A'}</small>
<p class="py-4">${details}</p>
`

}

// spinner
const toggleSpinner = isLoading =>{
    const spinnerSection = document.getElementById('spinner')
    if(isLoading){
        spinnerSection.classList.remove('hidden')
    }else{
        spinnerSection.classList.add('hidden')
    }
}

loadCategory();
