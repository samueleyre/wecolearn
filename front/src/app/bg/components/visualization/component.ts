import { 
        Component, 
        OnInit,
        Injectable,
        ViewChild,
        SimpleChanges,
   }                                 from '@angular/core';
import { Http }                      from '@angular/http';
import { Recherche }                 from './../recherche/entity';
import { BaseChartDirective }        from 'ng2-charts/ng2-charts';


@Component({
    templateUrl: 'template.html'
})

@Injectable()
export class VisualizationComponent implements OnInit {

    @ViewChild(BaseChartDirective) public chart: BaseChartDirective;
    
    
    public recherches: Recherche[]= [];
    public _recherhe: any[] = [];

      public lineChartData:Array<any> = [
        {data: [], label: 'Series A'},
      ];
      public lineChartLabels:Array<any> = [];
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
        let dates:Array<any> = [];
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
                    dates.push(  _date.getDate() + '/' + ( 1 + _date.getMonth()));
                });
            }
        });

        this.lineChartData = [
            {data: ranks, label: label   }
        ];
        this.chart.labels = dates;
        this.lineChartLabels = dates;
        this.chart.ngOnChanges({});  

    }
}  