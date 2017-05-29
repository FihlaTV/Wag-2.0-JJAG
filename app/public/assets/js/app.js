$('#addPetSubmit').on('click', function () {
    $('#addPetForm').submit();
    let pn = $('#inputPetName').val.trim();
    let pi = $('#inputPetImage').val.trim();
    let pb = $('#inputPetType').val.trim();
    let pm = $('#inputPetMessage').val.trim();
    alert(`Pet Name: ${pn}\n
           Pet Breed: ${pb}\n
           Pet Message: ${pm}\n
           Image: ${pi}`);
});

