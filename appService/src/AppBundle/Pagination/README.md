/*
	pagination :  un get pur, renvoie tout les N premiers elements.
	un header de pagination doit envoyer
		le rank de la page demandée.
	le header de pagination ou le resultat doit renvoyer :
		l index de la page courante
		le nombre de page

	Le header de pagination doit renvoyer uniquement, le nombre de page accessibles
	et le get si le header n'est pas spécifié, travaille avec les valeurs par defauts
	et on peut specifier per-page, et page
	dans ce cas la retour renvoie max-page

	côté back : 

	@Pagination : une annotation pagination, spécifie un service, avec une interface COUNT
	rajoute un header à la réponse.

	@Pagination : doit intercepter le header de pagination.

	@Pagination : in param converter, qui inject un objet de pagination la page et per-page, convertible facilement en requête.

	listener des requête pour capter per-page, et page
	listener des query pour renvoyer count @anotation qui spécifie le l'interfacee countable et qui specifie aussi les valeurs par defaut
	ajout des parametre à la query ( au get )


		- implementer count : interface
		- listener : OK
		- lire le header de pagination : listener => 
		- injecter le header de pagination , dans un service et le rendre accessible dans l'enfant
		- setter le service de pagination
		- renvoyer dans le footer 


		PaginationService dans lequel on set la query de pagination
		Un sevice qui implément count qui est passé dans l'annotation et injecté dans le Pagination service 
		 



*/