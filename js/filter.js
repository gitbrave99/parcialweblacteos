
  $(document).ready(function() {
    $("#sr_barrs").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#lista-productos .col ").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        
      });
    });
  });
