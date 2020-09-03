$(document).ready(function(){


    
    
    $("button").on("click", function(){
        insertMovie();
        $('input').val('');
    })


    $('input').on('keypress',function(a) {
        if(a.which == 13 || a.keyCode == 13) {
            insertMovie() 
            $('input').val('');
        }
    });
    





    function insertMovie (){

       

        var dati = $('input').val();
        $('.movies').empty();
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            method: 'GET',
            data: {
                'api_key': 'd5e76e32726c06432277b9f07da06085',
                'query': dati,
                'language': 'it-IT'
            },
            success: function(a){
                if (a.total_results > 0){
                    printMovie(a.results);
                }else {
                    noResults();
                }
            },
            error: function(){
              console.log('Errore');
            }
          });
      }


      function printMovie (a){

        var source = $('#day-template').html();
        var template = Handlebars.compile(source);
        
        for ( var i = 0; i < a.length; i++ ){                                        
            var thisMovie={
                titolo: a[i].title,
                titoloOriginale: a[i].original_title,
                lingua: a[i].original_language,
                voto: a[i].vote_average
            }
            console.log(thisMovie)
            var html = template(thisMovie);
            $('.movies').append(html);
        }
      }


      function noResults() {
        var source = $('#noResults').html();
        var template = Handlebars.compile(source);

        var context = {
            noResults: 'Non ci sono risultati'
        }

        var html = template(context);
        $('.movies').append(html);
      }
});
