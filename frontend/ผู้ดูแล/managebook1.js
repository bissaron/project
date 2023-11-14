document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay1');
    const confirmationBox = document.getElementById('confirmation-box');
    const confirmButton = document.querySelector(".confirm-delete-button");
    const cancelButton = document.querySelector(".cancel-delete-button");
    // เลือกทุกปุ่มลบ
    const deleteButtons = document.querySelectorAll('.delete-button');
  
    function showConfirmation() {
        overlay.style.display = 'flex';
        confirmationBox.style.display = 'block';
    }
  
    function hideConfirmation() {
        overlay.style.display = 'none';
        confirmationBox.style.display = 'none';
    }
  
    function confirmDelete() {
        console.log('ลบหนังสือ');
        hideConfirmation();
        console.log('confirmDelete() ถูกเรียก');
    }
    
    function cancelDelete() {
        console.log('ยกเลิกการลบหนังสือ');
        hideConfirmation();
        console.log('cancelDelete() ถูกเรียก');
    }

    confirmButton.addEventListener("click", () => {
        overlay.style.display = "none";
    });
    
      cancelButton.addEventListener("click", () => {
        overlay.style.display = "none";
        
      });
    
    
  
    // วนลูปเพื่อกำหนดคลิกที่ทุกปุ่มลบ
    deleteButtons.forEach(button => {
        button.addEventListener('click', showConfirmation);
    });
  
    // การกำหนดคลิกที่ปุ่มปิดกรอบยืนยัน
    const closeButton = document.querySelector('.red-cross');
    if (closeButton) {
        closeButton.addEventListener('click', hideConfirmation);
    }
});
