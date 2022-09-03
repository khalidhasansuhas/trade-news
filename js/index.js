const loadCategory = ()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => setAllCategories(data.data.news_category))
}

const setAllCategories = categories =>{
    
    const allCategory = document.getElementById('all-category');
    for (const category of categories){
        console.log(category.category_name);
        const li = document.createElement('li');
        li.innerHTML=`
        <a
        class="block py-2 pr-4 pl-3 font-bold text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">${category.category_name}</a>
        `;
        allCategory.appendChild(li);
    }
}
loadCategory();