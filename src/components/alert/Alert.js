import Swal from "sweetalert2";

// success
export const Alert = (timer, title, message, icon, confirmButtonText) => {
  Swal.fire({
    timer: timer, //1500
    title: title, //'Đăng nhập'
    text: message, //'Thành công'
    icon: icon, //'success' or 'error' or 'warning'
    confirmButtonText: confirmButtonText, //'OK'
  });
};

// delete

export const DeleteAlert = (onDelete) => {
  Swal.fire({
    title: "Bạn muốn xóa nhân viên?",
    text: "Bạn sẽ không thể khôi phục nhân viên này!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đúng, vẫn xóa!"
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete();
      Swal.fire({
        title: "Đã xóa!",
        text: "Bạn đã xóa nhân viên thành công.",
        icon: "success"
      });
    }
  });
};