const gallery4Elem = document.getElementById("gallery4");
gallery4Elem.style.display = "none";
let downloadBtn = document.getElementById("download");

class Gallery {
    images = [];
    imgElem;
    currentImage = -1;
    interval;

    constructor(elemId, ...imageUrls) {
        this.images = imageUrls;
        const galleryElem = document.getElementById(elemId);
        galleryElem.classList.add("gallery");

        // הוספת הלחצן הימני
        const right = document.createElement('div');
        right.classList.add('arrow', 'right');
        right.addEventListener('click', () => this.prevImage());
        galleryElem.appendChild(right);

        // הוספת הלחצן השמאלי
        const left = document.createElement('div');
        left.classList.add('arrow', 'left');
        left.addEventListener('click', () => this.nextImage());
        galleryElem.appendChild(left);

        // יצירת אלמנט של התמונה
        this.imgElem = document.createElement("img");

        // הוספת אירועים לגלרייה
        galleryElem.addEventListener('mouseover', () => {
            this.stopAuto();
            this.imgElem.classList.add("borderEffect");
            this.imgElem.style.cursor = "pointer";
        });

        galleryElem.addEventListener('mouseout', () => {
            // כשמפעילים מחדש את הגלרייה זורקים אירוע כללי שמעדכן את כל הגלריות להסתנכרן
            const myEvent = new CustomEvent("startAllGallery");
            dispatchEvent(myEvent);
            this.imgElem.classList.remove("borderEffect");
        });

        // הוספת אירוע כללי שיודע להאזין לכל הגלריות ע"מ לסנכרן אותם בקצב
        addEventListener('startAllGallery', () => this.startAuto());

        if (elemId !== 'gallery4') {
            // בכל קליק כפול על תמונה היא תוסף למועדפים  
            this.imgElem.addEventListener('dblclick', () => {
                this.add2Faves();
            });

        } else {
            // בכל לחצן ימני על תמונה היא תימחק מהמועדפים  
            this.imgElem.addEventListener('contextmenu', () => {
                event.preventDefault();
                this.removeFromFaves()
            });
        }


        // הוספת התמונה לדף
        galleryElem.appendChild(this.imgElem);

        // לצורך הצגת התמונה הראשונה
        this.nextImage();
        this.startAuto();
    }

    updateDownloadLink() {
        const currentImageSrc = this.images[this.currentImage];
        downloadBtn.href = currentImageSrc;
    }

    nextImage() {
        this.currentImage++;

        if (this.currentImage >= this.images.length) {
            this.currentImage = 0;
        }

        this.imgElem.src = this.images[this.currentImage];
        this.updateDownloadLink();
    }

    prevImage() {
        this.currentImage--;

        if (this.currentImage < 0) {
            this.currentImage = this.images.length - 1;
        }

        this.imgElem.src = this.images[this.currentImage];
        this.updateDownloadLink();
    }

    startAuto() {
        clearInterval(this.interval);

        if (this.images.length > 0) {
            this.interval = setInterval(() => {
                this.nextImage();
            }, 2.5 * 1000);
        }


    }

    stopAuto() {
        clearInterval(this.interval);
    }

    add2Faves() {

        const currentImageSrc = this.images[this.currentImage];
        gallery4.images.push(currentImageSrc);
        downloadBtn.href = currentImageSrc;

        if (gallery4Elem.style.display == "none") {
            setTimeout(() => {
                gallery4Elem.style.display = "block";
            }, 2.5 * 1000);
        }
    }

    removeFromFaves() {
        const currentImageSrc = this.images[this.currentImage];
        const index = gallery4.images.indexOf(currentImageSrc);
        if (index !== -1) {
            gallery4.images.splice(index, 1);
        }

        if (this.currentImage === index) {
            this.nextImage();
        }

        if (gallery4.images.length === 0) {
            gallery4Elem.style.display = "none";

        }

    }
}

const gallery1 = new Gallery("gallery1", "./images/img (2).jpg", "./images/img (6).jpg",
    "./images/img (7).jpg", "./images/img (10).jpg", "./images/img (12).jpg");

const gallery2 = new Gallery("gallery2", "./images/img (1).jpg", "./images/img (19).jpg",
    "./images/img (21).jpg", "./images/img (22).jpg", "./images/img (8).jpg");

const gallery3 = new Gallery("gallery3", "./images/img (18).jpg", "./images/img (27).jpg",
    "./images/img (14).jpg", "./images/img (15).jpg", "./images/img (26).jpg");

const gallery4 = new Gallery("gallery4");

