import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NAV } from '~/config/navigation/nav';
import { CommunityService } from '~/core/services/community/community.service';
import { ToastService } from '~/core/services/toast.service';
import { CommunityEntity } from '~/core/entities/community/community.entity';

@Component({
  selector: 'app-join-link',
  templateUrl: './join-link.component.html',
  styleUrls: ['./join-link.component.scss'],
})
export class JoinLinkComponent implements OnInit {
  public loading = true;
  public community: CommunityEntity | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _communityService: CommunityService,
    private _router: Router,
    private _toast: ToastService,
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      this._communityService.activateJoinToken(params.get('token')).pipe(
        tap(() => this.loading = false),
        catchError((err) => {
          this._router.navigate([NAV.dashHome]).then(() => {
            this._toast.error("Lien expiré ou plus valide. Contacter l'administrateur/trice de votre communauté plus d'information.");
          });
          return of(null);
        }),
      ).subscribe((community: CommunityEntity) => {
        this.community = community;
      });
    });
  }

  get searchPageLink(): string {
    return NAV.search;
  }
}
