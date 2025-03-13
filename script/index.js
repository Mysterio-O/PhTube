function categoryLoader() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => buttonLoader(data.categories))
}

function removeClass() {
    const actvClass = document.getElementsByClassName('border-2', 'border-blue-500', 'text-blue-500')
    // console.log(actvClass);
    for (let c of actvClass) {
        c.classList.remove('border-2', 'border-blue-500', 'text-blue-500');
    }
}

const subscribed = (event) => {
    const btn = event.target;
    // console.log(btn)
    if(btn.innerText === 'Follow') {
        btn.innerHTML = `Unfollow <img src="https://img.icons8.com/?size=60&id=kCNfpZEhheCl&format=gif" alt="Unfollow" width="20" height="20"/>`
    }
    else {
        btn.innerText = "Follow";
    }
}

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

function showVideoDetails(videoId) {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then(res => res.json(res))
        .then(data => displayVideoDetails(data.video))
}
const displayVideoDetails = (video) => {
    console.log(video)
    document.getElementById('videoDetails').showModal();
    const videoDetails = document.getElementById('video-details');
    videoDetails.innerHTML = `
        <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-2xl">${video.title}</h2>
    <p class="text-gray-400 opacity-60">${video.description}</p>
    <div class="card-actions justify-between items-center flex gap-3">
    <span class="flex gap-3 items-center">
    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-[40px] p-0 rounded-full ring ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                    <span class="text-xl font-extrabold flex gap-2 items-center">${video.authors[0].profile_name} ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></img>` : `<img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=54197&format=png" alt=""></img>`}</span>
                    </span>
       <button onclick="subscribed(event)" class="btn">Follow</button>
    </div>
  </div>
</div>
    `
}

// {
//     "category_id": "1005",
//     "category": "Drawing"
// }
function buttonLoader(data) {
    for (const d of data) {
        categoryContainer = document.getElementById('category-container');
        const btnDiv = document.createElement('div');
        // console.log(d)
        btnDiv.innerHTML = `
        <button id="btn-${d.category_id}" onclick="videoCategory(${d.category_id})" class="btn btn-sm bg-[#25252515] hover:bg-[#FF1F3D] hover:text-white">${d.category}</button>
        `
        categoryContainer.append(btnDiv);
    }
}
categoryLoader();

function videoCategory(id) {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeClass();
            const clickedBtn = document.getElementById(`btn-${id}`);
            clickedBtn.classList.add('border-2', 'border-blue-500', 'text-blue-500');
            getVideo(data.category)
        })
}
function videoLoader(searchText = '') {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            removeClass();
            document.getElementById('All-btn').classList.add('border-2', 'border-blue-500', 'border-blue-500')
            getVideo(data.videos)
        })
}


function getVideo(videos) {
    // console.log(videos);
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // clear the container before loading new videos
    if (videos.length === 0) {
        videoContainer.innerHTML = `
        <div class="flex flex-col gap-4 justify-center items-center col-span-full py-16">
            <img src="./assets/Icon.png" alt="">
            <p class="text-3xl font-bold text-center">Oops!! Sorry, There is no content here</p>
        </div>`
    }
    videos.forEach((video) => {
        // console.log(video);
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
        <div class="rounded-lg bg-base-100 shadow-sm card">
            <figure class="relative">
                <img class="h-[200px] w-full object-cover rounded-lg" src="${video.thumbnail}" alt="Shoes" />
                <span class="bg-gray-700 text-white absolute bottom-3 right-2 px-2 rounded">30 days ago</span>
            </figure>
            <div class="mt-5 flex gap-3">
                <div>
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-[40px] p-0 rounded-full ring ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <h2 class="font-bold text-base">${video.title}</h2>
                    <p class="text-[#17171770] flex gap-2 items-center">${video.authors[0].profile_name} 
                    ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></img>` : `<img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=54197&format=png" alt=""></img>`}</p>
                    <p class="text-[#17171770] ">${video.others.views} views</p>
                </div>
            </div>
            <button onclick="showVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>
        `
        videoContainer.append(videoCard);
    })


}

document.getElementById('search-box').addEventListener('keyup', (e)=> {
    const input = e.target.value;
    videoLoader(input);
})

document.addEventListener("DOMContentLoaded", () => {
    videoLoader(); // Load all videos when the page first loads
});

