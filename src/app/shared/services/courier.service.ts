import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { SeoService } from 'app/@core/utils';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Courier, CourierApi, CourierResolver, CourierResolverApi, CourierSettings, LoopBackConfig } from '../sdk';

@Injectable({
  providedIn: 'root',
})
export class CourierService {
  private courierApplication$: Observable<Courier>;
  private id$: BehaviorSubject<number> = new BehaviorSubject(null);
  private id: number;
  private realm: string;
  private name: string;
  private pad: number;
  private prefix: string;
  private courierSettings: CourierSettings
  constructor(
    private courierApi: CourierApi,
    private swUpdate: SwUpdate,
    private dialogService: NbDialogService,
    private toast: NbToastrService,
    private courierResolverApi: CourierResolverApi,
    private seoService: SeoService,
  ) {
    LoopBackConfig.setBaseURL(environment.apiUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
    this.checkForUpdate();
    if (!localStorage.getItem('OX_COURIER_ID') || !localStorage.getItem('OX_COURIER_REALM') || !localStorage.getItem('OX_SETTINGS')) {
      this.setCourierId();
    } else {
      console.log('Using PREV OX ID');
      this.id = Number.parseInt(localStorage.getItem('OX_COURIER_ID'));
      this.id$ = new BehaviorSubject(this.id);
      this.realm = localStorage.getItem("OX_COURIER_REALM");
    }

  }

  setCourierId() {
    this.courierResolverApi.findOne({
      where: {
        or: [
          {
            adminUrl: location.host,
          },
          {
            customerUrl: location.host
          }
        ]
      }
    }).subscribe((courierResolver: CourierResolver) => {
      console.log(courierResolver);
      this.id = courierResolver.courierId;
      this.id$ = new BehaviorSubject(courierResolver.courierId);
      localStorage.setItem('OX_COURIER_ID', this.id.toString());
      localStorage.setItem('OX_COURIER_REALM', courierResolver.realm)
      // location.reload();
    })
  }

  get courierApplication() {

    if (!this.courierApplication$) {

      if (!this.id) {
        return;
      }

      this.courierApplication$ = this.courierApi.findById(this.getId(), {
        include: ['themeSetting', 'courierSetting']
      })
      this.courierApplication$.subscribe(courier => {
        this.createManifest(courier.id);
        this.realm = courier.realm;
        localStorage.setItem('OX_COURIER_NAME', courier.name)
        this.courierSettings = courier.courierSetting;
        localStorage.setItem('OX_SETTINGS', JSON.stringify(courier.courierSetting));
        this.pad = courier.mailboxPaddingLength;
        this.seoService.setTitle(courier.name + ' Admin');
      })
    }
    return this.courierApplication$;
  }

  createManifest(id: number): void {
    console.log('Creating manifest');
    const link = document.createElement('link');
    link.href = `${environment.apiUrl}/${environment.apiVersion}/Couriers/getManifestFile?courierId=${id}&host=${location.origin}`;
    link.rel = 'manifest';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  getName() {
    if (!this.name) {
      if (localStorage.getItem("OX_COURIER_NAME")) {
        this.name = localStorage.getItem("OX_COURIER_NAME");
        return this.name;
      }
      location.reload();
    }
    return this.name;
  }

  getId() {
    return this.id;
  }

  getPrefix() {
    return this.courierSettings.prefix;
  }


  getRealm() {
    if (!this.realm) {
      if (localStorage.getItem("OX_COURIER_REALM")) {
        this.realm = localStorage.getItem("OX_COURIER_REALM");
        return this.realm;
      }
      location.reload();
    }
    return this.realm;

    // const realms = ['GCS','GSY'];

    // switch(location.host) {
    //   case 'admin.cmartshipping.com':
    //   case 'app.cmartshipping.com':
    //   return realms[0];

    //   case 'admin.gemskycouriers.com':
    //   case 'app.gemskycouriers.com':
    //   return realms[1];

    //   default:
    //   return realms[0];
    // }
  }

  padMailboxNumber(value) {
    let str = '' + value;
    while (str.length < this.pad - 1) {
      str = '0' + str;
    }
    return `${str}`;
  }

  checkForUpdate() {
    console.log('Checking for updates');
    this.swUpdate.available.subscribe(event => {
      this.showUpdateAvailable();
    });
  }

  showUpdateAvailable() {
    const confirmation = confirm('A system update is available, do you want to update now');
    if (confirmation) {
      this.update();
    }
  }

  update() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }

}
