import { 
        Component, 
        OnInit,
        Injectable 
   }                                 from '@angular/core';
import { Http }                      from '@angular/http';
import { Recherche }               from './../recherche/entity';

@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class VisualizationComponent implements OnInit {
    
    public recherches: Recherche[]= [];
    public _recherhe: any[] = [];

      public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
      ];
      public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      public lineChartOptions:any = {
        responsive: true
      };
      public lineChartColors:Array<any> = [
        { // grey
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
      ];
      public lineChartLegend:boolean = true;
      public lineChartType:string = 'line';

    constructor( protected http: Http ) {
        
    } 
    
    ngOnInit() {
        
        this.load();
        
    }

    change( idRecherche: any ) {
        this.setGraph( idRecherche );
    }

    private initSelector() {

    }

    private load() {
        this
        .http
        .get('/api/recherches-resultats')
        .map(response => {
            return response.json();
        }).subscribe(( recherches:Recherche[]) => {
            this.recherches = recherches;
        });
    }

    private setGraph( idRecherche: number ) {
        let dates:Array<number> = [];
        let ranks:Array<number> = [];
        let label:string  = '';
        this.recherches.forEach( ( recherche : any ) => {
            if( recherche.id == idRecherche ) {
                label = recherche.name; 
                recherche.resultats.forEach(( resultat : any, index: number ) => {
                    let _date:Date = new Date( resultat.date );
                    let _rank:number = 100;
                    if( resultat.rank !== null && resultat.page !== null ) {
                        _rank = 10 * ( resultat.page - 1 ) + resultat.rank;
                    }
                    ranks.push( _rank );
                    dates.push( index);
                });
            }
        });

        this.lineChartData = [
            {data: ranks, label: label }
        ];
        this.lineChartLabels = dates;
    }
}