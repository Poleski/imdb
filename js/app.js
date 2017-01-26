// Nie jest to duża appka, ale jakoś działa
// Użyłem OMDb API, jako najlepiej działającego, darmowego i, przede wszystkim, korzystającego z bazy iMDb.
// Można do niego wysyłać zapytania po iMDb ID (i=), tytule (t=) oraz o dziesięć pasujących rezultatów (s=).
// Użyłem dwóch ostatnich: wyszukiwania tytułem do zwrócenia filmu, i ogólnego searcha do autocomplete'a
// Na początku chciałem zrobić odwrotnie, ale przerwałem w połowie, bo to nie miało sensu z punktu widzenia UX :)
// Nie mniej jednak moja pierwsza próba (nie ukończona), jest dostępna pod /imdb2/

app = angular.module('movieApp', []);

app.controller('movieSearchController', function($scope, $http){

// Każemy obserwować searchbara i zwracać rezultat zapytania s=

	$scope.$watch('search', function() {
		fetchList();
	});
	
	function fetchList() {
		$http.get("http://www.omdbapi.com/?s=" + $scope.search)
		.then(function(result) {
			$scope.suggestions = result.data;
		});
	}
	
// Przy submitowaniu formularza pytamy o t=. Chowamy też podpowiedzi, żeby nam nie zasłaniały rezultatu. Pojawią się znowu jak zaczniemy coś pisać (oninput). Dodałem dodatkowe ukrywanie, na wypadek zbyt szybkiego searcha.
	
	$scope.submitForm = function() {
		fetchTitle();
		$(".suggestion-box").hide();
		setTimeout(function() {
			$(".suggestion-box").hide();
		}, 520);
	};
	
// Przy okazji robimy kilka drobnych zmian - tłumaczymy datę na polski, poprzez matchowanie z dwoma tabelami i puszczamy funkcję, która pokoloruje nam box z metascorem
	
	function fetchTitle(){
		
		if($("#movie-title").val() != "")
		{
			$http.get("http://www.omdbapi.com/?t=" + $scope.search)
			.then(function(result){ 
				$scope.single = result.data;
				var dataWydania = result.data.Released.split(" ");
				var monthPolish = ["Stycznia", "Lutego", "Marca", "Kwietnia", "Maja", "Czerwca", "Lipca", "Sierpnia", "Września", "Października", "Listopada", "Grudnia"];
				var monthEnglish = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				for (i = 0; i < 12; i++) {
					if (dataWydania[1] == monthEnglish[i]) {
						dataWydania[1] = monthPolish[i]
					};
				}
				
				$scope.wydano = dataWydania.join(" ");
				metaColor();
			});
		}
	}
	
// Po kliknięciu w rekomendacje przepisujemy je do searchboxa, znowu puszczamy zapytanie t= i znowu ukrywamy rekomendacje
	
	$scope.select = function(movie){
		$scope.search = movie.Title;
		fetchTitle();
		$(".suggestion-box").css("display", "none");
	};
});
