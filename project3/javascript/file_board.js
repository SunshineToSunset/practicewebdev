const add_pin_modal = document.querySelector('.add_pin_modal');
document.querySelector('.add_pin').addEventListener('click', () => {
       add_pin_modal.style.opacity=1;
       add_pin_modal.style.pointerEvents= 'all';
       
});
 
document.querySelector('.add_pin_modal').addEventListener('click', event =>{

if(event.target === add_pin_modal) {
    reset_modal();
}

});

let pin_image_blob = null;

document.querySelector('#upload_img').addEventListener('change',event =>{
    if(event.target.files && event.target.files[0]){
        if(/image\/*/.test(event.target.files[0].type)){
            const reader= new FileReader();
            reader.onload=function(){
                const new_image = new Image();
                
                new_image.src =reader.result;
            pin_image_blob = reader.result;

            new_image.onload = function(){
                const modal_pin = document.querySelector('.add_pin_modal .modal_pin');

                new_image.classList.add('pin_max_width');

            document.querySelector('.add_pin_modal .pin_image').appendChild(new_image);
            document.querySelector('#upload_img_label').style.display = 'none';

            modal_pin.style.display = 'block';
            
            if(
                new_image.getBoundingClientRect().width <new_image.parentElement.getBoundingClientRect().width ||
                new_image.getBoundingClientRect().height <new_image.parentElement.getBoundingClientRect().height
            ){
                new_image.classList.remove('pin_max_width');
                new_image.classList.add('pin_max_height');
            }

            modal_pin.style.opacity = 1;

        }
    }

        reader.readAsDataURL(event.target.files[0]);
    }}
    document.querySelector('#upload_img').value = '';
    
    });
    function create_pin(pin_details){




      
       const new_pin = document.createElement('DIV');
        const new_image =new Image();

        new_image.src = pin_details.img_blob;

        new_pin.style.opacity= 0;


new_image.onload = function() {
    new_pin.classList.add('card');
    new_image.classList.add(`card_${pin_details.pin_size}`);
     new_image.classList.add('pin_max_width');
     

    new_pin.innerHTML = `<div class="pin_title">${pin_details.title}</div>
        <div class="pin_modal">
        <div class="modal_head">
            <div class="save_card">Save</div>
        </div>
        <div class="modal_foot">
            <div class="destination">
                <div class="pint_mock_icon_container">
                    <img src="D:/web dev/images/upper-right-arrow.png" alt="destination" class="pint_mock_icon">
                </div>
                <span>${pin_details.destination}</span>
            </div>
            <div class="pint_mock_icon_container">
                <img src="D:/web dev/images/send.png" alt="send" class="pint_mock_icon">
            </div>
            <div class="pint_mock_icon_container">
                <img src="D:/web dev/images/ellipse.png" alt="edit" class="pint_mock_icon">
            </div>
        </div>
        </div>

    <div class="pin_image">
    </div>`;

    const pinContainer = document.querySelector('.pin_container');
    pinContainer.appendChild(new_pin);

    new_pin.children[1].appendChild(new_image);

    if (
      new_image.getBoundingClientRect().width <
        new_image.parentElement.getBoundingClientRect().width ||
      new_image.getBoundingClientRect().height <
        new_image.parentElement.getBoundingClientRect().height
    ) {
      new_image.classList.remove('pin_max_width');
      new_image.classList.add('pin_max_height');
    }

    
    fitImageInContainer(new_image);
    
    new_pin.style.opacity = 1;
    hideModal();
  };
  
  
  function fitImageInContainer(image) {
    const container = image.parentElement;
    const containerWidth = container.getBoundingClientRect().width;
    const containerHeight = container.getBoundingClientRect().height;
  
    const pinWidth = parseFloat(getComputedStyle(container).getPropertyValue('--card_width'));
    const pinHeight = parseFloat(getComputedStyle(container).getPropertyValue('--row_increment'));
  
    const pinAspectRatio = pinWidth / pinHeight;
    const imageAspectRatio = image.naturalWidth / image.naturalHeight;
  
    if (imageAspectRatio > pinAspectRatio) {
      const scaleRatio = containerWidth / image.naturalWidth;
      const scaledHeight = image.naturalHeight * scaleRatio;
      const excessHeight = scaledHeight - containerHeight;
      const offset = excessHeight / 2;
      const topOffset = -offset; // Adjust top offset to move the image below the elements
      const leftOffset = (containerWidth - image.offsetWidth) / 2; // Center the image horizontally
      image.style.width = '100%';
      image.style.height = 'auto';
      image.style.objectFit = 'cover';
      image.style.position = 'relative'; // Set position to relative

      image.style.left = `${leftOffset}px`; // Adjust left offset
      image.style.zIndex = '-1';
    } else {
      const scaleRatio = containerHeight / image.naturalHeight;
      const scaledWidth = image.naturalWidth * scaleRatio;
      const excessWidth = scaledWidth - containerWidth;
      const offset = excessWidth / 2;
      const leftOffset = -offset; // Adjust left offset to move the image below the elements
      image.style.width = 'auto';
      image.style.height = '100%';
      image.style.objectFit = 'cover';
      image.style.position = 'relative'; // Set position to relative
      image.style.left = `${leftOffset}px`; // Adjust left offset
      image.style.zIndex = '-1';
    }
  }
  
  const pinImages = document.querySelectorAll('.pin_image img');
  pinImages.forEach(image => {
    fitImageInContainer(image);
  });

 

  


  function hideModal() {
    const add_pin_modal = document.querySelector('.add_pin_modal');
    const modal_pin = document.querySelector('.add_pin_modal .modal_pin');

    add_pin_modal.style.opacity = 0;
    add_pin_modal.style.pointerEvents = 'none';

    document.querySelector('#upload_img_label').style.display = 'block';
    modal_pin.style.display = 'none';
    modal_pin.style.opacity = 0;

    if (modal_pin.children[0].children[0])
      modal_pin.children[0].removeChild(modal_pin.children[0].children[0]);

    document.querySelector('#pin_title').value = '';
    document.querySelector('#pin_description').value = '';
    document.querySelector('#pin_destination').value = '';
    document.querySelector('#pin_size').value = '';
    pin_image_blob = null;
  }
}

    document.querySelector('.save_pin').addEventListener('click', () =>{
      
        
       const users_data ={
        author:'divya',
        board: 'default',
        title: document.querySelector('#pin_title').value,
        description: document.querySelector('#pin_description').value,
        destination: document.querySelector('#pin_destination').value,
        img_blob: pin_image_blob,
        pin_size: document.querySelector('#pin_size').value

       }
       create_pin(users_data);
       reset_modal();
    

    });



document.querySelector('.save_pin').addEventListener('click', () => {
  
  create_pin(users_data);
});