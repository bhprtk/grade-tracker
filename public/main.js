$(document).ready(init);

function init() {
  displayData();
  $('#myForm').submit(submitClass);
  $('.table').on('click', '.delete', deleteContent);
  $('.table').on('click', '.edit', editContent);
}

function editContent(e) {
  e.preventDefault();
  $('#myModal').modal(open);

  var id = $(this).parent().parent().find('.id').text();
  $('#edit-id').val(id);
  $('#save').click(putData);
}

function putData() {
  var name = $('#edit-name').val();
  var score = $('#edit-score').val();
  var total = $('#edit-total').val();
  var id = $('#edit-id').val();
  var grade = checkLetterGrade(score, total);


  var newGrade = {
    name: name,
    score: score,
    total: total,
    letter: grade,
    id: id
  };

  $.ajax({
    url: "/grades",
    type: 'PUT',
    data: newGrade,
    success: function() {
      console.log('update successful!');
      displayData();
    },
    fail: function() {
      console.log("update failed!");
    }
  });
}

function deleteContent(e) {
  e.preventDefault();
  var r = confirm("Are you sure you want to delete this class?");
  if(r) {
    var id = $(this).parent().parent().find('.id').text();
    console.log(id);
    $.ajax({
      url: "/grades",
      type: 'DELETE',
      data: {id: id},
      success: function() {
        console.log('delete request successful');
        displayData();
      },
      fail: function() {
        console.log('delete request fail');
      }
    });
  }
}

function submitClass(e) {
  e.preventDefault();
  var name = $('#name').val();
  var score = $('#score').val();
  var total = $('#total').val();

  var letter = checkLetterGrade(score, total);

  var gradeData = {
    name: name,
    score: score,
    total: total,
    letter: letter
  };

  postData(gradeData);
}

function checkLetterGrade(score, total) {
  var percentage = Math.floor((score/total) * 100);
  var grade;
  if(percentage >= 90) {
    grade = 'A';
  } else if(percentage >= 80) {
    grade = 'B';
  } else if(percentage >=70) {
    grade = 'C';
  } else if(percentage >= 60) {
    grade = 'D';
  } else {
    grade = 'F';
  }
  return grade;
}
function postData(data) {
  $.post("/grades", data)
    .done(function() {
      console.log("Succesfully posted!");
      displayData();
  })
    .fail(function(error) {
      console.log('error:', error);
    });
}

function displayData() {
   $('.table').empty();

  $.get("/grades")
  .done(function(data) {
    appendGrades(data);
  })
  .fail(function(error) {
    console.log('error:', error);
  });
}


function appendGrades(data) {
  $table = `
  <tr>
    <th>Name</th>
    <th>Score</th>
    <th>Total</th>
    <th>Grade</th>
    <th></th>
    <th></th>
    <th></th>
  </tr>`;
  $('.table').append($table);
  data.forEach(function(d) {
    $card =
    `<tr><td>${d.name}</td>
    <td>${d.score}</td>
    <td>${d.total}</td>
    <td>${d.letter}</td>
    <td class='id'>${d.id}</td>
    <td><button class="btn btn-danger delete">Delete</button>
    <td><button class="btn btn-info edit">Edit</button></tr>`
    $('.table').append($card);
  });
}
