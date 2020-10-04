function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    console.log("image read");

    reader.onload = function (e) {
      $(".image-upload-wrap").hide();

      $(".file-upload-image").attr("src", e.target.result);
      $(".file-upload-content").show();
      $(".remove-text").show();
      $(".file-upload-image").show();

      $(".image-title").html(input.files[0].name);
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload();
  }
}

function removeUpload() {
  $(".file-upload-input").replaceWith($(".file-upload-input").clone());
  $(".file-upload-content").hide();
  $(".remove-text").hide();
  $(".file-upload-image").hide();
  $(".image-upload-wrap").show();
  $(".alert-remove").show();
  $(".alert-remove").delay(5000).fadeOut();
}
$(".image-upload-wrap").bind("dragover", function () {
  $(".image-upload-wrap").addClass("image-dropping");
});
$(".image-upload-wrap").bind("dragleave", function () {
  $(".image-upload-wrap").removeClass("image-dropping");
});

function toggleUserPanel() {
  $(".user-panel").toggle();
}

function upload() {
  $(".alert-success").show();
  $(".alert-success").delay(8000).fadeOut();
  $(".image-upload-wrap").show();
  $(".file-upload-image").hide();
}

$(function () {
  $(".file-upload-image").hide();
  $(".file-upload-content").hide();
  $(".remove-text").hide();
  $(".user-panel").hide();
  $(".alert-remove").hide();
  $(".alert-success").hide();
});
