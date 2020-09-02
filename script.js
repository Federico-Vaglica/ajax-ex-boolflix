$(document).ready(function(){

    var source = $('#day-template').html();
    var template = Handlebars.compile(source);
    var myMovie = $('input').val();

    
    
    $("button").on("click", function(){
        insertMovie(myMovie) 
    })


    $('input').on('keypress',function(a) {
        if(a.which == 13 || a.keyCode == 13) {
            $('input').val('');
            insertMovie(myMovie) 
        }
    });
    
    function insertMovie (dati){
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            method: 'GET',
            data: {
                'api_key': 'd5e76e32726c06432277b9f07da06085',
                'query': dati,
                'language': 'it-IT'
            },
            success: function(a){
                var movie= a.results;
                for ( var i = 0; i < movie.length; i++ ){                                        
                    var thisMovie={
                        titolo: movie[i].title,
                        titoloOriginale: movie[i].original_title,
                        lingua: movie[i].original_language,
                        voto: movie[i].vote_average
                    }
                    console.log(thisMovie)
                    var html = template(thisMovie);
                    $('.movies').append(html);
                }
            },
            error: function(){
              console.log('Errore');
            }
          });
      }
});
